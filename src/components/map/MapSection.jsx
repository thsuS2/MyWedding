import { useState, useEffect, useRef } from 'react';
import './MapSection.css';
import { VENUE } from '../../constants/wedding';
import { useToastContext } from '../../contexts/ToastContext';
import { SiKakao, SiNaver } from 'react-icons/si';
import { IoBusSharp, IoCarSharp, IoSubwaySharp } from 'react-icons/io5';
import mapImage from '../../assets/images/map.png';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const MapSection = ({ onOpenRSVP }) => {
  const { showError } = useToastContext();
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const openMap = (type) => {
    if (type === 'kakao') {
      window.open(`https://map.kakao.com/link/search/${encodeURIComponent(VENUE.name)}`, '_blank');
    } else if (type === 'naver') {
      window.open('https://naver.me/502MVbqj', '_blank');
    }
  };

  useEffect(() => {
    const initMap = () => {
      if (!mapContainer.current) return;

      // 카카오맵 API 키 (환경 변수)
      const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;

      // API 키가 없으면 지도를 로드하지 않음
      if (!KAKAO_MAP_API_KEY || KAKAO_MAP_API_KEY === 'YOUR_KAKAO_MAP_API_KEY') {
        console.warn('⚠️ 카카오맵 API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.');
        setMapLoaded(false);
        return;
      }

      // 카카오맵 스크립트가 로드되었는지 확인
      if (typeof window.kakao === 'undefined' || !window.kakao.maps) {
        // 스크립트 동적 로드
        const existingScript = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
        if (existingScript) {
          // 이미 스크립트가 있으면 로드 완료를 기다림
          const checkKakao = setInterval(() => {
            if (window.kakao && window.kakao.maps) {
              clearInterval(checkKakao);
              window.kakao.maps.load(() => {
                createMap();
              });
            }
          }, 100);
          return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
        script.async = true;
        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            window.kakao.maps.load(() => {
              createMap();
            });
          } else {
            console.error('카카오맵 SDK 로드 실패');
            setMapLoaded(false);
            showError('지도를 불러오는데 실패했습니다.');
          }
        };
        script.onerror = () => {
          console.error('카카오맵 스크립트 로드 실패 - API 키를 확인해주세요.');
          setMapLoaded(false);
          showError('지도를 불러오는데 실패했습니다. API 키를 확인해주세요.');
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

      // 컨테이너가 DOM에 마운트되었는지 확인
      if (!mapContainer.current.offsetParent && mapContainer.current.offsetWidth === 0) {
        // 아직 렌더링되지 않았으면 약간 지연 후 재시도
        setTimeout(() => {
          createMap();
        }, 100);
        return;
      }

      // 주소로 좌표 검색
      const geocoder = new window.kakao.maps.services.Geocoder();
      
      geocoder.addressSearch(VENUE.address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          try {
            // 지도 생성
            const options = {
              center: coords,
              level: 3, // 확대 레벨
            };

            mapInstance.current = new window.kakao.maps.Map(mapContainer.current, options);

            // 지도 생성 후 relayout 호출 (컨테이너 크기 변경 대응)
            setTimeout(() => {
              if (mapInstance.current) {
                mapInstance.current.relayout();
              }
            }, 100);

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
          } catch (error) {
            console.error('카카오맵 생성 실패:', error);
            setMapLoaded(false);
            showError('지도를 생성하는데 실패했습니다.');
          }
        } else {
          // 주소 검색 실패 시 기본 위치 (서울시청)
          try {
            const defaultCoords = new window.kakao.maps.LatLng(37.5665, 126.9780);
            mapInstance.current = new window.kakao.maps.Map(mapContainer.current, {
              center: defaultCoords,
              level: 3,
            });

            // 지도 생성 후 relayout 호출
            setTimeout(() => {
              if (mapInstance.current) {
                mapInstance.current.relayout();
              }
            }, 100);

            setMapLoaded(true);
            console.warn('주소 검색 실패, 기본 위치로 표시');
            showError('주소를 찾을 수 없어 기본 위치로 표시합니다.');
          } catch (error) {
            console.error('카카오맵 생성 실패:', error);
            setMapLoaded(false);
            showError('지도를 생성하는데 실패했습니다.');
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
      <div className="container fade-in">
        <SectionTitle en="LOCATION" kr="오시는 길" />
        
        {/* 위치 정보 */}
        <div className="venue-location-info">
          <h3 className="venue-name text-heading-small">{VENUE.name} {VENUE.hall}</h3>
          <div className="venue-address text-body-gray">{VENUE.address} {VENUE.floor}</div>
        </div>
        
        {/* 카카오맵 또는 임시 지도 이미지 */}
        <div className="map-container" onClick={() => !mapLoaded && openMap('naver')}>
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
                <div className="map-placeholder-text text-body text-white">지도를 보려면 클릭하세요</div>
              </div>
            </div>
          )}
        </div>
        
        {/* 지도 버튼 */}
        <div className="map-buttons fade-in">
          <Button
            variant="primary"
            size="default"
            onClick={() => openMap('kakao')}
            icon={<SiKakao size={20} />}
          >
            카카오맵
          </Button>
          <Button
            variant="secondary"
            size="default"
            onClick={() => openMap('naver')}
            icon={<SiNaver size={15} />}
          >
            네이버지도
          </Button>
        </div>

        {/* 교통수단 정보 */}
        <div className="transportation-section fade-in">
          <div className="transport-item">
            <div className="transport-label text-heading-small">지하철</div>
            <div className="transport-detail text-body-gray">
              <IoSubwaySharp 
                size={16} 
                style={{ 
                  verticalAlign: 'middle', 
                  marginRight: '0.5rem',
                  color: 'var(--text-lightest)'
                }} 
              />
              {VENUE.transportation.subway}
            </div>
          </div>
          <div className="transport-divider"></div>
          <div className="transport-item">
            <div className="transport-label text-heading-small">버스</div>
            <div className="transport-detail text-body-gray">
              {VENUE.transportation.bus.split('|').map((part, index) => {
                const trimmedPart = part.trim();
                if (!trimmedPart) return null;
                
                return (
                  <span key={index} style={{ display: 'block', marginBottom: index === 0 ? '0.5rem' : '0.25rem' }}>
                    {index > 0 && (
                      <>
                        <IoBusSharp 
                          size={16} 
                          style={{ 
                            verticalAlign: 'middle', 
                            marginRight: '0.5rem',
                            color: 'var(--text-lightest)'
                          }} 
                        />
                      </>
                    )}
                    {trimmedPart}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="transport-divider"></div>
          <div className="transport-item">
            <div className="transport-label text-heading-small">자가용</div>
            <div className="transport-detail text-body-gray">
              <IoCarSharp 
                size={16} 
                style={{ 
                  verticalAlign: 'middle', 
                  marginRight: '0.5rem',
                  color: 'var(--text-lightest)'
                }} 
              />
              {VENUE.transportation.car}
            </div>
          </div>
        </div>

        
        {/* 참석의사 전달하기 버튼 */}
        <div className="rsvp-button-section">
          <Button
            variant="primary"
            size="large"
            onClick={onOpenRSVP}
          >
            참석의사 전달하기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

