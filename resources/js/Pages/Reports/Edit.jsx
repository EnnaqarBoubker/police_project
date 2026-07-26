import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import ReportForm from './Partials/ReportForm';
import useTranslation from '@/Hooks/useTranslation';
import { Head } from '@inertiajs/react';

export default function ReportsEdit({ report, entities }) {
    const { t } = useTranslation();
    const name = report.full_name || t('بدون اسم');

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={`${t('تعديل السجل')} — ${name}`}
                    back={{ href: route('reports.show', report.id), label: t('العودة إلى السجل') }}
                />
            }
        >
            <Head title={`${t('تعديل')} — ${name}`} />

            <Card>
                <ReportForm
                    report={report}
                    entities={entities}
                    submitUrl={route('reports.update', report.id)}
                    method="put"
                    submitLabel="تحديث السجل"
                />
            </Card>
        </AuthenticatedLayout>
    );
}
