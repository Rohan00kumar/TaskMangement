import React from 'react';
import { MoreVertical } from 'lucide-react';

export default function TaskRingsChart({ data }) {
  const items = data || [
    { label: 'Total Task', count: 1234, percent: 85, color: '#6C5DD3' },
    { label: 'Running', count: 4, percent: 58, color: '#00C5FF' },
    { label: 'Pending', count: 7, percent: 38, color: '#FF754C' }
  ];

  // Concentric circle geometry
  const size = 150;
  const center = size / 2;
  const strokeWidth = 8;
  const rings = [
    { r: 58, ...items[0] }, // Outer
    { r: 44, ...items[1] }, // Middle
    { r: 30, ...items[2] }  // Inner
  ];

  return (
    <div className="card-panel">
      <div className="analytics-card-header">
        <h3 className="analytics-card-title">Task Percentage</h3>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#808191' }}>
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="concentric-rings-body">
        <div className="rings-svg-wrap">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {rings.map((ring, idx) => {
              const circumference = 2 * Math.PI * ring.r;
              const strokeDashoffset = circumference - (ring.percent / 100) * circumference;

              return (
                <g key={idx}>
                  {/* Background Track Circle */}
                  <circle
                    cx={center}
                    cy={center}
                    r={ring.r}
                    fill="none"
                    stroke="#F2F3F8"
                    strokeWidth={strokeWidth}
                  />
                  {/* Colored Progress Arc */}
                  <circle
                    cx={center}
                    cy={center}
                    r={ring.r}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${center} ${center})`}
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="rings-legend">
          {items.map((item, idx) => (
            <div key={idx} className="legend-item">
              <div className="legend-left">
                <span className="legend-dot" style={{ backgroundColor: item.color }} />
                <span>{item.label}</span>
              </div>
              <span className="legend-count">
                {String(item.count).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

