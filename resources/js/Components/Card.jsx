export default function Card({ className = '', padding = 'p-6', children, ...props }) {
    return (
        <div
            {...props}
            className={`rounded-2xl border border-slate-200/70 bg-white shadow-soft ${padding} ${className}`}
        >
            {children}
        </div>
    );
}
