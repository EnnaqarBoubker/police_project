import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import EmptyState from '@/Components/EmptyState';
import MobileRecordCard from '@/Components/MobileRecordCard';
import { Head, router } from '@inertiajs/react';
import { Check, X, UserCheck } from 'lucide-react';

export default function RequestsIndex({ pendingUsers }) {
    const approve = (user) => {
        router.post(route('superadmin.requests.approve', user.id), {}, { preserveScroll: true });
    };

    const reject = (user) => {
        if (confirm(`رفض طلب ${user.name}؟`)) {
            router.post(route('superadmin.requests.reject', user.id), {}, { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            header={<PageHeader title="طلبات الانتساب المعلّقة" subtitle="راجع طلبات الحسابات الجديدة ووافق عليها أو ارفضها" />}
        >
            <Head title="طلبات الانتساب" />

            <Card padding="p-0">
                {pendingUsers.length === 0 ? (
                    <EmptyState icon={UserCheck} title="لا توجد طلبات معلّقة حاليًا" description="ستظهر هنا طلبات الحسابات الجديدة فور تقديمها." />
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-slate-100 text-sm">
                                <thead>
                                    <tr className="text-start text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        <th className="px-6 py-3.5 text-start">الاسم</th>
                                        <th className="px-4 py-3.5 text-start">اسم المستخدم</th>
                                        <th className="px-4 py-3.5 text-start">البريد الإلكتروني</th>
                                        <th className="px-4 py-3.5 text-start">تاريخ الطلب</th>
                                        <th className="px-4 py-3.5 text-end">الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {pendingUsers.map((user) => (
                                        <tr key={user.id} className="transition hover:bg-slate-50">
                                            <td className="px-6 py-3.5 font-semibold text-slate-900">{user.name}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{user.username}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{user.email}</td>
                                            <td className="px-4 py-3.5 tabular-nums text-slate-500">
                                                {new Date(user.created_at).toLocaleDateString('ar')}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex justify-end gap-2">
                                                    <PrimaryButton type="button" variant="success" onClick={() => approve(user)}>
                                                        <Check className="h-4 w-4" />
                                                        قبول
                                                    </PrimaryButton>
                                                    <DangerButton type="button" onClick={() => reject(user)}>
                                                        <X className="h-4 w-4" />
                                                        رفض
                                                    </DangerButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-slate-100 md:hidden">
                            {pendingUsers.map((user) => (
                                <MobileRecordCard
                                    key={user.id}
                                    title={user.name}
                                    eyebrow={user.username}
                                    fields={[
                                        { label: 'البريد الإلكتروني', value: user.email },
                                        { label: 'تاريخ الطلب', value: new Date(user.created_at).toLocaleDateString('ar') },
                                    ]}
                                    actions={
                                        <>
                                            <PrimaryButton type="button" variant="success" onClick={() => approve(user)}>
                                                <Check className="h-4 w-4" />
                                                قبول
                                            </PrimaryButton>
                                            <DangerButton type="button" onClick={() => reject(user)}>
                                                <X className="h-4 w-4" />
                                                رفض
                                            </DangerButton>
                                        </>
                                    }
                                />
                            ))}
                        </div>
                    </>
                )}
            </Card>
        </AuthenticatedLayout>
    );
}
