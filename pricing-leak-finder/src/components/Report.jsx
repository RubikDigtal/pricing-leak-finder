import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, RotateCcw } from 'lucide-react';
import { computeRanking, computeConfidence, computeArchetype } from '../lib/scoring.js';
import { derivePrices, substitute } from '../lib/pricing.js';
import { checkUnlocked } from '../lib/supabase.js';
import { exportReportToPDF } from '../lib/pdf.js';
import ReportFree from './ReportFree.jsx';
import ReportPaid from './ReportPaid.jsx';

// Why this exists: React Router's `location.state` (passed via navigate())
// only survives client-side, in-app navigation. Once someone leaves for
// Gumroad and comes back, that's a brand-new full page load from an
// external site — location.state is always null at that point, no matter
// what. On top of that, URL *fragments* (the #/report part of a hash-based
// route) are a browser-only concept that some redirect systems don't
// reliably preserve when reconstructing a Location header server-side.
// The fix for both: save the data we need to localStorage right before
// leaving for checkout, and read it back from there — not from the
// router — when we land back here. The real top-level query string
// (?unlocked=1, which sits *before* the #, outside the hash) is used as
// the signal to look for that saved data, since query strings (unlike
// fragments) do reliably survive redirects.
const STORAGE_KEY = 'plf_pending_submission';

function saveSnapshot(payload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn('Could not save snapshot to localStorage:', e);
  }
}
function loadSnapshot() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Could not read snapshot from localStorage:', e);
    return null;
  }
}

export default function Report() {
  const location = useLocation();
  const navigate = useNavigate();

  // Real top-level query string, read natively — NOT via react-router's
  // useSearchParams, because with HashRouter that hook only sees params
  // *inside* the hash. The unlocked=1 flag lives outside it, in the real
  // window.location.search, so it has to be read directly.
  const realQuery = new URLSearchParams(window.location.search);
  const returningFromGumroad = realQuery.get('unlocked') === '1';

  const [effectiveState, setEffectiveState] = useState(() => {
    if (location.state) return location.state;
    if (returningFromGumroad) return loadSnapshot();
    return null;
  });

  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // If there's genuinely nothing to show — no router state, and either
  // we're not returning from Gumroad or the localStorage snapshot is gone
  // (cleared cache, different browser/device) — there's nothing to
  // recover. Show a message rather than silently bouncing home, so it's
  // clear what happened.
  useEffect(() => {
    if (!effectiveState) {
      if (returningFromGumroad) {
        setNotFound(true);
      } else {
        navigate('/');
      }
    }
  }, [effectiveState, returningFromGumroad, navigate]);

  // Poll Supabase to confirm the webhook actually flipped `unlocked` for
  // this submission. This — not the ?unlocked=1 flag or the localStorage
  // snapshot — is the real gate on the paid section, so someone typing
  // ?unlocked=1 into the address bar without paying still can't see it.
  useEffect(() => {
    if (returningFromGumroad && effectiveState?.submissionId) {
      setChecking(true);
      let attempts = 0;
      const poll = setInterval(async () => {
        attempts += 1;
        const isUnlocked = await checkUnlocked(effectiveState.submissionId);
        if (isUnlocked || attempts > 10) {
          setUnlocked(isUnlocked);
          setChecking(false);
          clearInterval(poll);
        }
      }, 1500);
      return () => clearInterval(poll);
    }
  }, [returningFromGumroad, effectiveState]);

  if (notFound) {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 20, marginBottom: 12 }}>We couldn't find your report</h2>
        <p style={{ fontSize: 13.5, color: 'var(--espresso-70)', marginBottom: 20 }}>
          This can happen if you switched browsers or devices between starting the quiz and finishing checkout.
          Retake the quiz to generate a fresh report — your purchase is still on file.
        </p>
        <button className="btn-primary" onClick={() => navigate('/quiz')}>Retake the diagnostic</button>
      </div>
    );
  }

  if (!effectiveState) return null;

  const { intake, answers, severity, submissionId } = effectiveState;
  const ranking = computeRanking(answers);
  const confidence = computeConfidence(answers, severity);
  const archetype = computeArchetype(answers);

  const priceTokens = derivePrices(intake.packagePrice ? Number(intake.packagePrice) : null);
  const priceLabel = priceTokens.PRICE;
  const sub = (str) => substitute(str, priceTokens);

  const gumroadUrl = import.meta.env.VITE_GUMROAD_PRODUCT_URL || '#';
  const checkoutHref = submissionId
    ? `${gumroadUrl}?wanted=true&submission_id=${submissionId}`
    : gumroadUrl;

  async function handleUnlockClick() {
    // Save everything needed to re-render this exact report before leaving
    // the app entirely. Gumroad's configured redirect URL should be:
    //   https://your-app.vercel.app/?unlocked=1#/report
    // (query param before the #, so it survives the redirect intact).
    saveSnapshot({ intake, answers, severity, submissionId });
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

