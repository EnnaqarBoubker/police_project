import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import EntityPanel from './Partials/EntityPanel';
import { Head } from '@inertiajs/react';

export default function EntitiesIndex({ entities }) {
    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title="الجهات"
                    subtitle="الجهات الرئيسية التي يمكن ربطها بالسجلات — افتح جهة لإدارة فروعها"
                />
            }
        >
            <Head title="الجهات" />

            <EntityPanel
                entities={entities}
                parentId={null}
                getHref={(entity) => route('entities.show', entity.id)}
                getMeta={(entity) => (entity.children_count > 0 ? `${entity.children_count} فروع` : `${entity.reports_count} سجل`)}
                emptyTitle="لا توجد جهات بعد"
                emptyDescription="أضف أول جهة لتظهر في نموذج إضافة السجل."
                deleteWarning={(entity) =>
                    entity.children_count > 0
                        ? `هل تريد حذف الجهة "${entity.name}"؟ سيتم حذف كل فروعها (${entity.children_count}) أيضًا، وستبقى السجلات المرتبطة بها بدون جهة.`
                        : `هل تريد حذف الجهة "${entity.name}"؟ ستبقى السجلات المرتبطة بها دون حذف.`
                }
            />
        </AuthenticatedLayout>
    );
}
