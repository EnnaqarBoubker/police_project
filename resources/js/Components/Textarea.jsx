import { forwardRef } from 'react';

export default forwardRef(function Textarea({ className = '', rows = 4, ...props }, ref) {
    return (
        <textarea
            {...props}
            ref={ref}
            rows={rows}
            className={
                'block rounded-lg border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-brand-500 focus:ring-brand-500/40 disabled:bg-slate-50 disabled:text-slate-400 ' +
                className
            }
        />
    );
});
