import { useState } from 'react';
import ReasonSelect from './ReasonSelect';
import BenefitsScreen from './BenefitsScreen';
import CancelSuccess from './CancelSuccess';

// Steps: 'reason' → 'benefits' → 'cancelled'
export default function CancelFlow({ plan, onClose, onCancelled, onDowngrade }) {
  const [step, setStep] = useState('reason');

  if (step === 'reason') {
    return (
      <ReasonSelect
        plan={plan}
        onBack={onClose}
        onContinue={() => setStep('benefits')}
        onAcceptOffer={onClose}          // inline offer accepted → back to settings
        onDowngrade={onDowngrade}        // "View plans" → paywall
      />
    );
  }

  if (step === 'benefits') {
    return (
      <BenefitsScreen
        plan={plan}
        onKeep={onClose}                 // "Keep my subscription" → back to settings
        onCancel={() => setStep('cancelled')}
      />
    );
  }

  if (step === 'cancelled') {
    return <CancelSuccess onDone={onCancelled} />;
  }

  return null;
}
