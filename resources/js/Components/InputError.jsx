import { AlertCircle } from 'lucide-react';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600 ' + className}>
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {message}
        </p>
    ) : null;
}
