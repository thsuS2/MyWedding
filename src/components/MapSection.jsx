import { useState } from 'react';
import './MapSection.css';
import { VENUE, ACCOUNTS } from '../constants/wedding';
import { copyAccount } from '../utils/clipboard';

const MapSection = ({ onOpenRSVP }) => {
  const [copiedAccount, setCopiedAccount] = useState('');

  const handleCopyAccount = async (account) => {
    const success = await copyAccount(account);
    if (success) {
      setCopiedAccount(account.name);
      setTimeout(() => setCopiedAccount(''), 2000);
    } else {
      alert('계좌번호 복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const openMap = (type) => {
    if (type === 'kakao') {
      window.open(`https://map.kakao.com/link/search/${encodeURIComponent(VENUE.name)}`, '_blank');
    } else if (type === 'naver') {
      window.open(`https://map.naver.com/v5/search/${encodeURIComponent(VENUE.address)}`, '_blank');
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
          <h3>{VENUE.name} {VENUE.floor} {VENUE.hall}</h3>
          <p>{VENUE.address}</p>
          <p className="address-detail">
            <strong>지하철:</strong> {VENUE.transportation.subway}<br/>
            <strong>버스:</strong> {VENUE.transportation.bus}<br/>
            <strong>주차:</strong> {VENUE.transportation.parking}
          </p>
        </div>
        
        {/* 계좌번호 */}
        <div className="account-section fade-in">
          <h3>💝 마음 전하실 곳</h3>
          <div className="account-list">
            {ACCOUNTS.map((account) => (
              <div key={account.name} className="account-item">
                <div className="account-info">
                  <p className="account-label">{account.name}</p>
                  <p className="account-detail">
                    {account.bank} {account.number}
                  </p>
                  <p className="account-holder">{account.holder}</p>
                </div>
                <button 
                  onClick={() => handleCopyAccount(account)}
                  className="btn-copy"
                >
                  {copiedAccount === account.name ? '복사됨 💐' : '복사하기'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 참석의사 전달하기 버튼 */}
        <div className="rsvp-button-section fade-in">
          <button onClick={onOpenRSVP} className="btn-rsvp">
            💐 참석의사 전달하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

