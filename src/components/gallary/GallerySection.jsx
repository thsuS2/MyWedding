import { useState } from 'react';
import './GallerySection.css';
import { PiFlower, PiArrowDown, PiArrowUp } from 'react-icons/pi';
import LazyImage from './components/LazyImage';
import bouquetImage from '../../assets/images/flower-rose.png';
import { GALLERY_IMAGES, getImageUrl } from '../../constants/gallery';

const INITIAL_DISPLAY_COUNT = 9; // 최초 표시할 이미지 개수

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  
  // 갤러리 이미지 배열 (동적으로 생성)
  const images = GALLERY_IMAGES.map((filename, index) => ({
    id: index + 1,
    title: `사진 ${index + 1}`,
    url: getImageUrl(filename),
    filename: filename,
  }));

  // 표시할 이미지 목록
  const displayedImages = showAll 
    ? images 
    : images.slice(0, INITIAL_DISPLAY_COUNT);
  
  // 더보기 버튼 표시 여부 (이미지가 9개보다 많을 때만)
  const hasMoreImages = images.length > INITIAL_DISPLAY_COUNT;

  const openModal = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (selectedImage === null) return;
    
    let newIndex = selectedImage + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    setSelectedImage(newIndex);
  };

  const handleKeyDown = (e) => {
    if (selectedImage === null) return;
    
    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'ArrowRight') navigateImage(1);
    if (e.key === 'Escape') closeModal();
  };

  return (
    <section id="gallery" className="gallery-section" onKeyDown={handleKeyDown}>
      <div className="container">
        <div  className="gallery-title fade-in">
          <img 
              src={bouquetImage} 
              alt="부케 장식" 
              className="bouquet-decoration bouquet-left"
            />
            <img 
              src={bouquetImage} 
              alt="부케 장식" 
              className="bouquet-decoration bouquet-right"
            />
          Gallery
        </div>
        <p className="gallery-subtitle fade-in">우리의 소중한 순간들</p>
        
        <div className="gallery-grid fade-in">
          {displayedImages.map((image, index) => {
            // 전체 images 배열에서의 실제 인덱스 찾기
            const actualIndex = images.findIndex(img => img.id === image.id);
            return (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openModal(actualIndex)}
              >
                <LazyImage 
                  src={image.url} 
                  alt={image.title}
                  className="gallery-image"
                  placeholder={
                    <div className="gallery-image-placeholder">
                      <span>로딩 중...</span>
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>

        {/* 더보기/접기 버튼 */}
        {hasMoreImages && (
          <div className="gallery-toggle-wrapper fade-in">
            <button 
              className="gallery-toggle-btn"
              onClick={() => setShowAll(!showAll)}
              aria-label={showAll ? '접기' : '더보기'}
            >
              {showAll ? (
                <>
                  <PiArrowUp size={20} />
                  <span>접기</span>
                </>
              ) : (
                <>
                  <span>더보기</span>
                  <PiArrowDown size={20} />
                </>
              )}
            </button>
            <p className="gallery-count-text">
              {showAll 
                ? `전체 ${images.length}장` 
                : `${INITIAL_DISPLAY_COUNT}장 / 전체 ${images.length}장`}
            </p>
          </div>
        )}
      </div>

      {/* 전체화면 모달 */}
      {selectedImage !== null && (
        <div className="gallery-modal" onClick={closeModal}>
          <button 
            className="modal-close"
            onClick={closeModal}
            aria-label="닫기"
          >
            ✕
          </button>
          
          <button 
            className="modal-nav modal-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            aria-label="이전 이미지"
          >
            ‹
          </button>
          
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-image-wrapper">
              <img 
                src={images[selectedImage].url} 
                alt={images[selectedImage].title}
                className="modal-image"
              />
            </div>
            <div className="modal-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
          
          <button 
            className="modal-nav modal-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            aria-label="다음 이미지"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;

