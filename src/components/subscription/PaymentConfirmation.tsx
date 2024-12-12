import React, { useState } from 'react';
import { Copy, MessageCircle } from 'lucide-react';
import { PaymentMethod } from '../../types';
import { formatCurrency } from '../../utils/format';

interface PaymentConfirmationProps {
  selectedPlan: {
    name: string;
    price: number;
  };
  paymentMethod: PaymentMethod;
  onConfirm: () => void;
}

function PaymentConfirmation({ selectedPlan, paymentMethod, onConfirm }: PaymentConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(paymentMethod.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppClick = () => {
    const message = `Halo Admin, saya ingin konfirmasi pembayaran untuk paket ${selectedPlan.name} sebesar ${formatCurrency(selectedPlan.price)}`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Konfirmasi Pembayaran</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Detail Pembayaran</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Paket</p>
                  <p className="font-medium">{selectedPlan.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Pembayaran</p>
                  <p className="font-medium">{formatCurrency(selectedPlan.price)}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instruksi Pembayaran</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-4">Silakan transfer ke rekening berikut:</p>
              
              <div className="space-y-2">
                <p className="text-gray-600">Bank: {paymentMethod.bankName}</p>
                <p className="text-gray-600">Atas Nama: {paymentMethod.accountName}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-600">No. Rekening:</p>
                  <code className="bg-gray-200 px-2 py-1 rounded">{paymentMethod.accountNumber}</code>
                  <button
                    onClick={copyAccountNumber}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  {copied && (
                    <span className="text-green-600 text-sm">Tersalin!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={onConfirm}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition-colors"
            >
              Konfirmasi Pembayaran
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white rounded-lg px-4 py-3 hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Hubungi Admin via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation;