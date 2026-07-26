import useTranslation from '@/Hooks/useTranslation';
import { Globe } from 'lucide-react';

/**
 * Plain <a> tags (not Inertia <Link>) on purpose — switching language needs a
 * full browser navigation so the <html lang/dir> attributes rendered by the
 * Blade root shell are re-evaluated, which an SPA-style Inertia visit won't do.
 */
export default function LanguageSwitcher({ variant = 'dark' }) {
    const { locale } = useTranslation();

    const base = 'flex items-center gap-1.5 rounded-full px-1 py-1 text-xs font-semibold';
    const theme =
        variant === 'dark'
            ? 'bg-white/5 text-slate-300'
            : 'bg-slate-100 text-slate-500';

    const itemActive = variant === 'dark' ? 'bg-white/15 text-white' : 'bg-white text-slate-900 shadow-sm';
    const itemInactive = variant === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800';

    return (
        <div className={`${base} ${theme}`}>
            <Globe className="ms-1.5 h-3.5 w-3.5 shrink-0 opacity-70" />
            <a
                href={route('locale.switch', 'ar')}
                className={`rounded-full px-2 py-1 transition ${locale === 'ar' ? itemActive : itemInactive}`}
            >
                العربية
            </a>
            <a
                href={route('locale.switch', 'fr')}
                className={`rounded-full px-2 py-1 transition ${locale === 'fr' ? itemActive : itemInactive}`}
            >
                Français
            </a>
        </div>
    );
}
