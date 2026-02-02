import { useState } from 'react';
import './AccountSection.css';
import { ACCOUNTS, COUPLE } from '../../constants/wedding';
import { copyAccount } from '../../utils/clipboard';
import { useToastContext } from '../../contexts/ToastContext';

const AccountSection = () => {
  const { showError } = useToastContext();
  const [copiedAccount, setCopiedAccount] = useState('');
  const [activeSide, setActiveSide] = useState('신랑측'); // '신랑측' 또는 '신부측'

  const handleCopyAccount = async (account) => {
    const success = await copyAccount(account);
    if (success) {
      setCopiedAccount(account.name);
      setTimeout(() => setCopiedAccount(''), 2000);
    } else {
      showError('계좌번호 복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 신랑측/신부측 계좌 필터링
  const filteredAccounts = ACCOUNTS.filter(account => {
    if (activeSide === '신랑측') {
      return account.name.includes('신랑');
    } else {
      return account.name.includes('신부');
    }
  });

  return (
    <section id="account" className="account-section">
      <div className="container">
        <h2 className="account-title text-heading-large fade-in">
          마음 전하실 곳
        </h2>
        
        {/* 통합 카드 */}
        <div className="account-card fade-in">
          {/* 토글 버튼 */}
          <div
            className={`account-toggle ${activeSide === '신랑측' ? 'is-groom' : 'is-bride'}`}
            role="tablist"
            aria-label="계좌 구분"
          >
            <button
              className={`toggle-btn ${activeSide === '신랑측' ? 'active' : ''}`}
              onClick={() => setActiveSide('신랑측')}
              type="button"
              role="tab"
              aria-selected={activeSide === '신랑측'}
            >
              신랑측
            </button>
            <button
              className={`toggle-btn ${activeSide === '신부측' ? 'active' : ''}`}
              onClick={() => setActiveSide('신부측')}
              type="button"
              role="tab"
              aria-selected={activeSide === '신부측'}
            >
              신부측
            </button>
          </div>
          
          {/* 계좌 리스트 */}
          <div className="account-list">
            {filteredAccounts.map((account) => (
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
                  className={`btn-copy ${copiedAccount === account.name ? 'copied' : ''}`}
                >
                  {copiedAccount === account.name ? '복사됨' : '복사하기'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSection;

