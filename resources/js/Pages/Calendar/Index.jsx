import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import StatCard from '@/Components/StatCard';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronRight, ChevronLeft, Plus, CalendarCheck2, ClipboardList, TrendingUp, Flame } from 'lucide-react';

const WEEKDAYS = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];
const WEEKDAYS_SHORT = ['إث', 'ثل', 'أر', 'خم', 'جم', 'سب', 'أح'];

export default function CalendarIndex({ month, monthLabel, today, startOfMonthWeekday, daysInMonth, countsByDay, prevMonth, nextMonth }) {
    const leadingBlanks = startOfMonthWeekday - 1;
    const cells = [];

    for (let i = 0; i < leadingBlanks; i++) {
        cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(day);
    }

    const dateFor = (day) => `${month}-${String(day).padStart(2, '0')}`;

    const goToMonth = (m) => router.get(route('calendar.index'), { month: m }, { preserveState: true });

    const monthlyTotal = Object.values(countsByDay).reduce((sum, n) => sum + n, 0);
    const daysWithRecords = Object.keys(countsByDay).length;
    const isCurrentMonthShown = today.slice(0, 7) === month;
    const todayCount = isCurrentMonthShown ? countsByDay[Number(today.slice(8, 10))] ?? 0 : 0;

    const busiestDays = Object.entries(countsByDay)
        .map(([day, count]) => ({ day: Number(day), count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const stats = (
        <>
            <StatCard icon={CalendarCheck2} label="سجلات اليوم" value={todayCount} accent="brand" />
            <StatCard icon={ClipboardList} label="إجمالي هذا الشهر" value={monthlyTotal} accent="emerald" />
            <StatCard icon={TrendingUp} label="أيام بها سجلات" value={daysWithRecords} accent="amber" />
        </>
    );

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title="التقويم"
                    subtitle="نظرة شاملة على السجلات اليومية لجميع المسؤولين"
                    actions={
                        <Link href={route('reports.create', { date: isCurrentMonthShown ? today : `${month}-01` })}>
                            <PrimaryButton>
                                <Plus className="h-4 w-4" />
                                إضافة تقرير جديد
                            </PrimaryButton>
                        </Link>
                    }
                />
            }
        >
            <Head title="التقويم" />

            <div className="space-y-6 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0">
                {/* Stats: horizontal row on phones/tablets, folded into the side rail from lg up */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">{stats}</div>

                <Card className="lg:col-span-2" padding="p-4 sm:p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <button
                            onClick={() => goToMonth(prevMonth)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 active:scale-95"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-2.5">
                            <h3 className="text-base font-bold text-slate-900 sm:text-lg">{monthLabel}</h3>
                            {!isCurrentMonthShown && (
                                <button
                                    onClick={() => goToMonth(today.slice(0, 7))}
                                    className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-100"
                                >
                                    اليوم
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => goToMonth(nextMonth)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 active:scale-95"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-2.5">
                        {WEEKDAYS.map((d, idx) => (
                            <div key={d} className="py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs">
                                <span className="sm:hidden">{WEEKDAYS_SHORT[idx]}</span>
                                <span className="hidden sm:inline">{d}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-1.5 grid grid-cols-7 gap-1 sm:gap-2 lg:gap-2.5">
                        {cells.map((day, idx) => {
                            if (day === null) {
                                return <div key={`blank-${idx}`} />;
                            }

                            const date = dateFor(day);
                            const isToday = date === today;
                            const count = countsByDay[day] ?? 0;
                            const hasRecords = count > 0;

                            return (
                                <Link
                                    key={date}
                                    href={route('calendar.show', date)}
                                    className={`group relative flex aspect-square flex-col items-center justify-center rounded-lg border text-sm transition sm:rounded-xl
                                        ${isToday ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200' : hasRecords ? 'border-brand-100 bg-brand-50/50 hover:border-brand-300' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}
                                    `}
                                >
                                    <span className={`text-xs font-semibold sm:text-sm lg:text-base ${isToday ? 'text-brand-700' : hasRecords ? 'text-slate-800' : 'text-slate-600'}`}>
                                        {day}
                                    </span>
                                    {hasRecords && (
                                        <span className="mt-0.5 rounded-full bg-brand-600 px-1.5 py-0.5 text-[9px] font-bold text-white sm:mt-1 sm:text-[10px]">
                                            {count}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="inline-block h-3 w-3 shrink-0 rounded border border-brand-100 bg-brand-50" /> يحتوي على سجلات
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="inline-block h-3 w-3 shrink-0 rounded border border-brand-500 ring-2 ring-brand-200" /> اليوم
                        </span>
                    </div>
                </Card>

                {/* Side rail: stats stacked + busiest-days digest, only once there's room to spare */}
                <div className="hidden lg:flex lg:flex-col lg:gap-4">
                    {stats}

                    <Card padding="p-5">
                        <div className="mb-3 flex items-center gap-2">
                            <Flame className="h-4 w-4 text-slate-400" />
                            <h3 className="text-sm font-bold text-slate-800">الأيام الأكثر نشاطًا</h3>
                        </div>

                        {busiestDays.length === 0 ? (
                            <p className="py-4 text-center text-sm text-slate-400">لا توجد سجلات هذا الشهر.</p>
                        ) : (
                            <ul className="space-y-1">
                                {busiestDays.map(({ day, count }) => (
                                    <li key={day}>
                                        <Link
                                            href={route('calendar.show', dateFor(day))}
                                            className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                        >
                                            <span>{dateFor(day)}</span>
                                            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">{count}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
