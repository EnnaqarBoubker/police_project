import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

export default function AwaitingApproval() {
    return (
        <GuestLayout>
            <Head title="بانتظار الموافقة" />

            <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                    <Clock className="h-7 w-7 text-amber-500" />
                </div>

                <h1 className="mt-5 text-xl font-bold text-slate-900">تم إرسال طلب التسجيل</h1>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    تم إنشاء حسابك وهو الآن قيد المراجعة. يجب على المشرف العام الموافقة على حسابك قبل أن تتمكن من
                    تسجيل الدخول. ستتمكن من الدخول إلى النظام فور الموافقة على طلبك.
                </p>

                <Link href={route('login')} className="mt-6 inline-block">
                    <PrimaryButton>العودة إلى تسجيل الدخول</PrimaryButton>
                </Link>
            </div>
        </GuestLayout>
    );
}
