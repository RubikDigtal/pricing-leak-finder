import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DIMENSIONS, QUESTION_ORDER, FILTER_Q, SEVERITY_Q } from '../data/content.js';
import { saveSubmission } from '../lib/supabase.js';

const ALL_STEPS = ['intake', 'packageInfo', 'filter', ...QUESTION_ORDER, 'severity'];

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [intake, setIntake] = useState({ name: '', business: '', bizType: 'wedding photography', email: '', packagePrice: '', packageIncludes: '' });
  const [answers, setAnswers] = useState({});
  const [filterAns, setFilterAns] = useState(null);
  const [severityAns, setSeverityAns] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function finish(finalSeverity) {
    setSubmitting(true);
    const payload = {
      name: intake.name,
      business_name: intake.business,
      business_type: intake.bizType,
      email: intake.email,
      package_price: intake.packagePrice ? Number(intake.packagePrice) : null,
      package_includes: intake.packageIncludes || null,
      filter_answer: filterAns,
      packaging_answer: answers.packaging,
      anchoring_answer: answers.anchoring,
      delivery_answer: answers.delivery,
      defense_answer: answers.defense,
      discount_reflex_answer: answers.discountReflex,
      proof_timing_answer: answers.proofTiming,
      severity_answer: finalSeverity,
      unlocked: false,
    };
    const { id } = await saveSubmission(payload);
    setSubmitting(false);
    navigate('/report', { state: { intake, answers, severity: finalSeverity, submissionId: id } });
  }

  function selectOption(key, idx) {
    if (key === 'filter') {
      setFilterAns(idx);
      advance();
      return;
    }
    if (key === 'severity') {
      const sev = idx + 1;
      setSeverityAns(sev);
      finish(sev);
      return;
    }
    setAnswers((a) => ({ ...a, [key]: idx + 1 }));
    advance();
  }

  function advance() {
    if (step < ALL_STEPS.length - 1) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

  const key = ALL_STEPS[step];
  const wrap = { maxWidth: 560, margin: '0 auto', padding: '48px 24px 80px' };

  if (key === 'intake') {
    return (
      <div style={wrap}>
        <StepLabel step={step} total={ALL_STEPS.length} />
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 21, marginBottom: 18 }}>A little about you first</h2>
        {['name', 'business', 'email'].map((f) => (
          <input
            key={f}
            placeholder={f === 'name' ? 'Your name' : f === 'business' ? 'Business name' : 'Email'}
            value={intake[f]}
            type={f === 'email' ? 'email' : 'text'}
            onChange={(e) => setIntake((v) => ({ ...v, [f]: e.target.value }))}
            style={inputStyle}
          />
        ))}
        <button className="btn-primary" disabled={!intake.name || !intake.email} onClick={advance} style={{ marginTop: 8 }}>
          Continue
        </button>
      </div>
    );
  }

  if (key === 'packageInfo') {
    return (
      <div style={wrap}>
        <StepLabel step={step} total={ALL_STEPS.length} />
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 21, marginBottom: 8 }}>Now, your actual pricing</h2>
        <p style={{ fontSize: 13.5, color: 'var(--espresso-70)', marginBottom: 18 }}>
          This is what turns the report from generic advice into something using your real numbers.
        </p>
        <label style={labelStyle}>What's your main package's price?</label>
        <input placeholder="e.g. 3800" type="number" value={intake.packagePrice}
          onChange={(e) => setIntake((v) => ({ ...v, packagePrice: e.target.value }))} style={inputStyle} />
        <label style={labelStyle}>What's included in that package?</label>
        <input placeholder="e.g. 8hr coverage, second shooter, sneak peek, full album" value={intake.packageIncludes}
          onChange={(e) => setIntake((v) => ({ ...v, packageIncludes: e.target.value }))} style={inputStyle} />
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn-primary" onClick={advance}>Continue</button>
          <BackButton onClick={back} />
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--espresso-45)', marginTop: 10 }}>
          You can skip this and the report will use an example price instead.
        </div>
      </div>
    );
  }

  let qText, qOptions;
  if (key === 'filter') { qText = FILTER_Q.text; qOptions = FILTER_Q.options; }
  else if (key === 'severity') { qText = SEVERITY_Q.text; qOptions = SEVERITY_Q.options; }
  else { qText = DIMENSIONS[key].question; qOptions = DIMENSIONS[key].options; }

  return (
    <div style={wrap}>
      <StepLabel step={step} total={ALL_STEPS.length} />
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 20, marginBottom: 20, lineHeight: 1.4 }}>{qText}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {qOptions.map((opt, i) => (
          <button
            key={i}
            onClick={() => selectOption(key, i)}
            disabled={submitting}
            style={{
              textAlign: 'left', padding: '14px 16px', borderRadius: 12,
              border: '1px solid var(--border)', background: '#fff', fontSize: 14, cursor: 'pointer',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
      <BackButton onClick={back} />
      {submitting && <div style={{ fontSize: 12.5, color: 'var(--espresso-45)', marginTop: 12 }}>Saving your answers…</div>}
    </div>
  );
}

function StepLabel({ step, total }) {
  return <div style={{ fontSize: 12, color: 'var(--espresso-45)', marginBottom: 16 }}>Step {step + 1} of {total}</div>;
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', color: 'var(--espresso-45)', fontSize: 13,
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0,
    }}>
      <ArrowLeft size={14} /> Back
    </button>
  );
}

const inputStyle = {
  display: 'block', width: '100%', padding: '11px 14px', marginBottom: 12,
  borderRadius: 10, border: '1px solid var(--border)', fontSize: 14,
};
const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--espresso-70)', display: 'block', marginBottom: 6 };
