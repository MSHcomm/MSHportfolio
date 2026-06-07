import React, { useRef, useState } from 'react';

export default function InteractiveLogo({ className = "", width = 40, height = 40 }) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 15 degrees tilt for the 3D parallax effect
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className={`interactive-logo-wrapper ${className}`} 
      style={{ width, height, perspective: '300px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="interactive-logo-inner"
        style={{
          transform: isHovering 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.1)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          width: '100%',
          height: '100%',
          display: 'flex'
        }}
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="interactive-logo-svg"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="logo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g 
            stroke={isHovering ? "url(#logo-glow)" : "currentColor"} 
            strokeWidth="7" 
            fill="none" 
            strokeLinejoin="round" 
            strokeLinecap="round"
            filter={isHovering ? "url(#neon-glow)" : "none"}
            style={{ transition: 'all 0.3s ease' }}
          >
            {/* Hexagon G */}
            <path className={`logo-path ${isHovering ? 'animate-draw-g' : ''}`} d="M 85 28 L 50 8 L 15 28 L 15 72 L 50 92 L 85 72 L 85 50 L 72 50" />
            {/* Inner M */}
            <path className={`logo-path ${isHovering ? 'animate-draw-m' : ''}`} d="M 28 65 L 28 35 L 50 55 L 72 35 L 72 65" />
          </g>
        </svg>
      </div>

      <style>{`
        .interactive-logo-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .interactive-logo-inner {
          transform-style: preserve-3d;
          will-change: transform;
        }

        .logo-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 0;
        }

        .animate-draw-g {
          animation: drawTraceG 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-draw-m {
          animation: drawTraceM 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes drawTraceG {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes drawTraceM {
          0% { stroke-dashoffset: -400; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
