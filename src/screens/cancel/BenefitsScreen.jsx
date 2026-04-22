import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
    <circle cx="8" cy="8" r="8" fill="#0373e3" fillOpacity="0.12"/>
    <path d="M5 8l2 2 4-4" stroke="#0373e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function BenefitsScreen({ plan, onKeep, onCancel }) {
  const features = plan?.settingsFeatures ?? plan?.features ?? [];

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Cancel subscription" onBack={onKeep} onClose={onKeep} />

      <div className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-lg">
          <h2 className="text-[22px] font-bold text-gray-dark mb-2">Before you leave</h2>
          <p className="text-[14px] text-gray-medium mb-7">
            Here's what you'd be giving up:
          </p>

          <div className="bg-white rounded-lg border border-gray-border px-6 py-5 mb-6">
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14px] text-gray-dark">
                  {CHECK_ICON}
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="primary" fullWidth onClick={onKeep}>
              Keep my subscription
            </Button>
            <button
              onClick={onCancel}
              className="text-[13px] text-gray-medium hover:text-red-destructive underline cursor-pointer bg-transparent border-0 py-2"
            >
              No thanks, cancel my subscription
            </button>
          </div>

          <p className="mt-8 text-center text-[13px] text-gray-medium">
            Questions? Our team is here to help.{' '}
            <button className="text-blue-primary font-medium hover:underline cursor-pointer bg-transparent border-0 p-0 text-[13px]">
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
