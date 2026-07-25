import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Tag, BarChart3, MessageCircle, Shield, TrendingDown, Clock } from 'lucide-react';
import { DIMENSIONS } from '../data/content.js';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{
        background: 'linear-gradient(155deg, var(--espresso) 0%, #4A3627 100%)',
        color: 'var(--cream)', borderRadius: 20, padding: '48px 36px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,105,76,.35), transparent 70%)',
        }} />
        <div style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--coral-light)', fontWeight: 700, marginBottom: 16 }}>
          Free Diagnostic · For Wedding Photographers
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 34, lineHeight: 1.2, margin: '0 0 16px', maxWidth: 500 }}>
          Find out where your pricing conversations are actually losing money.
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(246,240,227,.8)', maxWidth: 460, marginBottom: 28 }}>
          Six quick questions about how you package, anchor, deliver, and defend your price. Takes about 3 minutes — get a real diagnosis, not a generic checklist.
        </p>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>
          Start the diagnostic <ArrowRight size={16} />
        </button>
      </div>

      <div style={{ marginTop: 48 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--espresso-45)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 16 }}>
          The six places pricing money leaks
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {Object.values(DIMENSIONS).map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.key} className="card" style={{ padding: '16px 18px' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: 'var(--coral-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
                }}>
                  <Icon size={18} color="var(--coral-deep)" />
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 14 }}>{d.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <p style={{ fontSize: 13.5, color: 'var(--espresso-70)', marginBottom: 18 }}>
          Free diagnosis. A full prescription — scripts, templates, and a cheat sheet — is available afterward for $19.
        </p>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>
          Start the diagnostic <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
