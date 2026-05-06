import { useState } from 'react';
import Modal, { Field } from '../../components/Modal';

export default function PauseDeliveryModal({ onClose, onSave }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <Modal
      title="Pause delivery"
      onClose={onClose}
      primaryLabel="Lagre"
      onPrimary={() => { if (startDate && endDate) { onSave({ startDate, endDate }); onClose(); } }}
    >
      <div className="flex gap-4">
        <Field label="Start date" value={startDate} onChange={setStartDate} placeholder="Start date" type="date" />
        <Field label="End date" value={endDate} onChange={setEndDate} placeholder="End date" type="date" />
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
