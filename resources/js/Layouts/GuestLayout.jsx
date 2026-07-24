import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { ShieldCheck, CalendarCheck2, ClipboardList } from 'lucide-react';

const features = [
    { icon: CalendarCheck2, text: 'تقويم تفاعلي لتنظيم التقارير حسب التاريخ' },
    { icon: ClipboardList, text: 'قاعدة بيانات مشتركة بين جميع المسؤولين' },
    { icon: ShieldCheck, text: 'وصول آمن يعتمد على موافقة المشرف العام' },
];

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-brand-900 p-12 text-white lg:flex">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <Link href="/" className="relative flex items-center gap-3">
                    <ApplicationLogo className="h-11 w-11 text-brand-400" />
                    <div>
                        <p className="text-lg font-extrabold tracking-wide">POLICE</p>
                        <p className="text-xs font-medium text-slate-400">نظام إدارة التقارير الأمنية</p>
                    </div>
                </Link>

                <div className="relative">
                    <h2 className="text-3xl font-bold leading-snug">
                        منصة موحّدة لتسجيل ومتابعة التقارير والمخالفات الأمنية
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
                        تنظيم يومي دقيق، بيانات مشتركة بين فريق العمل، وملخصات فورية تسهّل المتابعة الميدانية.
                    </p>

                    <ul className="mt-8 space-y-4">
                        {features.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-3 text-sm text-slate-200">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                                    <Icon className="h-4 w-4 text-brand-300" />
                                </span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} POLICE — جميع الحقوق محفوظة
                </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
                <div className="mb-8 flex items-center gap-3 lg:hidden">
                    <ApplicationLogo className="h-10 w-10 text-brand-600" />
                    <div>
                        <p className="text-base font-extrabold tracking-wide text-slate-900">POLICE</p>
                        <p className="text-[11px] font-medium text-slate-400">نظام إدارة التقارير الأمنية</p>
                    </div>
                </div>

                <div className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-white p-8 shadow-card">
                    {children}
                </div>
            </div>
        </div>
    );
}
