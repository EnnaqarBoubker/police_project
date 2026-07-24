import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import EntityPanel from './Partials/EntityPanel';
import { Head } from '@inertiajs/react';

export default function EntitiesShow({ parent, entities }) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={`فروع ${parent.name}`}
                    subtitle="الجهات الفرعية التابعة لهذه الجهة"
                    back={{ href: route('entities.index'), label: 'العودة إلى الجهات' }}
                />
            }
        >
            <Head title={`فروع ${parent.name}`} />

            <EntityPanel
                entities={entities}
                parentId={parent.id}
                getMeta={(entity) => `${entity.reports_count} سجل`}
                emptyTitle="لا توجد فروع بعد"
                emptyDescription={`أضف أول فرع تابع لـ ${parent.name}.`}
                deleteWarning={(entity) => `هل تريد حذف الفرع "${entity.name}"؟ ستبقى السجلات المرتبطة به دون حذف.`}
            />
        </AuthenticatedLayout>
    );
}
