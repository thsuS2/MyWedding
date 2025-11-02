import { useState } from 'react';
import './GallerySection.css';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // 임시 플레이스홀더 이미지 배열 (9개)
  const images = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `사진 ${i + 1}`,
    // 실제 이미지 URL로 교체 예정
    url: `https://via.placeholder.com/600x800/FADADD/FFFFFF?text=Photo+${i + 1}`
  }));

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
        <h2 className="gallery-title fade-in">💐 Gallery</h2>
        <p className="gallery-subtitle fade-in">우리의 소중한 순간들</p>
        
        <div className="gallery-grid fade-in">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openModal(index)}
            >
              <div className="gallery-placeholder">
                <span>{image.title}</span>
              </div>
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
              <div className="modal-placeholder">
                <span>{images[selectedImage].title}</span>
              </div>
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

