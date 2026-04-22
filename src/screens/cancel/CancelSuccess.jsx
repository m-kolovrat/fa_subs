import Button from '../../components/Button';

export default function CancelSuccess({ onDone }) {
  const activeUntil = '21. mai 2026';

  return (
    <div className="min-h-screen bg-gray-page flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-secondary flex items-center justify-center mb-5">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="#67737e" strokeWidth="1.5"/>
          <path d="M11 16l3 3 7-7" stroke="#67737e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h2 className="text-[22px] font-bold text-gray-dark mb-2">Subscription cancelled</h2>
      <p className="text-[14px] text-gray-medium mb-2 max-w-sm">
        Your subscription has been cancelled. You'll continue to have access until:
      </p>
      <p className="text-[16px] font-semibold text-gray-dark mb-8">{activeUntil}</p>

      <Button variant="primary" onClick={onDone}>Back to my account</Button>
    </div>
  );
}
