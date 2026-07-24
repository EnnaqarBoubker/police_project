import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';
import MobileRecordCard from '@/Components/MobileRecordCard';
import { Head, router } from '@inertiajs/react';
import { Power, Trash2, Users } from 'lucide-react';

function StatusBadge({ status, isActive }) {
    if (status === 'rejected') {
        return <Badge variant="danger" dot>مرفوض</Badge>;
    }
    if (!isActive) {
        return <Badge variant="neutral" dot>معطّل</Badge>;
    }
    return <Badge variant="success" dot>نشط</Badge>;
}

export default function AdminsIndex({ admins }) {
    const toggleActive = (user) => {
        router.patch(route('superadmin.admins.toggle-active', user.id), {}, { preserveScroll: true });
    };

    const destroy = (user) => {
        if (confirm(`هل تريد حذف حساب ${user.name} نهائيًا؟`)) {
            router.delete(route('superadmin.admins.destroy', user.id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            header={<PageHeader title="حسابات المسؤولين" subtitle="إدارة تفعيل الحسابات المعتمدة أو حذفها" />}
        >
            <Head title="حسابات المسؤولين" />

            <Card padding="p-0">
                {admins.length === 0 ? (
                    <EmptyState icon={Users} title="لا توجد حسابات مسؤولين بعد" />
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="min-w-full divide-y divide-slate-100 text-sm">
                                <thead>
                                    <tr className="text-start text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        <th className="px-6 py-3.5 text-start">الاسم</th>
                                        <th className="px-4 py-3.5 text-start">اسم المستخدم</th>
                                        <th className="px-4 py-3.5 text-start">البريد الإلكتروني</th>
                                        <th className="px-4 py-3.5 text-start">الحالة</th>
                                        <th className="px-4 py-3.5 text-end">الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {admins.map((user) => (
                                        <tr key={user.id} className="transition hover:bg-slate-50">
                                            <td className="px-6 py-3.5 font-semibold text-slate-900">{user.name}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{user.username}</td>
                                            <td className="px-4 py-3.5 text-slate-600">{user.email}</td>
                                            <td className="px-4 py-3.5">
                                                <StatusBadge status={user.status} isActive={user.is_active} />
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex justify-end gap-2">
                                                    {user.status === 'approved' && (
                                                        <SecondaryButton type="button" onClick={() => toggleActive(user)}>
                                                            <Power className="h-4 w-4" />
                                                            {user.is_active ? 'تعطيل' : 'إعادة تفعيل'}
                                                        </SecondaryButton>
                                                    )}
                                                    <DangerButton type="button" onClick={() => destroy(user)}>
                                                        <Trash2 className="h-4 w-4" />
                                                        حذف
                                                    </DangerButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-slate-100 md:hidden">
                            {admins.map((user) => (
                                <MobileRecordCard
                                    key={user.id}
                                    title={user.name}
                                    eyebrow={user.username}
                                    badge={<StatusBadge status={user.status} isActive={user.is_active} />}
                                    fields={[{ label: 'البريد الإلكتروني', value: user.email }]}
                                    actions={
                                        <>
                                            {user.status === 'approved' && (
                                                <SecondaryButton type="button" onClick={() => toggleActive(user)}>
                                                    <Power className="h-4 w-4" />
                                                    {user.is_active ? 'تعطيل' : 'إعادة تفعيل'}
                                                </SecondaryButton>
                                            )}
                                            <DangerButton type="button" onClick={() => destroy(user)}>
                                                <Trash2 className="h-4 w-4" />
                                                حذف
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
