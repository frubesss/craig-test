import React from 'react';
import { CreditCardWithRules } from '../types';
import { formatCurrency, formatPercentage } from '../utils/cardUtils';
import './CreditCard.css';

interface CreditCardProps {
  card: CreditCardWithRules;
  isSelected: boolean;
  onToggleSelect: (cardId: string) => void;
}

const CreditCard: React.FC<CreditCardProps> = ({ 
  card, 
  isSelected, 
  onToggleSelect 
}) => {
  return (
    <div className={`credit-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <h3 className="card-name">{card.name}</h3>
        <label className="card-selector">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(card.id)}
          />
          <span className="checkmark"></span>
        </label>
      </div>

      <div className="card-details">
        <div className="detail-row">
          <span className="detail-label">APR:</span>
          <span className="detail-value">{formatPercentage(card.apr)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Balance Transfer Offer:</span>
          <span className="detail-value">
            {card.balanceTransferOfferDuration === 0 
              ? 'No offer' 
              : `${card.balanceTransferOfferDuration} months`}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Purchase Offer:</span>
          <span className="detail-value">
            {card.purchaseOfferDuration === 0 
              ? 'No offer' 
              : `${card.purchaseOfferDuration} months`}
          </span>
        </div>

        <div className="detail-row highlight">
          <span className="detail-label">Credit Available:</span>
          <span className="detail-value credit-amount">
            {formatCurrency(card.creditAvailable)}
          </span>
        </div>
      </div>

      <div className="card-description">
        <p>{card.description}</p>
      </div>
    </div>
  );
};

export default CreditCard;