const variants = {
    neutral: 'bg-slate-100 text-slate-600',
    brand: 'bg-brand-50 text-brand-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-rose-50 text-rose-700',
};

const dotVariants = {
    neutral: 'bg-slate-400',
    brand: 'bg-brand-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
};

export default function Badge({ variant = 'neutral', dot = false, className = '', children }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
        >
            {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotVariants[variant]}`} />}
            {children}
        </span>
    );
}
