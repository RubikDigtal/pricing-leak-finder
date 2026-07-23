import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { DIMENSIONS, COMPOUNDS, ARCHETYPES, OBJECTIONS, TRADE_MENU } from '../data/content.js';
import { Card, SectionTag, CapText } from './ui.jsx';

export default function ReportPaid({ intake, ranking, archetype, priceLabel, sub }) {
  const primaryIsCompound = ranking.primaryIsCompound;
  const primaryDim = primaryIsCompound ? null : DIMENSIONS[ranking.primary];
  const compound = primaryIsCompound ? COMPOUNDS[ranking.compoundKey] : COMPOUNDS[ranking.compoundKey] || null;
  const primaryContent = primaryIsCompound ? compound : primaryDim;
  const primaryLabel = primaryIsCompound ? compound.name : primaryDim.name;
  const secondaryDim = DIMENSIONS[ranking.secondary];
  const primaryArchetype = ARCHETYPES[archetype.primary];
  const secondaryArchetype = ARCHETYPES[archetype.secondary];

  return (
    <>
      <div style={{
        background: 'linear-gradient(120deg, var(--espresso), #4A3627)', color: 'var(--cream)',
        borderRadius: 16, padding: '16px 20px', marginBottom: 20, fontSize: 13,
      }}>
        <b style={{ color: 'var(--mint)' }}>Unlocked</b> — everything below is yours now.
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Secondary Leak</SectionTag>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{secondaryDim.name}</div>
        <CapText>{sub(secondaryDim.leak)}</CapText>
      </Card>

      {compound && (
        <Card style={{ marginBottom: 16 }}>
          <SectionTag>How They Connect</SectionTag>
          <div style={{ fontStyle: 'italic', fontFamily: 'var(--serif)', fontSize: 14, marginBottom: 10 }}>{sub(compound.leak)}</div>
          <CapText>{sub(compound.why)}</CapText>
        </Card>
      )}

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Full Read — Where You Land On All Six</SectionTag>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {ranking.entries.map(([k, v]) => {
            const isHighlighted = k === ranking.primary || (Array.isArray(ranking.primary) && ranking.primary.includes(k)) || k === ranking.secondary;
            return (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--espresso-70)' }}>{DIMENSIONS[k].name}</div>
                <div style={{ height: 8, background: 'var(--cream-2)', borderRadius: 6, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: `${((v - 1) / 3) * 100}%`, top: -3, width: 14, height: 14,
                    borderRadius: '50%', border: '2px solid #fff',
                    background: isHighlighted ? 'var(--coral-deep)' : 'var(--espresso-45)',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Client Type Read</SectionTag>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          {[primaryArchetype, secondaryArchetype].map((a, i) => {
            const AIcon = a.icon;
            return (
              <div key={i} style={{ flex: '1 1 140px', textAlign: 'center', background: i === 0 ? 'var(--archetype-light)' : 'var(--cream-2)', borderRadius: 12, padding: '14px 10px' }}>
                <AIcon size={20} color="var(--archetype)" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--archetype)', marginBottom: 4 }}>{i === 0 ? 'PRIMARY MATCH' : 'SECONDARY LEAN'}</div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 13 }}>{a.name}</div>
                <div style={{ fontSize: 11, color: 'var(--espresso-70)', marginTop: 4 }}>{a.line}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--coral-deep)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '20px 0 10px' }}>
        Prescription · {primaryLabel}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <Card>
          <Badge color="coral">Today</Badge>
          <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0 }}>{sub(primaryContent.quickWin)}</p>
        </Card>
        <Card>
          <Badge color="mint">This Month</Badge>
          <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0 }}>{sub(primaryContent.longTerm)}</p>
        </Card>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag dotColor="var(--mint)">Message Template</SectionTag>
        <SwipeRow tag="BEFORE" color="var(--coral-deep)" bg="var(--cream-2)" text={sub(primaryContent.before)} />
        <SwipeRow tag="AFTER" color="var(--mint)" bg="var(--mint-light)" text={sub(primaryContent.after)} />
      </Card>

      {!primaryIsCompound && (
        <Card style={{ marginBottom: 16 }}>
          <Badge color="archetype">What Not To Do</Badge>
          <p style={{ fontSize: 13, lineHeight: 1.55, margin: '10px 0 12px' }}>{sub(primaryDim.whatNot)}</p>
          <div style={{ background: 'var(--cream-2)', borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--espresso-45)', textTransform: 'uppercase', marginBottom: 6 }}>If This Doesn't Work</div>
            <p style={{ fontSize: 12.5, color: 'var(--espresso-70)', margin: 0 }}>{sub(primaryDim.ifNotWork)}</p>
          </div>
        </Card>
      )}

      {!primaryIsCompound && (
        <Card style={{ marginBottom: 16 }}>
          <SectionTag dotColor="var(--mint)">Signs It's Working</SectionTag>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <CheckCircle2 size={18} color="var(--mint)" style={{ flex: 'none', marginTop: 2 }} />
            <p style={{ fontSize: 13, color: 'var(--espresso-70)', margin: 0 }}>{sub(primaryDim.signs)}</p>
          </div>
        </Card>
      )}

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Objection Library</SectionTag>
        {OBJECTIONS.map((o, i) => (
          <div key={i} style={{ padding: '12px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, marginBottom: 4 }}>{o.q}</div>
            <div style={{ fontSize: 12.5, color: 'var(--espresso-70)' }}>{o.a}</div>
          </div>
        ))}
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Trade-Offer Menu</SectionTag>
        <p style={{ fontSize: 12.5, color: 'var(--espresso-70)', marginBottom: 12 }}>If you're going to move the price, trade for something instead of a bare cut:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {TRADE_MENU.map((t, i) => (
            <div key={i} style={{ background: 'var(--mint-light)', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>{t.name}</div>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 11.5, color: 'var(--espresso-70)', lineHeight: 1.5 }}>{t.line}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ background: 'var(--espresso)', color: 'var(--cream)', border: 'none' }}>
        <div style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--coral-light)', fontWeight: 700, marginBottom: 14 }}>
          Cheat Sheet — {intake.business || 'Your Business'}
        </div>
        <div style={{ borderBottom: '1px solid rgba(246,240,227,.15)', paddingBottom: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(246,240,227,.55)', marginBottom: 4, textTransform: 'uppercase' }}>Say The Price Like This</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13 }}>{sub(primaryContent.after)}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(246,240,227,.55)', marginBottom: 4, textTransform: 'uppercase' }}>First Response To Pushback</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13 }}>"What makes you say that?" — then stay quiet.</div>
        </div>
      </Card>
    </>
  );
}

function Badge({ children, color }) {
  const map = {
    coral: { bg: 'var(--coral-light)', fg: 'var(--coral-deep)' },
    mint: { bg: 'var(--mint-light)', fg: 'var(--mint)' },
    archetype: { bg: 'var(--archetype-light)', fg: 'var(--archetype)' },
  };
  const c = map[color];
  return (
    <div style={{
      display: 'inline-block', background: c.bg, color: c.fg, fontSize: 10.5, fontWeight: 700,
      padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

function SwipeRow({ tag, color, bg, text }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color, width: 50, flex: 'none', paddingTop: 8 }}>{tag}</div>
      <div style={{ background: bg, borderRadius: 10, padding: '8px 12px', fontSize: 13, flex: 1 }}>{text}</div>
    </div>
  );
}
