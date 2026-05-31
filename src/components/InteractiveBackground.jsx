import React from 'react';

export default function InteractiveBackground() {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.12,
        overflow: 'hidden'
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          {/* Grid Pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2d3449" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="1" fill="#464554" opacity="0.5" />
          </pattern>
          
          {/* Glowing Pulse Marker */}
          <radialGradient id="pulse-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c0c1ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#c0c1ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base Grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Circuit Traces (Simulated PCB Lines) */}
        <g stroke="#2d3449" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Trace Group 1 */}
          <path id="trace1" d="M 100,150 L 250,150 L 300,200 L 500,200 L 550,250 L 550,400" />
          {/* Trace Group 2 */}
          <path id="trace2" d="M 600,100 L 750,250 L 750,450 L 800,500 L 1000,500" />
          {/* Trace Group 3 */}
          <path id="trace3" d="M 200,600 L 350,600 L 400,650 L 400,800 M 400,680 L 500,680" />
          {/* Trace Group 4 */}
          <path id="trace4" d="M 900,200 L 1100,200 L 1150,250 L 1150,380" />
          {/* Trace Group 5 */}
          <path id="trace5" d="M 100,750 L 150,800 L 300,800 L 350,750 L 550,750" />
        </g>

        {/* Dynamic Nodes (Component Junction points) */}
        <g fill="#171f33" stroke="#c0c1ff" strokeWidth="1.5">
          <circle cx="100" cy="150" r="4" />
          <circle cx="300" cy="200" r="3" />
          <circle cx="550" cy="400" r="4" fill="#c0c1ff" />
          <circle cx="600" cy="100" r="4" />
          <circle cx="750" cy="450" r="3" />
          <circle cx="1000" cy="500" r="4" fill="#c0c1ff" />
          <circle cx="200" cy="600" r="4" />
          <circle cx="400" cy="800" r="4" />
          <circle cx="500" cy="680" r="3.5" fill="#c0c1ff" />
          <circle cx="900" cy="200" r="4" />
          <circle cx="1150" cy="380" r="4" fill="#c0c1ff" />
          <circle cx="550" cy="750" r="4" fill="#c0c1ff" />
        </g>

        {/* Animate Signal Currents along Paths */}
        <g fill="none">
          {/* Signal 1 */}
          <circle r="3" fill="#c0c1ff">
            <animateMotion dur="6s" repeatCount="indefinite" path="M 100,150 L 250,150 L 300,200 L 500,200 L 550,250 L 550,400" />
          </circle>
          <circle r="6" fill="url(#pulse-grad)" opacity="0.7">
            <animateMotion dur="6s" repeatCount="indefinite" path="M 100,150 L 250,150 L 300,200 L 500,200 L 550,250 L 550,400" />
          </circle>

          {/* Signal 2 */}
          <circle r="3" fill="#ffb783">
            <animateMotion dur="8s" begin="2s" repeatCount="indefinite" path="M 600,100 L 750,250 L 750,450 L 800,500 L 1000,500" />
          </circle>
          <circle r="6" fill="url(#pulse-grad)" opacity="0.6">
            <animateMotion dur="8s" begin="2s" repeatCount="indefinite" path="M 600,100 L 750,250 L 750,450 L 800,500 L 1000,500" />
          </circle>

          {/* Signal 3 */}
          <circle r="3" fill="#c0c1ff">
            <animateMotion dur="5s" begin="1s" repeatCount="indefinite" path="M 200,600 L 350,600 L 400,650 L 400,800" />
          </circle>

          {/* Signal 4 */}
          <circle r="3" fill="#c0c1ff">
            <animateMotion dur="7s" repeatCount="indefinite" path="M 900,200 L 1100,200 L 1150,250 L 1150,380" />
          </circle>

          {/* Signal 5 */}
          <circle r="3" fill="#ffb783">
            <animateMotion dur="9s" begin="3s" repeatCount="indefinite" path="M 100,750 L 150,800 L 300,800 L 350,750 L 550,750" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
