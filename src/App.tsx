import { useState, useEffect } from 'react';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import GithubStats from './pages/GithubStats';
import CaseStudy from './pages/CaseStudy';




function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;

      // Use a switch or cleaner if/else for routing
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
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    handleNavigation(); // Initial check

    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);

  const renderContent = () => {
    if (currentPage === 'case-study') {
      return <CaseStudy projectId={selectedProjectId} onBack={() => window.location.hash = 'all-projects'} />;
    }
    if (currentPage === 'projects') {
      return <AllProjects onBack={() => window.location.hash = ''} />;
    }
    if (currentPage === 'github') {
      return <GithubStats onBack={() => window.location.hash = ''} />;
    }
    return <Home />;
  };

  return (
    <div className="bg-[#0f172a] min-h-screen">
      {renderContent()}
    </div>
  );
}

export default App;
