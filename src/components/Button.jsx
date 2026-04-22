export default function Button({ children, variant = 'secondary', onClick, disabled, className = '', type = 'button', fullWidth = false }) {
  const base = 'inline-flex items-center justify-center rounded-pill font-medium text-[12px] leading-5 px-4 py-2 transition-opacity cursor-pointer border-0 outline-none';
  const fullWidthClass = fullWidth ? 'w-full' : '';

  const variants = {
    primary: 'bg-blue-primary text-white hover:opacity-90',
    secondary: 'bg-gray-secondary text-gray-dark hover:opacity-80',
    destructive: 'bg-red-destructive text-white hover:opacity-90',
    ghost: 'bg-transparent text-blue-primary hover:underline px-0',
    outline: 'bg-white text-gray-dark border border-gray-border hover:bg-gray-page',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidthClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
