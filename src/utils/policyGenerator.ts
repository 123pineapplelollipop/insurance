import { PolicyOption, UserRequirement } from '../types';

// Function to generate personalized policy recommendations based on user requirements
export const generatePolicyRecommendations = (requirements: UserRequirement): PolicyOption[] => {
  // Default policy templates that will be customized
  const policyTemplates = [
    {
      name: 'Basic Protection Plan',
      description: 'Essential coverage for fundamental protection needs at an affordable price',
      basePremium: 1500,
      coverageMultiplier: 100,
      benefits: [
        'Accidental death benefit',
        'Hospitalization coverage',
        'Disability coverage'
      ],
      riskLevel: 'Low' as const
    },
    {
      name: 'Comprehensive Coverage',
      description: 'Balanced protection with additional benefits for complete peace of mind',
      basePremium: 2800,
      coverageMultiplier: 150,
      benefits: [
        'Accidental death benefit',
        'Hospitalization coverage',
        'Disability coverage',
        'Critical illness benefit',
        'Preventive health checkups'
      ],
      riskLevel: 'Medium' as const
    },
    {
      name: 'Premium Protection Plus',
      description: 'Our highest tier of protection with maximum benefits and coverage options',
      basePremium: 4200,
      coverageMultiplier: 200,
      benefits: [
        'Accidental death benefit',
        'Hospitalization coverage',
        'Disability coverage',
        'Critical illness benefit',
        'Preventive health checkups',
        'International coverage',
        'Family protection rider',
        '24/7 priority assistance'
      ],
      riskLevel: 'High' as const
    }
  ];

  // Calculate risk factor based on requirements (simplified algorithm)
  const calculateRiskFactor = (req: UserRequirement): number => {
    let riskFactor = 1.0;
    
    // Age factor
    if (req.age) {
      if (req.age < 30) riskFactor *= 0.85;
      else if (req.age < 45) riskFactor *= 1.0;
      else if (req.age < 60) riskFactor *= 1.2;
      else riskFactor *= 1.5;
    }
    
    // Health conditions factor
    riskFactor *= (1 + (req.healthConditions.length * 0.1));
    
    // Family history factor
    riskFactor *= (1 + (req.familyHistory.length * 0.05));
    
    // Income factor (higher income = higher coverage)
    if (req.annualIncome) {
      if (req.annualIncome < 300000) riskFactor *= 0.8;
      else if (req.annualIncome < 800000) riskFactor *= 1.0;
      else if (req.annualIncome < 1500000) riskFactor *= 1.2;
      else riskFactor *= 1.4;
    }
    
    return riskFactor;
  };

  const riskFactor = calculateRiskFactor(requirements);
  
  // Generate personalized policy options
  const personalizedPolicies: PolicyOption[] = policyTemplates.map((template, index) => {
    // Calculate personalized coverage and premium
    const coverageAmount = template.coverageMultiplier * 10000 * Math.max(1, riskFactor);
    const monthlyPremium = Math.round((template.basePremium * riskFactor) / 12);
    const yearlyPremium = Math.round(template.basePremium * riskFactor);
    
    // Add custom benefits based on user requirements
    const additionalBenefits: string[] = [];
    
    if (requirements.coverageNeeds.includes('family')) {
      additionalBenefits.push('Family coverage extension');
    }
    
    if (requirements.coverageNeeds.includes('travel')) {
      additionalBenefits.push('Travel insurance benefit');
    }
    
    if (requirements.lifestyle.includes('active')) {
      additionalBenefits.push('Sports injury coverage');
    }
    
    // Combine template benefits with additional personalized benefits
    const allBenefits = [...template.benefits, ...additionalBenefits];
    
    // Create the personalized policy
    return {
      id: `policy-${Date.now()}-${index}`,
      name: template.name,
      description: template.description,
      coverageAmount: Math.round(coverageAmount),
      monthlyPremium,
      yearlyPremium,
      benefits: allBenefits,
      riskLevel: template.riskLevel,
      recommended: index === 1 // Mark the middle option as recommended by default
    };
  });

  return personalizedPolicies;
};