import StepHeader from '../../components/StepHeader';

export default function SupportConnect({ onBack, onCancelAnyway }) {
  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Cancel subscription" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-[20px] font-bold text-gray-dark mb-2">Let's sort this out</h2>
          <p className="text-[14px] text-gray-medium mb-6">
            Payment and delivery issues can almost always be resolved. Our customer support team is here to help.
          </p>

          {/* Support options */}
          <div className="mb-6">
            <div className="bg-white rounded-card border border-gray-border p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-light flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 5l6 5 6-5M3 5h12v9a1 1 0 01-1 1H4a1 1 0 01-1-1V5z" stroke="#0373e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-dark mb-1">Email support</h3>
                  <p className="text-[13px] text-gray-medium mb-2">Typical response time: within 24 hours</p>
                  <a
                    href="mailto:kundeservice@finansavisen.no"
                    className="text-[13px] text-blue-primary font-medium hover:underline"
                  >
                    kundeservice@finansavisen.no
                  </a>
                </div>
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
