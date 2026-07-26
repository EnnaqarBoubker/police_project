import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import EntityPanel from './Partials/EntityPanel';
import useTranslation from '@/Hooks/useTranslation';
import { Head } from '@inertiajs/react';

export default function EntitiesIndex({ entities }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={t('الاجهزة والجهات')}
                    subtitle={t('الاجهزة والجهات الرئيسية التي يمكن ربطها بالسجلات — افتح جهة لإدارة فروعها')}
                />
            }
        >
            <Head title={t('الاجهزة والجهات')} />

            <EntityPanel
                entities={entities}
                parentId={null}
                getHref={(entity) => route('entities.show', entity.id)}
                getMeta={(entity) => (entity.children_count > 0 ? t(':n فروع', { n: entity.children_count }) : t(':n سجل', { n: entity.reports_count }))}
                emptyTitle={t('لا توجد جهات بعد')}
                emptyDescription={t('أضف أول جهة لتظهر في نموذج إضافة السجل.')}
                deleteWarning={(entity) =>
                    entity.children_count > 0
                        ? t('هل تريد حذف الجهة ":name"؟ سيتم حذف كل فروعها (:count) أيضًا، وستبقى السجلات المرتبطة بها بدون جهة.', {
                              name: entity.name,
                              count: entity.children_count,
                          })
                        : t('هل تريد حذف الجهة ":name"؟ ستبقى السجلات المرتبطة بها دون حذف.', { name: entity.name })
                }
            />
        </AuthenticatedLayout>
    );
}
