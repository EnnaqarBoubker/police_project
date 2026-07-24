import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import ReportForm from './Partials/ReportForm';
import { Head } from '@inertiajs/react';

export default function ReportsCreate({ centers, entities, date }) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title="إضافة سجل جديد"
                    subtitle={date ? `تاريخ التقرير: ${date}` : 'تسجيل تقرير أو مخالفة جديدة'}
                    back={date ? { href: route('calendar.show', date), label: `العودة إلى ${date}` } : { href: route('calendar.index'), label: 'العودة إلى التقويم' }}
                />
            }
        >
            <Head title="إضافة تقرير" />

            <Card>
                <ReportForm centers={centers} entities={entities} defaultDate={date} submitUrl={route('reports.store')} method="post" submitLabel="إنشاء السجل" />
            </Card>
        </AuthenticatedLayout>
    );
}
