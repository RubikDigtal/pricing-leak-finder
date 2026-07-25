import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, RotateCcw } from 'lucide-react';
import { computeRanking, computeConfidence, computeArchetype } from '../lib/scoring.js';
import { checkUnlocked } from '../lib/supabase.js';
import { exportReportToPDF } from '../lib/pdf.js';
import ReportFree from './ReportFree.jsx';
import ReportPaid from './ReportPaid.jsx';

export default function Report() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [exporting, setExporting] = useState(false);

  // If someone lands here without having gone through the quiz (e.g. a
  // refresh, or a direct link), send them back to the start rather than
  // rendering a broken report.
  useEffect(() => {
    if (!state) navigate('/');
  }, [state, navigate]);

  // After returning from Gumroad, the checkout link includes ?unlocked=1 and
  // the submission id, so we poll Supabase briefly to confirm the webhook
  // has actually flipped the row before showing the paid section.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('unlocked') === '1' && state?.submissionId) {
      setChecking(true);
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts += 1;
        const isUnlocked = await checkUnlocked(state.submissionId);
        if (isUnlocked || attempts > 10) {
          setUnlocked(isUnlocked);
          setChecking(false);
          clearInterval(poll);
        }
      }, 1500);
      return () => clearInterval(poll);
    }
  }, [state]);

  if (!state) return null;

  const { intake, answers, severity, submissionId } = state;
  const ranking = computeRanking(answers);
  const confidence = computeConfidence(answers, severity);
  const archetype = computeArchetype(answers);

  const priceLabel = intake.packagePrice ? `$${Number(intake.packagePrice).toLocaleString()}` : '$3,800';
  const sub = (str) => (typeof str === 'string' ? str.split('$3,800').join(priceLabel) : str);

  const gumroadUrl = import.meta.env.VITE_GUMROAD_PRODUCT_URL || '#';
  const checkoutHref = submissionId
    ? `${gumroadUrl}?wanted=true&submission_id=${submissionId}`
    : gumroadUrl;

  async function handleUnlockClick() {
    // In production this sends the photographer to the real Gumroad checkout,
    // with the submission id passed through so the webhook (api/gumroad-webhook.js)
    // knows which row to mark unlocked. Gumroad's redirect URL should be set
    // to this same report page with ?unlocked=1 appended.
    window.location.href = checkoutHref;
  }

  async function handleExport() {
    setExporting(true);
    await exportReportToPDF('report-root', `pricing-leak-report-${intake.business || 'report'}.pdf`);
    setExporting(false);
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 100px' }}>
      <div id="report-root">
        <div style={{
          background: 'linear-gradient(155deg, var(--espresso), #4A3627)', color: 'var(--cream)',
          padding: '28px 28px', borderRadius: 16, marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--coral-light)', fontWeight: 700, marginBottom: 10 }}>
            Diagnostic Report
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 22, margin: '0 0 6px' }}>
            Where {intake.business || 'your business'}'s pricing is leaking.
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(246,240,227,.75)', margin: 0 }}>Prepared for {intake.name || 'you'}</p>
        </div>

        <ReportFree
          intake={intake}
          ranking={ranking}
          confidence={confidence}
          priceLabel={priceLabel}
          sub={sub}
          onUnlock={handleUnlockClick}
        />

        {checking && (
          <div className="no-print" style={{ textAlign: 'center', fontSize: 13, color: 'var(--espresso-45)', marginBottom: 20 }}>
            Confirming your unlock…
          </div>
        )}

        {unlocked && (
          <ReportPaid
            intake={intake}
            ranking={ranking}
            archetype={archetype}
            priceLabel={priceLabel}
            sub={sub}
          />
        )}
      </div>

      {unlocked && (
        <div className="no-print" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
          <button className="btn-primary" onClick={handleExport} disabled={exporting}>
            <Download size={16} /> {exporting ? 'Preparing PDF…' : 'Save as PDF'}
          </button>
        </div>
      )}

      <div className="no-print" style={{ textAlign: 'center', marginTop: 24 }}>
        <button className="btn-ghost" onClick={() => navigate('/quiz')}>
          <RotateCcw size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
          Start over
        </button>
      </div>
    </div>
  );
}
