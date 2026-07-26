import { useState } from 'react';
import Modal from '@/Components/Modal';
import EmptyState from '@/Components/EmptyState';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import EntityCard from './EntityCard';
import useTranslation from '@/Hooks/useTranslation';
import { useForm, router } from '@inertiajs/react';
import { Plus, Landmark } from 'lucide-react';

/**
 * Gray panel + grid of blue entity cards + "add" pill button, reused by both
 * the top-level entities page and a single entity's branches page.
 */
export default function EntityPanel({ entities, parentId = null, getHref, getMeta, emptyTitle, emptyDescription, deleteWarning }) {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingEntity, setEditingEntity] = useState(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        status: 'active',
        parent_id: parentId,
    });

    const openCreate = () => {
        setEditingEntity(null);
        reset();
        clearErrors();
        setModalOpen(true);
    };

    const openEdit = (entity) => {
        setEditingEntity(entity);
        setData({ name: entity.name, status: entity.status, parent_id: parentId });
        clearErrors();
        setModalOpen(true);
    };

    const close = () => {
        setModalOpen(false);
        reset();
        clearErrors();
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingEntity) {
            put(route('entities.update', editingEntity.id), { onSuccess: close, preserveScroll: true });
        } else {
            post(route('entities.store'), { onSuccess: close, preserveScroll: true });
        }
    };

    const destroy = (entity) => {
        if (confirm(deleteWarning(entity))) {
            router.delete(route('entities.destroy', entity.id), { preserveScroll: true });
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-6">
            <div className="mb-6 flex justify-end">
                <button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-100 py-1 pe-4 ps-1 text-sm font-semibold text-brand-700 shadow-soft transition hover:bg-brand-200"
                >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-white">
                        <Plus className="h-4 w-4" />
                    </span>
                    {t('اضف جهة جديدة')}
                </button>
            </div>

            {entities.length === 0 ? (
                <EmptyState icon={Landmark} title={emptyTitle} description={emptyDescription} />
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {entities.map((entity) => (
                        <EntityCard
                            key={entity.id}
                            entity={entity}
                            href={getHref?.(entity)}
                            meta={getMeta?.(entity)}
                            onEdit={() => openEdit(entity)}
                            onDelete={() => destroy(entity)}
                        />
                    ))}
                </div>
            )}

            <Modal show={modalOpen} onClose={close} maxWidth="md">
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-bold text-slate-900">{editingEntity ? t('تعديل الجهة') : t('إضافة جهة جديدة')}</h2>

                    <div className="mt-5">
                        <InputLabel htmlFor="name" value={t('اسم الجهة')} required />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            isFocused
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="mt-5">
                        <InputLabel htmlFor="status" value={t('الحالة')} required />
                        <SelectInput id="status" className="mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                            <option value="active">{t('نشطة')}</option>
                            <option value="inactive">{t('غير نشطة')}</option>
                        </SelectInput>
                        <InputError message={errors.status} />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={close}>
                            {t('إلغاء')}
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            {editingEntity ? t('حفظ التعديلات') : t('إضافة الجهة')}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
