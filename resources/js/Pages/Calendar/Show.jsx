import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import EmptyState from '@/Components/EmptyState';
import MobileRecordCard from '@/Components/MobileRecordCard';
import { entityLabel } from '@/Constants/reportOptions';
import { Head, Link } from '@inertiajs/react';
import { Plus, FileSearch, User2 } from 'lucide-react';

export default function CalendarShow({ date, dateLabel, reports }) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={dateLabel}
                    subtitle={`${reports.length} ${reports.length === 1 ? 'سجل' : 'سجلات'} مسجلة في هذا اليوم`}
                    back={{ href: route('calendar.index'), label: 'العودة إلى التقويم' }}
                    actions={
                        <Link href={route('reports.create', { date })}>
                            <PrimaryButton>
                                <Plus className="h-4 w-4" />
                                إضافة سجل
                            </PrimaryButton>
                        </Link>
                    }
                />
            }
        >
            <Head title={`سجلات ${date}`} />

            <Card padding="p-0">
                {reports.length === 0 ? (
                    <EmptyState
                        icon={FileSearch}
                        title="لا توجد سجلات لهذا اليوم"
                        description="ابدأ بإضافة أول سجل لهذا التاريخ."
                        action={
                            <Link href={route('reports.create', { date })}>
                                <PrimaryButton>
                                    <Plus className="h-4 w-4" />
                                    إضافة سجل
                                </PrimaryButton>
                            </Link>
                        }
                    />
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-slate-100 text-sm">
                                <thead>
                                    <tr className="text-start text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        <th className="px-6 py-3.5 text-start">الاسم</th>
                                        <th className="px-4 py-3.5 text-start">المركز</th>
                                        <th className="px-4 py-3.5 text-start">الجهة</th>
                                        <th className="px-4 py-3.5 text-start">نوع المخالفة</th>
                                        <th className="px-4 py-3.5 text-start">العدد</th>
                                        <th className="px-4 py-3.5 text-start">سجّله</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {reports.map((report) => (
                                        <tr key={report.id} className="transition hover:bg-slate-50">
                                            <td className="px-6 py-3.5">
                                                <Link
                                                    href={route('reports.show', report.id)}
                                                    className="font-semibold text-brand-600 hover:text-brand-700"
                                                >
                                                    {report.full_name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3.5 text-slate-600">{report.center?.name ?? '—'}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{entityLabel(report.entity)}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{report.violation_type}</td>
                                            <td className="px-4 py-3.5 tabular-nums text-slate-600">{report.count}</td>
                                            <td className="px-4 py-3.5 text-slate-500">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <User2 className="h-3.5 w-3.5 text-slate-400" />
                                                    {report.creator?.name ?? '—'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-slate-100 md:hidden">
                            {reports.map((report) => (
                                <MobileRecordCard
                                    key={report.id}
                                    title={report.full_name}
                                    titleHref={route('reports.show', report.id)}
                                    eyebrow={report.violation_type}
                                    fields={[
                                        { label: 'المركز', value: report.center?.name },
                                        { label: 'الجهة', value: entityLabel(report.entity) },
                                        { label: 'العدد', value: report.count },
                                        { label: 'سجّله', value: report.creator?.name },
                                    ]}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Card>
        </AuthenticatedLayout>
    );
}
