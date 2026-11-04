import React from 'react';

export default function WorkingStatus({ percent = 70, label = 'Goal Progress' }) {
  // Geometry for SVG Donut (size: 150, radius: 55)
  const size = 150;
  const center = size / 2;
  const radius = 55;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="card-panel">
      <div className="analytics-card-header">
        <h3 className="analytics-card-title">Working Status</h3>
      </div>

      <div className="working-status-donut-body">
        <div className="status-donut-wrap">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="donutGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7F70F1" />
                <stop offset="100%" stopColor="#5D5FEF" />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#F0F1F7"
              strokeWidth={strokeWidth}
            />

            {/* Progress Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="url(#donutGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${center} ${center})`}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>

          {/* Center Info */}
          <div className="donut-center-info">
            <span className="donut-center-percent">{percent}%</span>
            <span className="donut-center-label">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
