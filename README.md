# HQ Group — Trung tâm Báo cáo Nhân sự

Hệ thống báo cáo định kỳ của Phòng Nhân sự, gồm 8 mã báo cáo HRM1–HRM8 và một bảng tổng hợp trình Ban Điều hành.

Trang tĩnh thuần, **không cần build**, deploy lên Vercel trong khoảng một phút.

---

## Cấu trúc dự án

```
hq-hr-report/
├── index.html              Khung trang
├── assets/
│   ├── style.css           Toàn bộ giao diện, gồm chế độ Sáng và Tối
│   ├── config.js           ⭐ FILE DUY NHẤT CẦN SỬA KHI VẬN HÀNH
│   ├── live.js             Đọc CSV từ Google Sheet, tính chỉ số thật
│   └── app.js              Nội dung 8 báo cáo và logic hiển thị
├── vercel.json             Cấu hình Vercel
├── package.json
├── .gitignore
└── README.md
```

---

## Phần 1 — Đưa lên GitHub

Mở Terminal tại thư mục dự án và chạy lần lượt:

```bash
git init
git add .
git commit -m "HQ HR Report v4"
git branch -M main
git remote add origin https://github.com/<tài-khoản>/hq-hr-report.git
git push -u origin main
```

Nếu chưa có repo, vào github.com → **New repository** → đặt tên `hq-hr-report` → chọn **Private** → **Create repository**, rồi chạy các lệnh trên.

Không quen dùng Terminal thì vào repo vừa tạo → **uploading an existing file** → kéo thả toàn bộ thư mục vào.

---

## Phần 2 — Deploy lên Vercel

1. Vào [vercel.com](https://vercel.com) → đăng nhập bằng tài khoản GitHub
2. **Add New** → **Project** → chọn repo `hq-hr-report` → **Import**
3. Ở màn hình cấu hình, để nguyên mặc định:

   | Mục | Giá trị |
   |---|---|
   | Framework Preset | **Other** |
   | Root Directory | `./` |
   | Build Command | *(để trống)* |
   | Output Directory | *(để trống)* |
   | Install Command | *(để trống)* |

4. Bấm **Deploy**

Sau khoảng 30 giây sẽ có link dạng `https://hq-hr-report.vercel.app`.

Từ lần sau, mỗi lần `git push` lên nhánh `main` là Vercel tự deploy lại.

### Gắn tên miền riêng

Vercel → project → **Settings** → **Domains** → nhập `hr.hqgroup.vn` → làm theo hướng dẫn thêm bản ghi CNAME tại nhà cung cấp tên miền.

### Giới hạn người xem

Trang đang để `noindex` nên Google không lập chỉ mục. Muốn chặn hẳn người ngoài:
Vercel → project → **Settings** → **Deployment Protection** → bật **Vercel Authentication**. Khi đó chỉ thành viên trong team Vercel mới mở được link.

---

## Phần 3 — Gắn dữ liệu thật từ Google Sheet

### Bước 1 — Publish từng tab

Trong Google Sheet chứa dữ liệu nhân sự:

1. **File** → **Chia sẻ** → **Xuất bản lên web**
2. Ở ô bên trái chọn đúng **tab** cần publish (ví dụ `DM_NhanSu`)
3. Ô bên phải chọn **Giá trị được phân tách bằng dấu phẩy (.csv)**
4. Bấm **Xuất bản** → copy link

Link có dạng:

```
https://docs.google.com/spreadsheets/d/e/2PACX-1vT.../pub?gid=0&single=true&output=csv
```

Làm lại cho từng tab cần dùng.

### Bước 2 — Dán link vào `assets/config.js`

```js
sheets: {
  DM_NhanSu:     "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv",
  RAW_ChamCong:  "https://docs.google.com/spreadsheets/d/e/.../pub?gid=1&single=true&output=csv",
  RAW_Luong:     "",   // để trống thì báo cáo đó dùng dữ liệu mẫu
  ...
}
```

### Bước 3 — Commit

```bash
git add assets/config.js
git commit -m "Gan nguon du lieu"
git push
```

Vercel tự deploy lại. Mở trang sẽ thấy thông báo *"Đã nối N nguồn dữ liệu"*, chỉ số nào chạy số thật sẽ có nhãn xanh **TRỰC TIẾP**.

---

## Danh mục 14 tab dữ liệu và cột bắt buộc

| Khoá trong config | Tab Sheet | Phục vụ | Cột bắt buộc |
|---|---|---|---|
| `DM_NhanSu` | DM_NhanSu | HRM2,3,6,7,8 | Mã NV · Họ tên · Giới tính · Ngày sinh · Phòng ban · BU · Chức danh · Grade · Loại hợp đồng · Ngày vào · Trạng thái |
| `DM_PhongBan` | DM_PhongBan_BU | Tất cả | Mã phòng · Tên phòng · BU · Khối · Trưởng phòng |
| `DM_Grade` | DM_Grade | HRM3,6,8 | Grade · Track · Min · Mid · Max |
| `RAW_TuyenDung` | RAW_TuyenDung | HRM1 | Mã JD · Vị trí · Phòng ban · BU · Grade · Nguồn CV · Ứng viên · Vòng hiện tại · Ngày mở · Ngày nhận việc · Kết quả |
| `RAW_ChamCong` | RAW_ChamCong | HRM2 | Mã NV · Kỳ · Công chuẩn · Công thực tế · Lần muộn · Phút muộn · Về sớm · Thiếu chấm công · Xác nhận Lead |
| `RAW_Phep` | RAW_Phep | HRM2 | Mã NV · Phép đầu kỳ · Phát sinh · Đã dùng · Nghỉ không lương · Tồn |
| `RAW_Luong` | RAW_Luong | HRM3,8 | Mã NV · Kỳ · P1 · P2 vận hành · P2 báo cáo · Phụ cấp · Thưởng · Khấu trừ BH · Thực nhận |
| `RAW_ChiPhiVP` | RAW_ChiPhiVP | HRM4 | Kỳ · Khoản mục · Mã MISA · Phòng thụ hưởng · Ngân sách · Thực chi · Ghi chú |
| `RAW_ChiPhiTT` | RAW_ChiPhiTT | HRM5 | Kỳ · Sự kiện · Loại · Tham gia · Được mời · Ngân sách · Thực chi · Phụ trách |
| `RAW_Onboard` | RAW_Onboard | HRM6 | Mã NV · Họ tên · Vị trí · Phòng ban · Ngày vào · Nguồn · Culture Buddy · D30 · D60 · D90 · Kết quả |
| `RAW_Offboard` | RAW_Offboard | HRM6 | Mã NV · Họ tên · Phòng ban · Ngày vào · Ngày nghỉ · Loại nghỉ · Lý do · Exit Interview · Bàn giao |
| `RAW_HoSo` | RAW_HoSo | HRM6 | Mã NV · CCCD · SYLL · Bằng cấp · Khám SK · HĐLĐ · Sổ BH · TK ngân hàng · MST |
| `RAW_BHXH` | RAW_BHXH | HRM7 | Mã NV · Số sổ · Mức lương đóng · Ngày hiệu lực · Nghiệp vụ · Trạng thái |
| `RAW_Workload` | RAW_Workload | HRM8 | Mã NV · Nhóm việc · Số đầu việc · Giờ/tháng · BU thụ hưởng · % phân bổ · Mã hạch toán |

Tên cột trong Sheet phải khớp đúng cột "Cột bắt buộc". Nếu muốn dùng tên khác, sửa phần `columns` trong `config.js`.

---

## Những thứ khác chỉnh trong `config.js`

| Mục | Ý nghĩa |
|---|---|
| `passcode` | Mã mở ba báo cáo mật HRM3, HRM7, HRM8. **Nên đổi trước khi phát hành** |
| `brand` | Tên tổ chức, tagline, tên và chức danh người đang xem |
| `params.congChuan` | Ngày công chuẩn mỗi tháng, mặc định 22 |
| `params.gioChuan` | Giờ chuẩn mỗi tháng, dùng tính mức tải ở HRM8, mặc định 176 |
| `params.phatDiMuon` | Mức phạt mỗi phút đi muộn, mặc định 1.000đ |
| `params.tyLeBH_congTy` / `tyLeBH_nguoiLD` | Tỷ lệ đóng bảo hiểm 21,5% và 10,5% |
| `params.nguongQuaTai` / `nguongDuoiTai` | Ngưỡng đánh giá mức tải, mặc định 120% và 70% |
| `ui.themeMacDinh` | `light`, `dark` hoặc `auto` theo cài đặt máy |
| `ui.tuTaiLai` | Số phút tự tải lại dữ liệu. Để `0` là tắt |

---

## Chỉ số nào đang chạy số thật

Chỉ số có công thức trong `live.js` sẽ hiện nhãn **TRỰC TIẾP**. Hiện đã viết sẵn:

- **HRM1** — số vị trí đang mở
- **HRM2** — tổng phút đi muộn, tiền phạt, hồ sơ chưa xác nhận công, ngày công bình quân
- **HRM3** — tổng quỹ lương, lương bình quân, tỷ trọng P1
- **HRM4** — tổng chi, tỷ lệ trên ngân sách, số khoản vượt trần
- **HRM5** — chi truyền thông, tỷ lệ tham gia bình quân
- **HRM6** — headcount, tỷ lệ toàn thời gian, turnover, tỷ lệ hồ sơ đầy đủ
- **HRM7** — số người tham gia, quỹ lương đóng BH, phần công ty và người lao động đóng
- **HRM8** — mức tải bình quân, tỷ lệ quá tải, tỷ lệ dưới tải

Các chỉ số còn lại vẫn dùng số mẫu. Muốn thêm, mở `live.js`, tìm khối `if (reportId === "HRMx")` và viết thêm một dòng:

```js
set("Tên chỉ số đúng như trong app.js", giaTriTinhDuoc);
```

Ngoài ra, mọi tab đã nối đều được hiển thị nguyên trạng ở mục §4 của báo cáo tương ứng, dưới tiêu đề *"Dữ liệu nguồn trực tiếp"*, tối đa 300 dòng.

---

## Chạy thử tại máy

```bash
npx serve . -l 3000
```

Rồi mở `http://localhost:3000`. Hoặc chỉ cần mở thẳng `index.html` bằng trình duyệt, nhưng khi đó phần đọc Google Sheet có thể bị chặn CORS, nên vẫn nên dùng lệnh trên.

---

## Xử lý sự cố

| Hiện tượng | Nguyên nhân và cách xử lý |
|---|---|
| Báo *"N nguồn lỗi"* | Mở Console trình duyệt (F12) xem tên nguồn lỗi. Thường do chưa bấm **Xuất bản lên web**, hoặc dán nhầm link chia sẻ thay vì link publish CSV |
| Số vẫn là dữ liệu mẫu | Kiểm tra tên cột trong Sheet đã khớp bảng danh mục ở trên chưa |
| Trang trắng | Mở Console xem lỗi. Thường do sửa `config.js` thiếu dấu phẩy hoặc dấu ngoặc kép |
| Sửa Sheet mà số không đổi | Google publish có độ trễ vài phút. Tải lại trang sau đó |
| Biểu đồ không hiện | Mạng chặn `cdn.jsdelivr.net`. Tải file `chart.umd.min.js` về đặt vào `assets/` và sửa đường dẫn trong `index.html` |

---

## Lưu ý bảo mật

- Link publish CSV là **link công khai** — ai có link đều đọc được. Không publish tab chứa lương chi tiết nếu chưa chấp nhận rủi ro này.
- An toàn hơn: chỉ publish các tab đã tổng hợp sẵn, không chứa dữ liệu cá nhân từng người.
- Mã truy cập `passcode` chỉ che giao diện, không mã hoá dữ liệu. Muốn bảo vệ thật thì bật **Vercel Authentication** ở phần trên.
