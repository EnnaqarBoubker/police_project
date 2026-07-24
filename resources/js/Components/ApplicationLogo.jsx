export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img
            {...props}
            src="/assets/logo/police.png"
            alt="شعار الدرك الملكي"
            className={`object-contain ${className}`}
        />
    );
}
