import { useState } from 'react';
import { Agentation } from 'agentation';
import { DEFAULT_PLAN } from './data/plans';
import Layout from './components/Layout';
import SettingsPage from './screens/SettingsPage';
import PaywallPage from './screens/PaywallPage';
import CancelFlow from './screens/cancel/CancelFlow';
import Snackbar from './components/Snackbar';
import EditAddressModal from './screens/modals/EditAddressModal';
import PauseDeliveryModal from './screens/modals/PauseDeliveryModal';
import HolidayAddressModal from './screens/modals/HolidayAddressModal';
import ReportDeliveryModal from './screens/modals/ReportDeliveryModal';

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
  const [deliveryPause, setDeliveryPause] = useState(null);       // null | { startDate, endDate }
  const [holidayAddress, setHolidayAddress] = useState(null);     // null | { address, startDate, endDate }
  const [pendingPlanChange, setPendingPlanChange] = useState(null); // null | { plan, effectiveDate }
  const [snackbar, setSnackbar] = useState(null); // null | string message
  const [modal, setModal] = useState(null); // null | 'edit-address' | 'pause-delivery' | 'holiday-address' | 'report-delivery'

  const goSettings = () => setScreen('settings');

  // --- Paywall ---
  const handleSelectPlan = (plan, paperDelivery) => {
    const isDowngrade = plan.monthlyPrice < currentPlan.monthlyPrice;
    if (isDowngrade && subscriptionStatus === 'active') {
      setPendingPlanChange({ plan, effectiveDate: '2026-06-21' });
    } else {
      setCurrentPlan(plan);
      if (paperDelivery) setDeliveryPeriod(paperDelivery);
      setSubscriptionStatus('active');
      setPendingPlanChange(null);
    }
    goSettings();
  };

  // --- Cancel ---
  const handleCancelled = () => {
    setSubscriptionStatus('cancelled');
    setPendingPlanChange(null);
    goSettings();
    setSnackbar('Subscription cancelled');
  };

  // --- Edit address ---
  const handleSaveAddress = (address) => {
    setDeliveryAddress(address);
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

  let content;

  if (screen === 'paywall') {
    content = (
      <PaywallPage
        currentPlan={currentPlan}
        subscriptionStatus={subscriptionStatus}
        onSelectPlan={handleSelectPlan}
        onClose={goSettings}
      />
    );
  } else if (screen === 'cancel') {
    content = (
      <CancelFlow
        plan={currentPlan}
        onClose={goSettings}
        onCancelled={handleCancelled}
        onDowngrade={() => setScreen('paywall')}
      />
    );
  } else {
    content = (
      <Layout>
        <SettingsPage
          plan={currentPlan}
          subscriptionStatus={subscriptionStatus}
          deliveryAddress={deliveryAddress}
          deliveryPeriod={deliveryPeriod}
          deliveryPause={deliveryPause}
          holidayAddress={holidayAddress}
          pendingPlanChange={pendingPlanChange}
          onChangePlan={() => setScreen('paywall')}
          onCancelSubscription={() => setScreen('cancel')}
          onRenewSubscription={() => setScreen('paywall')}
          onEditAddress={() => setModal('edit-address')}
          onPauseDelivery={() => setModal('pause-delivery')}
          onHolidayAddress={() => setModal('holiday-address')}
          onReportDelivery={() => setModal('report-delivery')}
          onUnpauseDelivery={() => setDeliveryPause(null)}
          onRemoveHolidayAddress={() => setHolidayAddress(null)}
        />
      </Layout>
    );
  }

  return (
    <>
      {content}
      {modal === 'edit-address' && (
        <EditAddressModal
          address={deliveryAddress}
          onClose={() => setModal(null)}
          onSave={handleSaveAddress}
        />
      )}
      {modal === 'pause-delivery' && (
        <PauseDeliveryModal
          onClose={() => setModal(null)}
          onSave={handleSavePause}
        />
      )}
      {modal === 'holiday-address' && (
        <HolidayAddressModal
          onClose={() => setModal(null)}
          onSave={handleSaveHoliday}
        />
      )}
      {modal === 'report-delivery' && (
        <ReportDeliveryModal
          onClose={() => setModal(null)}
          onReport={() => {}}
        />
      )}
      {snackbar && <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />}
      {import.meta.env.DEV && <Agentation />}
    </>
  );
}
