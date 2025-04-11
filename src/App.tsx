import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { HelmetProvider } from 'react-helmet-async';
import './fonts/custom-fonts.css'; // Import custom fonts

// Import pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import TableListPage from './pages/TableListPage';
import TableDetailPage from './pages/TableDetailPage';
import InstantQuotePage from './pages/InstantQuotePage';
import QuoteSuccessPage from './pages/QuoteSuccessPage';
import GalleryPage from './pages/GalleryPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import ServicesPage from './pages/ServicesPage';
// Removed AddToHomeScreen import

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/instant-quote" element={<InstantQuotePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/quote-success" element={<QuoteSuccessPage />} />
          </Routes>
          {/* Removed AddToHomeScreen component */}
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;