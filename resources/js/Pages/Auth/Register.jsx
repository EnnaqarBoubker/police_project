import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Alert from '@/Components/Alert';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="إنشاء حساب" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">إنشاء حساب مسؤول</h1>
                <p className="mt-1 text-sm text-slate-500">سيتم إنشاء حسابك وتحتاج إلى موافقة المشرف العام قبل تسجيل الدخول.</p>
            </div>

            <Alert variant="info" className="mb-6">
                لن تتمكن من تسجيل الدخول إلا بعد مراجعة طلبك والموافقة عليه من طرف المشرف العام.
            </Alert>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="الاسم الكامل" required />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="اسم المستخدم" required />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('username', e.target.value)}
                        required
                    />

                    <InputError message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="البريد الإلكتروني" required />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="password" value="كلمة المرور" required />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="تأكيد كلمة المرور" required />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />

                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>

                <PrimaryButton className="w-full" size="lg" disabled={processing}>
                    إرسال طلب التسجيل
                </PrimaryButton>

                <p className="text-center text-sm text-slate-500">
                    لديك حساب بالفعل؟{' '}
                    <Link href={route('login')} className="font-semibold text-brand-600 hover:text-brand-700">
                        تسجيل الدخول
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
