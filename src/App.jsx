import Navigation from './components/Navigation';
import PetalAnimation from './components/PetalAnimation';
import IntroSection from './components/IntroSection';
import MainSection from './components/MainSection';
import GallerySection from './components/GallerySection';
import MapSection from './components/MapSection';
import MessageBoard from './components/MessageBoard';
import Footer from './components/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="App">
      <PetalAnimation />
      <Navigation />
      <IntroSection />
      <MainSection />
      <GallerySection />
      <MapSection />
      <MessageBoard />
      <Footer />
    </div>
  );
}

export default App;
