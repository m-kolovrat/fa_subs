export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 449,
    firstMonthPrice: 1,
    features: [
      'Digital access to premium articles from Finansavisen, Kapital, and Motor',
    ],
    hasPaper: false,
    deliveryOptions: null,
  },
  {
    id: 'total',
    name: 'Total',
    monthlyPrice: 699,
    firstMonthPrice: 99,
    popular: true,
    features: [
      'Everything in Basic',
      'Real-time data from the Oslo Stock Exchange',
      'Top 50 shareholders',
      "The bellsheep's stock transactions",
      'ePaper',
    ],
    settingsFeatures: [
      'Digital access to premium articles from Finansavisen, Kapital, and Motor',
      'Real-time data from the Oslo Stock Exchange',
      'Top 50 shareholders',
      "The bellsheep's stock transactions",
      'ePaper',
    ],
    hasPaper: false,
    deliveryOptions: null,
  },
  {
    id: 'total-paper',
    name: 'Total + paper',
    monthlyPrice: 999,
    firstMonthPrice: 249,
    features: [
      'Everything in Total',
      'Physical paper',
      'Extended weekend coverage and in-depth analysis',
    ],
    settingsFeatures: [
      'Digital access to premium articles from Finansavisen, Kapital, and Motor',
      'Real-time data from the Oslo Stock Exchange',
      'Top 50 shareholders',
      "The bellsheep's stock transactions",
      'ePaper',
      'Physical paper',
      'Extended weekend coverage and in-depth analysis',
    ],
    hasPaper: true,
    deliveryOptions: ['Fri-Sat', 'Mon-Sat'],
  },
  {
    id: 'bedrift',
    name: 'Bedrift',
    features: [
      'Seamless access for all employees',
      "Discounted prices on Finansavisen's professional events",
      'Full access: web, app, and e-paper',
      'Start today – one month free of charge',
      "Personal introduction to Finansavisen's services",
    ],
    hasPaper: false,
    deliveryOptions: null,
    isBusiness: true,
  },
];

export const DEFAULT_PLAN = PLANS[2]; // Total + paper

export const CANCEL_REASONS = [
  { id: 'cost', label: 'Cost' },
  { id: 'not-using', label: 'Not using Finansavisen enough' },
  { id: 'competitor', label: 'Switching to competitor' },
  { id: 'temp-break', label: 'Need a break' },
  { id: 'feature', label: 'Missing or bad feature' },
  { id: 'payment', label: 'Payment or delivery issues' },
  { id: 'other', label: 'Other' },
];

export const COMPETITORS = [
  'DN (Dagens Næringsliv)',
  'E24',
  'Aftenposten',
  'Bloomberg',
  'Financial Times',
  'Reuters',
  'Other',
];
