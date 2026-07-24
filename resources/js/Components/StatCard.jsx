const accents = {
    brand: 'bg-brand-50 text-brand-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    slate: 'bg-slate-100 text-slate-600',
};

export default function StatCard({ icon: Icon, label, value, hint, accent = 'brand', className = '' }) {
    return (
        <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft ${className}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-bold tabular-nums text-slate-900">{value}</p>
                    {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
                </div>
                {Icon && (
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accents[accent]}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                )}
            </div>
        </div>
    );
}
