import { useState } from 'react';
import Modal, { Field } from '../../components/Modal';

export default function EditAddressModal({ address, onClose, onSave }) {
  const [form, setForm] = useState({ ...address });
  const set = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));

  return (
    <Modal
      title="Edit delivery address"
      onClose={onClose}
      primaryLabel="Lagre"
      onPrimary={() => { onSave(form); onClose(); }}
    >
      <Field label="Navn" value={form.name} onChange={set('name')} placeholder="Navn" />

      <div className="flex gap-4">
        <Field label="Gate" value={form.street} onChange={set('street')} placeholder="Gate" />
        <Field label="Gatenummer" value={form.apt ?? ''} onChange={set('apt')} placeholder="9" />
      </div>

      <div className="flex gap-4">
        <Field label="Dør" value={''} onChange={() => {}} placeholder="32" />
        <Field label="Etasje" value={''} onChange={() => {}} placeholder="4" />
      </div>

      <div className="flex gap-4">
        <Field label="Postkode" value={form.postal} onChange={set('postal')} placeholder="0190" />
        <Field label="By/sted" value={form.city} onChange={set('city')} placeholder="Oslo" />
      </div>
    </Modal>
  );
}
