import { useState } from 'react';
import './MapSection.css';

const MapSection = () => {
  const [copiedAccount, setCopiedAccount] = useState('');

  // 계좌 정보
  const accounts = [
    { name: '신랑', bank: '○○은행', number: '1234-5678-9012', holder: '박유신' },
    { name: '신부', bank: '○○은행', number: '9876-5432-1098', holder: '김지수' }
  ];

  const copyToClipboard = (account) => {
    const textToCopy = `${account.bank} ${account.number} ${account.holder}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedAccount(account.name);
        setTimeout(() => setCopiedAccount(''), 2000);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedAccount(account.name);
        setTimeout(() => setCopiedAccount(''), 2000);
      } catch (err) {
        console.error('복사 실패:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const openMap = (type) => {
    const address = '서울시 ○○구 ○○동 123-45'; // 실제 주소로 교체 필요
    const placeName = '○○웨딩홀';
    
    if (type === 'kakao') {
      window.open(`https://map.kakao.com/link/search/${encodeURIComponent(placeName)}`, '_blank');
    } else if (type === 'naver') {
      window.open(`https://map.naver.com/v5/search/${encodeURIComponent(address)}`, '_blank');
    }
  };

  return (
    <section id="map" className="map-section">
      <div className="container">
        <h2 className="map-title fade-in">🗺️ 오시는 길</h2>
        
        {/* 약도 플레이스홀더 */}
        <div className="map-placeholder fade-in">
          <span>지도 위치</span>
        </div>
        
        {/* 지도 버튼 */}
        <div className="map-buttons fade-in">
          <button onClick={() => openMap('kakao')} className="btn-primary">
            카카오맵
          </button>
          <button onClick={() => openMap('naver')} className="btn-secondary">
            네이버지도
          </button>
        </div>
        
        {/* 주소 정보 */}
        <div className="address-info fade-in">
          <h3>○○웨딩홀 ○층 ○○홀</h3>
          <p>서울시 ○○구 ○○동 123-45</p>
          <p className="address-detail">
            <strong>지하철:</strong> ○○역 3번 출구 도보 5분<br/>
            <strong>버스:</strong> ○○번, ○○번<br/>
            <strong>주차:</strong> 3시간 무료 (건물 내 주차장 이용)
          </p>
        </div>
        
        {/* 계좌번호 */}
        <div className="account-section fade-in">
          <h3>💝 마음 전하실 곳</h3>
          <div className="account-list">
            {accounts.map((account) => (
              <div key={account.name} className="account-item">
                <div className="account-info">
                  <p className="account-label">{account.name}</p>
                  <p className="account-detail">
                    {account.bank} {account.number}
                  </p>
                  <p className="account-holder">{account.holder}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(account)}
                  className="btn-copy"
                >
                  {copiedAccount === account.name ? '복사됨 💐' : '복사하기'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

