import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import useTranslation from '@/Hooks/useTranslation';
import { useForm } from '@inertiajs/react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const { t } = useTranslation();
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
        <section className={`space-y-5 ${className}`}>
            <header className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                    <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                    <h2 className="text-lg font-bold text-rose-950">{t('حذف الحساب')}</h2>
                    <p className="mt-1 text-sm text-rose-900/70">
                        {t('بمجرد حذف حسابك، سيتم حذف جميع بياناته نهائيًا. يرجى تحميل أي بيانات ترغب في الاحتفاظ بها قبل ذلك.')}
                    </p>
                </div>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                <Trash2 className="h-4 w-4" />
                {t('حذف الحساب')}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                            <AlertTriangle className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">{t('هل أنت متأكد من رغبتك في حذف حسابك؟')}</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {t('بمجرد حذف حسابك، سيتم حذف جميع بياناته نهائيًا. أدخل كلمة المرور لتأكيد رغبتك في حذف حسابك نهائيًا.')}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value={t('كلمة المرور')} className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full"
                            isFocused
                            placeholder={t('كلمة المرور')}
                        />

                        <InputError message={errors.password && t(errors.password)} />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>{t('إلغاء')}</SecondaryButton>

                        <DangerButton disabled={processing}>
                            <Trash2 className="h-4 w-4" />
                            {t('حذف الحساب')}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
