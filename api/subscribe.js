// POST /api/subscribe  { email, list, source, interest, assessment, website }
// Called by the site's forms. Adds the address to a Brevo list and labels it:
//   list "subscribers" (default) -> BREVO_LIST_ID          (starts your welcome emails)
//   list "sponsor"               -> BREVO_SPONSOR_LIST_ID  (sponsored seat requests)
//   list "inquiry"               -> BREVO_INQUIRY_LIST_ID  (contact form; no marketing)
// Labels (create these as Text fields in Brevo once): SOURCE, INTEREST, ASSESSMENT.
const { isEmail, addToList } = require('./_brevo');

const LISTS = {
  subscribers: 'BREVO_LIST_ID',
  sponsor: 'BREVO_SPONSOR_LIST_ID',
  inquiry: 'BREVO_INQUIRY_LIST_ID'
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST' });
  }
  const body = req.body || {};
  // Honeypot: real visitors never fill the hidden "website" field.
  if (body.website) return res.status(200).json({ ok: true });
  if (!isEmail(body.email)) return res.status(400).json({ ok: false, error: 'Please enter a valid email.' });

  const envName = LISTS[body.list] || LISTS.subscribers;
  const listId = process.env[envName];
  if (!listId) {
    console.error('subscribe failed: ' + envName + ' is not set in Vercel');
    return res.status(500).json({ ok: false });
  }

  try {
    const out = await addToList(body.email, listId, {
      SOURCE: body.source,
      INTEREST: body.interest,
      ASSESSMENT: body.assessment
    });
    if (!out.ok) console.error('subscribe failed', out);
    else if (out.labelsSkipped) console.warn('subscribe: saved without labels (create the label fields in Brevo)', out.labelsSkipped);
    return res.status(out.ok ? 200 : out.status).json({ ok: out.ok });
  } catch (e) {
    console.error('subscribe error', e);
    return res.status(502).json({ ok: false });
  }
};
