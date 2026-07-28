import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  DIMENSIONS, COMPOUNDS, ARCHETYPES, ARCHETYPE_DETAIL, OBJECTIONS, TRADE_MENU,
  PRE_ANCHORING, SIGNAL_GUIDE, WALK_AWAY, CHANNEL_VERSIONS, SIMULATIONS,
  TIER_STRATEGY, FOLLOW_UP_SEQUENCE, REFERRAL_ASK, PRE_SEND_CHECKLIST,
} from '../data/content.js';
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
  const flowchart = primaryContent.flowchart || [];
  const includesAnchoring = ranking.entries.slice(0, 2).some(([k]) => k === 'anchoring') ||
    (Array.isArray(ranking.primary) && ranking.primary.includes('anchoring'));

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
        <p style={{ fontSize: 12.5, color: 'var(--espresso-70)', marginTop: 4, marginBottom: 16 }}>
          The <b>shaded band</b> on each bar is the healthy range — where most photographers who aren't losing money on that specific thing tend to land. The <b>dot</b> is where you actually are.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          {ranking.entries.map(([k, v]) => {
            const isHighlighted = k === ranking.primary || (Array.isArray(ranking.primary) && ranking.primary.includes(k)) || k === ranking.secondary;
            return (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--espresso-70)' }}>{DIMENSIONS[k].name}</div>
                <div style={{ height: 8, background: 'var(--cream-2)', borderRadius: 6, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '4%', width: '34%', top: 0, bottom: 0,
                    background: 'var(--mint-light)', borderRadius: 6,
                  }} />
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
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
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
        {ARCHETYPE_DETAIL[archetype.primary] && (
          <div style={{ background: 'var(--cream-2)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{ARCHETYPE_DETAIL[archetype.primary].title}</div>
            <p style={{ fontSize: 13, color: 'var(--espresso-70)', lineHeight: 1.6, margin: 0 }}>{ARCHETYPE_DETAIL[archetype.primary].text}</p>
          </div>
        )}
      </Card>

      {/* PRE-CONVERSATION STRATEGY */}
      <SectionHeading eyebrow="Before The Price Ever Comes Up" title="What happens upstream of the leak" />

      <Card style={{ marginBottom: 14 }}>
        <SectionTag>{PRE_ANCHORING.title}</SectionTag>
        <CapText>{sub(PRE_ANCHORING.text)}</CapText>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <SectionTag>Reading The Inquiry Before You Ever Talk</SectionTag>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          {SIGNAL_GUIDE.map((s, i) => {
            const a = ARCHETYPES[s.archetype];
            const AIcon = a.icon;
            return (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--archetype-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <AIcon size={16} color="var(--archetype)" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--espresso-70)' }}>{s.signal}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <SectionTag>{WALK_AWAY.title}</SectionTag>
        <CapText>{WALK_AWAY.text}</CapText>
      </Card>

      {/* ARCHETYPE-MATCHED TEMPLATES */}
      <SectionHeading eyebrow="Matched To Who You're Actually Talking To" title="A different script for each type of couple" />
      {Object.entries(primaryContent.archetypeTemplates || {}).map(([key, tmpl]) => {
        const a = ARCHETYPES[key];
        const AIcon = a.icon;
        return (
          <Card key={key} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <AIcon size={18} color="var(--archetype)" />
              <div style={{ fontWeight: 700, fontSize: 13 }}>{a.name}</div>
            </div>
            <div style={{ background: 'var(--mint-light)', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: 10 }}>{sub(tmpl.line)}</div>
            <p style={{ fontSize: 12.5, color: 'var(--espresso-70)', lineHeight: 1.55, margin: 0 }}>{sub(tmpl.why)}</p>
          </Card>
        );
      })}

      {/* CHANNEL-SPECIFIC VERSIONS */}
      <SectionHeading eyebrow="Same Script, Different Channel" title="The delivery mechanics change by where you're saying it" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
        {CHANNEL_VERSIONS.map((c, i) => (
          <Card key={i}>
            <div style={{ fontWeight: 700, fontSize: 12.5, textTransform: 'uppercase', marginBottom: 8 }}>{c.name}</div>
            <p style={{ fontSize: 12, color: 'var(--espresso-70)', lineHeight: 1.55, margin: 0 }}>{c.text}</p>
          </Card>
        ))}
      </div>

      {/* PRESCRIPTION */}
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

      {/* OBJECTION LIBRARY */}
      <SectionHeading eyebrow="The Objection Library" title="What they actually say, and what to say back" />
      {[...OBJECTIONS.filter((o) => o.featured), ...OBJECTIONS.filter((o) => !o.featured)].map((o, i) => (
        <Card key={i} style={{ marginBottom: 12, background: 'var(--cream-2)', border: 'none' }}>
          {o.featured && (
            <div style={{
              display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase',
              background: 'var(--coral-deep)', color: '#fff', padding: '3px 10px', borderRadius: 20, marginBottom: 12,
            }}>
              Handle This One Carefully
            </div>
          )}
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--coral-deep)', textTransform: 'uppercase', marginBottom: 4 }}>They Say</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, marginBottom: 12 }}>{sub(o.q)}</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--mint)', textTransform: 'uppercase', marginBottom: 4 }}>You Say</div>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, marginBottom: 12 }}>{sub(o.a)}</div>
          <p style={{ fontSize: 12.5, color: 'var(--espresso-70)', lineHeight: 1.55, margin: 0 }}>{sub(o.why)}</p>
        </Card>
      ))}

      {/* SIMULATIONS */}
      <SectionHeading eyebrow="Full Conversations, Start To Finish" title="Four scenarios, played out" />
      {SIMULATIONS.map((sim, i) => (
        <Card key={i} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--espresso)', color: 'var(--cream)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{i + 1}</div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 14.5 }}>{sim.title}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sim.lines.map((l, j) => (
              l.who === 'note' ? (
                <div key={j} style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--espresso-45)', padding: '2px 0' }}>{sub(l.text)}</div>
              ) : (
                <div key={j} style={{
                  maxWidth: '85%', padding: '8px 12px', borderRadius: 12, fontSize: 12.5,
                  alignSelf: l.who === 'them' ? 'flex-end' : 'flex-start',
                  background: l.who === 'them' ? 'var(--espresso)' : 'var(--cream-2)',
                  color: l.who === 'them' ? 'var(--cream)' : 'var(--espresso)',
                }}>
                  {l.who === 'you' ? 'You: ' : l.who === 'them' ? 'Them: ' : ''}{sub(l.text)}
                </div>
              )
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)', fontSize: 12.5, color: 'var(--espresso-70)' }}>
            <b style={{ color: 'var(--espresso)' }}>The takeaway:</b> {sim.takeaway}
          </div>
        </Card>
      ))}

      {/* TRADE MENU */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTag>Trade-Offer Menu</SectionTag>
        <p style={{ fontSize: 12.5, color: 'var(--espresso-70)', marginBottom: 12 }}>If you're going to move the price, trade for something instead of a bare cut:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {TRADE_MENU.map((t, i) => (
            <div key={i} style={{ background: 'var(--mint-light)', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 5 }}>{t.name}</div>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 11.5, color: 'var(--espresso)', lineHeight: 1.5, marginBottom: 8 }}>{sub(t.line)}</div>
              <div style={{ fontSize: 11, color: 'var(--espresso-70)', lineHeight: 1.5 }}>{sub(t.why)}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* TIER STRATEGY */}
      {includesAnchoring && (
        <Card style={{ marginBottom: 16 }}>
          <SectionTag>{TIER_STRATEGY.title}</SectionTag>
          <CapText>{sub(TIER_STRATEGY.text)}</CapText>
        </Card>
      )}

      {/* FOLLOW-UP SEQUENCE */}
      <SectionHeading eyebrow="After The Conversation" title="Re-engaging the ones who went quiet" />
      <Card style={{ marginBottom: 16 }}>
        {FOLLOW_UP_SEQUENCE.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--coral-deep)', width: 60, flex: 'none' }}>{f.day}</div>
            <div style={{ fontSize: 12.5, color: 'var(--espresso-70)', lineHeight: 1.55 }}>{f.text}</div>
          </div>
        ))}
      </Card>

      {/* REFERRAL ASK */}
      <Card style={{ marginBottom: 16 }}>
        <SectionTag>{REFERRAL_ASK.title}</SectionTag>
        <CapText>{REFERRAL_ASK.text}</CapText>
        <div style={{ background: 'var(--mint-light)', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
          "{REFERRAL_ASK.script}"
        </div>
      </Card>

      {/* TROUBLESHOOTING FLOWCHART */}
      {flowchart.length > 0 && (
        <>
          <SectionHeading eyebrow="If The Fix Isn't Working" title="A real troubleshooting path, not just one guess" />
          <Card style={{ marginBottom: 16 }}>
            {flowchart.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--coral-deep)', textTransform: 'uppercase', width: 110, flex: 'none' }}>{f.when}</div>
                <div style={{ fontSize: 12.5, color: 'var(--espresso-70)', lineHeight: 1.55 }}>{sub(f.then)}</div>
              </div>
            ))}
          </Card>
        </>
      )}

      {/* CHEAT SHEET */}
      <Card style={{ background: 'var(--espresso)', color: 'var(--cream)', border: 'none', marginBottom: 16 }}>
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

      {/* PRE-SEND CHECKLIST */}
      <SectionHeading eyebrow="Before Your Next Conversation" title="Pre-send checklist" />
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PRE_SEND_CHECKLIST.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, border: '1.5px solid var(--mint)', background: 'var(--mint-light)', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                <CheckCircle2 size={12} color="var(--mint)" />
              </div>
              <span style={{ fontSize: 13, color: 'var(--espresso)' }}>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* TRACKER */}
      <SectionHeading eyebrow="Put This Into Practice" title="Your next 3 quotes" />
      <Card>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', padding: '12px 0', borderTop: n > 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ flex: '1 1 140px', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: 'var(--espresso-45)', background: 'var(--cream-2)' }}>Couple / date</div>
            <TrackerCheck label="Stack sent" />
            <TrackerCheck label="Price + pause" />
            <TrackerCheck label="Objection handled" />
          </div>
        ))}
      </Card>
    </>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div style={{ margin: '28px 0 14px' }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--coral-deep)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{eyebrow}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600 }}>{title}</div>
    </div>
  );
}

function TrackerCheck({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--espresso-70)' }}>
      <div style={{ width: 15, height: 15, borderRadius: 4, border: '1.5px solid var(--border)' }} />
      {label}
    </div>
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
