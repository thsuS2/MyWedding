import { useState, useEffect, useRef } from 'react';
import './IntroSection.css';
import PetalAnimation from '../PetalAnimation';

const IntroSection = () => {
  const [showImage, setShowImage] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  // autoplay(소리 포함)는 브라우저 정책으로 차단될 수 있음
  // 1) 소리 ON으로 재생 시도 → 실패하면 muted로 전환 후 재생
  useEffect(() => {
    if (!showImage) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const startPlayback = async () => {
      try {
        video.muted = isMuted;
        await video.play();
      } catch (err) {
        if (cancelled) return;
        // 소리 ON autoplay가 막히면 muted로 재시도
        if (!isMuted) {
          setIsMuted(true);
          try {
            video.muted = true;
            await video.play();
          } catch {
            // ignore
          }
        }
      }
    };

    startPlayback();

    return () => {
      cancelled = true;
    };
  }, [showImage]); // intentionally not depending on isMuted

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      const video = videoRef.current;
      if (video) {
        video.muted = next;
        // 사용자 클릭(gesture)에서 소리 ON 재생은 대부분 허용됨
        if (!next) {
          video.play().catch(() => {});
        }
      }
      return next;
    });
  };

  return (
    <section id="intro" className="intro-section" ref={sectionRef}>
      <PetalAnimation />

      {/* 상단 고정 음소거 버튼 - 항상 표시 */}
      {showImage && (
        <button
          type="button"
          className={`intro-sound-btn ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
          aria-label={isMuted ? '동영상 소리 켜기' : '동영상 음소거'}
        >
          <div className="sound-bars" aria-hidden>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      )}

      <div className="intro-content">

        {/* 배경 동영상 레이어 */}
        <div className="intro-video-wrap">
          <video
            ref={videoRef}
            className="intro-video"
            src="/images/Wedding_video1.mp4"
            autoPlay
            loop
            playsInline
            aria-label="인트로 배경 영상"
          />
          <div className="intro-video-gradient" aria-hidden />
        </div>

        <div className={`intro-text ${showImage ? 'fade-in-with-image' : 'fade-in-text'}`}>
          <div className="intro-typo">
            <div className="intro-typo-line intro-typo-line-1">On a beautiful day,</div>
            <div className="intro-typo-line intro-typo-line-2">We're getting married</div>
            <div className="intro-typo-line intro-typo-line-3">May 30, 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
