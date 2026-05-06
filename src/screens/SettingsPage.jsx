import Button from '../components/Button';

// Blue circle checkmark matching Figma
const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
    <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#151719" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function InfoBar({ variant = 'red', icon, children }) {
  const styles = {
    red:   { wrap: 'bg-red-50 border-red-200',     text: 'text-red-destructive',  iconStroke: '#ca2b3d' },
    amber: { wrap: 'bg-amber-50 border-amber-200', text: 'text-amber-700',        iconStroke: '#b45309' },
    blue:  { wrap: 'bg-blue-light border-blue-primary border-opacity-30', text: 'text-blue-primary', iconStroke: '#0373e3' },
  };
  const s = styles[variant];

  return (
    <div className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border ${s.wrap} mb-3`}>
      {icon && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
          {icon(s.iconStroke)}
        </svg>
      )}
      <div className={`text-[12px] font-medium leading-5 ${s.text} flex-1`}>
        {children}
      </div>
    </div>
  );
}

const ICON_WARNING = (color) => (
  <>
    <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5"/>
    <path d="M8 5v3.5M8 10.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </>
);

const ICON_PAUSE = (color) => (
  <>
    <rect x="4" y="4" width="3" height="8" rx="1" fill={color}/>
    <rect x="9" y="4" width="3" height="8" rx="1" fill={color}/>
  </>
);

const ICON_LOCATION = (color) => (
  <>
    <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="8" cy="6" r="1.5" stroke={color} strokeWidth="1.5"/>
  </>
);

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'];
  return `${parseInt(d)}. ${months[parseInt(m) - 1]} ${y}`;
}

// Shared label style matching Figma: 12px Medium gray
function FieldLabel({ children }) {
  return (
    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '16px', color: '#67737e' }}>
      {children}
    </p>
  );
}

export default function SettingsPage({
  plan, subscriptionStatus, deliveryAddress, deliveryPeriod,
  deliveryPause, holidayAddress, pendingPlanChange,
  onChangePlan, onCancelSubscription, onRenewSubscription,
  onEditAddress, onPauseDelivery, onHolidayAddress,
  onUnpauseDelivery, onRemoveHolidayAddress, onReportDelivery,
}) {
  const isCancelled = subscriptionStatus === 'cancelled';
  const noPaperPlan = !isCancelled && !plan.hasPaper && !pendingPlanChange?.plan?.hasPaper;

  return (
    <div className="w-full space-y-10">
      {/* ── Subscription section ── */}
      <div>
        <h2 className="text-[18px] font-semibold text-gray-dark mb-4">Current subscription plan</h2>

        <div className="bg-white rounded-[16px] overflow-hidden">
          {/* Card body */}
          <div className="flex flex-col gap-6 p-4">
            {isCancelled && (
              <InfoBar variant="amber" icon={ICON_WARNING}>
                Your subscription will end on 21. mai 2026
              </InfoBar>
            )}

            {pendingPlanChange && (
              <InfoBar variant="amber" icon={ICON_WARNING}>
                Your plan will change to <strong>{pendingPlanChange.plan.name}</strong> on{' '}
                {formatDate(pendingPlanChange.effectiveDate)} at {pendingPlanChange.plan.monthlyPrice.toLocaleString('en-US')} kr/mnd
              </InfoBar>
            )}

            {deliveryPause && (
              <InfoBar variant="amber" icon={ICON_PAUSE}>
                Subscription paused from {formatDate(deliveryPause.startDate)} — resumes on {formatDate(deliveryPause.endDate)}
              </InfoBar>
            )}

            {/* Plan name + renewal */}
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: '#151719' }}>
                {plan.name}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#67737e' }}>
                {isCancelled
                  ? 'Subscription cancelled'
                  : `Renewed 21. mai 2026 at ${plan.monthlyPrice.toLocaleString('en-US')} kr.`}
              </p>
            </div>

            {/* Features — always shown */}
            <div className="flex flex-col gap-4">
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#151719' }}>
                Here's what's included in your subscription:
              </p>
              <ul className="flex flex-col gap-2">
                {(plan.settingsFeatures ?? plan.features).map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    {CHECK_ICON}
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#151719' }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buttons row — separate section matching Figma */}
          <div className="flex gap-2 p-4">
            {isCancelled ? (
              <Button variant="primary" onClick={onRenewSubscription}>Renew subscription</Button>
            ) : (
              <>
                {/* Change plan = primary (blue) per Figma */}
                <Button variant="primary" onClick={onChangePlan}>
                  {plan.id === 'basic' || plan.id === 'total' ? 'Upgrade' : 'Change plan'}
                </Button>
                {/* Cancel = secondary (gray) per Figma */}
                <Button variant="secondary" onClick={onCancelSubscription}>Cancel subscription</Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Delivery section ── */}
      <div>
        <h2 className="text-[18px] font-semibold text-gray-dark mb-4">Delivery</h2>

        <div className="bg-white rounded-[16px] overflow-hidden">
          {/* Card body */}
          <div className="flex flex-col gap-6 p-4">
            {isCancelled && plan.hasPaper && (
              <InfoBar variant="amber" icon={ICON_WARNING}>
                Subscription cancelled — you will not receive physical copies after 21. mai 2026
              </InfoBar>
            )}

            {noPaperPlan && (
              <InfoBar variant="blue" icon={ICON_LOCATION}>
                Subscribe to the <strong>Total + paper</strong> plan to receive physical copies of the newspaper
              </InfoBar>
            )}


            {holidayAddress && (
              <InfoBar variant="blue" icon={ICON_LOCATION}>
                <span>
                  Holiday address active: {holidayAddress.address.street}, {holidayAddress.address.postal} {holidayAddress.address.city}
                  {' '}({formatDate(holidayAddress.startDate)}–{formatDate(holidayAddress.endDate)})
                </span>
                <span className="ml-2 inline-flex gap-2">
                  <button onClick={onHolidayAddress} className="underline cursor-pointer bg-transparent border-0 p-0 text-[12px] font-semibold text-blue-primary hover:opacity-70">Edit</button>
                  <button onClick={onRemoveHolidayAddress} className="underline cursor-pointer bg-transparent border-0 p-0 text-[12px] font-semibold text-blue-primary hover:opacity-70">Remove</button>
                </span>
              </InfoBar>
            )}

            {/* Delivery address */}
            <div className="flex flex-col gap-1">
              <FieldLabel>Delivery address</FieldLabel>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#151719' }}>
                <p>{deliveryAddress.name}</p>
                <p>{deliveryAddress.street}</p>
                {deliveryAddress.apt && <p>{deliveryAddress.apt}</p>}
                <p>{deliveryAddress.postal} {deliveryAddress.city}</p>
              </div>
            </div>

            {/* Delivery period */}
            <div className="flex flex-col gap-1">
              <FieldLabel>Delivery period</FieldLabel>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#151719' }}>
                {deliveryPeriod}
              </p>
            </div>

            {/* Report link */}
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '12px', lineHeight: '16px', color: '#67737e' }}>
              Didn't receive newspaper?{' '}
              <button onClick={onReportDelivery} className="text-blue-primary hover:underline cursor-pointer bg-transparent border-0 p-0" style={{ fontWeight: 500, fontSize: '12px' }}>
                Report it here
              </button>
            </p>
          </div>

          {/* Buttons row */}
          <div className="flex flex-wrap gap-2 p-4">
            <Button variant="secondary" onClick={onEditAddress}>Edit address</Button>
            <Button variant="secondary" onClick={onPauseDelivery}>Pause delivery</Button>
            <Button variant="secondary" onClick={onHolidayAddress}>Change holiday address</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
