import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Textarea from '@/Components/Textarea';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS } from '@/Constants/reportOptions';
import { router, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

function SectionTitle({ children }) {
    return <h3 className="text-sm font-bold text-slate-800">{children}</h3>;
}

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

export default function ReportForm({ report, centers, entities = [], defaultDate, submitUrl, method = 'post', submitLabel = 'حفظ السجل' }) {
    const [newCenterName, setNewCenterName] = useState('');
    const [addingCenter, setAddingCenter] = useState(false);
    const [{ topEntityId, branchId }, setEntitySelection] = useState(() => locateEntity(entities, report?.entity_id));

    const { data, setData, post, put, processing, errors } = useForm({
        full_name: report?.full_name ?? '',
        report_date: report?.report_date ?? defaultDate ?? new Date().toISOString().slice(0, 10),
        age: report?.age ?? '',
        gender: report?.gender ?? '',
        marital_status: report?.marital_status ?? '',
        center_id: report?.center_id ?? '',
        entity_id: report?.entity_id ?? '',
        violation_type: report?.violation_type ?? '',
        count: report?.count ?? 1,
        notes: report?.notes ?? '',
        entities: report?.entities?.map((e) => ({ entity_name: e.entity_name, entity_type: e.entity_type ?? '' })) ?? [],
    });

    const submit = (e) => {
        e.preventDefault();
        if (method === 'put') {
            put(submitUrl);
        } else {
            post(submitUrl);
        }
    };

    const addEntity = () => setData('entities', [...data.entities, { entity_name: '', entity_type: '' }]);
    const removeEntity = (idx) => setData('entities', data.entities.filter((_, i) => i !== idx));
    const updateEntity = (idx, field, value) => {
        const next = [...data.entities];
        next[idx] = { ...next[idx], [field]: value };
        setData('entities', next);
    };

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

    const addCenter = () => {
        if (!newCenterName.trim()) return;
        setAddingCenter(true);
        router.post(
            route('centers.store'),
            { name: newCenterName },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNewCenterName('');
                    setAddingCenter(false);
                },
                onError: () => setAddingCenter(false),
            }
        );
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div>
                <SectionTitle>بيانات الشخص</SectionTitle>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="full_name" value="الاسم الكامل" required />
                        <TextInput
                            id="full_name"
                            className="mt-1 block w-full"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.full_name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="age" value="العمر" />
                        <TextInput
                            id="age"
                            type="number"
                            min="0"
                            max="150"
                            className="mt-1 block w-full"
                            value={data.age}
                            onChange={(e) => setData('age', e.target.value)}
                        />
                        <InputError message={errors.age} />
                    </div>

                    <div>
                        <InputLabel htmlFor="gender" value="الجنس" />
                        <SelectInput
                            id="gender"
                            className="mt-1"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                        >
                            <option value="">—</option>
                            {GENDER_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.gender} />
                    </div>

                    <div>
                        <InputLabel htmlFor="marital_status" value="الحالة الاجتماعية" />
                        <SelectInput
                            id="marital_status"
                            className="mt-1"
                            value={data.marital_status}
                            onChange={(e) => setData('marital_status', e.target.value)}
                        >
                            <option value="">—</option>
                            {MARITAL_STATUS_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.marital_status} />
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
                <SectionTitle>تفاصيل المخالفة</SectionTitle>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="report_date" value="تاريخ التقرير" required />
                        <TextInput
                            id="report_date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.report_date}
                            onChange={(e) => setData('report_date', e.target.value)}
                            required
                        />
                        <InputError message={errors.report_date} />
                    </div>

                    <div>
                        <InputLabel htmlFor="violation_type" value="نوع المخالفة / موضوع التقرير" required />
                        <TextInput
                            id="violation_type"
                            className="mt-1 block w-full"
                            value={data.violation_type}
                            onChange={(e) => setData('violation_type', e.target.value)}
                            required
                        />
                        <InputError message={errors.violation_type} />
                    </div>

                    <div>
                        <InputLabel htmlFor="center_id" value="الموقع / المركز" required />
                        <SelectInput
                            id="center_id"
                            value={data.center_id}
                            onChange={(e) => setData('center_id', e.target.value)}
                            required
                        >
                            <option value="">اختر مركزًا…</option>
                            {centers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </SelectInput>
                        <InputError message={errors.center_id} />

                        <div className="mt-2 flex gap-2">
                            <TextInput
                                placeholder="إضافة منطقة / مركز جديد…"
                                className="flex-1 text-sm"
                                value={newCenterName}
                                onChange={(e) => setNewCenterName(e.target.value)}
                            />
                            <SecondaryButton type="button" disabled={addingCenter} onClick={addCenter}>
                                إضافة
                            </SecondaryButton>
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="top_entity_id" value="الجهة" />
                        <SelectInput id="top_entity_id" value={topEntityId} onChange={(e) => selectTopEntity(e.target.value)}>
                            <option value="">اختر جهة…</option>
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
                            <InputLabel htmlFor="branch_id" value={`الفرع التابع لـ ${selectedTopEntity.name}`} required />
                            <SelectInput id="branch_id" value={branchId} onChange={(e) => selectBranch(e.target.value)} required>
                                <option value="">اختر فرعًا…</option>
                                {branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>
                    )}

                    <div>
                        <InputLabel htmlFor="count" value="العدد" />
                        <TextInput
                            id="count"
                            type="number"
                            min="1"
                            className="mt-1 block w-full"
                            value={data.count}
                            onChange={(e) => setData('count', e.target.value)}
                        />
                        <InputError message={errors.count} />
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
                <SectionTitle>ملاحظات إضافية</SectionTitle>
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

            <div className="border-t border-slate-100 pt-8">
                <div className="flex items-center justify-between">
                    <SectionTitle>أطراف / جهات إضافية</SectionTitle>
                    <SecondaryButton type="button" onClick={addEntity}>
                        <Plus className="h-4 w-4" />
                        إضافة جهة
                    </SecondaryButton>
                </div>

                {data.entities.length > 0 && (
                    <div className="mt-4 space-y-3">
                        {data.entities.map((entity, idx) => (
                            <div key={idx} className="flex flex-col gap-2 sm:flex-row sm:items-start">
                                <TextInput
                                    placeholder="اسم الجهة"
                                    className="flex-1"
                                    value={entity.entity_name}
                                    onChange={(e) => updateEntity(idx, 'entity_name', e.target.value)}
                                />
                                <TextInput
                                    placeholder="نوع الجهة (اختياري)"
                                    className="flex-1"
                                    value={entity.entity_type}
                                    onChange={(e) => updateEntity(idx, 'entity_type', e.target.value)}
                                />
                                <SecondaryButton type="button" onClick={() => removeEntity(idx)}>
                                    <Trash2 className="h-4 w-4" />
                                </SecondaryButton>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-6">
                <PrimaryButton size="lg" disabled={processing}>
                    {submitLabel}
                </PrimaryButton>
            </div>
        </form>
    );
}
