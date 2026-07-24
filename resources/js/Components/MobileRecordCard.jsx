import { Link } from '@inertiajs/react';

/**
 * Compact stacked-card representation of a table row, shown below `md` where a
 * data table would otherwise clip columns off-screen. Used alongside a
 * `hidden md:block` table so the same data has a real table on larger screens
 * and a readable card on phones.
 */
export default function MobileRecordCard({ title, titleHref, eyebrow, badge, fields = [], actions }) {
    return (
        <div className="p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    {eyebrow && <p className="text-xs font-medium text-slate-400">{eyebrow}</p>}
                    {titleHref ? (
                        <Link href={titleHref} className="font-semibold text-brand-600 hover:text-brand-700">
                            {title}
                        </Link>
                    ) : (
                        <p className="font-semibold text-slate-900">{title}</p>
                    )}
                </div>
                {badge && <div className="shrink-0">{badge}</div>}
            </div>

            {fields.length > 0 && (
                <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
                    {fields.map(({ label, value }) => (
                        <div key={label}>
                            <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</dt>
                            <dd className="mt-0.5 text-slate-700">{value ?? '—'}</dd>
                        </div>
                    ))}
                </dl>
            )}

            {actions && <div className="mt-3.5 flex flex-wrap gap-2 border-t border-slate-100 pt-3.5">{actions}</div>}
        </div>
    );
}
