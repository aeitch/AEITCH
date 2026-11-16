import React, { createContext, useContext, useState, useEffect, ReactNode, MouseEvent } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: window.location.pathname,
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export interface RouterProps {
  children: ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Normalise pathname (fallback to '/' if empty)
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      if (window.location.hash) {
        setTimeout(() => {
          const elem = document.querySelector(window.location.hash);
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Check initial hash on mount
    if (window.location.hash) {
      setTimeout(() => {
        const elem = document.querySelector(window.location.hash);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to.startsWith('#')) {
      const elem = document.querySelector(to);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const [targetPath, hash] = to.split('#');
    const cleanPath = targetPath.split('?')[0] || '/';

    window.history.pushState({}, '', to);
    setCurrentPath(cleanPath);

    if (hash) {
      setTimeout(() => {
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '', onClick, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let browser handle external links, new tabs or modifier keys
    if (
      props.target === '_blank' ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export interface RouteProps {
  path: string;
  element: React.ReactElement;
  exact?: boolean;
}

export const Route: React.FC<RouteProps> = ({ path, element, exact = true }) => {
  const { currentPath } = useRouter();

  const normalizedCurrent = currentPath.split('#')[0].split('?')[0];
  const isMatch = exact ? normalizedCurrent === path : normalizedCurrent.startsWith(path);
  return isMatch ? element : null;
};
