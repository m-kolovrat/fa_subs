import { useEffect } from 'react';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="relative bg-gray-page w-full min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
