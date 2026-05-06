import { useEffect, useState } from 'react';

const SUCCESS_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <circle cx="8" cy="8" r="8" fill="#22c55e"/>
    <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CLOSE_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M11 3L3 11M3 3l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Snackbar({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  // Slide in on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-dismiss after 4s
  useEffect(() => {
    const t = setTimeout(handleClose, 4000);
    return () => clearTimeout(t);
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 280);
  }

  return (
    <div
      style={{ transition: 'transform 300ms ease-out, opacity 280ms ease-out' }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#01172d] rounded-[4px] px-4 py-[14px] shadow-[0px_0px_2px_0px_rgba(21,23,25,0.12),0px_8px_16px_0px_rgba(21,23,25,0.14)] ${
        visible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-[calc(100%+24px)] opacity-0'
      }`}
    >
      {SUCCESS_ICON}
      <span className="text-[14px] text-white leading-5 whitespace-nowrap">{message}</span>
      <button
        onClick={handleClose}
        className="flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer bg-transparent border-0 p-0 ml-2"
      >
        {CLOSE_ICON}
      </button>
    </div>
  );
}
