import { Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

export default function EntityCard({ entity, href, meta, onEdit, onDelete }) {
    const face = (
        <div
            className={`flex h-28 w-full flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-4 text-center shadow-soft transition ${
                entity.status === 'active'
                    ? 'bg-brand-500 text-white hover:bg-brand-600'
                    : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
            } ${href ? 'cursor-pointer' : ''}`}
        >
            <span className="text-sm font-bold leading-snug">{entity.name}</span>
            {meta && <span className="text-xs font-medium opacity-80">{meta}</span>}
        </div>
    );

    return (
        <div className="group relative">
            {href ? <Link href={href}>{face}</Link> : face}

            <div className="absolute -top-2 -end-2 flex gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEdit();
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600 shadow-soft ring-1 ring-slate-200 transition hover:text-brand-600"
                >
                    <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600 shadow-soft ring-1 ring-slate-200 transition hover:text-rose-600"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}
