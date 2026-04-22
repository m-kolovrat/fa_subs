import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

export default function FeatureFeedback({ onBack, onCancelAnyway }) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-page flex flex-col">
        <StepHeader title="Thank you" onBack={onBack} onClose={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-blue-light flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l5 5 11-11" stroke="#0373e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">Feedback received!</h2>
          <p className="text-[14px] text-gray-medium mb-8 max-w-sm">
            Thank you for telling us what's missing. Our product team will review your feedback.
          </p>
          <Button variant="secondary" onClick={onBack}>Keep my subscription</Button>
          <button
            onClick={onCancelAnyway}
            className="mt-3 text-[13px] text-gray-medium hover:text-red-destructive underline cursor-pointer bg-transparent border-0"
          >
            Cancel anyway
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
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">Tell us what's missing</h2>
          <p className="text-[14px] text-gray-medium mb-6">
            Your feedback goes directly to our product team. What feature or content is missing for you?
          </p>

          <label className="block text-[13px] font-semibold text-gray-dark mb-2">
            What would make Finansavisen better for you?
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="E.g. 'I'd love better portfolio tracking' or 'The mobile app is too slow'..."
            rows={5}
            className="w-full px-4 py-3 rounded-card border border-gray-border bg-white text-[14px] text-gray-dark mb-5 resize-none focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary"
          />

          <Button
            variant="primary"
            fullWidth
            disabled={!feedback.trim()}
            onClick={() => setSubmitted(true)}
          >
            Send feedback
          </Button>
        </div>
      </div>
    </div>
  );
}
