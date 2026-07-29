import React from 'react';
import { ArrowRight, Droplets, Lock, Tag, MessageCircle, Shield, TrendingDown } from 'lucide-react';

function Box({ label, labelColor, bg, border, children, caption }) {
  return (
    <div className="diagram-box" style={{ background: bg, border: `1px solid ${border}` }}>
      <div className="diagram-box-label" style={{ color: labelColor }}>{label}</div>
      {children}
      {caption && <div className="diagram-caption">{caption}</div>}
    </div>
  );
}

function Arrow() {
  return (
    <div className="diagram-arrow">
      <ArrowRight size={18} color="var(--espresso-45)" />
    </div>
  );
}

export function PackagingDiagram({ price }) {
  return (
    <div className="diagram-row">
      <Box label="What They Hear" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)" caption="A number. Nothing underneath it.">
        <div className="diagram-price" style={{ color: 'var(--coral-deep)' }}>{price}</div>
      </Box>
      <Arrow />
      <Box label="What Builds Trust" labelColor="var(--mint)" bg="var(--mint-light)" border="rgba(110,168,140,.3)" caption="Same price. A reason for every dollar.">
        <div className="diagram-stack-item"><span>8hr coverage</span></div>
        <div className="diagram-stack-item"><span>2nd shooter</span></div>
        <div className="diagram-stack-item"><span>Sneak peek</span></div>
        <div className="diagram-stack-item"><span>{price} total</span></div>
      </Box>
    </div>
  );
}

export function AnchoringDiagram({ price }) {
  return (
    <div className="diagram-row">
      <Box label="One Price" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)" caption="Yes, or no. Nothing else.">
        <div className="diagram-price" style={{ color: 'var(--coral-deep)' }}>{price}</div>
      </Box>
      <Arrow />
      <Box label="Three Options" labelColor="var(--mint)" bg="var(--mint-light)" border="rgba(110,168,140,.3)" caption="A real choice, not a verdict.">
        <div className="diagram-tier-bars">
          <div className="diagram-tier-bar" style={{ height: '45%', background: 'var(--mint)', opacity: 0.6 }} />
          <div className="diagram-tier-bar" style={{ height: '75%', background: 'var(--mint)' }} />
          <div className="diagram-tier-bar" style={{ height: '100%', background: 'var(--mint)', opacity: 0.85 }} />
        </div>
        <div className="diagram-tier-labels">
          <div>Essentials</div><div>Signature</div><div>Premium</div>
        </div>
      </Box>
    </div>
  );
}

export function DeliveryDiagram({ price }) {
  return (
    <div className="diagram-row">
      <Box label="Said With A Flinch" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)">
        <div style={{ fontSize: 13, lineHeight: 1.5 }}>"So it's, um, {price}, but I'm flexible..."</div>
      </Box>
      <Arrow />
      <Box label="Said Once, Then Silence" labelColor="var(--mint)" bg="var(--mint-light)" border="rgba(110,168,140,.3)" caption="...then nothing else.">
        <div className="diagram-price" style={{ color: 'var(--mint)', fontSize: 18 }}>"{price}."</div>
      </Box>
    </div>
  );
}

export function DefenseDiagram() {
  return (
    <div className="diagram-row">
      <Box label="Guessing" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)">
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>"Well, the chef trained in Paris..."</div>
        <div style={{ fontSize: 11, color: 'var(--espresso-70)', marginTop: 6 }}>Justify, or discount — without knowing the real objection.</div>
      </Box>
      <Arrow />
      <Box label="Asking First" labelColor="var(--mint)" bg="var(--mint-light)" border="rgba(110,168,140,.3)">
        <div style={{ fontSize: 13, fontWeight: 600 }}>"What makes you say that?"</div>
        <div style={{ fontSize: 11, color: 'var(--espresso-45)', marginTop: 6 }}>Then real silence, until they answer.</div>
      </Box>
    </div>
  );
}

export function DiscountReflexDiagram() {
  return (
    <div className="diagram-row">
      <Box label="Before They Even Object" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)" caption="Price drips away on its own.">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <Droplets size={30} color="var(--coral-deep)" />
        </div>
      </Box>
      <Arrow />
      <Box label="A Held Price" labelColor="var(--mint)" bg="var(--mint-light)" border="rgba(110,168,140,.3)" caption="Nothing leaves without a trade.">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
          <Lock size={30} color="var(--mint)" />
        </div>
      </Box>
    </div>
  );
}

export function ProofTimingDiagram() {
  return (
    <div style={{ padding: '4px 0' }}>
      <div className="diagram-timeline">
        <div className="diagram-timeline-dot" style={{ background: 'var(--mint)', opacity: 0.4, marginLeft: '8%' }} />
        <div style={{ flex: 1 }} />
        <div className="diagram-timeline-dot" style={{ background: 'var(--mint)', opacity: 0.4, marginLeft: 10 }} />
        <div style={{ flex: 1 }} />
        <div className="diagram-timeline-dot" style={{ background: 'var(--coral-deep)', width: 14, height: 14, marginLeft: 10 }} />
        <div style={{ flex: 1 }} />
        <div className="diagram-timeline-dot" style={{ background: 'var(--coral)', marginLeft: 10 }} />
        <div style={{ flex: 1 }} />
        <div className="diagram-timeline-dot" style={{ background: 'var(--coral)', marginLeft: 10, marginRight: '8%' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, marginTop: 6 }}>
        <span style={{ color: 'var(--mint)', opacity: 0.6 }}>proof (unused)</span>
        <span style={{ color: 'var(--coral-deep)', fontWeight: 700 }}>THE PRICE</span>
        <span style={{ color: 'var(--coral-deep)' }}>proof shown here — too late</span>
      </div>
    </div>
  );
}

export function PackagingDiscountReflexDiagram() {
  return (
    <div className="diagram-chip-row">
      <div className="diagram-chip">
        <div className="diagram-chip-icon"><Tag size={24} color="var(--coral-deep)" /></div>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Packaging</div>
        <div style={{ fontSize: 11, color: 'var(--espresso-70)' }}>no stack</div>
      </div>
      <Arrow />
      <div className="diagram-chip">
        <div className="diagram-chip-icon"><TrendingDown size={24} color="var(--coral-deep)" /></div>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Discount Reflex</div>
        <div style={{ fontSize: 11, color: 'var(--espresso-70)' }}>nothing to defend</div>
      </div>
    </div>
  );
}

export function DeliveryDefenseDiagram() {
  return (
    <div className="diagram-chip-row">
      <div className="diagram-chip">
        <div className="diagram-chip-icon"><MessageCircle size={24} color="var(--coral-deep)" /></div>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Delivery</div>
        <div style={{ fontSize: 11, color: 'var(--espresso-70)' }}>said with a flinch</div>
      </div>
      <Arrow />
      <div className="diagram-chip">
        <div className="diagram-chip-icon"><Shield size={24} color="var(--coral-deep)" /></div>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Defense</div>
        <div style={{ fontSize: 11, color: 'var(--espresso-70)' }}>meets pushback with retreat</div>
      </div>
    </div>
  );
}

export function FramingDiagram() {
  return (
    <div className="diagram-row">
      <Box label="Consultant" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)" caption="Same read, in person.">
        <div className="diagram-price" style={{ color: 'var(--coral-deep)', fontSize: 20 }}>~45 min</div>
      </Box>
      <Arrow />
      <Box label="This Report" labelColor="var(--mint)" bg="var(--mint-light)" border="rgba(110,168,140,.3)" caption="Same read, right now.">
        <div className="diagram-price" style={{ color: 'var(--mint)', fontSize: 20 }}>~5 min</div>
      </Box>
    </div>
  );
}

export function IndustryDiagram() {
  const dots = [1, 1, 1, 0];
  return (
    <div className="diagram-chip-row" style={{ marginBottom: 4 }}>
      {dots.map((healthy, i) => (
        <div key={i} className="diagram-chip" style={{ maxWidth: 70 }}>
          <div className="diagram-chip-icon" style={{ width: 40, height: 40, background: healthy ? 'var(--coral-light)' : 'var(--mint-light)' }}>
            <Tag size={18} color={healthy ? 'var(--coral-deep)' : 'var(--mint)'} />
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11.5, color: 'var(--espresso-70)', flexBasis: '100%', textAlign: 'center', marginTop: 6 }}>
        Most photographers, one exception.
      </div>
    </div>
  );
}

export function TopPerformersDiagram() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ display: 'inline-block', background: 'var(--cream-2)', borderRadius: 10, padding: '10px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Price stated</div>
          <div style={{ fontSize: 11, color: 'var(--espresso-70)' }}>same moment, either path</div>
        </div>
      </div>
      <div className="fork-branches">
        <div className="fork-branch">
          <div className="fork-branch-label" style={{ color: 'var(--coral-deep)' }}>Most Photographers</div>
          <div className="diagram-box" style={{ background: 'var(--coral-light)', border: '1px solid rgba(201,105,76,.3)' }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Fills the silence</div>
            <div className="diagram-caption">Reacts in the moment.</div>
          </div>
          <ForkArrow color="var(--coral-deep)" />
          <div className="diagram-box" style={{ background: 'var(--coral-light)', border: '1px solid rgba(201,105,76,.3)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--coral-deep)' }}>Discounted, or ghosted</div>
          </div>
        </div>
        <div className="fork-branch">
          <div className="fork-branch-label" style={{ color: 'var(--mint)' }}>Top Performers</div>
          <div className="diagram-box" style={{ background: 'var(--mint-light)', border: '1px solid rgba(110,168,140,.3)' }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Holds the pause</div>
            <div className="diagram-caption">Practiced in advance.</div>
          </div>
          <ForkArrow color="var(--mint)" />
          <div className="diagram-box" style={{ background: 'var(--mint-light)', border: '1px solid rgba(110,168,140,.3)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--mint)' }}>Booked at full price</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForkArrow({ color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </div>
  );
}

export function RiskDiagram({ price, confidencePct }) {
  // Rough monthly-loss estimate: scales with how severe the leak is (5%-20%
  // of one package price per month), then shown cumulatively over time so
  // the bars actually climb — this is an illustrative estimate, framed that
  // way in the caption below, not a precise forecast.
  const factor = 0.05 + (Math.max(0, Math.min(100, confidencePct)) / 100) * 0.15;
  const monthly = Math.round((price * factor) / 10) * 10;
  const bars = [
    { label: 'now', value: monthly },
    { label: '6 months', value: monthly * 6 },
    { label: '12 months', value: monthly * 12 },
  ];
  const max = bars[2].value || 1;
  const fmt = (n) => `$${n.toLocaleString()}`;

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 130, padding: '4px 4px 0' }}>
      {bars.map((b, i) => (
        <div key={i} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--espresso)', marginBottom: 6 }}>{fmt(b.value)}</div>
          <div style={{
            width: '100%',
            height: `${Math.max(16, (b.value / max) * 100)}%`,
            background: i === 0 ? 'var(--coral-light)' : i === 1 ? 'var(--coral)' : 'var(--coral-deep)',
            borderRadius: '6px 6px 0 0',
          }} />
          <div style={{ fontSize: 11, color: 'var(--espresso-70)', marginTop: 8, fontWeight: 600 }}>{b.label}</div>
        </div>
      ))}
    </div>
  );
}

export const DIAGRAM_MAP = {
  packaging: PackagingDiagram,
  anchoring: AnchoringDiagram,
  delivery: DeliveryDiagram,
  defense: DefenseDiagram,
  discountReflex: DiscountReflexDiagram,
  proofTiming: ProofTimingDiagram,
  packagingDiscountReflex: PackagingDiscountReflexDiagram,
  deliveryDefense: DeliveryDefenseDiagram,
};
