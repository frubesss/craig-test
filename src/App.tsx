import React, { useState } from 'react';
import { UserDetails } from './types';
import { creditCards } from './data/creditCards';
import { testCustomers } from './data/testCustomers';
import { getEligibleCards } from './utils/cardUtils';
import UserForm from './components/UserForm';
import CreditCardResults from './components/CreditCardResults';
import './App.css';

function App() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [eligibleCards, setEligibleCards] = useState<typeof creditCards>([]);

  const handleUserSubmit = (userDetails: UserDetails) => {
    setUser(userDetails);
    const eligible = getEligibleCards(userDetails, creditCards);
    setEligibleCards(eligible);
  };

  const handleStartOver = () => {
    setUser(null);
    setEligibleCards([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit Cards Application</h1>
        <p>Find the perfect credit card for your financial needs</p>
      </header>

      <main className="App-main">
        {!user ? (
          <UserForm
            onSubmit={handleUserSubmit}
            testCustomers={testCustomers}
          />
        ) : (
          <CreditCardResults
            user={user}
            eligibleCards={eligibleCards}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Credit Cards Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
