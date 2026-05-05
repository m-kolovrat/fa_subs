import { useState } from 'react';
import { CANCEL_REASONS, COMPETITORS } from '../../data/plans';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

// ── Inline expansion components ───────────────────────────────────────────────

function InlineCostOffer({ onAcceptDiscount, onDowngrade }) {
  const [claimed, setClaimed] = useState(false);

  if (claimed) {
    return (
      <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 text-[13px] text-green-800 font-medium">
        ✓ 30% discount applied — your next invoice will reflect yearly pricing.
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Downgrade */}
      <div className="p-4 rounded-lg border border-gray-border bg-gray-page flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold text-gray-dark mb-0.5">Switch to a cheaper plan</p>
          <p className="text-[12px] text-gray-medium">Keep digital access — Basic from 449 kr/month</p>
        </div>
        <button
          onClick={onDowngrade}
          className="flex-shrink-0 text-[12px] font-semibold text-blue-primary hover:underline cursor-pointer bg-transparent border-0 p-0 whitespace-nowrap"
        >
          View plans →
        </button>
      </div>

      {/* Yearly discount */}
      <div className="p-4 rounded-lg border border-blue-primary bg-blue-light flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold text-gray-dark mb-0.5">Switch to yearly and save 30%</p>
          <p className="text-[12px] text-gray-medium">Billed once a year — no month-to-month surprises</p>
        </div>
        <button
          onClick={() => { setClaimed(true); setTimeout(onAcceptDiscount, 1500); }}
          className="flex-shrink-0 text-[12px] font-semibold text-blue-primary hover:underline cursor-pointer bg-transparent border-0 p-0 whitespace-nowrap"
        >
          Claim offer →
        </button>
      </div>
    </div>
  );
}

function InlinePauseOffer({ maxMonths, onAcceptPause }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const months = Array.from({ length: maxMonths }, (_, i) => i + 1);

  if (confirmed) {
    return (
      <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-[13px] text-amber-800 font-medium">
        ✓ Subscription paused for {selected} {selected === 1 ? 'month' : 'months'} — it will resume automatically.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-[12px] text-gray-medium mb-2">How long would you like to pause?</p>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {months.map((m) => (
          <button
            key={m}
            onClick={() => setSelected(m)}
            className={`py-2 rounded-lg border text-[13px] font-medium transition-all cursor-pointer ${
              selected === m
                ? 'border-blue-primary bg-blue-light text-blue-primary'
                : 'border-gray-border bg-white text-gray-dark hover:border-gray-muted'
            }`}
          >
            {m}mo
          </button>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={() => { setConfirmed(true); setTimeout(onAcceptPause, 1500); }}
        className={`text-[12px] font-semibold text-blue-primary hover:underline cursor-pointer bg-transparent border-0 p-0 ${!selected ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        Pause for {selected ?? '...'} {selected === 1 ? 'month' : 'months'} →
      </button>
    </div>
  );
}

function InlineCompetitorForm() {
  const [competitor, setCompetitor] = useState('');
  const [why, setWhy] = useState('');

  return (
    <div className="mt-4 space-y-3">
      <div>
        <label className="block text-[12px] font-semibold text-gray-dark mb-1">Which publication?</label>
        <select
          value={competitor}
          onChange={(e) => setCompetitor(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-border bg-white text-[13px] text-gray-dark focus:outline-none focus:border-blue-primary"
        >
          <option value="">Select...</option>
          {COMPETITORS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-gray-dark mb-1">Why are you switching? <span className="font-normal text-gray-medium">(optional)</span></label>
        <textarea
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="What do they offer that we don't?"
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-border bg-white text-[13px] text-gray-dark resize-none focus:outline-none focus:border-blue-primary"
        />
      </div>
    </div>
  );
}

function InlineTextarea({ placeholder }) {
  const [value, setValue] = useState('');
  return (
    <div className="mt-4">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 rounded-lg border border-gray-border bg-white text-[13px] text-gray-dark resize-none focus:outline-none focus:border-blue-primary"
      />
    </div>
  );
}

function InlineSupportInfo() {
  return (
    <div className="mt-4 p-4 rounded-lg border border-gray-border bg-gray-page flex items-start gap-3">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
        <path d="M2 4l6 5 6-5M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="#67737e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <p className="text-[13px] font-semibold text-gray-dark mb-0.5">Contact customer support</p>
        <a href="mailto:kundeservice@finansavisen.no" className="text-[12px] text-blue-primary hover:underline">
          kundeservice@finansavisen.no
        </a>
        <p className="text-[12px] text-gray-medium mt-0.5">Response within 24 hours</p>
      </div>
    </div>
  );
}

// ── Inline expansion map ──────────────────────────────────────────────────────

function InlineExpansion({ reasonId, onAcceptOffer, onDowngrade }) {
  switch (reasonId) {
    case 'cost':
      return null;
    case 'not-using':
      return <InlinePauseOffer maxMonths={3} onAcceptPause={onAcceptOffer} />;
    case 'temp-break':
      return <InlinePauseOffer maxMonths={12} onAcceptPause={onAcceptOffer} />;
    case 'competitor':
      return <InlineCompetitorForm />;
    case 'feature':
      return <InlineTextarea placeholder="What feature or content is missing for you?" />;
    case 'payment':
      return <InlineSupportInfo />;
    case 'other':
      return <InlineTextarea placeholder="Tell us what's on your mind..." />;
    default:
      return null;
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ReasonSelect({ plan, onBack, onContinue, onAcceptOffer, onDowngrade }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Cancel subscription" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-lg">
          <h2 className="text-[20px] font-bold text-gray-dark mb-1">Why are you cancelling?</h2>
          <p className="text-[14px] text-gray-medium mb-6">Your feedback helps us improve.</p>

          <div className="space-y-2 mb-6">
            {CANCEL_REASONS.map((reason) => {
              const isSelected = selected === reason.id;
              return (
                <div
                  key={reason.id}
                  className={`bg-white rounded-lg border transition-all ${
                    isSelected
                      ? 'border-blue-primary ring-1 ring-blue-primary'
                      : 'border-gray-border hover:border-gray-muted'
                  }`}
                >
                  {/* Radio row */}
                  <label className="flex items-center gap-3 px-4 py-3.5 cursor-pointer">
                    <input
                      type="radio"
                      name="reason"
                      value={reason.id}
                      checked={isSelected}
                      onChange={() => setSelected(reason.id)}
                      className="accent-blue-primary flex-shrink-0"
                    />
                    <span className="text-[14px] text-gray-dark font-medium">{reason.label}</span>
                  </label>

                  {/* Inline expansion */}
                  {isSelected && (
                    <div className="px-4 pb-4">
                      <InlineExpansion
                        reasonId={reason.id}
                        onAcceptOffer={onAcceptOffer}
                        onDowngrade={onDowngrade}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => onContinue(selected)}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
