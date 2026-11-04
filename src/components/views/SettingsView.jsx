import React, { useState } from 'react';
import { User, Shield, Download, Upload, RotateCcw, Check, Sun, Moon } from 'lucide-react';

export default function SettingsView({
  user,
  theme = 'light',
  onToggleTheme,
  onUpdateUser,
  onResetData,
  onExportData
}) {
  const [name, setName] = useState(user?.name || 'Rohan Kumar');
  const [role, setRole] = useState(user?.role || 'Full Stack Builder & Student');
  const [brand, setBrand] = useState(user?.brandName || 'PathFlow');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({ name, role, brandName: brand });
    }
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div className="view-header">
        <div className="view-title-wrap">
          <h2 className="view-main-title">Settings</h2>
        </div>
      </div>

      {/* Appearance Theme Selector */}
      <div className="card-panel" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-dark)' }}>
          Appearance Theme
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div
            className={`theme-card-option ${theme === 'light' ? 'active' : ''}`}
            onClick={() => theme === 'dark' && onToggleTheme && onToggleTheme()}
          >
            <div className="theme-card-preview light">
              <div className="preview-bar" />
              <div className="preview-boxes">
                <span /><span /><span />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sun size={16} color="#FFB800" />
                <span style={{ fontSize: '13px', fontWeight: '700' }}>Light Theme</span>
              </div>
              {theme === 'light' && <Check size={16} color="#6C5DD3" />}
            </div>
          </div>

          <div
            className={`theme-card-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => theme === 'light' && onToggleTheme && onToggleTheme()}
          >
            <div className="theme-card-preview dark">
              <div className="preview-bar" />
              <div className="preview-boxes">
                <span /><span /><span />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Moon size={16} color="#7F70F1" />
                <span style={{ fontSize: '13px', fontWeight: '700' }}>Dark Theme</span>
              </div>
              {theme === 'dark' && <Check size={16} color="#7F70F1" />}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="card-panel" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-dark)' }}>
          Profile & Workspace Identity
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role / Subtitle</label>
              <input
                type="text"
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Brand / App Title</label>
            <input
              type="text"
              className="form-input"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            {savedMsg && (
              <span style={{ fontSize: '12px', color: '#20C978', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' }}>
                <Check size={14} /> Saved Successfully!
              </span>
            )}
            <button type="submit" className="btn-primary">
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Backup & Reset */}
      <div className="card-panel">
        <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-dark)' }}>
          Data Backup & Reset
        </h3>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={onExportData}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            Export Workspace Backup (.json)
          </button>
          <button
            onClick={onResetData}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FF754C' }}
          >
            <RotateCcw size={14} />
            Reset to Clean Demo Data
          </button>
        </div>
      </div>
    </div>
  );
}
