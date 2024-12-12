import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface PaymentSuccessProps {
  planName: string;
  amount: number;
  onContinue: () => void;
}

function PaymentSuccess({ planName, amount, onContinue }: PaymentSuccessProps) {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Pembayaran Berhasil!</h2>
        <div className="mt-2 text-gray-600">
          <p>Terima kasih telah berlangganan paket {planName}</p>
          <p className="font-semibold">{formatCurrency(amount)}</p>
        </div>
        <div className="mt-8">
          <button
            onClick={onContinue}
            className="inline-flex items-center space-x-2 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Mulai Membaca</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;