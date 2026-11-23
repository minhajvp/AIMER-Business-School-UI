import React from 'react';

interface HsbipWireframeLinesProps {
  className?: string;
  opacity?: number;
  strokeColor?: string;
  height?: number;
}

export const HsbipWireframeLines: React.FC<HsbipWireframeLinesProps> = ({
  className = '',
  opacity = 0.35,
  strokeColor = '#168C9B',
  height = 200,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox={`0 0 1600 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="none"
      >
        <g stroke={strokeColor} strokeWidth="0.85" strokeOpacity="0.45">
          <ellipse cx="800" cy={height / 2} rx="950" ry={height * 0.44} />
          <ellipse cx="800" cy={height / 2} rx="840" ry={height * 0.38} />
          <ellipse cx="800" cy={height / 2} rx="730" ry={height * 0.32} />
          <ellipse cx="800" cy={height / 2} rx="620" ry={height * 0.26} />
          <ellipse cx="800" cy={height / 2} rx="510" ry={height * 0.20} />
          <ellipse cx="800" cy={height / 2} rx="400" ry={height * 0.15} />
          <ellipse cx="800" cy={height / 2} rx="290" ry={height * 0.10} />
          <ellipse cx="800" cy={height / 2} rx="180" ry={height * 0.06} />
        </g>
      </svg>
    </div>
  );
};

