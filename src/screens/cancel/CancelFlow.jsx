import { useState } from 'react';
import ReasonSelect from './ReasonSelect';
import CostOfferScreen from './CostOfferScreen';
import BenefitsScreen from './BenefitsScreen';
import CancelSuccess from './CancelSuccess';

// Steps: 'reason' → 'cost-offer' (if cost) or 'benefits' → 'cancelled'
export default function CancelFlow({ plan, onClose, onCancelled, onDowngrade }) {
  const [step, setStep] = useState('reason');

  if (step === 'reason') {
    return (
      <ReasonSelect
        plan={plan}
        onBack={onClose}
        onContinue={(reason) => {
          if (reason === 'cost') {
            setStep('cost-offer');
          } else {
            setStep('benefits');
          }
        }}
        onAcceptOffer={onClose}
        onDowngrade={onDowngrade}
      />
    );
  }

  if (step === 'cost-offer') {
    return (
      <CostOfferScreen
        plan={plan}
        onBack={() => setStep('reason')}
        onClaimOffer={onClose}           // accepted offer → back to settings
        onCancel={() => setStep('cancelled')}
      />
    );
  }

  if (step === 'benefits') {
    return (
      <BenefitsScreen
        plan={plan}
        onKeep={onClose}
        onCancel={() => setStep('cancelled')}
      />
    );
  }

  if (step === 'cancelled') {
    return <CancelSuccess onDone={onCancelled} />;
  }

  return null;
}
