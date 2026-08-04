/* =====================================================================
   HQ GROUP — TRUNG TÂM BÁO CÁO NHÂN SỰ
   FILE DUY NHẤT CẦN SỬA KHI VẬN HÀNH

   Sửa file này → commit lên GitHub → Vercel tự deploy lại trong ~30 giây.
   Không cần đụng vào bất kỳ file nào khác.
   ===================================================================== */

window.HQ_CONFIG = {

  /* ---------------------------------------------------------------
     1. NHẬN DIỆN
     --------------------------------------------------------------- */
  brand: {
    org:      "Trung tâm Báo cáo PNS",
    tagline:  "Realtime Google Sheet · v3",
    user:     "Quinh",
    userRole: "Quản trị Khối BO"
  },

  /* ---------------------------------------------------------------
     2. ĐĂNG NHẬP THEO EMAIL CÔNG TY
     Chỉ email thuộc miền "mienChoPhep" mới đăng nhập được.
     Email nằm trong "quanTriCapCao" có toàn quyền (gắn / sửa nguồn
     dữ liệu…), các email còn lại chỉ xem báo cáo.
     --------------------------------------------------------------- */
  auth: {
    quanTriCapCao: ["quynhhtn@hqplay.vn"],

    /* Nút "Đăng nhập với Google": dán OAuth Client ID (dạng
       xxxx.apps.googleusercontent.com) lấy từ Google Cloud Console —
       nhớ thêm domain web (vd https://bc-pns.vercel.app) vào
       "Authorized JavaScript origins". Để trống = ẩn nút Google. */
    googleClientId: "195227450871-agk96k2h1897lnvgjk7uorfoe2q9dqqi.apps.googleusercontent.com",

    /* Mật khẩu nội bộ dùng kèm email khi không đăng nhập Google.
       ĐỔI NGAY khi vận hành thật. Để trống = tắt đường đăng nhập tay,
       chỉ còn nút Google. */
    matKhau: "hq2026",

    /* Webhook nhận thông báo mỗi lượt đăng nhập / xin cấp quyền (gửi
       mail về quản trị cứng). Dán URL Web App của Google Apps Script;
       để trống = tắt. Script mẫu xem trang Nguồn & Cấu hình. */
    webhookThongBao: "",

    /* TÀI KHOẢN ĐƯỢC CẤP QUYỀN — Admin phê duyệt tại đây.
       Bất kỳ mail domain nào có trong danh sách là đăng nhập được;
       email chưa có sẽ thấy thông báo chờ cấp quyền.
       "*" = xem tất cả báo cáo, hoặc liệt kê mã được xem. Ví dụ:
         "quanglm@hqgroups.vn": "*",
         "lananh@hqplay.vn":   ["HRM1","HRM2"]                        */
    taiKhoan: {}
  },

  /* ---------------------------------------------------------------
     3. LINK GOOGLE SHEET
     Cách lấy link cho từng tab:
       Google Sheet → File → Chia sẻ → Xuất bản lên web
       → chọn đúng TAB → định dạng "Giá trị được phân tách bằng dấu phẩy (.csv)"
       → Xuất bản → copy link → dán vào ô url tương ứng.
     Để trống "" thì báo cáo đó dùng dữ liệu mẫu.
     --------------------------------------------------------------- */
  sheets: {
    DM_NhanSu:     "",
    DM_PhongBan:   "",
    DM_Grade:      "",
    RAW_TuyenDung: "",
    /* Chấm công theo tháng — mỗi tháng một tab (HRM2) */
    RAW_ChamCong_T1: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMceZLPQjKYpfJmtW2Dqp68kzr9JmXC895dMmQt8n7Tvw9w6XPp9FMrJKMIKNGdVLNExjvwFUy70oP/pub?gid=921865850&single=true&output=csv",
    RAW_ChamCong_T2: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMceZLPQjKYpfJmtW2Dqp68kzr9JmXC895dMmQt8n7Tvw9w6XPp9FMrJKMIKNGdVLNExjvwFUy70oP/pub?gid=520204105&single=true&output=csv",
    RAW_ChamCong_T3: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMceZLPQjKYpfJmtW2Dqp68kzr9JmXC895dMmQt8n7Tvw9w6XPp9FMrJKMIKNGdVLNExjvwFUy70oP/pub?gid=922402576&single=true&output=csv",
    RAW_ChamCong_T4: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMceZLPQjKYpfJmtW2Dqp68kzr9JmXC895dMmQt8n7Tvw9w6XPp9FMrJKMIKNGdVLNExjvwFUy70oP/pub?gid=1555815624&single=true&output=csv",
    RAW_ChamCong_T5: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMceZLPQjKYpfJmtW2Dqp68kzr9JmXC895dMmQt8n7Tvw9w6XPp9FMrJKMIKNGdVLNExjvwFUy70oP/pub?gid=1858634959&single=true&output=csv",
    RAW_ChamCong_T6: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMceZLPQjKYpfJmtW2Dqp68kzr9JmXC895dMmQt8n7Tvw9w6XPp9FMrJKMIKNGdVLNExjvwFUy70oP/pub?gid=1699892467&single=true&output=csv",
    RAW_Phep:      "",
    RAW_Luong:     "",
    RAW_ChiPhiVP:  "",
    RAW_ChiPhiTT:  "",
    RAW_Onboard:   "",
    RAW_Offboard:  "",
    RAW_HoSo:      "",
    RAW_BHXH:      "",
    RAW_Workload:  ""
  },

  /* ---------------------------------------------------------------
     4. TÊN CỘT TRONG SHEET
     Nếu Sheet của chị đặt tên cột khác, sửa vế bên phải cho khớp.
     Vế bên trái là tên hệ thống dùng nội bộ — KHÔNG đổi.
     --------------------------------------------------------------- */
  columns: {
    maNV:        "Mã NV",
    hoTen:       "Họ tên",
    gioiTinh:    "Giới tính",
    ngaySinh:    "Ngày sinh",
    phongBan:    "Phòng ban",
    bu:          "BU",
    chucDanh:    "Chức danh",
    grade:       "Grade",
    loaiHopDong: "Loại hợp đồng",
    ngayVao:     "Ngày vào",
    trangThai:   "Trạng thái"
  },

  /* ---------------------------------------------------------------
     5. GIÁ TRỊ LỌC
     --------------------------------------------------------------- */
  filters: {
    trangThaiDangLam: "Đang làm",   // chỉ tính nhân sự có giá trị này
    loaiHopDongFT:    "Toàn thời gian"
  },

  /* ---------------------------------------------------------------
     6. THAM SỐ VẬN HÀNH
     --------------------------------------------------------------- */
  params: {
    congChuan:        22,      // ngày công chuẩn mỗi tháng
    gioChuan:         176,     // giờ chuẩn mỗi tháng (dùng cho HRM8)
    phatDiMuon:       1000,    // đồng mỗi phút
    ngayChiLuong:     12,
    tyLeBH_congTy:    21.5,    // %
    tyLeBH_nguoiLD:   10.5,    // %
    nguongQuaTai:     120,     // % — trên mức này là quá tải
    nguongDuoiTai:    70       // %
  },

  /* ---------------------------------------------------------------
     7. GIAO DIỆN
     --------------------------------------------------------------- */
  ui: {
    themeMacDinh: "auto",  // "light" | "dark" | "auto" (theo cài đặt máy)
    tuTaiLai:     0        // phút; 0 = tắt. Ví dụ 15 = tự tải lại số sau 15 phút
  }
};
