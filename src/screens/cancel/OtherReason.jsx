import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

export default function OtherReason({ onBack, onCancelAnyway }) {
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-page flex flex-col">
        <StepHeader title="Thank you" onBack={onBack} onClose={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-secondary flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l5 5 11-11" stroke="#151719" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">Thanks for sharing</h2>
          <p className="text-[14px] text-gray-medium mb-8 max-w-sm">
            We appreciate your honesty. If you'd like to proceed with cancellation, you can do so below.
          </p>
          <Button variant="destructive" onClick={onCancelAnyway}>Cancel my subscription</Button>
          <button
            onClick={onBack}
            className="mt-3 text-[13px] text-gray-medium hover:text-gray-dark underline cursor-pointer bg-transparent border-0"
          >
            Keep my subscription
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Cancel subscription" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">What's your reason?</h2>
          <p className="text-[14px] text-gray-medium mb-6">
            Tell us in your own words why you'd like to cancel. All feedback is welcome.
          </p>

          <label className="block text-[13px] font-semibold text-gray-dark mb-2">
            Your reason for cancelling
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell us what's on your mind..."
            rows={5}
            className="w-full px-4 py-3 rounded-card border border-gray-border bg-white text-[14px] text-gray-dark mb-5 resize-none focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary"
          />

          <Button
            variant="primary"
            fullWidth
            disabled={!reason.trim()}
            onClick={() => setSubmitted(true)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
