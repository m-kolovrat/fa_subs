import { useState } from 'react';
import { PLANS } from '../data/plans';
import Button from '../components/Button';

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
    <path d="M2.5 7l3 3 6-6" stroke="#0373e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PaywallPage({ currentPlan, subscriptionStatus, onSelectPlan, onClose }) {
  const isRenewing = subscriptionStatus === 'cancelled';
  const [billing, setBilling] = useState('monthly');
  const [paperOption, setPaperOption] = useState('Fri-Sat');
  const [employees, setEmployees] = useState(5);

  const handleSelect = (plan) => {
    // Allow re-selecting current plan when renewing a cancelled subscription
    if (plan.id === currentPlan.id && !isRenewing) return;
    const selectedDelivery = plan.hasPaper ? paperOption : null;
    onSelectPlan(plan, selectedDelivery);
  };

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-border">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold text-gray-dark tracking-tight">Finansavisen</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-pill flex items-center justify-center bg-gray-secondary hover:bg-gray-border transition-colors cursor-pointer border-0"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M14 4L4 14M4 4l10 10" stroke="#151719" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-8 max-w-5xl mx-auto w-full">
        <h1 className="text-[24px] font-bold text-gray-dark mb-1">Subscribe today</h1>
        <p className="text-[14px] text-gray-medium mb-6">No commitment. Cancel easily any time</p>

        {/* Billing toggle */}
        <div className="flex items-center gap-3 mb-8">
          <span className={`text-[14px] font-medium ${billing === 'monthly' ? 'text-gray-dark' : 'text-gray-medium'}`}>Monthly</span>
          <button
            onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative w-11 h-6 rounded-pill transition-colors cursor-pointer border-0 ${billing === 'yearly' ? 'bg-blue-primary' : 'bg-gray-border'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${billing === 'yearly' ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-[14px] font-medium ${billing === 'yearly' ? 'text-gray-dark' : 'text-gray-medium'}`}>Yearly</span>
          {billing === 'yearly' && (
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md" style={{ backgroundColor: '#d9f7e9', color: '#14985e' }}>
              Save 20%
            </span>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === currentPlan.id;
            const price = plan.isBusiness
              ? plan.yearlyPrice
              : billing === 'yearly'
              ? plan.yearlyPrice
              : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-card border ${isCurrent ? 'border-blue-primary' : 'border-gray-border'} p-5 flex flex-col relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-5">
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-blue-primary text-white rounded-pill">
                      Mest populær
                    </span>
                  </div>
                )}

                <h3 className="text-[16px] font-semibold text-gray-dark mb-2 mt-2">{plan.name}</h3>

                {plan.isBusiness ? (
                  <div className="mb-4">
                    <span className="text-[28px] font-bold text-gray-dark">{price.toLocaleString('nb')}</span>
                    <span className="text-[13px] text-gray-medium ml-1">kr/år</span>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[13px] text-gray-medium">Select number of employees</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => setEmployees(e => Math.max(1, e - 1))}
                        className="w-7 h-7 rounded-full border border-gray-border flex items-center justify-center hover:bg-gray-page cursor-pointer bg-white text-gray-dark text-lg leading-none"
                      >−</button>
                      <span className="text-[14px] font-semibold text-gray-dark w-5 text-center">{employees}</span>
                      <button
                        onClick={() => setEmployees(e => e + 1)}
                        className="w-7 h-7 rounded-full border border-gray-border flex items-center justify-center hover:bg-gray-page cursor-pointer bg-white text-gray-dark text-lg leading-none"
                      >+</button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex items-end gap-1.5">
                      <span className="text-[28px] font-bold text-gray-dark">{price}</span>
                      <span className="text-[13px] text-gray-medium pb-1">kr/{billing === 'yearly' ? 'mnd' : 'mnd'}</span>
                    </div>
                    {billing === 'monthly' && plan.firstMonthPrice !== undefined && (
                      <p className="text-[12px] text-gray-medium mt-0.5">
                        First month: <span className="font-semibold text-gray-dark">{plan.firstMonthPrice} kr</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Paper delivery options for Total + paper */}
                {plan.hasPaper && (
                  <div className="mb-4 space-y-1.5">
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
                        <span className="text-[13px] text-gray-dark">Paper {opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12px] text-gray-medium">
                      {CHECK_ICON}
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {isCurrent && !isRenewing ? (
                  <Button variant="secondary" disabled fullWidth>Current plan</Button>
                ) : isCurrent && isRenewing ? (
                  <Button variant="primary" onClick={() => handleSelect(plan)} fullWidth>Renew</Button>
                ) : (
                  <Button variant="primary" onClick={() => handleSelect(plan)} fullWidth>Velg</Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-[13px] text-gray-medium">
          Under 30 or senior?{' '}
          <span className="text-blue-primary font-medium cursor-pointer hover:underline">We have options for you.</span>
        </p>
      </div>
    </div>
  );
}
