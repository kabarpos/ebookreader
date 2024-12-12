import { PaymentMethod } from '../types';

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bca',
    name: 'Bank BCA',
    accountNumber: '1234567890',
    accountName: 'PT EDUREADER',
    bankName: 'Bank Central Asia'
  },
  {
    id: 'mandiri',
    name: 'Bank Mandiri',
    accountNumber: '0987654321',
    accountName: 'PT EDUREADER',
    bankName: 'Bank Mandiri'
  },
  {
    id: 'bni',
    name: 'Bank BNI',
    accountNumber: '1122334455',
    accountName: 'PT EDUREADER',
    bankName: 'Bank Negara Indonesia'
  }
];