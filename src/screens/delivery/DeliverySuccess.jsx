import Button from '../../components/Button';

export default function DeliverySuccess({ title, message, onDone }) {
  return (
    <div className="min-h-screen bg-gray-page flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-light flex items-center justify-center mb-5">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M7 16l6 6 12-12" stroke="#0373e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h2 className="text-[22px] font-bold text-gray-dark mb-2">{title}</h2>
      <p className="text-[14px] text-gray-medium mb-8 max-w-sm">{message}</p>

      <Button variant="primary" onClick={onDone}>Back to my account</Button>
    </div>
  );
}
