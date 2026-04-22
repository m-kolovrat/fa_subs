import { useState } from 'react';
import { DEFAULT_PLAN } from './data/plans';
import Layout from './components/Layout';
import SettingsPage from './screens/SettingsPage';
import PaywallPage from './screens/PaywallPage';
import CancelFlow from './screens/cancel/CancelFlow';
import EditAddress from './screens/delivery/EditAddress';
import PauseDelivery from './screens/delivery/PauseDelivery';
import HolidayAddress from './screens/delivery/HolidayAddress';

const INITIAL_ADDRESS = {
  name: 'Lucky Groningen',
  street: 'Platous gt 9',
  apt: '32/9',
  postal: '0190',
  city: 'Oslo',
};

export default function App() {
  const [screen, setScreen] = useState('settings');
  const [currentPlan, setCurrentPlan] = useState(DEFAULT_PLAN);
  const [subscriptionStatus, setSubscriptionStatus] = useState('active'); // 'active' | 'cancelled'
  const [deliveryAddress, setDeliveryAddress] = useState(INITIAL_ADDRESS);
  const [deliveryPeriod, setDeliveryPeriod] = useState('Mon-Sat');
  const [deliveryPause, setDeliveryPause] = useState(null);   // null | { startDate, endDate }
  const [holidayAddress, setHolidayAddress] = useState(null); // null | { address, startDate, endDate }

  const goSettings = () => setScreen('settings');

  // --- Paywall ---
  const handleSelectPlan = (plan, paperDelivery) => {
    setCurrentPlan(plan);
    if (paperDelivery) setDeliveryPeriod(paperDelivery);
    setSubscriptionStatus('active');
    goSettings();
  };

  // --- Cancel ---
  const handleCancelled = () => {
    setSubscriptionStatus('cancelled');
    goSettings();
  };

  // --- Edit address ---
  const handleSaveAddress = (address, period) => {
    setDeliveryAddress(address);
    setDeliveryPeriod(period);
  };

  // --- Pause delivery ---
  const handleSavePause = ({ startDate, endDate }) => {
    setDeliveryPause({ startDate, endDate });
  };

  // --- Holiday address ---
  const handleSaveHoliday = ({ address, startDate, endDate }) => {
    setHolidayAddress({ address, startDate, endDate });
  };

  // ---- Render ----

  if (screen === 'paywall') {
    return (
      <PaywallPage
        currentPlan={currentPlan}
        subscriptionStatus={subscriptionStatus}
        onSelectPlan={handleSelectPlan}
        onClose={goSettings}
      />
    );
  }

  if (screen === 'cancel') {
    return (
      <CancelFlow
        plan={currentPlan}
        onClose={goSettings}
        onCancelled={handleCancelled}
        onDowngrade={() => setScreen('paywall')}
      />
    );
  }

  if (screen === 'edit-address') {
    return (
      <EditAddress
        address={deliveryAddress}
        deliveryPeriod={deliveryPeriod}
        onBack={goSettings}
        onSave={handleSaveAddress}
      />
    );
  }

  if (screen === 'pause-delivery') {
    return (
      <PauseDelivery
        onBack={goSettings}
        onSave={handleSavePause}
      />
    );
  }

  if (screen === 'holiday-address') {
    return (
      <HolidayAddress
        onBack={goSettings}
        onSave={handleSaveHoliday}
      />
    );
  }

  // Default: settings
  return (
    <Layout>
      <SettingsPage
        plan={currentPlan}
        subscriptionStatus={subscriptionStatus}
        deliveryAddress={deliveryAddress}
        deliveryPeriod={deliveryPeriod}
        deliveryPause={deliveryPause}
        holidayAddress={holidayAddress}
        onChangePlan={() => setScreen('paywall')}
        onCancelSubscription={() => setScreen('cancel')}
        onRenewSubscription={() => setScreen('paywall')}
        onEditAddress={() => setScreen('edit-address')}
        onPauseDelivery={() => setScreen('pause-delivery')}
        onHolidayAddress={() => setScreen('holiday-address')}
        onUnpauseDelivery={() => setDeliveryPause(null)}
        onRemoveHolidayAddress={() => setHolidayAddress(null)}
      />
    </Layout>
  );
}
