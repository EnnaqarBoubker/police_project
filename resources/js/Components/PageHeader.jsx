import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function PageHeader({ title, subtitle, back, actions, className = '' }) {
    return (
        <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
            <div>
                {back && (
                    <Link
                        href={back.href}
                        className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-600"
                    >
                        <ArrowRight className="h-4 w-4" />
                        {back.label}
                    </Link>
                )}
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
                {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
    );
}
