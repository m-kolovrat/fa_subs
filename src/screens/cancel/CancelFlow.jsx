import { useState } from 'react';
import ReasonSelect from './ReasonSelect';
import CostOfferScreen from './CostOfferScreen';
import ConfirmCancellationScreen from './ConfirmCancellationScreen';

// Steps: 'reason' → 'cost-offer' (if cost) → 'confirm-cancel'
//        'reason' → 'confirm-cancel' (all other reasons)
export default function CancelFlow({ plan, onClose, onCancelled, onPause }) {
  const [step, setStep] = useState('reason');

  if (step === 'reason') {
    return (
      <ReasonSelect
        onBack={onClose}
        onPause={onPause}
        onContinue={(reason) => {
          if (reason === 'cost') {
            setStep('cost-offer');
          } else {
            setStep('confirm-cancel');
          }
        }}
      />
    );
  }

  if (step === 'cost-offer') {
    return (
      <CostOfferScreen
        plan={plan}
        onBack={() => setStep('reason')}
        onClaimOffer={onClose}
        onCancel={() => setStep('confirm-cancel')}
      />
    );
  }

  if (step === 'confirm-cancel') {
    return (
      <ConfirmCancellationScreen
        plan={plan}
        onBack={onClose}
        onConfirm={onCancelled}
      />
    );
  }

  return null;
}
