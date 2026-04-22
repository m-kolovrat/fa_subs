import { useState } from 'react';
import StepHeader from '../../components/StepHeader';
import Button from '../../components/Button';
import DeliverySuccess from './DeliverySuccess';

export default function EditAddress({ address, deliveryPeriod, onBack, onSave }) {
  const [form, setForm] = useState({ ...address });
  const [period, setPeriod] = useState(deliveryPeriod);
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    onSave(form, period);
    setSaved(true);
  };

  if (saved) {
    return (
      <DeliverySuccess
        title="Address updated"
        message="Your delivery address and period have been updated. Changes take effect with your next delivery."
        onDone={onBack}
      />
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-card border border-gray-border bg-white text-[14px] text-gray-dark focus:outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary";

  return (
    <div className="min-h-screen bg-gray-page flex flex-col">
      <StepHeader title="Edit address" onBack={onBack} onClose={onBack} />

      <div className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">Full name</label>
            <input className={inputClass} value={form.name} onChange={set('name')} placeholder="Full name" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">Street address</label>
            <input className={inputClass} value={form.street} onChange={set('street')} placeholder="Street address" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-1.5">
              Apartment / unit <span className="font-normal text-gray-medium">(optional)</span>
            </label>
            <input className={inputClass} value={form.apt} onChange={set('apt')} placeholder="Apt, floor, unit..." />
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

          {/* Delivery period */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-dark mb-2">Delivery period</label>
            <div className="flex gap-3">
              {['Fri-Sat', 'Mon-Sat'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPeriod(opt)}
                  className={`flex-1 py-3 rounded-card border text-[14px] font-medium transition-all cursor-pointer ${
                    period === opt
                      ? 'border-blue-primary bg-blue-light text-blue-primary'
                      : 'border-gray-border bg-white text-gray-dark hover:border-gray-muted'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-gray-medium mt-2">
              {period === 'Mon-Sat' ? 'Monday through Saturday' : 'Friday and Saturday only'}
            </p>
          </div>

          <Button variant="primary" fullWidth onClick={handleSave}>Save changes</Button>
        </div>
      </div>
    </div>
  );
}
