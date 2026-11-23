import React, { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '../../router/Router';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentPath } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [currentPath]);

  const servicesList = [
    {
      title: 'AI Automation',
      desc: 'Autonomous agent swarms, enterprise RAG & workflow automation',
      path: '/services/ai-automation',
      color: '#F7C059',
      borderColor: 'rgba(247, 192, 89, 0.3)',
      badge: 'Active Hub',
    },
    {
      title: 'Product Development',
      desc: 'Full-cycle MVP to scale, product architecture & modern UX',
      path: '/services/product-development',
      color: '#76E3DC',
      borderColor: 'rgba(118, 227, 220, 0.3)',
      badge: 'Engineering',
    },
    {
      title: 'DevOps & Cloud',
      desc: 'Kubernetes, multi-cloud IaC, CI/CD & zero-downtime SRE',
      path: '/services/devops-cloud',
      color: '#FF9CAA',
      borderColor: 'rgba(255, 156, 170, 0.3)',
      badge: 'Infra',
    },
    {
      title: 'Custom Software',
      desc: 'Bespoke backend systems, high-frequency transaction engines',
      path: '/services/custom-software',
      color: '#74C8FC',
      borderColor: 'rgba(116, 200, 252, 0.3)',
      badge: 'Enterprise',
    },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full select-none transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto h-[64px] sm:h-[70px] px-4 sm:px-6 tablet:px-12 desktop:px-[80px] flex items-center justify-between">
        {/* Brand: Official AEITCH Logo */}
        <Link
          href="/"
          className="flex items-center no-underline group focus:outline-none"
        >
          <img
            src="/logo.png"
            alt="AEITCH"
            width={296}
            height={38}
            className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop & Tablet Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {/* Services Dropdown Trigger */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-1.5 font-poppins font-medium text-[14px] transition-colors duration-200 cursor-pointer ${
                currentPath.startsWith('/services') || servicesOpen
                  ? 'text-white'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <span>Services</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180 text-white' : 'text-white/60'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Glass Dropdown Menu */}
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[360px] animate-fadeIn">
                <div className="rounded-2xl bg-black/90 border border-white/10 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col gap-1">
                  {servicesList.map((srv) => (
                    <Link
                      key={srv.path}
                      href={srv.path}
                      className="group flex flex-col gap-1 p-3 rounded-xl hover:bg-white/[0.05] transition-all no-underline"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: srv.color }}
                          />
                          <span className="font-poppins font-medium text-[14px] text-white group-hover:text-white transition-colors">
                            {srv.title}
                          </span>
                        </div>
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full border"
                          style={{
                            color: srv.color,
                            borderColor: srv.borderColor,
                            backgroundColor: `${srv.color}15`,
                          }}
                        >
                          {srv.badge}
                        </span>
                      </div>
                      <p className="font-poppins text-[12px] text-white/50 pl-4.5 line-clamp-1">
                        {srv.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/solutions"
            className={`font-poppins font-medium text-[14px] transition-colors duration-200 no-underline ${
              currentPath === '/solutions' ? 'text-white' : 'text-white/75 hover:text-white'
            }`}
          >
            Solutions
          </Link>

          <Link
            href="/insights"
            className={`font-poppins font-medium text-[14px] transition-colors duration-200 no-underline ${
              currentPath.startsWith('/insights') ? 'text-[#F7C059]' : 'text-white/75 hover:text-white'
            }`}
          >
            Insights
          </Link>

          <Link
            href="/stack"
            className={`font-poppins font-medium text-[14px] transition-colors duration-200 no-underline ${
              currentPath.startsWith('/stack') ? 'text-[#76E3DC]' : 'text-white/75 hover:text-white'
            }`}
          >
            Tech Stack
          </Link>

          <Link
            href="/case-studies"
            className={`font-poppins font-medium text-[14px] transition-colors duration-200 no-underline ${
              currentPath === '/case-studies' ? 'text-white' : 'text-white/75 hover:text-white'
            }`}
          >
            Case Studies
          </Link>

          <Link
            href="/about"
            className={`font-poppins font-medium text-[14px] transition-colors duration-200 no-underline ${
              currentPath === '/about' ? 'text-white' : 'text-white/75 hover:text-white'
            }`}
          >
            About Us
          </Link>

          <Link
            href="/pricing"
            className={`font-poppins font-medium text-[14px] transition-colors duration-200 no-underline ${
              currentPath === '/pricing' ? 'text-white' : 'text-white/75 hover:text-white'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black font-poppins font-semibold text-[13px] sm:text-[13.5px] px-4 sm:px-5 py-2 rounded-full shadow-sm hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all no-underline shrink-0"
          >
            <span>Get in Touch</span>
            <svg
              className="w-3.5 h-3.5 flex-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 flex flex-col gap-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            <span className="font-poppins text-[11px] font-semibold tracking-wider text-white/40 uppercase">
              Core Services
            </span>
            <div className="flex flex-col gap-2 pt-1">
              {servicesList.map((srv) => (
                <Link
                  key={srv.path}
                  href={srv.path}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors no-underline"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: srv.color }} />
                  <span className="font-poppins text-[15px] font-medium text-white">{srv.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-white/10 w-full" />

          <div className="flex flex-col gap-3">
            <Link href="/solutions" className="font-poppins text-[15px] text-white/80 hover:text-white no-underline">
              Solutions
            </Link>
            <Link href="/insights" className="font-poppins text-[15px] text-[#F7C059] hover:text-white no-underline font-medium">
              Technical Insights
            </Link>
            <Link href="/stack" className="font-poppins text-[15px] text-[#76E3DC] hover:text-white no-underline font-medium">
              Tech Stack Blueprints
            </Link>
            <Link href="/case-studies" className="font-poppins text-[15px] text-white/80 hover:text-white no-underline">
              Case Studies
            </Link>
            <Link href="/about" className="font-poppins text-[15px] text-white/80 hover:text-white no-underline">
              About Us
            </Link>
            <Link href="/pricing" className="font-poppins text-[15px] text-white/80 hover:text-white no-underline">
              Pricing
            </Link>
            <Link href="/contact" className="font-poppins text-[15px] text-[#FFC247] font-medium hover:text-white no-underline">
              Get in Touch →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
