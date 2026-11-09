// Shared helper: add or update a contact in Brevo, put it on a list, and set labels.
// Needs the BREVO_API_KEY environment variable (set in Vercel, never in this repo).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmail(v) {
  return typeof v === 'string' && v.length <= 254 && EMAIL_RE.test(v.trim());
}

// Keep only non-empty labels, as short plain text.
function cleanAttributes(attrs) {
  const out = {};
  Object.keys(attrs || {}).forEach((k) => {
    const v = attrs[k];
    if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, 200);
  });
  return out;
}

async function post(key, payload) {
  return fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(payload)
  });
}

async function addToList(email, listId, attributes) {
  const key = process.env.BREVO_API_KEY;
  const id = parseInt(listId, 10);
  if (!key || !id) {
    return { ok: false, status: 500, error: 'Brevo is not configured (BREVO_API_KEY or list ID missing).' };
  }
  const payload = { email: email.trim().toLowerCase(), listIds: [id], updateEnabled: true };
  const attrs = cleanAttributes(attributes);
  if (Object.keys(attrs).length) payload.attributes = attrs;

  let r = await post(key, payload);
  let note = '';
  // If a label field hasn't been created in Brevo yet, Brevo rejects the request.
  // Retry without labels so the signup is never lost.
  if (r.status === 400 && payload.attributes) {
    try { note = await r.text(); } catch (e) {}
    delete payload.attributes;
    r = await post(key, payload);
  }
  // 201 = created, 204 = existing contact updated
  if (r.status === 201 || r.status === 204) {
    return { ok: true, status: r.status, labelsSkipped: note ? note.slice(0, 300) : undefined };
  }
  let detail = '';
  try { detail = await r.text(); } catch (e) {}
  return { ok: false, status: 502, error: 'Brevo returned ' + r.status, detail: detail.slice(0, 300) };
}

module.exports = { isEmail, addToList };
