import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';
import DeliverySuccess from './DeliverySuccess';

const MAX_WEEKS = 5;
const MS_PER_DAY = 86400000;
const MAX_DAYS = MAX_WEEKS * 7;

function toDateString(date) {
  return date.toISOString().split('T')[0];
}

function parseDate(str) {
  return str ? new Date(str + 'T00:00:00') : null;
}

function daysBetween(start, end) {
  if (!start || !end) return 0;
  return Math.round((parseDate(end) - parseDate(start)) / MS_PER_DAY);
}

export default function PauseDelivery({ onBack, onSave }) {
  const today = toDateString(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saved, setSaved] = useState(false);

  const days = daysBetween(startDate, endDate);
  const endError = endDate && startDate && days > MAX_DAYS
    ? `Maximum pause is ${MAX_WEEKS} weeks (${MAX_DAYS} days). You selected ${days} days.`
    : endDate && startDate && days <= 0
    ? 'End date must be after start date.'
    : null;

  const maxEndDate = startDate
    ? toDateString(new Date(parseDate(startDate).getTime() + MAX_DAYS * MS_PER_DAY))
    : '';

  const canSave = startDate && endDate && !endError;

  const handleSave = () => {
    onSave({ startDate, endDate });
    setSaved(true);
  };

  if (saved) {
    return (
      <DeliverySuccess
        title="Delivery paused"
        message={`Your newspaper delivery is paused from ${startDate} to ${endDate}. It will resume automatically afterwards.`}
        onDone={onBack}
      />
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-card border bg-white text-[14px] text-gray-dark focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary";

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Pause delivery" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="w-full max-w-md space-y-5">
          <div className="bg-blue-light rounded-card p-4">
            <p className="text-[13px] text-blue-primary font-medium">
              You can pause delivery for up to {MAX_WEEKS} weeks. The newspaper will resume automatically after the end date.
            </p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">Start date</label>
            <input
              type="date"
              className={`${inputClass} border-gray-border`}
              value={startDate}
              min={today}
              onChange={(e) => {
                setStartDate(e.target.value);
                // Reset end date if it's now invalid
                if (endDate && daysBetween(e.target.value, endDate) > MAX_DAYS) {
                  setEndDate('');
                }
              }}
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">End date</label>
            <input
              type="date"
              className={`${inputClass} ${endError ? 'border-red-destructive ring-1 ring-red-destructive' : 'border-gray-border'}`}
              value={endDate}
              min={startDate || today}
              max={maxEndDate}
              disabled={!startDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {endError && (
              <p className="text-[12px] text-red-destructive mt-1.5">{endError}</p>
            )}
            {startDate && !endError && endDate && (
              <p className="text-[12px] text-gray-medium mt-1.5">
                Pause duration: {days} {days === 1 ? 'day' : 'days'}
              </p>
            )}
            {startDate && (
              <p className="text-[12px] text-gray-medium mt-1">
                Maximum end date: {maxEndDate}
              </p>
            )}
          </div>

          <Button variant="primary" fullWidth disabled={!canSave} onClick={handleSave}>
            Pause delivery
          </Button>
        </div>
      </div>
    </div>
  );
}
