import { SubscriptionPlan } from '../types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Bulanan',
    price: 99000,
    duration: 'monthly',
    features: [
      'Akses ke semua buku',
      'Konten premium',
      'Updates bulanan',
      'Dukungan prioritas'
    ]
  },
  {
    id: 'yearly',
    name: 'Tahunan',
    price: 999000,
    duration: 'yearly',
    features: [
      'Semua fitur Bulanan',
      'Hemat 15%',
      'Akses eksklusif webinar',
      'Konsultasi 1-on-1'
    ]
  }
];