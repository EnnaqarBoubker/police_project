import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import StatCard from '@/Components/StatCard';
import PageHeader from '@/Components/PageHeader';
import { Head, useForm } from '@inertiajs/react';
import { CalendarCheck2, ClipboardList, Building2, ShieldAlert } from 'lucide-react';

export default function SummaryIndex({ date, month, dailyCount, monthlyTotal, byCenter, byViolationType, centers, filters }) {
    const { data, setData, get } = useForm({
        date,
        month,
        center_id: filters.center_id ?? '',
        violation_type: filters.violation_type ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('summary.index'), { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<PageHeader title="الملخص اليومي والشهري" subtitle="إحصاءات مجمّعة لكامل قاعدة البيانات المشتركة" />}
        >
            <Head title="الملخص" />

            <div className="space-y-6">
                <Card>
                    <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-end">
                        <div>
                            <InputLabel htmlFor="date" value="اليوم" />
                            <TextInput
                                id="date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="month" value="الشهر" />
                            <TextInput
                                id="month"
                                type="month"
                                className="mt-1 block w-full"
                                value={data.month}
                                onChange={(e) => setData('month', e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="center_id" value="المركز" />
                            <SelectInput
                                id="center_id"
                                className="mt-1"
                                value={data.center_id}
                                onChange={(e) => setData('center_id', e.target.value)}
                            >
                                <option value="">الكل</option>
                                {centers.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>

                        <div className="flex gap-2">
                            <TextInput
                                placeholder="نوع المخالفة"
                                className="flex-1"
                                value={data.violation_type}
                                onChange={(e) => setData('violation_type', e.target.value)}
                            />
                            <PrimaryButton type="submit">تطبيق</PrimaryButton>
                        </div>
                    </form>
                </Card>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <StatCard icon={CalendarCheck2} label={`سجلات يوم ${date}`} value={dailyCount} accent="brand" />
                    <StatCard icon={ClipboardList} label={`إجمالي سجلات ${month}`} value={monthlyTotal} accent="emerald" />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <div className="mb-4 flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            <h3 className="text-sm font-bold text-slate-800">حسب المركز هذا الشهر</h3>
                        </div>
                        <ul className="divide-y divide-slate-100 text-sm">
                            {byCenter.length === 0 && <li className="py-6 text-center text-slate-400">لا توجد بيانات.</li>}
                            {byCenter.map((row) => (
                                <li key={row.center} className="flex items-center justify-between py-2.5">
                                    <span className="text-slate-700">{row.center}</span>
                                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                                        {row.total}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card>
                        <div className="mb-4 flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-slate-400" />
                            <h3 className="text-sm font-bold text-slate-800">حسب نوع المخالفة هذا الشهر</h3>
                        </div>
                        <ul className="divide-y divide-slate-100 text-sm">
                            {byViolationType.length === 0 && <li className="py-6 text-center text-slate-400">لا توجد بيانات.</li>}
                            {byViolationType.map((row) => (
                                <li key={row.violation_type} className="flex items-center justify-between py-2.5">
                                    <span className="text-slate-700">{row.violation_type}</span>
                                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                                        {row.total}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
