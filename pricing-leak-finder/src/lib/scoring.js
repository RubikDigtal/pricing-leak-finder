import { QUESTION_ORDER, CHAIN_ORDER, TIERS } from '../data/content.js';

export function computeRanking(scores) {
  const entries = QUESTION_ORDER.map((k) => [k, scores[k]]).sort(
    (a, b) => b[1] - a[1] || CHAIN_ORDER[a[0]] - CHAIN_ORDER[b[0]]
  );
  const [top1, top2] = entries;

  const isCompoundPair = (a, b) =>
    (a === 'delivery' && b === 'defense') ||
    (a === 'defense' && b === 'delivery') ||
    (a === 'packaging' && b === 'discountReflex') ||
    (a === 'discountReflex' && b === 'packaging');

  let primary, secondary, primaryIsCompound = false, compoundKey = null;

  if (top1[1] === top2[1] && isCompoundPair(top1[0], top2[0])) {
    primaryIsCompound = true;
    compoundKey = top1[0] === 'delivery' || top1[0] === 'defense' ? 'deliveryDefense' : 'packagingDiscountReflex';
    primary = [top1[0], top2[0]];
    secondary = entries[2][0];
  } else {
    primary = top1[0];
    secondary = top2[0];
    if (isCompoundPair(primary, secondary)) {
      compoundKey = primary === 'delivery' || primary === 'defense' ? 'deliveryDefense' : 'packagingDiscountReflex';
    }
  }

  return { primary, secondary, primaryIsCompound, compoundKey, entries };
}

export function computeConfidence(scores, severity) {
  const pct = (v) => ((v - 1) / 3) * 100;
  const avgAll = QUESTION_ORDER.reduce((s, k) => s + scores[k], 0) / QUESTION_ORDER.length;
  const conf = Math.round(0.4 * pct(severity) + 0.4 * pct(avgAll) + 0.2 * pct(scores.discountReflex));
  const tier = TIERS.find((t) => conf < t.max);
  return { conf, tier };
}

export function computeArchetype(scores) {
  const vals = { defense: scores.defense, discountReflex: scores.discountReflex, proofTiming: scores.proofTiming };
  const ranked = Object.entries(vals).sort((a, b) => b[1] - a[1]);
  const mapPrimary = { discountReflex: 'stickerShock', defense: 'spreadsheet', proofTiming: 'socialProof' };

  const top = ranked[0][1] <= 2 ? 'knowsWhatTheyWant' : mapPrimary[ranked[0][0]];
  let second = ranked[1][1] <= 2 ? 'alreadySold' : mapPrimary[ranked[1][0]];
  if (second === top) second = 'alreadySold';

  return { primary: top, secondary: second };
}
