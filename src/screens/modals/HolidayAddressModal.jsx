import { useState } from 'react';
import Modal, { Field } from '../../components/Modal';

export default function HolidayAddressModal({ onClose, onSave }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [form, setForm] = useState({ name: '', street: '', streetNo: '', door: '', floor: '', postal: '', city: '' });
  const set = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSave = () => {
    if (!startDate || !endDate) return;
    onSave({
      address: { street: `${form.street} ${form.streetNo}`.trim(), postal: form.postal, city: form.city },
      startDate,
      endDate,
    });
    onClose();
  };

  return (
    <Modal
      title="Change holiday address"
      onClose={onClose}
      primaryLabel="Lagre"
      onPrimary={handleSave}
    >
      <div className="flex gap-4">
        <Field label="Start date" value={startDate} onChange={setStartDate} placeholder="Start date" type="date" />
        <Field label="End date" value={endDate} onChange={setEndDate} placeholder="End date" type="date" />
      </div>

      <Field label="Navn" value={form.name} onChange={set('name')} placeholder="Navn" />

      <div className="flex gap-4">
        <Field label="Gate" value={form.street} onChange={set('street')} placeholder="Gate" />
        <Field label="Gatenummer" value={form.streetNo} onChange={set('streetNo')} placeholder="Gatenummer" />
      </div>

      <div className="flex gap-4">
        <Field label="Dør" value={form.door} onChange={set('door')} placeholder="Dør" />
        <Field label="Etasje" value={form.floor} onChange={set('floor')} placeholder="Etasje" />
      </div>

      <div className="flex gap-4">
        <Field label="Postkode" value={form.postal} onChange={set('postal')} placeholder="Postkode" />
        <Field label="By/sted" value={form.city} onChange={set('city')} placeholder="By/sted" />
      </div>

      <p className="text-[14px] text-gray-medium leading-5">
        The first possible date for change is{' '}
        <span className="font-semibold text-gray-medium">Saturday, March 19, 2026</span>
        . Maximum duration is 60 days.
      </p>

      <p className="text-[14px] text-gray-medium leading-5">
        Note that some dates may be unavailable due to active re-registrations, registered holiday stops, etc.
      </p>
    </Modal>
  );
}
