import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const localRef = useRef(null);
    const input = ref || localRef;

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'block rounded-lg border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-brand-500 focus:ring-brand-500/40 disabled:bg-slate-50 disabled:text-slate-400 ' +
                className
            }
            ref={input}
        />
    );
});
