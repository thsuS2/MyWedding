import { useState, useEffect, useRef } from 'react';
import './MapSection.css';
import { VENUE, ACCOUNTS } from '../../constants/wedding';
import { copyAccount } from '../../utils/clipboard';
import { PiMapPinFill, PiGiftFill, PiFlower } from 'react-icons/pi';
import { SiKakao, SiNaver } from 'react-icons/si';
import mapImage from '../../assets/images/map.png';

const MapSection = ({ onOpenRSVP }) => {
  const [copiedAccount, setCopiedAccount] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

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

  useEffect(() => {
    const initMap = () => {
      if (!mapContainer.current) return;

      // 카카오맵 API 키 (환경 변수 또는 직접 입력)
      const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY || 'YOUR_KAKAO_MAP_API_KEY';

      // 카카오맵 스크립트가 로드되었는지 확인
      if (typeof window.kakao === 'undefined' || !window.kakao.maps) {
        // 스크립트 동적 로드
        console.log('카카오맵 스크립트 직접 로드');
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
        script.async = true;
        script.onload = () => {
          window.kakao.maps.load(() => {
            createMap();
          });
        };
        script.onerror = () => {
          console.error('카카오맵 스크립트 로드 실패');
          setMapLoaded(false);
        };
        document.head.appendChild(script);
        return;
      }

      // 이미 로드된 경우
      if (window.kakao.maps.load) {
        window.kakao.maps.load(() => {
          createMap();
        });
      } else {
        createMap();
      }
    };

    const createMap = () => {
      if (!mapContainer.current || mapInstance.current) return;

      // 주소로 좌표 검색
      const geocoder = new window.kakao.maps.services.Geocoder();
      
      geocoder.addressSearch(VENUE.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 지도 생성
          const options = {
            center: coords,
            level: 3, // 확대 레벨
          };

          mapInstance.current = new window.kakao.maps.Map(mapContainer.current, options);

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: coords,
            map: mapInstance.current,
          });

          // 인포윈도우 생성
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:10px;font-size:12px;text-align:center;">${VENUE.name}<br/>${VENUE.hall}</div>`,
          });
          infowindow.open(mapInstance.current, marker);
          setMapLoaded(true);
        } else {
          // 주소 검색 실패 시 기본 위치 (서울시청)
          try {
            const defaultCoords = new window.kakao.maps.LatLng(37.5665, 126.9780);
            mapInstance.current = new window.kakao.maps.Map(mapContainer.current, {
              center: defaultCoords,
              level: 3,
            });
            setMapLoaded(true);
            console.warn('주소 검색 실패, 기본 위치로 표시');
          } catch (error) {
            console.error('카카오맵 생성 실패:', error);
            setMapLoaded(false);
          }
        }
      });
    };

    // 지도 초기화
    initMap();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="map-section">
      <div className="container">
        <h2 className="map-title fade-in">
          <PiMapPinFill size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          오시는 길
        </h2>
        
        {/* 카카오맵 또는 임시 지도 이미지 */}
        <div className="map-container fade-in" onClick={() => !mapLoaded && openMap('naver')}>
          {mapLoaded ? (
            <div ref={mapContainer} className="kakao-map"></div>
          ) : (
            <div className="map-placeholder">
              <img 
                src={mapImage} 
                alt="지도" 
                className="map-fallback-image"
              />
              <div className="map-placeholder-overlay">
                <p className="map-placeholder-text">지도를 보려면 클릭하세요</p>
              </div>
            </div>
          )}
        </div>
        
        {/* 지도 버튼 */}
        <div className="map-buttons fade-in">
          <button onClick={() => openMap('kakao')} className="btn-primary" style={{ backgroundColor: '#3A1D1D' }}>
            <SiKakao size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            카카오맵
          </button>
          <button onClick={() => openMap('naver')} className="btn-secondary">
            <SiNaver size={15} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            네이버지도
          </button>
        </div>
        
        {/* 주소 정보 */}
        <div className="address-info fade-in">
          <h3>{VENUE.name}</h3>
          <p>{VENUE.address}</p>
          <p>{VENUE.addressDetail}</p>
          <p className="address-detail">
            <strong>지하철:</strong> {VENUE.transportation.subway}<br/>
            <strong>버스:</strong> {VENUE.transportation.bus}<br/>
            <strong>주차:</strong> {VENUE.transportation.parking}
          </p>
        </div>
        
        {/* 계좌번호 */}
        <div className="account-section fade-in">
          <h3>
            <PiGiftFill size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            마음 전하실 곳
          </h3>
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

        {/* 참석의사 전달하기 버튼 */}
        <div className="rsvp-button-section fade-in">
          <button onClick={onOpenRSVP} className="btn-rsvp">
            <PiFlower size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            참석의사 전달하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

