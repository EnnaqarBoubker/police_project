import { useRef, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Textarea from '@/Components/Textarea';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PersonFields from './PersonFields';
import useTranslation from '@/Hooks/useTranslation';
import { useForm } from '@inertiajs/react';
import { Trash2, CalendarDays, Clock, UserPlus } from 'lucide-react';

function SectionTitle({ children }) {
    return <h3 className="text-sm font-bold text-slate-800">{children}</h3>;
}

const emptyPerson = () => ({ full_name: '', age: '', gender: '', nationality: '', marital_status: '', count: 1 });

/** Locate which top-level entity (and, if any, which branch) an entity id belongs to. */
function locateEntity(tree, entityId) {
    const id = entityId ? Number(entityId) : null;
    if (!id) return { topEntityId: '', branchId: '' };

    for (const top of tree) {
        if (top.id === id) return { topEntityId: top.id, branchId: '' };
        if (top.children?.some((child) => child.id === id)) return { topEntityId: top.id, branchId: id };
    }

    return { topEntityId: '', branchId: '' };
}

export default function ReportForm({
    report,
    entities = [],
    defaultDate,
    submitUrl,
    method = 'post',
    submitLabel = 'حفظ السجل',
    allowMultiplePeople = false,
}) {
    const { t } = useTranslation();
    const [{ topEntityId, branchId }, setEntitySelection] = useState(() => locateEntity(entities, report?.entity_id));
    const firstNameRef = useRef(null);

    const { data, setData, post, put, processing, errors } = useForm(
        allowMultiplePeople
            ? {
                  report_date: defaultDate ?? new Date().toISOString().slice(0, 10),
                  report_time: report?.report_time?.slice(0, 5) ?? '',
                  violation_type: '',
                  entity_id: '',
                  notes: '',
                  people: [emptyPerson()],
              }
            : {
                  full_name: report?.full_name ?? '',
                  report_date: report?.report_date ?? defaultDate ?? new Date().toISOString().slice(0, 10),
                  report_time: report?.report_time?.slice(0, 5) ?? '',
                  age: report?.age ?? '',
                  gender: report?.gender ?? '',
                  nationality: report?.nationality ?? '',
                  marital_status: report?.marital_status ?? '',
                  entity_id: report?.entity_id ?? '',
                  violation_type: report?.violation_type ?? '',
                  count: report?.count ?? 1,
                  notes: report?.notes ?? '',
              }
    );

    const submit = (e) => {
        e.preventDefault();
        if (method === 'put') {
            put(submitUrl);
        } else {
            post(submitUrl);
        }
    };

    const addPerson = () => {
        setData('people', [...data.people, emptyPerson()]);
        requestAnimationFrame(() => firstNameRef.current?.focus());
    };
    const removePerson = (idx) => setData('people', data.people.filter((_, i) => i !== idx));
    const updatePerson = (idx, field, value) => {
        const next = [...data.people];
        next[idx] = { ...next[idx], [field]: value };
        setData('people', next);
    };
    const personErrors = (idx) => ({
        full_name: errors[`people.${idx}.full_name`],
        age: errors[`people.${idx}.age`],
        gender: errors[`people.${idx}.gender`],
        nationality: errors[`people.${idx}.nationality`],
        marital_status: errors[`people.${idx}.marital_status`],
        count: errors[`people.${idx}.count`],
    });

    const selectedTopEntity = entities.find((e) => e.id === topEntityId);
    const branches = selectedTopEntity?.children ?? [];

    const selectTopEntity = (value) => {
        const id = value ? Number(value) : '';
        const top = entities.find((e) => e.id === id);
        const hasBranches = (top?.children?.length ?? 0) > 0;
        setEntitySelection({ topEntityId: id, branchId: '' });
        setData('entity_id', hasBranches ? '' : id || '');
    };

    const selectBranch = (value) => {
        const id = value ? Number(value) : '';
        setEntitySelection((prev) => ({ ...prev, branchId: id }));
        setData('entity_id', id || '');
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div>
                <div className="flex items-center justify-between">
                    <SectionTitle>{allowMultiplePeople ? t('بيانات الأشخاص') : t('بيانات الشخص')}</SectionTitle>
                    {allowMultiplePeople && (
                        <SecondaryButton type="button" onClick={addPerson}>
                            <UserPlus className="h-4 w-4" />
                            {t('إضافة شخص آخر')}
                        </SecondaryButton>
                    )}
                </div>

                {allowMultiplePeople ? (
                    <div className="mt-4 space-y-5">
                        {data.people.map((person, idx) => (
                            <div key={idx} className="rounded-xl border border-slate-200 p-4">
                                {data.people.length > 1 && (
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            {t('الشخص :n', { n: idx + 1 })}
                                        </span>
                                        <SecondaryButton type="button" onClick={() => removePerson(idx)}>
                                            <Trash2 className="h-4 w-4" />
                                            {t('حذف')}
                                        </SecondaryButton>
                                    </div>
                                )}
                                <PersonFields
                                    idPrefix={`person_${idx}`}
                                    values={person}
                                    onChange={(field, value) => updatePerson(idx, field, value)}
                                    errors={personErrors(idx)}
                                    nameInputRef={idx === data.people.length - 1 ? firstNameRef : undefined}
                                    nameAutoFocus={idx === 0 && data.people.length === 1}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        <PersonFields
                            idPrefix="person"
                            values={data}
                            onChange={(field, value) => setData(field, value)}
                            errors={errors}
                        />
                    </div>
                )}
            </div>

            <div className="border-t border-slate-100 pt-8">
                <SectionTitle>{t('تفاصيل المخالفة')}</SectionTitle>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <InputLabel htmlFor="report_date" value={t('تاريخ التقرير')} />
                            <div className="relative mt-1">
                                <CalendarDays className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <TextInput
                                    id="report_date"
                                    type="date"
                                    className="block w-full ps-9"
                                    value={data.report_date}
                                    onChange={(e) => setData('report_date', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.report_date} />
                        </div>

                        <div>
                            <InputLabel htmlFor="report_time" value={t('وقت التقرير')} />
                            <div className="relative mt-1">
                                <Clock className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <TextInput
                                    id="report_time"
                                    type="time"
                                    className="block w-full ps-9"
                                    value={data.report_time}
                                    onChange={(e) => setData('report_time', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.report_time} />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="violation_type" value={t('نوع المخالفة / موضوع التقرير')} />
                        <TextInput
                            id="violation_type"
                            className="mt-1 block w-full"
                            value={data.violation_type}
                            onChange={(e) => setData('violation_type', e.target.value)}
                        />
                        <InputError message={errors.violation_type} />
                    </div>

                    <div>
                        <InputLabel htmlFor="top_entity_id" value={t('الجهة')} />
                        <SelectInput id="top_entity_id" value={topEntityId} onChange={(e) => selectTopEntity(e.target.value)}>
                            <option value="">{t('اختر جهة…')}</option>
                            {entities.map((entity) => (
                                <option key={entity.id} value={entity.id}>
                                    {entity.name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.entity_id} />
                    </div>

                    {branches.length > 0 && (
                        <div>
                            <InputLabel htmlFor="branch_id" value={t('الفرع التابع لـ :name', { name: selectedTopEntity.name })} />
                            <SelectInput id="branch_id" value={branchId} onChange={(e) => selectBranch(e.target.value)}>
                                <option value="">{t('اختر فرعًا…')}</option>
                                {branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
                <SectionTitle>{t('ملاحظات إضافية')}</SectionTitle>
                <div className="mt-4">
                    <Textarea
                        id="notes"
                        rows={4}
                        className="block w-full"
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                    />
                    <InputError message={errors.notes} />
                </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-6">
                <PrimaryButton type="submit" size="lg" disabled={processing}>
                    {t(submitLabel)}
                </PrimaryButton>
            </div>
        </form>
    );
}
