import React from 'react';

export function Card({ children, style }) {
  return <div className="card" style={style}>{children}</div>;
}

export function SectionTag({ children, dotColor }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700,
      color: 'var(--espresso)', textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 12,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor || 'var(--coral)' }} />
      {children}
    </div>
  );
}

export function CapText({ children }) {
  return <p style={{ fontSize: 13.5, color: 'var(--espresso-70)', lineHeight: 1.6, margin: '0 0 8px' }}>{children}</p>;
}

export function WhyItMatters({ symptom, rootCause }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 200px', background: 'var(--coral-light)', border: '1px solid rgba(201,105,76,.3)', borderRadius: 12, padding: '16px 18px', minWidth: 0 }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: 8, color: 'var(--coral-deep)' }}>Symptom</div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--espresso)' }}>"{symptom}"</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', width: 28 }}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--espresso-45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </div>
      <div style={{ flex: '1 1 200px', background: 'var(--mint-light)', border: '1px solid rgba(110,168,140,.3)', borderRadius: 12, padding: '16px 18px', minWidth: 0 }}>
        <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, marginBottom: 8, color: 'var(--mint)' }}>Root Cause</div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--espresso)' }}>{rootCause}</div>
      </div>
    </div>
  );
}
