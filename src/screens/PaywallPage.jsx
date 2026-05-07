import { useState } from 'react';
import { PLANS } from '../data/plans';
import Button from '../components/Button';
import ConfirmPlanChangeScreen from './ConfirmPlanChangeScreen';

const FA_LOGO = (
  <svg width="147" height="24" viewBox="0 0 147 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80.1362 6.66778C77.298 6.66778 73.9643 7.61497 73.9643 11.9734L78.3161 11.9751C78.4089 11.0353 78.8099 10.4283 79.9515 10.4283C80.8462 10.4283 81.2472 11.0678 81.2472 12.0748V13.2175C77.8837 13.3181 73.3264 14.3992 73.3264 18.9331C73.3264 22.2254 75.2566 23.9318 77.9425 23.9318C79.4834 23.9318 81.2472 22.5746 81.2472 22.5746V23.9318H86.2709L86.2444 11.8062C86.2444 8.07817 83.1286 6.66778 80.1362 6.66778ZM81.2464 19.6324C80.63 20.405 80.0749 20.7077 79.6425 20.7077C78.7478 20.7077 77.9392 20.0541 77.9392 18.8782C77.9367 17.3131 79.3343 16.4399 81.2472 16.2387L81.2464 19.6324Z" fill="#151719"/>
    <path d="M39.2769 6.66778C36.4378 6.66778 33.105 7.61497 33.105 11.9734L37.4568 11.9751C37.5488 11.0353 37.9498 10.4283 39.0914 10.4283C39.9861 10.4283 40.3871 11.0678 40.3871 12.0748V13.2175C37.0244 13.3181 32.4671 14.3992 32.4671 18.9331C32.4671 22.2254 34.399 23.9318 37.0832 23.9318C38.6241 23.9318 40.3879 22.5746 40.3879 22.5746V23.9318H45.4116L45.3851 11.8062C45.3851 8.07817 42.2693 6.66778 39.2778 6.66778H39.2769ZM40.3871 19.6324C39.7699 20.405 39.2148 20.7077 38.7832 20.7077C37.8885 20.7077 37.0791 20.0541 37.0791 18.8782C37.0774 17.3131 38.4742 16.4399 40.3871 16.2387V19.6324Z" fill="#151719"/>
    <path d="M0 23.9692H5.58295V14.1397H11.0731V9.49439H5.58295V4.64782H11.5992V0.00249502H0V23.9692Z" fill="#151719"/>
    <path d="M12.7085 23.9667V7.06861H17.7289V23.9667H12.7085Z" fill="#151719"/>
    <path d="M12.7085 4.84823V0H17.7289V4.84823H12.7085Z" fill="#151719"/>
    <path d="M28.4673 6.66695C26.6696 6.66695 25.0872 7.60915 24.0318 9.3264H23.9696V7.07027H18.9451V23.9692H23.9696V11.615L24.2488 11.2108C24.5901 10.7401 25.0242 10.5048 25.552 10.5048C26.4823 10.5048 26.7615 11.1102 26.7615 12.0191V23.9692H31.7861V10.4707C31.7861 8.14803 30.4837 6.66695 28.4673 6.66695Z" fill="#151719"/>
    <path d="M55.9255 6.66695C54.1261 6.66695 52.5446 7.60915 51.49 9.3264H51.4279V7.07027H46.4033V23.9692H51.4279V11.615L51.7071 11.2108C52.0484 10.7401 52.4825 10.5048 53.0102 10.5048C53.9406 10.5048 54.2197 11.1102 54.2197 12.0191V23.9692H59.2443V10.4707C59.2443 8.14803 57.9412 6.66695 55.9255 6.66695Z" fill="#151719"/>
    <path d="M65.0435 11.0827C65.0435 10.5555 65.5091 10.0283 66.5322 10.0283C67.7732 10.0283 68.4244 11.1484 68.8892 12.1372L72.3944 11.1476C71.4947 7.91933 68.9513 6.66778 66.4394 6.66778C62.0039 6.66778 60.3917 10.0607 60.3917 11.8071C60.3917 17.541 68.0218 16.4541 68.0218 19.2216C68.0218 19.9468 67.3698 20.4416 66.4394 20.4416C64.9813 20.4416 64.3302 19.2882 63.7412 18.0358L59.8946 19.3206C60.7016 22.0225 62.9657 24 66.4394 24C70.1302 24 72.6735 21.9235 72.6735 18.3651C72.6735 12.8956 65.0435 13.7522 65.0435 11.0827Z" fill="#151719"/>
    <path d="M93.3318 16.2611H93.2697L91.5018 7.0711H86.2908L90.665 23.9692H94.4486L99.4417 7.0711H95.4717L93.3318 16.2611Z" fill="#151719"/>
    <path d="M100.094 23.9667V7.06861H105.114V23.9667H100.094Z" fill="#151719"/>
    <path d="M100.094 4.84823V0H105.114V4.84823H100.094Z" fill="#151719"/>
    <path d="M111.072 11.0827C111.072 10.5555 111.538 10.0291 112.561 10.0291C113.802 10.0291 114.453 11.1493 114.918 12.1372L118.422 11.1493C117.524 7.91934 114.98 6.66695 112.468 6.66695C108.034 6.66695 106.42 10.0615 106.42 11.8079C106.42 17.5418 114.05 16.4541 114.05 19.2216C114.05 19.9468 113.399 20.4416 112.467 20.4416C111.009 20.4416 110.359 19.2882 109.77 18.0358L105.923 19.3206C106.73 22.0233 108.995 24 112.468 24C116.159 24 118.702 21.9243 118.702 18.3651C118.702 12.8956 111.072 13.7522 111.072 11.0827Z" fill="#151719"/>
    <path d="M126.146 6.66695C121.524 6.66695 119.229 10.6212 119.229 15.3006C119.229 19.8811 121.401 24 126.208 24C130.674 24 132.225 20.2428 132.442 19.4852L129.062 18.1672C128.751 19.5185 127.728 20.4408 126.519 20.4408C124.533 20.4408 124.254 17.9692 124.254 16.5198H132.659V15.3988C132.659 11.0827 130.984 6.66695 126.146 6.66695ZM124.254 13.3563C124.254 11.8079 124.688 10.0283 126.115 10.0283C127.852 10.0283 127.976 11.8079 128.007 13.3563H124.254Z" fill="#151719"/>
    <path d="M143.081 6.66695C141.283 6.66695 139.7 7.60998 138.646 9.3264H138.584V7.0711H133.559V23.9692H138.584V11.615L138.864 11.2116C139.204 10.7401 139.638 10.5048 140.166 10.5048C141.096 10.5048 141.375 11.1102 141.375 12.0191V23.9692H146.4V10.4707C146.4 8.14803 145.097 6.66695 143.081 6.66695Z" fill="#151719"/>
  </svg>
);

const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-[2px]">
    <path d="M3 8.5l3 3 7-7" stroke="#0373e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function RadioDot({ selected }) {
  return (
    <div className={`relative w-4 h-4 rounded-full border-2 flex-shrink-0 overflow-hidden ${selected ? 'border-blue-primary' : 'border-gray-border'}`}>
      {selected && <div className="absolute w-[6px] h-[6px] bg-blue-primary rounded-full left-[3px] top-[3px]" />}
    </div>
  );
}

export default function PaywallPage({ currentPlan, subscriptionStatus, onSelectPlan, onClose }) {
  const isRenewing = subscriptionStatus === 'cancelled';
  const [billing, setBilling] = useState('monthly');
  const [paperOption, setPaperOption] = useState('Fri-Sat');
  const [pendingSelection, setPendingSelection] = useState(null);

  const handleSelect = (plan) => {
    if (plan.id === currentPlan.id && !isRenewing) return;
    const selectedDelivery = plan.hasPaper ? paperOption : null;
    setPendingSelection({ plan, delivery: selectedDelivery });
  };

  if (pendingSelection) {
    const isUpgrade = isRenewing || pendingSelection.plan.monthlyPrice >= currentPlan.monthlyPrice;
    return (
      <ConfirmPlanChangeScreen
        fromPlan={currentPlan}
        toPlan={pendingSelection.plan}
        isUpgrade={isUpgrade}
        onBack={() => setPendingSelection(null)}
        onConfirm={() => onSelectPlan(pendingSelection.plan, pendingSelection.delivery)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between h-[72px] px-[120px] bg-white border-b border-gray-border shrink-0">
        {FA_LOGO}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-secondary hover:bg-gray-border transition-colors cursor-pointer border-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="#151719" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-[120px] py-[40px] flex flex-col items-center gap-10">
        {/* Title + toggle */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-[24px] font-bold text-gray-dark leading-8">Select your plan</h1>
            <p className="text-[14px] text-gray-medium leading-5">No commitment. Cancel easily any time</p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[14px] font-medium ${billing === 'monthly' ? 'text-gray-dark' : 'text-gray-medium'}`}>Månedlig</span>
            <button
              onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer border-0 flex-shrink-0 ${billing === 'yearly' ? 'bg-blue-primary' : 'bg-gray-border'}`}
            >
              <span className={`absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full shadow transition-transform ${billing === 'yearly' ? 'translate-x-[16px]' : 'translate-x-0'}`} />
            </button>
            <span className={`text-[14px] font-medium ${billing === 'yearly' ? 'text-gray-dark' : 'text-gray-medium'}`}>Årlig</span>
            <span className="bg-[#d9f7e9] border border-[#aeead0] text-[#14985e] text-[12px] font-medium px-2 py-0.5 rounded-[6px] leading-4">Spar 20%</span>
          </div>
        </div>

        {/* Plan cards */}
        <div className="flex gap-6 justify-center flex-wrap">
          {PLANS.filter(p => !p.isBusiness).map((plan) => {
            const isCurrent = plan.id === currentPlan.id;
            const price = billing === 'yearly'
              ? Math.round(plan.monthlyPrice * 12 * 0.8)
              : plan.monthlyPrice;
            const unit = billing === 'yearly' ? 'år' : 'mnd';

            return (
              <div
                key={plan.id}
                className="bg-white rounded-[16px] border border-gray-border flex flex-col gap-6 p-6 w-[282px]"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-[18px] font-semibold text-gray-dark leading-6">{plan.name}</h3>
                  <div className="flex flex-col gap-2">
                    <span className="text-[34px] font-bold text-gray-dark leading-[40px]">{price.toLocaleString('en-US')}</span>
                    <div className="flex flex-col text-[14px] text-gray-medium leading-5">
                      <span>Kr/{unit}</span>
                      <span>Renewed at {price.toLocaleString('en-US')} kr/{unit}</span>
                    </div>
                  </div>
                </div>

                {isCurrent && !isRenewing ? (
                  <Button variant="secondary" disabled fullWidth>Current plan</Button>
                ) : isCurrent && isRenewing ? (
                  <Button variant="primary" onClick={() => handleSelect(plan)} fullWidth>Renew</Button>
                ) : (
                  <Button variant="primary" onClick={() => handleSelect(plan)} fullWidth>Velg</Button>
                )}

                {plan.hasPaper && (
                  <div className="flex flex-col gap-2">
                    {plan.deliveryOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => setPaperOption(opt)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioDot selected={paperOption === opt} />
                        <span className="text-[14px] text-gray-dark leading-5">Paper {opt}</span>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      {CHECK_ICON}
                      <span className="text-[14px] text-gray-dark leading-5">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-[14px] text-gray-medium text-center">
          <span className="text-blue-primary font-medium cursor-pointer hover:underline">Under 30</span>
          {' år eller '}
          <span className="text-blue-primary font-medium cursor-pointer hover:underline">senior</span>
          {'? Vi har valg for deg.'}
        </p>
      </div>
    </div>
  );
}
