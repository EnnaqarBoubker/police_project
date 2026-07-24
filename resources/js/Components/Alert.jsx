import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

const variants = {
    success: {
        wrap: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        icon: 'text-emerald-500',
        Icon: CheckCircle2,
    },
    warning: {
        wrap: 'bg-amber-50 text-amber-800 border-amber-200',
        icon: 'text-amber-500',
        Icon: AlertTriangle,
    },
    danger: {
        wrap: 'bg-rose-50 text-rose-800 border-rose-200',
        icon: 'text-rose-500',
        Icon: XCircle,
    },
    info: {
        wrap: 'bg-brand-50 text-brand-800 border-brand-100',
        icon: 'text-brand-500',
        Icon: Info,
    },
};

export default function Alert({ variant = 'info', title, children, className = '' }) {
    const { wrap, icon, Icon } = variants[variant];

    return (
        <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${wrap} ${className}`}>
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${icon}`} />
            <div>
                {title && <p className="font-semibold">{title}</p>}
                {children && <div className={title ? 'mt-0.5' : ''}>{children}</div>}
            </div>
        </div>
    );
}
