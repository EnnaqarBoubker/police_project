export default function EmptyState({ icon: Icon, title, description, action, className = '' }) {
    return (
        <div className={`flex flex-col items-center justify-center py-14 text-center ${className}`}>
            {Icon && (
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                    <Icon className="h-7 w-7" />
                </div>
            )}
            <p className="text-sm font-semibold text-slate-700">{title}</p>
            {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}
