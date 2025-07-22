// src/components/HeroLayout.js
import { Outlet, Navigate } from 'react-router-dom';
import { useGamemaster } from '../context/gmContext';

const GMLayout = () => {
  const { gamemaster, loading } = useGamemaster();

  // Show loading while checking gamemaster status
  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading gm...</div>
      </div>
    );
  }

  // Redirect to gamemaster selection if no gamemaster
  if (!gamemaster || !gamemaster.id) {
    return <Navigate to="/gamemaster" replace />;
  }

  // Render the nested routes
  return <Outlet />;
};

export default GMLayout;