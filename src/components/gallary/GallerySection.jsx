import { useState } from 'react';
import './GallerySection.css';
import { PiArrowDown, PiArrowUp } from 'react-icons/pi';
import LazyImage from './components/LazyImage';
import bouquetImage from '../../assets/images/flower-rose.png';
import { GALLERY_IMAGES, getImageUrl } from '../../constants/gallery';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 갤러리 이미지 배열 (동적으로 생성)
  const images = GALLERY_IMAGES.map((filename, index) => ({
    id: index + 1,
    title: `사진 ${index + 1}`,
    url: getImageUrl(filename),
    filename: filename,
  }));

  // 큰 슬라이드용 이미지
  const mainImage = images[currentSlideIndex] || images[0];
  const prevImage = images[prevSlideIndex] || images[0];
  
  // 작은 그리드용 이미지 (나머지 이미지들, 5개씩 표시)
  const gridImages = images;

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

  const navigateSlide = (direction) => {
    if (isTransitioning) return; // 애니메이션 중에는 무시
    
    let newIndex = currentSlideIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    setPrevSlideIndex(currentSlideIndex);
    setIsTransitioning(true);
    setCurrentSlideIndex(newIndex);
    
    // 2초 후 애니메이션 완료
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  const handleGridImageClick = (index) => {
    if (isTransitioning || index === currentSlideIndex) return; // 애니메이션 중이거나 같은 이미지면 무시
    
    setPrevSlideIndex(currentSlideIndex);
    setIsTransitioning(true);
    setCurrentSlideIndex(index);
    
    // 2초 후 애니메이션 완료
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
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
        <h2 className="gallery-title text-heading-large fade-in">
          Gallery
        </h2>
        <div className="gallery-subtitle text-body-gray fade-in">우리의 소중한 순간들</div>
        
        {/* 큰 슬라이드 */}
        <div className="gallery-slide fade-in">
          <button 
            className="slide-nav slide-prev"
            onClick={() => navigateSlide(-1)}
            aria-label="이전 이미지"
            disabled={isTransitioning}
          >
            ‹
          </button>
          <div 
            className="gallery-main-image"
            onClick={() => openModal(currentSlideIndex)}
          >
            {/* 이전 이미지 (슬라이드 아웃) */}
            {isTransitioning && prevSlideIndex !== currentSlideIndex && (
              <img 
                src={prevImage.url} 
                alt={prevImage.title}
                className="gallery-slide-image slide-out"
              />
            )}
            {/* 현재 이미지 (슬라이드 인) */}
            <LazyImage 
              src={mainImage.url} 
              alt={mainImage.title}
              className={`gallery-slide-image ${isTransitioning ? 'slide-in' : ''}`}
              placeholder={
                <div className="gallery-image-placeholder">
                  <span>로딩 중...</span>
                </div>
              }
            />
          </div>
          <button 
            className="slide-nav slide-next"
            onClick={() => navigateSlide(1)}
            aria-label="다음 이미지"
            disabled={isTransitioning}
          >
            ›
          </button>
          <div className="slide-counter text-caption">
            {currentSlideIndex + 1} / {images.length}
          </div>
        </div>

        {/* 작은 그리드 (5개씩) */}
        <div className="gallery-grid fade-in">
          {gridImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`gallery-item ${index === currentSlideIndex ? 'active' : ''}`}
              onClick={() => handleGridImageClick(index)}
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
          ))}
        </div>
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
            <div className="modal-counter text-body text-white">
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

