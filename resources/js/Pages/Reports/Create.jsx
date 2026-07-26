import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import ReportForm from './Partials/ReportForm';
import useTranslation from '@/Hooks/useTranslation';
import { Head } from '@inertiajs/react';

export default function ReportsCreate({ entities, date }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={t('إضافة سجل جديد')}
                    subtitle={t('تسجيل تقرير أو مخالفة جديدة — يمكن إضافة أكثر من شخص في نفس السجل')}
                    back={
                        date
                            ? { href: route('calendar.show', date), label: `${t('العودة إلى')} ${date}` }
                            : { href: route('calendar.index'), label: t('العودة إلى التقويم') }
                    }
                />
            }
        >
            <Head title={t('إضافة تقرير')} />

            <Card>
                <ReportForm
                    entities={entities}
                    defaultDate={date}
                    submitUrl={route('reports.store')}
                    method="post"
                    submitLabel="حفظ السجل"
                    allowMultiplePeople
                />
            </Card>
        </AuthenticatedLayout>
    );
}
