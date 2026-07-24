import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS, optionLabel, entityLabel } from '@/Constants/reportOptions';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2, Users } from 'lucide-react';

function Field({ label, value }) {
    return (
        <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
            <dd className="mt-1.5 text-sm font-medium text-slate-900">{value ?? '—'}</dd>
        </div>
    );
}

export default function ReportsShow({ report }) {
    const destroy = () => {
        if (confirm('هل تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.')) {
            router.delete(route('reports.destroy', report.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={report.full_name}
                    back={{ href: route('calendar.show', report.report_date), label: `العودة إلى ${report.report_date}` }}
                    actions={
                        <>
                            <Link href={route('reports.edit', report.id)}>
                                <SecondaryButton type="button">
                                    <Pencil className="h-4 w-4" />
                                    تعديل
                                </SecondaryButton>
                            </Link>
                            <DangerButton type="button" onClick={destroy}>
                                <Trash2 className="h-4 w-4" />
                                حذف
                            </DangerButton>
                        </>
                    }
                />
            }
        >
            <Head title={report.full_name} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Card>
                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Field label="الاسم الكامل" value={report.full_name} />
                        <Field label="تاريخ التقرير" value={report.report_date} />
                        <Field label="العمر" value={report.age} />
                        <Field label="الجنس" value={optionLabel(GENDER_OPTIONS, report.gender)} />
                        <Field label="الحالة الاجتماعية" value={optionLabel(MARITAL_STATUS_OPTIONS, report.marital_status)} />
                        <Field label="الموقع / المركز" value={report.center?.name} />
                        <Field label="الجهة" value={entityLabel(report.entity)} />
                        <Field label="نوع المخالفة" value={report.violation_type} />
                        <Field label="العدد" value={report.count} />
                        <Field label="أُضيف بواسطة" value={report.creator?.name} />
                    </dl>

                    <div className="mt-6 border-t border-slate-100 pt-6">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">ملاحظات إضافية</dt>
                        <dd className="mt-1.5 whitespace-pre-line text-sm text-slate-700">{report.notes || '—'}</dd>
                    </div>
                </Card>

                {report.entities?.length > 0 && (
                    <Card>
                        <div className="mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4 text-slate-400" />
                            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">أطراف / جهات إضافية</dt>
                        </div>
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
            </div>
        </AuthenticatedLayout>
    );
}
