import { useState } from 'react';
import Modal from '../../components/Modal';

function RadioDot({ selected }) {
  return (
    <div className={`relative w-4 h-4 rounded-full border-2 flex-shrink-0 overflow-hidden ${selected ? 'border-blue-primary' : 'border-gray-border'}`}>
      {selected && <div className="absolute w-[6px] h-[6px] bg-blue-primary rounded-full left-[3px] top-[3px]" />}
    </div>
  );
}

function getRecentDates() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const result = [];
  const today = new Date();
  for (let i = 7; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const day = days[d.getDay()];
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    result.push({ label: `${day} (${dd}.${mm}.${yyyy})`, value: `${yyyy}-${mm}-${dd}` });
  }
  return result;
}

export default function ReportDeliveryModal({ onClose, onReport }) {
  const [selected, setSelected] = useState(null);
  const dates = getRecentDates();

  return (
    <Modal
      title="Report undelivered paper"
      onClose={onClose}
      primaryLabel="Report"
      onPrimary={() => { if (selected) { onReport(selected); onClose(); } }}
    >
      <p className="text-[14px] text-gray-medium leading-5">
        Please select the date of the missing delivery. We'll send missing newspaper as soon as possible. Remember that you can also read today's eAvisen.
      </p>

      <div className="flex flex-col gap-2">
        {dates.map((d) => (
          <div
            key={d.value}
            onClick={() => setSelected(d.value)}
            className={`flex items-center gap-2 border rounded-[8px] p-4 cursor-pointer transition-colors ${
              selected === d.value ? 'border-blue-primary' : 'border-gray-border hover:border-gray-muted'
            }`}
          >
            <RadioDot selected={selected === d.value} />
            <span className="text-[14px] text-gray-dark leading-5">{d.label}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}
