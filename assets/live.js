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
    /* Tiêu đề trùng tên (sheet nhân sự có nhiều cột "Cảnh báo", "Ngày hết hạn"…)
       được đánh số để không ghi đè nhau: "Cảnh báo", "Cảnh báo #2", … */
    const seen = {};
    const head = rows[0].map(h => {
      const t = h.replace(/\s+/g, " ").trim();
      seen[t] = (seen[t] || 0) + 1;
      return seen[t] > 1 ? `${t} #${seen[t]}` : t;
    });
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
      const nam = den.getFullYear();
      const raNam = all.filter(r => r.nghi && r.nghi.getFullYear() === nam && r.nghi <= den).length;
      setSp("Turnover luỹ kế năm", act.length ? raNam / act.length * 100 : null);
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
        setL("Lương bình quân đầu người", tong / act.length / 1e6);
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
  function dt(v) {                                       // "01/01/1994" | "2019-10-19" → Date
    const s = String(v || "").trim(); if (!s) return null;
    let m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
    if (m) { let y = +m[3]; if (y < 100) y += 2000; const d = new Date(y, +m[2] - 1, +m[1]); return isNaN(d) ? null : d; }
    m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) { const d = new Date(+m[1], +m[2] - 1, +m[3]); return isNaN(d) ? null : d; }
    return null;
  }
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
        tuoi: num(g(r, C.tuoi)) || (sinh ? Math.floor((now - sinh) / 31557600000) : 0),
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
        dangLam: /đang làm|đang thử việc|thử việc|học việc/i.test(tt) && !nghi
      };
      o.tn = C.tn && num(g(r, C.tn)) ? num(g(r, C.tn)) : (vao ? thang(vao, nghi || now) : 0);
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
  /* Biến động n tháng gần nhất tính tới mốc "den" */
  function bienDong(n, den) {
    const all = hrRows(), moc = den || new Date(), out = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(moc.getFullYear(), moc.getMonth() - i, 1);
      const cuoi = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59);
      const vao = all.filter(r => r.vao && r.vao >= d && r.vao <= cuoi).length;
      const ra  = all.filter(r => r.nghi && r.nghi >= d && r.nghi <= cuoi).length;
      const hc  = all.filter(r => r.vao && r.vao <= cuoi && (!r.nghi || r.nghi > cuoi)).length;
      out.push({ nhan: `T${d.getMonth() + 1}`, thang: d.getMonth() + 1, nam: d.getFullYear(), vao, ra, hc, turnover: hc ? ra / hc * 100 : 0 });
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
    bienDong, spanQL, thieuHoSo, tyLeHoSoDu, dailuong, tangLuong, hetHanHD, dt, thang };

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

  return { loadAll, apply, rows, has, num, nhanSu, dem, tuoi, sheetTable, status, store, meta, parseCSV, HR };
})();
