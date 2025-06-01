import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  ChevronRight, 
  Check, 
  ArrowLeft, 
  Shield,
  AlertCircle
} from 'lucide-react';
import { PolicyOption, PaymentMethod } from '../types';

const PaymentPage: React.FC = () => {
  const { policyId } = useParams();
  const { policies } = useChatStore();
  const navigate = useNavigate();
  
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyOption | null>(null);
  const [paymentStep, setPaymentStep] = useState(1); // 1: method, 2: details, 3: success
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  
  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    { id: 'card', type: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'upi', type: 'upi', name: 'UPI', icon: 'Smartphone' },
    { id: 'netbanking', type: 'netbanking', name: 'Net Banking', icon: 'Building' }
  ];

  // Find the selected policy
  useEffect(() => {
    const policy = policies.find(p => p.id === policyId);
    if (policy) {
      setSelectedPolicy(policy);
    } else {
      navigate('/chatbot');
    }
  }, [policyId, policies, navigate]);

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handleContinue = () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    
    setError('');
    setPaymentStep(2);
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format with spaces every 4 digits
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    
    return cleaned;
  };

  const handlePayNow = () => {
    setLoading(true);
    setError('');
    
    // Validate based on payment method
    if (selectedMethod === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        setError('Please fill in all card details');
        setLoading(false);
        return;
      }
      
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Card number must be 16 digits');
        setLoading(false);
        return;
      }
      
      if (cvv.length < 3) {
        setError('CVV must be at least 3 digits');
        setLoading(false);
        return;
      }
    } else if (selectedMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setError('Please enter a valid UPI ID');
        setLoading(false);
        return;
      }
    } else if (selectedMethod === 'netbanking') {
      if (!bankAccount) {
        setError('Please select a bank');
        setLoading(false);
        return;
      }
    }
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentStep(3);
    }, 2000);
  };

  if (!selectedPolicy) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading policy details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-between">
              <div className="flex items-center">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  paymentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {paymentStep > 1 ? <Check className="h-5 w-5" /> : 1}
                </span>
                <span className={`ml-2 text-sm font-medium ${
                  paymentStep >= 1 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Payment Method
                </span>
              </div>
              <div className="flex items-center">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  paymentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {paymentStep > 2 ? <Check className="h-5 w-5" /> : 2}
                </span>
                <span className={`ml-2 text-sm font-medium ${
                  paymentStep >= 2 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Payment Details
                </span>
              </div>
              <div className="flex items-center">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  paymentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </span>
                <span className={`ml-2 text-sm font-medium ${
                  paymentStep >= 3 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              {/* Step 1: Payment Method */}
              {paymentStep === 1 && (
                <>
                  <div className="mb-6">
                    <button 
                      onClick={() => navigate('/chatbot')}
                      className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to Policy Selection
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        className={`p-4 border rounded-lg cursor-pointer flex items-center ${
                          selectedMethod === method.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex-shrink-0 mr-4">
                          {method.icon === 'CreditCard' && <CreditCard className="h-6 w-6 text-gray-700" />}
                          {method.icon === 'Smartphone' && <Smartphone className="h-6 w-6 text-gray-700" />}
                          {method.icon === 'Building' && <Building className="h-6 w-6 text-gray-700" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-sm text-gray-500">
                            {method.type === 'card' && 'Pay securely with your credit or debit card'}
                            {method.type === 'upi' && 'Pay using UPI apps like Google Pay, PhonePe, etc.'}
                            {method.type === 'netbanking' && 'Pay directly from your bank account'}
                          </p>
                        </div>
                        {selectedMethod === method.id && (
                          <div className="ml-4">
                            <Check className="h-5 w-5 text-blue-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      onClick={handleContinue}
                      className="btn-primary w-full py-3"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </>
              )}
              
              {/* Step 2: Payment Details */}
              {paymentStep === 2 && (
                <>
                  <div className="mb-6">
                    <button 
                      onClick={() => setPaymentStep(1)}
                      className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to Payment Methods
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-6">
                    {selectedMethod === 'card' && 'Enter Card Details'}
                    {selectedMethod === 'upi' && 'Enter UPI Details'}
                    {selectedMethod === 'netbanking' && 'Select Bank'}
                  </h2>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  {/* Card payment form */}
                  {selectedMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          className="input"
                          maxLength={19}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Smith"
                          className="input"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date (MM/YY)
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            placeholder="MM/YY"
                            className="input"
                            maxLength={5}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="123"
                            className="input"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* UPI payment form */}
                  {selectedMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          id="upiId"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="name@upi"
                          className="input"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Enter your UPI ID (e.g. name@okicici, name@ybl)
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-700 mb-2">Or pay using UPI apps</p>
                        <div className="grid grid-cols-4 gap-4">
                          <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" 
                              alt="Google Pay" 
                              className="h-8 mx-auto"
                            />
                            <span className="text-xs block mt-1">Google Pay</span>
                          </button>
                          <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png" 
                              alt="Paytm" 
                              className="h-8 mx-auto"
                            />
                            <span className="text-xs block mt-1">Paytm</span>
                          </button>
                          <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.png/640px-PhonePe_Logo.png" 
                              alt="PhonePe" 
                              className="h-8 mx-auto"
                            />
                            <span className="text-xs block mt-1">PhonePe</span>
                          </button>
                          <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/512px-UPI-Logo-vector.svg.png" 
                              alt="Other UPI" 
                              className="h-8 mx-auto"
                            />
                            <span className="text-xs block mt-1">Other UPI</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Net Banking form */}
                  {selectedMethod === 'netbanking' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="bankSelect" className="block text-sm font-medium text-gray-700 mb-1">
                          Select Your Bank
                        </label>
                        <select
                          id="bankSelect"
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          className="input"
                        >
                          <option value="">Select a bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                          <option value="yes">Yes Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                          <option value="bob">Bank of Baroda</option>
                        </select>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">
                          You will be redirected to your bank's website to complete the payment.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <button 
                      onClick={handlePayNow}
                      className="btn-primary w-full py-3 flex justify-center items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay ₹{selectedPolicy.monthlyPremium}
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
              
              {/* Step 3: Confirmation */}
              {paymentStep === 3 && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-8">
                    Your payment has been processed successfully and your policy is now active.
                  </p>
                  
                  <div className="p-4 border border-gray-200 rounded-lg mb-8 inline-block">
                    <p className="text-sm text-gray-700">
                      Policy Number: <span className="font-mono font-medium">INS-{Date.now().toString().slice(-8)}</span>
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="btn-primary"
                    >
                      Go to Dashboard
                    </button>
                    <button 
                      onClick={() => window.print()}
                      className="btn-outline"
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Order Summary</h3>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-2">
                <p className="text-sm font-medium text-gray-700 mb-1">{selectedPolicy.name}</p>
                <p className="text-xs text-gray-500 mb-4">{selectedPolicy.description}</p>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Monthly Premium</span>
                  <span className="text-sm font-medium">₹{selectedPolicy.monthlyPremium}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Coverage Amount</span>
                  <span className="text-sm font-medium">₹{selectedPolicy.coverageAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Risk Level</span>
                  <span className="text-sm font-medium">{selectedPolicy.riskLevel}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">₹{selectedPolicy.monthlyPremium}</span>
                  </div>
                  <p className="text-xs text-gray-500">Billed monthly</p>
                </div>
                
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Secure Payment</h4>
                  <p className="text-xs text-blue-800">
                    All payment information is encrypted and securely processed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;