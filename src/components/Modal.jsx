import { useEffect } from 'react';
import Button from './Button';

const CLOSE_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12M4 4l8 8" stroke="#151719" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1 min-w-0 flex-1">
      <label className="text-[12px] font-medium text-gray-dark">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-gray-secondary h-[40px] rounded-[8px] px-4 text-[14px] text-gray-dark outline-none placeholder:text-[#9ea6ad] w-full"
      />
    </div>
  );
}

export default function Modal({ title, onClose, children, primaryLabel, onPrimary, primaryVariant = 'primary' }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 bg-[rgba(21,23,25,0.5)] z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[16px] w-[440px] max-h-[90vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b border-[#eaeced] shrink-0">
            <p className="flex-1 text-[16px] font-semibold text-gray-dark leading-6">{title}</p>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-secondary cursor-pointer bg-transparent border-0"
            >
              {CLOSE_ICON}
            </button>
          </div>

          {/* Scrollable body */}
          <div className="p-4 flex flex-col gap-4 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#eaeced] flex items-center justify-end gap-2 shrink-0">
            <Button variant="secondary" className="w-[104px]" onClick={onClose}>Avbryt</Button>
            <Button variant={primaryVariant} className="w-[104px]" onClick={onPrimary}>{primaryLabel}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
