import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, icon: Icon, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active ? 'bg-white/10 text-white shadow-inner' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            } ${className}`}
        >
            {Icon && (
                <Icon
                    className={`h-5 w-5 shrink-0 transition ${
                        active ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}
                />
            )}
            <span>{children}</span>
        </Link>
    );
}
