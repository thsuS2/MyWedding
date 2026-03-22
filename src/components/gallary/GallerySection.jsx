import { useState, useRef } from 'react';
import './GallerySection.css';
import { PiArrowDown, PiArrowUp, PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import LazyImage from './components/LazyImage';
import bouquetImage from '../../assets/images/flower-rose.png';
import { GALLERY_IMAGES, getImageUrl } from '../../constants/gallery';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // 모달 애니메이션을 위한 state
  const [prevModalImage, setPrevModalImage] = useState(null);
  const [isModalTransitioning, setIsModalTransitioning] = useState(false);
  const [modalDirection, setModalDirection] = useState(1); // 1: 오른쪽, -1: 왼쪽
  
  // 스와이프 제스처를 위한 ref
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const modalTouchStartX = useRef(0);
  const modalTouchEndX = useRef(0);
  
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
    setPrevModalImage(null);
    setIsModalTransitioning(false);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (selectedImage === null || isModalTransitioning) return;
    
    let newIndex = selectedImage + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    // 애니메이션을 위해 이전 이미지 저장 및 방향 설정
    setPrevModalImage(selectedImage);
    setModalDirection(direction);
    setIsModalTransitioning(true);
    setSelectedImage(newIndex);
    
    // 애니메이션 완료 후 정리
    setTimeout(() => {
      setIsModalTransitioning(false);
      setPrevModalImage(null);
    }, 600);
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
    // 하단 미리보기 클릭 시 모달 바로 열기
    openModal(index);
  };

  // 큰 슬라이드 스와이프 제스처 처리
  const handleSlideTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSlideTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSlideSwipe();
  };

  const handleSlideSwipe = () => {
    if (isTransitioning) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // 최소 스와이프 거리
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 (다음 이미지)
        navigateSlide(1);
      } else {
        // 오른쪽으로 스와이프 (이전 이미지)
        navigateSlide(-1);
      }
    }
  };

  // 모달 스와이프 제스처 처리
  const handleModalTouchStart = (e) => {
    modalTouchStartX.current = e.touches[0].clientX;
  };

  const handleModalTouchEnd = (e) => {
    modalTouchEndX.current = e.changedTouches[0].clientX;
    handleModalSwipe();
  };

  const handleModalSwipe = () => {
    if (selectedImage === null) return;
    
    const diff = modalTouchStartX.current - modalTouchEndX.current;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 (다음 이미지)
        navigateImage(1);
      } else {
        // 오른쪽으로 스와이프 (이전 이미지)
        navigateImage(-1);
      }
    }
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
        <SectionTitle en="GALLERY" kr="웨딩 갤러리" />
        
        {/* 큰 슬라이드 */}
        <div className="gallery-slide fade-in">
          <div 
            className="gallery-main-image"
            onClick={() => openModal(currentSlideIndex)}
            onTouchStart={handleSlideTouchStart}
            onTouchEnd={handleSlideTouchEnd}
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
                    <span>💍</span>
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
          <Button
            variant="close"
            onClick={closeModal}
            aria-label="닫기"
            className="gallery-modal-close"
          >
            ✕
          </Button>

          <button
            type="button"
            className="gallery-modal-nav-desktop modal-nav modal-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            disabled={isModalTransitioning}
            aria-label="이전 사진"
          >
            <PiCaretLeft aria-hidden />
          </button>
          <button
            type="button"
            className="gallery-modal-nav-desktop modal-nav modal-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            disabled={isModalTransitioning}
            aria-label="다음 사진"
          >
            <PiCaretRight aria-hidden />
          </button>
          
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleModalTouchStart}
            onTouchEnd={handleModalTouchEnd}
          >
            <div className="modal-image-wrapper">
              {/* 이전 이미지 (슬라이드 아웃) */}
              {isModalTransitioning && prevModalImage !== null && prevModalImage !== selectedImage && (
                <img 
                  src={images[prevModalImage].url} 
                  alt={images[prevModalImage].title}
                  className={`modal-image modal-image-out ${modalDirection > 0 ? 'slide-out-left' : 'slide-out-right'}`}
                />
              )}
              {/* 현재 이미지 (슬라이드 인) */}
              <img 
                src={images[selectedImage].url} 
                alt={images[selectedImage].title}
                className={`modal-image ${isModalTransitioning ? (modalDirection > 0 ? 'modal-image-in-right' : 'modal-image-in-left') : ''}`}
              />
            </div>
            <div className="modal-counter text-body text-white">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;

