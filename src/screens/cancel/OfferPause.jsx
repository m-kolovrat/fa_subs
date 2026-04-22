import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

export default function OfferPause({ onBack, onAcceptPause, onCancelAnyway, mode = 'not-using' }) {
  // mode: 'not-using' (1-3 months) | 'temp-break' (1-12 months)
  const maxMonths = mode === 'temp-break' ? 12 : 3;
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const months = Array.from({ length: maxMonths }, (_, i) => i + 1);

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-page flex flex-col">
        <StepHeader title="Subscription paused" onBack={() => setConfirmed(false)} onClose={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-blue-light flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="8" y="7" width="4" height="14" rx="2" fill="#0373e3"/>
              <rect x="16" y="7" width="4" height="14" rx="2" fill="#0373e3"/>
            </svg>
          </div>
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">Subscription paused</h2>
          <p className="text-[14px] text-gray-medium mb-8 max-w-sm">
            Your subscription is paused for {selected} {selected === 1 ? 'month' : 'months'}. It will automatically resume afterwards.
          </p>
          <Button variant="primary" onClick={onAcceptPause}>Back to my account</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Cancel subscription" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">
            {mode === 'temp-break' ? 'Take a break instead' : 'Need a break?'}
          </h2>
          <p className="text-[14px] text-gray-medium mb-6">
            {mode === 'temp-break'
              ? 'Pause your subscription and come back when you\'re ready. No charges during your break.'
              : 'Instead of cancelling, you can pause your subscription for up to 3 months. No charges during the pause.'}
          </p>

          <p className="text-[13px] font-semibold text-gray-dark mb-3">How long would you like to pause?</p>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {months.map((m) => (
              <button
                key={m}
                onClick={() => setSelected(m)}
                className={`py-3 rounded-card border text-[14px] font-medium transition-all cursor-pointer ${
                  selected === m
                    ? 'border-blue-primary bg-blue-light text-blue-primary'
                    : 'border-gray-border bg-white text-gray-dark hover:border-gray-muted'
                }`}
              >
                {m} {m === 1 ? 'month' : 'months'}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            fullWidth
            disabled={!selected}
            onClick={() => selected && setConfirmed(true)}
          >
            Pause for {selected ?? '...'} {selected === 1 ? 'month' : 'months'}
          </Button>

          <div className="text-center mt-4">
            <button
              onClick={onCancelAnyway}
              className="text-[13px] text-gray-medium hover:text-red-destructive underline cursor-pointer bg-transparent border-0"
            >
              No thanks, cancel my subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
