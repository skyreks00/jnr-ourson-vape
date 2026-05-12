import { useState, useEffect } from 'react';
import OrderPage from './components/OrderPage';
import AdminPage from './components/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState('order');
  const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || 'admin';

  useEffect(() => {
    // Vérifier l'URL pour déterminer la page
    const checkRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const access = params.get('access');
      
      if (access === ADMIN_PATH) {
        setCurrentPage('admin');
      } else {
        setCurrentPage('order');
      }
    };

    checkRoute();
    
    // Écouter les changements d'URL
    window.addEventListener('popstate', checkRoute);
    
    return () => window.removeEventListener('popstate', checkRoute);
  }, [ADMIN_PATH]);

  return (
    <div className="min-h-screen bg-dark-charcoal">
      {currentPage === 'admin' ? <AdminPage /> : <OrderPage />}
    </div>
  );
}

export default App;
