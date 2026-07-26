import { usePage } from '@inertiajs/react';
import fr from '@/Lang/fr.json';

const dictionaries = { fr };

/**
 * Minimal, dependency-free i18n: Arabic strings are used directly as the
 * lookup key (Arabic is the app's base language, so no ar.json is needed —
 * a missing key just falls back to the Arabic text itself). `fr.json` maps
 * every translatable Arabic phrase to its French equivalent.
 *
 * Usage: t('حفظ') // -> 'حفظ' in Arabic, 'Enregistrer' in French
 *        t('مرحبا :name', { name: 'Ali' }) // simple :placeholder support
 */
export default function useTranslation() {
    const { locale } = usePage().props;
    const dictionary = dictionaries[locale];

    const t = (text, replacements = {}) => {
        let translated = dictionary?.[text] ?? text;

        Object.entries(replacements).forEach(([key, value]) => {
            translated = translated.replace(`:${key}`, value);
        });

        return translated;
    };

    return { t, locale };
}
