import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--cream)', borderBottom: '1px solid var(--border)',
      padding: '14px 24px',
    }}>
      <div style={{
        maxWidth: 880, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9, background: 'var(--espresso)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--coral-light)', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 15,
          }}>P</div>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 15, lineHeight: 1.1 }}>Pricing Leak Finder</div>
            <div style={{ fontSize: 10.5, color: 'var(--espresso-45)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>The Conversation Leak</div>
          </div>
        </Link>
        <a
          href="https://sales-leak-diagnostic-tools.vercel.app/"
          style={{ fontSize: 13, color: 'var(--espresso-70)', textDecoration: 'none', fontWeight: 500 }}
        >
          More diagnostic tools →
        </a>
      </div>
    </header>
  );
}
