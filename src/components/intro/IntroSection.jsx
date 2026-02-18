import { useState, useEffect, useRef } from 'react';
import './IntroSection.css';
import PetalAnimation from '../PetalAnimation';
import { PiSpeakerHigh, PiSpeakerSlash } from 'react-icons/pi';

const IntroSection = () => {
  const [showImage, setShowImage] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  return (
    <section id="intro" className="intro-section" ref={sectionRef}>
      <PetalAnimation />

      {/* 상단 고정 음소거 버튼 - 인트로가 보일 때만 */}
      {isIntroVisible && showImage && (
        <button
          type="button"
          className="intro-mute-btn"
          onClick={toggleMute}
          aria-label={isMuted ? '동영상 소리 켜기' : '동영상 음소거'}
        >
          {isMuted ? (
            <PiSpeakerSlash size={24} aria-hidden />
          ) : (
            <PiSpeakerHigh size={24} aria-hidden />
          )}
        </button>
      )}

      <div className="intro-content">

        {/* 배경 동영상 레이어 */}
        <div className={`intro-video-wrap`}>
          <video
            ref={videoRef}
            className="intro-video"
            src="/images/Wedding_video1.mp4"
            autoPlay
            loop
            playsInline
            muted
            aria-label="인트로 배경 영상"
          />
        </div>

        <div className={`intro-text ${showImage ? 'fade-in-with-image' : 'fade-in-text'}`}>
          <div className="intro-typo">
            <div className="intro-typo-line intro-typo-line-1">On a beautiful day</div>
            <div className="intro-typo-line intro-typo-line-2">We're getting married</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
