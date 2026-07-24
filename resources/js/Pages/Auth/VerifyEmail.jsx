import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Alert from '@/Components/Alert';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="تأكيد البريد الإلكتروني" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">تأكيد البريد الإلكتروني</h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    شكرًا لتسجيلك! قبل البدء، يرجى تأكيد بريدك الإلكتروني بالنقر على الرابط الذي أرسلناه إليك. إذا لم
                    تستلم الرسالة، يمكننا إرسال رابط آخر بكل سرور.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <Alert variant="success" className="mb-6">
                    تم إرسال رابط تأكيد جديد إلى البريد الإلكتروني الذي أدخلته عند التسجيل.
                </Alert>
            )}

            <form onSubmit={submit} className="flex items-center justify-between gap-4">
                <PrimaryButton disabled={processing}>إعادة إرسال رابط التأكيد</PrimaryButton>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                    تسجيل الخروج
                </Link>
            </form>
        </GuestLayout>
    );
}
