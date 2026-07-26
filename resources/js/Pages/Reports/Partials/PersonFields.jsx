import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import CountrySelect from '@/Components/CountrySelect';
import useTranslation from '@/Hooks/useTranslation';
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS } from '@/Constants/reportOptions';

/** Full name / age / gender / nationality / marital status / count — reused for a single person and for each row of the multi-person batch form. */
export default function PersonFields({ idPrefix, values, onChange, errors = {}, nameInputRef, nameAutoFocus = false }) {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
                <InputLabel htmlFor={`${idPrefix}_full_name`} value={t('الاسم الكامل')} />
                <TextInput
                    id={`${idPrefix}_full_name`}
                    ref={nameInputRef}
                    className="mt-1 block w-full"
                    value={values.full_name}
                    onChange={(e) => onChange('full_name', e.target.value)}
                    isFocused={nameAutoFocus}
                />
                <InputError message={errors.full_name} />
            </div>

            <div>
                <InputLabel htmlFor={`${idPrefix}_age`} value={t('العمر')} />
                <TextInput
                    id={`${idPrefix}_age`}
                    type="number"
                    min="0"
                    max="150"
                    className="mt-1 block w-full"
                    value={values.age}
                    onChange={(e) => onChange('age', e.target.value)}
                />
                <InputError message={errors.age} />
            </div>

            <div>
                <InputLabel htmlFor={`${idPrefix}_gender`} value={t('الجنس')} />
                <SelectInput id={`${idPrefix}_gender`} className="mt-1" value={values.gender} onChange={(e) => onChange('gender', e.target.value)}>
                    <option value="">—</option>
                    {GENDER_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {t(o.label)}
                        </option>
                    ))}
                </SelectInput>
                <InputError message={errors.gender} />
            </div>

            <div>
                <InputLabel htmlFor={`${idPrefix}_nationality`} value={t('الجنسية')} />
                <div className="mt-1">
                    <CountrySelect id={`${idPrefix}_nationality`} value={values.nationality} onChange={(code) => onChange('nationality', code)} />
                </div>
                <InputError message={errors.nationality} />
            </div>

            <div>
                <InputLabel htmlFor={`${idPrefix}_marital_status`} value={t('الحالة الاجتماعية')} />
                <SelectInput
                    id={`${idPrefix}_marital_status`}
                    className="mt-1"
                    value={values.marital_status}
                    onChange={(e) => onChange('marital_status', e.target.value)}
                >
                    <option value="">—</option>
                    {MARITAL_STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                            {t(o.label)}
                        </option>
                    ))}
                </SelectInput>
                <InputError message={errors.marital_status} />
            </div>

            <div>
                <InputLabel htmlFor={`${idPrefix}_count`} value={t('العدد')} />
                <TextInput
                    id={`${idPrefix}_count`}
                    type="number"
                    min="1"
                    className="mt-1 block w-full"
                    value={values.count}
                    onChange={(e) => onChange('count', e.target.value)}
                />
                <InputError message={errors.count} />
            </div>
        </div>
    );
}
