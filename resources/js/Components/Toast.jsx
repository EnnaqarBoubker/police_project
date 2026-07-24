import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!message) return;
        setShow(true);
        const timer = setTimeout(() => setShow(false), 4000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!message) return null;

    return (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
            <Transition
                show={show}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
            >
                <div className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-800 shadow-popover">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    {message}
                    <button
                        type="button"
                        onClick={() => setShow(false)}
                        className="ms-2 text-emerald-400 transition hover:text-emerald-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </Transition>
        </div>
    );
}
