import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAdventures } from "../context/adventureContext";
import { useEffect } from "react";

const CombatLayout = () => {
  const { combat, getActiveCombat, loading } = useAdventures();
  const location = useLocation();

  useEffect(() => {
    getActiveCombat();
  }, [location.key]);

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  if (combat && !combat.error) {
    return <Navigate to="/combat" replace />;
  }

  return <Outlet />;
};

export default CombatLayout;
