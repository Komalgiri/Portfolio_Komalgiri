import { useState, useEffect, lazy, Suspense } from 'react';
import Home from './pages/Home';

const AllProjects = lazy(() => import('./pages/AllProjects'));
const GithubStats = lazy(() => import('./pages/GithubStats'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const SystemDesignGallery = lazy(() => import('./pages/SystemDesignGallery'));
const UIDesignGallery = lazy(() => import('./pages/UIDesignGallery'));

const PageLoader = () => (
    <div className="flex min-h-screen items-center justify-center bg-theme-bg">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
    </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;

      if (hash.includes('case-study/')) {
        const projectId = hash.split('case-study/')[1];
        setSelectedProjectId(projectId);
        setCurrentPage('case-study');
        window.scrollTo(0, 0);
      } else if (hash.includes('all-projects')) {
        setCurrentPage('projects');
        window.scrollTo(0, 0);
      } else if (hash.includes('github-stats')) {
        setCurrentPage('github');
        window.scrollTo(0, 0);
      } else if (hash.includes('system-design')) {
        setCurrentPage('system-design');
        window.scrollTo(0, 0);
      } else if (hash.includes('ui-design')) {
        setCurrentPage('ui-design');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    handleNavigation();

    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);

  const renderContent = () => {
    if (currentPage === 'case-study') {
      return (
        <Suspense fallback={<PageLoader />}>
          <CaseStudy projectId={selectedProjectId} onBack={() => window.location.hash = 'all-projects'} />
        </Suspense>
      );
    }
    if (currentPage === 'projects') {
      return (
        <Suspense fallback={<PageLoader />}>
          <AllProjects onBack={() => window.location.hash = ''} />
        </Suspense>
      );
    }
    if (currentPage === 'github') {
      return (
        <Suspense fallback={<PageLoader />}>
          <GithubStats onBack={() => window.location.hash = ''} />
        </Suspense>
      );
    }
    if (currentPage === 'system-design') {
      return (
        <Suspense fallback={<PageLoader />}>
          <SystemDesignGallery onBack={() => window.location.hash = ''} />
        </Suspense>
      );
    }
    if (currentPage === 'ui-design') {
      return (
        <Suspense fallback={<PageLoader />}>
          <UIDesignGallery onBack={() => window.location.hash = ''} />
        </Suspense>
      );
    }
    return <Home />;
  };

  return (
    <div className="bg-theme-bg min-h-screen text-theme-text transition-colors duration-300">
      {renderContent()}
    </div>
  );
}

export default App;
