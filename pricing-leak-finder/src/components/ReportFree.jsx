import React from 'react';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { DIMENSIONS, COMPOUNDS, FRAMING, RISK, CTA_CHECKLIST } from '../data/content.js';
import { Card, SectionTag, CapText, WhyItMatters } from './ui.jsx';
import { DIAGRAM_MAP, FramingDiagram, IndustryDiagram, TopPerformersDiagram, RiskDiagram } from './diagrams.jsx';

export default function ReportFree({ intake, ranking, confidence, priceLabel, sub, onUnlock }) {
  const primaryIsCompound = ranking.primaryIsCompound;
  const primaryDim = primaryIsCompound ? null : DIMENSIONS[ranking.primary];
  const compound = primaryIsCompound ? COMPOUNDS[ranking.compoundKey] : null;
  const primaryContent = primaryIsCompound ? compound : primaryDim;
  const primaryLabel = primaryIsCompound ? compound.name : primaryDim.name;
  const PrimaryIcon = primaryIsCompound ? DIMENSIONS[ranking.primary[0]].icon : primaryDim.icon;
  const healthiest = [...ranking.entries].sort((a, b) => a[1] - b[1])[0][0];
  const Diagram = DIAGRAM_MAP[primaryContent.diagram];

  return (
    <>
      {intake.packagePrice && (
        <Card style={{ marginBottom: 16, background: 'var(--cream-2)', border: 'none' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--espresso-45)', textTransform: 'uppercase', marginBottom: 6 }}>Using Your Real Numbers</div>
          <div style={{ fontSize: 13, color: 'var(--espresso-70)' }}>
            Your package: <b style={{ color: 'var(--espresso)' }}>{priceLabel}</b>
            {intake.packageIncludes ? <> — {intake.packageIncludes}</> : ''}. Everything below is written against this, not a generic example.
          </div>
        </Card>
      )}

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--coral-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <PrimaryIcon size={26} color="var(--coral-deep)" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--espresso-45)', fontWeight: 700, textTransform: 'uppercase' }}>
              {primaryIsCompound ? 'Primary Leak · Compound' : 'Primary Leak'}
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 600 }}>{primaryLabel}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, color: 'var(--coral-deep)' }}>{confidence.conf}%</div>
            <div style={{ fontSize: 10.5, color: 'var(--espresso-45)', fontWeight: 700 }}>{confidence.tier.label}</div>
          </div>
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--border)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--espresso-70)' }}>
          <Lock size={14} /> 1 additional finding is waiting in your full report.
        </div>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>What This Replaces</SectionTag>
        <div style={{ marginBottom: 14 }}><FramingDiagram /></div>
        <div style={{ fontWeight: 600, fontSize: 15.5, marginBottom: 8 }}>{FRAMING.title}</div>
        <CapText>{FRAMING.text}</CapText>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>The Leak</SectionTag>
        {Diagram && (
          <div style={{ marginBottom: 14 }}>
            <Diagram price={priceLabel} />
          </div>
        )}
        <div style={{ fontWeight: 600, fontSize: 15.5, marginBottom: 8 }}>{sub(primaryContent.leak)}</div>
        <CapText>{sub(primaryContent.why)}</CapText>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Why It Matters</SectionTag>
        <WhyItMatters symptom={primaryContent.symptom} rootCause={primaryContent.rootCause} />
        {!primaryIsCompound && (
          <p style={{ fontSize: 13.5, color: 'var(--espresso-70)', lineHeight: 1.6, marginTop: 14 }}>
            {sub(primaryDim.hiddenCost)}
          </p>
        )}
      </Card>

      {!primaryIsCompound && (
        <Card style={{ marginBottom: 16 }}>
          <SectionTag>What This Sounds Like</SectionTag>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            {primaryDim.soundsLines.map((line, i) => (
              line.who === 'note' ? (
                <div key={i} style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--espresso-45)', padding: '2px 0' }}>
                  {sub(line.text)}
                </div>
              ) : (
                <div key={i} style={{
                  maxWidth: '85%', padding: '10px 14px', borderRadius: 12, fontSize: 13,
                  alignSelf: line.who === 'them' ? 'flex-end' : 'flex-start',
                  background: line.who === 'them' ? 'var(--espresso)' : 'var(--cream-2)',
                  color: line.who === 'them' ? 'var(--cream)' : 'var(--espresso)',
                }}>
                  {line.who === 'you' ? 'You: ' : 'Them: '}{sub(line.text)}
                </div>
              )
            ))}
          </div>
          <CapText>{sub(primaryDim.soundsNote)}</CapText>
        </Card>
      )}

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Common In Your Industry</SectionTag>
        <IndustryDiagram />
        <CapText>{sub(primaryContent.industry)}</CapText>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>How Top Performers Handle This Differently</SectionTag>
        <TopPerformersDiagram />
        <CapText>{sub(primaryContent.topPerformers)}</CapText>
      </Card>

      <Card style={{ marginBottom: 16, background: 'var(--mint-light)', border: 'none' }}>
        <SectionTag dotColor="var(--mint)">What You're Already Doing Well</SectionTag>
        <CapText>
          <b>{DIMENSIONS[healthiest].name}</b> is your healthiest dimension right now — worth knowing so effort doesn't get spent rebuilding something that isn't broken.
        </CapText>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Your Risk If Unaddressed</SectionTag>
        <div style={{ marginBottom: 14 }}><RiskDiagram /></div>
        <div style={{ fontWeight: 600, fontSize: 15.5, marginBottom: 8 }}>{RISK.title}</div>
        <CapText>{RISK.text}</CapText>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <SectionTag>Severity, At A Glance</SectionTag>
        <div style={{
          height: 10, borderRadius: 8, margin: '16px 0 8px', position: 'relative',
          background: 'linear-gradient(90deg, var(--mint), var(--amber), var(--coral), var(--coral-deep))',
        }}>
          <div style={{
            position: 'absolute', left: `${confidence.conf}%`, top: -5, width: 20, height: 20,
            borderRadius: '50%', background: '#fff', border: '4px solid var(--coral-deep)',
            boxShadow: '0 2px 6px rgba(58,42,30,.25)', transform: 'translateX(-50%)',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--espresso-45)', fontWeight: 700 }}>
          <span>Early</span><span>Active</span><span>Compounding</span><span>Severe</span>
        </div>
      </Card>

      <div className="no-print" style={{ textAlign: 'center', padding: '20px 0 40px' }}>
        <Sparkles size={30} color="var(--mint)" style={{ marginBottom: 10 }} />
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, marginBottom: 8 }}>Diagnosis complete.</h3>
        <p style={{ fontSize: 13.5, color: 'var(--espresso-70)', maxWidth: 480, margin: '0 auto 18px' }}>
          Knowing the leak is one thing. Here's what's waiting in the full Prescription — built specifically around your Primary and Secondary Leak, not a generic add-on:
        </p>
        <div style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto 22px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 22px' }}>
          {CTA_CHECKLIST.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < CTA_CHECKLIST.length - 1 ? 10 : 0 }}>
              <CheckCircle2 size={16} color="var(--mint)" style={{ flex: 'none', marginTop: 2 }} />
              <span style={{ fontSize: 12.5, color: 'var(--espresso-70)', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={onUnlock}>
          Unlock the full Prescription — $19
        </button>
      </div>
    </>
  );
}
