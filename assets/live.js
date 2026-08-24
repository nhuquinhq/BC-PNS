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
  const thoRaw = {};         // { RAW_TuyenDung: [ ["STT","Ngày",…], … ] } — dạng mảng thô
  const meta  = {};          // { DM_NhanSu: {ok:true, n:148, at:"09:12"} }

  /* ---------- 1. Parser CSV (xử lý được dấu phẩy trong ngoặc kép) ----------
     tachCSV  → mảng hai chiều đúng thứ tự cột, KHÔNG bỏ dòng nào.
                Dùng cho các sheet có tiêu đề nằm giữa bảng (đề xuất tuyển
                dụng, theo dõi SLA) — phải đọc theo vị trí cột.
     parseCSV → gán tiêu đề dòng đầu thành khoá object (các sheet còn lại). */
  function tachCSV(text) {
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
    return rows;
  }
  /* Bỏ dấu + hạ chữ thường để so tên cột / giá trị không phụ thuộc cách gõ */
  const kd = s => String(s == null ? "" : s)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d").replace(/\s+/g, " ").trim().toLowerCase();

  /* Từ khoá nhận ra hàng tiêu đề thật của từng nguồn (nếu cần chỉ đích danh) */
  const TIEUDE = { DM_NhanSu: ["ho va ten"] };

  /* Nhiều tab của HQ có hàng đánh số cột và hàng banner gộp ô nằm TRÊN hàng
     tiêu đề thật. Ví dụ tab DATA của "DATA NHÂN SỰ HQ 2026":
        hàng 1  nguye,1,2,3,4,…            ← hàng đánh số cột
        hàng 2  THÔNG TIN CÁ NHÂN,,,…      ← banner gộp ô
        hàng 3  STT,Mã NV,Họ và tên,…      ← tiêu đề thật
     Lấy mặc định hàng đầu sẽ ra tên cột "nguye", "1", "2"… và toàn bộ báo cáo
     nhân sự đọc ra rỗng. Hàm này bỏ qua các hàng đầu bảng không phải tiêu đề:
     hàng quá ít ô có chữ (banner) và hàng mà phần lớn ô là số hoặc ngày. */
  function dongTieuDe(rows, needles) {
    const gioiHan = Math.min(rows.length, 15);
    if (needles && needles.length) {
      for (let i = 0; i < gioiHan; i++) {
        const o = rows[i].map(kd);
        if (needles.every(nd => o.some(c => c.includes(nd)))) return i;
      }
    }
    const laSo = v => /^[\d.,\s/:-]+$/.test(String(v).trim());
    for (let i = 0; i < gioiHan; i++) {
      const co = rows[i].filter(v => String(v).trim() !== "");
      if (co.length < 3) continue;                       // banner gộp ô
      if (co.filter(laSo).length / co.length > 0.6) continue; // hàng đánh số cột
      return i;
    }
    return 0;
  }

  function parseCSV(text, needles) {
    const rows = tachCSV(text);
    if (!rows.length) return [];
    const h = dongTieuDe(rows, needles);
    /* Tiêu đề trùng tên (sheet nhân sự có nhiều cột "Cảnh báo", "Ngày hết hạn"…)
       được đánh số để không ghi đè nhau: "Cảnh báo", "Cảnh báo #2", … */
    const seen = {};
    const head = rows[h].map(t0 => {
      const t = t0.replace(/\s+/g, " ").trim();
      seen[t] = (seen[t] || 0) + 1;
      return seen[t] > 1 ? `${t} #${seen[t]}` : t;
    });
    return rows.slice(h + 1)
      .filter(r => r.some(v => String(v).trim() !== ""))
      .map(r => { const o = {}; head.forEach((h2, i) => o[h2] = (r[i] ?? "").trim()); return o; });
  }

  /* ---------- 2. Tải một nguồn ----------
     Đọc thẳng Google Sheet trước; nếu trình duyệt chặn CORS, link sai
     hay Google trả HTML thì đọc lại qua /api/csv trên Vercel.        */
  const gio = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  /* Có thời gian chờ tối đa: không để cuộc gọi treo vô hạn khiến bảng
     chẩn đoán đứng mãi ở trạng thái "chưa tải trong phiên này". */
  async function tai(url, giay) {
    const ac = typeof AbortController !== "undefined" ? new AbortController() : null;
    const hen = setTimeout(() => ac && ac.abort(), (giay || 10) * 1000);
    try {
      const res = await fetch(url, { cache: "no-store", signal: ac ? ac.signal : undefined });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const text = await res.text();
      if (/^\s*<(!doctype|html)/i.test(text)) throw new Error("Tab chưa Publish dạng CSV (nhận về HTML)");
      return text;
    } catch (e) {
      throw new Error(e.name === "AbortError" ? `Quá ${giay || 10} giây không phản hồi` : e.message);
    } finally { clearTimeout(hen); }
  }

  async function fetchOne(key, url) {
    let text = null, via = "Trực tiếp Google", loi = "";
    try {
      text = await tai(url, 8);
    } catch (e) {
      loi = e.message;
      try {
        text = await tai("/api/csv?u=" + encodeURIComponent(url), 25);
        via = "/api/csv dự phòng";
      } catch (e2) {
        meta[key] = { ok: false, err: `${loi} · dự phòng: ${e2.message}`, at: gio() };
        console.warn("[HQLive] Không đọc được nguồn " + key + ":", meta[key].err);
        return false;
      }
    }
    try {
      const rows = parseCSV(text, TIEUDE[key]);
      store[key] = rows;
      thoRaw[key] = tachCSV(text);
      meta[key] = { ok: true, n: rows.length, at: gio(), via };
      return true;
    } catch (e) {
      meta[key] = { ok: false, err: "Lỗi phân tích CSV: " + e.message, at: gio() };
      return false;
    }
  }

  /* ---------- 3. Tải toàn bộ nguồn đã khai báo ---------- */
  let dangTai = false;
  async function loadAll() {
    const ds = Object.entries(CFG.sheets || {}).filter(([, url]) => url && url.trim());
    if (!ds.length) return { loaded: 0, failed: 0 };
    dangTai = true;
    ds.forEach(([k]) => { if (!meta[k]) meta[k] = { dangTai: true }; });
    try {
      const res = await Promise.all(ds.map(([k, url]) => fetchOne(k, url.trim())));
      return { loaded: res.filter(Boolean).length, failed: res.filter(x => !x).length };
    } finally { dangTai = false; }
  }

  /* ---------- 4. Tiện ích ---------- */
  const rows   = k => store[k] || [];
  const has    = k => Array.isArray(store[k]) && store[k].length > 0;
  /* Đọc số từ ô sheet. Bản cũ bỏ MỌI dấu chấm rồi coi phẩy là thập phân —
     đúng với kiểu Việt Nam "15.000.000" nhưng gặp ô ghi thập phân bằng dấu
     chấm thì sai hẳn một bậc: num("80.0") ra 800, num("0.85") ra 85.
     Nay tự nhận dạng: dấu đứng SAU cùng là thập phân khi có cả hai loại;
     chỉ có dấu chấm thì đúng 3 chữ số phía sau (hoặc nhiều dấu chấm) mới là
     dấu nghìn, còn lại là thập phân. */
  const num = v => {
    const goc = String(v == null ? "" : v).trim();
    if (!goc) return 0;
    const m = goc.match(/-?\d[\d.,]*/);          // cụm số đầu tiên, không băm vụn chuỗi chữ
    if (!m) return 0;
    let s = m[0].replace(/[.,]+$/, "");
    const am = s.startsWith("-"); s = s.replace(/^-/, "");
    const cham = s.lastIndexOf("."), phay = s.lastIndexOf(",");
    let vt = -1;                                  // vị trí dấu thập phân
    if (cham >= 0 && phay >= 0) vt = Math.max(cham, phay);
    else if (phay >= 0) vt = (s.match(/,/g) || []).length > 1 ? -1 : phay;
    else if (cham >= 0) {
      const soCham = (s.match(/\./g) || []).length;
      /* Một dấu chấm với đúng ba chữ số phía sau chỉ là dấu NGHÌN khi phần
         nguyên có 1–3 chữ số ("15.000"). Còn "8803585.989" thì phần nguyên
         đã 7 chữ số — kiểu Việt Nam sẽ viết 8.803.585 — nên đó là dấu thập
         phân. Nhầm chỗ này làm con số phồng lên gấp 1000 lần. */
      const nghin = soCham > 1 || (s.length - cham - 1 === 3 && cham >= 1 && cham <= 3);
      vt = nghin ? -1 : cham;
    }
    const nguyen = (vt < 0 ? s : s.slice(0, vt)).replace(/[.,]/g, "");
    const le     = vt < 0 ? "" : s.slice(vt + 1).replace(/[.,]/g, "");
    const n = parseFloat(nguyen + (le ? "." + le : ""));
    return isNaN(n) ? 0 : (am ? -n : n);
  };
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

    /* ---- HRM6 · Tình hình nhân sự (từ DATA nhân sự tổng hợp) ---- */
    if (reportId === "HRM6" && hasHR()) {
      const act = dangLamHR(), all = hrRows();
      const den = (typeof RANGE !== "undefined" && RANGE && RANGE.to) ? new Date(RANGE.to) : new Date();
      const bd = bienDong(6, den), ky = bd[bd.length - 1] || { vao: 0, ra: 0, hc: act.length };
      const setSp = (ten, giaTri, sp, prev) => {
        const k = kpis.find(x => x.k === ten); if (!k || giaTri == null || !isFinite(giaTri)) return;
        k.cur = giaTri; k.live = true;
        if (prev != null && isFinite(prev)) k.prev = prev;
        if (sp && sp.length >= 2) k.sp = sp;
      };
      setSp("Headcount cuối kỳ", ky.hc, bd.map(x => x.hc), bd.length > 1 ? bd[bd.length - 2].hc : null);
      setSp("Tổng nhân sự", act.length);
      setSp("Turnover tháng", ky.turnover, bd.map(x => x.turnover), bd.length > 1 ? bd[bd.length - 2].turnover : null);
      /* Turnover luỹ kế năm: số nghỉ từ đầu năm tới mốc chốt, chia cho
         headcount bình quân của cả giai đoạn đó — không chia cho số người
         đang làm như bản cũ (mẫu số đó bỏ sót toàn bộ người đã nghỉ). */
      const nam = den.getFullYear();
      const raNam = all.filter(r => r.nghi && r.nghi.getFullYear() === nam && r.nghi <= den).length;
      const hcDauNam = headcountAt(all, new Date(nam - 1, 11, 31, 23, 59, 59));
      setSp("Turnover luỹ kế năm", tyLeNghiViec(raNam, hcDauNam, headcountAt(all, den)));
      const daNghi = all.filter(r => r.nghi);
      const duoi12 = daNghi.filter(r => r.tn < 12).length;
      setSp("Tỷ lệ nghỉ dưới 12 tháng", daNghi.length ? duoi12 / daNghi.length * 100 : null);
      const thuViec = daNghi.filter(r => r.tn < 3).length;
      setSp("Tỷ lệ nghỉ trong thử việc", daNghi.length ? thuViec / daNghi.length * 100 : null);
      setSp("Tỷ lệ hồ sơ đầy đủ", tyLeHoSoDu());
      setSp("Tỷ lệ nhân sự toàn thời gian", act.length ? act.filter(r => !r.ctv).length / act.length * 100 : null);
      setSp("Thâm niên bình quân", act.length ? act.reduce((s, r) => s + r.tn, 0) / act.length : null);
      setSp("Tuổi bình quân", act.filter(r => r.tuoi).length
        ? act.filter(r => r.tuoi).reduce((s, r) => s + r.tuoi, 0) / act.filter(r => r.tuoi).length : null);
      const sp = spanQL();
      setSp("Quản lý quá tải", sp.filter(([, n]) => n > 10).length);
      /* onboard / nghỉ đếm theo đúng phạm vi lọc Từ ngày – Đến ngày */
      const tu = (typeof RANGE !== "undefined" && RANGE && RANGE.from) ? new Date(RANGE.from) : new Date(den.getFullYear(), 0, 1);
      setSp("Nhân sự onboard trong kỳ", all.filter(r => r.vao && r.vao >= tu && r.vao <= den).length, bd.map(x => x.vao));
      setSp("Nhân sự nghỉ trong kỳ", all.filter(r => r.nghi && r.nghi >= tu && r.nghi <= den).length, bd.map(x => x.ra));
    }

    /* ---- HRM8 · Phân bổ khối lượng việc và phân bổ lương về team ---- */
    if (reportId === "HRM8" && coPB()) {
      const T = pbTong(), team = pbTheoTeam(), bp = pbTheoBoPhan();
      const setP = (ten, v) => { const k = kpis.find(x => x.k === ten);
        if (k && v != null && isFinite(v)) { k.cur = v; k.live = true; } };
      const tr = x => x / 1e6;
      setP("Quỹ lương đã phân bổ", tr(T.daChia));
      setP("Số team nhận phân bổ", T.soTeam);
      if (T.daChia) {
        const tct = team.find(x => /tổng công ty|cong ty/i.test(x[0]));
        /* Phần giữ lại ở Tổng Công Ty là chi phí chung không chia được về team */
        setP("Giữ tại Tổng Công Ty", tr(tct ? tct[1] : 0));
        setP("Tỷ lệ phân bổ về team", (T.daChia - (tct ? tct[1] : 0)) / T.daChia * 100);
        setP("Team nhận nhiều nhất", tr(team.filter(x => !/tổng công ty|cong ty/i.test(x[0]))
          .reduce((m, x) => Math.max(m, x[1]), 0)));
        const kd = team.filter(x => !/tổng công ty|cong ty/i.test(x[0]));
        setP("Bình quân mỗi team", kd.length ? tr(kd.reduce((s, x) => s + x[1], 0) / kd.length) : null);
      }
      if (bp.length) {
        setP("Bộ phận gánh chi phí lớn nhất", tr(bp[0][1]));
        setP("Số bộ phận tham gia", bp.length);
      }
      if (pbDang() === "nguoi") {
        setP("Nhân sự được phân bổ", T.soNguoi);
        setP("Nhân sự phục vụ nhiều team", T.dungChung);
        setP("Tỷ lệ nhân sự dùng chung", T.soNguoi ? T.dungChung / T.soNguoi * 100 : null);
        const ds = pbDS().filter(r => r.soTeam);
        setP("Số team bình quân mỗi người",
          ds.length ? ds.reduce((s, r) => s + r.soTeam, 0) / ds.length : null);
        setP("Lương chưa chia về team", tr(T.chuaChia));
      }
    }

    /* ---- HRM3 · Quỹ lương 12 tháng (tab DATA 2026) ---- */
    if (reportId === "HRM3" && coLuong()) {
      const q = quyLuongThang(), tn = tongLuongNam(), ct = tn.thangChot;
      const nay = q[ct - 1], truoc = ct > 1 ? q[ct - 2] : null, dau = q[0];
      const setQ = (ten, v, sp, prev) => {
        const k = kpis.find(x => x.k === ten); if (!k || v == null || !isFinite(v)) return;
        k.cur = v; k.live = true;
        if (prev != null && isFinite(prev)) k.prev = prev;
        if (sp && sp.length >= 2) k.sp = sp;
      };
      const tr = x => x / 1e6;                       // đồng → triệu đồng
      if (nay) {
        setQ("Quỹ lương tháng gần nhất", tr(nay.tong), q.filter(x => !x.duTru).map(x => tr(x.tong)),
             truoc ? tr(truoc.tong) : null);
        setQ("Lương bình quân đầu người", tr(nay.bq), q.filter(x => !x.duTru).map(x => tr(x.bq)),
             truoc ? tr(truoc.bq) : null);
        setQ("Nhân sự hưởng lương", nay.soNguoi, q.filter(x => !x.duTru).map(x => x.soNguoi),
             truoc ? truoc.soNguoi : null);
        if (truoc && truoc.tong) setQ("Biến động quỹ lương", (nay.tong - truoc.tong) / truoc.tong * 100);
        if (dau && dau.tong) setQ("Giảm quỹ lương so tháng 1", (dau.tong - nay.tong) / dau.tong * 100);
        const tongThang = nay.tong || 1;
        const bod = luongTheo(r => /bod/i.test(r.cap) ? "BOD" : "Khác", ct).find(x => x[0] === "BOD");
        setQ("Tỷ trọng quỹ lương BOD", bod ? bod[1] / tongThang * 100 : 0);
        const top = luongTheo(r => r.phong, ct, 1)[0];
        setQ("Phòng chi lương cao nhất", top ? tr(top[1]) : null);
      }
      setQ("Quỹ lương luỹ kế đã chốt", tr(tn.chot));
      setQ("Quỹ lương dự trù còn lại", tr(tn.duTru));
      setQ("Tổng quỹ lương cả năm", tr(tn.ca));
      setQ("Quỹ lương bình quân tháng", ct ? tr(tn.chot / ct) : null);
      /* Có lương tháng 1 nhưng tới tháng chốt thì không còn trên bảng lương */
      const ds = luongDS();
      setQ("Rời bảng lương từ đầu năm",
        ds.filter(r => r.thang[1] > 0 && !(r.thang[ct] > 0)).length);
    }

    /* ---- HRM3 · Payroll & C&B (lương từ cùng nguồn) ---- */
    if (reportId === "HRM3" && hasHR()) {
      const act = dangLamHR().filter(r => r.luong > 0);
      const setL = (ten, v) => { const k = kpis.find(x => x.k === ten); if (k && v != null && isFinite(v)) { k.cur = v; k.live = true; } };
      if (act.length) {
        const tong = act.reduce((s, r) => s + r.luong, 0);
        const p1 = act.reduce((s, r) => s + (r.p1 || 0), 0), p2 = act.reduce((s, r) => s + (r.p2 || 0), 0);
        const pc = act.reduce((s, r) => s + (r.pc || 0), 0);
        setL("Tổng quỹ lương kỳ", tong / 1e6);
        setL("Quỹ lương kỳ", tong / 1e6);
        /* "Lương bình quân đầu người" nay lấy từ tab DATA 2026 ở khối phía
           trên — cột lương của sheet nhân sự chỉ là mức hiện hành, không
           phải tiền thực chi từng tháng nên hai con số lệch nhau. */
        setL("Tỷ trọng P1 cố định", (p1 + p2) ? p1 / (p1 + p2) * 100 : null);
        setL("Tổng phụ cấp và thưởng", pc / 1e6);
        setL("Tỷ lệ nhân sự đạt đủ P2", act.length ? act.filter(r => r.p2 > 0).length / act.length * 100 : null);
        const tl = tangLuong();
        setL("Tỷ lệ nhân sự đã tăng lương", tl.tyLe);
        setL("Mức tăng lương bình quân", tl.mucBQ);
        setL("Chưa tăng lương trên 12 tháng", tl.chuaTang.length);
        const bands = dailuong();
        const lech = act.filter(r => { const b = bands.find(x => x.level === r.level); return b && (r.luong < b.min || r.luong > b.max); }).length;
        setL("Nhân sự lệch dải lương", lech);
      }
    }

    /* ---- HRM7 · Hợp đồng & pháp lý ---- */
    if (reportId === "HRM7" && hasHR()) {
      const act = dangLamHR();
      const setC = (ten, v) => { const k = kpis.find(x => x.k === ten); if (k && v != null && isFinite(v)) { k.cur = v; k.live = true; } };
      setC("Hợp đồng hết hạn trong 30 ngày", hetHanHD(30).length);
      setC("Hợp đồng hết hạn trong 60 ngày", hetHanHD(60).length);
      setC("Hợp đồng đã quá hạn", act.filter(r => r.conLai !== null && r.conLai < 0).length);
      setC("Tỷ lệ đã ký NDA", act.length ? act.filter(r => r.nda).length / act.length * 100 : null);
      setC("Nhân sự chưa ký NDA", act.filter(r => !r.nda).length);
      setC("Cảnh báo hợp đồng đang mở", act.filter(r => r.canhBao.length).length);
      setC("Nhân sự đang thử việc", act.filter(r => /thử việc|học việc/i.test(r.tt)).length);
    }

    if (reportId === "HRM2") {
      /* Chấm công tách theo tháng: RAW_ChamCong_T1 … T6.
         Tháng hiển thị lấy theo bộ lọc "Đến ngày" (RANGE), lùi về tháng
         gần nhất có dữ liệu; tháng liền trước làm số so sánh; chuỗi các
         tháng đã nối làm sparkline. */
      const avail = [1, 2, 3, 4, 5, 6].map(i => "RAW_ChamCong_T" + i).filter(has);
      if (avail.length) {
        let mi = 6;
        if (typeof RANGE !== "undefined" && RANGE && RANGE.to) mi = Math.min(6, Math.max(1, parseInt(RANGE.to.split("-")[1], 10)));
        while (mi > 1 && !has("RAW_ChamCong_T" + mi)) mi--;
        const key = has("RAW_ChamCong_T" + mi) ? "RAW_ChamCong_T" + mi : avail[avail.length - 1];
        const pkey = "RAW_ChamCong_T" + (parseInt(key.slice(-1), 10) - 1);

        const phutM = k => rows(k).reduce((s, r) => s + num(r["Phút muộn"]), 0);
        const tienM = k => phutM(k) * (P.phatDiMuon || 1000) / 1e6;
        const chuaM = k => rows(k).filter(r => !/đã xác nhận/i.test(r["Xác nhận Lead"] || "")).length;
        const congM = k => { const rr = rows(k); return rr.length ? rr.reduce((s, r) => s + num(r["Công thực tế"]), 0) / rr.length : null; };

        const setFull = (ten, f) => {
          const k = kpis.find(x => x.k === ten); if (!k) return;
          const cur = f(key);
          if (cur == null || !isFinite(cur)) return;
          k.cur = cur; k.live = true;
          const prev = has(pkey) ? f(pkey) : null;
          if (prev != null && isFinite(prev)) k.prev = prev;
          const sp = avail.map(f).filter(v => v != null && isFinite(v));
          if (sp.length >= 2) k.sp = sp;
        };
        setFull("Tổng phút đi muộn", phutM);
        setFull("Tiền phạt đi muộn", tienM);
        setFull("Hồ sơ chưa xác nhận công", chuaM);
        setFull("Ngày công bình quân", congM);
      }
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

    /* ---- HRM1 · Tuyển dụng (phễu ứng viên + đề xuất + SLA) ---- */
    if (reportId === "HRM1") {
      const setSp = (ten, v, sp, prev) => {
        const k = kpis.find(x => x.k === ten); if (!k || v == null || !isFinite(v)) return;
        k.cur = v; k.live = true;
        if (prev != null && isFinite(prev)) k.prev = prev;
        if (sp && sp.length >= 2) k.sp = sp;
      };
      const ty = (a, b) => b > 0 ? a / b * 100 : null;

      if (coTD()) {
        const s = tdStats();
        const mt = tdThang().filter(m => m.total > 0 || m.nhanViec > 0);
        const cot = f => mt.map(f);
        const truoc = f => mt.length > 1 ? f(mt[mt.length - 2]) : null;
        setSp("Tổng CV thu thập", s.total, cot(m => m.total), truoc(m => m.total));
        setSp("CV pass lọc HR", s.hrPass, cot(m => m.hrPass), truoc(m => m.hrPass));
        setSp("CV pass lọc Leader", s.leadPass);
        setSp("Tỷ lệ pass lọc HR", ty(s.hrPass, s.total),
          cot(m => m.total ? m.hrPass / m.total * 100 : 0));
        setSp("Ứng viên tới phỏng vấn", s.thamGiaPV, cot(m => m.thamGiaPV), truoc(m => m.thamGiaPV));
        setSp("Ứng viên pass phỏng vấn", s.passPV, cot(m => m.passPV), truoc(m => m.passPV));
        setSp("Ứng viên nhận việc", s.nhanViec, cot(m => m.nhanViec), truoc(m => m.nhanViec));
        setSp("Ứng viên đi làm đủ 10 ngày", s.d10, cot(m => m.d10), truoc(m => m.d10));
        setSp("Tỷ lệ CV thành nhận việc", ty(s.nhanViec, s.total),
          cot(m => m.total ? m.nhanViec / m.total * 100 : 0));
        setSp("Tỷ lệ bỏ cuộc sau nhận việc", ty(s.dropout, s.nhanViec));
        setSp("Số CV trên một vị trí", tdNhom(c => c.viTri).length
          ? s.total / tdNhom(c => c.viTri).length : null);
      }

      if (coDX()) {
        const d = dxStats();
        setSp("Tổng chỉ tiêu cần tuyển", d.can);
        setSp("Đã nhận việc theo đề xuất", d.nhan);
        setSp("Chỉ tiêu còn lại", d.conLai);
        setSp("Tỷ lệ hoàn thành chỉ tiêu", ty(d.nhan, d.can));
        setSp("Vị trí đang tuyển", d.dangTuyen);
        setSp("Vị trí đang mở", d.dangTuyen);
      }

      if (coSLA()) {
        const q = slaStats();
        setSp("Tỷ lệ đúng hạn SLA gửi CV", q.tyDungHanCV);
        setSp("Vị trí trễ hạn SLA", q.treCV);
      }
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

  /* =====================================================================
     5b. BỘ DỮ LIỆU NHÂN SỰ TỔNG HỢP (tab DATA — DATA NHÂN SỰ HQ)
     Nguồn DM_NhanSu. Tên cột dò theo từ khoá nên sheet đổi nhẹ vẫn chạy.
     ===================================================================== */
  const HRSRC = "DM_NhanSu";
  let _hr = null, _hrLen = -1;

  const nm = s => String(s == null ? "" : s).replace(/[\"\n\r]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  function idxOf(row) { const m = {}; Object.keys(row).forEach(h => { const n = nm(h); if (!(n in m)) m[n] = h; }); return m; }
  function findCol(idx, needles) {
    for (const nd of needles) if (idx[nd]) return idx[nd];
    for (const nd of needles) { const k = Object.keys(idx).find(h => h.includes(nd)); if (k) return idx[k]; }
    return null;
  }
  function colsLike(idx, needle) {                       // mọi cột khớp, giữ thứ tự sheet
    return Object.keys(idx).filter(h => h.includes(needle)).map(h => idx[h]);
  }
  /* ---------- 4b. NGÀY THÁNG KIỂU VIỆT NAM & THÂM NIÊN ----------
     Sheet nhân sự ghi ngày dạng DD/MM/YYYY. Bản cũ dựng Date thẳng từ chuỗi
     nên hai loại dữ liệu bẩn lọt lưới và kéo "Thâm niên bình quân" xuống ÂM:
       · năm hai chữ số luôn quy về 20xx — "01/01/95" thành 2095, mốc nhận
         việc rơi vào tương lai nên số tháng ra âm (đây là nguồn của −62,8);
       · ngày không tồn tại (31/02) bị JS tự cuộn sang tháng sau mà không
         báo lỗi, cho ra mốc sai lệch vài ngày.
     parseVietnameseDate chuẩn hoá rồi KIỂM TRA NGƯỢC lại ngày; chuỗi không
     hợp lệ trả null để bên gọi bỏ qua thay vì tính ra số vô nghĩa. */
  function namDayDu(y, soChuSo) {
    if (soChuSo >= 4) return y;
    /* Cửa sổ trượt quanh năm hiện tại: "26" → 2026, "95" → 1995.
       Cho phép sớm hơn 5 năm để còn nhận ngày hẹn làm việc ở tương lai gần. */
    const nayNgan = new Date().getFullYear() % 100;
    return y <= nayNgan + 5 ? 2000 + y : 1900 + y;
  }
  function parseVietnameseDate(dateStr) {
    if (dateStr instanceof Date) return isNaN(dateStr.getTime()) ? null : dateStr;
    const s = String(dateStr == null ? "" : dateStr).trim();
    if (!s) return null;

    let ng, th, na;
    let m = s.match(/^(\d{1,2})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{2,4})/);   // DD/MM/YYYY
    if (m) { ng = +m[1]; th = +m[2]; na = namDayDu(+m[3], m[3].length); }
    else {
      m = s.match(/^(\d{4})\s*[\/\-.]\s*(\d{1,2})\s*[\/\-.]\s*(\d{1,2})/);       // YYYY-MM-DD
      if (m) { na = +m[1]; th = +m[2]; ng = +m[3]; }
      else {
        /* Google Sheets đôi khi xuất ngày thành số sê-ri (số ngày kể từ 30/12/1899) */
        const so = /^\d+(?:[.,]\d+)?$/.test(s) ? parseFloat(s.replace(",", ".")) : NaN;
        if (isFinite(so) && so >= 1 && so <= 80000) {
          const d = new Date(1899, 11, 30 + Math.floor(so));
          return isNaN(d.getTime()) ? null : d;
        }
        return null;
      }
    }
    if (th < 1 || th > 12 || ng < 1 || ng > 31) return null;
    const d = new Date(na, th - 1, ng);
    /* 31/02 bị JS cuộn sang 03/03 nên ba thành phần đọc ra sẽ lệch — loại bỏ */
    if (d.getFullYear() !== na || d.getMonth() !== th - 1 || d.getDate() !== ng) return null;
    return d;
  }

  /* Số tháng thâm niên giữa hai mốc, làm tròn 1 chữ số thập phân.
     LUÔN >= 0: ngày nhận việc nằm sau ngày chốt (gõ nhầm năm, nhân sự ký
     trước ngày đi làm) trả 0 chứ không trả số âm kéo tụt số bình quân của
     cả công ty. endDate bỏ trống thì tính tới hôm nay. */
  function calculateTenureMonths(startDate, endDate) {
    const batDau = parseVietnameseDate(startDate);
    if (!batDau) return 0;
    const ketThuc = endDate == null ? new Date() : parseVietnameseDate(endDate);
    if (!ketThuc || ketThuc <= batDau) return 0;

    let soThang = (ketThuc.getFullYear() - batDau.getFullYear()) * 12
                + (ketThuc.getMonth() - batDau.getMonth());
    const lechNgay = ketThuc.getDate() - batDau.getDate();
    let le;
    if (lechNgay < 0) {
      /* Chưa qua ngày kỷ niệm trong tháng: lùi một tháng rồi tính phần lẻ
         theo độ dài tháng liền trước mốc kết thúc. */
      soThang -= 1;
      const dai = new Date(ketThuc.getFullYear(), ketThuc.getMonth(), 0).getDate();
      le = (dai + lechNgay) / dai;
    } else {
      const dai = new Date(batDau.getFullYear(), batDau.getMonth() + 1, 0).getDate();
      le = lechNgay / dai;
    }
    return Math.max(0, Math.round((soThang + le) * 10) / 10);
  }

  /* Trần thâm niên hợp lý: 50 năm. Trên mức này chắc chắn là lỗi công thức */
  const TN_TOI_DA = 600;
  /* Giá trị cột "Tình trạng" được coi là còn đi làm */
  const TT_DANG_LAM = /đang làm|đang thử việc|thử việc|học việc/i;
  const dt = parseVietnameseDate;                        // tên cũ dùng khắp file
  const thang = (a, b) => (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());

  function hrRows() {
    const src = rows(HRSRC);
    if (!src.length) return [];
    if (_hr && _hrLen === src.length) return _hr;
    const I = idxOf(src[0]);
    const C = {
      ma:    findCol(I, ["mã nv (nhập 2)", "mã nv", "mã nhân viên"]),
      ten:   findCol(I, ["họ và tên", "họ tên"]),
      vp:    findCol(I, ["văn phòng"]),
      sinh:  findCol(I, ["ngày sinh"]),
      gt:    findCol(I, ["giới tính"]),
      tuoi:  findCol(I, ["tuổi"]),
      tt:    findCol(I, ["tình trạng"]),
      vao:   findCol(I, ["ngày nhận việc", "ngày vào"]),
      nghi:  findCol(I, ["ngày nghỉ việc"]),
      khoi:  findCol(I, ["khối"]),
      phong: findCol(I, ["phòng/ban", "phòng ban"]),
      cv:    findCol(I, ["chức vụ"]),
      cn:    findCol(I, ["chức năng"]),
      vt:    findCol(I, ["vị trí"]),
      ql:    findCol(I, ["quản lý trực tiếp"]),
      mail:  findCol(I, ["email công ty"]),
      mailcn:findCol(I, ["email cá nhân"]),
      sdt:   findCol(I, ["sđt", "số điện thoại"]),
      cccd:  findCol(I, ["cmnd/cccd", "cccd"]),
      hk:    findCol(I, ["hộ khẩu"]),
      noio:  findCol(I, ["nơi ở hiện tại"]),
      hn:    findCol(I, ["tình trạng hôn nhân"]),
      stk:   findCol(I, ["số tài khoản"]),
      xe:    findCol(I, ["loại xe"]),
      hv:    findCol(I, ["trình độ học vấn"]),
      truong:findCol(I, ["trường đh"]),
      nganh: findCol(I, ["ngành"]),
      cc:    findCol(I, ["chứng chỉ"]),
      level: findCol(I, ["level"]),
      luong: findCol(I, ["lương hiện tại"]),
      lkd:   findCol(I, ["lương chính thức khởi điểm"]),
      p1:    findCol(I, ["mức lương đóng bhxh (p1)", "(p1)"]),
      p2:    findCol(I, ["lương hiệu suất (p2)", "(p2)"]),
      lcc:   findCol(I, ["lương chuyên cần"]),
      pctn:  findCol(I, ["phụ cấp trách nhiệm"]),
      tcc:   findCol(I, ["thưởng chuyên cần"]),
      an:    findCol(I, ["tiền ăn"]),
      pctb:  findCol(I, ["phụ cấp thiết bị"]),
      tlh:   findCol(I, ["tỉ lệ hưởng lương", "tỷ lệ hưởng lương"]),
      nda:   findCol(I, ["ngày ký nda"]),
      mst:   findCol(I, ["mã số thuế thu nhập cá nhân"]),
      the:   findCol(I, ["tt thẻ nv"]),
      off1:  findCol(I, ["tài khoản 1office"]),
      tn:    findCol(I, ["thâm niên"])
    };
    const colTang = colsLike(I, "thay đổi lương lần");
    const colHan  = colsLike(I, "hết hạn");
    const colCb   = colsLike(I, "cảnh báo");
    const g = (r, c) => c ? String(r[c] || "").trim() : "";
    const now = new Date();

    _hr = src.map(r => {
      const vao = dt(g(r, C.vao)), nghi = dt(g(r, C.nghi)), sinh = dt(g(r, C.sinh));
      const tt = g(r, C.tt), cv = g(r, C.cv), vt = g(r, C.vt);
      const ctv = /cộng tác|ctv|part\s*time|thời vụ/i.test(cv + " " + vt);
      const o = {
        ma: g(r, C.ma), ten: g(r, C.ten), vp: g(r, C.vp) || "Không rõ",
        sinh, gt: g(r, C.gt) || "Không rõ",
        /* Tuổi: cột sẵn có phải nằm trong khoảng hợp lý, nếu không thì tính
           lại từ ngày sinh. Ngày sinh gõ nhầm sang tương lai cho ra 0 chứ
           không cho ra tuổi âm. */
        tuoi: (num(g(r, C.tuoi)) > 0 && num(g(r, C.tuoi)) < 100)
          ? num(g(r, C.tuoi))
          : (sinh ? Math.floor(calculateTenureMonths(sinh, now) / 12) : 0),
        tt, vao, nghi,
        khoi: g(r, C.khoi) || "Không rõ", phong: g(r, C.phong) || "Không rõ",
        cv: cv || "Không rõ", cn: g(r, C.cn) || "Không rõ", vt,
        ql: g(r, C.ql), mail: g(r, C.mail), mailcn: g(r, C.mailcn), sdt: g(r, C.sdt),
        cccd: g(r, C.cccd), hk: g(r, C.hk), noio: g(r, C.noio),
        hn: g(r, C.hn) || "Không rõ", stk: g(r, C.stk), xe: g(r, C.xe) || "Không rõ",
        hv: g(r, C.hv) || "Không rõ", truong: g(r, C.truong), nganh: g(r, C.nganh), cc: g(r, C.cc),
        level: g(r, C.level) || "Chưa xếp",
        luong: num(g(r, C.luong)), lkd: num(g(r, C.lkd)),
        p1: num(g(r, C.p1)), p2: num(g(r, C.p2)),
        pc: num(g(r, C.lcc)) + num(g(r, C.pctn)) + num(g(r, C.tcc)) + num(g(r, C.an)) + num(g(r, C.pctb)),
        lcc: num(g(r, C.lcc)), pctn: num(g(r, C.pctn)), tcc: num(g(r, C.tcc)),
        an: num(g(r, C.an)), pctb: num(g(r, C.pctb)), tlh: num(g(r, C.tlh)),
        nda: g(r, C.nda), mst: g(r, C.mst), the: g(r, C.the), off1: g(r, C.off1),
        tang: colTang.map(c => num(g(r, c))).filter(v => v > 0),
        canhBao: colCb.map(c => g(r, c)).filter(Boolean),
        ctv,
        /* Tình trạng trên sheet có phải "đang đi làm" hay không — tách riêng
           để headcount còn dùng lại khi ô Ngày nghỉ việc bỏ trống. */
        ttDangLam: TT_DANG_LAM.test(tt),
        dangLam: TT_DANG_LAM.test(tt) && !nghi
      };
      /* Thâm niên: cột "Thâm niên (Tháng)" của sheet là công thức, hồ sơ nào
         bỏ trống Ngày nhận việc thì công thức cho ra giá trị vô lý (đã gặp
         1519 tháng ≈ 126 năm, đủ để kéo lệch bình quân của cả công ty).
         Chỉ tin khi là số dương và nằm trong khoảng người thật đi làm được;
         ngoài khoảng đó thì tính lại từ ngày nhận việc. */
      const tnSheet = C.tn ? num(g(r, C.tn)) : 0;
      o.tn = (tnSheet > 0 && tnSheet <= TN_TOI_DA) ? tnSheet : calculateTenureMonths(vao, nghi);
      /* Hạn hợp đồng: ưu tiên mốc gần nhất CÒN hiệu lực; nếu mọi mốc đã
         qua thì lấy mốc muộn nhất — nghĩa là hợp đồng đã quá hạn. */
      let tuong = null, quaKhu = null;
      colHan.forEach(c => {
        const d = dt(g(r, c)); if (!d) return;
        if (d >= now) { if (!tuong || d < tuong) tuong = d; }
        else if (!quaKhu || d > quaKhu) quaKhu = d;
      });
      const best = tuong || quaKhu;
      o.hetHan = best;
      o.conLai = best ? Math.round((best - now) / 86400000) : null;
      return o;
    }).filter(x => x.ten || x.ma);
    _hrLen = src.length;
    return _hr;
  }

  const hasHR = () => rows(HRSRC).length > 0;
  const dangLamHR = () => hrRows().filter(r => r.dangLam);
  function demTheo(arr, f, top) {
    const m = {}; arr.forEach(r => { const k = (f(r) || "Không rõ").trim() || "Không rõ"; m[k] = (m[k] || 0) + 1; });
    let e = Object.entries(m).sort((a, b) => b[1] - a[1]);
    if (top) e = e.slice(0, top);
    return e;
  }
  function nhomTuoi(arr) {
    const b = { "Dưới 22": 0, "22 – 25": 0, "26 – 30": 0, "31 – 35": 0, "Trên 35": 0 };
    arr.forEach(r => { const t = r.tuoi; if (!t) return;
      if (t < 22) b["Dưới 22"]++; else if (t <= 25) b["22 – 25"]++; else if (t <= 30) b["26 – 30"]++;
      else if (t <= 35) b["31 – 35"]++; else b["Trên 35"]++; });
    return Object.entries(b);
  }
  function nhomThamNien(arr) {
    const b = { "Dưới 3 tháng": 0, "3 – 6 tháng": 0, "6 – 12 tháng": 0, "1 – 2 năm": 0, "Trên 2 năm": 0 };
    arr.forEach(r => { const t = r.tn;
      if (t < 3) b["Dưới 3 tháng"]++; else if (t < 6) b["3 – 6 tháng"]++; else if (t < 12) b["6 – 12 tháng"]++;
      else if (t < 24) b["1 – 2 năm"]++; else b["Trên 2 năm"]++; });
    return Object.entries(b);
  }
  /* ---------- Phân loại nhân sự ----------
     Cột "Level" của sheet đang để trống toàn bộ, nên cấp bậc lấy theo cột
     "Chức vụ" — nơi thật sự chứa BOD / Manager / … / Thực tập sinh. */
  const THU_TU_CAP = ["BOD", "Manager", "Trưởng phòng", "Deputy Manager",
                      "Market Leader", "Nhân viên", "Cộng tác viên", "Thực tập sinh"];
  const laTTS = r => /thực tập|intern/i.test(`${r.cv} ${r.vt}`);
  const laQL  = r => /bod|manager|trưởng|leader|giám đốc|head|quản lý/i.test(r.cv);
  const khoiFOBO = r => /kinh doanh|sale|business/i.test(r.khoi) ? "Kinh doanh · FO"
                      : /bod/i.test(r.khoi) ? "BOD" : "Vận hành – hỗ trợ · BO";

  /* Tháp tổ chức: xếp theo đúng thứ tự cấp bậc từ cao xuống thấp, cấp nào
     không nằm trong danh sách chuẩn thì dồn xuống cuối. */
  function thapCapBac(arr) {
    const m = {};
    arr.forEach(r => { const k = (r.cv || "Chưa rõ").trim() || "Chưa rõ"; m[k] = (m[k] || 0) + 1; });
    const co = Object.entries(m);
    const hang = t => { const i = THU_TU_CAP.findIndex(x => kd(x) === kd(t)); return i < 0 ? 99 : i; };
    return co.sort((a, b) => hang(a[0]) - hang(b[0]) || b[1] - a[1]);
  }
  const nhomFOBO = arr => demTheo(arr, khoiFOBO);
  const nhomQLNV = arr => {
    const ql = arr.filter(laQL).length;
    return [["Quản lý", ql], ["Nhân sự thừa hành", arr.length - ql]];
  };

  /* Cohort theo năm gia nhập: mỗi năm tuyển bao nhiêu và tới nay còn lại bao
     nhiêu — nhìn ra năm nào giữ người tốt, năm nào rơi rụng hết. */
  function cohortNam(soNam) {
    const all = hrRows().filter(r => r.vao);
    const nay = new Date().getFullYear();
    const tu = nay - (soNam || 6) + 1;
    const m = {};
    all.forEach(r => {
      const n = r.vao.getFullYear(); if (n < tu || n > nay) return;
      m[n] = m[n] || { nam: n, tuyen: 0, conLai: 0 };
      m[n].tuyen++;
      if (r.ttDangLam && !r.nghi) m[n].conLai++;
    });
    return Object.values(m).sort((a, b) => a.nam - b.nam)
      .map(x => Object.assign(x, { giu: x.tuyen ? x.conLai / x.tuyen * 100 : 0 }));
  }

  /* Thâm niên bình quân theo một tiêu chí bất kỳ (Khối, Cấp bậc, Phòng ban) */
  function thamNienTheo(arr, f, top) {
    const m = {};
    arr.forEach(r => {
      const k = (f(r) || "Không rõ").trim() || "Không rõ";
      (m[k] = m[k] || []).push(r.tn || 0);
    });
    let e = Object.entries(m).map(([ten, v]) => ({
      ten, n: v.length, bq: v.reduce((s, x) => s + x, 0) / v.length
    })).sort((a, b) => b.bq - a.bq);
    if (top) e = e.slice(0, top);
    return e;
  }

  /* Nhận việc – nghỉ việc theo NĂM, kèm headcount cuối mỗi năm */
  function vaoRaTheoNam(soNam, den) {
    const all = hrRows(), moc = den || new Date(), out = [];
    for (let i = (soNam || 6) - 1; i >= 0; i--) {
      const nam = moc.getFullYear() - i;
      const dau = new Date(nam, 0, 1), cuoi = new Date(nam, 11, 31, 23, 59, 59);
      const het = cuoi > moc ? moc : cuoi;
      out.push({
        nam,
        vao: all.filter(r => r.vao && r.vao >= dau && r.vao <= het).length,
        ra:  all.filter(r => r.nghi && r.nghi >= dau && r.nghi <= het).length,
        hc:  headcountAt(all, het)
      });
    }
    return out;
  }

  /* Turnover theo nhóm (Khối / Phòng ban).
     boTTS = true thì loại thực tập sinh khỏi cả tử số lẫn mẫu số, vì TTS
     hết kỳ là nghỉ nên để chung sẽ thổi phồng tỷ lệ của cả phòng. */
  function turnoverTheo(f, tu, den, boTTS) {
    const all = hrRows().filter(r => !boTTS || !laTTS(r));
    const m = {};
    all.forEach(r => { const k = (f(r) || "Không rõ").trim() || "Không rõ"; (m[k] = m[k] || []).push(r); });
    return Object.entries(m).map(([ten, rs]) => {
      const dau  = rs.filter(r => laDangLamTai(r, tu)).length;
      const cuoi = rs.filter(r => laDangLamTai(r, den)).length;
      const ra   = rs.filter(r => r.nghi && r.nghi >= tu && r.nghi <= den).length;
      return { ten, dau, cuoi, ra, ty: tyLeNghiViec(ra, dau, cuoi) };
    }).filter(x => x.dau || x.cuoi || x.ra).sort((a, b) => b.ty - a.ty);
  }

  /* Số nhân sự trực tiếp trên mỗi quản lý */
  function spanStat() {
    const sp = spanQL();
    if (!sp.length) return { soQL: 0, bq: 0, max: 0, quaTai: 0 };
    const n = sp.map(([, v]) => v);
    return {
      soQL: sp.length,
      bq: n.reduce((s, x) => s + x, 0) / n.length,
      max: Math.max(...n),
      quaTai: n.filter(x => x > 10).length
    };
  }

  /* Headcount tại một thời điểm: đã nhận việc và chưa nghỉ tính tới mốc đó.

     Bản cũ chỉ nhìn NGÀY, bỏ qua hoàn toàn cột "Tình trạng". Sheet nhân sự
     có những dòng ghi "Nghỉ việc" nhưng để TRỐNG ô "Ngày nghỉ việc" — với
     bản cũ, những người này được tính là còn đi làm mãi mãi, nên Headcount
     trên báo cáo cao hơn số "đang làm" của sheet.
     Nay khi không có ngày nghỉ thì tin theo cột Tình trạng. */
  function headcountAt(all, moc) {
    return all.filter(r => laDangLamTai(r, moc)).length;
  }
  /* Tại mốc "moc" thì hồ sơ này còn đang đi làm hay không.
     Cột "Tình trạng" (cột I của tab DATA, ví dụ "Đang làm việc") là căn cứ
     chính; hai cột ngày chỉ dùng để xếp hồ sơ vào đúng mốc thời gian.
     Ngày nhận việc bỏ trống thì KHÔNG loại — nếu không, người đang làm mà
     HR quên điền ngày vào sẽ biến mất khỏi Headcount. */
  function laDangLamTai(r, moc) {
    if (r.vao && r.vao > moc) return false;      // chưa nhận việc tính tới mốc
    if (r.nghi) return r.nghi > moc;             // có ngày nghỉ thì so theo ngày
    return r.ttDangLam;                          // thiếu ngày nghỉ thì theo Tình trạng
  }
  /* Các dòng ghi đã nghỉ nhưng bỏ trống ngày nghỉ — không xếp được vào tháng
     nào nên bị loại khỏi mọi mốc headcount. Trả ra để báo cho HR đi bổ sung. */
  function thieuNgayNghi() {
    return hrRows().filter(r => r.tt && !r.ttDangLam && !r.nghi)
      .map(r => ({ ma: r.ma, ten: r.ten, tt: r.tt, phong: r.phong, vao: r.vao }));
  }
  /* Đang làm nhưng Ngày nhận việc rơi vào TƯƠNG LAI so với ngày chốt — gần
     như luôn là gõ nhầm năm (đã gặp ô "31/3/3036"). Hồ sơ này bị loại khỏi
     Headcount và trước đây còn kéo thâm niên bình quân xuống số âm. */
  function ngayVaoTuongLai(moc) {
    const m = moc || new Date();
    return hrRows().filter(r => r.ttDangLam && !r.nghi && r.vao && r.vao > m)
      .map(r => ({ ma: r.ma, ten: r.ten, phong: r.phong, vao: r.vao }));
  }
  /* Đang làm nhưng bỏ trống ngày nhận việc — vẫn tính vào Headcount, nhưng
     không xếp được vào biểu đồ biến động theo tháng. */
  function thieuNgayVao() {
    return hrRows().filter(r => r.ttDangLam && !r.nghi && !r.vao)
      .map(r => ({ ma: r.ma, ten: r.ten, tt: r.tt, phong: r.phong }));
  }

  /* Đối chiếu Headcount với thao tác lọc tay trên sheet.
     Trả về số dòng theo từng giá trị cột "Tình trạng" và các khoản cộng /
     trừ dẫn từ con số lọc tay sang con số báo cáo, để nhìn là biết lệch ở
     đâu thay vì phải dò từng dòng. */
  function doiChieuHeadcount(moc) {
    const all = hrRows(), m = moc || new Date();
    const theoTT = {};
    all.forEach(r => {
      const k = String(r.tt || "").trim() || "(để trống)";
      theoTT[k] = (theoTT[k] || 0) + 1;
    });
    const ttDangLam = all.filter(r => r.ttDangLam);
    return {
      theoTT: Object.entries(theoTT).sort((a, b) => b[1] - a[1]),
      tongDong: all.length,
      loc: ttDangLam.length,                                             // lọc tay trên sheet
      truDaNghi:  ttDangLam.filter(r => r.nghi && r.nghi <= m).length,   // đang làm nhưng đã có ngày nghỉ
      truChuaVao: ttDangLam.filter(r => r.vao && r.vao > m).length,      // ngày nhận việc sau mốc chốt
      congChuaNghi: all.filter(r => !r.ttDangLam && r.nghi && r.nghi > m
                                    && (!r.vao || r.vao <= m)).length,   // ghi đã nghỉ nhưng ngày nghỉ ở tương lai
      headcount: headcountAt(all, m)
    };
  }
  /* Turnover chuẩn quản trị nhân sự:
         số nghỉ trong kỳ / headcount BÌNH QUÂN của kỳ × 100
     với headcount bình quân = (đầu kỳ + cuối kỳ) / 2.
     Bản cũ chia cho headcount CUỐI kỳ, nên kỳ nào tuyển nhiều thì mẫu số
     phình ra và tỷ lệ nghỉ bị báo thấp hơn thực tế.
     Mẫu số bằng 0 (kỳ chưa có ai) trả 0 thay vì Infinity / NaN. */
  function tyLeNghiViec(soNghi, hcDau, hcCuoi) {
    const bq = (hcDau + hcCuoi) / 2;
    return bq > 0 ? soNghi / bq * 100 : 0;
  }
  /* Biến động n tháng gần nhất tính tới mốc "den" */
  function bienDong(n, den) {
    const all = hrRows(), moc = den || new Date(), out = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(moc.getFullYear(), moc.getMonth() - i, 1);
      const cuoi = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
      const truoc = new Date(d.getTime() - 1);           // 23:59:59 ngày cuối tháng trước
      const vao = all.filter(r => r.vao && r.vao >= d && r.vao <= cuoi).length;
      const ra  = all.filter(r => r.nghi && r.nghi >= d && r.nghi <= cuoi).length;
      const hcDau = headcountAt(all, truoc);
      const hc    = headcountAt(all, cuoi);
      out.push({ nhan: `T${d.getMonth() + 1}`, thang: d.getMonth() + 1, nam: d.getFullYear(),
                 vao, ra, hcDau, hc, turnover: tyLeNghiViec(ra, hcDau, hc) });
    }
    return out;
  }
  function spanQL() {
    const act = dangLamHR();
    return demTheo(act.filter(r => r.ql), r => r.ql).map(([ten, n]) => [ten, n]);
  }
  const TRUONG_HS = [["Email công ty", "mail"], ["Số điện thoại", "sdt"], ["CCCD", "cccd"], ["Ngày sinh", "sinh"],
    ["Ngày nhận việc", "vao"], ["Quản lý trực tiếp", "ql"], ["Số tài khoản", "stk"], ["Mã số thuế", "mst"],
    ["Hộ khẩu", "hk"], ["Trình độ học vấn", "hv"], ["Thẻ nhân viên", "the"], ["Tài khoản 1Office", "off1"]];
  function thieuHoSo() {
    const act = dangLamHR();
    return TRUONG_HS.map(([ten, k]) => {
      const thieu = act.filter(r => !r[k] || (k === "hv" && r[k] === "Không rõ")).length;
      return { ten, thieu, du: act.length - thieu, ty: act.length ? (act.length - thieu) / act.length * 100 : 0 };
    }).sort((a, b) => b.thieu - a.thieu);
  }
  function tyLeHoSoDu() {
    const act = dangLamHR(); if (!act.length) return null;
    const cot = TRUONG_HS.length;
    const diem = act.reduce((s, r) => s + TRUONG_HS.filter(([, k]) => r[k] && !(k === "hv" && r[k] === "Không rõ")).length, 0);
    return diem / (act.length * cot) * 100;
  }
  function dailuong() {                                   // dải lương theo Level
    const act = dangLamHR().filter(r => r.luong > 0);
    const m = {};
    act.forEach(r => { (m[r.level] = m[r.level] || []).push(r.luong); });
    return Object.entries(m).map(([lv, ds]) => {
      ds.sort((a, b) => a - b);
      return { level: lv, n: ds.length, min: ds[0], mid: ds[Math.floor(ds.length / 2)], max: ds[ds.length - 1],
        bq: ds.reduce((a, b) => a + b, 0) / ds.length };
    }).sort((a, b) => String(a.level).localeCompare(String(b.level)));
  }
  function tangLuong() {                                  // lịch sử tăng lương
    const act = dangLamHR();
    const co = act.filter(r => r.tang.length);
    const mucTang = co.map(r => r.lkd > 0 ? (r.luong - r.lkd) / r.lkd * 100 : 0).filter(v => v > 0);
    return {
      soNguoiTang: co.length, tyLe: act.length ? co.length / act.length * 100 : 0,
      lanBQ: co.length ? co.reduce((s, r) => s + r.tang.length, 0) / co.length : 0,
      mucBQ: mucTang.length ? mucTang.reduce((a, b) => a + b, 0) / mucTang.length : 0,
      chuaTang: act.filter(r => !r.tang.length && r.tn >= 12)
    };
  }
  function hetHanHD(ngay) {
    const n = ngay || 60;
    return dangLamHR().filter(r => r.conLai !== null && r.conLai <= n).sort((a, b) => a.conLai - b.conLai);
  }

  const HR = { rows: hrRows, active: dangLamHR, has: hasHR, demTheo, nhomTuoi, nhomThamNien,
    bienDong, spanQL, thieuHoSo, tyLeHoSoDu, dailuong, tangLuong, hetHanHD, dt, thang,
    headcountAt, laDangLamTai, tyLeNghiViec, thieuNgayNghi, thieuNgayVao, ngayVaoTuongLai, doiChieuHeadcount,
    thapCapBac, nhomFOBO, nhomQLNV, cohortNam, thamNienTheo, vaoRaTheoNam, turnoverTheo, spanStat,
    laTTS, laQL, khoiFOBO, parseVietnameseDate, calculateTenureMonths };

  /* =====================================================================
     5c. BỘ DỮ LIỆU TUYỂN DỤNG (HRM1)
     Ba nguồn, đọc theo VỊ TRÍ CỘT vì tiêu đề nằm giữa bảng:
       RAW_TuyenDung  — phễu ứng viên (mỗi dòng một CV)
       RAW_DeXuatTD   — đề xuất tuyển dụng và kết quả (mỗi dòng một order)
       RAW_SLA_TD     — bảng theo dõi tiến độ theo SLA
     ===================================================================== */
  /* =====================================================================
     5b-bis. QUỸ LƯƠNG THEO THÁNG (HRM3)
     Nguồn: tab "DATA 2026" — mỗi dòng một nhân sự, 12 cột Tháng 1…Tháng 12.
     Đặc thù của tab này:
       · tiêu đề thật nằm ở dòng 6, phía trên là mấy dòng tổng cộng;
       · ô tháng có thể là số tiền, để trống, hoặc chữ "Nghỉ";
       · dòng ngay trên tiêu đề có nhãn "Dự kiến" đặt đúng cột tháng đầu
         tiên chưa chốt — nhờ đó biết tháng nào là số thật, tháng nào dự trù
         mà không phải gõ cứng trong mã.
     ===================================================================== */
  const LGSRC = "RAW_LuongThang";
  const THANG_CHOT_MD = 7;                     // dự phòng khi sheet không có nhãn

  let _lg = null, _lgLen = -1;
  function luongParse() {
    const src = raws(LGSRC);
    if (!src.length) return { ds: [], chot: 0 };
    if (_lg && _lgLen === src.length) return _lg;

    /* Dò dòng tiêu đề: phải có cả "họ tên" lẫn "tháng 1" */
    let hi = -1;
    for (let i = 0; i < Math.min(src.length, 20); i++) {
      const o = src[i].map(kd);
      if (o.some(c => c.includes("ho ten")) && o.some(c => c === "thang 1")) { hi = i; break; }
    }
    if (hi < 0) return { ds: [], chot: 0 };
    const H = src[hi].map(kd);
    const tim = (...t) => {
      for (const x of t) { const i = H.indexOf(x); if (i >= 0) return i; }
      for (const x of t) { const i = H.findIndex(h => h.includes(x)); if (i >= 0) return i; }
      return -1;
    };
    const C = {
      ma:    tim("ma nhan vien", "ma nv"),
      ten:   tim("ho ten", "ho va ten"),
      tt:    tim("tinh trang"),
      vao:   tim("ngay vao lam", "ngay vao"),
      nghi:  tim("ngay nghi"),
      ql:    tim("quan ly bo phan", "quan ly"),
      vt:    tim("vi tri"),
      cap:   tim("cap bac"),
      phong: tim("phong ban")
    };
    /* Cột của từng tháng */
    const cotThang = {};
    for (let t = 1; t <= 12; t++) { const i = H.indexOf("thang " + t); if (i >= 0) cotThang[t] = i; }

    /* Tháng chốt cuối cùng = tháng ngay trước cột mang nhãn "Dự kiến" */
    let chot = THANG_CHOT_MD;
    for (let i = 0; i < hi; i++) {
      const j = src[i].findIndex(v => /dự\s*kiến|dự\s*trù|forecast/i.test(String(v || "")));
      if (j < 0) continue;
      const t = Object.keys(cotThang).map(Number).find(t => cotThang[t] === j);
      if (t) { chot = t - 1; break; }
    }

    const g = (r, c) => c >= 0 ? String(r[c] || "").trim() : "";
    const ds = [];
    for (let i = hi + 1; i < src.length; i++) {
      const r = src[i];
      if (!r) continue;
      const ten = g(r, C.ten); if (!ten) continue;
      const thang = {};
      for (const t in cotThang) {
        const o = String(r[cotThang[t]] || "").trim();
        /* "Nghỉ" nghĩa là không còn trên bảng lương — khác hẳn với 0 đồng */
        thang[t] = (!o || /^nghỉ$/i.test(o)) ? null : num(o);
      }
      ds.push({
        ma: g(r, C.ma), ten,
        tt: g(r, C.tt), vao: dt(g(r, C.vao)), nghi: dt(g(r, C.nghi)),
        ql: g(r, C.ql), vt: g(r, C.vt) || "Chưa rõ",
        cap: g(r, C.cap) || "Chưa rõ", phong: g(r, C.phong) || "Chưa rõ",
        thang
      });
    }
    _lg = { ds, chot: Math.max(0, Math.min(12, chot)) };
    _lgLen = src.length;
    return _lg;
  }
  const coLuong  = () => raws(LGSRC).length > 0;
  const luongDS  = () => luongParse().ds;
  const thangChot = () => luongParse().chot;

  /* Quỹ lương từng tháng: tổng tiền, số người hưởng lương, bình quân đầu người */
  function quyLuongThang() {
    const { ds, chot } = luongParse(), out = [];
    for (let t = 1; t <= 12; t++) {
      const co = ds.filter(r => r.thang[t] != null && r.thang[t] > 0);
      const tong = co.reduce((s, r) => s + r.thang[t], 0);
      out.push({ thang: t, nhan: "T" + t, tong, soNguoi: co.length,
                 bq: co.length ? tong / co.length : 0, duTru: t > chot });
    }
    return out;
  }
  /* Quỹ lương của một tháng, gộp theo tiêu chí bất kỳ (phòng ban, cấp bậc…) */
  function luongTheo(f, t, top) {
    const ds = luongDS(), m = {};
    ds.forEach(r => {
      const v = r.thang[t]; if (v == null || !v) return;
      const k = (f(r) || "Chưa rõ").trim() || "Chưa rõ";
      m[k] = (m[k] || 0) + v;
    });
    let e = Object.entries(m).sort((a, b) => b[1] - a[1]);
    if (top) e = e.slice(0, top);
    return e;
  }
  /* Tổng đã chốt và tổng dự trù còn lại trong năm */
  function tongLuongNam() {
    const q = quyLuongThang();
    const chot = q.filter(x => !x.duTru).reduce((s, x) => s + x.tong, 0);
    const duTru = q.filter(x => x.duTru).reduce((s, x) => s + x.tong, 0);
    return { chot, duTru, ca: chot + duTru, thangChot: thangChot() };
  }
  /* Tab lương chỉ có Phòng ban, không có Khối. Ghép mã nhân viên sang sheet
     nhân sự để biết ai thuộc khối Kinh doanh — hiện ghép được 100% số dòng.
     Mã không ghép được thì suy từ tên phòng ban. */
  let _mapKhoi = null, _mapKhoiN = -1;
  function khoiTheoMa() {
    const hr = hasHR() ? hrRows() : [];
    if (_mapKhoi && _mapKhoiN === hr.length) return _mapKhoi;
    const m = {};
    hr.forEach(r => { const k = String(r.ma || "").trim(); if (k) m[k] = r.khoi || ""; });
    _mapKhoi = m; _mapKhoiN = hr.length;
    return m;
  }
  const TEN_TEAM_KD = /^(hqs|wgg|vx\d|a10|bd\d|maverick|all stars|ritoe|team kinh doanh)/i;
  function khoiCua(r) {
    const k = khoiTheoMa()[String(r.ma || "").trim()];
    if (k) return k;
    return TEN_TEAM_KD.test(r.phong) ? "Kinh doanh" : "Không rõ";
  }
  const laKinhDoanh = r => /kinh doanh|sale|business/i.test(khoiCua(r));

  /* Quỹ lương của một tháng gộp theo Khối */
  function luongTheoKhoi(t) {
    return luongTheo(khoiCua, t);
  }
  /* Quỹ lương các team Kinh doanh: chỉ tính nhân sự thuộc khối Kinh doanh,
     chia theo phòng ban / team của họ. */
  function luongTeamKinhDoanh(t, top) {
    const ds = luongDS().filter(laKinhDoanh), m = {};
    ds.forEach(r => {
      const v = r.thang[t]; if (v == null || !v) return;
      const k = (r.phong || "Chưa rõ").trim() || "Chưa rõ";
      m[k] = (m[k] || 0) + v;
    });
    let e = Object.entries(m).sort((a, b) => b[1] - a[1]);
    if (top) e = e.slice(0, top);
    return e;
  }
  /* Bảng team Kinh doanh theo từng tháng, kèm luỹ kế chốt và dự trù */
  function teamKinhDoanhThang() {
    const ds = luongDS().filter(laKinhDoanh), ct = thangChot(), m = {};
    ds.forEach(r => {
      const k = (r.phong || "Chưa rõ").trim() || "Chưa rõ";
      const o = m[k] = m[k] || { ten: k, thang: {}, chot: 0, duTru: 0, nguoi: 0 };
      if (r.thang[ct] > 0) o.nguoi++;
      for (let t = 1; t <= 12; t++) {
        const v = r.thang[t]; if (!(v > 0)) continue;
        o.thang[t] = (o.thang[t] || 0) + v;
        if (t <= ct) o.chot += v; else o.duTru += v;
      }
    });
    return Object.values(m).sort((a, b) => b.chot - a.chot);
  }

  const LG = { has: coLuong, rows: luongDS, thangChot, quyLuongThang, luongTheo, tongLuongNam,
               khoiCua, laKinhDoanh, luongTheoKhoi, luongTeamKinhDoanh, teamKinhDoanhThang };

  /* =====================================================================
     5b-ter. PHÂN BỔ KHỐI LƯỢNG CÔNG VIỆC & PHÂN BỔ LƯƠNG (HRM8)

     Kết quả kinh doanh của HQ tính theo từng team, mà các bộ phận BO phục
     vụ chung cho nhiều team. Vì vậy quỹ lương của BO được phân bổ về team:
     một nhân sự phục vụ mấy team thì chia lương về mấy team đó theo tỷ lệ.
     Bảng nguồn là kết quả CUỐI CÙNG sau khi đã phân bổ.

     Sheet có hai dạng trình bày, bộ đọc tự nhận dạng nào cũng chạy:
       · dạng "người"  — mỗi dòng một nhân sự, các cột là tỷ lệ phân bổ sang
                         từng team, kèm khối cột số tiền tương ứng;
       · dạng "khối"   — gộp sẵn theo team, mỗi khối một team, bên trong
                         tách theo bộ phận, các cột là Tháng 1…Tháng 12.
     ===================================================================== */
  const PBSRC = "RAW_PhanBoLuong";
  let _pb = null, _pbLen = -1;

  function pbParse() {
    const src = raws(PBSRC);
    if (!src.length) return { dang: null };
    if (_pb && _pbLen === src.length) return _pb;
    _pb = pbDangNguoi(src) || pbDangKhoi(src) || { dang: null };
    _pbLen = src.length;
    return _pb;
  }

  /* ---- Dạng "người": mỗi dòng một nhân sự, cột là tỷ lệ theo team ---- */
  function pbDangNguoi(src) {
    let hi = -1;
    for (let i = 0; i < Math.min(src.length, 20); i++) {
      const o = src[i].map(kd);
      if (o.some(c => c.includes("ma nhan vien")) && o.some(c => c.includes("tong ty le"))) { hi = i; break; }
    }
    if (hi < 0) return null;
    const H = src[hi], h = H.map(kd);
    const tim = t => h.findIndex(x => x.includes(t));
    const C = { ma: tim("ma nhan vien"), ten: tim("ho ten"), phong: tim("phong ban"),
                cap: tim("cap bac"), cn: tim("chuc nang"), pic: tim("pic"),
                ty: tim("tong ty le"), chua: tim("phan luong chua") };
    /* Cột team chạy từ ngay sau "Dự án" tới khi gặp ô tiêu đề trống */
    /* Khớp ĐÚNG "du an" — dùng includes sẽ bắt nhầm cột "Phòng Ban/ Dự án" */
    let d0 = h.indexOf("du an");
    if (d0 < 0) d0 = Math.max(C.ma, C.ten, C.phong, C.cap, C.cn, C.pic, C.ty, C.chua);
    const team = [];
    for (let j = d0 + 1; j < H.length; j++) {
      const t = String(H[j] || "").trim();
      if (!t) break;
      team.push({ ten: t, cot: j });
    }
    if (!team.length) return null;
    /* Khối cột tiền: ô tiêu đề đầu tiên có giá trị sau khi hết cột team là
       cột TỔNG lương tháng, ngay sau đó là tiền của từng team theo đúng thứ tự. */
    let cotTong = -1;
    for (let j = team[team.length - 1].cot + 1; j < H.length; j++) {
      if (String(H[j] || "").trim()) { cotTong = j; break; }
    }
    if (cotTong >= 0) team.forEach((t, i) => { t.cotTien = cotTong + 1 + i; });

    const g = (r, c) => c >= 0 ? String(r[c] || "").trim() : "";
    const ds = [];
    for (let i = hi + 1; i < src.length; i++) {
      const r = src[i];
      const ten = g(r, C.ten); if (!ten) continue;
      const luong = cotTong >= 0 ? num(g(r, cotTong)) : 0;
      const pb = [];
      team.forEach(t => {
        const ty = num(g(r, t.cot));
        if (!ty) return;
        const tien = t.cotTien != null ? num(g(r, t.cotTien)) : ty * luong;
        pb.push({ team: t.ten, ty, tien });
      });
      ds.push({
        ma: g(r, C.ma), ten, phong: g(r, C.phong) || "Chưa rõ", cap: g(r, C.cap) || "Chưa rõ",
        cn: g(r, C.cn) || "Chưa rõ", pic: g(r, C.pic), luong,
        tyTong: num(g(r, C.ty)), chuaChia: num(g(r, C.chua)), pb, soTeam: pb.length
      });
    }
    return ds.length ? { dang: "nguoi", ds, team: team.map(t => t.ten) } : null;
  }

  /* ---- Dạng "khối": gộp sẵn theo team, các cột là 12 tháng ---- */
  function pbDangKhoi(src) {
    let hi = -1;
    for (let i = 0; i < Math.min(src.length, 20); i++) {
      const o = src[i].map(kd);
      if (o.some(c => c.includes("phong ban")) && o.some(c => c === "thang 1")) { hi = i; break; }
    }
    if (hi < 0) return null;
    const h = src[hi].map(kd);
    const cotPhong = h.findIndex(x => x.includes("phong ban"));
    const cotNam = h.findIndex(x => x.includes("tong nam"));
    const cotThang = {};
    for (let t = 1; t <= 12; t++) { const j = h.indexOf("thang " + t); if (j >= 0) cotThang[t] = j; }

    const ds = []; let team = "Chưa rõ";
    for (let i = hi + 1; i < src.length; i++) {
      const r = src[i]; if (!r) continue;
      const a = String(r[0] || "").trim(), b = String(r[cotPhong] || "").trim();
      /* Dòng đầu khối: cột đầu có tên team, cột phòng ban để trống */
      if (a && !b) { team = a; continue; }
      if (!b) continue;
      const thang = {};
      for (const t in cotThang) thang[t] = num(String(r[cotThang[t]] || ""));
      ds.push({ team, ma: a, phong: b, nam: cotNam >= 0 ? num(String(r[cotNam] || "")) : 0, thang });
    }
    return ds.length ? { dang: "khoi", ds } : null;
  }

  const coPB   = () => raws(PBSRC).length > 0 && !!pbParse().dang;
  const pbDang = () => pbParse().dang;
  const pbDS   = () => pbParse().ds || [];

  /* Quỹ lương sau phân bổ về từng team — dùng chung cho cả hai dạng */
  function pbTheoTeam(t) {
    const p = pbParse(), m = {};
    if (p.dang === "nguoi") {
      p.ds.forEach(r => r.pb.forEach(x => { m[x.team] = (m[x.team] || 0) + x.tien; }));
    } else if (p.dang === "khoi") {
      const thang = t || null;
      p.ds.forEach(r => {
        const v = thang ? (r.thang[thang] || 0) : r.nam;
        if (v) m[r.team] = (m[r.team] || 0) + v;
      });
    }
    return Object.entries(m).filter(x => x[1]).sort((a, b) => b[1] - a[1]);
  }
  /* Bộ phận nào đang gánh chi phí cho team nào */
  function pbTheoBoPhan(top) {
    const p = pbParse(), m = {};
    if (p.dang === "nguoi") p.ds.forEach(r => {
      const k = r.cn || "Chưa rõ";
      m[k] = (m[k] || 0) + r.pb.reduce((s, x) => s + x.tien, 0);
    });
    else if (p.dang === "khoi") p.ds.forEach(r => { m[r.phong] = (m[r.phong] || 0) + r.nam; });
    let e = Object.entries(m).filter(x => x[1]).sort((a, b) => b[1] - a[1]);
    return top ? e.slice(0, top) : e;
  }
  /* Mức độ dùng chung: mỗi nhân sự phục vụ bao nhiêu team (chỉ dạng "người") */
  function pbPhoiTeam() {
    const p = pbParse(); if (p.dang !== "nguoi") return [];
    const b = { "1 team": 0, "2 team": 0, "3 team": 0, "4 team trở lên": 0 };
    p.ds.forEach(r => {
      if (!r.soTeam) return;
      if (r.soTeam === 1) b["1 team"]++; else if (r.soTeam === 2) b["2 team"]++;
      else if (r.soTeam === 3) b["3 team"]++; else b["4 team trở lên"]++;
    });
    return Object.entries(b);
  }
  /* Tổng đã phân bổ, phần chưa chia và số nhân sự dùng chung */
  function pbTong() {
    const p = pbParse();
    if (p.dang === "nguoi") {
      const daChia = p.ds.reduce((s, r) => s + r.pb.reduce((x, y) => x + y.tien, 0), 0);
      return { daChia, chuaChia: p.ds.reduce((s, r) => s + (r.chuaChia || 0), 0),
               soNguoi: p.ds.filter(r => r.soTeam).length,
               dungChung: p.ds.filter(r => r.soTeam > 1).length,
               soTeam: pbTheoTeam().length };
    }
    if (p.dang === "khoi") {
      const daChia = p.ds.reduce((s, r) => s + r.nam, 0);
      return { daChia, chuaChia: 0, soNguoi: 0, dungChung: 0, soTeam: pbTheoTeam().length };
    }
    return { daChia: 0, chuaChia: 0, soNguoi: 0, dungChung: 0, soTeam: 0 };
  }
  const PB = { has: coPB, dang: pbDang, rows: pbDS, theoTeam: pbTheoTeam,
               theoBoPhan: pbTheoBoPhan, phoiTeam: pbPhoiTeam, tong: pbTong };

  const TDSRC = "RAW_TuyenDung", DXSRC = "RAW_DeXuatTD", SLASRC = "RAW_SLA_TD";
  const raws = k => thoRaw[k] || [];

  const laCo    = v => kd(v) === "co";
  const laPass  = v => kd(v) === "pass";
  const laFail  = v => kd(v) === "fail";
  const laDongY = v => kd(v) === "dong y";
  const laTuChoi= v => kd(v) === "tu choi";

  /* "05/01/2026" → 1 · "Tháng 3" → 3 · "T3" → 3 */
  function thangSo(s) {
    const t = String(s || "").trim(); if (!t) return 0;
    const sl = t.split("/");
    if (sl.length >= 2) { const m = +sl[1]; if (m >= 1 && m <= 12) return m; }
    const m = t.match(/\d+/);
    if (m) { const v = +m[0]; if (v >= 1 && v <= 12) return v; }
    return 0;
  }
  function tuanSo(s) {
    const d = dt(s); if (!d) return 0;
    const dau = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - dau) / 86400000 + dau.getDay() + 1) / 7);
  }

  /* ---- 5c.1 Phễu ứng viên ---- */
  function tdLevel(c) {
    if (laCo(c.du10))        return "L9";
    if (laCo(c.nhanViec))    return "L8";
    if (laCo(c.dongYLam))    return "L7";
    if (laPass(c.ketQuaPV))  return "L4A";
    if (laFail(c.ketQuaPV))  return "L4B";
    if (laCo(c.thamGiaPV))   return "L3A";
    if (laDongY(c.goiMoi))   return "L3";
    if (laTuChoi(c.goiMoi))  return "L3X";
    if (laPass(c.locCV))     return "L1";
    return "L0";
  }
  /* Dò cột theo TÊN tiêu đề, chỉ dùng vị trí mặc định khi không thấy tên.
     Tab dữ liệu thô của "[2026] Báo Cáo Tuyển Dụng" từng bị chèn/đổi cột —
     đọc theo tên thì sheet xê dịch vẫn ra đúng số. */
  function cotTD(head) {
    const C = { ngay:1, nv:2, nguon:3, hinhThuc:4, capBac:6, viTri:7, ten:8, team:13,
                locCV:14, locLead:15, goiMoi:16, ngayPV:19, thamGiaPV:20, ketQuaPV:21,
                dongYLam:23, ngayHen:24, nhanViec:25, du10:26, ngay10:27 };
    if (!head) return C;
    const h = head.map(kd);
    const dat = (k, ...tens) => {
      for (const t of tens) { const i = h.indexOf(t); if (i >= 0) { C[k] = i; return; } }
      for (const t of tens) { const i = h.findIndex(x => x.includes(t)); if (i >= 0) { C[k] = i; return; } }
    };
    dat("ngay",      "ngay nhan cv", "ngay");
    dat("nv",        "nhan vien tuyen dung");
    dat("nguon",     "nguon");
    dat("hinhThuc",  "hinh thuc");
    dat("capBac",    "cap bac");
    dat("viTri",     "vi tri ung tuyen", "vi tri");
    dat("ten",       "thong tin ung vien", "ten ung vien");
    dat("team",      "team");                        // khớp đúng, tránh "Định hướng Team"
    dat("locCV",     "hr loc cv");
    dat("locLead",   "leader loc cv");
    dat("goiMoi",    "ket qua goi moi pvv1", "ket qua goi moi");
    dat("ngayPV",    "ngay pv");
    dat("thamGiaPV", "tham gia pv");
    dat("ketQuaPV",  "ket qua");                     // khớp đúng, tránh "Kết quả gọi mời"
    dat("dongYLam",  "dong y di lam");
    dat("ngayHen",   "ngay hen lam viec");
    dat("nhanViec",  "ung vien nhan viec");
    /* Hai cột trùng tên "Ứng viên đi làm 10 ngày": cột trước là cờ Có/Không,
       cột sau là ngày đi làm đủ 10 ngày. */
    const d10 = [];
    h.forEach((x, i) => { if (x.includes("di lam 10 ngay")) d10.push(i); });
    if (d10.length) { C.du10 = d10[0]; if (d10.length > 1) C.ngay10 = d10[1]; }
    return C;
  }
  let _td = null, _tdLen = -1;
  function tdRows() {
    const src = raws(TDSRC);
    if (!src.length) return [];
    if (_td && _tdLen === src.length) return _td;
    /* Tiêu đề bảng nằm sau vài dòng tựa đề — dò dòng có ô đầu là "STT" */
    let hi = -1;
    for (let i = 0; i < Math.min(src.length, 25); i++) {
      if (kd(src[i][0]) === "stt") { hi = i; break; }
    }
    let start = hi >= 0 ? hi + 1 : -1;
    if (start < 0) {
      for (let i = 0; i < Math.min(src.length, 25); i++) {
        if (src[i][0] && !isNaN(+src[i][0])) { start = i; break; }
      }
    }
    if (start < 0) start = 0;
    const C = cotTD(hi >= 0 ? src[hi] : null);
    const out = [];
    for (let i = start; i < src.length; i++) {
      const r = src[i];
      if (!r || !r[0] || isNaN(+r[0])) continue;
      const g = j => String(r[j] || "").trim();
      const ngayHen = g(C.ngayHen), ngay10 = g(C.ngay10);
      const o = {
        stt: +r[0], ngay: g(C.ngay), thang: thangSo(g(C.ngay)), tuan: tuanSo(g(C.ngay)),
        thangNhan: thangSo(ngayHen), thang10: thangSo(ngay10),
        nv: g(C.nv) || "Khác", nguon: g(C.nguon) || "Khác", hinhThuc: g(C.hinhThuc),
        capBac: g(C.capBac) || "Chưa rõ", viTri: g(C.viTri) || "Chưa xác định", ten: g(C.ten),
        team: g(C.team) || "Khác",
        locCV: g(C.locCV), locLead: g(C.locLead), goiMoi: g(C.goiMoi),
        ngayPV: g(C.ngayPV), thamGiaPV: g(C.thamGiaPV), ketQuaPV: g(C.ketQuaPV),
        dongYLam: g(C.dongYLam), ngayHen,
        nhanViec: g(C.nhanViec), du10: g(C.du10), ngay10
      };
      o.level = tdLevel(o);
      out.push(o);
    }
    _td = out; _tdLen = src.length;
    return out;
  }
  const coTD = () => tdRows().length > 0;
  /* Ô "Tháng" trên thanh công cụ lọc luôn phễu và đề xuất — chọn một tháng
     thì mọi số liệu, biểu đồ và bảng của HRM1 chỉ tính tháng đó. */
  const thangLoc = () => (typeof RANGE !== "undefined" && RANGE && RANGE.thang) ? RANGE.thang : null;
  function tdLoc() { const t = thangLoc(); const L = tdRows(); return t ? L.filter(c => c.thang === t) : L; }

  function tdStats(list) {
    const L = list || tdLoc();
    const n = f => L.filter(f).length;
    const s = {
      total: L.length,
      hrPass:   n(c => laPass(c.locCV)),   hrFail:   n(c => laFail(c.locCV)),
      leadPass: n(c => laPass(c.locLead)),
      dongYPV:  n(c => laDongY(c.goiMoi)), tuChoiPV: n(c => laTuChoi(c.goiMoi)),
      thamGiaPV:n(c => laCo(c.thamGiaPV)),
      passPV:   n(c => laPass(c.ketQuaPV)),failPV:   n(c => laFail(c.ketQuaPV)),
      dongYLam: n(c => laCo(c.dongYLam)),
      nhanViec: n(c => laCo(c.nhanViec)),
      d10:      n(c => laCo(c.du10))
    };
    s.dropout = n(c => laCo(c.nhanViec) && !laCo(c.du10));
    return s;
  }
  /* Phễu 8 bậc — dùng chung cho biểu đồ và bảng */
  function tdPheu(list) {
    const s = tdStats(list);
    return [
      { lv: "L0",  ten: "CV thu thập",          n: s.total },
      { lv: "L1",  ten: "Pass lọc HR",          n: s.hrPass },
      { lv: "L3",  ten: "Đồng ý phỏng vấn",     n: s.dongYPV },
      { lv: "L3A", ten: "Tới phỏng vấn",        n: s.thamGiaPV },
      { lv: "L4A", ten: "Pass phỏng vấn V1",    n: s.passPV },
      { lv: "L7",  ten: "Có lịch đi làm",       n: s.dongYLam },
      { lv: "L8",  ten: "Đi làm ngày đầu",      n: s.nhanViec },
      { lv: "L9",  ten: "Đi làm đủ 10 ngày",    n: s.d10 }
    ];
  }
  /* Số liệu 12 tháng — nhận việc / đủ 10 ngày đếm theo tháng THỰC nhận việc */
  function tdThang() {
    const all = tdRows();
    return [1,2,3,4,5,6,7,8,9,10,11,12].map(m => {
      const mc = all.filter(c => c.thang === m);
      const s = tdStats(mc);
      return {
        thang: m, nhan: "T" + m, total: s.total, hrPass: s.hrPass,
        dongYPV: s.dongYPV, thamGiaPV: s.thamGiaPV, passPV: s.passPV,
        dongYLam: s.dongYLam,
        nhanViec: all.filter(c => c.thangNhan === m && laCo(c.nhanViec)).length,
        d10:      all.filter(c => c.thang10  === m && laCo(c.du10)).length
      };
    });
  }
  /* Gom nhóm theo một thuộc tính bất kỳ (nguồn, vị trí, chuyên viên, team…) */
  function tdNhom(f, top, list) {
    const m = new Map();
    (list || tdLoc()).forEach(c => {
      const k = (f(c) || "Khác").trim() || "Khác";
      if (!m.has(k)) m.set(k, { ten: k, total: 0, hrPass: 0, thamGiaPV: 0, passPV: 0, nhanViec: 0 });
      const o = m.get(k);
      o.total++;
      if (laPass(c.locCV))    o.hrPass++;
      if (laCo(c.thamGiaPV))  o.thamGiaPV++;
      if (laPass(c.ketQuaPV)) o.passPV++;
      if (laCo(c.nhanViec))   o.nhanViec++;
    });
    let e = [...m.values()].sort((a, b) => b.total - a.total);
    return top ? e.slice(0, top) : e;
  }

  /* ---- 5c.2 Đề xuất tuyển dụng và kết quả ---- */
  let _dx = null, _dxLen = -1;
  function dxRows() {
    const src = raws(DXSRC);
    if (!src.length) return [];
    if (_dx && _dxLen === src.length) return _dx;
    /* Vị trí cột mặc định theo sheet "Đề xuất tuyển dụng và kết quả";
       nếu tìm được dòng tiêu đề thì dò lại theo tên cột cho chắc. */
    const C = { thang:0, tt:1, team:2, nguoi:3, ngay:4, cap:5, vt:6,
                lyDo:8, trang:9, can:10, offer:11, nhan:12, conLai:13 };
    let h = -1;
    for (let i = 0; i < Math.min(src.length, 30); i++) {
      const j = src[i].map(kd).join(" | ");
      if (j.includes("vi tri") && (j.includes("so luong") || j.includes("tinh trang"))) { h = i; break; }
    }
    if (h >= 0) src[h].forEach((c, i) => {
      const t = kd(c); if (!t) return;
      if (t === "thang")                   C.thang = i;
      else if (t.includes("thi truong"))   C.tt = i;
      else if (t === "team")               C.team = i;
      else if (t.includes("nguoi de xuat"))C.nguoi = i;
      else if (t.includes("ngay de xuat")) C.ngay = i;
      else if (t.includes("cap bac"))      C.cap = i;
      else if (t.includes("vi tri"))       C.vt = i;
      else if (t.includes("ly do"))        C.lyDo = i;
      else if (t.includes("tinh trang"))   C.trang = i;
      else if (t.includes("so luong"))     C.can = i;
      else if (t.includes("da offer"))     C.offer = i;
      else if (t.includes("da nhan viec")) C.nhan = i;
      else if (t.includes("con lai"))      C.conLai = i;
    });
    const out = [];
    for (let i = (h >= 0 ? h + 1 : 0); i < src.length; i++) {
      const r = src[i]; if (!r) continue;
      const g = j => String(r[j] || "").trim();
      const vt = g(C.vt), th = g(C.thang);
      if (!vt || !th) continue;                 // bỏ dòng trống và dòng tổng
      if (kd(vt) === "vi tri") continue;        // bỏ dòng tiêu đề lặp
      out.push({
        thang: th, thangSo: thangSo(th), thiTruong: g(C.tt) || "Khác",
        team: g(C.team) || "Khác", nguoi: g(C.nguoi) || "—", ngay: g(C.ngay),
        capBac: g(C.cap) || "Chưa rõ", viTri: vt,
        lyDo: g(C.lyDo) || "Chưa rõ", trangThai: g(C.trang) || "Chưa rõ",
        can: num(g(C.can)), offer: num(g(C.offer)),
        nhan: num(g(C.nhan)), conLai: num(g(C.conLai))
      });
    }
    _dx = out; _dxLen = src.length;
    return out;
  }
  const coDX = () => dxRows().length > 0;
  function dxLoc() { const t = thangLoc(); const L = dxRows(); return t ? L.filter(o => o.thangSo === t) : L; }
  function dxStats(list) {
    const L = list || dxLoc();
    const c = f => L.filter(f).length;
    const s = (f) => L.reduce((a, o) => a + f(o), 0);
    return {
      viTri: L.length,
      can: s(o => o.can), offer: s(o => o.offer),
      nhan: s(o => o.nhan), conLai: s(o => o.conLai),
      dangTuyen: c(o => kd(o.trangThai) === "dang tuyen"),
      hoanThanh: c(o => kd(o.trangThai) === "hoan thanh"),
      tamDung:   c(o => kd(o.trangThai) === "tam dung")
    };
  }
  function dxNhom(f, top, list) {
    const m = new Map();
    (list || dxLoc()).forEach(o => {
      const k = (f(o) || "Khác").trim() || "Khác";
      if (!m.has(k)) m.set(k, { ten: k, viTri: 0, can: 0, offer: 0, nhan: 0, conLai: 0 });
      const t = m.get(k);
      t.viTri++; t.can += o.can; t.offer += o.offer; t.nhan += o.nhan; t.conLai += o.conLai;
    });
    let e = [...m.values()].sort((a, b) => b.can - a.can);
    return top ? e.slice(0, top) : e;
  }

  /* ---- 5c.3 Bảng theo dõi tiến độ theo SLA ---- */
  let _sla = null, _slaLen = -1;
  function slaRows() {
    const src = raws(SLASRC);
    if (!src.length) return [];
    if (_sla && _slaLen === src.length) return _sla;
    let h = -1;
    for (let i = 0; i < Math.min(src.length, 30); i++) {
      if (kd(src[i][0]) === "stt") { h = i; break; }
    }
    const out = [];
    for (let i = (h >= 0 ? h + 1 : 0); i < src.length; i++) {
      const r = src[i];
      if (!r || !r[0] || isNaN(+r[0])) continue;
      const g = j => String(r[j] || "").trim();
      const o = {
        stt: +r[0], ngayDeXuat: g(1), boPhan: g(2) || "Khác", nguoi: g(3),
        capBac: g(4) || "Chưa rõ", viTri: g(5), soLuong: num(g(6)),
        ngayDuyet: g(7),
        camKetCV: g(8), hanCV: g(9), camKetNhan: g(10), hanNhan: g(11),
        thucCV: g(12), ketCV: g(13), thucNhan: g(14), ketNhan: g(15)
      };
      const sng = t => { const m = String(t || "").match(/\d+/); return m ? +m[0] : 0; };
      o.ngayCamKetCV   = sng(o.camKetCV);
      o.ngayCamKetNhan = sng(o.camKetNhan);
      o.treCV   = kd(o.ketCV).startsWith("tre");
      o.treNhan = kd(o.ketNhan).startsWith("tre");
      o.soNgayTreCV   = o.treCV   ? sng(o.ketCV)   : 0;
      o.soNgayTreNhan = o.treNhan ? sng(o.ketNhan) : 0;
      o.conCV   = kd(o.ketCV).startsWith("con")   ? sng(o.ketCV)   : null;
      o.conNhan = kd(o.ketNhan).startsWith("con") ? sng(o.ketNhan) : null;
      out.push(o);
    }
    _sla = out; _slaLen = src.length;
    return out;
  }
  const coSLA = () => slaRows().length > 0;
  function slaStats() {
    const L = slaRows();
    const treCV = L.filter(o => o.treCV).length, treNhan = L.filter(o => o.treNhan).length;
    return {
      n: L.length, treCV, treNhan,
      dungHanCV:   L.length - treCV,
      dungHanNhan: L.length - treNhan,
      tyDungHanCV:   L.length ? (L.length - treCV) / L.length * 100 : null,
      tyDungHanNhan: L.length ? (L.length - treNhan) / L.length * 100 : null,
      treBQ: treCV ? L.filter(o => o.treCV).reduce((s, o) => s + o.soNgayTreCV, 0) / treCV : 0
    };
  }

  const TD = {
    has: coTD, rows: tdRows, loc: tdLoc, stats: tdStats, pheu: tdPheu, theoThang: tdThang, nhom: tdNhom,
    coDX, dx: dxLoc, dxTatCa: dxRows, dxStats, dxNhom,
    coSLA, sla: slaRows, slaStats, thangSo
  };

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
    const loi  = Object.values(meta).filter(m => !m.ok && !m.dangTai).length;
    return { khai, oke, loi, meta, dangTai };
  }

  return { loadAll, apply, rows, has, num, nhanSu, dem, tuoi, sheetTable, status, store, meta, parseCSV,
           parseVietnameseDate, calculateTenureMonths, HR, TD, LG, PB };
})();
