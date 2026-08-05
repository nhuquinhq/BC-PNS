/* =====================================================================
   /api/csv — đọc hộ CSV từ Google Sheet (dự phòng khi trình duyệt bị
   chặn CORS). Gọi: /api/csv?u=<url đã encode>

   Chỉ nhận host docs.google.com và googleusercontent.com để không
   biến thành proxy mở.
   ===================================================================== */
const CHO_PHEP = /(^|\.)docs\.google\.com$|(^|\.)googleusercontent\.com$/;

module.exports = async (req, res) => {
  const u = (req.query && (req.query.u || req.query.url)) || "";
  if (!u) { res.status(400).send("Thiếu tham số u"); return; }
  let target;
  try { target = new URL(u); } catch (e) { res.status(400).send("URL không hợp lệ"); return; }
  if (target.protocol !== "https:" || !CHO_PHEP.test(target.hostname)) {
    res.status(403).send("Chỉ đọc được link Google Sheet đã publish"); return;
  }
  try {
    const r = await fetch(target.toString(), {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BC-PNS/1.0)", "Accept": "text/csv,*/*" }
    });
    const text = await r.text();
    if (!r.ok) { res.status(502).send(`Google trả về HTTP ${r.status}`); return; }
    if (/^\s*<(!doctype|html)/i.test(text)) {
      res.status(502).send("Tab chưa được Publish to web dạng CSV (Google trả về HTML)"); return;
    }
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
    res.status(200).send(text);
  } catch (e) {
    res.status(502).send("Không đọc được nguồn: " + e.message);
  }
};
