// src/components/HeroLayout.js
import { Outlet, Navigate } from 'react-router-dom';
import { useHero } from '../context/heroContext';

const HeroLayout = () => {
  const { hero, loading } = useHero();

  // Show loading while checking hero status
  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading hero...</div>
      </div>
    );
  }

  // Redirect to hero selection if no hero
  if (!hero || !hero.id) {
    return <Navigate to="/hero" replace />;
  }

  // Render the nested routes
  return <Outlet />;
};

export default HeroLayout;