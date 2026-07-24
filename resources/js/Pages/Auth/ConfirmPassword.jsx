import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="تأكيد كلمة المرور" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">تأكيد كلمة المرور</h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    هذه منطقة محمية من التطبيق. يرجى تأكيد كلمة المرور قبل المتابعة.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="password" value="كلمة المرور" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} />
                </div>

                <PrimaryButton className="w-full" size="lg" disabled={processing}>
                    تأكيد
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
