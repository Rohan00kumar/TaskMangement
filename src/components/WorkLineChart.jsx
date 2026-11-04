import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function WorkLineChart({ data }) {
  const [period, setPeriod] = useState('6 Month');
  const [granularity, setGranularity] = useState('Weekly');

  const months = data?.months || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const values = data?.values || [35, 48, 42, 60, 72, 58, 65];

  // SVG coordinate calculations for 7 points across width=460, height=140
  // Mapping values (0 to 100) to Y coordinates (120 to 15)
  const width = 440;
  const height = 130;
  const paddingX = 35;
  const paddingBottom = 25;
  const paddingTop = 15;

  const points = values.map((val, idx) => {
    const x = paddingX + (idx * (width - 2 * paddingX)) / (values.length - 1);
    const y = height - paddingBottom - (val / 100) * (height - paddingBottom - paddingTop);
    return { x, y, val, month: months[idx] };
  });

  // Build smooth cubic bezier SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const cpX1 = current.x + (next.x - current.x) / 2;
    const cpY1 = current.y;
    const cpX2 = current.x + (next.x - current.x) / 2;
    const cpY2 = next.y;
    pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
  }

  // Area path for gradient fill beneath curve
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  // Highlighted May point (index 4)
  const highlightPoint = points[4] || points[points.length - 1];

  return (
    <div className="card-panel">
      <div className="analytics-card-header">
        <h3 className="analytics-card-title">Total work</h3>
        <button
          className="pill-dropdown-btn"
          onClick={() => setPeriod(period === '6 Month' ? '1 Year' : '6 Month')}
        >
          {period}
        </button>
      </div>

      <div className="chart-sub-header">
        <span className="chart-sub-title">Tasks</span>
        <button
          className="chart-granularity-tag"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={() => setGranularity(granularity === 'Weekly' ? 'Monthly' : 'Weekly')}
        >
          <span>{granularity}</span>
          <ChevronDown size={12} />
        </button>
      </div>

      <div className="svg-chart-container">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="cyanAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C5FF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#00C5FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[100, 70, 40, 10].map((yVal) => {
            const yPos = height - paddingBottom - (yVal / 100) * (height - paddingBottom - paddingTop);
            return (
              <g key={yVal}>
                <line
                  x1={paddingX}
                  y1={yPos}
                  x2={width - paddingX}
                  y2={yPos}
                  stroke="#F0F1F7"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={yPos + 3}
                  textAnchor="end"
                  fontSize="8.5"
                  fill="#B2B3BD"
                  fontFamily="inherit"
                >
                  {yVal}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#cyanAreaGrad)" />

          {/* Spline Curve Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#00C5FF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Vertical guideline at May highlight */}
          <line
            x1={highlightPoint.x}
            y1={highlightPoint.y}
            x2={highlightPoint.x}
            y2={height - paddingBottom}
            stroke="#FF8A65"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Active Circle at May */}
          <circle
            cx={highlightPoint.x}
            cy={highlightPoint.y}
            r="4.5"
            fill="#FFFFFF"
            stroke="#FF754C"
            strokeWidth="2.5"
          />

          {/* Floating Tooltip: 72 task */}
          <g transform={`translate(${highlightPoint.x - 28}, ${highlightPoint.y - 28})`}>
            <rect
              x="0"
              y="0"
              width="56"
              height="20"
              rx="10"
              fill="#FFFFFF"
              stroke="#FFEAE5"
              strokeWidth="1.5"
              filter="drop-shadow(0px 2px 4px rgba(255, 117, 76, 0.15))"
            />
            <text
              x="28"
              y="13"
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill="#FF754C"
              fontFamily="inherit"
            >
              72 task
            </text>
          </g>

          {/* X Axis Month Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              fontSize="9"
              fill={i === 4 ? '#11142D' : '#808191'}
              fontWeight={i === 4 ? '700' : '500'}
              fontFamily="inherit"
            >
              {p.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

