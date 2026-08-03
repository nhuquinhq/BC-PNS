/* =====================================================================
   HQLive — đọc dữ liệu thật từ Google Sheet (CSV đã publish)

   Không cần sửa file này khi vận hành.
   Chỉ sửa khi muốn thêm công thức tính cho một chỉ số mới.
   ===================================================================== */
window.HQLive = (function () {

  const CFG   = window.HQ_CONFIG || {};
  const COL   = CFG.columns || {};
  const P     = CFG.params  || {};
  const F     = CFG.filters || {};
  const store = {};          // { DM_NhanSu: [ {…}, {…} ], … }
  const meta  = {};          // { DM_NhanSu: {ok:true, n:148, at:"09:12"} }

  /* ---------- 1. Parser CSV (xử lý được dấu phẩy trong ngoặc kép) ---------- */
  function parseCSV(text) {
    const rows = [];
    let row = [], cell = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], n = text[i + 1];
      if (q) {
        if (c === '"' && n === '"') { cell += '"'; i++; }
        else if (c === '"') q = false;
        else cell += c;
      } else {
        if (c === '"') q = true;
        else if (c === ',') { row.push(cell); cell = ""; }
        else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ""; }
        else if (c !== '\r') cell += c;
      }
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    if (!rows.length) return [];
    const head = rows[0].map(h => h.trim());
    return rows.slice(1)
      .filter(r => r.some(v => String(v).trim() !== ""))
      .map(r => { const o = {}; head.forEach((h, i) => o[h] = (r[i] ?? "").trim()); return o; });
  }

  /* ---------- 2. Tải một nguồn ---------- */
  async function fetchOne(key, url) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const rows = parseCSV(await res.text());
      store[key] = rows;
      meta[key] = { ok: true, n: rows.length, at: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) };
      return true;
    } catch (e) {
      meta[key] = { ok: false, err: e.message };
      console.warn("[HQLive] Không đọc được nguồn " + key + ":", e.message);
      return false;
    }
  }

  /* ---------- 3. Tải toàn bộ nguồn đã khai báo ---------- */
  async function loadAll() {
    const jobs = Object.entries(CFG.sheets || {})
      .filter(([, url]) => url && url.trim())
      .map(([k, url]) => fetchOne(k, url.trim()));
    if (!jobs.length) return { loaded: 0, failed: 0 };
    const res = await Promise.all(jobs);
    return { loaded: res.filter(Boolean).length, failed: res.filter(x => !x).length };
  }

  /* ---------- 4. Tiện ích ---------- */
  const rows   = k => store[k] || [];
  const has    = k => Array.isArray(store[k]) && store[k].length > 0;
  const num    = v => { const n = parseFloat(String(v).replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".")); return isNaN(n) ? 0 : n; };
  const dangLam = r => !F.trangThaiDangLam || (r[COL.trangThai] || "").trim() === F.trangThaiDangLam;
  const nhanSu  = () => rows("DM_NhanSu").filter(dangLam);
  const dem     = (arr, f) => arr.reduce((m, r) => { const k = (f(r) || "Không rõ").trim(); m[k] = (m[k] || 0) + 1; return m; }, {});
  function tuoi(ds) {
    const d = new Date(String(ds).split(/[\/\-]/).reverse().join("-"));
    if (isNaN(d)) return null;
    return Math.floor((Date.now() - d) / 31557600000);
  }

  /* ---------- 5. Công thức tính chỉ số thật ----------
     Mỗi hàm nhận danh sách KPI mẫu và trả về danh sách đã thay số thật.
     Chỉ số nào chưa có công thức thì giữ nguyên số mẫu và bị đánh dấu "mẫu".
     Muốn thêm chỉ số: viết thêm một dòng set(...) trong đúng khối bên dưới.
  --------------------------------------------------------------------- */
  function apply(reportId, kpis) {
    const set = (ten, giaTri) => {
      const k = kpis.find(x => x.k === ten);
      if (k && giaTri != null && isFinite(giaTri)) { k.cur = giaTri; k.live = true; }
    };

    if (reportId === "HRM6" && has("DM_NhanSu")) {
      const ns = nhanSu();
      set("Headcount cuối kỳ", ns.length);
      set("Tổng nhân sự", ns.length);
      const ft = ns.filter(r => (r[COL.loaiHopDong] || "").trim() === F.loaiHopDongFT).length;
      set("Tỷ lệ nhân sự toàn thời gian", ns.length ? ft / ns.length * 100 : null);
      if (has("RAW_Offboard")) {
        const off = rows("RAW_Offboard").length;
        set("Turnover tháng", ns.length ? off / ns.length * 100 : null);
      }
      if (has("RAW_HoSo")) {
        const hs = rows("RAW_HoSo");
        const du = hs.filter(r => Object.values(r).filter(v => v === "✔" || v.toLowerCase() === "x" || v.toLowerCase() === "có").length >= 8).length;
        set("Tỷ lệ hồ sơ đầy đủ", hs.length ? du / hs.length * 100 : null);
      }
    }

    if (reportId === "HRM2" && has("RAW_ChamCong")) {
      const cc = rows("RAW_ChamCong");
      const phut = cc.reduce((s, r) => s + num(r["Phút muộn"]), 0);
      set("Tổng phút đi muộn", phut);
      set("Tiền phạt đi muộn", phut * (P.phatDiMuon || 1000) / 1e6);
      const chua = cc.filter(r => !/đã xác nhận/i.test(r["Xác nhận Lead"] || "")).length;
      set("Hồ sơ chưa xác nhận công", chua);
      const cong = cc.reduce((s, r) => s + num(r["Công thực tế"]), 0);
      set("Ngày công bình quân", cc.length ? cong / cc.length : null);
    }

    if (reportId === "HRM3" && has("RAW_Luong")) {
      const lg = rows("RAW_Luong");
      const p1 = lg.reduce((s, r) => s + num(r["P1"]), 0);
      const p2 = lg.reduce((s, r) => s + num(r["P2 vận hành"]) + num(r["P2 báo cáo"]), 0);
      const tong = lg.reduce((s, r) => s + num(r["Thực nhận"]), 0);
      set("Tổng quỹ lương kỳ", (p1 + p2) / 1e6);
      set("Quỹ lương kỳ", (p1 + p2) / 1e6);
      set("Lương bình quân đầu người", lg.length ? tong / lg.length / 1e6 : null);
      set("Tỷ trọng P1 cố định", (p1 + p2) ? p1 / (p1 + p2) * 100 : null);
    }

    if (reportId === "HRM1" && has("RAW_TuyenDung")) {
      const td = rows("RAW_TuyenDung");
      const mo = td.filter(r => !/đã đóng/i.test(r["Kết quả"] || "")).length;
      set("Vị trí đang mở", mo);
    }

    if (reportId === "HRM7" && has("RAW_BHXH")) {
      const bh = rows("RAW_BHXH");
      set("Số người đang tham gia", bh.filter(r => !/báo giảm/i.test(r["Nghiệp vụ"] || "")).length);
      const quy = bh.reduce((s, r) => s + num(r["Mức lương đóng"]), 0);
      set("Quỹ lương đóng bảo hiểm", quy / 1e6);
      set("Công ty đóng 21,5%", quy * (P.tyLeBH_congTy || 21.5) / 100 / 1e6);
      set("Người lao động đóng 10,5%", quy * (P.tyLeBH_nguoiLD || 10.5) / 100 / 1e6);
    }

    if (reportId === "HRM4" && has("RAW_ChiPhiVP")) {
      const cp = rows("RAW_ChiPhiVP");
      const ns = cp.reduce((s, r) => s + num(r["Ngân sách"]), 0);
      const tc = cp.reduce((s, r) => s + num(r["Thực chi"]), 0);
      set("Tổng chi trong kỳ", tc / 1e6);
      set("Tỷ lệ thực chi trên ngân sách", ns ? tc / ns * 100 : null);
      set("Số khoản mục vượt trần", cp.filter(r => num(r["Thực chi"]) > num(r["Ngân sách"]) * 1.1).length);
    }

    if (reportId === "HRM5" && has("RAW_ChiPhiTT")) {
      const tt = rows("RAW_ChiPhiTT");
      set("Chi truyền thông nội bộ trong kỳ", tt.reduce((s, r) => s + num(r["Thực chi"]), 0) / 1e6);
      const co = tt.filter(r => num(r["Được mời"]) > 0);
      set("Tỷ lệ tham gia bình quân", co.length ? co.reduce((s, r) => s + num(r["Tham gia"]) / num(r["Được mời"]) * 100, 0) / co.length : null);
    }

    if (reportId === "HRM8" && has("RAW_Workload")) {
      const wl = rows("RAW_Workload");
      const tai = wl.map(r => num(r["Giờ/tháng"]) / (P.gioChuan || 176) * 100).filter(x => x > 0);
      if (tai.length) {
        set("Mức tải bình quân", tai.reduce((a, b) => a + b, 0) / tai.length);
        set("Tỷ lệ nhân sự quá tải", tai.filter(x => x > (P.nguongQuaTai || 120)).length / tai.length * 100);
        set("Tỷ lệ nhân sự dưới tải", tai.filter(x => x < (P.nguongDuoiTai || 70)).length / tai.length * 100);
      }
    }

    return kpis;
  }

  /* ---------- 6. Bảng dữ liệu nguồn trực tiếp ---------- */
  function sheetTable(key, id) {
    if (!has(key)) return "";
    const data = store[key];
    const cols = Object.keys(data[0]);
    const th = cols.map(c => `<th>${c}</th>`).join("");
    const tb = data.slice(0, 300).map((r, i) =>
      `<tr><td class="idx">${i + 1}</td>${cols.map(c => `<td>${r[c] || ""}</td>`).join("")}</tr>`).join("");
    return `<div class="tw"><table id="${id}"><thead><tr><th class="idx">#</th>${th}</tr></thead><tbody>${tb}</tbody></table></div>`;
  }

  /* ---------- 7. Trạng thái ---------- */
  function status() {
    const khai = Object.entries(CFG.sheets || {}).filter(([, u]) => u && u.trim()).length;
    const oke  = Object.values(meta).filter(m => m.ok).length;
    const loi  = Object.values(meta).filter(m => !m.ok).length;
    return { khai, oke, loi, meta };
  }

  return { loadAll, apply, rows, has, num, nhanSu, dem, tuoi, sheetTable, status, store, meta, parseCSV };
})();
