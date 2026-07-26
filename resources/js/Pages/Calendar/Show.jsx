import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import EmptyState from '@/Components/EmptyState';
import MobileRecordCard from '@/Components/MobileRecordCard';
import useTranslation from '@/Hooks/useTranslation';
import { entityLabel, countryLabel } from '@/Constants/reportOptions';
import { Head, Link } from '@inertiajs/react';
import { Plus, FileSearch, User2 } from 'lucide-react';

export default function CalendarShow({ date, dateLabel, reports }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={dateLabel}
                    subtitle={`${reports.length} ${t(reports.length === 1 ? 'سجل' : 'سجلات')} ${t('مسجلة في هذا اليوم')}`}
                    back={{ href: route('calendar.index'), label: t('العودة إلى التقويم') }}
                    actions={
                        <Link href={route('reports.create', { date })}>
                            <PrimaryButton>
                                <Plus className="h-4 w-4" />
                                {t('إضافة سجل')}
                            </PrimaryButton>
                        </Link>
                    }
                />
            }
        >
            <Head title={`${t('سجلات')} ${date}`} />

            <Card padding="p-0">
                {reports.length === 0 ? (
                    <EmptyState
                        icon={FileSearch}
                        title={t('لا توجد سجلات لهذا اليوم')}
                        description={t('ابدأ بإضافة أول سجل لهذا التاريخ.')}
                        action={
                            <Link href={route('reports.create', { date })}>
                                <PrimaryButton>
                                    <Plus className="h-4 w-4" />
                                    {t('إضافة سجل')}
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
                                        <th className="px-6 py-3.5 text-start">{t('الاسم')}</th>
                                        <th className="px-4 py-3.5 text-start">{t('وقت التقرير')}</th>
                                        <th className="px-4 py-3.5 text-start">{t('الجنسية')}</th>
                                        <th className="px-4 py-3.5 text-start">{t('الجهة')}</th>
                                        <th className="px-4 py-3.5 text-start">{t('نوع المخالفة')}</th>
                                        <th className="px-4 py-3.5 text-start">{t('العدد')}</th>
                                        <th className="px-4 py-3.5 text-start">{t('سجّله')}</th>
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
                                                    {report.full_name || t('بدون اسم')}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3.5 tabular-nums text-slate-600">{report.report_time?.slice(0, 5) ?? '—'}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{countryLabel(report.nationality)}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{entityLabel(report.entity)}</td>
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
                            {reports.map((report) => (
                                <MobileRecordCard
                                    key={report.id}
                                    title={report.full_name || t('بدون اسم')}
                                    titleHref={route('reports.show', report.id)}
                                    eyebrow={report.violation_type ?? t('بدون نوع')}
                                    fields={[
                                        { label: t('وقت التقرير'), value: report.report_time?.slice(0, 5) },
                                        { label: t('الجنسية'), value: countryLabel(report.nationality) },
                                        { label: t('الجهة'), value: entityLabel(report.entity) },
                                        { label: t('العدد'), value: report.count },
                                        { label: t('سجّله'), value: report.creator?.name },
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
