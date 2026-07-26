import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import useTranslation from '@/Hooks/useTranslation';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout user={auth.user} header={<PageHeader title={t('الملف الشخصي')} subtitle={t('إدارة معلومات حسابك وإعدادات الأمان')} />}>
            <Head title={t('الملف الشخصي')} />

            <div className="mx-auto max-w-3xl space-y-6">
                <Card>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </Card>

                <Card>
                    <UpdatePasswordForm />
                </Card>

                {/* <Card className="border-rose-200/70 bg-rose-50/40">
                    <DeleteUserForm />
                </Card> */}
            </div>
        </AuthenticatedLayout>
    );
}
