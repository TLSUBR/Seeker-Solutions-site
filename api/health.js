// Weekly keep-alive for the Brevo API key.
// Brevo disables API keys after 90 days without use, which would silently stop
// signups during a quiet stretch. Vercel Cron (see vercel.json) calls this every
// Monday; it makes one harmless read so the key stays active.
// Vercel adds "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set;
// manual checks can pass ?token=<GUMROAD_PING_TOKEN>.
module.exports = async (req, res) => {
  const auth = req.headers['authorization'] || '';
  const cronOk = process.env.CRON_SECRET ? auth === 'Bearer ' + process.env.CRON_SECRET
                                         : /vercel-cron/i.test(req.headers['user-agent'] || '');
  const tokenOk = process.env.GUMROAD_PING_TOKEN && req.query && req.query.token === process.env.GUMROAD_PING_TOKEN;
  if (!cronOk && !tokenOk) return res.status(401).json({ ok: false });
  const key = process.env.BREVO_API_KEY;
  if (!key) return res.status(500).json({ ok: false, error: 'BREVO_API_KEY missing' });
  try {
    const r = await fetch('https://api.brevo.com/v3/contacts/lists?limit=1', { headers: { 'api-key': key, accept: 'application/json' } });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok, brevo: r.status });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Brevo unreachable' });
  }
};
