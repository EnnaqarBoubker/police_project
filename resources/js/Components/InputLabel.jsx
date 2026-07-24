export default function InputLabel({ value, required = false, className = '', children, ...props }) {
    return (
        <label {...props} className={'mb-1.5 block text-sm font-semibold text-slate-700 ' + className}>
            {value ? value : children}
            {required && <span className="ms-0.5 text-rose-500">*</span>}
        </label>
    );
}
