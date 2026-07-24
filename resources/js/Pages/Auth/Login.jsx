import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Alert from '@/Components/Alert';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="تسجيل الدخول" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">تسجيل الدخول</h1>
                <p className="mt-1 text-sm text-slate-500">أدخل بياناتك للوصول إلى مساحة العمل الخاصة بك.</p>
            </div>

            {status && (
                <Alert variant="success" className="mb-6">
                    {status}
                </Alert>
            )}

            {errors.username && (
                <Alert variant="danger" className="mb-6">
                    {errors.username}
                </Alert>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="username" value="اسم المستخدم" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="كلمة المرور" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm text-slate-600">تذكرني</span>
                    </label>

                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-sm font-medium text-brand-600 hover:text-brand-700">
                            نسيت كلمة المرور؟
                        </Link>
                    )}
                </div>

                <PrimaryButton className="w-full" size="lg" disabled={processing}>
                    تسجيل الدخول
                </PrimaryButton>

                <p className="text-center text-sm text-slate-500">
                    ليس لديك حساب؟{' '}
                    <Link href={route('register')} className="font-semibold text-brand-600 hover:text-brand-700">
                        إنشاء حساب جديد
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
