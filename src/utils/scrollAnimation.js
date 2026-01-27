/**
 * 스크롤 애니메이션 유틸리티
 * Intersection Observer를 사용하여 요소가 뷰포트에 들어올 때 애니메이션 적용
 */

const observerOptions = {
  root: null,
  rootMargin: '-50px 0px', // 요소가 뷰포트에 50px 들어왔을 때 트리거 (더 일찍 시작)
  threshold: 0.05, // 요소의 5%가 보이면 트리거 (더 일찍 시작)
};

export const initScrollAnimation = () => {
  // 이미 초기화되었는지 확인
  if (window.scrollAnimationInitialized) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 한 번만 애니메이션을 실행하기 위해 옵저버 해제
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 모든 .fade-in 요소를 관찰
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  window.scrollAnimationInitialized = true;
};

// 페이지 로드 시 자동 초기화
if (typeof window !== 'undefined') {
  // DOM이 로드된 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimation);
  } else {
    initScrollAnimation();
  }

  // 동적으로 추가된 요소를 위해 MutationObserver 사용
  const mutationObserver = new MutationObserver(() => {
    if (!window.scrollAnimationInitialized) {
      initScrollAnimation();
    } else {
      // 이미 초기화된 경우 새로 추가된 요소만 관찰
      const newFadeElements = document.querySelectorAll('.fade-in:not(.observed)');
      newFadeElements.forEach((element) => {
        element.classList.add('observed');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        observer.observe(element);
      });
    }
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

