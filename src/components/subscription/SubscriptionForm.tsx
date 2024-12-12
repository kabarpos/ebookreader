import React, { useState } from 'react';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { SubscriptionPlan, PaymentMethod } from '../../types';
import { formatCurrency } from '../../utils/format';
import { paymentMethods } from '../../data/paymentMethods';

interface SubscriptionFormProps {
  selectedPlan: SubscriptionPlan;
  onBack: () => void;
  onSubmit: (data: {
    plan: SubscriptionPlan;
    paymentMethod: PaymentMethod;
    customerInfo: {
      phone: string;
      address: string;
    };
  }) => void;
}

function SubscriptionForm({ selectedPlan, onBack, onSubmit }: SubscriptionFormProps) {
  const [step, setStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentMethod) return;

    onSubmit({
      plan: selectedPlan,
      paymentMethod: selectedPaymentMethod,
      customerInfo: {
        phone,
        address,
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Formulir Berlangganan
          </h2>
          <div className="flex items-center space-x-2">
            <span className={`h-2 w-2 rounded-full ${
              step >= 1 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`} />
            <span className={`h-2 w-2 rounded-full ${
              step >= 2 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`} />
          </div>
        </div>
      </div>

      {step === 1 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Detail Pelanggan
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nomor Telepon
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400"
                required
                placeholder="Contoh: 08123456789"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Alamat Lengkap
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400"
                required
                placeholder="Masukkan alamat lengkap Anda"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep(2)}
                disabled={!phone || !address}
                className="w-full rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 transition-colors"
              >
                Lanjutkan ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Metode Pembayaran
            </h3>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPaymentMethod?.id === method.id
                      ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentMethod?.id === method.id}
                      onChange={() => setSelectedPaymentMethod(method)}
                      className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {method.accountNumber} - {method.accountName}
                      </p>
                    </div>
                  </div>
                  <CreditCard className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </label>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Total Pembayaran</span>
                <span className="text-gray-900 dark:text-white">
                  {formatCurrency(selectedPlan.price)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                type="submit"
                disabled={!selectedPaymentMethod}
                className="w-full rounded-md bg-blue-600 dark:bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 transition-colors"
              >
                Bayar Sekarang
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Kembali
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SubscriptionForm;