import Button from './Button';

export default function SecondaryButton({ type = 'button', ...props }) {
    return <Button type={type} variant="secondary" {...props} />;
}
