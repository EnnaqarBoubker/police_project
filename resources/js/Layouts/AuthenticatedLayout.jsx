import { useState, Fragment } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import Toast from '@/Components/Toast';
import { Link, usePage } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import {
    Menu,
    X,
    CalendarDays,
    ClipboardList,
    BarChart3,
    UserCheck,
    Users,
    ChevronDown,
    LogOut,
    Settings,
    ShieldCheck,
    Landmark,
} from 'lucide-react';

const adminLinks = [
    { name: 'التقويم', route: 'calendar.index', active: 'calendar.*', icon: CalendarDays },
    { name: 'الجهات', route: 'entities.index', active: 'entities.*', icon: Landmark },
    { name: 'السجلات', route: 'reports.index', active: 'reports.*', icon: ClipboardList },
    { name: 'الملخصات', route: 'summary.index', active: 'summary.*', icon: BarChart3 },
];

const superAdminLinks = [
    { name: 'طلبات الانتساب', route: 'superadmin.requests.index', active: 'superadmin.requests.*', icon: UserCheck },
    { name: 'حسابات المسؤولين', route: 'superadmin.admins.index', active: 'superadmin.admins.*', icon: Users },
];

function initials(name = '') {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

function SidebarContent({ links, isSuperAdmin }) {
    return (
        <>
            <Link href={route('home')} className="flex items-center gap-3 px-2 py-1">
                <ApplicationLogo className="h-10 w-10 shrink-0 text-brand-400" />
                <div>
                    <p className="text-base font-extrabold tracking-wide text-white">POLICE</p>
                    <p className="text-[11px] font-medium text-slate-400">إدارة التقارير الأمنية</p>
                </div>
            </Link>

            <div className="mt-8 flex items-center gap-2 px-2">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {isSuperAdmin ? 'مساحة المشرف العام' : 'مساحة العمل'}
                </p>
            </div>

            <nav className="mt-3 flex flex-1 flex-col gap-1">
                {links.map((link) => (
                    <NavLink
                        key={link.route}
                        href={route(link.route)}
                        active={route().current(link.active)}
                        icon={link.icon}
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </>
    );
}

export default function Authenticated({ header, children }) {
    const { auth } = usePage().props;
    const flash = usePage().props.flash;
    const user = auth.user;
    const isSuperAdmin = user.role === 'superadmin';
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = isSuperAdmin ? superAdminLinks : adminLinks;

    return (
        <div className="min-h-screen bg-slate-50">
            <Toast message={flash?.status} />

            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 start-0 z-30 hidden w-72 flex-col bg-gradient-to-b from-slate-950 to-brand-950 px-4 py-6 lg:flex">
                <SidebarContent links={links} isSuperAdmin={isSuperAdmin} />

                <div className="mt-auto rounded-xl bg-white/5 p-3">
                    <p className="text-xs font-medium text-slate-400">متصل باسم</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-white">{user.name}</p>
                </div>
            </aside>

            {/* Mobile sidebar drawer */}
            <Transition show={mobileOpen} as={Fragment}>
                <Dialog onClose={setMobileOpen} className="relative z-40 lg:hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-900/60" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="translate-x-full rtl:translate-x-full ltr:-translate-x-full"
                        enterTo="translate-x-0"
                        leave="ease-in duration-150"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full rtl:translate-x-full ltr:-translate-x-full"
                    >
                        <Dialog.Panel className="fixed inset-y-0 end-0 flex w-72 flex-col bg-gradient-to-b from-slate-950 to-brand-950 px-4 py-6 shadow-popover">
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-6 start-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="mt-8">
                                <SidebarContent links={links} isSuperAdmin={isSuperAdmin} />
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>

            {/* Main column */}
            <div className="flex min-h-screen flex-col lg:ps-72">
                <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6 lg:px-8">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="flex-1" />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm transition hover:bg-slate-100"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                                    {initials(user.name)}
                                </span>
                                <span className="hidden text-start sm:block">
                                    <span className="block text-sm font-semibold text-slate-800">{user.name}</span>
                                    <span className="block text-xs text-slate-400">
                                        {isSuperAdmin ? 'المشرف العام' : 'مسؤول'}
                                    </span>
                                </span>
                                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                <Settings className="h-4 w-4 text-slate-400" />
                                الملف الشخصي
                            </Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                <LogOut className="h-4 w-4 text-slate-400" />
                                تسجيل الخروج
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </header>

                {header && (
                    <div className="border-b border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-7xl">{header}</div>
                    </div>
                )}

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
