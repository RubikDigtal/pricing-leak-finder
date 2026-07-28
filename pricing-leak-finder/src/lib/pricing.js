// The old approach only replaced the exact literal "$3,800" wherever it
// appeared. But content.js has dozens of OTHER hardcoded numbers derived
// from that example price — a counter-offer ("could you do $3,200?"), trade
// amounts ("$300 off"), tier prices, a competitor's lower quote, a smaller
// backup package. None of those scaled with the real price, so a
// photographer entering $1,000 would see a "client" offering to pay $3,300
// — more than the stated price, and nonsensical.
//
// Fix: every content string uses {{TOKEN}} placeholders instead of literal
// numbers. This file computes what each token should actually be, as a
// proportion of the real price, then substitute() replaces them all in one
// pass. Ratios below are calibrated against the $3,800 example so the
// examples still feel realistic at that price point, and scale correctly to
// any other price too.

function fmt(n) {
  const rounded = Math.round(n / 10) * 10; // round to nearest $10, keeps numbers feeling like real quotes
  return `$${rounded.toLocaleString()}`;
}

export function derivePrices(basePrice) {
  const p = basePrice && basePrice > 0 ? basePrice : 3800;

  return {
    PRICE: fmt(p),
    OFFER_HIGH: fmt(p * 0.87),        // a customer's first counter-offer, close to full price
    OFFER_LOW: fmt(p * 0.84),         // a second, lower counter-offer
    TRADE_SMALL: fmt(p * 0.08),       // a modest trade amount (referral, faster deposit)
    TRADE_MED: fmt(p * 0.05),         // a smaller trade amount
    AFTER_TRADE_SMALL: fmt(p * 0.92), // price minus the modest trade
    TIER_LOW: fmt(p * 0.76),          // Essentials tier
    TIER_HIGH: fmt(p * 1.37),         // Premium tier
    COMPETITOR: fmt(p * 0.84),        // a lower competitor quote
    BACKUP: fmt(p * 0.42),            // a smaller, partial-coverage package
    BUDGET_ASSUMED: fmt(p * 0.66),    // a customer's originally assumed (lower) budget
  };
}

export function substitute(text, tokens) {
  if (typeof text !== 'string') return text;
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in tokens ? tokens[key] : match));
}
