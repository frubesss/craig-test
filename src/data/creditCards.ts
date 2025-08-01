import { CreditCardWithRules, UserDetails } from '../types';

// Eligibility rules
const isStudent = (user: UserDetails): boolean => 
  user.employmentStatus === 'Student';

const hasIncomeAbove16000 = (user: UserDetails): boolean => 
  user.annualIncome > 16000;

const anyoneEligible = (user: UserDetails): boolean => true;

// Credit card data with eligibility rules
export const creditCards: CreditCardWithRules[] = [
  {
    id: 'student-life',
    name: 'Student Life',
    apr: 18.9,
    balanceTransferOfferDuration: 0,
    purchaseOfferDuration: 6,
    creditAvailable: 1200,
    description: 'The Student Life credit card is only available to customers with an employment status of Student.',
    eligibilityRules: [isStudent]
  },
  {
    id: 'anywhere-card',
    name: 'Anywhere Card',
    apr: 33.9,
    balanceTransferOfferDuration: 0,
    purchaseOfferDuration: 0,
    creditAvailable: 300,
    description: 'The anywhere card is available to anyone anywhere.',
    eligibilityRules: [anyoneEligible]
  },
  {
    id: 'liquid-card',
    name: 'Liquid Card',
    apr: 33.9,
    balanceTransferOfferDuration: 12,
    purchaseOfferDuration: 6,
    creditAvailable: 3000,
    description: 'The Liquid card is a card available to customers who have an income of more than £16000.',
    eligibilityRules: [hasIncomeAbove16000]
  }
];