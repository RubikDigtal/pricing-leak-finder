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
        <div style={{ fontSize: 11, color: 'var(--espresso-45)', marginTop: 6 }}>Justify, or discount \u2014 without knowing the real objection.</div>
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
        <span style={{ color: 'var(--coral-deep)' }}>proof shown here \u2014 too late</span>
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
    <div className="diagram-row">
      <Box label="Most Photographers" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)" caption="Same starting point, different habit.">
        <div style={{ fontSize: 13 }}>Reacts in the moment</div>
      </Box>
      <Arrow />
      <Box label="Top Performers" labelColor="var(--mint)" bg="var(--mint-light)" border="rgba(110,168,140,.3)" caption="The habit, practiced in advance.">
        <div style={{ fontSize: 13 }}>Builds the habit beforehand</div>
      </Box>
    </div>
  );
}

export function RiskDiagram() {
  return (
    <div className="diagram-row">
      <Box label="Now" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)" caption="A booking or a discount here and there.">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--coral-deep)' }} />
        </div>
      </Box>
      <Arrow />
      <Box label="As You Grow" labelColor="var(--coral-deep)" bg="var(--coral-light)" border="rgba(201,105,76,.3)" caption="Same rate, bigger number.">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--coral-deep)' }} />
        </div>
      </Box>
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
