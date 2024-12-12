import React from 'react';
import { Clock, MessageCircle } from 'lucide-react';

interface PaymentWaitingProps {
  onActivate: () => void;
}

function PaymentWaiting({ onActivate }: PaymentWaitingProps) {
  const handleWhatsAppClick = () => {
    const message = `Halo Admin, saya ingin mengkonfirmasi status aktivasi akun saya`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-yellow-100 rounded-full mb-6">
          <Clock className="h-8 w-8 text-yellow-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Menunggu Aktivasi Akun
        </h2>

        <p className="text-gray-600 mb-8">
          Pembayaran Anda sedang diverifikasi oleh tim kami. Proses ini biasanya memakan waktu 1x24 jam kerja.
          Anda akan mendapatkan notifikasi setelah akun Anda diaktifkan.
        </p>

        <div className="space-y-4">
          <button
            onClick={handleWhatsAppClick}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white rounded-lg px-4 py-3 hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Tanyakan Status via WhatsApp</span>
          </button>

          {/* This button is for demo purposes only */}
          <button
            onClick={onActivate}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 hover:bg-blue-700 transition-colors"
          >
            Demo: Aktivasi Akun
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Jika Anda belum menerima konfirmasi dalam 24 jam, silakan hubungi tim support kami.
        </p>
      </div>
    </div>
  );
}

export default PaymentWaiting;