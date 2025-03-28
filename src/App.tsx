import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tables" element={<TableListPage />} />
          <Route path="/tables/:id" element={<TableDetailPage />} />
          <Route path="/instant-quote" element={<InstantQuotePage />} />
          <Route path="/quote-success" element={<QuoteSuccessPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;