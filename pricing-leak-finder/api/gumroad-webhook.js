// This runs on Vercel as a serverless function at /api/gumroad-webhook.
// Configure this exact URL as the "Ping" / webhook URL in your Gumroad
// product settings. Gumroad sends a form-encoded POST on every sale.
//
// Required environment variables (set these in the Vercel dashboard, NOT in
// .env, since this file runs on the server, not in the browser):
//   SUPABASE_URL                 (same value as VITE_SUPABASE_URL)
//   SUPABASE_SERVICE_ROLE_KEY    (Project Settings -> API -> service_role key
//                                  — this key can bypass row-level security,
//                                  so it must never be exposed to the browser)
//   GUMROAD_PRODUCT_PERMALINK    (the slug from your Gumroad product URL,
//                                  used to make sure the ping is actually for
//                                  this product before trusting it)

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};

  // Gumroad sends the product's permalink as `permalink` in the ping payload.
  // Confirming it matches prevents a stray or malicious POST from marking
  // random submissions as unlocked.
  if (process.env.GUMROAD_PRODUCT_PERMALINK && body.permalink !== process.env.GUMROAD_PRODUCT_PERMALINK) {
    return res.status(400).json({ error: 'Permalink mismatch' });
  }

  // The submission id is passed through as a custom field on the checkout
  // link (see Report.jsx — ?submission_id=... appended to the Gumroad URL).
  // Gumroad forwards custom URL params back in the ping under `url_params`.
  const submissionId = body['url_params[submission_id]'] || body.submission_id;

  if (!submissionId) {
    return res.status(400).json({ error: 'No submission_id in webhook payload' });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { error } = await supabase
    .from('pricing_leak_submissions')
    .update({ unlocked: true })
    .eq('id', submissionId);

  if (error) {
    console.error('Failed to unlock submission:', error);
    return res.status(500).json({ error: 'Database update failed' });
  }

  return res.status(200).json({ success: true });
}
