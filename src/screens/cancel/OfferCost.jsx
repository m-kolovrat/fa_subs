import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

export default function OfferCost({ onBack, onAcceptDiscount, onDowngrade, onCancelAnyway }) {
  const [discountAccepted, setDiscountAccepted] = useState(false);

  if (discountAccepted) {
    return (
      <div className="min-h-screen bg-gray-page flex flex-col">
        <StepHeader title="Special offer" onBack={() => setDiscountAccepted(false)} onClose={onBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l5 5 11-11" stroke="#14985e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">30% discount applied!</h2>
          <p className="text-[14px] text-gray-medium mb-8 max-w-sm">
            You've been switched to yearly billing with 30% off. Your new rate will start with your next billing cycle.
          </p>
          <Button variant="primary" onClick={onAcceptDiscount}>Back to my account</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Cancel subscription" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">We have options for you</h2>
          <p className="text-[14px] text-gray-medium mb-6">
            We understand cost is a concern. Here are two ways to save:
          </p>

          {/* Option A: Downgrade */}
          <div className="bg-white rounded-card border border-gray-border p-5 mb-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-light flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3v12M3 9h12" stroke="#0373e3" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-gray-dark mb-1">Switch to a cheaper plan</h3>
                <p className="text-[13px] text-gray-medium mb-3">
                  Keep digital access at a lower price. Basic starts at 449 kr/month.
                </p>
                <Button variant="secondary" onClick={onDowngrade}>View plans</Button>
              </div>
            </div>
          </div>

          {/* Option B: 30% off yearly */}
          <div className="bg-white rounded-card border border-blue-primary p-5 mb-6 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md" style={{ backgroundColor: '#d9f7e9', color: '#14985e' }}>
                Limited offer
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-light flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9.5L6.5 13 15 5" stroke="#0373e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-gray-dark mb-1">Switch to yearly and save 30%</h3>
                <p className="text-[13px] text-gray-medium mb-3">
                  Pay annually and get 30% off your current plan. Billed once a year — no surprises.
                </p>
                <Button variant="primary" onClick={() => setDiscountAccepted(true)}>Claim discount</Button>
              </div>
            </div>
          </div>

          <div className="text-center">
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
