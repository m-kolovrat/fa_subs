export default function StepHeader({ title, onBack, onClose }) {
  return (
    <div className="bg-white border-b border-gray-border px-6 py-4">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-medium text-sm hover:text-gray-dark transition-colors cursor-pointer bg-transparent border-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <span className="text-[15px] font-semibold text-gray-dark">{title}</span>
        {onClose ? (
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-secondary hover:bg-gray-border transition-colors cursor-pointer border-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="#151719" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        ) : <div className="w-8" />}
      </div>
    </div>
  );
}
