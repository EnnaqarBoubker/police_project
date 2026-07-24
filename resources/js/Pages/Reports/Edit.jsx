import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import ReportForm from './Partials/ReportForm';
import { Head } from '@inertiajs/react';

export default function ReportsEdit({ report, centers, entities }) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={`تعديل السجل — ${report.full_name}`}
                    back={{ href: route('reports.show', report.id), label: 'العودة إلى السجل' }}
                />
            }
        >
            <Head title={`تعديل — ${report.full_name}`} />

            <Card>
                <ReportForm
                    report={report}
                    centers={centers}
                    entities={entities}
                    submitUrl={route('reports.update', report.id)}
                    method="put"
                    submitLabel="تحديث السجل"
                />
            </Card>
        </AuthenticatedLayout>
    );
}
