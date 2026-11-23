import React from 'react';
import { Analytics } from '@vercel/analytics/react';
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
import { NotFoundPage } from './pages/notfound/NotFoundPage';
import { InsightsPage } from './pages/insights/InsightsPage';
import { InsightDetailPage } from './pages/insights/InsightDetailPage';
import { StackHubPage } from './pages/stack/StackHubPage';
import { StackDetailPage } from './pages/stack/StackDetailPage';
import { INSIGHTS_ARTICLES } from './data/insightsArticles';
import { STACK_PAGES } from './data/stackPages';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const basePaths = [
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
    '/insights',
    '/stack',
  ];

  const insightPaths = INSIGHTS_ARTICLES.map((a) => `/insights/${a.slug}`);
  const stackPaths = STACK_PAGES.map((s) => `/stack/${s.slug}`);

  const knownPaths = [...basePaths, ...insightPaths, ...stackPaths];

  const isHome = currentPath === '/';
  const isNotFound = !knownPaths.includes(currentPath);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FFC247] selection:text-[#1a1203] flex flex-col justify-between">
      <Header />
      <main className="flex-grow">
        {isHome && <HomePage />}
        {isNotFound && <NotFoundPage />}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/ai-automation" element={<AIAutomationPage />} />
        <Route path="/services/product-development" element={<ServicePage serviceId="product-development" />} />
        <Route path="/services/devops-cloud" element={<ServicePage serviceId="devops-cloud" />} />
        <Route path="/services/custom-software" element={<ServicePage serviceId="custom-software" />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/stack" element={<StackHubPage />} />

        {/* Dynamic Insight Article Routes */}
        {INSIGHTS_ARTICLES.map((article) => (
          <Route
            key={article.slug}
            path={`/insights/${article.slug}`}
            element={<InsightDetailPage slug={article.slug} />}
          />
        ))}

        {/* Dynamic Tech Stack Blueprint Routes */}
        {STACK_PAGES.map((stack) => (
          <Route
            key={stack.slug}
            path={`/stack/${stack.slug}`}
            element={<StackDetailPage slug={stack.slug} />}
          />
        ))}
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export function App({ initialPath }: { initialPath?: string } = {}) {
  return (
    <Router initialPath={initialPath}>
      <AppContent />
    </Router>
  );
}

export default App;
