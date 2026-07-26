import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import PageHeader from '@/Components/PageHeader';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import useTranslation from '@/Hooks/useTranslation';
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS, optionLabel, entityLabel, countryLabel } from '@/Constants/reportOptions';
import { Head, Link, router } from '@inertiajs/react';
import {
    Pencil,
    Trash2,
    Users,
    UserRound,
    Cake,
    Globe2,
    HeartHandshake,
    CalendarDays,
    ShieldAlert,
    MapPin,
    Landmark,
    Hash,
    StickyNote,
    UserCheck,
    Clock,
} from 'lucide-react';

const TONES = {
    brand: 'bg-brand-50 text-brand-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-50 text-slate-400',
    indigo: 'bg-indigo-50 text-indigo-600',
};

function SectionTitle({ icon: Icon, tone = 'slate', children }) {
    return (
        <div className="mb-5 flex items-center gap-2.5">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${TONES[tone]}`}>
                <Icon className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-800">{children}</h3>
        </div>
    );
}

function Field({ icon: Icon, tone = 'slate', label, value }) {
    return (
        <div className="flex items-start gap-3">
            {Icon && (
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}>
                    <Icon className="h-4 w-4" />
                </span>
            )}
            <div className="min-w-0">
                <dt className="text-xs font-medium text-slate-400">{label}</dt>
                <dd className="mt-0.5 truncate text-sm font-semibold text-slate-800">{value ?? '—'}</dd>
            </div>
        </div>
    );
}

function formatDateTime(value) {
    return value ? value.slice(0, 16).replace('T', ' ') : '—';
}

function initials(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '—';
    return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

export default function ReportsShow({ report }) {
    const { t } = useTranslation();
    const name = report.full_name || t('بدون اسم');

    const destroy = () => {
        if (confirm(t('هل تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.'))) {
            router.delete(route('reports.destroy', report.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={name}
                    back={{ href: route('calendar.show', report.report_date), label: `${t('العودة إلى')} ${report.report_date}` }}
                    actions={
                        <>
                            <Link href={route('reports.edit', report.id)}>
                                <SecondaryButton type="button">
                                    <Pencil className="h-4 w-4" />
                                    {t('تعديل')}
                                </SecondaryButton>
                            </Link>
                            <DangerButton type="button" onClick={destroy}>
                                <Trash2 className="h-4 w-4" />
                                {t('حذف')}
                            </DangerButton>
                        </>
                    }
                />
            }
        >
            <Head title={name} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-200" />
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-lg font-bold text-brand-700">
                            {initials(name)}
                        </span>
                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-lg font-bold text-slate-900">{name}</h2>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <Badge variant="brand">{report.violation_type || t('بدون نوع مخالفة')}</Badge>
                                <Badge variant="neutral">#{report.id}</Badge>
                                <Badge variant="neutral">
                                    {report.report_date}
                                    {report.report_time ? ` · ${report.report_time.slice(0, 5)}` : ''}
                                </Badge>
                                {report.count > 1 && <Badge variant="warning">{t('العدد')}: {report.count}</Badge>}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <SectionTitle icon={UserRound} tone="brand">{t('بيانات الشخص')}</SectionTitle>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field icon={Cake} tone="brand" label={t('العمر')} value={report.age} />
                        <Field icon={UserRound} tone="brand" label={t('الجنس')} value={t(optionLabel(GENDER_OPTIONS, report.gender))} />
                        <Field icon={Globe2} tone="brand" label={t('الجنسية')} value={countryLabel(report.nationality)} />
                        <Field icon={HeartHandshake} tone="brand" label={t('الحالة الاجتماعية')} value={t(optionLabel(MARITAL_STATUS_OPTIONS, report.marital_status))} />
                    </div>
                </Card>

                <Card>
                    <SectionTitle icon={ShieldAlert} tone="amber">{t('تفاصيل المخالفة')}</SectionTitle>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field icon={CalendarDays} tone="amber" label={t('تاريخ التقرير')} value={report.report_date} />
                        <Field icon={Clock} tone="amber" label={t('وقت التقرير')} value={report.report_time?.slice(0, 5)} />
                        <Field icon={ShieldAlert} tone="amber" label={t('نوع المخالفة')} value={report.violation_type} />
                        <Field icon={MapPin} tone="amber" label={t('الموقع / المركز')} value={report.center?.name} />
                        <Field icon={Landmark} tone="amber" label={t('الجهة')} value={entityLabel(report.entity)} />
                        <Field icon={Hash} tone="amber" label={t('العدد')} value={report.count} />
                    </div>
                </Card>

                <Card>
                    <SectionTitle icon={StickyNote}>{t('ملاحظات إضافية')}</SectionTitle>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{report.notes || t('لا توجد ملاحظات.')}</p>
                </Card>

                {report.entities?.length > 0 && (
                    <Card>
                        <SectionTitle icon={Users} tone="indigo">{t('أطراف / جهات إضافية')}</SectionTitle>
                        <ul className="divide-y divide-slate-100">
                            {report.entities.map((entity) => (
                                <li key={entity.id} className="flex justify-between py-2.5 text-sm">
                                    <span className="font-medium text-slate-900">{entity.entity_name}</span>
                                    <span className="text-slate-500">{entity.entity_type}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 px-5 py-4 text-sm">
                    <span className="inline-flex items-center gap-2 font-medium text-slate-600">
                        <UserCheck className="h-4 w-4 text-slate-400" />
                        {t('أُضيف بواسطة')}: <span className="font-semibold text-slate-800">{report.creator?.name ?? '—'}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {t('أُنشئ في')} {formatDateTime(report.created_at)} · {t('آخر تحديث')} {formatDateTime(report.updated_at)}
                    </span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
