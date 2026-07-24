import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<PageHeader title="الملف الشخصي" subtitle="إدارة معلومات حسابك وإعدادات الأمان" />}>
            <Head title="الملف الشخصي" />

            <div className="mx-auto max-w-3xl space-y-6">
                <Card>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </Card>

                <Card>
                    <UpdatePasswordForm />
                </Card>

                <Card>
                    <DeleteUserForm />
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
