import ApplicationLogo from '@/Components/ApplicationLogo';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import useTranslation from '@/Hooks/useTranslation';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-brand-900 p-12 text-white lg:flex">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="relative flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-11 w-11 text-brand-400" />
                        <div>
                            <p className="text-lg font-extrabold tracking-wide">Sûreté Régionale de Nador</p>
                            <p className="text-xs font-medium text-slate-400">{t('نظام إدارة التقارير الأمنية')}</p>
                        </div>
                    </Link>
                    <LanguageSwitcher variant="dark" />
                </div>

                <div className="relative">
                    <h2 className="text-3xl font-bold leading-snug">{t('بوابة تدبير الهجرة على مستوى إقليمي الناظور والدريوش')}</h2>
                </div>

                <p className="relative text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} Sûreté Régionale de Nador — {t('جميع الحقوق محفوظة')}
                </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
                <div className="mb-8 flex w-full max-w-md items-center justify-between lg:hidden">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10 text-brand-600" />
                        <div>
                            <p className="text-base font-extrabold tracking-wide text-slate-900">Sûreté Régionale de Nador</p>
                            <p className="text-[11px] font-medium text-slate-400">{t('نظام إدارة التقارير الأمنية')}</p>
                        </div>
                    </div>
                    <LanguageSwitcher variant="light" />
                </div>

                <div className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-white p-8 shadow-card">
                    {children}
                </div>
            </div>
        </div>
    );
}
