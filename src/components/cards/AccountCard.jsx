import { useState } from 'react';
import { copyAccount } from '../../utils/clipboard';
import { Button } from '../buttons';
import { PiFlower } from 'react-icons/pi';
import './AccountCard.css';

/**
 * 계좌 정보 카드 컴포넌트
 * @param {Object} props
 * @param {string} props.name - 계좌 이름 (예: 신랑, 신부)
 * @param {string} props.bank - 은행명
 * @param {string} props.number - 계좌번호
 * @param {string} props.holder - 예금주
 */
const AccountCard = ({ name, bank, number, holder }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const account = { name, bank, number, holder };
    const success = await copyAccount(account);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="account-item">
      <div className="account-info">
        <div className="account-label">{name}</div>
        <div className="account-detail">
          {bank} {number}
        </div>
        <div className="account-holder">{holder}</div>
      </div>
      <Button 
        onClick={handleCopy}
        size="medium"
        className="account-copy-btn"
      >
        {copied ? (
          <>
            복사됨 <PiFlower size={16} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
          </>
        ) : (
          '복사하기'
        )}
      </Button>
    </div>
  );
};

export default AccountCard;

