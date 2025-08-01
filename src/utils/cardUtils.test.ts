import { getEligibleCards, calculateTotalCredit, formatCurrency, formatPercentage } from '../utils/cardUtils';
import { creditCards } from '../data/creditCards';
import { testCustomers } from '../data/testCustomers';

describe('cardUtils', () => {
  describe('getEligibleCards', () => {
    test('Ollie Murphree should be eligible for Anywhere and Liquid cards', () => {
      const ollie = testCustomers[0]; // Ollie Murphree
      const eligibleCards = getEligibleCards(ollie, creditCards);
      
      expect(eligibleCards).toHaveLength(2);
      expect(eligibleCards.map(c => c.name)).toContain('Anywhere Card');
      expect(eligibleCards.map(c => c.name)).toContain('Liquid Card');
      expect(eligibleCards.map(c => c.name)).not.toContain('Student Life');
    });

    test('Elizabeth Edmundson should be eligible for all three cards', () => {
      const elizabeth = testCustomers[1]; // Elizabeth Edmundson
      const eligibleCards = getEligibleCards(elizabeth, creditCards);
      
      expect(eligibleCards).toHaveLength(3);
      expect(eligibleCards.map(c => c.name)).toContain('Anywhere Card');
      expect(eligibleCards.map(c => c.name)).toContain('Liquid Card');
      expect(eligibleCards.map(c => c.name)).toContain('Student Life');
    });

    test('Trevor Rieck should be eligible for only Anywhere Card', () => {
      const trevor = testCustomers[2]; // Trevor Rieck
      const eligibleCards = getEligibleCards(trevor, creditCards);
      
      expect(eligibleCards).toHaveLength(1);
      expect(eligibleCards.map(c => c.name)).toContain('Anywhere Card');
      expect(eligibleCards.map(c => c.name)).not.toContain('Liquid Card');
      expect(eligibleCards.map(c => c.name)).not.toContain('Student Life');
    });

    test('should return empty array for user with no eligible cards', () => {
      const ineligibleUser = {
        firstName: 'Test',
        lastName: 'User',
        dateOfBirth: '1990-01-01',
        employmentStatus: 'Part time' as const,
        annualIncome: 10000, // Too low for Liquid Card
        houseNumber: '123',
        postcode: 'TEST 123'
      };
      
      const eligibleCards = getEligibleCards(ineligibleUser, creditCards.filter(c => c.name !== 'Anywhere Card'));
      expect(eligibleCards).toHaveLength(0);
    });
  });

  describe('calculateTotalCredit', () => {
    test('should calculate total credit for multiple cards', () => {
      const allCards = creditCards;
      const totalCredit = calculateTotalCredit(allCards);
      
      // Student Life (1200) + Anywhere Card (300) + Liquid Card (3000) = 4500
      expect(totalCredit).toBe(4500);
    });

    test('should return 0 for empty array', () => {
      const totalCredit = calculateTotalCredit([]);
      expect(totalCredit).toBe(0);
    });

    test('should calculate total for single card', () => {
      const liquidCard = creditCards.find(c => c.name === 'Liquid Card')!;
      const totalCredit = calculateTotalCredit([liquidCard]);
      expect(totalCredit).toBe(3000);
    });
  });

  describe('formatCurrency', () => {
    test('should format currency correctly', () => {
      expect(formatCurrency(1200)).toBe('£1,200');
      expect(formatCurrency(300)).toBe('£300');
      expect(formatCurrency(3000)).toBe('£3,000');
      expect(formatCurrency(34000)).toBe('£34,000');
    });
  });

  describe('formatPercentage', () => {
    test('should format percentage correctly', () => {
      expect(formatPercentage(18.9)).toBe('18.9%');
      expect(formatPercentage(33.9)).toBe('33.9%');
      expect(formatPercentage(0)).toBe('0%');
    });
  });
});