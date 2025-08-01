import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreditCardResults from '../components/CreditCardResults';
import { creditCards } from '../data/creditCards';
import { testCustomers } from '../data/testCustomers';
import { getEligibleCards } from '../utils/cardUtils';

describe('CreditCardResults', () => {
  const mockOnStartOver = jest.fn();

  beforeEach(() => {
    mockOnStartOver.mockClear();
  });

  test('displays no results message when no cards are eligible', () => {
    const ineligibleUser = {
      firstName: 'Test',
      lastName: 'User',
      dateOfBirth: '1990-01-01',
      employmentStatus: 'Part time' as const,
      annualIncome: 10000,
      houseNumber: '123',
      postcode: 'TEST 123'
    };

    render(
      <CreditCardResults
        user={ineligibleUser}
        eligibleCards={[]}
        onStartOver={mockOnStartOver}
      />
    );

    expect(screen.getByText('No Eligible Cards Found')).toBeInTheDocument();
    expect(screen.getByText(/Test User.*don't meet the eligibility criteria/)).toBeInTheDocument();
  });

  test('displays eligible cards for Elizabeth Edmundson (all three cards)', () => {
    const elizabeth = testCustomers[1];
    const eligibleCards = getEligibleCards(elizabeth, creditCards);

    render(
      <CreditCardResults
        user={elizabeth}
        eligibleCards={eligibleCards}
        onStartOver={mockOnStartOver}
      />
    );

    expect(screen.getByText('Your Eligible Credit Cards')).toBeInTheDocument();
    expect(screen.getByText(/Elizabeth Edmundson.*eligible for 3 credit cards/)).toBeInTheDocument();
    expect(screen.getByText('Student Life')).toBeInTheDocument();
    expect(screen.getByText('Anywhere Card')).toBeInTheDocument();
    expect(screen.getByText('Liquid Card')).toBeInTheDocument();
  });

  test('displays eligible cards for Trevor Rieck (only Anywhere Card)', () => {
    const trevor = testCustomers[2];
    const eligibleCards = getEligibleCards(trevor, creditCards);

    render(
      <CreditCardResults
        user={trevor}
        eligibleCards={eligibleCards}
        onStartOver={mockOnStartOver}
      />
    );

    expect(screen.getByText(/Trevor Rieck.*eligible for 1 credit card/)).toBeInTheDocument();
    expect(screen.getByText('Anywhere Card')).toBeInTheDocument();
    expect(screen.queryByText('Student Life')).not.toBeInTheDocument();
    expect(screen.queryByText('Liquid Card')).not.toBeInTheDocument();
  });

  test('allows selection of cards and shows total credit', () => {
    const elizabeth = testCustomers[1];
    const eligibleCards = getEligibleCards(elizabeth, creditCards);

    render(
      <CreditCardResults
        user={elizabeth}
        eligibleCards={eligibleCards}
        onStartOver={mockOnStartOver}
      />
    );

    // Initially no cards selected, no total shown
    expect(screen.queryByText(/Total Credit Available/)).not.toBeInTheDocument();

    // Select first card (Student Life)
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Total should now be shown
    expect(screen.getByText(/Total Credit Available/)).toBeInTheDocument();
    // Check that the selected summary appears
    expect(screen.getByText('Selected Cards Summary')).toBeInTheDocument();
  });

  test('select all button works correctly', () => {
    const elizabeth = testCustomers[1];
    const eligibleCards = getEligibleCards(elizabeth, creditCards);

    render(
      <CreditCardResults
        user={elizabeth}
        eligibleCards={eligibleCards}
        onStartOver={mockOnStartOver}
      />
    );

    const selectAllButton = screen.getByText('Select All');
    fireEvent.click(selectAllButton);

    // All cards should be selected, total should be £4,500
    expect(screen.getByText('Total Available Credit')).toBeInTheDocument();
    expect(screen.getByText('Deselect All')).toBeInTheDocument();

    // Click deselect all
    fireEvent.click(screen.getByText('Deselect All'));
    expect(screen.queryByText(/Total Credit Available/)).not.toBeInTheDocument();
  });

  test('start over button calls onStartOver', () => {
    const trevor = testCustomers[2];
    const eligibleCards = getEligibleCards(trevor, creditCards);

    render(
      <CreditCardResults
        user={trevor}
        eligibleCards={eligibleCards}
        onStartOver={mockOnStartOver}
      />
    );

    fireEvent.click(screen.getByText('Start Over'));
    expect(mockOnStartOver).toHaveBeenCalledTimes(1);
  });
});