import { useState } from 'react';
import './AccountSection.css';
import { ACCOUNTS } from '../../constants/wedding';
import { copyAccount } from '../../utils/clipboard';
import { useToastContext } from '../../contexts/ToastContext';
import { PiGiftFill, PiFlower } from 'react-icons/pi';

const AccountSection = () => {
  const { showError } = useToastContext();
  const [copiedAccount, setCopiedAccount] = useState('');

  const handleCopyAccount = async (account) => {
    const success = await copyAccount(account);
    if (success) {
      setCopiedAccount(account.name);
      setTimeout(() => setCopiedAccount(''), 2000);
    } else {
      showError('계좌번호 복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section id="account" className="account-section">
      <div className="container">
        <h2 className="account-title text-heading-large fade-in">
          <PiGiftFill size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          마음 전하실 곳
        </h2>
        
        <div className="account-list fade-in">
          {ACCOUNTS.map((account) => (
            <div key={account.name} className="account-item">
              <div className="account-info">
                <p className="account-label text-heading-small">{account.name}</p>
                <p className="account-detail text-body-gray">
                  {account.bank} {account.number}
                </p>
                <p className="account-holder text-caption">{account.holder}</p>
              </div>
              <button 
                onClick={() => handleCopyAccount(account)}
                className="btn-copy"
              >
                {copiedAccount === account.name ? (
                  <>
                    복사됨 <PiFlower size={16} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                  </>
                ) : '복사하기'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountSection;

