import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default forwardRef(function SelectInput({ className = '', children, ...props }, ref) {
    return (
        <div className="relative">
            <select
                {...props}
                ref={ref}
                className={
                    'block w-full appearance-none bg-none rounded-lg border-slate-200 bg-white py-2.5 ps-3 pe-9 text-sm text-slate-900 shadow-sm transition focus:border-brand-500 focus:ring-brand-500/40 disabled:bg-slate-50 disabled:text-slate-400 ' +
                    className
                }
            >
                {children}
            </select>
            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
    );
});
