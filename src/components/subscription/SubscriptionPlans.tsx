import React from 'react';
import { Check } from 'lucide-react';
import { subscriptionPlans } from '../../data/subscriptionPlans';
import { formatCurrency } from '../../utils/format';

interface SubscriptionPlansProps {
  onSelectPlan: (planId: string) => void;
}

function SubscriptionPlans({ onSelectPlan }: SubscriptionPlansProps) {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Pilih Paket Langganan
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Akses penuh ke semua konten premium dengan paket yang sesuai kebutuhan Anda
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-200 dark:divide-gray-700"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /{plan.duration === 'monthly' ? 'bulan' : 'tahun'}
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400 shrink-0" />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4">
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className="w-full rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-3 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                >
                  Pilih Paket {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlans;