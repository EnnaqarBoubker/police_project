import { countryFlag, findCountry } from '@/Constants/countries';

export const GENDER_OPTIONS = [
    { value: 'male', label: 'ذكر' },
    { value: 'female', label: 'أنثى' },
];

export const MARITAL_STATUS_OPTIONS = [
    { value: 'single', label: 'أعزب' },
    { value: 'married', label: 'متزوج' },
    { value: 'divorced', label: 'مطلق' },
    { value: 'widowed', label: 'أرمل' },
];

export function optionLabel(options, value) {
    return options.find((option) => option.value === value)?.label ?? '—';
}

export function entityLabel(entity) {
    if (!entity) return '—';
    return entity.parent ? `${entity.parent.name} — ${entity.name}` : entity.name;
}

export function countryLabel(code) {
    if (!code) return '—';
    const country = findCountry(code);
    return country ? `${countryFlag(country.code)} ${country.name}` : code;
}
