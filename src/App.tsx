import React from 'react';
import { Router, Route, useRouter } from './router/Router';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { HomePage } from './pages/home/HomePage';
import { AIAutomationPage } from './pages/services/AIAutomationPage';
import { ServicePage } from './pages/services/ServicePage';
import { SolutionsPage } from './pages/solutions/SolutionsPage';
import { CaseStudiesPage } from './pages/casestudies/CaseStudiesPage';
import { AboutPage } from './pages/about/AboutPage';
import { PricingPage } from './pages/pricing/PricingPage';
import { ContactPage } from './pages/contact/ContactPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const knownPaths = [
    '/',
    '/contact',
    '/services/ai-automation',
    '/services/product-development',
    '/services/devops-cloud',
    '/services/custom-software',
    '/solutions',
    '/case-studies',
    '/about',
    '/pricing',
  ];

  const isHome = currentPath === '/' || !knownPaths.includes(currentPath);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FFC247] selection:text-[#1a1203] flex flex-col justify-between">
      <Header />
      <main className="flex-grow">
        {isHome && <HomePage />}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/ai-automation" element={<AIAutomationPage />} />
        <Route path="/services/product-development" element={<ServicePage serviceId="product-development" />} />
        <Route path="/services/devops-cloud" element={<ServicePage serviceId="devops-cloud" />} />
        <Route path="/services/custom-software" element={<ServicePage serviceId="custom-software" />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
