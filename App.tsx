
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import AIChatPage from './pages/AIChatPage';
import MePage from './pages/MePage';
import BookingPage from './pages/BookingPage';
import ServicePage from './pages/ServicePage';
import GuidePage from './pages/GuidePage';
import TabBar from './components/TabBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Hide TabBar on Detail, AI Chat, Booking, Guide and Service pages for immersive experience
  const hideTabBar = location.pathname.includes('/detail') || 
                     location.pathname.includes('/ai-chat') || 
                     location.pathname.includes('/booking') ||
                     location.pathname.includes('/service') ||
                     location.pathname.includes('/guide');

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
      {children}
      {!hideTabBar && <TabBar />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/guide/:id" element={<GuidePage />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/service" element={<ServicePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
