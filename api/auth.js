/* =====================================================================
   /api/auth — đăng nhập, duyệt tài khoản, phân quyền (Upstash KV)

   Cần 2 biến môi trường trên Vercel (Storage → Connect Project):
     KV_REST_API_URL   (hoặc UPSTASH_REDIS_REST_URL)
     KV_REST_API_TOKEN (hoặc UPSTASH_REDIS_REST_TOKEN)
   Chưa có biến → trả {kvOff:true}, app tự dùng cấu hình tĩnh config.js.

   Dữ liệu (khác key với PVH/PKT, không đụng dữ liệu của nhau):
     pns:accounts  { email: {vaiTro, quyen, ten} }   quyen: "*" | ["HRM1",…]
     pns:pending   { email: {ten, phuongThuc, luc} }
   ===================================================================== */
const ADMIN_CUNG = ["quynhhtn@hqplay.vn"];
const K_ACC = "pns:accounts", K_PEND = "pns:pending";

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function kv(cmd) {
  const r = await fetch(KV_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd)
  });
  if (!r.ok) throw new Error("KV " + r.status);
  return (await r.json()).result;
}
const getJ = async k => { const v = await kv(["GET", k]); return v ? JSON.parse(v) : {}; };
const setJ = (k, o) => kv(["SET", k, JSON.stringify(o)]);

/* Xác thực token Google (ID token từ nút Đăng nhập với Google) */
async function verifyGoogle(token) {
  if (!token) return null;
  try {
    const r = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(token));
    if (!r.ok) return null;
    const p = await r.json();
    if (String(p.email_verified) !== "true") return null;
    return { email: (p.email || "").toLowerCase(), ten: p.name || "" };
  } catch (e) { return null; }
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.status(405).json({ loi: "Chỉ nhận POST" }); return; }
  if (!KV_URL || !KV_TOKEN) { res.status(200).json({ kvOff: true }); return; }
  try {
    const b = req.body || {};

    if (b.action === "login") {
      let email = null, ten = "";
      const g = await verifyGoogle(b.credential);
      if (g) { email = g.email; ten = g.ten; }
      else email = String(b.email || "").toLowerCase();
      if (!email) { res.status(400).json({ loi: "Thiếu email" }); return; }
      if (ADMIN_CUNG.includes(email)) { res.status(200).json({ ok: true, vaiTro: "admin", quyen: "*" }); return; }
      const acc = await getJ(K_ACC);
      if (acc[email]) { res.status(200).json({ ok: true, vaiTro: acc[email].vaiTro || "nhanvien", quyen: acc[email].quyen || [] }); return; }
      const pend = await getJ(K_PEND);
      if (!pend[email]) {
        pend[email] = { ten: ten || String(b.ten || ""), phuongThuc: g ? "Google" : "Mật khẩu nội bộ", luc: new Date().toISOString() };
        await setJ(K_PEND, pend);
      }
      res.status(200).json({ ok: false, pending: true });
      return;
    }

    /* Hành động quản trị — bắt buộc token Google của Admin cứng */
    const g = await verifyGoogle(b.credential);
    if (!g || !ADMIN_CUNG.includes(g.email)) {
      res.status(403).json({ loi: "Cần đăng nhập Google bằng tài khoản Admin cứng" }); return;
    }
    const acc = await getJ(K_ACC), pend = await getJ(K_PEND);

    if (b.action === "list") { res.status(200).json({ accounts: acc, pending: pend }); return; }

    if (b.action === "grant") {
      const em = String(b.email || "").toLowerCase();
      if (!em) { res.status(400).json({ loi: "Thiếu email" }); return; }
      acc[em] = { vaiTro: b.vaiTro || "nhanvien", quyen: b.quyen === "*" ? "*" : (Array.isArray(b.quyen) ? b.quyen : []), ten: (pend[em] && pend[em].ten) || String(b.ten || "") };
      delete pend[em];
      await setJ(K_ACC, acc); await setJ(K_PEND, pend);
      res.status(200).json({ ok: true, accounts: acc, pending: pend }); return;
    }

    if (b.action === "revoke") {
      const em = String(b.email || "").toLowerCase();
      delete acc[em]; delete pend[em];
      await setJ(K_ACC, acc); await setJ(K_PEND, pend);
      res.status(200).json({ ok: true, accounts: acc, pending: pend }); return;
    }

    res.status(400).json({ loi: "action không hợp lệ" });
  } catch (e) { res.status(500).json({ loi: e.message }); }
};
