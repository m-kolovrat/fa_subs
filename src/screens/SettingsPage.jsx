import Button from '../components/Button';

// Simple checkmark matching the screenshot style
const CHECK_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
    <path d="M3 8.5l3.5 3.5 6.5-7" stroke="#151719" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function SettingsPage({
  plan, subscriptionStatus, deliveryAddress, deliveryPeriod,
  deliveryPause, holidayAddress,
  onChangePlan, onCancelSubscription, onRenewSubscription,
  onEditAddress, onPauseDelivery, onHolidayAddress,
  onUnpauseDelivery, onRemoveHolidayAddress,
}) {
  const isCancelled = subscriptionStatus === 'cancelled';

  return (
    <div className="max-w-xl space-y-8">
      {/* Subscription section */}
      <div>
        <h2 className="text-[18px] font-semibold text-gray-dark mb-3">Current subscription plan</h2>

        <div className="bg-white rounded-lg border border-gray-border px-6 py-5">
          {isCancelled && (
            <InfoBar variant="red" icon={ICON_WARNING}>
              Subscription cancelled — active until 21. mai 2026
            </InfoBar>
          )}

          <p className="text-[14px] font-semibold text-gray-dark">{plan.name}</p>
          <p className="text-[13px] text-gray-medium mt-0.5">
            {isCancelled
              ? 'Your subscription has been cancelled.'
              : `Renewed 21. mai 2026 at ${plan.monthlyPrice} kr.`}
          </p>

          {!isCancelled && (
            <>
              <p className="text-[13px] text-gray-dark mt-4 mb-2">Here's what's included in your subscription:</p>
              <ul className="space-y-1.5">
                {(plan.settingsFeatures ?? plan.features).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-gray-dark">
                    {CHECK_ICON}
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="flex gap-2 mt-5">
            {isCancelled ? (
              <Button variant="primary" onClick={onRenewSubscription}>Renew subscription</Button>
            ) : (
              <>
                <Button variant="secondary" onClick={onChangePlan}>Change plan</Button>
                <Button variant="destructive" onClick={onCancelSubscription}>Cancel subscription</Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delivery section */}
      <div>
        <h2 className="text-[18px] font-semibold text-gray-dark mb-3">Delivery</h2>

        <div className="bg-white rounded-lg border border-gray-border px-6 py-5">
          {isCancelled && (
            <InfoBar variant="red" icon={ICON_WARNING}>
              Subscription cancelled — you will not receive physical copies after 21. mai 2026
            </InfoBar>
          )}

          {deliveryPause && (
            <InfoBar variant="amber" icon={ICON_PAUSE}>
              <span>Delivery paused until {formatDate(deliveryPause.endDate)}</span>
              <button
                onClick={onUnpauseDelivery}
                className="ml-2 underline cursor-pointer bg-transparent border-0 p-0 text-[12px] font-semibold text-amber-700 hover:text-amber-900"
              >
                Unpause
              </button>
            </InfoBar>
          )}

          {holidayAddress && (
            <InfoBar variant="blue" icon={ICON_LOCATION}>
              <span>
                Holiday address active: {holidayAddress.address.street}, {holidayAddress.address.postal} {holidayAddress.address.city}
                {' '}({formatDate(holidayAddress.startDate)}–{formatDate(holidayAddress.endDate)})
              </span>
              <span className="ml-2 inline-flex gap-2">
                <button
                  onClick={onHolidayAddress}
                  className="underline cursor-pointer bg-transparent border-0 p-0 text-[12px] font-semibold text-blue-primary hover:opacity-70"
                >
                  Edit
                </button>
                <button
                  onClick={onRemoveHolidayAddress}
                  className="underline cursor-pointer bg-transparent border-0 p-0 text-[12px] font-semibold text-blue-primary hover:opacity-70"
                >
                  Remove
                </button>
              </span>
            </InfoBar>
          )}

          <div className="text-[13px] text-gray-dark space-y-0.5">
            <p>{deliveryAddress.name}</p>
            <p>{deliveryAddress.street}</p>
            {deliveryAddress.apt && <p>{deliveryAddress.apt}</p>}
            <p>{deliveryAddress.postal} {deliveryAddress.city}</p>
          </div>

          <p className="text-[13px] text-gray-medium mt-3">Delivery period: {deliveryPeriod}</p>

          <p className="mt-3 text-[13px] text-gray-medium">
            Didn't receive newspaper?{' '}
            <button className="text-blue-primary font-medium hover:underline cursor-pointer bg-transparent border-0 p-0 text-[13px]">
              Report it here
            </button>
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            <Button variant="secondary" onClick={onEditAddress}>Edit address</Button>
            <Button variant="secondary" onClick={onPauseDelivery}>Pause delivery</Button>
            <Button variant="secondary" onClick={onHolidayAddress}>Change holiday address</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
