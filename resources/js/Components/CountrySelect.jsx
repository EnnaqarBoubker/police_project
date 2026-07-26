import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronDown, Check } from 'lucide-react';
import { COUNTRIES, countryFlag, findCountry } from '@/Constants/countries';

export default function CountrySelect({ id, value, onChange, placeholder = 'ابحث عن الجنسية…' }) {
    const [query, setQuery] = useState('');

    const filtered =
        query === ''
            ? COUNTRIES
            : COUNTRIES.filter(
                  (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.code.toLowerCase().includes(query.toLowerCase())
              );

    return (
        <Combobox value={value ?? ''} onChange={(code) => onChange(code ?? '')}>
            <div className="relative">
                <div className="relative">
                    <Combobox.Input
                        id={id}
                        autoComplete="off"
                        className="block w-full rounded-lg border-slate-200 bg-white py-2.5 ps-3 pe-9 text-sm text-slate-900 shadow-sm transition focus:border-brand-500 focus:ring-brand-500/40"
                        displayValue={(code) => {
                            const c = findCountry(code);
                            return c ? `${countryFlag(c.code)} ${c.name}` : '';
                        }}
                        placeholder={placeholder}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 end-0 flex items-center pe-3">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    </Combobox.Button>
                </div>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-popover ring-1 ring-slate-900/5 focus:outline-none">
                        {value && (
                            <Combobox.Option
                                value=""
                                className={({ active }) => `cursor-pointer select-none px-3 py-2 text-slate-400 ${active ? 'bg-slate-50' : ''}`}
                            >
                                — بدون تحديد —
                            </Combobox.Option>
                        )}

                        {filtered.length === 0 ? (
                            <div className="px-3 py-2 text-slate-400">لا توجد نتائج مطابقة</div>
                        ) : (
                            filtered.map((c) => (
                                <Combobox.Option
                                    key={c.code}
                                    value={c.code}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 ps-9 pe-3 ${active ? 'bg-brand-50 text-brand-700' : 'text-slate-700'}`
                                    }
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`flex items-center gap-2 ${selected ? 'font-semibold' : ''}`}>
                                                <span>{countryFlag(c.code)}</span>
                                                <span>{c.name}</span>
                                            </span>
                                            {selected && (
                                                <span className="absolute inset-y-0 start-0 flex items-center ps-2.5 text-brand-600">
                                                    <Check className="h-4 w-4" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
