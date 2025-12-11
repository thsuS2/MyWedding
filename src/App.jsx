import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import PetalAnimation from './components/PetalAnimation';
import IntroSection from './components/IntroSection';
import MainSection from './components/MainSection';
import GallerySection from './components/GallerySection';
import MapSection from './components/MapSection';
import MessageBoard from './components/MessageBoard';
import Footer from './components/Footer';
import RSVPModal from './components/RSVPModal';
import './styles/globals.css';

function App() {
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

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
    </div>
  );
}

export default App;
