import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { PolicyOption } from '../types';

interface PolicyCardProps {
  policy: PolicyOption;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy }) => {
  const navigate = useNavigate();

  const handleSelectPolicy = () => {
    navigate(`/payment/${policy.id}`);
  };

  return (
    <div 
      className={`card relative transition-all hover:shadow-lg ${
        policy.recommended ? 'border-2 border-blue-500' : ''
      }`}
    >
      {policy.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
          <Star className="w-4 h-4 mr-1 fill-current" />
          Recommended
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{policy.name}</h3>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-4 ${
          policy.riskLevel === 'Low' 
            ? 'bg-green-100 text-green-800' 
            : policy.riskLevel === 'Medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
        }`}>
          {policy.riskLevel} Risk
        </div>
        <p className="text-gray-600 mb-4">{policy.description}</p>
        
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-gray-600 text-sm">Monthly Premium</span>
            <span className="text-2xl font-bold text-gray-900">₹{policy.monthlyPremium}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-gray-600 text-sm">Yearly Premium</span>
            <div className="text-right">
              <span className="text-xl font-bold text-gray-900">₹{policy.yearlyPremium}</span>
              <span className="text-sm text-green-600 block">Save ₹{policy.monthlyPremium * 12 - policy.yearlyPremium}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Coverage Details</h4>
          <div className="text-gray-700 text-sm">
            <p className="mb-2">Coverage Amount: <span className="font-semibold">₹{policy.coverageAmount.toLocaleString()}</span></p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Benefits</h4>
          <ul className="space-y-2">
            {policy.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={handleSelectPolicy}
          className="w-full btn-primary py-3"
        >
          Select Policy
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;