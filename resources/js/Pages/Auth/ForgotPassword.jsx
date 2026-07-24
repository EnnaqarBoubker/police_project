import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Alert from '@/Components/Alert';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="استعادة كلمة المرور" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">نسيت كلمة المرور؟</h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    لا مشكلة. أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
                </p>
            </div>

            {status && (
                <Alert variant="success" className="mb-6">
                    {status}
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="البريد الإلكتروني" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <PrimaryButton className="w-full" size="lg" disabled={processing}>
                    إرسال رابط إعادة التعيين
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
