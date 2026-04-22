import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';
import DeliverySuccess from './DeliverySuccess';

function toDateString(date) {
  return date.toISOString().split('T')[0];
}

export default function HolidayAddress({ onBack, onSave }) {
  const today = toDateString(new Date());
  const [form, setForm] = useState({ street: '', apt: '', postal: '', city: '' });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const endError = startDate && endDate && endDate <= startDate
    ? 'End date must be after start date.'
    : null;

  const canSave = form.street && form.postal && form.city && startDate && endDate && !endError;

  const handleSave = () => {
    onSave({ address: form, startDate, endDate });
    setSaved(true);
  };

  if (saved) {
    return (
      <DeliverySuccess
        title="Holiday address saved"
        message={`Your newspaper will be delivered to ${form.street}, ${form.postal} ${form.city} from ${startDate} to ${endDate}.`}
        onDone={onBack}
      />
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-card border border-gray-border bg-white text-[14px] text-gray-dark focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary";

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Holiday address" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="w-full max-w-md space-y-4">
          <div className="bg-blue-light rounded-card p-4">
            <p className="text-[13px] text-blue-primary font-medium">
              Set a temporary address where your newspaper should be delivered during your holiday period.
            </p>
          </div>

          <p className="text-[13px] font-semibold text-gray-dark">Holiday address</p>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">Street address</label>
            <input className={inputClass} value={form.street} onChange={set('street')} placeholder="Street address" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">
              Apartment / unit <span className="font-normal text-gray-medium">(optional)</span>
            </label>
            <input className={inputClass} value={form.apt} onChange={set('apt')} placeholder="Apt, floor..." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">Postal code</label>
              <input className={inputClass} value={form.postal} onChange={set('postal')} placeholder="0000" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">City</label>
              <input className={inputClass} value={form.city} onChange={set('city')} placeholder="City" />
            </div>
          </div>

          <p className="text-[13px] font-semibold text-gray-dark pt-2">Delivery period</p>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">Start date</label>
            <input
              type="date"
              className={inputClass}
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">End date</label>
            <input
              type="date"
              className={`w-full px-4 py-3 rounded-card border bg-white text-[14px] text-gray-dark focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary ${endError ? 'border-red-destructive ring-1 ring-red-destructive' : 'border-gray-border'}`}
              value={endDate}
              min={startDate || today}
              disabled={!startDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {endError && (
              <p className="text-[12px] text-red-destructive mt-1.5">{endError}</p>
            )}
          </div>

          <Button variant="primary" fullWidth disabled={!canSave} onClick={handleSave}>
            Save holiday address
          </Button>
        </div>
      </div>
    </div>
  );
}
