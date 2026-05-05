import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';

const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
    <path d="M3 8.5l3 3 7-7" stroke="#0373e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CostOfferScreen({ plan, onClaimOffer, onCancel, onBack }) {
  const [paperOption, setPaperOption] = useState(
    plan?.deliveryOptions?.[0] ?? null
  );

  const features = plan?.settingsFeatures ?? plan?.features ?? [];

  // 30% off the yearly total
  const originalYearly = (plan?.monthlyPrice ?? 0) * 12;
  const discountedYearly = Math.round(originalYearly * 0.7);

  const fmt = (n) => n.toLocaleString('nb');

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Cancel subscription" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="w-full max-w-[440px] bg-white rounded-[16px] overflow-hidden">
          <div className="flex flex-col gap-4 p-4">
            {/* Header text */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[20px] font-bold text-gray-dark leading-[26px]">
                Before you go, save 30% on yearly
              </h2>
              <p className="text-[14px] text-gray-medium leading-5">
                Switch to a yearly plan and lock in a lower price — no month-to-month surprises.
              </p>
            </div>

            {/* Plan card */}
            <div className="flex flex-col gap-6 bg-gray-page border border-gray-border rounded-[16px] px-6 py-6">
              {/* Plan name + pricing */}
              <div className="flex flex-col gap-4">
                <p className="text-[18px] font-semibold text-gray-dark leading-6">{plan?.name}</p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[34px] font-bold text-gray-dark leading-10">{fmt(discountedYearly)}</span>
                    <span className="text-[14px] font-medium text-gray-medium line-through">{fmt(originalYearly)}</span>
                    <span className="text-[14px] font-medium text-gray-medium">kr</span>
                  </div>
                  <p className="text-[14px] text-gray-medium leading-5">
                    Renewed at {fmt(originalYearly)} kr/år
                  </p>
                </div>
              </div>

              {/* Paper delivery options */}
              {plan?.hasPaper && plan.deliveryOptions && (
                <div className="flex flex-col gap-2 pb-4 border-b border-gray-border">
                  {plan.deliveryOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paperOption"
                        value={opt}
                        checked={paperOption === opt}
                        onChange={() => setPaperOption(opt)}
                        className="accent-blue-primary"
                      />
                      <span className="text-[14px] text-gray-dark">Paper {opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Features */}
              <ul className="flex flex-col gap-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    {CHECK_ICON}
                    <span className="text-[14px] text-gray-dark leading-5">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 p-4">
            <Button variant="secondary" fullWidth onClick={onCancel}>Cancel subscription</Button>
            <Button variant="primary" fullWidth onClick={onClaimOffer}>Claim offer</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
