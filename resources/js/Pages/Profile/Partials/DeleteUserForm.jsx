import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-slate-900">حذف الحساب</h2>
                <p className="mt-1 text-sm text-slate-500">
                    بمجرد حذف حسابك، سيتم حذف جميع بياناته نهائيًا. يرجى تحميل أي بيانات ترغب في الاحتفاظ بها قبل ذلك.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>حذف الحساب</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-bold text-slate-900">هل أنت متأكد من رغبتك في حذف حسابك؟</h2>

                    <p className="mt-1 text-sm text-slate-500">
                        بمجرد حذف حسابك، سيتم حذف جميع بياناته نهائيًا. أدخل كلمة المرور لتأكيد رغبتك في حذف حسابك نهائيًا.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="كلمة المرور" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-3/4"
                            isFocused
                            placeholder="كلمة المرور"
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>إلغاء</SecondaryButton>

                        <DangerButton disabled={processing}>حذف الحساب</DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
