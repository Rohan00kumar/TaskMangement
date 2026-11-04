import React from 'react';
import { Check, Clock, Bell, CheckCircle2 } from 'lucide-react';

export default function StatCards({ stats, onSelectStat }) {
  const cards = [
    {
      id: 'total',
      colorClass: 'purple',
      icon: Check,
      num: stats?.totalTask || 0,
      label: 'Total Items'
    },
    {
      id: 'in_progress',
      colorClass: 'cyan',
      icon: Clock,
      num: String(stats?.inProgress || 0).padStart(2, '0'),
      label: 'In Progress'
    },
    {
      id: 'pending',
      colorClass: 'coral',
      icon: Bell,
      num: String(stats?.pending || 0).padStart(2, '0'),
      label: 'Pending'
    },
    {
      id: 'completed',
      colorClass: 'green',
      icon: CheckCircle2,
      num: stats?.completed || 0,
      label: 'Completed'
    }
  ];

  return (
    <div className="stat-pill-row">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`stat-pill-card ${card.colorClass}`}
            onClick={() => onSelectStat && onSelectStat(card.id)}
            title={`View ${card.label}`}
          >
            <div className="stat-pill-icon-wrap">
              <Icon size={20} strokeWidth={2.6} color="#FFFFFF" />
            </div>
            <div className="stat-pill-info">
              <span className="stat-pill-num">{card.num}</span>
              <span className="stat-pill-label">{card.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

