import React, { useEffect, useState } from 'react';

interface GaugeProps {
  score: number;       // Final target score (70-83)
  maxScore?: number;   // 100
  color: string;
  label: string;
  size?: number;
}

function interpolateRedToOrange(ratio: number): string {
  // Interpolate from Red (#d03238 => 208, 50, 56) to Orange (#ffb020 => 255, 176, 32)
  const clampedRatio = Math.min(1, Math.max(0, ratio));
  const r = Math.round(208 + (255 - 208) * clampedRatio);
  const g = Math.round(50 + (176 - 50) * clampedRatio);
  const b = Math.round(56 + (32 - 56) * clampedRatio);
  return `rgb(${r}, ${g}, ${b})`;
}

export const Gauge: React.FC<GaugeProps> = ({
  score,
  maxScore = 100,
  color,
  label,
  size = 220
}) => {
  const [animatedScore, setAnimatedScore] = useState<number>(0);

  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Deliberate 3.5s (3500ms) score reveal count-up and arc fill
  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    const duration = 3500; // 3.5 seconds for dramatic result landing

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth ease-out cubic easing curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easedProgress * score);

      setAnimatedScore(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [score]);

  // Interpolate color from Red (at 0 count) to Orange (at final score)
  const animProgress = score > 0 ? animatedScore / score : 0;
  const currentColor = interpolateRedToOrange(animProgress);

  // Ring arc percentage mapped to 100 scale
  const percentage = Math.min(1, Math.max(0, animatedScore / maxScore));
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Track background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={currentColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-75 ease-out"
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline gap-1">
            <span
              className="text-5xl font-black tracking-tight transition-colors duration-75"
              style={{ color: currentColor }}
            >
              {animatedScore}
            </span>
            <span className="text-lg font-bold text-[#868685]">
              /{maxScore}
            </span>
          </div>
          <span
            className="mt-1 px-3 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider transition-all duration-300"
            style={{
              backgroundColor: `${currentColor}20`,
              color: currentColor
            }}
          >
            {label}
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs text-[#868685] font-semibold text-center">
        Hard-Capped Max Ceiling: <span className="text-[#0e0f0c] font-black">83/100</span>
      </p>
    </div>
  );
};
