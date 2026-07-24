import { forwardRef } from 'react';

const variants = {
    primary:
        'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-300 shadow-soft',
    secondary:
        'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-300 shadow-soft',
    danger:
        'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-300 shadow-soft',
    success:
        'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-300 shadow-soft',
    ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-300',
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-sm gap-2',
};

const Button = forwardRef(function Button(
    { variant = 'primary', size = 'md', className = '', disabled, as: Component = 'button', ...props },
    ref
) {
    return (
        <Component
            ref={ref}
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        />
    );
});

export default Button;
