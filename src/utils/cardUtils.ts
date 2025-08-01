import { CreditCardWithRules, UserDetails } from '../types';

/**
 * Filter credit cards based on user eligibility
 */
export const getEligibleCards = (
  user: UserDetails, 
  cards: CreditCardWithRules[]
): CreditCardWithRules[] => {
  return cards.filter(card => 
    card.eligibilityRules.every(rule => rule(user))
  );
};

/**
 * Calculate total credit available from selected cards
 */
export const calculateTotalCredit = (selectedCards: CreditCardWithRules[]): number => {
  return selectedCards.reduce((total, card) => total + card.creditAvailable, 0);
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number): string => {
  return `£${amount.toLocaleString()}`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};