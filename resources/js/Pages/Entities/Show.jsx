import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/PageHeader';
import EntityPanel from './Partials/EntityPanel';
import useTranslation from '@/Hooks/useTranslation';
import { Head } from '@inertiajs/react';

export default function EntitiesShow({ parent, entities }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <PageHeader
                    title={`${t('فروع')} ${parent.name}`}
                    subtitle={t('الاجهزة والجهات الفرعية التابعة لهذه الجهة')}
                    back={{ href: route('entities.index'), label: t('العودة إلى الاجهزة والجهات') }}
                />
            }
        >
            <Head title={`${t('فروع')} ${parent.name}`} />

            <EntityPanel
                entities={entities}
                parentId={parent.id}
                getMeta={(entity) => t(':n سجل', { n: entity.reports_count })}
                emptyTitle={t('لا توجد فروع بعد')}
                emptyDescription={t('أضف أول فرع تابع لـ :name.', { name: parent.name })}
                deleteWarning={(entity) => t('هل تريد حذف الفرع ":name"؟ ستبقى السجلات المرتبطة به دون حذف.', { name: entity.name })}
            />
        </AuthenticatedLayout>
    );
}
