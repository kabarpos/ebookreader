import React, { useState, useEffect } from 'react';
import { books } from './data/books';
import Dashboard from './components/Dashboard';
import EbookReader from './components/EbookReader';
import AuthModal from './components/auth/AuthModal';
import SubscriptionPlans from './components/subscription/SubscriptionPlans';
import SubscriptionForm from './components/subscription/SubscriptionForm';
import PaymentConfirmation from './components/subscription/PaymentConfirmation';
import PaymentSuccess from './components/subscription/PaymentSuccess';
import PaymentWaiting from './components/subscription/PaymentWaiting';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import { PaymentMethod, SubscriptionPlan } from './types';
import { subscriptionPlans } from './data/subscriptionPlans';

type View = 'dashboard' | 'reader' | 'subscription' | 'subscription-form' | 'payment-confirmation' | 'payment-waiting' | 'payment-success';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { user, updateSubscription } = useAuth();

  useEffect(() => {
    const handleOpenAuthModal = () => setShowAuthModal(true);
    window.addEventListener('open-auth-modal', handleOpenAuthModal);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuthModal);
  }, []);

  const handleNavigate = (view: string) => {
    if (view === 'dashboard' || view === 'subscription') {
      setCurrentView(view as View);
      setSelectedBookId(null);
      setSelectedPlan(null);
      setSelectedPaymentMethod(null);
      setIsPreviewMode(false);
    }
  };

  const handleBookSelect = (bookId: number, preview: boolean = false) => {
    if (!user && !preview) {
      setShowAuthModal(true);
      return;
    }

    if (!user?.subscription?.status && !preview) {
      setCurrentView('subscription');
      return;
    }

    setSelectedBookId(bookId);
    setIsPreviewMode(preview);
    setCurrentView('reader');
  };

  const handlePlanSelect = (planId: string) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setCurrentView('subscription-form');
    }
  };

  const handleSubscriptionSubmit = async (data: {
    plan: SubscriptionPlan;
    paymentMethod: PaymentMethod;
    customerInfo: {
      phone: string;
      address: string;
    };
  }) => {
    setSelectedPaymentMethod(data.paymentMethod);
    setCurrentView('payment-confirmation');
  };

  const handlePaymentConfirm = async () => {
    if (!selectedPlan || !user) return;
    setCurrentView('payment-waiting');
  };

  const handleActivateSubscription = () => {
    if (!selectedPlan || !user) return;

    updateSubscription({
      status: 'active',
      type: selectedPlan.duration,
      expiresAt: new Date(Date.now() + (selectedPlan.duration === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString(),
    });

    setCurrentView('payment-success');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar 
          onBackToDashboard={() => handleNavigate('dashboard')} 
          onNavigate={handleNavigate}
        />

        <main className="min-h-[calc(100vh-4rem)]">
          {currentView === 'dashboard' && (
            <Dashboard books={books} onBookSelect={handleBookSelect} />
          )}
          {currentView === 'reader' && selectedBookId && (
            <EbookReader 
              book={books.find(b => b.id === selectedBookId)!}
              onBack={() => handleNavigate('dashboard')}
              isPreview={isPreviewMode}
            />
          )}
          {currentView === 'subscription' && (
            <SubscriptionPlans onSelectPlan={handlePlanSelect} />
          )}
          {currentView === 'subscription-form' && selectedPlan && (
            <SubscriptionForm
              selectedPlan={selectedPlan}
              onBack={() => setCurrentView('subscription')}
              onSubmit={handleSubscriptionSubmit}
            />
          )}
          {currentView === 'payment-confirmation' && selectedPlan && selectedPaymentMethod && (
            <PaymentConfirmation
              selectedPlan={selectedPlan}
              paymentMethod={selectedPaymentMethod}
              onConfirm={handlePaymentConfirm}
            />
          )}
          {currentView === 'payment-waiting' && selectedPlan && (
            <PaymentWaiting
              onActivate={handleActivateSubscription}
            />
          )}
          {currentView === 'payment-success' && selectedPlan && (
            <PaymentSuccess
              planName={selectedPlan.name}
              amount={selectedPlan.price}
              onContinue={() => handleNavigate('dashboard')}
            />
          )}
        </main>

        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;