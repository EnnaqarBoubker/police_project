import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import StatCard from '@/Components/StatCard';
import PageHeader from '@/Components/PageHeader';
import useTranslation from '@/Hooks/useTranslation';
import { Head, useForm } from '@inertiajs/react';
import { CalendarCheck2, ClipboardList, Landmark, ShieldAlert } from 'lucide-react';

export default function SummaryIndex({ date, month, dailyCount, monthlyTotal, byEntity, byViolationType, entities, filters }) {
    const { t } = useTranslation();
    const { data, setData, get } = useForm({
        date,
        month,
        entity_id: filters.entity_id ?? '',
        violation_type: filters.violation_type ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('summary.index'), { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<PageHeader title={t('الملخص اليومي والشهري')} subtitle={t('إحصاءات مجمّعة لكامل قاعدة البيانات المشتركة')} />}
        >
            <Head title={t('الملخص')} />

            <div className="space-y-6">
                <Card>
                    <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-4 items-end">
                        <div>
                            <InputLabel htmlFor="date" value={t('اليوم')} />
                            <TextInput
                                id="date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="month" value={t('الشهر')} />
                            <TextInput
                                id="month"
                                type="month"
                                className="mt-1 block w-full"
                                value={data.month}
                                onChange={(e) => setData('month', e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="entity_id" value={t('الجهة')} />
                            <SelectInput
                                id="entity_id"
                                className="mt-1"
                                value={data.entity_id}
                                onChange={(e) => setData('entity_id', e.target.value)}
                            >
                                <option value="">{t('الكل')}</option>
                                {entities.map((entity) =>
                                    entity.children.length > 0 ? (
                                        <optgroup key={entity.id} label={entity.name}>
                                            <option value={entity.id}>{entity.name} ({t('عام')})</option>
                                            {entity.children.map((child) => (
                                                <option key={child.id} value={child.id}>
                                                    {child.name}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ) : (
                                        <option key={entity.id} value={entity.id}>
                                            {entity.name}
                                        </option>
                                    )
                                )}
                            </SelectInput>
                        </div>

                        <div className="flex gap-2">
                            <TextInput
                                placeholder={t('نوع المخالفة')}
                                className="flex-1"
                                value={data.violation_type}
                                onChange={(e) => setData('violation_type', e.target.value)}
                            />
                            <PrimaryButton type="submit">{t('تطبيق')}</PrimaryButton>
                        </div>
                    </form>
                </Card>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <StatCard icon={CalendarCheck2} label={t('سجلات يوم :date', { date })} value={dailyCount} accent="brand" />
                    <StatCard icon={ClipboardList} label={t('إجمالي سجلات :month', { month })} value={monthlyTotal} accent="emerald" />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <div className="mb-4 flex items-center gap-2">
                            <Landmark className="h-4 w-4 text-slate-400" />
                            <h3 className="text-sm font-bold text-slate-800">{t('حسب الجهات هذا الشهر')}</h3>
                        </div>
                        <ul className="divide-y divide-slate-100 text-sm">
                            {byEntity.length === 0 && <li className="py-6 text-center text-slate-400">{t('لا توجد بيانات.')}</li>}
                            {byEntity.map((row) => (
                                <li key={row.entity} className="flex items-center justify-between py-2.5">
                                    <span className="text-slate-700">{row.entity}</span>
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
                            <h3 className="text-sm font-bold text-slate-800">{t('حسب نوع المخالفة هذا الشهر')}</h3>
                        </div>
                        <ul className="divide-y divide-slate-100 text-sm">
                            {byViolationType.length === 0 && <li className="py-6 text-center text-slate-400">{t('لا توجد بيانات.')}</li>}
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
