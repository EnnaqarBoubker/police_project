import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import EmptyState from '@/Components/EmptyState';
import MobileRecordCard from '@/Components/MobileRecordCard';
import CountrySelect from '@/Components/CountrySelect';
import useTranslation from '@/Hooks/useTranslation';
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS, optionLabel, entityLabel, countryLabel } from '@/Constants/reportOptions';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Search, SlidersHorizontal, FileSearch, FileDown, User2, ChevronDown, X } from 'lucide-react';

export default function ReportsIndex({ reports, entities, filters }) {
    const { t } = useTranslation();
    const [filtersOpen, setFiltersOpen] = useState(false);

    const { data, setData, get } = useForm({
        search: filters.search ?? '',
        date: filters.date ?? '',
        entity_id: filters.entity_id ?? '',
        gender: filters.gender ?? '',
        nationality: filters.nationality ?? '',
        marital_status: filters.marital_status ?? '',
        violation_type: filters.violation_type ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('reports.index'), { preserveState: true });
    };

    const clear = () => {
        router.get(route('reports.index'));
    };

    const activeFilterParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== '' && value !== null && value !== undefined)
    );
    const exportHref = `${route('reports.export')}?${new URLSearchParams(activeFilterParams).toString()}`;

    const findEntityName = (id) => {
        for (const entity of entities) {
            if (String(entity.id) === String(id)) return entity.name;
            const child = entity.children.find((c) => String(c.id) === String(id));
            if (child) return child.name;
        }
        return id;
    };

    const activeChips = [
        filters.search && { key: 'search', label: `${t('بحث')}: ${filters.search}` },
        filters.date && { key: 'date', label: `${t('التاريخ')}: ${filters.date}` },
        filters.entity_id && { key: 'entity_id', label: `${t('الجهة')}: ${findEntityName(filters.entity_id)}` },
        filters.gender && { key: 'gender', label: `${t('الجنس')}: ${t(optionLabel(GENDER_OPTIONS, filters.gender))}` },
        filters.nationality && { key: 'nationality', label: `${t('الجنسية')}: ${countryLabel(filters.nationality)}` },
        filters.marital_status && { key: 'marital_status', label: `${t('الحالة')}: ${t(optionLabel(MARITAL_STATUS_OPTIONS, filters.marital_status))}` },
        filters.violation_type && { key: 'violation_type', label: `${t('المخالفة')}: ${filters.violation_type}` },
    ].filter(Boolean);

    const removeFilter = (key) => {
        const next = { ...activeFilterParams };
        delete next[key];
        router.get(route('reports.index'), next, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={t('البحث والتصفية في السجلات')}
                    subtitle={t('ابحث عبر كامل قاعدة البيانات المشتركة')}
                    actions={
                        <PrimaryButton as="a" href={exportHref}>
                            <FileDown className="h-4 w-4" />
                            {t('تصدير Excel')}
                        </PrimaryButton>
                    }
                />
            }
        >
            <Head title={t('السجلات')} />

            <div className="space-y-6">
                <Card>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                            {t('عوامل التصفية')}
                        </div>
                        <button
                            type="button"
                            onClick={() => setFiltersOpen((open) => !open)}
                            className="flex items-center gap-1 text-sm font-medium text-brand-600 md:hidden"
                        >
                            {filtersOpen ? t('إخفاء الخيارات') : t('مزيد من الخيارات')}
                            <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        <div className="sm:col-span-3 lg:col-span-2">
                            <InputLabel htmlFor="search" value={t('البحث (الاسم أو رقم السجل)')} />
                            <div className="relative mt-1">
                                <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <TextInput
                                    id="search"
                                    className="block w-full ps-9"
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={`${filtersOpen ? 'contents' : 'hidden'} md:contents`}>
                            <div>
                                <InputLabel htmlFor="date" value={t('التاريخ')} />
                                <TextInput
                                    id="date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
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

                            <div>
                                <InputLabel htmlFor="gender" value={t('الجنس')} />
                                <SelectInput
                                    id="gender"
                                    className="mt-1"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                >
                                    <option value="">{t('الكل')}</option>
                                    {GENDER_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {t(o.label)}
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>

                            <div>
                                <InputLabel htmlFor="nationality" value={t('الجنسية')} />
                                <div className="mt-1">
                                    <CountrySelect id="nationality" value={data.nationality} onChange={(code) => setData('nationality', code)} />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="marital_status" value={t('الحالة الاجتماعية')} />
                                <SelectInput
                                    id="marital_status"
                                    className="mt-1"
                                    value={data.marital_status}
                                    onChange={(e) => setData('marital_status', e.target.value)}
                                >
                                    <option value="">{t('الكل')}</option>
                                    {MARITAL_STATUS_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {t(o.label)}
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>

                            <div className="lg:col-span-2">
                                <InputLabel htmlFor="violation_type" value={t('نوع المخالفة')} />
                                <TextInput
                                    id="violation_type"
                                    className="mt-1 block w-full"
                                    value={data.violation_type}
                                    onChange={(e) => setData('violation_type', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-end gap-2 sm:col-span-3 lg:col-span-2">
                            <PrimaryButton type="submit" className="w-full sm:w-auto">
                                {t('تصفية')}
                            </PrimaryButton>
                            <SecondaryButton type="button" onClick={clear}>
                                {t('مسح')}
                            </SecondaryButton>
                        </div>
                    </form>
                </Card>

                {(reports.total > 0 || activeChips.length > 0) && (
                    <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                        <p className="text-sm text-slate-500">
                            {reports.total > 0
                                ? t('عرض :from–:to من أصل :total سجل', { from: reports.from, to: reports.to, total: reports.total })
                                : t('لا نتائج')}
                        </p>
                        {activeChips.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {activeChips.map((chip) => (
                                    <button
                                        key={chip.key}
                                        type="button"
                                        onClick={() => removeFilter(chip.key)}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 transition hover:bg-brand-100"
                                    >
                                        {chip.label}
                                        <X className="h-3 w-3" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <Card padding="p-0">
                    {reports.data.length === 0 ? (
                        <EmptyState icon={FileSearch} title={t('لا توجد سجلات مطابقة')} description={t('جرّب تعديل معايير البحث أو التصفية.')} />
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="min-w-full divide-y divide-slate-100 text-sm">
                                    <thead>
                                        <tr className="text-start text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            <th className="px-6 py-3.5 text-start">#</th>
                                            <th className="px-4 py-3.5 text-start">{t('الاسم')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('التاريخ')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('الجهة')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('الجنس')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('الجنسية')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('الحالة الاجتماعية')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('المخالفة')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('العدد')}</th>
                                            <th className="px-4 py-3.5 text-start">{t('أُضيف بواسطة')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {reports.data.map((report) => (
                                            <tr key={report.id} className="transition hover:bg-slate-50">
                                                <td className="px-6 py-3.5 text-slate-400">#{report.id}</td>
                                                <td className="px-4 py-3.5">
                                                    <Link
                                                        href={route('reports.show', report.id)}
                                                        className="font-semibold text-brand-600 hover:text-brand-700"
                                                    >
                                                        {report.full_name || t('بدون اسم')}
                                                    </Link>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5 tabular-nums text-slate-600">
                                                    {report.report_date}
                                                    {report.report_time && (
                                                        <span className="text-xs text-slate-400"> · {report.report_time.slice(0, 5)}</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3.5 text-slate-600">{entityLabel(report.entity)}</td>
                                                <td className="px-4 py-3.5 text-slate-600">{t(optionLabel(GENDER_OPTIONS, report.gender))}</td>
                                                <td className="px-4 py-3.5 text-slate-600">{countryLabel(report.nationality)}</td>
                                                <td className="px-4 py-3.5 text-slate-600">{t(optionLabel(MARITAL_STATUS_OPTIONS, report.marital_status))}</td>
                                                <td className="px-4 py-3.5 text-slate-600">{report.violation_type ?? '—'}</td>
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
                                {reports.data.map((report) => (
                                    <MobileRecordCard
                                        key={report.id}
                                        title={report.full_name || t('بدون اسم')}
                                        titleHref={route('reports.show', report.id)}
                                        eyebrow={`#${report.id} — ${report.violation_type ?? t('بدون نوع')}`}
                                        fields={[
                                            {
                                                label: t('التاريخ'),
                                                value: report.report_time ? `${report.report_date} ${report.report_time.slice(0, 5)}` : report.report_date,
                                            },
                                            { label: t('الجهة'), value: entityLabel(report.entity) },
                                            { label: t('الجنس'), value: t(optionLabel(GENDER_OPTIONS, report.gender)) },
                                            { label: t('الجنسية'), value: countryLabel(report.nationality) },
                                            { label: t('الحالة الاجتماعية'), value: t(optionLabel(MARITAL_STATUS_OPTIONS, report.marital_status)) },
                                            { label: t('العدد'), value: report.count },
                                            { label: t('أُضيف بواسطة'), value: report.creator?.name },
                                        ]}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {reports.links?.length > 3 && (
                        <div className="flex flex-wrap gap-1.5 border-t border-slate-100 p-4">
                            {reports.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url ?? '#'}
                                    preserveState
                                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                                        link.active
                                            ? 'bg-brand-600 text-white'
                                            : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
