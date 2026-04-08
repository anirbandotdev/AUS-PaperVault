import React, { useEffect, useState, useMemo } from "react";
import "./PerspectiveGrid.css";

const PerspectiveGrid = ({
  className = "",
  gridSize = 40,
  showOverlay = true,
  fadeRadius = 80,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize tiles array to prevent unnecessary re-renders
  const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize]);

  return (
    <div
      className={`perspective-grid-container ${className}`}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="perspective-grid-mesh"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {/* Tiles */}
        {mounted &&
          tiles.map((_, i) => (
            <div
              key={i}
              className="perspective-grid-tile"
            />
          ))}
      </div>

      {/* Radial Gradient Mask (Overlay) */}
      {showOverlay && (
        <div
          className="perspective-grid-overlay"
          style={{
            background: `radial-gradient(circle at center, transparent 25%, var(--perspective-fade-stop, #000) ${fadeRadius}%)`,
          }}
        />
      )}
    </div>
  );
};

export default PerspectiveGrid;
