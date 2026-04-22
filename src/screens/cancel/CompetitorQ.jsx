import { useState } from 'react';
import { COMPETITORS } from '../../data/plans';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

export default function CompetitorQ({ onBack, onSubmit }) {
  const [competitor, setCompetitor] = useState('');
  const [why, setWhy] = useState('');
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
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">Thanks for your feedback</h2>
          <p className="text-[14px] text-gray-medium mb-8 max-w-sm">
            Your response helps us understand how we can improve. We're sorry to see you go.
          </p>
          <Button variant="destructive" onClick={onSubmit}>Cancel my subscription</Button>
          <button
            onClick={onBack}
            className="mt-3 text-[13px] text-gray-medium hover:text-gray-dark underline cursor-pointer bg-transparent border-0"
          >
            Actually, keep my subscription
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
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">Where are you heading?</h2>
          <p className="text-[14px] text-gray-medium mb-6">
            We're curious which publication you're switching to. This helps us improve.
          </p>

          <label className="block text-[13px] font-semibold text-gray-dark mb-2">
            Which competitor?
          </label>
          <select
            value={competitor}
            onChange={(e) => setCompetitor(e.target.value)}
            className="w-full px-4 py-3 rounded-card border border-gray-border bg-white text-[14px] text-gray-dark mb-5 focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary"
          >
            <option value="">Select a publication...</option>
            {COMPETITORS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label className="block text-[13px] font-semibold text-gray-dark mb-2">
            Why are you switching? <span className="font-normal text-gray-medium">(optional)</span>
          </label>
          <textarea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="What does the other publication offer that we don't?"
            rows={4}
            className="w-full px-4 py-3 rounded-card border border-gray-border bg-white text-[14px] text-gray-dark mb-5 resize-none focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary"
          />

          <Button
            variant="primary"
            fullWidth
            disabled={!competitor}
            onClick={() => setSubmitted(true)}
          >
            Submit feedback
          </Button>
        </div>
      </div>
    </div>
  );
}
