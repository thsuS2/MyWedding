import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import PetalAnimation from './components/PetalAnimation';
import IntroSection from './components/intro/IntroSection';
import MainSection from './components/main/MainSection';
import GallerySection from './components/gallary/GallerySection';
import MapSection from './components/map/MapSection';
import MessageBoard from './components/message/MessageBoard';
import Footer from './components/Footer';
import RSVPModal from './components/RSVPModal';
import Toast from './components/Toast';
import { ToastProvider, useToastContext } from './contexts/ToastContext';
import './styles/globals.css';

function AppContent() {
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);
  const { toasts, removeToast } = useToastContext();

  useEffect(() => {
    // 오늘 하루 보지 않기 체크
    const dontShowDate = localStorage.getItem('rsvp_dont_show');
    const today = new Date().toDateString();
    
    if (dontShowDate !== today) {
      // 페이지 로드 후 약간의 딜레이를 두고 모달 표시
      const timer = setTimeout(() => {
        setShowRSVPModal(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseRSVP = () => {
    setShowRSVPModal(false);
  };

  const handleShowToday = () => {
    setDontShowToday(true);
  };

  const handleOpenRSVP = () => {
    setShowRSVPModal(true);
  };

  return (
    <div className="App">
      <PetalAnimation />
      <Navigation />
      <IntroSection />
      <MainSection />
      <GallerySection />
      <MapSection onOpenRSVP={handleOpenRSVP} />
      <MessageBoard />
      <Footer />
      <RSVPModal 
        isOpen={showRSVPModal} 
        onClose={handleCloseRSVP}
        onShowToday={handleShowToday}
      />
      
      {/* Toast 메시지 */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
