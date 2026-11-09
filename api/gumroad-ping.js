// POST /api/gumroad-ping?token=YOUR_SECRET
// Paste https://seekersolutions.org/api/gumroad-ping?token=YOUR_SECRET into
// Gumroad > Settings > Advanced > Ping. On every sale Gumroad posts the sale here,
// and the buyer is added to the Brevo list in BREVO_BUYERS_LIST_ID, which starts
// your post-purchase email sequence.
const { isEmail, addToList } = require('./_brevo');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST' });
  }
  const secret = process.env.GUMROAD_PING_TOKEN;
  if (!secret || (req.query && req.query.token) !== secret) {
    return res.status(401).json({ ok: false, error: 'Bad token' });
  }

  const sale = req.body || {};
  // Optional second check: only accept pings for your own Gumroad account.
  const seller = process.env.GUMROAD_SELLER_ID;
  if (seller && sale.seller_id && sale.seller_id !== seller) {
    return res.status(401).json({ ok: false, error: 'Unknown seller' });
  }
  // Ignore refunds and anything without a buyer email.
  if (String(sale.refunded) === 'true' || !isEmail(sale.email)) {
    return res.status(200).json({ ok: true, skipped: true });
  }

  try {
    // For gifts, Gumroad sends the recipient's email, so recipients get your buyer emails.
    // Free downloads (like the sampler) go to Subscribers, not Buyers.
    const free = String(sale.price) === '0';
    const out = free
      ? await addToList(sale.email, process.env.BREVO_LIST_ID, { INTEREST: 'Free: ' + (sale.product_name || 'download'), SOURCE: 'gumroad' })
      : await addToList(sale.email, process.env.BREVO_BUYERS_LIST_ID, { PRODUCT: sale.product_name });
    if (!out.ok) console.error('gumroad-ping: Brevo failed', out, sale.product_name);
    else if (out.labelsSkipped) console.warn('gumroad-ping: saved without PRODUCT label (create it in Brevo)');
    // Gumroad retries on non-200, so only report failure when Brevo actually failed.
    return res.status(out.ok ? 200 : 502).json({ ok: out.ok });
  } catch (e) {
    console.error('gumroad-ping error', e);
    return res.status(502).json({ ok: false });
  }
};
