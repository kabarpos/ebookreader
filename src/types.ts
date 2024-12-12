import { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: {
    status: 'active' | 'expired' | 'pending' | null;
    type: 'monthly' | 'yearly' | null;
    expiresAt: string | null;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface Subchapter {
  id: string;
  title: string;
  content: ReactNode;
  preview?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  subchapters: Subchapter[];
}

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  chapters: Chapter[];
  purchased: boolean;
  previewPages: number;
}

export interface VideoEmbedProps {
  url: string;
}

export interface CodeBlockProps {
  language: string;
  filename?: string;
  children: string;
}

export interface AlertProps {
  type: 'tip' | 'warning' | 'error';
  children: ReactNode;
}

export interface QuizProps {
  question: string;
  options: string[];
  answer: number;
}