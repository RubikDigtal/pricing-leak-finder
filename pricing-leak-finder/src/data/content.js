import { Tag, BarChart3, MessageCircle, Shield, TrendingDown, Clock, CheckCircle2 } from 'lucide-react';

export const DIMENSIONS = {
  packaging: {
    key: 'packaging', name: 'Packaging', icon: Tag, diagram: 'packaging',
    question: 'When someone asks what you charge, what do they actually get back?',
    options: [
      'A price list or menu of packages',
      "A price, plus a quick rundown of what's included",
      'A real walkthrough of value before any number',
      'Honestly, I just say the number',
    ],
    leak: 'You say a price, but you never say what\u2019s inside it.',
    why: 'Think of a lamp with a $20 price tag and nothing else. If someone says "that\u2019s a lot," you have nothing to point to. But if you can say "the bulb is worth $5, the shade is worth $8, the base is worth $7," now there\u2019s something real behind the number. Right now, your price is like that bare $20 tag \u2014 no bulb, no shade, no base, just a number.',
    symptom: 'Let us think about it.',
    rootCause: 'Nothing was given to think about.',
    hiddenCost: 'This isn\u2019t only about people saying "too expensive." It\u2019s about people quietly going quiet. If they can\u2019t tell why your price is different from a cheaper photographer\u2019s price, they don\u2019t argue \u2014 they just pick the cheaper one and never tell you why.',
    soundsLines: [
      { who: 'you', text: '"$3,800 for the day."' },
      { who: 'them', text: '"Okay... let us think about it."' },
    ],
    soundsNote: 'They never said the price was too high. They just picked the option that was easier to understand.',
    tell: 'Check your last five quotes. Did any of them turn into a real question like "what\u2019s included in the album?" If not, people are comparing your number, not your offer \u2014 because they never saw the offer.',
    industry: 'Most photographers who feel the pull to discount are working from a menu \u2014 a name, a number, a bullet list \u2014 without realizing that\u2019s what\u2019s happening. It\u2019s the default format the industry trained everyone into, not a personal failing.',
    topPerformers: 'Photographers who rarely get talked down aren\u2019t better negotiators. They just never leave a couple standing there with nothing but a number to react to \u2014 by the time the price comes up, the couple already knows what they\u2019re paying for.',
    quickWin: 'Write down three things in your package and give each one a made-up dollar value. Say the total out loud before you say the real price \u2014 like "8 hours, a second shooter, and the album add up to $3,800."',
    longTerm: 'Build a one-page list of everything in your package, with a short "why it matters" next to each thing. Send this before every price conversation from now on.',
    before: '"It\u2019s $3,800 for the day."',
    after: '"You\u2019re getting 8 hours of coverage, a second shooter, and your full album \u2014 altogether that\u2019s about $3,800 in value, and that\u2019s your investment."',
    whatNot: 'Don\u2019t just list things without saying what they\u2019re worth \u2014 a long list is still just a list. And don\u2019t rush through it to get to the number faster; the walk-through is doing real work.',
    ifNotWork: 'If people still hesitate after seeing the list, the problem probably isn\u2019t Packaging anymore \u2014 check Delivery or Defense. A good list said nervously, or defended weakly, can still fail.',
    timeToResults: 'Most people notice a change within 3-5 quotes \u2014 not a bigger price accepted, but fewer people going silent after hearing it.',
    signs: 'People start asking specific questions like "what\u2019s in the album?" instead of just accepting or rejecting the number.',
    archetypeTemplates: {
      spreadsheet: 'Give them the breakdown in writing, unprompted \u2014 "Here\u2019s exactly what\u2019s included: 8hr coverage $2,000, second shooter $600, album $1,200 \u2014 $3,800 total." They were going to build this comparison anyway.',
      stickerShock: '"I know $3,800 is more than you might have expected \u2014 can I walk you through what\u2019s actually in it before we talk numbers?" Reset the frame before defending the price.',
      socialProof: '"Here\u2019s what\u2019s included, and here\u2019s what a past couple said about it [testimonial]." Pair the stack with proof.',
      alreadySold: '"Your investment is $3,800, and it includes everything we talked about." Say the stack once, briefly, then move to booking.',
      knowsWhatTheyWant: '"For what you described, that\u2019s $3,800 \u2014 covering the exact things you mentioned." Match the stack directly to their ask.',
    },
    flowchart: [
      { when: 'STILL HESITATING', then: 'If a couple still balks after seeing the stack, check Delivery or Defense \u2014 a well-built stack said with a flinch, or defended weakly once challenged, can still fail.' },
      { when: 'STILL DISCOUNTING', then: 'If the stack is shown but you still cut the price when hesitation shows up, check Discount Reflex \u2014 the stack is doing its job; the habit of caving hasn\u2019t caught up yet.' },
      { when: 'NOTHING\u2019S CHANGED', then: 'If none of the above shift anything after a genuine month of trying, check Proof Timing \u2014 a strong stack without any proof around it is still asking the couple to take your word for it alone.' },
    ],
  },
  anchoring: {
    key: 'anchoring', name: 'Anchoring', icon: BarChart3, diagram: 'anchoring',
    question: 'How do you usually present your packages?',
    options: [
      'One price, take it or leave it',
      'Two options, cheap vs. expensive',
      'Three tiers, with the one I want picked in the middle',
      'It changes every time',
    ],
    leak: 'You give people one price. No other options next to it.',
    why: 'Imagine a shop that only sells one bike, at one price. If it feels expensive, there\u2019s nothing else to look at \u2014 you either buy it or walk away. Now imagine the same shop with three bikes at three prices. Suddenly the middle one feels like the smart, obvious choice, because you can see what you\u2019d be giving up on the cheap one and paying extra for on the expensive one.',
    symptom: "We're comparing you to someone cheaper.",
    rootCause: 'Nothing inside your own business to compare to.',
    hiddenCost: 'A single price doesn\u2019t just risk losing people who think it\u2019s too much. It also caps how much your best-fit couples ever spend, because you never showed them a bigger option either.',
    soundsLines: [
      { who: 'you', text: '"My package is $3,800."' },
      { who: 'note', text: '(to yourself later) "I wonder if that felt too expensive, or not fancy enough..."' },
    ],
    soundsNote: 'With only one price, you never actually find out which one it was.',
    tell: 'Have you ever had someone ask "do you have anything smaller?" or "anything bigger?" and had to say no? That means you\u2019ve been losing bookings on both ends of your one price.',
    industry: 'Most photographers stick to one package because building three feels like extra work, or like admitting the one price isn\u2019t perfect. It\u2019s a natural instinct, not a mistake \u2014 but it quietly removes the couples who would\u2019ve said yes to a different shape of the same offer.',
    topPerformers: 'Photographers who rarely lose couples to "that\u2019s too much" usually aren\u2019t cheaper \u2014 they just never made it a single yes-or-no decision in the first place.',
    quickWin: 'Sketch two more versions of your package next to your current one \u2014 a smaller one and a bigger one. You don\u2019t need exact prices yet, just the shape of three real choices.',
    longTerm: 'Turn all three into real, priced packages. Always present all three together, in order: smallest, middle, biggest.',
    before: '"My package is $3,800."',
    after: '"I\u2019ve got three ways we can work together \u2014 Essentials at $2,900, Signature at $3,800, and Premium at $5,200. Most couples go with Signature."',
    whatNot: 'Don\u2019t make your cheapest option so bare it feels like a trap. Don\u2019t make the price gaps too small either \u2014 that just looks confusing, not like a real choice.',
    ifNotWork: 'If people still only ever ask about the cheapest option, the real problem is probably Packaging \u2014 the tiers exist, but nothing inside them is explained well enough.',
    timeToResults: 'One of the fastest fixes \u2014 often visible on the very next quote you send.',
    signs: 'People start asking "what\u2019s the difference between Signature and Premium?" instead of just accepting or rejecting your one price.',
    archetypeTemplates: {
      spreadsheet: '"I\u2019ve got three options \u2014 Essentials at $2,900, Signature at $3,800, and Premium at $5,200. Here\u2019s exactly what\u2019s different between them." Give the full comparison unprompted.',
      stickerShock: '"Before I give you one number \u2014 I\u2019ve got three ways we can work together, starting at $2,900." Leading with a range instead of one price softens the anchor.',
      socialProof: '"Most couples end up choosing Signature at $3,800 \u2014 it\u2019s the one that gets the best feedback afterward." Naming what others picked functions as proof.',
      alreadySold: '"I\u2019ve got three packages \u2014 Signature at $3,800 is what most couples like you go with." Keep it brief; confirm, don\u2019t over-explain.',
      knowsWhatTheyWant: '"Based on what you described, Signature at $3,800 covers everything you listed. Want me to send the contract?"',
    },
    flowchart: [
      { when: 'STILL ASKING ABOUT CHEAPEST', then: 'Even with three tiers shown, if couples only ask about the smallest one, check Packaging \u2014 the tiers exist, but nothing inside them is explained well enough to justify the gaps.' },
      { when: 'STILL ONE DECISION', then: 'If couples still respond as if there\u2019s one price to accept or reject, check Delivery \u2014 the options might be rushed through instead of paused on.' },
      { when: 'DISCOUNTING THE MIDDLE TIER', then: 'If you\u2019ve caved on the middle tier before, check Discount Reflex \u2014 couples learn all three are negotiable, undoing the point of anchoring.' },
    ],
  },
  delivery: {
    key: 'delivery', name: 'Delivery', icon: MessageCircle, diagram: 'delivery',
    question: 'When you actually say the number out loud, what happens?',
    options: [
      "I say it and wait \u2014 I don't fill the silence",
      'I say it and immediately start explaining or justifying',
      'I soften it first ("it\u2019s an investment, but...")',
      'I avoid saying it until they push',
    ],
    leak: 'The price gets said like an apology, before anyone even pushed back.',
    why: 'Picture a yard sale. You pick up a $20 lamp, and before you say a word, the seller blurts out "I could do $15 if that helps." You hadn\u2019t even complained yet \u2014 but now you\u2019re wondering if you should ask for $10. That\u2019s what happens when you rush to soften your price before anyone reacts to it. You\u2019re not responding to an objection. You\u2019re creating room for one.',
    symptom: 'Every price ends with "...but I\u2019m flexible."',
    rootCause: 'The pause after the number never happens.',
    hiddenCost: 'It\u2019s exhausting, too \u2014 quoting a price and then negotiating with yourself before the other person even says a word is tiring in a way that just saying the number clearly never is.',
    soundsLines: [
      { who: 'you', text: '"So it\u2019s, um, $3,800, but I\u2019m flexible if that\u2019s a lot."' },
      { who: 'them', text: '"Could you maybe do $3,200?"' },
    ],
    soundsNote: 'They didn\u2019t even have to argue. The door was already open before they walked through it.',
    tell: 'Can you remember the last time you said your price and then said nothing else for at least five seconds? If not, that pause is the missing piece.',
    industry: 'Almost every photographer has said "I know it\u2019s a lot, but..." at least once, usually without noticing they did it. It\u2019s a natural response to an uncomfortable moment, not a personal failing \u2014 filling silence feels helpful, even though it usually does the opposite.',
    topPerformers: 'The photographers who rarely get negotiated down have just practiced tolerating the discomfort of silence until it stopped feeling unbearable. The price lands, nothing rushes in to soften it.',
    quickWin: 'Say your price out loud, alone, twice \u2014 once the normal way, once flat with a five-second pause after. Notice the difference before you try it live.',
    longTerm: 'Practice the pause in every single quote for a month, even the ones that feel awkward, until it stops feeling forced.',
    before: '"So it\u2019s, um, $3,800, but like, we can talk about it."',
    after: '"Your investment is $3,800." [Silence.]',
    whatNot: 'Don\u2019t fill the silence yourself. The first person who speaks after the price loses the moment \u2014 and it\u2019s almost always the person who said the price, out of nerves rather than necessity.',
    ifNotWork: 'If confident delivery still gets pushback every time, check Defense \u2014 you might be holding the pause but still explaining yourself the moment someone reacts.',
    timeToResults: 'This one takes a bit longer \u2014 most people report 2-3 weeks before the pause stops feeling forced.',
    signs: 'The silence starts to feel like leverage instead of something unbearable you need to rescue people from.',
    archetypeTemplates: {
      spreadsheet: '"Your investment is $3,800." [Pause.] "Happy to send that breakdown in writing if it\u2019s easier to sit with." Say the price plainly first \u2014 don\u2019t lead with the breakdown to dodge the silence.',
      stickerShock: '"Your investment is $3,800." [Pause.] This is the real test \u2014 the pull to soften immediately is strongest here.',
      socialProof: '"Your investment is $3,800 \u2014 and here\u2019s what a past couple said, if it\u2019s helpful before you decide." [Then stop talking.]',
      alreadySold: '"Your investment is $3,800." [Pause \u2014 say nothing else, even though they\u2019ve basically decided.] Any extra sentence risks planting doubt.',
      knowsWhatTheyWant: '"Your investment is $3,800, and that includes everything you asked about. Want me to send the contract?" Short and flat is correct here.',
    },
    flowchart: [
      { when: 'STILL PUSHED BACK ON', then: 'If confident delivery still gets pushback every time, check Defense \u2014 you might be holding the pause but still explaining yourself the moment someone reacts.' },
      { when: 'STILL FEELS FORCED', then: 'If the pause never stops feeling unnatural after real practice, check whether the price itself has a real stack behind it \u2014 confidence is harder to fake for a number that genuinely feels arbitrary to you too.' },
      { when: 'NOTHING\u2019S CHANGED', then: 'If none of the above shift anything, check Packaging \u2014 a nervous delivery is often just a symptom of not fully believing the price is justified yet.' },
    ],
  },
  defense: {
    key: 'defense', name: 'Defense', icon: Shield, diagram: 'defense',
    question: 'When someone says "that\u2019s more than we budgeted," what\u2019s your instinct?',
    options: [
      "Ask what's actually behind that \u2014 what were they expecting, and why",
      'Explain myself \u2014 justify the price on the spot',
      'Offer to cut something out or lower the price',
      'Go quiet and hope they come back around',
    ],
    leak: 'Pushback gets an answer before anyone found out what the real question was.',
    why: 'Imagine a friend says "that restaurant is too expensive," and instead of asking why, you immediately say "well the chef trained in Paris and the ingredients are imported!" You might be defending against the wrong thing \u2014 maybe they just don\u2019t like seafood. The fix is one simple question: "what makes you say that?" \u2014 then actually waiting for the real answer instead of guessing.',
    symptom: 'Every objection turns into an instant negotiation.',
    rootCause: 'No one asked what the objection actually meant.',
    hiddenCost: 'Guessing at objections instead of asking about them means you\u2019re often defending the wrong thing entirely \u2014 wasting effort and still not addressing what\u2019s actually bothering them.',
    soundsLines: [
      { who: 'them', text: '"That\u2019s more than we budgeted for."' },
      { who: 'you', text: '"Oh, I could probably come down a bit."' },
    ],
    soundsNote: 'No question was ever asked. The price moved before anyone knew what the real problem was.',
    tell: 'Think about your last five pushbacks. Did you ask "what makes you say that?" and actually wait, or did you jump straight to explaining or discounting?',
    industry: 'Most photographers treat every objection as something to answer immediately \u2014 it feels responsive and helpful. Pausing to ask a question back can feel awkward or evasive, even though it almost always gets to the real issue faster.',
    topPerformers: 'Photographers who handle pushback well aren\u2019t naturally more confident \u2014 they\u2019ve just built the habit of asking before answering, so they\u2019re never defending against a guess.',
    quickWin: 'The next time someone pushes back, say only "What makes you say that?" \u2014 then stay quiet, even if it feels uncomfortable.',
    longTerm: 'Make this your automatic first response to every single objection, without exception, until it feels natural.',
    before: '"Oh, I can definitely come down a bit."',
    after: '"What makes you say that?" [Silence \u2014 let them fully answer before responding.]',
    whatNot: 'Don\u2019t answer your own question by guessing what they meant. Let them actually finish explaining first.',
    ifNotWork: 'If people still won\u2019t open up even after the question, check Delivery \u2014 the tone around the original price might have already signaled you expected an argument.',
    timeToResults: 'Takes a little longer to feel natural \u2014 most people need 2-3 weeks before it stops feeling scripted.',
    signs: 'Objections start turning into real conversations instead of instant negotiations.',
    archetypeTemplates: {
      spreadsheet: '"What makes you say that?" then let them walk through their numbers \u2014 they usually want to be heard analytically, not talked out of their concern.',
      stickerShock: '"What makes you say that?" often reveals a number they picked up somewhere unrelated to your market \u2014 useful to know before responding.',
      socialProof: '"What makes you say that?" \u2014 for this type, the honest answer is often "I don\u2019t know if this is normal," which proof can answer better than a discount can.',
      alreadySold: 'Pushback from this type is rare, but if it happens: "What makes you say that?" \u2014 they may just be double-checking, not actually objecting.',
      knowsWhatTheyWant: 'This type rarely objects without a specific reason \u2014 "what makes you say that" usually gets a precise, solvable answer fast.',
    },
    flowchart: [
      { when: 'STILL WON\u2019T OPEN UP', then: 'If people still won\u2019t explain even after the question, check Delivery \u2014 the tone around the original price may have already signaled you expected a fight.' },
      { when: 'ANSWER LEADS TO DISCOUNT ANYWAY', then: 'If understanding the real objection still ends in a bare discount, check Discount Reflex \u2014 use the trade menu instead of a straight cut.' },
      { when: 'NOTHING\u2019S CHANGED', then: 'If this doesn\u2019t shift anything, check Packaging \u2014 a well-asked question still needs something real to point back to once the real objection surfaces.' },
    ],
  },
  discountReflex: {
    key: 'discountReflex', name: 'Discount Reflex', icon: TrendingDown, diagram: 'discountReflex',
    question: 'When have you discounted in the last 6 months?',
    options: [
      'Never \u2014 I hold the number',
      'Only when I got something back (referral, faster deposit, review)',
      'When they pushed hard enough',
      'Pretty much whenever the deal felt at risk',
    ],
    leak: 'You lower your price the moment someone hesitates \u2014 before they even ask.',
    why: 'Back to that yard sale: if the seller offers $5 off before you\u2019ve even said a word, you start to wonder if you should ask for more off. Every free discount (meaning: you got nothing back for it) teaches people your price is soft \u2014 even the ones who were totally fine with the original number.',
    symptom: 'Every couple seems to negotiate.',
    rootCause: 'You opened the door first.',
    hiddenCost: 'It\u2019s not just the dollars given away, though those add up fast. It\u2019s that your price stops meaning anything \u2014 people learn to expect movement, so more people ask for it.',
    soundsLines: [
      { who: 'you', text: '"It\u2019s $3,800, but I could do $3,300 if that helps."' },
      { who: 'them', text: '"Oh, could you do $3,200?"' },
    ],
    soundsNote: 'They didn\u2019t have to negotiate at all \u2014 the discount was offered before it was even asked for.',
    tell: 'Look at your last five bookings. Did you offer money off before anyone said the price was too much? That\u2019s the reflex in action \u2014 a habit, not a response to something they actually said.',
    industry: 'Almost every photographer has said "I\u2019m flexible if that helps" at least once, usually without noticing they did it. It comes from a good instinct \u2014 wanting to be accommodating \u2014 that quietly costs money every time it fires before it\u2019s actually needed.',
    topPerformers: 'Photographers who rarely discount aren\u2019t harder negotiators \u2014 they\u2019ve just never left an opening for a couple to walk through before hesitation even showed up.',
    quickWin: 'Next time you feel the urge to say "but I\u2019m flexible" right after your price \u2014 stop, and say nothing else instead. Just the price. Silence.',
    longTerm: 'Decide in advance what you\u2019ll trade for a discount instead of giving one for free \u2014 like "$300 off for a referral to another couple."',
    before: '"I could knock $300 off if that helps."',
    after: '"I can\u2019t move on the price, but if you introduce me to two other couples, I\u2019d take $300 off. Fair?"',
    whatNot: 'Don\u2019t discount first and ask for something back afterward \u2014 that doesn\u2019t work, since you\u2019ve already given the discount away for free. The trade has to come before the price moves.',
    ifNotWork: 'If people still push even when offered a fair trade, check Packaging \u2014 there might not be enough shown value in your price for holding the line to feel reasonable.',
    timeToResults: 'Immediate \u2014 this shows up on your very next conversation where hesitation appears.',
    signs: 'You start collecting referrals and reviews instead of handing out free discounts, because now every discount is a trade.',
    archetypeTemplates: {
      spreadsheet: '"I can\u2019t move on the total, but here\u2019s exactly what a trade could look like: refer two couples, I\u2019ll take $300 off \u2014 here\u2019s that math." They want to see the logic.',
      stickerShock: '"I hear you on budget \u2014 I can\u2019t cut the price outright, but locking in this week could save you $200." A trade, not a discount, for the archetype most likely to trigger this reflex.',
      socialProof: '"I don\u2019t discount outright, but if you know another engaged couple, I\u2019d take $300 off for the introduction." Fits naturally since they already talk about you to others.',
      alreadySold: 'Don\u2019t offer a discount unprompted \u2014 say the price plainly and move to booking. If asked: offer the add-on trade instead.',
      knowsWhatTheyWant: 'Same as above \u2014 no discount conversation needed unless they raise it themselves.',
    },
    flowchart: [
      { when: 'TRADE OFFERED, STILL REJECTED', then: 'Check Packaging \u2014 a trade only feels fair when there\u2019s a real stack behind the original price.' },
      { when: 'STILL DISCOUNTING WITHOUT MEANING TO', then: 'Check Delivery \u2014 the urge to soften a price with money off often starts with how nervously it was said in the first place.' },
      { when: 'TRADE FEELS AWKWARD TO SAY', then: 'Check Defense \u2014 the trade lands best after genuinely understanding the objection first, not as its own automatic reflex.' },
    ],
  },
  proofTiming: {
    key: 'proofTiming', name: 'Proof Timing', icon: Clock, diagram: 'proofTiming',
    question: 'Where do testimonials or past results show up in your process?',
    options: [
      'Before the price ever comes up \u2014 baked into how I present',
      'Only if they ask',
      'Only after they push back on price',
      "I don't really use them",
    ],
    leak: 'Reviews and proof only show up after someone doubts you \u2014 never before.',
    why: 'Picture buying a used car. The seller tells you the price, and only when you say "that seems like a lot" does he mention it\u2019s never broken down. Wouldn\u2019t that have landed better before you started doubting? Proof shown early convinces someone before they start being skeptical. Proof shown late is just playing catch-up.',
    symptom: "Even great reviews don't seem to change minds.",
    rootCause: 'The couple already decided to be skeptical.',
    hiddenCost: 'When proof only shows up as defense, it does a smaller job than it could. Shown early, it builds trust before the price even lands \u2014 so the number doesn\u2019t have to work as hard alone.',
    soundsLines: [
      { who: 'you', text: '"It\u2019s $3,800 for the day."' },
      { who: 'them', text: '"Hmm, that feels like a lot."' },
      { who: 'you', text: '"Well, here\u2019s what a past couple said..."' },
    ],
    soundsNote: 'By this point they\u2019re already doubting \u2014 the proof is arriving too late to shape their first impression.',
    tell: 'In your last five quotes, did a testimonial come up before the price, or only after someone hesitated? If it\u2019s always after, proof is working as a rescue plan instead of its real job.',
    industry: 'Testimonials feel like a defense tool, so most photographers reach for them defensively \u2014 only once something\u2019s already going wrong. It\u2019s a natural instinct, not a mistake, but it means your best proof sits on the sidelines during the exact moment it could do the most good.',
    topPerformers: 'Photographers whose couples rarely push back on price haven\u2019t hidden better testimonials \u2014 they\u2019ve just moved them earlier, so trust is built before the number ever shows up.',
    quickWin: 'Pick your single best, most specific testimonial and put it into your very next quote before the price \u2014 not saved for later.',
    longTerm: 'Build a short "why couples choose me" section with two or three testimonials that goes into every quote automatically, always before the number.',
    before: '"Well, if it helps, here\u2019s what a past couple said..."',
    after: '"Before we get to the price \u2014 here\u2019s what a couple from last season said... Now, here\u2019s what that looked like for you: $3,800."',
    whatNot: 'Don\u2019t use vague praise like "they were amazing!" \u2014 use specific results, like "we loved not having to think about the camera all day."',
    ifNotWork: 'If proof shown early still doesn\u2019t change anything, check Anchoring or Packaging \u2014 the proof might be landing fine, but there might be nothing structural underneath the price for it to support.',
    timeToResults: 'A few quotes in, once showing proof early becomes a habit instead of something you remember sometimes.',
    signs: 'People start bringing up the testimonial themselves \u2014 "we saw what you did for that couple, that\u2019s exactly what we want."',
    archetypeTemplates: {
      spreadsheet: 'Include proof in the same document as the numbers \u2014 "Here\u2019s a written summary of client feedback alongside the package breakdown."',
      stickerShock: '"Before we even get to pricing \u2014 here\u2019s what a similar-budget couple said [testimonial]. Now here\u2019s what that looked like: $3,800." Proof softens the anchor they walked in with.',
      socialProof: '"Here\u2019s what one of last season\u2019s couples said \u2014 happy to connect you directly if you\u2019d like to ask them anything." This archetype benefits most from proof of anyone.',
      alreadySold: 'Use proof sparingly \u2014 one short mention is enough. Over-proving to someone already decided can introduce doubt that wasn\u2019t there.',
      knowsWhatTheyWant: 'Skip proof almost entirely unless asked. This archetype wants confirmation, not persuasion.',
    },
    flowchart: [
      { when: 'PROOF SHOWN EARLY, STILL SKEPTICAL', then: 'Check Delivery \u2014 even strong proof can be undercut if the price is then said nervously right after it.' },
      { when: 'PROOF SEEMS TO FALL FLAT', then: 'Check whether it\u2019s specific enough \u2014 vague praise does little work regardless of timing.' },
      { when: 'STILL NEGOTIATING DESPITE PROOF', then: 'Check Packaging \u2014 proof builds trust in you; it doesn\u2019t replace showing what\u2019s actually included in the price.' },
    ],
  },
};

export const COMPOUNDS = {
  packagingDiscountReflex: {
    key: 'packagingDiscountReflex', name: 'Packaging \u00d7 Discount Reflex', parts: ['packaging', 'discountReflex'], diagram: 'packagingDiscountReflex',
    leak: 'Nothing built into the price means nothing to hold onto when someone pushes back \u2014 so the price is the only thing left to move.',
    why: 'If you can\u2019t say what a $30 lamp is made of, all you can say is "trust me." Hard to defend. If you can point to the bulb, the shade, the cord, now there\u2019s something real to defend, piece by piece. Without a list of what\u2019s in your price, the only thing left when someone hesitates is the number itself \u2014 so that\u2019s what gets cut.',
    symptom: 'Every quote turns into a negotiation about price alone.',
    rootCause: 'There was never anything else on the table to negotiate about.',
    industry: 'This pairing is common because the two habits reinforce each other \u2014 no stack makes discounting feel like the only option, and easy discounting removes the pressure to ever build a stack.',
    topPerformers: 'Photographers who avoid this compound leak build the stack once, early, and treat discounting as a deliberate trade rather than a reflex from day one.',
    quickWin: 'Before your next quote, write three things in your package with rough values, and practice saying the price with this list attached, out loud, once.',
    longTerm: 'Build both fixes together: a written list of your package, and a decided list of what you\u2019ll trade for a discount instead of giving one away free.',
    before: '"That\u2019s more than we hoped." \u2192 "I could do $3,300."',
    after: '"That\u2019s more than we hoped." \u2192 "Just to be clear on what\u2019s included: 8 hours, a second shooter, and the full album \u2014 about $3,800 in value. If budget\u2019s tight, I could take $200 off for a referral."',
    archetypeTemplates: {
      spreadsheet: '"Here\u2019s the full breakdown [stack]. If budget\u2019s tight, I could take $200 off for a referral \u2014 but the stack itself doesn\u2019t change."',
      stickerShock: '"I know $3,800 is more than expected \u2014 here\u2019s exactly what that includes [stack]. If it\u2019s still a stretch, $200 off for booking by Friday."',
      socialProof: '"Here\u2019s what\u2019s included [stack], and here\u2019s what a past couple said [testimonial]. If you know another couple who\u2019d be a fit, $200 off for the intro."',
      alreadySold: '"Your investment is $3,800, and it includes [stack, briefly]. I\u2019ll send the contract today."',
      knowsWhatTheyWant: '"For what you described, that\u2019s $3,800 \u2014 covering [specific items]. Want me to send the contract?"',
    },
    flowchart: [
      { when: 'STACK SHOWN, STILL DISCOUNTING', then: 'Check Delivery \u2014 the stack and trade logic can both be sound, but a nervous delivery undercuts them before the couple even responds.' },
      { when: 'BOTH USED, STILL REJECTED', then: 'Check Defense \u2014 make sure you\u2019re asking "what makes you say that" and genuinely listening before jumping to the trade offer.' },
      { when: 'NO ENGAGEMENT WITH STACK AT ALL', then: 'Check Proof Timing \u2014 a stack without proof around it is still asking couples to take your word alone.' },
    ],
  },
  deliveryDefense: {
    key: 'deliveryDefense', name: 'Delivery \u00d7 Defense', parts: ['delivery', 'defense'], diagram: 'deliveryDefense',
    leak: 'A price said with a flinch gets defended with an apology.',
    why: 'If the number is delivered nervously, whatever happens next usually matches that nervous tone \u2014 because the mood for the whole conversation was set the moment the price was said. Asking "what makes you say that" right after a shaky price doesn\u2019t sound curious, it sounds like backing down, because the other person already sensed the uncertainty.',
    symptom: 'Every quote turns into a negotiation.',
    rootCause: 'The price was never said like a fact.',
    industry: 'These two habits reinforce each other \u2014 a shaky delivery invites pushback, and pushback that\u2019s answered defensively confirms the shakiness was warranted.',
    topPerformers: 'Photographers who avoid this compound leak treat the pause after the price and the question after any pushback as one linked habit, practiced together.',
    quickWin: 'Say your price out loud, alone, twice \u2014 once normal, once flat with a pause. Then practice "what makes you say that?" followed by real silence.',
    longTerm: 'Make both automatic: the pause after the price, and the question after any pushback \u2014 every single time, without exception.',
    before: '"So it\u2019s, um, $3,800, but I\u2019m flexible."',
    after: '"Your investment is $3,800." [Pause.] If pushback: "What makes you say that?" [Pause again.]',
    archetypeTemplates: {
      spreadsheet: '"Your investment is $3,800." [Pause.] "Happy to send that breakdown in writing if it\u2019s easier to sit with."',
      stickerShock: '"Your investment is $3,800." [Pause.] Them: "That\u2019s more than we hoped." You: "What makes you say that?" [Pause again.]',
      socialProof: '"Your investment is $3,800 \u2014 and here\u2019s what a past couple said [testimonial]." [Then stop talking.]',
      alreadySold: '"Your investment is $3,800." [Pause \u2014 say nothing else.]',
      knowsWhatTheyWant: '"Your investment is $3,800, covering everything you asked about. Want me to send the contract?"',
    },
    flowchart: [
      { when: 'PAUSE HELD, STILL PUSHED BACK ON', then: 'Check Packaging \u2014 confidence buys room to be believed; it doesn\u2019t replace having something to be believed about.' },
      { when: 'STILL DISCOUNTING', then: 'Check Discount Reflex \u2014 the delivery fix is working; the habit of caving hasn\u2019t caught up yet.' },
      { when: 'STILL NOT BELIEVED', then: 'Check Proof Timing \u2014 confidence alone asks a couple to trust your word; proof gives them something else to trust.' },
    ],
  },
};

export const ARCHETYPES = {
  spreadsheet: { key: 'spreadsheet', name: 'The Spreadsheet Couple', line: 'Wants an itemized breakdown before deciding.', icon: BarChart3 },
  stickerShock: { key: 'stickerShock', name: 'The Sticker-Shock Couple', line: 'Already has a number in their head from somewhere else.', icon: TrendingDown },
  socialProof: { key: 'socialProof', name: '"What Did Everyone Say" Couple', line: "Borrows confidence from people who aren't in the room.", icon: MessageCircle },
  alreadySold: { key: 'alreadySold', name: 'The Already-Sold Couple', line: 'Picked you on vibe before this conversation started.', icon: CheckCircle2 },
  knowsWhatTheyWant: { key: 'knowsWhatTheyWant', name: 'Knows Exactly What They Want', line: 'Has a shot list and a number already worked out.', icon: Shield },
};

export const CHAIN_ORDER = { packaging: 0, anchoring: 1, delivery: 2, defense: 3, discountReflex: 4, proofTiming: 5 };

export const TIERS = [
  { max: 25, label: 'Early-stage leak', color: 'var(--mint)' },
  { max: 55, label: 'Active leak', color: 'var(--amber)' },
  { max: 80, label: 'Compounding leak', color: 'var(--coral)' },
  { max: 101, label: 'Severe leak', color: 'var(--coral-deep)' },
];

export const QUESTION_ORDER = ['packaging', 'anchoring', 'delivery', 'defense', 'discountReflex', 'proofTiming'];

export const FILTER_Q = {
  text: 'Right now, pricing conversations mostly feel like...',
  options: ['A fight I have to win', 'A conversation I dread', "Something I've gotten numb to", 'Actually fine, just want to sharpen it'],
};

export const SEVERITY_Q = {
  text: 'How often does a pricing conversation end in a discount, a ghost, or a "let me think about it"?',
  options: ['Rarely \u2014 most close at full price', 'Sometimes', 'Often', 'Almost every time'],
};

export const OBJECTIONS = [
  { q: '"We got a quote for $1,000 less from someone else."', a: '"What\u2019s included in that quote? Want to make sure we\u2019re comparing the same thing." Most cheaper quotes are missing something yours includes.' },
  { q: '"My cousin\u2019s shooting for free, can you do a friend price?"', a: '"Can\u2019t discount the full package, but I do have a smaller option just for backup coverage." Never shrink the full offer to compete with free.' },
  { q: '"Can we get a discount if we book today?"', a: '"I don\u2019t discount for speed, but I can hold your date for 48 hours while you decide."' },
  { q: '"We need to check with whoever\u2019s paying."', a: '"Of course \u2014 want me to put together a one-page summary you can send them directly?"' },
  { q: '"That\u2019s more than we expected to spend on photography."', a: '"What makes you say that?" Then genuine silence \u2014 find out if it\u2019s the number itself, or something in the stack that isn\u2019t landing.' },
  { q: '"Do you have anything cheaper?"', a: '"I do have a smaller option \u2014 want me to walk you through what\u2019s different, so you know exactly what you\u2019d be trading off?"' },
];

export const TRADE_MENU = [
  { name: 'Referral Trade', line: '"I can\u2019t move on price, but if you introduce me to two other couples, I\u2019d take $300 off. Fair?"' },
  { name: 'Review Trade', line: '"If you\u2019re open to an honest review after the wedding, I can include the sneak peek upgrade at no cost."' },
  { name: 'Faster-Deposit Trade', line: '"I can do $200 off if we lock in the deposit and contract by this Friday."' },
  { name: 'Add-On Trade', line: '"Instead of a discount, I could include the engagement session at no charge."' },
];

export const FRAMING = {
  title: 'The same diagnosis, without the consultant\u2019s invoice.',
  text: 'A pricing consultant walking you through this same read usually takes about 45 minutes and costs more than this report did. That\u2019s time spent asking you the same six questions this report just asked, then explaining back to you what the pattern in your answers means. This report compresses that into a few minutes, built from your actual answers, not a generic checklist.',
};

export const RISK = {
  title: 'The same leak costs more as your business grows.',
  text: 'Right now, this quietly costs you a booking or a discount here and there. It doesn\u2019t fix itself with more experience or more inquiries \u2014 the same gap in the conversation just loses you a bigger number as your volume goes up, because the pattern repeats at whatever scale you\u2019re operating at. A slow leak at low volume looks like normal attrition. The same leak at double the inquiries starts looking like a real hole in the business.',
};

export const CTA_CHECKLIST = [
  'Your Secondary Leak, fully diagnosed, plus how it connects to your Primary one',
  '5 message templates \u2014 one matched to each type of couple you\u2019re likely quoting',
  'An 8-objection response library, including the cheaper-quote comparison and the friend/family discount ask',
  '4 full conversation simulations, played start to finish',
  'Scripts adapted for DM/text, phone, and in-person',
  'A pre-anchoring guide for before the call even starts, plus a red-flag guide for spotting who you\u2019re dealing with early',
  'A one-page cheat sheet built to keep open during a real call, and a tracker for your next 3 quotes',
];

export const PRE_ANCHORING = {
  title: 'Pre-Anchoring Guidance',
  text: 'What you put in your inquiry response or on your pricing page sets the anchor before the call ever starts. A couple who reads "packages start at $2,900" before they ever talk to you arrives already calibrated. Add a starting range to your inquiry response, even a wide one \u2014 this filters out couples whose budget genuinely isn\u2019t close, and means the number you eventually say isn\u2019t a surprise, just a confirmation.',
};

export const SIGNAL_GUIDE = [
  { archetype: 'spreadsheet', signal: 'Asks specific, numbered questions in the first message ("do you offer an 8 vs 10 hour option").' },
  { archetype: 'stickerShock', signal: 'Opens with a budget number unprompted, before asking anything about your work.' },
  { archetype: 'socialProof', signal: 'Mentions a referral or asks who else you\u2019ve shot for, before asking about price.' },
  { archetype: 'alreadySold', signal: 'Message is warm, references specific photos from your portfolio by name.' },
  { archetype: 'knowsWhatTheyWant', signal: 'Message is short and specific, date and venue already confirmed.' },
];

export const WALK_AWAY = {
  title: 'When To Walk Away',
  text: 'Not every price-sensitive lead is worth chasing to a close. A fair signal to walk away: the budget they\u2019ve stated is less than 60% of your lowest tier, and it hasn\u2019t moved after you\u2019ve shown your value once. A warm, honest decline protects your time and your pricing integrity more than one more follow-up would.',
};

export const CHANNEL_VERSIONS = [
  { name: 'DM / Text', text: 'Send the stack as its own message, then the price as a separate message a few seconds later \u2014 never all in one wall of text. The pause between messages does the job silence does on a call. Don\u2019t add a smiley or "no worries either way!" right after the number \u2014 it undercuts it the same way rushing does out loud.' },
  { name: 'Phone Call', text: 'Silence is harder on a call because dead air feels louder than it does over text. Say the price, then count to five in your head before saying anything else, even if it feels unbearable. Resist the urge to say "does that work?" immediately.' },
  { name: 'In-Person', text: 'Body language does what tone does on a call \u2014 sit still after you say the price instead of shuffling papers. If you\u2019ve printed a breakdown, hand it over right as you say the total, then stop talking and let them read it.' },
];

export const SIMULATIONS = [
  {
    title: 'The Couple Who Goes Quiet',
    lines: [
      { who: 'you', text: 'Here\u2019s the breakdown \u2014 8hr coverage, second shooter, sneak peek, full album \u2014 comes to $3,800 total.' },
      { who: 'them', text: 'Great, thank you! We\u2019ll get back to you.' },
      { who: 'note', text: '...four days of silence.' },
      { who: 'you', text: '(day 4) Hey! No pressure \u2014 just wanted to check if you had any questions on the breakdown I sent.' },
      { who: 'them', text: 'Actually yes \u2014 does the album come with prints or just digital?' },
    ],
    takeaway: 'Silence after a stack almost always means a real, specific question they haven\u2019t asked yet \u2014 not a soft no.',
  },
  {
    title: 'The Couple Who Pushes Back Openly',
    lines: [
      { who: 'you', text: 'Your investment is $3,800.' },
      { who: 'them', text: 'Wow, that\u2019s more than we were thinking.' },
      { who: 'you', text: 'What makes you say that?' },
      { who: 'them', text: 'We just figured photography would be more like $2,500.' },
      { who: 'you', text: 'That makes sense \u2014 a lot of couples start there. Can I walk you through what\u2019s in the $3,800?' },
    ],
    takeaway: 'The objection wasn\u2019t about your price \u2014 it was about a number they\u2019d already anchored to before talking to you.',
  },
  {
    title: 'The Couple Who Name-Drops A Cheaper Photographer',
    lines: [
      { who: 'them', text: '[Other photographer] quoted us $3,200 for basically the same thing.' },
      { who: 'you', text: 'Good to know \u2014 what\u2019s included in their $3,200?' },
      { who: 'them', text: 'I think just the photos... maybe 6 hours?' },
      { who: 'you', text: 'That\u2019s a bit different \u2014 mine\u2019s 8 hours with a second shooter, plus the album. Want a side-by-side?' },
    ],
    takeaway: 'The comparison usually falls apart once the actual inclusions get named out loud.',
  },
  {
    title: 'The Friend/Family Discount Ask',
    lines: [
      { who: 'them', text: 'My cousin\u2019s actually going to shoot most of it, but could you do a smaller rate just for ceremony backup?' },
      { who: 'you', text: 'Totally understand wanting to keep it in the family. I can\u2019t discount the full day, but I have a 3-hour ceremony-and-portraits option at $1,600.' },
      { who: 'them', text: 'Oh, that actually sounds perfect.' },
    ],
    takeaway: 'This wasn\u2019t really a discount request \u2014 it was a mismatch between what they needed and the only package they knew existed.',
  },
];

export const TIER_STRATEGY = {
  title: 'How To Actually Price Three Tiers',
  text: 'Using your current package as the middle tier: Essentials should run about 75-80% of it (strip hours and the second shooter, not quality) \u2014 this tier exists mainly to make the middle tier look reasonable. Premium should run about 130-140% of it (add things that cost you little marginal effort but read as high value). A gap under 20% between tiers doesn\u2019t read as a real choice \u2014 it reads as confusing, and confusion pushes people toward the cheapest option by default.',
};

export const FOLLOW_UP_SEQUENCE = [
  { day: 'DAY 3', text: 'Hey! No rush at all \u2014 just wanted to check if the breakdown I sent made sense, or if anything\u2019s unclear.' },
  { day: 'DAY 7', text: 'Wanted to give you an update \u2014 I\u2019ve got another couple asking about your date, so wanted to check in before I get back to them.' },
  { day: 'DAY 14', text: 'I\u2019ll leave you with this and won\u2019t keep following up \u2014 if the timing\u2019s off, totally understand. Happy to pick this back up whenever works.' },
];

export const REFERRAL_ASK = {
  title: 'The Referral Ask, Right After Booking',
  text: 'The moment right after a couple books is the highest-leverage moment to ask for a referral \u2014 their excitement is at its peak, and they almost certainly know at least one other engaged couple.',
  script: 'So excited for you two! Quick thing \u2014 couples who book with a friend or someone in their circle tend to have the best experience. Does anyone come to mind who\u2019s also engaged right now?',
};

export const PRE_SEND_CHECKLIST = [
  'Stack is written down with real or rough values before the number is said',
  'Price is said once, then silence \u2014 no immediate follow-up sentence',
  'Proof is placed before the price, not held in reserve',
  'Objection response ready: "What makes you say that?" then quiet',
  'Any discount is tied to a trade, decided in advance, never given reflexively',
];
