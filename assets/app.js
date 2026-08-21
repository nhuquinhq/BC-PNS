/* ============================================================
   A. NGUỒN DỮ LIỆU
   ============================================================ */
const SOURCES={
 DM_NhanSu:{n:"DM_NhanSu",l:"Danh mục nhân sự (master)",m:"HRM2,3,6,7,8",url:"",c:"Mã NV · Họ tên · Giới tính · Ngày sinh · Phòng ban · BU · Chức danh · Grade · Loại hợp đồng · Ngày vào · Trạng thái"},
 DM_PhongBan:{n:"DM_PhongBan_BU",l:"Danh mục Phòng ban ↔ BU",m:"Tất cả",url:"",c:"Mã phòng · Tên phòng · BU · Khối · Trưởng phòng"},
 DM_Grade:{n:"DM_Grade",l:"Khung Grade G1–G7",m:"HRM3,6,8",url:"",c:"Grade · Track (IC/MGMT) · Min · Mid · Max"},
 RAW_TuyenDung:{n:"RAW_TuyenDung",l:"Phễu ứng viên (mỗi dòng một CV)",m:"HRM1",url:"",c:"STT · Ngày · NV tuyển dụng · Nguồn · Hình thức · Cấp bậc · Vị trí · Tên UV · Team · HR lọc CV · Kết quả gọi mời · Ngày PV · Tham gia PV · Kết quả PV · Đồng ý đi làm · Ngày hẹn làm việc · UV nhận việc · UV đi làm 10 ngày"},
 RAW_DeXuatTD:{n:"RAW_DeXuatTD",l:"Đề xuất tuyển dụng và kết quả",m:"HRM1",url:"",c:"Tháng · Thị trường · Team · Người đề xuất · Ngày đề xuất · Cấp bậc · Vị trí · Lý do tuyển · Tình trạng · Số lượng cần · Đã offer · Đã nhận việc · Cần tuyển còn lại"},
 RAW_SLA_TD:{n:"RAW_SLA_TD",l:"Theo dõi tiến độ theo SLA",m:"HRM1",url:"",c:"STT · Ngày đề xuất · Bộ phận · Người đề xuất · Cấp bậc · Vị trí · Số lượng cần · Ngày phê duyệt · SLA có CV · Hạn gửi CV · SLA nhận việc · Hạn nhận việc · Ngày gửi CV thực tế · Ngày UV nhận việc thực tế"},
 RAW_ChamCong_T1:{n:"RAW_ChamCong_T1",l:"Chấm công T1/2026",m:"HRM2",url:"",c:"Mã NV · Kỳ · Công chuẩn · Công thực tế · Lần muộn · Phút muộn · Về sớm · Thiếu chấm công · Xác nhận Lead"},
 RAW_ChamCong_T2:{n:"RAW_ChamCong_T2",l:"Chấm công T2/2026",m:"HRM2",url:"",c:"Mã NV · Kỳ · Công chuẩn · Công thực tế · Lần muộn · Phút muộn · Về sớm · Thiếu chấm công · Xác nhận Lead"},
 RAW_ChamCong_T3:{n:"RAW_ChamCong_T3",l:"Chấm công T3/2026",m:"HRM2",url:"",c:"Mã NV · Kỳ · Công chuẩn · Công thực tế · Lần muộn · Phút muộn · Về sớm · Thiếu chấm công · Xác nhận Lead"},
 RAW_ChamCong_T4:{n:"RAW_ChamCong_T4",l:"Chấm công T4/2026",m:"HRM2",url:"",c:"Mã NV · Kỳ · Công chuẩn · Công thực tế · Lần muộn · Phút muộn · Về sớm · Thiếu chấm công · Xác nhận Lead"},
 RAW_ChamCong_T5:{n:"RAW_ChamCong_T5",l:"Chấm công T5/2026",m:"HRM2",url:"",c:"Mã NV · Kỳ · Công chuẩn · Công thực tế · Lần muộn · Phút muộn · Về sớm · Thiếu chấm công · Xác nhận Lead"},
 RAW_ChamCong_T6:{n:"RAW_ChamCong_T6",l:"Chấm công T6/2026",m:"HRM2",url:"",c:"Mã NV · Kỳ · Công chuẩn · Công thực tế · Lần muộn · Phút muộn · Về sớm · Thiếu chấm công · Xác nhận Lead"},
 RAW_Phep:{n:"RAW_Phep",l:"Phép năm",m:"HRM2",url:"",c:"Mã NV · Phép đầu kỳ · Phát sinh · Đã dùng · Nghỉ không lương · Tồn"},
 RAW_Luong:{n:"RAW_Luong",l:"Bảng lương (P1/P2)",m:"HRM3,8",url:"",c:"Mã NV · Kỳ · P1 · P2 vận hành · P2 báo cáo · Phụ cấp · Thưởng · Khấu trừ BH · Thực nhận"},
 RAW_ChiPhiVP:{n:"RAW_ChiPhiVP",l:"Chi phí vận hành VP",m:"HRM4",url:"",c:"Kỳ · Khoản mục · Mã MISA · Phòng thụ hưởng · Ngân sách · Thực chi · Ghi chú"},
 RAW_ChiPhiTT:{n:"RAW_ChiPhiTT",l:"Chi phí truyền thông NB",m:"HRM5",url:"",c:"Kỳ · Sự kiện · Loại · Tham gia · Được mời · Ngân sách · Thực chi · Phụ trách"},
 RAW_Onboard:{n:"RAW_Onboard",l:"Danh sách onboard",m:"HRM6",url:"",c:"Mã NV · Họ tên · Vị trí · Phòng ban · Ngày vào · Nguồn · Culture Buddy · D30 · D60 · D90 · Kết quả"},
 RAW_Offboard:{n:"RAW_Offboard",l:"Danh sách off",m:"HRM6",url:"",c:"Mã NV · Họ tên · Phòng ban · Ngày vào · Ngày nghỉ · Loại nghỉ · Lý do · Exit Interview · Bàn giao"},
 RAW_HoSo:{n:"RAW_HoSo",l:"Hồ sơ nhân sự",m:"HRM6",url:"",c:"Mã NV · CCCD · SYLL · Bằng cấp · Khám SK · HĐLĐ · Sổ BH · TK ngân hàng · MST"},
 RAW_BHXH:{n:"RAW_BHXH",l:"BHXH – BHYT – BHTN",m:"HRM7",url:"",c:"Mã NV · Số sổ · Mức lương đóng · Ngày hiệu lực · Nghiệp vụ · Trạng thái"},
 RAW_Workload:{n:"RAW_Workload",l:"Khối lượng việc & phân bổ",m:"HRM8",url:"",c:"Mã NV · Nhóm việc · Số đầu việc · Giờ/tháng · BU thụ hưởng · % phân bổ · Mã hạch toán"}
};
const CFG=window.HQ_CONFIG||{};
CFG.sheets=CFG.sheets||{};
/* Link khai trong assets/config.js — coi là mặc định của hệ thống */
const NGUON_GOC=Object.assign({},CFG.sheets);

/* Link do Quản trị dán trong ngăn "Nguồn dữ liệu" được giữ lại trên máy.
   Trước đây nút Lưu chỉ ghi vào SOURCES — nơi HQLive KHÔNG hề đọc — nên dán
   link xong vẫn không nối được dữ liệu, và tải lại trang là mất sạch.
   Chỉ giữ những link KHÁC mặc định, để sau này sửa config.js thì các nguồn
   chưa ai đụng tới vẫn tự cập nhật theo. */
const LS_NGUON="hq_bcpns_nguon";
function docNguonLuu(){
  try{ const o=JSON.parse(localStorage.getItem(LS_NGUON)||"{}");
       return (o&&typeof o==="object"&&!Array.isArray(o))?o:{} }
  catch(e){ return {} }
}
function luuNguon(o){
  try{ localStorage.setItem(LS_NGUON,JSON.stringify(o)) }
  catch(e){ /* trình duyệt chặn lưu — vẫn dùng được trong phiên này */ }
}
/* Áp link đã lưu đè lên mặc định, TRƯỚC khi HQLive đọc CFG.sheets */
Object.entries(docNguonLuu()).forEach(([k,u])=>{ if(SOURCES[k]) CFG.sheets[k]=String(u||"").trim() });
Object.entries(CFG.sheets).forEach(([k,u])=>{ if(SOURCES[k]) SOURCES[k].url=(u||"").trim(); });
const NSRC=Object.keys(SOURCES).length;
let current="HOME";
const AUTHC={
  admins:((CFG.auth&&CFG.auth.quanTriCapCao)||["quynhhtn@hqplay.vn"]).map(e=>e.toLowerCase()),
  gcid:(CFG.auth&&CFG.auth.googleClientId||"").trim(),
  pass:(CFG.auth&&CFG.auth.matKhau||"").trim(),
  acc:Object.fromEntries(Object.entries((CFG.auth&&CFG.auth.taiKhoan)||{}).map(([e,v])=>[e.toLowerCase(),v]))
};
function grantOf(email){
  if(AUTHC.admins.includes(email))return"admin";
  return AUTHC.acc[email]?"viewer":null;
}
let AUTH=null;
const isAdmin=()=>!!AUTH&&AUTH.role==='admin';
const canManage=()=>!!AUTH&&(isAdmin()||AUTH.vaiTro==='leader');
function canRead(id){
  if(!AUTH)return false;
  if(isAdmin())return true;
  const q=AUTH.quyen!==undefined?AUTH.quyen:AUTHC.acc[AUTH.email];
  return q==="*"||(Array.isArray(q)&&q.includes(id));
}
async function apiAuth(body){
  try{
    const r=await fetch('/api/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    try{return await r.json()}catch(e){return r.ok?{}:null}
  }catch(e){return null}
}
function roleLabel(){
  if(!AUTH)return"—";
  if(AUTHC.admins.includes(AUTH.email))return"Quản trị cấp cao nhất";
  if(AUTH.vaiTro==='admin'||AUTH.role==='admin')return"Admin";
  if(AUTH.vaiTro==='leader')return"Leader (vận hành)";
  return"Nhân viên · Xem báo cáo";
}
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fmtd=s=>s.split('-').reverse().join('/');
let RANGE={from:iso(new Date(new Date().getFullYear(),0,1)),to:iso(new Date()),thang:null,tuan:null};

/* ============================================================
   B. TIỆN ÍCH
   ============================================================ */
const vnd=n=>new Intl.NumberFormat('vi-VN').format(Math.round(n));
const dec=(n,d=1)=>n.toFixed(d).replace('.',',');
const r1=(n,d=1)=>Math.round(n*Math.pow(10,d))/Math.pow(10,d);
const dmy=d=>d?`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`:"—";
const el=h=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstElementChild};
let charts=[]; const kill=()=>{charts.forEach(c=>c.destroy());charts=[]};

const SVG={
  grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>',
  user:'<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  cash:'<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="3"/><circle cx="12" cy="12" r="2.6"/></svg>',
  build:'<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M10 21v-5h4v5"/></svg>',
  spark:'<svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/></svg>',
  users:'<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  layers:'<svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
  chart:'<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  file:'<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>',
  down:'<svg viewBox="0 0 24 24"><path d="M12 3v12M7 11l5 5 5-5M4 21h16"/></svg>',
  refresh:'<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>',
  plug:'<svg viewBox="0 0 24 24"><path d="M12 2v6M8 8h8v4a4 4 0 0 1-8 0z"/><path d="M12 16v6"/></svg>',
  sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2 12h2M20 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5"/></svg>',
  moon:'<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z"/></svg>',
  lock:'<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
};
const ICONSET=[SVG.users,SVG.clock,SVG.cash,SVG.chart,SVG.layers,SVG.shield,SVG.build,SVG.spark];
const NAVICON={HOME:SVG.grid,HRM1:SVG.user,HRM2:SVG.clock,HRM3:SVG.cash,HRM4:SVG.build,HRM5:SVG.spark,HRM6:SVG.users,HRM7:SVG.shield,HRM8:SVG.layers};
const TILE=["#22D3EE","#8B5CF6","#D946EF","#4C7DF0","#10B981","#F59E0B","#38BDF8","#F43F5E"];

/* Bảng màu thương hiệu HQ — đồng bộ với BC-PKT (ChartBlock) */
const C={navy:"#189BD8",navy2:"#1B75BB",steel:"#8FA6D8",red:"#D96F00",amber:"#7E9C00",green:"#00A651",light:"#00A99D",cream:"#189BD8",gold:"#D96F00"};
const PAL=["#189BD8","#7E9C00","#1B75BB","#00A99D","#D96F00","#00A651"];
function cssv(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}
let AX={},AXH={};
function applyChartTheme(){
  const g=cssv('--grid'), t=cssv('--tx3');
  Chart.defaults.font.family="'IBM Plex Mono',ui-monospace,monospace";
  Chart.defaults.font.size=11; Chart.defaults.color=cssv('--tick')||t;
  Chart.defaults.maintainAspectRatio=false;
  Chart.defaults.plugins.legend.labels.boxWidth=8;
  Chart.defaults.plugins.legend.labels.boxHeight=8;
  Chart.defaults.plugins.legend.labels.usePointStyle=true;
  Chart.defaults.plugins.legend.labels.padding=13;
  Chart.defaults.plugins.tooltip.backgroundColor="#0B1020";
  Chart.defaults.plugins.tooltip.borderColor="rgba(255,255,255,.14)";
  Chart.defaults.plugins.tooltip.borderWidth=1;
  Chart.defaults.plugins.tooltip.bodyColor="#EAF0FF";
  Chart.defaults.plugins.tooltip.titleColor="#A6B3D4";
  Chart.defaults.plugins.tooltip.padding=11;
  Chart.defaults.plugins.tooltip.cornerRadius=10;
  Chart.defaults.plugins.tooltip.titleFont={weight:'700'};
  AX={x:{grid:{display:false},border:{display:false}},y:{grid:{color:g},border:{display:false},beginAtZero:true}};
  AXH={x:{grid:{color:g},border:{display:false},beginAtZero:true},y:{grid:{display:false},border:{display:false}}};
  /* Cột bo góc nhẹ và đường mảnh như BC-PKT */
  Chart.defaults.datasets.bar.borderRadius=2;
  Chart.defaults.datasets.line.borderWidth=2;
  Chart.defaults.datasets.line.tension=.3;
  /* Đăng ký plugin nhãn số một lần, TẮT mặc định rồi bật riêng cho biểu đồ
     cột và tròn trong mk(). Nếu bật toàn cục thì biểu đồ đường và vùng sẽ
     đầy chữ chồng lên nhau. Thiếu plugin (mạng chặn CDN) vẫn chạy bình thường. */
  if(window.ChartDataLabels&&Chart.register&&!Chart.registry.plugins.get('datalabels')){
    Chart.register(window.ChartDataLabels);
    Chart.defaults.plugins.datalabels={display:false};
  }
}
applyChartTheme();
/* Cấu hình nhãn số theo loại biểu đồ (Task 3).
   Trả null khi không áp dụng — mk() sẽ không đụng tới options. */
function nhanSo(type,opts){
  if(!window.ChartDataLabels) return null;
  if(type!=='bar'&&type!=='doughnut'&&type!=='pie') return null;
  if(opts&&opts.plugins&&opts.plugins.datalabels!==undefined) return null;   // nơi gọi tự lo
  const hien=ctx=>{
    if(ctx.dataset.type==='line') return false;          // đường trong biểu đồ hỗn hợp
    const v=+ctx.dataset.data[ctx.dataIndex];
    return isFinite(v)&&v!==0;                           // bỏ nhãn 0 cho đỡ rối
  };
  const so=v=>{const a=Math.abs(+v||0);return dec(a,Number.isInteger(a)?0:1)};
  if(type==='bar') return {
    display:hien,anchor:'end',align:'end',offset:2,clamp:true,
    /* cột "Ra" vẽ bằng số âm để đổ xuống dưới trục — nhãn hiện trị tuyệt đối */
    formatter:so,color:cssv('--tx2')||'#8FA6D8',
    font:{family:"'IBM Plex Mono',ui-monospace,monospace",size:10,weight:'700'}
  };
  return {                                               // doughnut / pie
    display:hien,formatter:so,color:'#fff',
    textStrokeColor:'rgba(0,0,0,.55)',textStrokeWidth:3,
    font:{family:"'IBM Plex Mono',ui-monospace,monospace",size:11,weight:'700'}
  };
}
function mk(id,type,data,opts={}){
  const cv=document.getElementById(id); if(!cv)return;
  /* Canvas còn chart cũ (id trùng giữa hai báo cáo trên trang tổng hợp) thì
     huỷ trước — nếu không Chart.js ném lỗi và dừng luôn phần render còn lại. */
  const cu=Chart.getChart&&Chart.getChart(cv);
  if(cu){cu.destroy();charts=charts.filter(c=>c!==cu)}
  if(data.datasets)data.datasets.forEach(d=>{if(type==='bar'&&d.type!=='line'&&d.borderRadius===1)d.borderRadius=2});
  const o=Object.assign({plugins:{legend:{display:false}},scales:AX},opts);
  /* Gắn nhãn số cho cột và tròn. Gộp vào plugins đã có thay vì ghi đè để
     không xoá mất cấu hình legend / tooltip mà nơi gọi đã đặt. */
  const nh=nhanSo(type,opts);
  if(nh){
    o.plugins=Object.assign({},o.plugins,{datalabels:nh});
    /* Nhãn nằm ngoài đầu cột nên cần chừa chỗ, tránh bị khung cắt cụt */
    if(type==='bar')o.layout=Object.assign({padding:{top:14,right:26}},o.layout);
  }
  charts.push(new Chart(cv,{type,data,options:o}));
}
function spark(arr,color,w=58,h=20){
  const mn=Math.min(...arr),mx=Math.max(...arr),r=(mx-mn)||1;
  const pt=arr.map((v,i)=>`${(i/(arr.length-1)*w).toFixed(1)},${(h-2-((v-mn)/r)*(h-5)).toFixed(1)}`);
  return `<svg width="${w+4}" height="${h}" viewBox="0 0 ${w+4} ${h}" aria-hidden="true">
    <polyline points="${pt.join(' ')}" fill="none" stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${w}" cy="${pt[pt.length-1].split(',')[1]}" r="2.2" fill="${color}" stroke="none"/></svg>`;
}
function miniBar(v,max,neg){const w=Math.min(Math.abs(v)/max*50,50);
  return `<span class="hbar ${neg?'neg':''}" style="width:${w.toFixed(0)}px"></span>`}
function rag(cur,tgt,dir){const a=dir>0?cur/tgt:tgt/cur;
  if(a>=1)return{c:"g",t:"Đạt",a}; if(a>=0.9)return{c:"a",t:"Cận đạt",a}; return{c:"r",t:"Chưa đạt",a}}
function delta(cur,prev,dir){
  const d=cur-prev,pct=prev?(d/prev*100):0, good=dir>0?d>=0:d<=0;
  const cls=d===0?"fl":(good?"up":"dn");
  return `<span class="dpill ${cls}">${d>0?'↑':d<0?'↓':'–'} ${dec(Math.abs(pct),1)}%</span>`;
}
function progCell(pct,color){
  return `<div class="prg"><span class="pct">${dec(pct,0)}%</span><span class="pbar"><i style="width:${Math.min(pct,100)}%;background:${color}"></i></span></div>`}

function grab(id){const t=document.getElementById(id);return t?[...t.querySelectorAll('tr')].map(tr=>[...tr.children].map(c=>c.innerText.trim())):[]}
function copyT(id){const tsv=grab(id).map(r=>r.join('\t')).join('\n');
  const ok=()=>toast('Đã sao chép — dán thẳng vào Google Sheet');
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(tsv).then(ok,()=>fb(tsv,ok))}else fb(tsv,ok)}
function fb(t,cb){const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy');cb()}catch(e){alert('Trình duyệt chặn sao chép. Dùng nút CSV.')}a.remove()}
function csvT(id){const c='\uFEFF'+grab(id).map(r=>r.map(x=>`"${x.replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c],{type:'text/csv;charset=utf-8'}));
  a.download=id+'.csv';a.click()}
function toast(m){const t=el(`<div style="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1E2436;color:#fff;padding:12px 22px;border-radius:12px;font-size:12.5px;font-weight:700;z-index:99;box-shadow:0 14px 34px rgba(0,0,0,.3)">${m}</div>`);
  document.body.appendChild(t);setTimeout(()=>t.remove(),1900)}

function sec(no,title,sub,body){return `<section class="sec" id="s${no}">
  <div class="sechead"><span class="no">${no}</span><h2>${title}</h2>${sub?`<span class="sub">${sub}</span>`:''}</div>${body}</section>`}
function panel(t,hint,body,tools){return `<section class="panel"><div class="phead"><h3>${t}</h3>${hint?`<span class="hint">${hint}</span>`:''}${tools||''}</div><div class="pbody">${body}</div></section>`}
function panelT(t,hint,body,tools,foot){return `<section class="panel"><div class="phead"><h3>${t}</h3>${hint?`<span class="hint">${hint}</span>`:''}${tools||''}</div>${body}${foot||''}</section>`}
function tools(id){return `<div class="tools"><button class="tbtn" onclick="copyT('${id}')">Sao chép sang Sheet</button><button class="tbtn" onclick="csvT('${id}')">CSV</button></div>`}
function tfoot(n){return `<div class="tfoot"><span>Hiển thị 1 đến ${n} trên ${n} dòng</span>
  <div class="pg"><button>‹</button><button class="on">1</button><button>2</button><button>3</button><button>›</button></div></div>`}

function dataTable(id,cols,rows,total,groups){
  const gh=groups?`<tr class="grp">${groups.map(g=>`<th colspan="${g.s}" class="c">${g.t}</th>`).join('')}</tr>`:'';
  const th=`<tr class="${groups?'sub':''}"><th class="idx">#</th>${cols.map(c=>`<th class="${c.a||''}">${c.t}</th>`).join('')}</tr>`;
  const tb=rows.map((r,i)=>`<tr><td class="idx">${i+1}</td>${r.map((v,j)=>`<td class="${cols[j].a||''}">${v}</td>`).join('')}</tr>`).join('');
  const tf=total?`<tr class="tot"><td class="idx"></td>${total.map((v,j)=>`<td class="${cols[j].a||''}">${v}</td>`).join('')}</tr>`:'';
  return `<div class="tw"><table id="${id}"><thead>${gh}${th}</thead><tbody>${tb}${tf}</tbody></table></div>`;
}
function scorecard(id,rows){
  const cols=[{t:"Chỉ số"},{t:"ĐVT",a:"c"},{t:"Kỳ này",a:"n"},{t:"Kỳ trước",a:"n"},{t:"Biến động",a:"n"},{t:"Mục tiêu",a:"n"},{t:"% hoàn thành"},{t:"Xu hướng 6 kỳ",a:"c"},{t:"Xếp loại",a:"c"}];
  const body=rows.map(r=>{const g=rag(r.cur,r.tgt,r.dir);
    const col=g.c==="g"?"#10B981":g.c==="a"?"#F59E0B":"#F43F5E";
    return [`${r.k}${r.d?`<em>${r.d}</em>`:''}`,r.u||"—",
      `<b>${r.f?r.f(r.cur):dec(r.cur,r.p??1)}</b>`, r.f?r.f(r.prev):dec(r.prev,r.p??1),
      delta(r.cur,r.prev,r.dir), r.f?r.f(r.tgt):dec(r.tgt,r.p??1),
      progCell(Math.min(g.a*100,150),col), spark(r.sp,col),
      `<span class="rag ${g.c}"><i></i>${g.t}</span>`]});
  const th=`<tr><th class="idx">#</th>${cols.map(c=>`<th class="${c.a||''}">${c.t}</th>`).join('')}</tr>`;
  const tb=body.map((r,i)=>`<tr><td class="idx">${i+1}</td>${r.map((v,j)=>`<td class="${j===0?'name':(cols[j].a||'')}">${v}</td>`).join('')}</tr>`).join('');
  return `<div class="tw"><table id="${id}"><thead>${th}</thead><tbody>${tb}</tbody></table></div>`;
}
function defsBox(list){return `<div class="defs"><dl>${list.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl></div>`}
function rankList(items){
  return `<div class="rank">${items.map((it,i)=>{const c=TILE[i%TILE.length];
    return `<div class="r"><div class="av" style="background:${c}">${it[0].slice(0,2).toUpperCase()}</div>
      <div><div class="nm">${it[0]}</div><div class="tbar"><i style="width:${it[2]}%;background:${c}"></i></div></div>
      <div class="val">${it[1]}</div></div>`}).join('')}</div>`;
}

/* ============================================================
   C. DANH MỤC & DỮ LIỆU 8 BÁO CÁO
   ============================================================ */
const M12=["T8/25","T9","T10","T11","T12","T1/26","T2","T3","T4","T5","T6","T7"];
const M6=["T2","T3","T4","T5","T6","T7"];
const DEPTS=["Kinh doanh","Vận hành","Chăm sóc KH","Công nghệ","Marketing","Kế toán","Nhân sự"];
const BUS=["Ritokey","WGG","A10GG","HQS10000","VX Team","Maverick","Khối BO"];

const MODULES=[
 {id:"HOME",code:"—",title:"Tổng quan (HRM1 → HRM8)",src:[]},
 {id:"HRM1",code:"HRM1",title:"Báo cáo tuyển dụng",src:["RAW_TuyenDung","RAW_DeXuatTD","RAW_SLA_TD"]},
 {id:"HRM2",code:"HRM2",title:"Chấm công & Phép",src:["RAW_ChamCong_T1","RAW_ChamCong_T2","RAW_ChamCong_T3","RAW_ChamCong_T4","RAW_ChamCong_T5","RAW_ChamCong_T6","RAW_Phep","DM_NhanSu"]},
 {id:"HRM3",code:"HRM3",title:"Payroll & C&B",src:["RAW_Luong","DM_NhanSu","DM_Grade"]},
 {id:"HRM4",code:"HRM4",title:"Chi phí vận hành VP",src:["RAW_ChiPhiVP"]},
 {id:"HRM5",code:"HRM5",title:"Chi phí truyền thông NB",src:["RAW_ChiPhiTT"]},
 {id:"HRM6",code:"HRM6",title:"Tình hình nhân sự",src:["DM_NhanSu","RAW_Onboard","RAW_Offboard","RAW_HoSo"]},
 {id:"HRM7",code:"HRM7",title:"Hợp đồng & BHXH",src:["RAW_BHXH","DM_NhanSu"]},
 {id:"HRM8",code:"HRM8",title:"Workload & Phân bổ lương",src:["RAW_Workload","RAW_Luong"]}
];

/* Trạng thái phát hành (phiên làm việc) */
const STATE={HRM1:"wait",HRM2:"wait",HRM3:"draft",HRM4:"ok",HRM5:"ok",HRM6:"wait",HRM7:"draft",HRM8:"draft"};
const STLABEL={draft:["BẢN NHÁP","Chưa trình duyệt"],wait:["CHỜ DUYỆT","Đã trình BOD"],ok:["ĐÃ DUYỆT","Phát hành nội bộ"]};

/* ============================================================
   D. NỘI DUNG 8 BÁO CÁO
   ============================================================ */
const REP={};

/* ---------------- HRM1 ---------------- */
/* Khung SLA tuyển dụng theo cấp bậc — chính sách cố định trong file
   "ĐỀ XUẤT & KẾT QUẢ TUYỂN DỤNG", không đọc từ CSV vì đây là bảng quy định. */
const KHUNG_SLA=[
 {cap:"TTS",           vd:"TTS BD, TTS Content, CTV vận hành…", cv:10, tt:"15 ngày",      moi:"15 ngày", n:15, gc:"Vị trí nguồn ứng viên phổ biến"},
 {cap:"CTV",           vd:"TTS BD, TTS Content, CTV vận hành…", cv:10, tt:"15 ngày",      moi:"15 ngày", n:15, gc:"Vị trí nguồn ứng viên phổ biến"},
 {cap:"Nhân viên",     vd:"BD, CSKH, Vận hành, Admin…",         cv:20, tt:"20 – 30 ngày", moi:"60 ngày", n:30, gc:"Áp dụng vị trí phổ thông"},
 {cap:"Chuyên viên",   vd:"Kế toán, C&B, SEO, IT…",             cv:20, tt:"20 – 30 ngày", moi:"60 ngày", n:30, gc:"Phụ thuộc thời gian báo nghỉ của ứng viên"},
 {cap:"Senior",        vd:"Team Leader, Senior chuyên môn…",    cv:20, tt:"60 ngày",      moi:"60 ngày", n:60, gc:"Cần chủ động sourcing"},
 {cap:"Trưởng nhóm",   vd:"Team Leader, Senior chuyên môn…",    cv:20, tt:"60 ngày",      moi:"60 ngày", n:60, gc:"Cần chủ động sourcing"},
 {cap:"Quản lý",       vd:"Manager, Head, vị trí hiếm",         cv:20, tt:"60 ngày",      moi:"60 ngày", n:60, gc:"Vị trí hiếm có thể kéo dài theo phê duyệt của CEO"},
 {cap:"Vị trí đặc thù",vd:"Manager, Head, vị trí hiếm",         cv:20, tt:"60 ngày",      moi:"60 ngày", n:60, gc:"Vị trí hiếm có thể kéo dài theo phê duyệt của CEO"}
];
/* Số liệu mẫu dùng khi chưa nối được nguồn — giữ đúng hình dạng dữ liệu thật */
const TD_MAU={
 pheu:[{lv:"L0",ten:"CV thu thập",n:318},{lv:"L1",ten:"Pass lọc HR",n:142},
   {lv:"L3",ten:"Đồng ý phỏng vấn",n:96},{lv:"L3A",ten:"Tới phỏng vấn",n:71},
   {lv:"L4A",ten:"Pass phỏng vấn V1",n:38},{lv:"L7",ten:"Có lịch đi làm",n:22},
   {lv:"L8",ten:"Đi làm ngày đầu",n:19},{lv:"L9",ten:"Đi làm đủ 10 ngày",n:14}],
 nguon:[{ten:"Facebook",total:104,hrPass:44,thamGiaPV:23,passPV:13,nhanViec:7},
   {ten:"TopCV",total:88,hrPass:41,thamGiaPV:21,passPV:12,nhanViec:6},
   {ten:"Referral nội bộ",total:62,hrPass:33,thamGiaPV:17,passPV:9,nhanViec:4},
   {ten:"TikTok",total:41,hrPass:15,thamGiaPV:7,passPV:3,nhanViec:1},
   {ten:"Website HQ",total:23,hrPass:9,thamGiaPV:3,passPV:1,nhanViec:1}],
 thang:[1,2,3,4,5,6].map((m,i)=>({thang:m,nhan:"T"+m,
   total:[38,52,61,49,58,60][i],hrPass:[18,24,27,21,26,26][i],
   dongYPV:[12,16,18,14,18,18][i],thamGiaPV:[9,12,14,10,13,13][i],
   passPV:[5,7,7,5,7,7][i],dongYLam:[3,4,4,3,4,4][i],
   nhanViec:[2,4,3,3,4,3][i],d10:[2,3,2,2,3,2][i]}))
};

REP.HRM1={
 title:"Báo cáo tuyển dụng",
 sub:"Phễu ứng viên từ CV tới ngày làm việc thứ 10, tiến độ đề xuất tuyển của các bộ phận và mức tuân thủ SLA tuyển dụng.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"05/08/2026",ver:"3.0",
   by:"Lương Minh Quang",byRole:"Chuyên viên Tuyển dụng · PNS",
   chk:"Lã Thị Kiều Trang",chkRole:"Chuyên viên C&B · PNS",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[], actions:[],
 kpis:[
  {k:"Tổng CV thu thập",d:"L0 — toàn bộ CV nhận về",u:"CV",cur:318,prev:281,tgt:300,dir:1,p:0,sp:[186,214,238,265,281,318]},
  {k:"CV pass lọc HR",d:"L1 — qua vòng lọc hồ sơ",u:"CV",cur:142,prev:126,tgt:130,dir:1,p:0,sp:[82,94,106,118,126,142]},
  {k:"CV pass lọc Leader",d:"Leader duyệt sau bước lọc HR",u:"CV",cur:118,prev:104,tgt:110,dir:1,p:0,sp:[68,78,88,98,104,118]},
  {k:"Tỷ lệ pass lọc HR",d:"L1 trên tổng CV",u:"%",cur:44.7,prev:44.8,tgt:40,dir:1,sp:[44,44,45,45,45,45]},
  {k:"Ứng viên tới phỏng vấn",d:"L3A — có mặt phỏng vấn",u:"UV",cur:71,prev:63,tgt:70,dir:1,p:0,sp:[41,47,52,58,63,71]},
  {k:"Ứng viên pass phỏng vấn",d:"L4A — đạt vòng 1",u:"UV",cur:38,prev:34,tgt:35,dir:1,p:0,sp:[22,25,28,31,34,38]},
  {k:"Ứng viên nhận việc",d:"L8 — đi làm ngày đầu",u:"UV",cur:19,prev:17,tgt:20,dir:1,p:0,sp:[11,13,14,16,17,19]},
  {k:"Ứng viên đi làm đủ 10 ngày",d:"L9 — vượt mốc giữ chân đầu tiên",u:"UV",cur:14,prev:13,tgt:16,dir:1,p:0,sp:[8,9,11,12,13,14]},
  {k:"Tỷ lệ CV thành nhận việc",d:"L8 trên tổng CV thu thập",u:"%",cur:6.0,prev:6.0,tgt:6.5,dir:1,sp:[5.9,6.1,5.9,6.0,6.0,6.0]},
  {k:"Tỷ lệ bỏ cuộc sau nhận việc",d:"Nhận việc nhưng không đủ 10 ngày",u:"%",cur:26.3,prev:23.5,tgt:20,dir:-1,sp:[27,31,21,25,24,26]},
  {k:"Số CV trên một vị trí",u:"CV",cur:45,prev:38,tgt:30,dir:1,p:0,sp:[26,29,33,36,38,45]},
  {k:"Tổng chỉ tiêu cần tuyển",d:"Theo đề xuất đã duyệt",u:"người",cur:36,prev:33,tgt:36,dir:1,p:0,sp:[18,22,26,30,33,36]},
  {k:"Đã nhận việc theo đề xuất",u:"người",cur:29,prev:25,tgt:36,dir:1,p:0,sp:[13,17,20,23,25,29]},
  {k:"Tỷ lệ hoàn thành chỉ tiêu",d:"Đã nhận việc trên chỉ tiêu",u:"%",cur:80.6,prev:75.8,tgt:100,dir:1,sp:[72,77,77,77,76,81]},
  {k:"Chỉ tiêu còn lại",d:"Vị trí chưa tuyển đủ",u:"người",cur:7,prev:8,tgt:0,dir:-1,p:0,sp:[5,5,6,7,8,7]},
  {k:"Vị trí đang tuyển",u:"vị trí",cur:4,prev:5,tgt:0,dir:-1,p:0,sp:[3,4,5,5,5,4]},
  {k:"Tỷ lệ đúng hạn SLA gửi CV",d:"Order gửi CV đầu tiên trong hạn",u:"%",cur:50.0,prev:50.0,tgt:90,dir:1,p:0,sp:[100,100,50,50,50,50]}],
 charts:[
  {id:"a1",t:"Phễu tuyển dụng 8 bậc",h:"số ứng viên · L0 → L9",cls:"tall",span:"g21",
   f:()=>{const p=TDon()?TDx().pheu():TD_MAU.pheu;
     mk("a1","bar",{labels:p.map(x=>`${x.lv} · ${x.ten}`),
       datasets:[{data:p.map(x=>x.n),backgroundColor:p.map((_,i)=>PAL[i%PAL.length]),borderRadius:2}]},
       {indexAxis:"y",scales:AXH})}},
  {id:"a2",t:"Cơ cấu nguồn ứng viên",h:"số CV theo nguồn",cls:"tall",
   f:()=>{const e=TDon()?TDx().nhom(c=>c.nguon,6):TD_MAU.nguon;
     mk("a2","doughnut",{labels:e.map(x=>x.ten),
       datasets:[{data:e.map(x=>x.total),backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"a3",t:"CV · pass lọc HR · nhận việc theo tháng",h:"số ứng viên · 12 tháng",span:"g2",
   f:()=>{const m=(TDon()?TDx().theoThang():TD_MAU.thang).filter(x=>x.total||x.nhanViec);
     mk("a3","bar",{labels:m.map(x=>x.nhan),datasets:[
       {label:"Tổng CV",data:m.map(x=>x.total),backgroundColor:C.navy,borderRadius:2,maxBarThickness:24},
       {label:"Pass lọc HR",data:m.map(x=>x.hrPass),backgroundColor:C.amber,borderRadius:2,maxBarThickness:24},
       {label:"Nhận việc",data:m.map(x=>x.nhanViec),backgroundColor:C.green,borderRadius:2,maxBarThickness:24}]},
       {plugins:{legend:{display:true,position:"bottom"}}})}},
  {id:"a4",t:"Tỷ lệ chuyển đổi theo tháng",h:"% trên tổng CV của tháng",
   f:()=>{const m=(TDon()?TDx().theoThang():TD_MAU.thang).filter(x=>x.total>0);
     const ty=(a,b)=>b?r1(a/b*100,1):0;
     mk("a4","line",{labels:m.map(x=>x.nhan),datasets:[
       {label:"Pass lọc HR",data:m.map(x=>ty(x.hrPass,x.total)),borderColor:C.navy,backgroundColor:"rgba(24,155,216,.12)",fill:true,pointRadius:2},
       {label:"Tới phỏng vấn",data:m.map(x=>ty(x.thamGiaPV,x.total)),borderColor:C.navy2,pointRadius:2},
       {label:"Nhận việc",data:m.map(x=>ty(x.nhanViec,x.total)),borderColor:C.green,pointRadius:2}]},
       {plugins:{legend:{display:true,position:"bottom"}}})}},
  {id:"a5",t:"Top vị trí theo số CV nhận về",h:"CV · so với số nhận việc",span:"g2",
   f:()=>{const e=TDon()?TDx().nhom(c=>c.viTri,10)
       :[{ten:"E-Commerce BD Intern",total:126,nhanViec:9},{ten:"Nhân viên Xử lý đơn hàng",total:64,nhanViec:5},
         {ten:"Kế toán Công nợ",total:38,nhanViec:2},{ten:"Nhân viên Phát triển KD",total:31,nhanViec:2},
         {ten:"TTS Thiết kế đồ hoạ",total:24,nhanViec:1}];
     mk("a5","bar",{labels:e.map(x=>x.ten),datasets:[
       {label:"Tổng CV",data:e.map(x=>x.total),backgroundColor:C.navy,borderRadius:2,maxBarThickness:16},
       {label:"Nhận việc",data:e.map(x=>x.nhanViec),backgroundColor:C.green,borderRadius:2,maxBarThickness:16}]},
       {indexAxis:"y",scales:AXH,plugins:{legend:{display:true,position:"bottom"}}})}},
  {id:"a6",t:"Hiệu suất chuyên viên tuyển dụng",h:"CV phụ trách · ứng viên nhận việc",
   f:()=>{const e=TDon()?TDx().nhom(c=>c.nv,8)
       :[{ten:"QuangLM",total:186,nhanViec:11},{ten:"HuongNT",total:132,nhanViec:8}];
     mk("a6","bar",{labels:e.map(x=>x.ten),datasets:[
       {label:"CV phụ trách",data:e.map(x=>x.total),backgroundColor:C.navy2,borderRadius:2,maxBarThickness:30},
       {label:"Nhận việc",data:e.map(x=>x.nhanViec),backgroundColor:C.green,borderRadius:2,maxBarThickness:30}]},
       {plugins:{legend:{display:true,position:"bottom"}}})}},
  {id:"a7",t:"Chỉ tiêu và kết quả tuyển theo team",h:"người · theo đề xuất đã duyệt",span:"g2",
   f:()=>{const e=DXon()?TDx().dxNhom(o=>o.team,10)
       :[{ten:"HQS200",can:11,nhan:11},{ten:"BD10F",can:4,nhan:5},{ten:"TCKT",can:5,nhan:4},
         {ten:"Cung ứng",can:5,nhan:5},{ten:"HQS400",can:7,nhan:6}];
     mk("a7","bar",{labels:e.map(x=>x.ten),datasets:[
       {label:"Chỉ tiêu cần tuyển",data:e.map(x=>x.can),backgroundColor:C.navy,borderRadius:2,maxBarThickness:16},
       {label:"Đã nhận việc",data:e.map(x=>x.nhan),backgroundColor:C.green,borderRadius:2,maxBarThickness:16}]},
       {indexAxis:"y",scales:AXH,plugins:{legend:{display:true,position:"bottom"}}})}},
  {id:"a8",t:"Tình trạng đề xuất tuyển dụng",h:"số vị trí",
   f:()=>{const d=DXon()?TDx().dxStats():{dangTuyen:4,hoanThanh:14,tamDung:3};
     mk("a8","doughnut",{labels:["Đang tuyển","Hoàn thành","Tạm dừng"],
       datasets:[{data:[d.dangTuyen,d.hoanThanh,d.tamDung],backgroundColor:[C.gold,C.green,C.red],borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"a9",t:"Đề xuất tuyển dụng theo tháng",h:"người · chỉ tiêu so kết quả",span:"g2",
   f:()=>{const e=DXon()
       ?TDx().dxNhom(o=>o.thangSo?"T"+o.thangSo:"Khác").sort((a,b)=>(+String(a.ten).replace(/\D/g,"")||99)-(+String(b.ten).replace(/\D/g,"")||99))
       :[{ten:"T1",can:10,offer:11,nhan:11},{ten:"T2",can:18,offer:25,nhan:16},{ten:"T3",can:8,offer:7,nhan:7}];
     mk("a9","bar",{labels:e.map(x=>x.ten),datasets:[
       {label:"Cần tuyển",data:e.map(x=>x.can),backgroundColor:C.navy,borderRadius:2,maxBarThickness:24},
       {label:"Đã offer",data:e.map(x=>x.offer),backgroundColor:C.gold,borderRadius:2,maxBarThickness:24},
       {label:"Đã nhận việc",data:e.map(x=>x.nhan),backgroundColor:C.green,borderRadius:2,maxBarThickness:24}]},
       {plugins:{legend:{display:true,position:"bottom"}}})}},
  {id:"a10",t:"Cơ cấu cấp bậc tuyển dụng",h:"chỉ tiêu theo cấp bậc",
   f:()=>{const e=DXon()?TDx().dxNhom(o=>o.capBac,6)
       :[{ten:"TTS",can:24},{ten:"Nhân viên",can:9},{ten:"Trưởng nhóm",can:2},{ten:"Chuyên viên",can:1}];
     mk("a10","doughnut",{labels:e.map(x=>x.ten),
       datasets:[{data:e.map(x=>x.can),backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"a11",t:"Lý do tuyển: tuyển mới so tuyển thay thế",h:"chỉ tiêu · người",span:"g2",
   f:()=>{const e=DXon()?TDx().dxNhom(o=>o.lyDo,6)
       :[{ten:"Tuyển thay thế",can:30},{ten:"Tuyển mới",can:6}];
     mk("a11","bar",barSet(e.map(x=>x.ten),e.map(x=>x.can),C.navy2),{indexAxis:"y",scales:AXH})}},
  {id:"a12",t:"Khung SLA cam kết theo cấp bậc",h:"ngày làm việc kể từ khi order được duyệt",
   f:()=>mk("a12","bar",{labels:KHUNG_SLA.map(x=>x.cap),datasets:[
     {label:"Hạn gửi CV đầu tiên",data:KHUNG_SLA.map(x=>x.cv),backgroundColor:C.navy,borderRadius:2,maxBarThickness:20},
     {label:"Hạn có UV nhận việc",data:KHUNG_SLA.map(x=>x.n),backgroundColor:C.gold,borderRadius:2,maxBarThickness:20}]},
     {plugins:{legend:{display:true,position:"bottom"}}})}],
 tables:[
  {id:"t1",t:"Phễu tuyển dụng theo tháng",
   cols:[{t:"Tháng"},{t:"Tổng CV",a:"n"},{t:"Pass lọc HR",a:"n"},{t:"Tỷ lệ pass"},{t:"Đồng ý PV",a:"n"},{t:"Tới PV",a:"n"},{t:"Pass PV",a:"n"},{t:"Nhận việc",a:"n"},{t:"Đủ 10 ngày",a:"n"},{t:"CV → nhận việc"}],
   groups:[{t:"Kỳ",s:2},{t:"Sàng lọc",s:3},{t:"Phỏng vấn",s:3},{t:"Kết quả",s:3}],
   rows:()=>{const m=(TDon()?TDx().theoThang():TD_MAU.thang).filter(x=>x.total||x.nhanViec);
     const pc=(a,b)=>b?progCell(a/b*100,a/b>=.5?"#00A651":"#189BD8"):"—";
     return m.map(x=>[`<b>${x.nhan}</b>`,x.total,x.hrPass,pc(x.hrPass,x.total),
       x.dongYPV,x.thamGiaPV,x.passPV,x.nhanViec,x.d10,pc(x.nhanViec,x.total)])},
   total:()=>{const m=(TDon()?TDx().theoThang():TD_MAU.thang).filter(x=>x.total||x.nhanViec);
     const s=k=>m.reduce((a,b)=>a+b[k],0);
     return ["TỔNG CỘNG",s("total"),s("hrPass"),"—",s("dongYPV"),s("thamGiaPV"),s("passPV"),s("nhanViec"),s("d10"),"—"]}},
  {id:"t1b",t:"Hiệu quả theo nguồn ứng viên",
   cols:[{t:"Nguồn CV"},{t:"Tổng CV",a:"n"},{t:"% tổng CV"},{t:"Pass lọc HR",a:"n"},{t:"Tỷ lệ pass"},{t:"Tới PV",a:"n"},{t:"Pass PV",a:"n"},{t:"Nhận việc",a:"n"},{t:"Xếp loại",a:"c"}],
   rows:()=>{const e=TDon()?TDx().nhom(c=>c.nguon):TD_MAU.nguon;
     const tong=e.reduce((a,b)=>a+b.total,0);
     return e.map(x=>{const ty=x.total?x.hrPass/x.total*100:0;
       const xl=ty>=70?'<span class="pill p-ok">Tốt</span>':ty>=50?'<span class="pill p-w">Khá</span>':'<span class="pill p-b">Thấp</span>';
       return [`<b>${x.ten}</b>`,x.total,progCell(tong?x.total/tong*100:0,"#189BD8"),x.hrPass,
         progCell(ty,ty>=50?"#00A651":"#D96F00"),x.thamGiaPV,x.passPV,x.nhanViec,xl]})},
   total:rw=>["TỔNG CỘNG",rw.length+" nguồn","—","—","—","—","—","—","—"]},
  {id:"t1c",t:"Số liệu theo vị trí tuyển dụng",
   cols:[{t:"Vị trí"},{t:"Tổng CV",a:"n"},{t:"Pass lọc HR",a:"n"},{t:"Tới PV",a:"n"},{t:"Pass PV",a:"n"},{t:"Nhận việc",a:"n"},{t:"CV / 1 người nhận việc",a:"n"}],
   rows:()=>{const e=TDon()?TDx().nhom(c=>c.viTri,40)
       :[{ten:"E-Commerce BD Intern",total:126,hrPass:58,thamGiaPV:31,passPV:18,nhanViec:9}];
     return e.map(x=>[x.ten,x.total,x.hrPass,x.thamGiaPV,x.passPV,x.nhanViec,
       x.nhanViec?dec(x.total/x.nhanViec,1):"—"])}},
  {id:"t1d",t:"Đề xuất tuyển dụng và kết quả",
   cols:[{t:"Tháng",a:"c"},{t:"Thị trường"},{t:"Team"},{t:"Người đề xuất"},{t:"Ngày đề xuất",a:"c"},{t:"Cấp bậc",a:"c"},{t:"Vị trí"},{t:"Lý do tuyển"},{t:"Tình trạng",a:"c"},{t:"Cần tuyển",a:"n"},{t:"Đã offer",a:"n"},{t:"Đã nhận việc",a:"n"},{t:"Còn lại",a:"n"},{t:"Tiến độ"}],
   groups:[{t:"Đề xuất",s:9},{t:"Kết quả",s:5}],
   rows:()=>{const e=DXon()?TDx().dx()
       :[{thang:"Tháng 1",thiTruong:"Kinh doanh Quốc tế",team:"HQS200",nguoi:"LinhLM",ngay:"05/01/2026",
          capBac:"TTS",viTri:"E-Commerce Business Development Intern",lyDo:"Tuyển thay thế",
          trangThai:"Hoàn thành",can:2,offer:2,nhan:2,conLai:0}];
     return e.map(x=>{const t=x.trangThai.toLowerCase();
       const p=t.indexOf("hoàn thành")>=0?"p-ok":t.indexOf("tạm dừng")>=0?"p-b":"p-w";
       return [x.thang,x.thiTruong,x.team,x.nguoi,x.ngay,x.capBac,`<b>${x.viTri}</b>`,x.lyDo,
         `<span class="pill ${p}">${x.trangThai}</span>`,x.can,x.offer,x.nhan,
         x.conLai>0?`<b style="color:var(--rose)">${x.conLai}</b>`:"0",
         progCell(x.can?Math.min(x.nhan/x.can*100,100):0,x.can&&x.nhan>=x.can?"#00A651":"#D96F00")]})},
   total:()=>{const e=DXon()?TDx().dx():[];const s=k=>e.reduce((a,b)=>a+b[k],0);
     return ["TỔNG CỘNG",`${e.length} đề xuất`,"—","—","—","—","—","—","—",s("can"),s("offer"),s("nhan"),s("conLai"),"—"]}},
  {id:"t1e",t:"Theo dõi tiến độ tuyển dụng theo SLA",
   cols:[{t:"Ngày đề xuất",a:"c"},{t:"Bộ phận"},{t:"Người đề xuất"},{t:"Cấp bậc",a:"c"},{t:"Vị trí"},{t:"SL",a:"n"},{t:"Ngày duyệt",a:"c"},{t:"SLA có CV",a:"c"},{t:"Hạn gửi CV",a:"c"},{t:"SLA nhận việc",a:"c"},{t:"Hạn nhận việc",a:"c"},{t:"Gửi CV thực tế",a:"c"},{t:"Tình trạng CV",a:"c"},{t:"Tình trạng nhận việc",a:"c"}],
   groups:[{t:"Thông tin vị trí",s:6},{t:"Cam kết SLA",s:5},{t:"Thực tế",s:4}],
   rows:()=>{const e=SLAon()?TDx().sla():[];
     if(!e.length)return [["—","—","—","—",
       '<i>Chưa nối tab <b>Bảng theo dõi tiến độ theo SLA</b>. Mở tab đó trên Google Sheet, chép số sau chữ “gid=” trên thanh địa chỉ rồi dán link export CSV vào ô <b>RAW_SLA_TD</b> trong assets/config.js.</i>',
       "—","—","—","—","—","—","—","—","—"]];
     const badge=(tre,txt)=>txt?`<span class="pill ${tre?"p-b":"p-ok"}">${txt}</span>`:"—";
     return e.map(x=>[x.ngayDeXuat,x.boPhan,x.nguoi,x.capBac,`<b>${x.viTri}</b>`,x.soLuong||"—",
       x.ngayDuyet||"—",x.camKetCV||"—",x.hanCV||"—",x.camKetNhan||"—",x.hanNhan||"—",
       x.thucCV||"—",badge(x.treCV,x.ketCV),badge(x.treNhan,x.ketNhan)])}},
  {id:"t1f",t:"Khung SLA tuyển dụng theo cấp bậc",
   cols:[{t:"Cấp bậc"},{t:"Ví dụ vị trí"},{t:"Hạn có CV đầu tiên",a:"c"},{t:"Hạn nhận việc — tuyển thay thế",a:"c"},{t:"Hạn nhận việc — tuyển mới",a:"c"},{t:"Ghi chú"}],
   rows:()=>KHUNG_SLA.map(x=>[`<b>${x.cap}</b>`,x.vd,`${x.cv} ngày`,x.tt,x.moi,x.gc])}],
 defs:[
  ["Bộ level phễu tuyển dụng","L0 CV thu thập · L1 pass lọc HR · L3 đồng ý phỏng vấn · L3A tới phỏng vấn · L4A pass phỏng vấn vòng 1 · L7 có lịch đi làm · L8 đi làm ngày đầu · L9 đi làm đủ 10 ngày."],
  ["Tỷ lệ CV thành nhận việc","Số ứng viên đi làm ngày đầu (L8) chia cho tổng CV thu thập (L0) trong cùng phạm vi lọc."],
  ["Tỷ lệ bỏ cuộc sau nhận việc","Ứng viên đã đi làm ngày đầu nhưng không đủ 10 ngày công, chia cho số ứng viên nhận việc."],
  ["SLA tuyển dụng","Thời gian cam kết gửi CV đầu tiên tính từ khi order được BOD phê duyệt và có đủ JD, ngân sách, số lượng, tiêu chí tuyển. SLA không tính khi order chưa duyệt."],
  ["Chỉ tiêu còn lại","Số lượng cần tuyển trừ số đã nhận việc của từng đề xuất, lấy trực tiếp từ cột <em>Cần tuyển còn lại</em> của bảng đề xuất."],
  ["Order bổ sung","Order gửi sau ngày 18 hằng tháng được ghi nhận cho tháng tiếp theo; nếu khẩn cấp cần BOD xác nhận mức ưu tiên."]],
 note:"Nguồn số: <b>RAW_TuyenDung</b> (phễu ứng viên), <b>RAW_DeXuatTD</b> (đề xuất tuyển dụng và kết quả) và <b>RAW_SLA_TD</b> (theo dõi tiến độ theo SLA). SLA là cam kết gửi CV đầu tiên, không phải cam kết ứng viên đi làm ngay — timeline nhận việc phụ thuộc thị trường, tốc độ phản hồi của phòng ban và thời gian báo trước của ứng viên."
};

/* ---------------- HRM2 ---------------- */
REP.HRM2={
 title:"Báo cáo Chấm công & Phép",
 sub:"Mức độ tuân thủ chấm công, đi muộn – về sớm, phép tồn và tiến độ xác nhận công phục vụ chi lương.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"04/08/2026",ver:"2.1",
   by:"Lã Thị Kiều Trang",byRole:"Chuyên viên C&B · PNS",
   chk:"Đoàn Thu Hà",chkRole:"Chuyên viên C&B · PNS",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[
  "Tuân thủ chấm công đạt <b>97%</b>, vượt mục tiêu 95% và là mức cao nhất trong 12 kỳ gần đây.",
  "Tổng phút đi muộn giảm 13,3% còn 1.201 phút, tương ứng tiền phạt 1,20 triệu đồng theo mức 1.000đ/phút.",
  "Còn <b>6 nhân sự chưa được Lead xác nhận công</b>. Theo quy tắc cứng của SOP, các trường hợp này bị khoá bước tính lương ở HRM3.",
  "Phép tồn toàn công ty ở mức <b>612 ngày</b>, cao hơn ngưỡng kiểm soát 500 ngày. Nếu không giải toả, rủi ro dồn nghỉ vào Q4 và quý I/2027."],
 actions:[
  ['6 hồ sơ chưa xác nhận công thuộc Vận hành và Kinh doanh. Cần Lead xác nhận trước ngày 08/08 để không lỡ kỳ chi lương ngày 12.','t-hi'],
  ['Phép tồn vượt ngưỡng 22%. Đề nghị các Trưởng phòng lập lịch giải toả phép trước 30/11, tránh dồn vào cao điểm cuối năm.','t-md'],
  ['4 đơn điều chỉnh công nộp quá hạn 5 ngày. Đề nghị nhắc lại quy định tại Morning Huddle.','t-lo']],
 kpis:[
  {k:"Tỷ lệ tuân thủ chấm công",d:"Đủ 3 lần chấm công mỗi ngày",u:"%",cur:97.0,prev:96.0,tgt:95,dir:1,sp:[94,95,95,96,96,97]},
  {k:"Hồ sơ chưa xác nhận công",d:"Chặn bước chi lương",u:"người",cur:6,prev:9,tgt:0,dir:-1,p:0,sp:[14,12,11,10,9,6]},
  {k:"Tổng phút đi muộn",u:"phút",cur:1201,prev:1386,tgt:1000,dir:-1,p:0,f:v=>vnd(v),sp:[1680,1590,1502,1441,1386,1201]},
  {k:"Tiền phạt đi muộn",d:"Mức 1.000đ mỗi phút",u:"triệu",cur:1.20,prev:1.39,tgt:1.0,dir:-1,p:2,sp:[1.68,1.59,1.50,1.44,1.39,1.20]},
  {k:"Ngày công bình quân",d:"Công chuẩn 22 ngày",u:"ngày",cur:21.4,prev:21.2,tgt:21.5,dir:1,sp:[20.9,21.0,21.1,21.1,21.2,21.4]},
  {k:"Phép năm đã sử dụng",d:"Trên tổng quỹ phép",u:"%",cur:36.0,prev:31.0,tgt:58,dir:1,p:0,sp:[12,17,22,26,31,36]},
  {k:"Phép tồn toàn công ty",u:"ngày",cur:612,prev:658,tgt:500,dir:-1,p:0,f:v=>vnd(v),sp:[812,764,731,694,658,612]},
  {k:"Đơn điều chỉnh quá hạn",d:"Nộp sau 5 ngày quy định",u:"đơn",cur:4,prev:6,tgt:0,dir:-1,p:0,sp:[11,9,8,7,6,4]}],
 charts:[
  {id:"b1",t:"Phút đi muộn theo phòng ban",h:"phút",span:"g2",
   f:()=>mk("b1","bar",{labels:DEPTS,datasets:[{data:[412,268,196,142,98,54,31],backgroundColor:C.amber,borderRadius:1}]})},
  {id:"b2",t:"Tuân thủ chấm công so mục tiêu",h:"% · 12 kỳ",
   f:()=>mk("b2","line",{labels:M12,datasets:[
     {label:"Thực tế",data:[88,90,91,93,92,94,95,95,96,96,97,97],borderColor:C.green,backgroundColor:"rgba(16,185,129,.14)",fill:true,tension:.3,borderWidth:2,pointRadius:2},
     {label:"Mục tiêu 95%",data:M12.map(()=>95),borderColor:C.red,borderDash:[5,4],borderWidth:1.2,pointRadius:0}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{y:{min:80,max:100,grid:{color:cssv("--grid")},border:{display:false}},x:AX.x}})},
  {id:"b3",t:"Phép đã dùng và phép tồn theo phòng ban",h:"ngày",span:"g2",
   f:()=>mk("b3","bar",{labels:DEPTS,datasets:[
     {label:"Đã dùng",data:[104,82,61,42,28,16,11],backgroundColor:C.navy,borderRadius:1},
     {label:"Còn tồn",data:[178,131,108,79,58,36,22],backgroundColor:C.light,borderRadius:1}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{stacked:true,grid:{display:false},border:{color:"rgba(148,163,184,.28)"}},y:{stacked:true,grid:{color:cssv("--grid")},border:{display:false}}}})},
  {id:"b4",t:"Cơ cấu ngày nghỉ trong kỳ",h:"ngày",
   f:()=>mk("b4","doughnut",{labels:["Phép năm","Nghỉ không lương","Hiếu hỉ","Ốm đau","Thai sản"],
     datasets:[{data:[344,38,12,26,44],backgroundColor:PAL,borderWidth:0}]},{cutout:"58%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}],
 tables:[{id:"t2",t:"Chi tiết chấm công và phép theo nhân sự",
   cols:[{t:"Mã NV"},{t:"Họ tên"},{t:"Phòng ban"},{t:"Công chuẩn",a:"n"},{t:"Công thực tế",a:"n"},{t:"Lần muộn",a:"n"},{t:"Phút muộn",a:"n"},{t:"Phạt (đ)",a:"n"},{t:"Phép năm",a:"n"},{t:"Đã dùng",a:"n"},{t:"Tồn",a:"n"},{t:"Xác nhận Lead",a:"c"}],
   groups:[{t:"Nhân sự",s:4},{t:"Ngày công",s:3},{t:"Vi phạm giờ giấc",s:3},{t:"Phép năm",s:3}],
   rows:[
    ["NV-0142","Lã Thị Kiều Trang","Nhân sự","22","22,0","0","0","0","12,0","4,0","8,0",'<span class="pill p-ok">Đã xác nhận</span>'],
    ["NV-0087","Lương Minh Quang","Nhân sự","22","21,5","3","46","46.000","12,0","6,5","5,5",'<span class="pill p-ok">Đã xác nhận</span>'],
    ["NV-0203","Nguyễn Thị Hạnh","Kế toán","22","22,0","1","12","12.000","12,0","2,0","10,0",'<span class="pill p-ok">Đã xác nhận</span>'],
    ["NV-0311","Trần Văn Đức","Vận hành","22","20,0","6","112","112.000","12,0","8,0","4,0",'<span class="pill p-b">Chưa xác nhận</span>'],
    ["NV-0356","Phạm Thu Hương","Chăm sóc KH","22","22,0","2","24","24.000","12,0","1,0","11,0",'<span class="pill p-ok">Đã xác nhận</span>'],
    ["NV-0402","Đỗ Minh Khôi","Công nghệ","22","21,0","4","68","68.000","12,0","3,0","9,0",'<span class="pill p-w">Thiếu chấm công</span>'],
    ["NV-0418","Vũ Hải Yến","Marketing","22","22,0","0","0","0","12,0","5,0","7,0",'<span class="pill p-ok">Đã xác nhận</span>'],
    ["NV-0455","Bùi Quốc Anh","Kinh doanh","22","19,5","8","154","154.000","12,0","9,5","2,5",'<span class="pill p-b">Chưa xác nhận</span>']],
   total:["TỔNG CỘNG","8 nhân sự","—","176","170,0","24","416","416.000","96,0","39,0","57,0","6 chưa xác nhận"]}],
 defs:[["Tuân thủ chấm công","Số ngày công có đủ 3 lần chấm (đến, đầu chiều, về) chia cho tổng số ngày công phải chấm."],
   ["Không tính công","Sáng đến sau 9h30, chiều về trước 17h00, hoặc phần mềm không ghi nhận."],
   ["Phép tồn","Phép năm chưa sử dụng tính tới ngày chốt số. Phép dư cuối năm được bảo lưu tới hết 31/03 năm kế tiếp."],
   ["Xác nhận Lead","Bước Lead trực tiếp xác nhận bảng công. Chưa xác nhận thì chưa chuyển sang bước tính lương."]],
 note:"Quy tắc cứng của SOP chấm công – tính lương: <b>Lead chưa xác nhận công thì chưa chi lương</b>. Các dòng đánh dấu đỏ ở bảng trên tự động chặn bước tính lương tại HRM3."
};

/* ---------------- HRM3 ---------------- */
REP.HRM3={
 title:"Báo cáo Payroll & C&B",
 sub:"Quỹ lương kỳ, cơ cấu lương 2P, mức độ đạt P2 và chi phí nhân sự trên doanh thu.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"08/08/2026",ver:"1.4",
   by:"Lã Thị Kiều Trang",byRole:"Chuyên viên C&B · PNS",
   chk:"Nguyễn Thị Hạnh",chkRole:"Kế toán thanh toán · PKT",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[
  "Quỹ lương kỳ đạt <b>1.952 triệu đồng</b>, tăng 0,7% so kỳ trước, chủ yếu do 12 nhân sự onboard mới.",
  "Cơ cấu 2P giữ đúng thiết kế: P1 chiếm 80%, P2 chiếm 20% chia đều cho hiệu quả vận hành và chất lượng báo cáo.",
  "Chỉ <b>71% nhân sự đạt đủ P2</b>, thấp hơn mục tiêu 85%. Phần bị trừ tập trung ở cấu phần báo cáo chứ không phải vận hành.",
  "Chi phí nhân sự trên doanh thu ở mức 18,4%, vẫn trong ngưỡng kiểm soát 20% của BOD."],
 actions:[
  ['6 hồ sơ bị chặn chi do chưa xác nhận công tại HRM2. Cần xử lý trước ngày 10/08 để kịp kỳ chi lương ngày 12.','t-hi'],
  ['Tỷ lệ đạt P2 báo cáo chỉ 71%. Đề nghị rà lại deadline nộp báo cáo của từng vị trí — có khả năng deadline hiện tại không khả thi chứ không phải nhân sự chây ì.','t-hi'],
  ['Compa-ratio bình quân 0,97 cho thấy mặt bằng lương đang thấp hơn điểm giữa dải. Cần đưa vào kỳ rà soát thang bảng lương Q3.','t-md']],
 kpis:[
  {k:"Tổng quỹ lương kỳ",u:"triệu",cur:1952,prev:1938,tgt:2000,dir:-1,p:0,f:v=>vnd(v),sp:[1861,1890,1904,1921,1938,1952]},
  {k:"Lương bình quân đầu người",u:"triệu",cur:13.19,prev:13.10,tgt:13.0,dir:1,p:2,sp:[12.8,12.9,13.0,13.0,13.1,13.2]},
  {k:"Tỷ trọng P1 cố định",d:"Theo thiết kế lương 2P",u:"%",cur:80.0,prev:80.0,tgt:80,dir:1,p:0,sp:[80,80,80,80,80,80]},
  {k:"Tổng phụ cấp và thưởng",u:"triệu",cur:148,prev:145,tgt:150,dir:-1,p:0,f:v=>vnd(v),sp:[132,136,139,142,145,148]},
  {k:"Tỷ lệ nhân sự đạt đủ P2",u:"%",cur:71.0,prev:68.0,tgt:85,dir:1,p:0,sp:[59,62,65,66,68,71]},
  {k:"Tỷ lệ nhân sự đã tăng lương",u:"%",cur:58.1,prev:55.4,tgt:60,dir:1,sp:[46,49,52,54,55,58]},
  {k:"Mức tăng lương bình quân",d:"So lương khởi điểm",u:"%",cur:18.6,prev:17.9,tgt:15,dir:1,sp:[14,15,16,17,18,19]},
  {k:"Chưa tăng lương trên 12 tháng",u:"người",cur:14,prev:17,tgt:0,dir:-1,p:0,sp:[24,22,20,19,17,14]},
  {k:"Nhân sự lệch dải lương",d:"Ngoài dải Level đang xếp",u:"người",cur:5,prev:7,tgt:0,dir:-1,p:0,sp:[11,10,9,8,7,5]},
  {k:"Chi phí nhân sự trên doanh thu",u:"%",cur:18.4,prev:18.9,tgt:20.0,dir:-1,sp:[20.1,19.7,19.4,19.1,18.9,18.4]}],
 charts:[
  {id:"c1",t:"Quỹ lương P1 – P2 theo phòng ban",h:"triệu đồng",cls:"tall",span:"g21",
   f:()=>{let ph=[["Maverick",180,42],["HQS200",165,38],["VX101",150,35]];
     if(HRon()){const m={};HRx().active().forEach(r=>{const k=r.phong;m[k]=m[k]||[0,0];m[k][0]+=r.p1||0;m[k][1]+=r.p2||0});
       ph=Object.entries(m).map(([k,v])=>[k,v[0]/1e6,v[1]/1e6]).sort((a,b)=>(b[1]+b[2])-(a[1]+a[2])).slice(0,12)}
     mk("c1","bar",{labels:ph.map(x=>x[0]),datasets:[
       {label:"P1 cố định",data:ph.map(x=>r1(x[1],1)),backgroundColor:C.navy,borderRadius:2,maxBarThickness:26},
       {label:"P2 hiệu suất",data:ph.map(x=>r1(x[2],1)),backgroundColor:C.green,borderRadius:2,maxBarThickness:26}]},
       {plugins:{legend:{display:true,position:"bottom"}},scales:{x:Object.assign({stacked:true},AX.x),y:Object.assign({stacked:true},AX.y)}})}},
  {id:"c2",t:"Cơ cấu chi phí lương",h:"triệu đồng",
   f:()=>{let e=[["P1 cố định",1560],["P2 hiệu suất",392],["Phụ cấp và thưởng",148]];
     if(HRon()){const a=HRx().active();
       e=[["P1 cố định",a.reduce((s,r)=>s+(r.p1||0),0)/1e6],["P2 hiệu suất",a.reduce((s,r)=>s+(r.p2||0),0)/1e6],
          ["Phụ cấp và thưởng",a.reduce((s,r)=>s+(r.pc||0),0)/1e6]]}
     mk("c2","doughnut",{labels:lab(e),datasets:[{data:e.map(x=>r1(x[1],1)),backgroundColor:[C.navy,C.green,C.gold],borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"c3",t:"Dải lương theo Level",h:"triệu đồng · thấp nhất – trung vị – cao nhất",cls:"tall",span:"g21",
   f:()=>{let d=[{level:"G1",min:8,mid:9.5,max:11},{level:"G2",min:10,mid:12,max:14}];
     if(HRon())d=HRx().dailuong();
     mk("c3","bar",{labels:d.map(x=>x.level),datasets:[
       {label:"Thấp nhất",data:d.map(x=>r1(x.min/1e6||x.min,1)),backgroundColor:C.light,borderRadius:2,maxBarThickness:20},
       {label:"Trung vị",data:d.map(x=>r1(x.mid/1e6||x.mid,1)),backgroundColor:C.navy,borderRadius:2,maxBarThickness:20},
       {label:"Cao nhất",data:d.map(x=>r1(x.max/1e6||x.max,1)),backgroundColor:C.navy2,borderRadius:2,maxBarThickness:20}]},
       {plugins:{legend:{display:true,position:"bottom"}}})}},
  {id:"c4",t:"Lương bình quân theo phòng ban",h:"triệu đồng",
   f:()=>{let e=[["BOD",38],["Công nghệ",19],["Kinh doanh",13]];
     if(HRon()){const m={};HRx().active().filter(r=>r.luong>0).forEach(r=>{(m[r.phong]=m[r.phong]||[]).push(r.luong)});
       e=Object.entries(m).map(([k,v])=>[k,v.reduce((a,b)=>a+b,0)/v.length/1e6]).sort((a,b)=>b[1]-a[1]).slice(0,12)}
     mk("c4","bar",barSet(lab(e),e.map(x=>r1(x[1],1)),C.navy2),{indexAxis:"y",scales:AXH})}},
  {id:"c5",t:"Phân bố mức lương",h:"người",span:"g3",
   f:()=>{let e=[["Dưới 8tr",22],["8 – 12tr",54],["12 – 18tr",41],["18 – 25tr",19],["Trên 25tr",12]];
     if(HRon()){const b={"Dưới 8tr":0,"8 – 12tr":0,"12 – 18tr":0,"18 – 25tr":0,"Trên 25tr":0};
       HRx().active().filter(r=>r.luong>0).forEach(r=>{const v=r.luong/1e6;
         if(v<8)b["Dưới 8tr"]++;else if(v<12)b["8 – 12tr"]++;else if(v<18)b["12 – 18tr"]++;else if(v<25)b["18 – 25tr"]++;else b["Trên 25tr"]++});
       e=Object.entries(b)}
     mk("c5","bar",barSet(lab(e),val(e),C.navy),{})}},
  {id:"c6",t:"Cơ cấu phụ cấp và thưởng",h:"triệu đồng",
   f:()=>{let e=[["Chuyên cần",42],["Trách nhiệm",38],["Tiền ăn",44],["Thiết bị",12],["Thưởng chuyên cần",12]];
     if(HRon()){const a=HRx().active();
       e=[["Lương chuyên cần",a.reduce((s,r)=>s+r.lcc,0)/1e6],["Phụ cấp trách nhiệm",a.reduce((s,r)=>s+r.pctn,0)/1e6],
          ["Tiền ăn",a.reduce((s,r)=>s+r.an,0)/1e6],["Phụ cấp thiết bị",a.reduce((s,r)=>s+r.pctb,0)/1e6],
          ["Thưởng chuyên cần",a.reduce((s,r)=>s+r.tcc,0)/1e6]].filter(x=>x[1]>0)}
     mk("c6","doughnut",{labels:lab(e),datasets:[{data:e.map(x=>r1(x[1],1)),backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"c7",t:"Số lần tăng lương của đội ngũ",h:"người",
   f:()=>{let e=[["Chưa tăng",62],["1 lần",44],["2 lần",25],["3 lần trở lên",17]];
     if(HRon()){const b={"Chưa tăng":0,"1 lần":0,"2 lần":0,"3 lần trở lên":0};
       HRx().active().forEach(r=>{const n=r.tang.length;b[n===0?"Chưa tăng":n===1?"1 lần":n===2?"2 lần":"3 lần trở lên"]++});
       e=Object.entries(b)}
     mk("c7","bar",barSet(lab(e),val(e),C.amber),{})}}],
 tables:[
  {id:"t3",t:"Bảng lương chi tiết theo nhân sự",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Level",a:"c"},{t:"P1",a:"n"},{t:"P2",a:"n"},{t:"Phụ cấp",a:"n"},{t:"Tổng",a:"n"}],
   groups:[{t:"Định danh",s:4},{t:"Cơ cấu lương (đồng)",s:4}],
   rows:()=>{if(!HRon())return [["00083","Hoàng Thị Như Quỳnh","BOD","G7","32.000.000","8.000.000","2.000.000","42.000.000"]];
     return HRx().active().filter(r=>r.luong>0).sort((a,b)=>b.luong-a.luong).slice(0,300)
       .map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,r.level,vnd(r.p1),vnd(r.p2),vnd(r.pc),`<b>${vnd(r.luong)}</b>`])},
   total:rw=>["TỔNG","—","—","—","—","—","—",`${rw.length} nhân sự`]},
  {id:"t3b",t:"Dải lương theo Level",
   cols:[{t:"Level"},{t:"Số người",a:"n"},{t:"Thấp nhất",a:"n"},{t:"Trung vị",a:"n"},{t:"Cao nhất",a:"n"},{t:"Bình quân",a:"n"}],
   rows:()=>{const d=HRon()?HRx().dailuong():[{level:"G3",n:24,min:9e6,mid:12e6,max:16e6,bq:12.4e6}];
     return d.map(x=>[`<b>${x.level}</b>`,x.n,vnd(x.min),vnd(x.mid),vnd(x.max),vnd(x.bq)])}},
  {id:"t3c",t:"Nhân sự lệch dải lương của Level",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Level",a:"c"},{t:"Lương",a:"n"},{t:"Trạng thái",a:"c"}],
   rows:()=>{if(!HRon())return [];
     const b=HRx().dailuong();
     return HRx().active().filter(r=>r.luong>0).map(r=>{const x=b.find(y=>y.level===r.level);
       if(!x||x.n<3)return null;
       if(r.luong<x.min*1.0001&&r.luong<x.mid*0.7)return [r.ma,`<b>${r.ten}</b>`,r.phong,r.level,vnd(r.luong),'<span class="pill p-b">Dưới dải</span>'];
       if(r.luong>x.mid*1.6)return [r.ma,`<b>${r.ten}</b>`,r.phong,r.level,vnd(r.luong),'<span class="pill p-w">Trên dải</span>'];
       return null}).filter(Boolean).slice(0,200)}},
  {id:"t3d",t:"Nhân sự trên 12 tháng chưa tăng lương",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Ngày vào",a:"c"},{t:"Thâm niên (tháng)",a:"n"},{t:"Lương hiện tại",a:"n"}],
   rows:()=>{if(!HRon())return [];
     return HRx().tangLuong().chuaTang.sort((a,b)=>b.tn-a.tn).slice(0,200)
       .map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,dmy(r.vao),`<span class="pill ${r.tn>=24?'p-b':'p-w'}">${r.tn}</span>`,vnd(r.luong)])}}],
 defs:[["Lương 2P","P1 là phần cố định theo vị trí, chiếm 80%. P2 là phần biến động 20%, gồm 10% hiệu quả vận hành và 10% chất lượng báo cáo, chi trả theo tháng."],
   ["Compa-ratio","Lương thực tế chia cho điểm giữa dải lương của Grade tương ứng. Bằng 1,00 nghĩa là đúng điểm giữa."],
   ["Đạt đủ P2","Nhân sự nhận trọn 20% phần biến động, không bị trừ ở cả hai cấu phần."],
   ["Chặn chi","Hồ sơ chưa đủ điều kiện chi lương do vướng bước xác nhận công tại HRM2."]],
 note:"Điểm KETRAPHA đánh giá năm không được tính vào P2 tháng. P2 trả cho mức độ tuân thủ và đều đặn; KETRAPHA trả cho mức xuất sắc và đà tăng trưởng. Hai lớp không chồng lấn."
};

/* ---------------- HRM4 ---------------- */
const VP=[["Thuê văn phòng","6421",180,180],["Điện – nước","6428",26,29.4],["Internet & hạ tầng","6427",18,17.2],
 ["Văn phòng phẩm","6423",12,14.8],["Vệ sinh – bảo trì","6425",15,13.6],["Trà nước – pantry","6428",22,25.1],
 ["Công tác phí","6426",35,28.4],["Phần mềm nội bộ","6424",41,41]];
REP.HRM4={
 title:"Báo cáo chi phí vận hành văn phòng",
 sub:"Ngân sách so thực chi theo khoản mục, biến động kỳ và luỹ kế năm.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"05/08/2026",ver:"3.0",
   by:"Đoàn Thu Hà",byRole:"Hành chính · PNS",
   chk:"Nguyễn Thị Hạnh",chkRole:"Kế toán thanh toán · PKT",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[
  "Tổng chi kỳ <b>349,5 triệu đồng</b> trên ngân sách 349,0 triệu, vượt 0,5 triệu tương đương 0,1%.",
  "Ba khoản mục vượt trần: điện nước, pantry và văn phòng phẩm. Tổng phần vượt 9,1 triệu, được bù bởi tiết kiệm 8,6 triệu ở công tác phí và bảo trì.",
  "Luỹ kế bảy tháng đạt <b>67,9% ngân sách năm</b>, cao hơn mốc tuyến tính 58,3%. Nếu giữ nhịp hiện tại, ngân sách năm sẽ chạm trần vào giữa tháng 11.",
  "Chi phí bình quân trên đầu người 2,36 triệu, ổn định trong ba kỳ liên tiếp."],
 actions:[
  ['Luỹ kế vượt mốc tuyến tính 9,6 điểm phần trăm. Đề nghị BOD xem xét điều chỉnh ngân sách năm hoặc siết ba khoản mục vượt trần từ kỳ 08/2026.','t-hi'],
  ['Điện nước tăng 13,1% so ngân sách trong hai kỳ liên tiếp. Cần kiểm tra thiết bị làm mát và thực hiện quy định tắt thiết bị trước khi ra về.','t-md'],
  ['Rà soát lại danh mục phần mềm nội bộ 41 triệu mỗi kỳ, xác định license không còn sử dụng.','t-lo']],
 kpis:[
  {k:"Tổng chi trong kỳ",u:"triệu",cur:349.5,prev:346.0,tgt:349.0,dir:-1,sp:[344,347,341,346,346,349.5]},
  {k:"Tỷ lệ thực chi trên ngân sách",u:"%",cur:100.1,prev:99.1,tgt:100,dir:-1,sp:[98.6,99.4,97.7,99.1,99.1,100.1]},
  {k:"Chi phí bình quân đầu người",u:"triệu",cur:2.36,prev:2.34,tgt:2.40,dir:-1,p:2,sp:[2.39,2.38,2.33,2.35,2.34,2.36]},
  {k:"Số khoản mục vượt trần",u:"khoản",cur:3,prev:2,tgt:0,dir:-1,p:0,sp:[1,2,1,2,2,3]},
  {k:"Luỹ kế trên ngân sách năm",d:"Mốc tuyến tính tháng 7 là 58,3%",u:"%",cur:67.9,prev:58.2,tgt:58.3,dir:-1,sp:[19.4,29.1,38.6,48.5,58.2,67.9]},
  {k:"Giá trị tiết kiệm được",u:"triệu",cur:8.6,prev:6.2,tgt:5.0,dir:1,sp:[3.1,4.4,5.8,5.1,6.2,8.6]}],
 charts:[
  {id:"d1",t:"Ngân sách so thực chi theo khoản mục",h:"triệu đồng",cls:"tall",span:"g21",
   f:()=>mk("d1","bar",{labels:VP.map(x=>x[0]),datasets:[
     {label:"Ngân sách",data:VP.map(x=>x[2]),backgroundColor:C.light,borderRadius:1},
     {label:"Thực chi",data:VP.map(x=>x[3]),backgroundColor:C.navy,borderRadius:1}]},
     {indexAxis:'y',plugins:{legend:{display:true,position:"bottom"}},scales:AXH})},
  {id:"d2",t:"Cơ cấu chi phí trong kỳ",h:"% tổng chi",cls:"tall",
   f:()=>mk("d2","doughnut",{labels:VP.map(x=>x[0]),datasets:[{data:VP.map(x=>x[3]),backgroundColor:PAL,borderWidth:0}]},
     {cutout:"55%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})},
  {id:"d3",t:"Luỹ kế thực chi so mốc ngân sách tuyến tính",h:"% ngân sách năm",span:"g2",
   f:()=>mk("d3","line",{labels:M12.slice(5),datasets:[
     {label:"Luỹ kế thực chi",data:[9.6,19.4,29.1,38.6,48.5,58.2,67.9].slice(0,7),borderColor:C.navy,borderWidth:2,pointRadius:2,tension:.2},
     {label:"Mốc tuyến tính",data:[8.3,16.7,25,33.3,41.7,50,58.3],borderColor:C.red,borderDash:[5,4],borderWidth:1.2,pointRadius:0}]},
     {plugins:{legend:{display:true,position:"bottom"}}})},
  {id:"d4",t:"Chênh lệch so ngân sách theo khoản mục",h:"triệu đồng",
   f:()=>mk("d4","bar",{labels:VP.map(x=>x[0]),datasets:[{data:VP.map(x=>+(x[3]-x[2]).toFixed(1)),
     backgroundColor:VP.map(x=>x[3]-x[2]>0?C.red:C.green),borderRadius:1}]},
     {scales:{x:{grid:{display:false},border:{color:"rgba(148,163,184,.28)"},ticks:{maxRotation:45,minRotation:45}},y:AX.y}})}],
 tables:[{id:"t4",t:"Chi tiết khoản mục chi phí vận hành",
   cols:[{t:"Khoản mục"},{t:"Mã MISA",a:"c"},{t:"Phòng thụ hưởng"},{t:"Ngân sách",a:"n"},{t:"Thực chi",a:"n"},{t:"Chênh lệch",a:"n"},{t:"%",a:"n"},{t:"Mức độ",a:"c"},{t:"Luỹ kế năm",a:"n"},{t:"Trạng thái",a:"c"}],
   groups:[{t:"Định danh",s:4},{t:"Kỳ 07/2026",s:5},{t:"Luỹ kế",s:2}],
   rows:VP.map(([k,ms,b,a])=>{const d=a-b,p=d/b*100;
     return [k,ms,"Khối BO",vnd(b*1e6),vnd(a*1e6),
      `<span class="${d>0?'dn':'up'}">${d>0?'+':''}${vnd(d*1e6)}</span>`,
      `<span class="${d>0?'dn':'up'}">${d>0?'+':''}${dec(p,1)}%</span>`,
      miniBar(d,10,d>0), vnd(a*7.1e6),
      d>b*0.1?'<span class="pill p-b">Vượt trần</span>':d>0?'<span class="pill p-w">Vượt nhẹ</span>':'<span class="pill p-ok">Trong ngân sách</span>']}),
   total:["TỔNG CỘNG","—","—",vnd(349e6),vnd(349.5e6),"+"+vnd(0.5e6),"+0,1%","—",vnd(2418e6),"3 khoản vượt trần"]}],
 defs:[["Vượt trần","Khoản mục có thực chi vượt ngân sách kỳ trên 10%."],
   ["Mốc tuyến tính","Tỷ lệ ngân sách năm được phép sử dụng nếu chi đều mỗi tháng. Tháng 7 tương ứng 58,3%."],
   ["Luỹ kế năm","Tổng thực chi từ tháng 1 tới kỳ báo cáo."],
   ["Mã MISA","Mã tài khoản hạch toán trên hệ thống kế toán MISA, dùng đối chiếu với PKT."]],
 note:"Số liệu đã đối chiếu với sổ kế toán MISA tại ngày 02/08/2026. Chênh lệch giữa bảng này và sổ kế toán bằng không."
};

/* ---------------- HRM5 ---------------- */
const TT=[["Sinh nhật tháng","Định kỳ tháng",18,17.2,138,148],["Happy Hour","Định kỳ tháng",26,29.5,112,148],
 ["Value of the Month","Định kỳ tháng",12,10.4,131,148],["Đào tạo văn hoá","Định kỳ quý",38,34.2,96,148],
 ["Truyền thông số","Định kỳ tháng",24,22.8,0,0],["Company Trip","Thường niên",320,0,0,148],["Culture Awards","Thường niên",45,0,0,148]];
REP.HRM5={
 title:"Báo cáo chi phí truyền thông nội bộ",
 sub:"Chi phí hoạt động văn hoá nội bộ, mức độ tham gia và hiệu quả chi trên đầu người.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"05/08/2026",ver:"1.8",
   by:"Đoàn Thu Hà",byRole:"Hành chính · PNS",
   chk:"Lương Minh Quang",chkRole:"Chuyên viên PNS",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[
  "Chi truyền thông nội bộ kỳ đạt <b>114,1 triệu đồng</b>, thấp hơn ngân sách 118,0 triệu, tương ứng tiết kiệm 3,3%.",
  "Tỷ lệ tham gia bình quân <b>83%</b>, vượt mục tiêu 80%. Happy Hour và Sinh nhật tháng giữ mức tham gia cao nhất.",
  "Đào tạo văn hoá chỉ đạt 65% tham gia, là hoạt động duy nhất dưới ngưỡng 70%.",
  "Luỹ kế năm mới dùng 41,3% ngân sách do Company Trip và Culture Awards dồn vào Q4."],
 actions:[
  ['Đào tạo văn hoá tham gia 65%, dưới ngưỡng. Đề nghị đổi khung giờ tổ chức và ràng buộc tham dự với Culture Score theo cơ chế đánh giá.','t-md'],
  ['Company Trip 320 triệu và Culture Awards 45 triệu chưa triển khai. Cần chốt thời điểm và nhà cung cấp trước 30/09 để không dồn áp lực cuối năm.','t-md'],
  ['Chi phí Happy Hour vượt ngân sách 13,5% ba kỳ liên tiếp. Đề nghị chốt định mức trên đầu người.','t-lo']],
 kpis:[
  {k:"Chi truyền thông nội bộ trong kỳ",u:"triệu",cur:114.1,prev:106.0,tgt:118.0,dir:-1,sp:[69,83,91,106,106,114.1]},
  {k:"Tỷ lệ thực chi trên ngân sách kỳ",u:"%",cur:96.7,prev:94.6,tgt:100,dir:-1,sp:[92,94,95,95,95,96.7]},
  {k:"Luỹ kế trên ngân sách năm",u:"%",cur:41.3,prev:34.2,tgt:58.3,dir:-1,sp:[12,18,24,29,34,41.3]},
  {k:"Chi phí bình quân đầu người",u:"triệu",cur:0.77,prev:0.72,tgt:0.80,dir:-1,p:2,sp:[0.48,0.57,0.62,0.72,0.72,0.77]},
  {k:"Tỷ lệ tham gia bình quân",u:"%",cur:83.0,prev:80.0,tgt:80,dir:1,p:0,sp:[74,76,78,79,80,83]},
  {k:"Hoạt động dưới ngưỡng tham gia",d:"Dưới 70% người được mời",u:"hoạt động",cur:1,prev:2,tgt:0,dir:-1,p:0,sp:[3,3,2,2,2,1]}],
 charts:[
  {id:"e1",t:"Ngân sách so thực chi theo hoạt động",h:"triệu đồng",span:"g2",
   f:()=>mk("e1","bar",{labels:TT.map(x=>x[0]),datasets:[
     {label:"Ngân sách",data:TT.map(x=>x[2]),backgroundColor:C.light,borderRadius:1},
     {label:"Thực chi",data:TT.map(x=>x[3]),backgroundColor:C.navy,borderRadius:1}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{grid:{display:false},border:{color:"rgba(148,163,184,.28)"},ticks:{maxRotation:40,minRotation:40}},y:AX.y}})},
  {id:"e2",t:"Tỷ lệ tham gia theo hoạt động",h:"% người tham gia trên số được mời",
   f:()=>mk("e2","bar",{labels:TT.filter(x=>x[4]).map(x=>x[0]),datasets:[
     {label:"Tham gia",data:TT.filter(x=>x[4]).map(x=>+(x[4]/x[5]*100).toFixed(0)),backgroundColor:C.green,borderRadius:1},
     {label:"Ngưỡng 70%",type:"line",data:TT.filter(x=>x[4]).map(()=>70),borderColor:C.red,borderDash:[5,4],borderWidth:1.2,pointRadius:0}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{grid:{display:false},border:{color:"rgba(148,163,184,.28)"},ticks:{maxRotation:30,minRotation:30}},y:{max:100,grid:{color:cssv("--grid")},border:{display:false}}}})},
  {id:"e3",t:"Chi truyền thông nội bộ 12 kỳ",h:"triệu đồng",span:"g2",
   f:()=>mk("e3","bar",{labels:M12,datasets:[{data:[62,58,71,96,412,88,74,69,83,91,106,114],backgroundColor:C.navy2,borderRadius:1}]})},
  {id:"e4",t:"Chi phí trên đầu người so mức độ tham gia",h:"mỗi điểm là một hoạt động",
   f:()=>mk("e4","scatter",{datasets:[{data:TT.filter(x=>x[4]).map(x=>({x:+(x[4]/x[5]*100).toFixed(0),y:+(x[3]*1e6/x[4]/1000).toFixed(0)})),backgroundColor:C.navy,pointRadius:6}]},
     {scales:{x:{title:{display:true,text:"Tỷ lệ tham gia (%)"},grid:{color:cssv("--grid")},border:{display:false}},
              y:{title:{display:true,text:"Chi phí mỗi người (nghìn đồng)"},grid:{color:cssv("--grid")},border:{display:false}}}})}],
 tables:[{id:"t5",t:"Chi tiết hoạt động truyền thông nội bộ",
   cols:[{t:"Hoạt động"},{t:"Loại",a:"c"},{t:"Tham gia",a:"c"},{t:"Tỷ lệ",a:"n"},{t:"Ngân sách",a:"n"},{t:"Thực chi",a:"n"},{t:"Chênh lệch",a:"n"},{t:"Chi phí mỗi người",a:"n"},{t:"Trạng thái",a:"c"}],
   groups:[{t:"Hoạt động",s:3},{t:"Mức độ tham gia",s:2},{t:"Tài chính",s:4},{t:"",s:1}],
   rows:TT.map(([e,ty,b,a,j,inv])=>{const d=a-b;
     return [e,ty,j?`${j}/${inv}`:"—",j?dec(j/inv*100,0)+"%":"—",vnd(b*1e6),a?vnd(a*1e6):"—",
      a?`<span class="${d>0?'dn':'up'}">${d>0?'+':''}${vnd(d*1e6)}</span>`:"—",
      j&&a?vnd(a*1e6/j):"—",
      a?(j&&j/inv<0.7?'<span class="pill p-w">Tham gia thấp</span>':'<span class="pill p-ok">Đã tổ chức</span>'):'<span class="pill p-n">Chưa tới kỳ</span>']}),
   total:["TỔNG CỘNG","7 hoạt động","—","83%",vnd(483e6),vnd(114.1e6),"—","—","5 đã tổ chức · 2 chờ Q4"]}],
 defs:[["Tỷ lệ tham gia","Số người có mặt chia cho số người được mời. Hoạt động truyền thông số không tính chỉ số này."],
   ["Chi phí mỗi người","Thực chi chia cho số người tham gia thực tế, không chia theo số được mời."],
   ["Ngưỡng tham gia","Mức 70% do BOD đặt. Dưới ngưỡng cần rà lại hình thức tổ chức."]],
 note:"Chi phí Company Trip và Culture Awards đã được duyệt ngân sách nhưng chưa phát sinh, dự kiến thực hiện trong Q4/2026."
};

/* ---------------- HRM6 ---------------- */
REP.HRM6={
 title:"Báo cáo tình hình nhân sự",
 sub:"Cơ cấu đội ngũ, biến động onboard – off, và tình trạng hoàn thiện hồ sơ.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"04/08/2026",ver:"4.2",
   by:"Đoàn Thu Hà",byRole:"Hành chính nhân sự · PNS",
   chk:"Lã Thị Kiều Trang",chkRole:"Chuyên viên C&B · PNS",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[
  "Headcount cuối kỳ <b>148 người</b>, tăng 1 người. Vào 12, ra 11.",
  "Turnover tháng 1,4% và luỹ kế năm 9,8%, đều trong ngưỡng kiểm soát. Tuy nhiên <b>27% số nghỉ có thâm niên dưới 12 tháng</b>, cao hơn ngưỡng 20%.",
  "Tỷ lệ nhân sự toàn thời gian 81,8%. Phần còn lại gồm bán thời gian, thực tập sinh và cộng tác viên.",
  "Hồ sơ đầy đủ đạt 92,6%. Còn <b>4 hồ sơ quá hạn 30 ngày</b> chưa bổ sung, tập trung ở mục sổ bảo hiểm."],
 actions:[
  ['4 hồ sơ quá hạn 30 ngày. Đề nghị khoá quyền tạo đơn trên 1Office tới khi bổ sung đủ, theo cơ chế đã thống nhất.','t-hi'],
  ['Nghỉ dưới 12 tháng chiếm 27%. Cần rà lại chất lượng onboarding và mức độ rõ ràng của JD ở hai phòng Vận hành và Kinh doanh.','t-hi'],
  ['2 Exit Interview chưa thực hiện. Theo quy trình, HR phỏng vấn chứ không phải quản lý trực tiếp.','t-md']],
 kpis:[
  {k:"Headcount cuối kỳ",d:"Nhân sự đang làm tại ngày chốt",u:"người",cur:148,prev:146,tgt:150,dir:1,p:0,sp:[141,144,146,147,148,148],showDelta:1},
  {k:"Nhân sự onboard trong kỳ",u:"người",cur:6,prev:5,tgt:8,dir:1,p:0,sp:[4,5,7,6,5,6]},
  {k:"Nhân sự nghỉ trong kỳ",u:"người",cur:2,prev:3,tgt:2,dir:-1,p:0,sp:[3,4,2,3,3,2]},
  {k:"Turnover tháng",u:"%",cur:1.4,prev:1.9,tgt:2.0,dir:-1,sp:[2.4,2.1,1.8,2.0,1.9,1.4]},
  {k:"Turnover luỹ kế năm",u:"%",cur:9.8,prev:8.4,tgt:15.0,dir:-1,sp:[2.1,4.0,5.6,7.0,8.4,9.8]},
  {k:"Tỷ lệ nghỉ trong thử việc",d:"Nghỉ trước 3 tháng làm việc",u:"%",cur:12.0,prev:14.0,tgt:10.0,dir:-1,sp:[18,17,15,14,14,12],tone:"warn"},
  {k:"Tỷ lệ nghỉ dưới 12 tháng",u:"%",cur:27.3,prev:22.0,tgt:20.0,dir:-1,sp:[18,19,21,23,22,27],tone:"alert"},
  {k:"Thâm niên bình quân",u:"tháng",cur:18.4,prev:17.9,tgt:24,dir:1,sp:[15,16,16.8,17.4,17.9,18.4]},
  {k:"Tuổi bình quân",u:"tuổi",cur:26.4,prev:26.3,tgt:28,dir:1,sp:[26,26.1,26.2,26.2,26.3,26.4]},
  {k:"Tỷ lệ nhân sự toàn thời gian",u:"%",cur:81.8,prev:82.4,tgt:80.0,dir:1,sp:[84,83,83,82,82,82]},
  {k:"Tỷ lệ hồ sơ đầy đủ",d:"Bình quân các trường thông tin bắt buộc",u:"%",cur:92.6,prev:90.5,tgt:100,dir:1,sp:[84,86,88,89,91,93]},
  {k:"Quản lý quá tải",d:"Trên 10 nhân sự trực tiếp · bấm để xem danh sách",u:"người",cur:2,prev:2,tgt:0,dir:-1,p:0,sp:[3,3,2,2,2,2],click:"openOverloadModal()"}],
 /* Ba nhóm thẻ chỉ số, mỗi nhóm một hàng 4 cột. Thứ tự trong "ks" là thứ tự
    hiển thị; chỉ số nào không nằm trong nhóm nào vẫn được xếp vào hàng cuối. */
 kgroups:[
  {t:"Quy mô & Biến động",d:"đội ngũ vào – ra trong kỳ",
   ks:["Headcount cuối kỳ","Nhân sự onboard trong kỳ","Nhân sự nghỉ trong kỳ","Tỷ lệ nhân sự toàn thời gian"]},
  {t:"Tỷ lệ nghỉ việc & Cảnh báo rủi ro",d:"vượt ngưỡng thì thẻ đổi màu",
   ks:["Turnover tháng","Turnover luỹ kế năm","Tỷ lệ nghỉ trong thử việc","Tỷ lệ nghỉ dưới 12 tháng"]},
  {t:"Đặc điểm & Quản trị nội bộ",d:"chất lượng đội ngũ và hồ sơ",
   ks:["Thâm niên bình quân","Tuổi bình quân","Tỷ lệ hồ sơ đầy đủ","Quản lý quá tải"]}],
 charts:[
  {id:"f1",t:"Cơ cấu theo Khối",h:"người",span:"g3",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active(),r=>r.khoi):[["BOD",4],["BO",46],["Kinh doanh",98]];
     mk("f1","bar",barSet(lab(e),val(e),C.navy),{})}},
  {id:"f2",t:"Cơ cấu theo Chức năng",h:"người",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active(),r=>r.cn,8):[["BD",52],["CSKH",34],["Vận hành",21],["HR",9],["Design",8],["IT",7]];
     mk("f2","doughnut",{labels:lab(e),datasets:[{data:val(e),backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"f3",t:"Hình thức lao động",h:"người",
   f:()=>{const a=HRon()?HRx().active():[];
     const e=HRon()?[["Chính thức",a.filter(r=>!r.ctv).length],["Cộng tác viên · Parttime",a.filter(r=>r.ctv).length]]
       :[["Chính thức",121],["Cộng tác viên · Parttime",27]];
     mk("f3","doughnut",{labels:lab(e),datasets:[{data:val(e),backgroundColor:[C.navy,C.gold],borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"f4",t:"Cơ cấu theo Phòng ban",h:"người · 12 phòng lớn nhất",cls:"tall",span:"g21",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active(),r=>r.phong,12):[["Maverick Team",22],["HQS200",19],["VX101 Team",17],["WGG100 Team",15]];
     mk("f4","bar",barSet(lab(e),val(e),C.navy2),{indexAxis:"y",scales:AXH})}},
  {id:"f5",t:"Nhóm tuổi",h:"người",
   f:()=>{const e=HRon()?HRx().nhomTuoi(HRx().active()):[["Dưới 22",18],["22 – 25",57],["26 – 30",44],["31 – 35",21],["Trên 35",8]];
     mk("f5","bar",barSet(lab(e),val(e),C.green),{})}},
  {id:"f6",t:"Biến động nhân sự 12 tháng",h:"vào – ra – tổng đội ngũ",cls:"tall",span:"g21",
   f:()=>{const b=HRon()?HRx().bienDong(12,RANGE&&RANGE.to?new Date(RANGE.to):null)
       :M12.map((m,i)=>({nhan:m,vao:3+i%4,ra:1+i%3,hc:130+i*2}));
     mk("f6","bar",{labels:b.map(x=>x.nhan),datasets:[
       {label:"Vào",data:b.map(x=>x.vao),backgroundColor:C.green,borderRadius:2,maxBarThickness:22},
       {label:"Ra",data:b.map(x=>-x.ra),backgroundColor:C.red,borderRadius:2,maxBarThickness:22},
       {label:"Tổng đội ngũ",type:"line",data:b.map(x=>x.hc),borderColor:C.gold,borderWidth:2.6,pointRadius:3,
        pointBackgroundColor:C.gold,tension:.38,yAxisID:"y1"}]},
       {plugins:{legend:{display:true,position:"bottom"}},
        scales:{x:AX.x,y:AX.y,y1:{position:"right",grid:{display:false},border:{display:false}}}})}},
  {id:"f7",t:"Giới tính",h:"người",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active(),r=>r.gt):[["Nữ",81],["Nam",67]];
     mk("f7","doughnut",{labels:lab(e),datasets:[{data:val(e),backgroundColor:[C.navy2,C.navy],borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"f8",t:"Thâm niên đội ngũ",h:"người",span:"g3",
   f:()=>{const e=HRon()?HRx().nhomThamNien(HRx().active()):[["Dưới 3 tháng",21],["3 – 6 tháng",25],["6 – 12 tháng",38],["1 – 2 năm",41],["Trên 2 năm",23]];
     mk("f8","bar",barSet(lab(e),val(e),C.amber),{})}},
  {id:"f9",t:"Trình độ học vấn",h:"người",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active(),r=>r.hv,6):[["Đại học",94],["Cao đẳng",29],["Trung cấp",14],["Khác",11]];
     mk("f9","doughnut",{labels:lab(e),datasets:[{data:val(e),backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"f10",t:"Số nhân sự theo quản lý trực tiếp",h:"người · 12 quản lý nhiều nhất",cls:"tall",span:"g21",
   f:()=>{const e=HRon()?HRx().spanQL().slice(0,12):[["Hoàng Minh Quân",14],["Trần Tây Đức",11],["Lê Tấn Thọ",9]];
     mk("f10","bar",barSet(lab(e),val(e),e.map(x=>x[1]>10?C.red:C.navy)),{indexAxis:"y",scales:AXH})}},
  {id:"f11",t:"Mức độ hoàn thiện hồ sơ",h:"% nhân sự có thông tin",
   f:()=>{const d=HRon()?HRx().thieuHoSo():[{ten:"Email công ty",ty:96},{ten:"CCCD",ty:88},{ten:"Số tài khoản",ty:81}];
     mk("f11","bar",barSet(d.map(x=>x.ten),d.map(x=>r1(x.ty,0)),d.map(x=>x.ty>=95?C.green:x.ty>=80?C.amber:C.red)),
       {indexAxis:"y",scales:AXH})}},
  {id:"f12",t:"Phân bố theo văn phòng",h:"người",span:"g3",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active(),r=>r.vp,8):[["Hà Nội",132],["Lào Cai",9],["Khác",7]];
     mk("f12","bar",barSet(lab(e),val(e),C.cyan||C.navy2),{})}},
  {id:"f13",t:"Tình trạng hôn nhân",h:"người",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active(),r=>r.hn,5):[["Độc thân",112],["Đã kết hôn",36]];
     mk("f13","doughnut",{labels:lab(e),datasets:[{data:val(e),backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"f14",t:"Top ngành học",h:"người",
   f:()=>{const e=HRon()?HRx().demTheo(HRx().active().filter(r=>r.nganh),r=>r.nganh,8):[["Kinh tế",34],["CNTT",21],["Marketing",18]];
     mk("f14","bar",barSet(lab(e),val(e),C.navy2),{indexAxis:"y",scales:AXH})}}],
 tables:[
  {id:"t6a",t:"Nhân sự onboard trong phạm vi lọc",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Vị trí"},{t:"Quản lý"},{t:"Ngày vào",a:"c"}],
   rows:()=>{if(!HRon())return [["00892","Nguyễn Văn A","HQS200","Nhân viên phát triển kinh doanh","Trần Việt Trí","01/07/2026"]];
     const f=new Date(RANGE.from),t=new Date(RANGE.to);
     return HRx().rows().filter(r=>r.vao&&r.vao>=f&&r.vao<=t).sort((a,b)=>b.vao-a.vao).slice(0,300)
       .map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,r.vt||r.cv,r.ql||"—",dmy(r.vao)])}},
  {id:"t6b",t:"Nhân sự nghỉ việc trong phạm vi lọc",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Ngày vào",a:"c"},{t:"Ngày nghỉ",a:"c"},{t:"Thâm niên (tháng)",a:"n"}],
   rows:()=>{if(!HRon())return [["00641","Đỗ Thị Hương","Công nghệ","12/01/2003","08/04/2026","14"]];
     const f=new Date(RANGE.from),t=new Date(RANGE.to);
     return HRx().rows().filter(r=>r.nghi&&r.nghi>=f&&r.nghi<=t).sort((a,b)=>b.nghi-a.nghi).slice(0,300)
       .map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,dmy(r.vao),dmy(r.nghi),
         `<span class="pill ${r.tn<3?'p-b':r.tn<12?'p-w':'p-ok'}">${r.tn}</span>`])}},
  {id:"t6c",t:"Mức độ hoàn thiện hồ sơ theo từng trường thông tin",
   cols:[{t:"Trường thông tin"},{t:"Đã có",a:"n"},{t:"Còn thiếu",a:"n"},{t:"Tỷ lệ đủ",a:"n"}],
   rows:()=>{const d=HRon()?HRx().thieuHoSo():[{ten:"Email công ty",du:142,thieu:6,ty:95.9}];
     return d.map(x=>[x.ten,dec(x.du,0),x.thieu?`<span class="pill p-b">${x.thieu}</span>`:'<span class="pill p-ok">0</span>',
       progCell(x.ty,x.ty>=95?"#10B981":x.ty>=80?"#F59E0B":"#F43F5E")])}},
  {id:"t6d",t:"Số nhân sự theo quản lý trực tiếp",
   cols:[{t:"Quản lý trực tiếp"},{t:"Số nhân sự",a:"n"},{t:"Đánh giá",a:"c"}],
   rows:()=>{const e=HRon()?HRx().spanQL():[["Hoàng Minh Quân",14]];
     return e.map(([ten,n])=>[`<b>${ten}</b>`,n,
       n>10?'<span class="pill p-b">Quá tải</span>':n<3?'<span class="pill p-w">Quản ít</span>':'<span class="pill p-ok">Hợp lý</span>'])}},
  {id:"t6e",t:"Nhân sự chưa gán quản lý trực tiếp",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Chức vụ"},{t:"Ngày vào",a:"c"}],
   rows:()=>{if(!HRon())return [];
     return HRx().active().filter(r=>!r.ql).slice(0,200).map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,r.cv,dmy(r.vao)])}},
  {id:"t6f",t:"Sinh nhật và kỷ niệm ngày vào trong tháng",
   cols:[{t:"Họ và tên"},{t:"Phòng ban"},{t:"Sự kiện"},{t:"Ngày",a:"c"},{t:"Số năm",a:"n"}],
   rows:()=>{if(!HRon())return [];
     const m=(RANGE&&RANGE.to?new Date(RANGE.to):new Date()).getMonth(),now=new Date(),out=[];
     HRx().active().forEach(r=>{
       if(r.sinh&&r.sinh.getMonth()===m)out.push([`<b>${r.ten}</b>`,r.phong,'<span class="pill p-w">Sinh nhật</span>',dmy(r.sinh),now.getFullYear()-r.sinh.getFullYear()]);
       if(r.vao&&r.vao.getMonth()===m&&r.vao.getFullYear()<now.getFullYear())
         out.push([`<b>${r.ten}</b>`,r.phong,'<span class="pill p-ok">Kỷ niệm vào công ty</span>',dmy(r.vao),now.getFullYear()-r.vao.getFullYear()]);
     });return out.slice(0,300)}},
  {id:"t6g",t:"Nhân sự sắp hết thử việc trong 30 ngày",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Ngày vào",a:"c"},{t:"Đủ 60 ngày",a:"c"},{t:"Đủ 90 ngày",a:"c"}],
   rows:()=>{if(!HRon())return [];
     const now=new Date();
     return HRx().active().filter(r=>r.vao&&r.tn<4).map(r=>{
       const d60=new Date(r.vao.getTime()+60*864e5),d90=new Date(r.vao.getTime()+90*864e5);
       return {r,d60,d90,con:Math.round((d90-now)/864e5)}})
       .filter(x=>x.con>=-30&&x.con<=30).sort((a,b)=>a.con-b.con).slice(0,200)
       .map(x=>[x.r.ma,`<b>${x.r.ten}</b>`,x.r.phong,dmy(x.r.vao),dmy(x.d60),
         `<span class="pill ${x.con<0?'p-b':x.con<=15?'p-w':'p-ok'}">${dmy(x.d90)}</span>`])}}],
 defs:[["Headcount","Số nhân sự có trạng thái Đang làm tại ngày chốt số, bao gồm cả nhân sự đang thử việc."],
   ["Turnover tháng","Số người nghỉ trong kỳ chia cho headcount bình quân kỳ."],
   ["Nghỉ dưới 12 tháng","Số người nghỉ có thâm niên dưới 12 tháng, chia cho tổng số nghỉ trong kỳ."],
   ["Hồ sơ đầy đủ","Có đủ 8 đầu mục bắt buộc đã số hoá lên 1Office."],
   ["Quá hạn 30 ngày","Hồ sơ còn thiếu sau 30 ngày kể từ ngày vào làm."]],
 note:"Dữ liệu lọc theo trạng thái Đang làm tại ngày chốt số. Nhân sự nghỉ trong kỳ được tách sang bảng off, không tính vào cơ cấu đội ngũ."
};

/* ---------------- HRM7 ---------------- */
REP.HRM7={
 title:"Báo cáo hợp đồng và bảo hiểm",
 sub:"Hạn hợp đồng, NDA và hồ sơ pháp lý; mức độ tham gia và chi phí đóng bảo hiểm.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"06/08/2026",ver:"1.2",
   by:"Đoàn Thu Hà",byRole:"Hành chính nhân sự · PNS",
   chk:"Nguyễn Thị Hạnh",chkRole:"Kế toán thanh toán · PKT",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[
  "Có <b>141/148 nhân sự tham gia bảo hiểm</b>, đạt 95,3%. Bảy trường hợp còn lại là thực tập sinh và cộng tác viên, không thuộc diện tham gia bắt buộc.",
  "Tổng mức đóng 32% trên quỹ lương đóng bảo hiểm 1.618 triệu: công ty 347,9 triệu và người lao động 169,9 triệu.",
  "Trong kỳ báo tăng 2 và báo giảm 2. Hồ sơ báo tăng nộp đúng hạn 100%.",
  "Còn <b>3 hồ sơ chế độ đang xử lý</b>, gồm 1 thai sản và 2 ốm đau. Một hồ sơ đã quá 20 ngày kể từ ngày nộp."],
 actions:[
  ['Hồ sơ thai sản của NV-0356 đã quá 20 ngày chưa có kết quả. Cần liên hệ cơ quan BHXH để tra soát trong tuần này.','t-hi'],
  ['Hai nhân sự onboard 01/07 chưa hoàn thiện sổ bảo hiểm, ảnh hưởng tới hồ sơ báo tăng kỳ 08. Xử lý cùng đầu mục hồ sơ tại HRM6.','t-md'],
  ['Đối chiếu số liệu với cơ quan BHXH trước ngày 25 hằng tháng theo lịch cố định.','t-lo']],
 kpis:[
  {k:"Hợp đồng hết hạn trong 30 ngày",u:"hợp đồng",cur:7,prev:5,tgt:0,dir:-1,p:0,sp:[3,4,6,5,5,7]},
  {k:"Hợp đồng hết hạn trong 60 ngày",u:"hợp đồng",cur:15,prev:12,tgt:0,dir:-1,p:0,sp:[9,10,11,13,12,15]},
  {k:"Hợp đồng đã quá hạn",u:"hợp đồng",cur:2,prev:3,tgt:0,dir:-1,p:0,sp:[6,5,4,4,3,2]},
  {k:"Nhân sự đang thử việc",u:"người",cur:11,prev:9,tgt:12,dir:1,p:0,sp:[7,8,10,9,9,11]},
  {k:"Tỷ lệ đã ký NDA",u:"%",cur:94.6,prev:92.1,tgt:100,dir:1,sp:[86,88,90,91,92,95]},
  {k:"Nhân sự chưa ký NDA",u:"người",cur:8,prev:11,tgt:0,dir:-1,p:0,sp:[18,16,14,13,11,8]},
  {k:"Cảnh báo hợp đồng đang mở",u:"cảnh báo",cur:9,prev:12,tgt:0,dir:-1,p:0,sp:[17,15,14,13,12,9]},

  {k:"Tỷ lệ phủ bảo hiểm",d:"Trên số nhân sự thuộc diện",u:"%",cur:100.0,prev:98.6,tgt:100,dir:1,p:0,sp:[96,97,98,98,99,100]},
  {k:"Số người đang tham gia",u:"người",cur:141,prev:139,tgt:141,dir:1,p:0,sp:[133,135,137,138,139,141]},
  {k:"Quỹ lương đóng bảo hiểm",u:"triệu",cur:1618,prev:1601,tgt:1650,dir:-1,p:0,f:v=>vnd(v),sp:[1542,1563,1578,1590,1601,1618]},
  {k:"Công ty đóng 21,5%",u:"triệu",cur:347.9,prev:344.2,tgt:354.8,dir:-1,sp:[331,336,339,342,344,348]},
  {k:"Người lao động đóng 10,5%",u:"triệu",cur:169.9,prev:168.1,tgt:173.3,dir:-1,sp:[162,164,166,167,168,170]},
  {k:"Hồ sơ báo tăng nộp đúng hạn",u:"%",cur:100.0,prev:100.0,tgt:100,dir:1,p:0,sp:[92,95,100,100,100,100]},
  {k:"Hồ sơ chế độ đang xử lý",u:"hồ sơ",cur:3,prev:2,tgt:0,dir:-1,p:0,sp:[4,3,2,3,2,3]},
  {k:"Chênh lệch đối chiếu cơ quan BH",u:"đồng",cur:0,prev:0,tgt:0,dir:-1,p:0,f:v=>vnd(v),sp:[0,0,0,0,0,0]}],
 charts:[
  {id:"h1",t:"Hợp đồng theo thời hạn còn lại",h:"hợp đồng",span:"g3",
   f:()=>{let e=[["Đã quá hạn",2],["Dưới 30 ngày",7],["30 – 60 ngày",8],["60 – 90 ngày",11],["Trên 90 ngày",96]];
     if(HRon()){const b={"Đã quá hạn":0,"Dưới 30 ngày":0,"30 – 60 ngày":0,"60 – 90 ngày":0,"Trên 90 ngày":0};
       HRx().active().forEach(r=>{const c=r.conLai;if(c===null)return;
         if(c<0)b["Đã quá hạn"]++;else if(c<=30)b["Dưới 30 ngày"]++;else if(c<=60)b["30 – 60 ngày"]++;
         else if(c<=90)b["60 – 90 ngày"]++;else b["Trên 90 ngày"]++});
       e=Object.entries(b)}
     mk("h1","bar",barSet(lab(e),val(e),[C.red,C.gold,C.amber,C.navy2,C.green]),{})}},
  {id:"h2",t:"Tình trạng ký NDA",h:"người",
   f:()=>{let e=[["Đã ký",140],["Chưa ký",8]];
     if(HRon()){const a=HRx().active();e=[["Đã ký",a.filter(r=>r.nda).length],["Chưa ký",a.filter(r=>!r.nda).length]]}
     mk("h2","doughnut",{labels:lab(e),datasets:[{data:val(e),backgroundColor:[C.green,C.red],borderWidth:0,hoverOffset:6}]},
       {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})}},
  {id:"h3",t:"Nhân sự theo tình trạng lao động",h:"người",
   f:()=>{let e=[["Đang làm",137],["Thử việc",11]];
     if(HRon())e=HRx().demTheo(HRx().active(),r=>r.tt||"Không rõ",6);
     mk("h3","bar",barSet(lab(e),val(e),C.navy),{indexAxis:"y",scales:AXH})}},

  {id:"g1",t:"Cơ cấu tỷ lệ đóng bảo hiểm",h:"% lương cơ bản",span:"g2",
   f:()=>mk("g1","bar",{labels:["BHXH","BHYT","BHTN"],datasets:[
     {label:"Công ty đóng",data:[17,3,1.5],backgroundColor:C.navy,borderRadius:1},
     {label:"Người lao động đóng",data:[8,1.5,1],backgroundColor:C.light,borderRadius:1}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{stacked:true,grid:{display:false},border:{color:"rgba(148,163,184,.28)"}},y:{stacked:true,grid:{color:cssv("--grid")},border:{display:false}}}})},
  {id:"g2c",t:"Số người tham gia 12 kỳ",h:"người",
   f:()=>mk("g2c","line",{labels:M12,datasets:[{data:[119,121,124,126,128,131,133,135,137,138,139,141],
     borderColor:C.navy,backgroundColor:"rgba(99,102,241,.14)",fill:true,tension:.3,borderWidth:2,pointRadius:2}]})},
  {id:"g3",t:"Báo tăng và báo giảm theo kỳ",h:"người",span:"g2",
   f:()=>mk("g3","bar",{labels:M12,datasets:[
     {label:"Báo tăng",data:[6,7,6,5,9,7,6,8,7,7,9,2],backgroundColor:C.green,borderRadius:1},
     {label:"Báo giảm",data:[-4,-5,-6,-5,-6,-4,-4,-6,-5,-6,-8,-2],backgroundColor:C.red,borderRadius:1}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{stacked:true,grid:{display:false},border:{color:"rgba(148,163,184,.28)"}},y:{stacked:true,grid:{color:cssv("--grid")},border:{display:false}}}})},
  {id:"g4",t:"Chi phí bảo hiểm theo phòng ban",h:"triệu đồng · công ty đóng",
   f:()=>mk("g4","bar",{labels:DEPTS,datasets:[{data:[142,102,84,76,47,30,24],backgroundColor:C.navy2,borderRadius:1}]},{indexAxis:'y',scales:AXH})}],
 tables:[
  {id:"t7a",t:"Hợp đồng sắp hết hạn và đã quá hạn",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Chức vụ"},{t:"Ngày hết hạn",a:"c"},{t:"Còn lại (ngày)",a:"n"}],
   rows:()=>{if(!HRon())return [["00590","Nguyễn Vũ Minh Tùng","Cung ứng","Nhân viên","30/09/2026","24"]];
     return HRx().hetHanHD(90).slice(0,300).map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,r.cv,dmy(r.hetHan),
       `<span class="pill ${r.conLai<0?'p-b':r.conLai<=30?'p-w':'p-ok'}">${r.conLai}</span>`])}},
  {id:"t7b",t:"Nhân sự chưa ký NDA",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Ngày vào",a:"c"},{t:"Thâm niên (tháng)",a:"n"}],
   rows:()=>{if(!HRon())return [];
     return HRx().active().filter(r=>!r.nda).sort((a,b)=>b.tn-a.tn).slice(0,200)
       .map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,dmy(r.vao),r.tn])}},
  {id:"t7c",t:"Cảnh báo hợp đồng ghi nhận trên hồ sơ",
   cols:[{t:"Mã NV"},{t:"Họ và tên"},{t:"Phòng ban"},{t:"Nội dung cảnh báo"}],
   rows:()=>{if(!HRon())return [];
     return HRx().active().filter(r=>r.canhBao.length).slice(0,200)
       .map(r=>[r.ma,`<b>${r.ten}</b>`,r.phong,r.canhBao.join(' · ')])}},
{id:"t7",t:"Chi tiết tham gia và giải quyết chế độ bảo hiểm",
   cols:[{t:"Mã NV"},{t:"Họ tên"},{t:"Phòng ban"},{t:"Số sổ BH",a:"c"},{t:"Mức lương đóng",a:"n"},{t:"Công ty đóng",a:"n"},{t:"NLĐ đóng",a:"n"},{t:"Ngày hiệu lực",a:"c"},{t:"Nghiệp vụ",a:"c"},{t:"Trạng thái",a:"c"}],
   groups:[{t:"Nhân sự",s:4},{t:"Mức đóng",s:4},{t:"Nghiệp vụ trong kỳ",s:3}],
   rows:[
    ["NV-0501","Nguyễn Hoài Nam","Vận hành","Chưa có","8.800.000","1.892.000","924.000","01/08/2026","Báo tăng",'<span class="pill p-w">Chờ cơ quan BH</span>'],
    ["NV-0502","Trần Bảo Ngọc","Chăm sóc KH","Chưa có","8.000.000","1.720.000","840.000","01/08/2026","Báo tăng",'<span class="pill p-w">Chờ cơ quan BH</span>'],
    ["NV-0322","Ngô Thanh Bình","Vận hành","0124578963","9.600.000","2.064.000","1.008.000","15/07/2026","Báo giảm",'<span class="pill p-ok">Đã duyệt</span>'],
    ["NV-0287","Lý Mai Phương","Chăm sóc KH","0124512378","8.400.000","1.806.000","882.000","20/07/2026","Báo giảm",'<span class="pill p-ok">Đã duyệt</span>'],
    ["NV-0356","Phạm Thu Hương","Chăm sóc KH","0124599871","8.000.000","1.720.000","840.000","01/03/2024","Thai sản",'<span class="pill p-b">Quá 20 ngày</span>'],
    ["NV-0402","Đỗ Minh Khôi","Công nghệ","0124566778","16.000.000","3.440.000","1.680.000","10/09/2024","Ốm đau",'<span class="pill p-w">Đang xử lý</span>'],
    ["NV-0203","Nguyễn Thị Hạnh","Kế toán","0124533445","10.400.000","2.236.000","1.092.000","01/06/2023","Ổn định",'<span class="pill p-ok">Đang tham gia</span>'],
    ["NV-0455","Bùi Quốc Anh","Kinh doanh","0124588990","20.000.000","4.300.000","2.100.000","12/01/2024","Ổn định",'<span class="pill p-ok">Đang tham gia</span>']],
   total:["TỔNG CỘNG","141 người tham gia","—","—",vnd(1618e6),vnd(347.9e6),vnd(169.9e6),"—","2 tăng · 2 giảm","3 hồ sơ chế độ"]}],
 defs:[["Tỷ lệ phủ bảo hiểm","Số người tham gia chia cho số nhân sự thuộc diện tham gia bắt buộc, không tính thực tập sinh và cộng tác viên."],
   ["Mức đóng 32%","Công ty đóng 21,5% gồm BHXH 17%, BHYT 3% và BHTN. Người lao động đóng 10,5% gồm BHXH 8%, BHYT 1,5% và BHTN 1%."],
   ["Báo tăng, báo giảm","Nghiệp vụ khai báo với cơ quan BHXH khi có nhân sự vào hoặc nghỉ việc."],
   ["Quá 20 ngày","Hồ sơ chế độ chưa có kết quả sau 20 ngày kể từ ngày nộp, cần tra soát."]],
 note:"Số liệu đã đối chiếu với thông báo kết quả đóng bảo hiểm của cơ quan BHXH tại ngày 30/07/2026. Không phát sinh chênh lệch."
};

/* ---------------- HRM8 ---------------- */
const ALLOC=[["Ritokey",26],["WGG",19],["A10GG",15],["HQS10000",13],["VX Team",9],["Maverick",7],["Khối BO",11]];
REP.HRM8={
 title:"Báo cáo phân bổ khối lượng công việc và phân bổ lương",
 sub:"Mức tải theo đầu người, cơ cấu thời gian theo nhóm việc và phân bổ chi phí nhân sự về các BU.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"08/08/2026",ver:"1.0",
   by:"Lã Thị Kiều Trang",byRole:"Chuyên viên C&B · PNS",
   chk:"Nguyễn Thanh Dung",chkRole:"Giám đốc Quản trị Hiệu quả",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[
  "Mức tải bình quân của khối BO đạt <b>117% mức chuẩn 176 giờ</b>. Bốn trên bảy nhân sự đang ở trạng thái quá tải.",
  "Nhóm việc Tuyển dụng và Onboarding chiếm 26% tổng thời gian, cao nhất trong sáu nhóm việc.",
  "Phân bổ được <b>89% quỹ lương về các BU</b>, phần giữ lại 11% là chi phí quản trị chung không quy về BU cụ thể.",
  "Ritokey nhận phân bổ lớn nhất với 26% quỹ lương, tương ứng 507,5 triệu đồng."],
 actions:[
  ['Bốn nhân sự quá tải trên 120%, trong đó NV-0311 ở mức 154%. Cần chia lại đầu việc hoặc bổ sung nhân sự trước khi rủi ro nghỉ việc hiện thực hoá.','t-hi'],
  ['Tỷ lệ quá tải 57% của khối BO là đầu vào trực tiếp cho kế hoạch tuyển bổ sung Q3 tại HRM1. Đề nghị BOD duyệt hai vị trí.','t-hi'],
  ['Một nhân sự dưới tải ở mức 73%. Đề nghị rà lại phạm vi công việc và bổ sung đầu việc phù hợp Grade.','t-md']],
 kpis:[
  {k:"Mức tải bình quân",d:"Trên chuẩn 176 giờ mỗi tháng",u:"%",cur:116.9,prev:112.4,tgt:100,dir:-1,sp:[104,107,109,111,112,117]},
  {k:"Số đầu việc bình quân",u:"việc",cur:8.4,prev:7.9,tgt:8.0,dir:-1,sp:[6.8,7.1,7.4,7.7,7.9,8.4]},
  {k:"Tỷ lệ nhân sự quá tải",d:"Trên 120% mức chuẩn",u:"%",cur:57.1,prev:42.9,tgt:10.0,dir:-1,sp:[29,29,43,43,43,57]},
  {k:"Tỷ lệ nhân sự dưới tải",d:"Dưới 70% mức chuẩn",u:"%",cur:14.3,prev:14.3,tgt:0,dir:-1,sp:[29,14,14,14,14,14]},
  {k:"Tỷ lệ quỹ lương phân bổ được về BU",u:"%",cur:89.0,prev:87.0,tgt:85.0,dir:1,p:0,sp:[81,83,85,86,87,89]},
  {k:"Chi phí quản trị chung giữ tại BO",u:"triệu",cur:214.7,prev:251.9,tgt:250.0,dir:-1,sp:[318,299,278,265,252,215]}],
 charts:[
  {id:"w1",t:"Mức tải theo nhân sự",h:"% so mức chuẩn 176 giờ",cls:"tall",span:"g21",
   f:()=>{const nm=["TrangLTK","QuangLM","HạnhNTH","ĐứcTV","HươngPT","YếnVH","KhôiĐM"],ld=[118,141,111,154,99,73,122];
     mk("w1","bar",{labels:nm,datasets:[
       {data:ld,backgroundColor:ld.map(v=>v>120?C.red:v<70?C.amber:v>100?C.navy2:C.green),borderRadius:1},
       {label:"Mức chuẩn",type:"line",data:nm.map(()=>100),borderColor:"#08182C",borderDash:[5,4],borderWidth:1.2,pointRadius:0}]},
       {indexAxis:'y',scales:{x:{max:180,grid:{color:cssv("--grid")},border:{display:false}},y:{grid:{display:false},border:{display:false}}}})}},
  {id:"w2",t:"Cơ cấu thời gian theo nhóm việc",h:"% tổng giờ",cls:"tall",
   f:()=>mk("w2","doughnut",{labels:["Tuyển dụng & Onboarding","Chấm công – C&B","Hồ sơ – BHXH","Đào tạo & Văn hoá","Báo cáo & Dashboard","Hành chính – Vận hành"],
     datasets:[{data:[26,22,17,14,12,9],backgroundColor:PAL,borderWidth:0}]},{cutout:"55%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})},
  {id:"w3",t:"Tỷ lệ phân bổ quỹ lương về BU",h:"% quỹ lương kỳ",span:"g2",
   f:()=>mk("w3","bar",{labels:ALLOC.map(x=>x[0]),datasets:[{data:ALLOC.map(x=>x[1]),backgroundColor:C.navy,borderRadius:1}]})},
  {id:"w4",t:"Chi phí nhân sự phân bổ theo BU",h:"triệu đồng · P1 và P2",
   f:()=>mk("w4","bar",{labels:ALLOC.map(x=>x[0]),datasets:[
     {label:"P1 cố định",data:ALLOC.map(x=>+(1952*x[1]/100*0.8).toFixed(0)),backgroundColor:C.navy,borderRadius:1},
     {label:"P2 biến động",data:ALLOC.map(x=>+(1952*x[1]/100*0.2).toFixed(0)),backgroundColor:C.navy2,borderRadius:1}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{stacked:true,grid:{display:false},border:{color:"rgba(148,163,184,.28)"}},y:{stacked:true,grid:{color:cssv("--grid")},border:{display:false}}}})}],
 tables:[
  {id:"t8a",t:"Ma trận khối lượng công việc theo nhân sự",
   cols:[{t:"Mã NV"},{t:"Họ tên"},{t:"Phòng ban"},{t:"Grade",a:"c"},{t:"Nhóm việc chính"},{t:"Số đầu việc",a:"n"},{t:"Giờ/tháng",a:"n"},{t:"Mức tải",a:"n"},{t:"Biểu diễn",a:"c"},{t:"BU thụ hưởng"},{t:"Đánh giá",a:"c"}],
   groups:[{t:"Nhân sự",s:5},{t:"Khối lượng",s:5},{t:"Phân bổ",s:2}],
   rows:[
    ["NV-0142","Lã Thị Kiều Trang","Nhân sự","G4.1","Chấm công – C&B","6","109","118%",miniBar(18,60,true),"Khối BO 100%",'<span class="pill p-b">Quá tải</span>'],
    ["NV-0087","Lương Minh Quang","Nhân sự","G3.2","Tuyển dụng & Onboarding","9","130","141%",miniBar(41,60,true),"Khối BO 60% · Ritokey 40%",'<span class="pill p-b">Quá tải</span>'],
    ["NV-0203","Nguyễn Thị Hạnh","Kế toán","G3.1","Thanh toán – Đối soát","7","102","111%",miniBar(11,60,true),"Khối BO 100%",'<span class="pill p-w">Sát trần</span>'],
    ["NV-0311","Trần Văn Đức","Vận hành","G2.2","Xử lý đơn – Kho số","12","142","154%",miniBar(54,60,true),"Ritokey 70% · WGG 30%",'<span class="pill p-b">Quá tải</span>'],
    ["NV-0356","Phạm Thu Hương","Chăm sóc KH","G2.1","CSKH quốc tế","8","91","99%",miniBar(1,60),"WGG 100%",'<span class="pill p-ok">Cân bằng</span>'],
    ["NV-0418","Vũ Hải Yến","Marketing","G3.1","Content & Truyền thông","5","67","73%",miniBar(27,60),"VX Team 100%",'<span class="pill p-w">Dưới tải</span>'],
    ["NV-0402","Đỗ Minh Khôi","Công nghệ","G4.2","Dashboard – Tự động hoá","12","112","122%",miniBar(22,60,true),"Khối BO 50% · A10GG 50%",'<span class="pill p-b">Quá tải</span>']],
   total:["TỔNG CỘNG","7 nhân sự","—","—","6 nhóm việc","59","753","117%","—","—","4 quá tải · 1 dưới tải"]},
  {id:"t8b",t:"Bảng phân bổ chi phí lương về các BU",
   cols:[{t:"BU"},{t:"% phân bổ",a:"n"},{t:"Tổng phân bổ",a:"n"},{t:"Trong đó P1",a:"n"},{t:"Trong đó P2",a:"n"},{t:"Quy đổi nhân sự",a:"c"},{t:"Mã hạch toán MISA",a:"c"}],
   rows:ALLOC.map(([bu,p],i)=>{const amt=1952e6*p/100;
     return [bu,p+"%",vnd(amt),vnd(amt*0.8),vnd(amt*0.2),Math.round(148*p/100)+" người","6421-"+(i+1)]}),
   total:["TỔNG CỘNG","100%",vnd(1952e6),vnd(1561.6e6),vnd(390.4e6),"148 người","—"]}],
 defs:[["Mức tải","Số giờ làm thực tế chia cho mức chuẩn 176 giờ mỗi tháng."],
   ["Quá tải","Mức tải trên 120%. Đây là ngưỡng cảnh báo rủi ro nghỉ việc và sai sót nghiệp vụ."],
   ["Dưới tải","Mức tải dưới 70%, cần rà lại phạm vi công việc."],
   ["Phân bổ về BU","Tỷ lệ thời gian nhân sự dành cho từng BU, dùng làm cơ sở phân bổ chi phí lương trên hệ thống MISA."]],
 note:"Nhóm quá tải trên 120% là đầu vào trực tiếp cho kế hoạch tuyển bổ sung tại HRM1 và cho việc chia lại đầu việc trong SOP phân công công việc."
};




/* ---- Cầu nối dữ liệu nhân sự thật ---- */
const HRon=()=>!!(window.HQLive&&HQLive.HR&&HQLive.HR.has());
const HRx=()=>HQLive.HR;
/* ---- Cầu nối dữ liệu tuyển dụng thật (HRM1) ---- */
const TDx =()=>HQLive.TD;
const TDon=()=>!!(window.HQLive&&HQLive.TD&&HQLive.TD.has());
const DXon=()=>!!(window.HQLive&&HQLive.TD&&HQLive.TD.coDX());
const SLAon=()=>!!(window.HQLive&&HQLive.TD&&HQLive.TD.coSLA());
const lab=e=>e.map(x=>x[0]), val=e=>e.map(x=>x[1]);
const tr=v=>dec(v/1e6,1);
function barSet(labels,data,color,extra){return{labels,datasets:[Object.assign({data,backgroundColor:color||C.navy,borderRadius:2,maxBarThickness:34},extra||{})]}}

/* ============================================================
   E. RENDER
   ============================================================ */
/* Màu số theo bản chất chỉ số, đúng quy ước BC-PKT (lib/format.js · toneOf):
   chỉ số càng thấp càng tốt = khoản "xấu" → đỏ; tỷ lệ càng cao càng tốt → xanh;
   còn lại để trắng. Có thể ghi đè bằng trường tone của KPI. */
/* Chênh lệch tuyệt đối so với kỳ trước — dùng cho thẻ Headcount, nơi
   "tăng 2 người" dễ đọc hơn "tăng 1,4%". */
function deltaTuyetDoi(k){
  const d=(+k.cur||0)-(+k.prev||0);
  const cls=d===0?"fl":((k.dir===-1?d<0:d>0)?"up":"dn");
  return `<span class="dpill ${cls}">${d>0?"↑":d<0?"↓":"–"} ${dec(Math.abs(d),k.p??1)} ${k.u||""}</span>`;
}
function heroCard(k){
  const tone=k.tone||(k.dir===-1?"loss":(k.u==="%"?"gain":""));
  const cls=["kpi",tone?"is-"+tone:"",k.click?"is-click":""].filter(Boolean).join(" ");
  /* Thẻ bấm được vẫn phải dùng được bằng bàn phím */
  const act=k.click?` role="button" tabindex="0" onclick="${k.click}"`
    +` onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${k.click}}"`:"";
  const dl=(k.showDelta&&k.prev!=null)?`<div class="kdelta">${deltaTuyetDoi(k)}</div>`:"";
  return `<div class="${cls}"${act}>
    <span class="code">${(k.u||"chỉ số").toUpperCase()}</span>
    <div class="lb">${k.k}</div>
    <div class="val">${k.f?k.f(k.cur):dec(k.cur,k.p??1)}<small>${k.u}</small></div>
    ${dl}</div>`;
}
/* Dải thẻ chỉ số. Có khai báo kgroups thì tách thành từng nhóm có tiêu đề,
   mỗi nhóm là lưới 4 cột (2 cột ở tablet, 1 cột ở điện thoại).
   Không khai báo thì giữ nguyên dải phẳng như các báo cáo còn lại. */
function kpiStrip(K,groups){
  if(!groups||!groups.length) return `<div class="hero kstrip">${K.map(k=>heroCard(k)).join('')}</div>`;
  const daXep=new Set();
  let html=groups.map(g=>{
    const ds=g.ks.map(t=>K.find(x=>x.k===t)).filter(Boolean);
    if(!ds.length) return '';
    ds.forEach(x=>daXep.add(x.k));
    return `<div class="kgroup">
      <div class="kgtitle"><b>${g.t}</b>${g.d?`<span>${g.d}</span>`:''}</div>
      <div class="kgrid">${ds.map(k=>heroCard(k)).join('')}</div></div>`;
  }).join('');
  /* Chỉ số mới thêm mà chưa kịp xếp nhóm vẫn phải hiện, không được rơi mất */
  const con=K.filter(k=>!daXep.has(k.k));
  if(con.length) html+=`<div class="kgroup"><div class="kgtitle"><b>Chỉ số khác</b></div>
    <div class="kgrid">${con.map(k=>heroCard(k)).join('')}</div></div>`;
  return `<div class="kstrip">${html}</div>`;
}

/* ---------------- Modal danh sách quản lý quá tải (Task 4) ----------------
   Ngưỡng lấy đúng theo mô tả chỉ số trong HRM6: trên 10 nhân sự trực tiếp. */
const NGUONG_QL=10;
const escHtml=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function dsQuanLyQuaTai(){
  if(HRon()) return HRx().spanQL().filter(([,n])=>n>NGUONG_QL).sort((a,b)=>b[1]-a[1]);
  /* Chưa nối nguồn thì hiện số mẫu, khớp với giá trị mẫu của thẻ KPI */
  return [["Nguyễn Thị Vân Anh · Vận hành",14],["Trần Quốc Hưng · Kinh doanh",12]];
}
function openOverloadModal(){
  const m=document.getElementById('mdl-overload'); if(!m) return;
  const ds=dsQuanLyQuaTai(), live=HRon();
  const sub=document.getElementById('mdl-overload-sub');
  if(sub) sub.textContent=`Trên ${NGUONG_QL} nhân sự trực tiếp${live?'':' · số mẫu, chưa nối nguồn'}`;
  document.getElementById('mdl-overload-body').innerHTML = ds.length
    ? `<div class="tw"><table id="tbl-overload"><thead><tr>
         <th class="idx">#</th><th>Quản lý trực tiếp</th>
         <th class="n">Nhân sự trực tiếp</th><th class="n">Vượt ngưỡng</th></tr></thead>
       <tbody>${ds.map(([ten,n],i)=>`<tr><td class="idx">${i+1}</td><td>${escHtml(ten)}</td>
         <td class="n"><b>${n}</b></td><td class="n">+${n-NGUONG_QL}</td></tr>`).join('')}</tbody></table></div>`
    : `<p class="mdl-empty">Không có quản lý nào phụ trách quá ${NGUONG_QL} nhân sự trực tiếp.</p>`;
  m.hidden=false;
  document.body.classList.add('mdl-open');
  const x=document.getElementById('mdl-overload-x'); if(x) x.focus();
}
function closeOverloadModal(){
  const m=document.getElementById('mdl-overload'); if(!m||m.hidden) return;
  m.hidden=true;
  document.body.classList.remove('mdl-open');
}
/* Gắn sự kiện đóng: nút ✕, nút Đóng, nền mờ và phím Esc */
document.addEventListener('DOMContentLoaded',()=>{
  ['mdl-overload-x','mdl-overload-ok','mdl-overload-bd'].forEach(id=>{
    const n=document.getElementById(id); if(n) n.addEventListener('click',closeOverloadModal);
  });
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOverloadModal()});

function filterRow(){
  return `<div class="mrow noprint">
    <div class="fld"><label>Từ ngày</label><input type="date" id="d-from" value="${RANGE.from}" onchange="setRange()"></div>
    <div class="fld"><label>Đến ngày</label><input type="date" id="d-to" value="${RANGE.to}" onchange="setRange()"></div>
    <div class="fld"><label>Tháng</label><select id="f-thang" onchange="setThang(this.value)">
      <option value="">— Cả kỳ —</option>
      ${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${RANGE.thang===i+1?'selected':''}>Tháng ${i+1}</option>`).join('')}
    </select></div>
    <div class="fld"><label>Tuần</label><select id="f-tuan" onchange="setTuan(this.value)">
      <option value="">— Chọn —</option>
      ${Array.from({length:5},(_,i)=>`<option value="${i+1}" ${RANGE.tuan===i+1?'selected':''}>Tuần ${i+1}</option>`).join('')}
    </select></div>
    <button class="btn mrefresh" onclick="reloadLive()">${SVG.refresh}Làm mới</button>
  </div>
  <div class="livestat noprint">${liveStat()}</div>`;
}
function liveStat(){
  if(!window.HQLive) return `<i class="ldot off"></i>Dữ liệu mẫu — chưa nối nguồn`;
  const st=HQLive.status();
  if(!st.oke) return `<i class="ldot off"></i>Dữ liệu mẫu — chưa nối nguồn`;
  const at=Object.values(HQLive.meta).filter(x=>x.ok).map(x=>x.at).sort().pop();
  const p=(CFG.ui&&CFG.ui.tuTaiLai)||0;
  return `<i class="ldot"></i>Cập nhật ${at} · LIVE${p>0?` · Tự làm mới ${p} phút`:''}`;
}
function mast(m,r){
  const st=STATE[m.id], sl=STLABEL[st];
  return `<div class="mast">
    <div class="bar">
      <div class="mtt">
        <div class="eyebrow">${m.code} · Chu kỳ ${r.meta.cycle} · Chốt số ${r.meta.close}</div>
        <h1>${r.title}</h1>
        <div class="scoperow">
          <span class="scopepill">Phạm vi: <b>${fmtd(RANGE.from)} → ${fmtd(RANGE.to)}</b></span>
        </div>
      </div>
      <div class="mside">
        <div class="mrow">
          <div class="chip ${st}"><i></i>${sl[0]} · ${sl[1]}</div>
          <button class="btn g noprint" onclick="window.print()">${SVG.down}Xuất PDF</button>
        </div>
        ${filterRow()}
      </div>
    </div>
    </div>`;
}

/* Dòng ghi đã nghỉ nhưng bỏ trống Ngày nghỉ việc thì không xếp được vào
   tháng nào, nên bị loại khỏi Headcount. Nói rõ ra để HR bổ sung, chứ im
   lặng bớt người khỏi số liệu thì còn khó hiểu hơn con số sai. */
function canhBaoThieuNgayNghi(m){
  if(!m.src||!m.src.includes('DM_NhanSu')||!HRon()) return '';
  const H=HRx(), out=[];
  const ten=ds=>ds.slice(0,3).map(x=>escHtml(x.ten||x.ma||'(chưa có tên)')).join(', ')
    +(ds.length>3?` và ${ds.length-3} người nữa`:'');
  const a=H.thieuNgayNghi?H.thieuNgayNghi():[];
  if(a.length) out.push(`<div class="dqwarn">
    <b>${a.length} hồ sơ ghi đã nghỉ nhưng bỏ trống ô "Ngày nghỉ việc"</b>
    <span>Không xác định được nghỉ tháng nào nên không tính vào Headcount và không vào được
      biểu đồ biến động: ${ten(a)}. Bổ sung ngày trên Google Sheet để tỷ lệ nghỉ về đúng.</span></div>`);
  const c=H.ngayVaoTuongLai?H.ngayVaoTuongLai(RANGE&&RANGE.to?new Date(RANGE.to):null):[];
  if(c.length) out.push(`<div class="dqwarn err">
    <b>${c.length} hồ sơ có "Ngày nhận việc" nằm ở tương lai — nhiều khả năng gõ nhầm năm</b>
    <span>Không tính vào Headcount cho tới ngày đó: ${c.map(x=>escHtml(x.ten||x.ma)
      +' ('+(x.vao?x.vao.toLocaleDateString('vi-VN'):'')+')').slice(0,3).join(', ')}${c.length>3?` và ${c.length-3} hồ sơ nữa`:''}.</span></div>`);
  const b=H.thieuNgayVao?H.thieuNgayVao():[];
  if(b.length) out.push(`<div class="dqwarn">
    <b>${b.length} hồ sơ đang làm nhưng bỏ trống ô "Ngày nhận việc"</b>
    <span>Vẫn được tính vào Headcount theo cột Tình trạng, nhưng không xếp được vào tháng nào
      trên biểu đồ biến động: ${ten(b)}.</span></div>`);
  return out.join('');
}
/* Bảng đối chiếu: dẫn từ con số lọc tay trên sheet sang con số của báo cáo,
   để nhìn phát ra ngay lệch ở đâu thay vì phải dò từng dòng. */
function bangDoiChieu(m){
  if(!m.src||!m.src.includes('DM_NhanSu')||!HRon()||!HRx().doiChieuHeadcount) return '';
  const d=HRx().doiChieuHeadcount(RANGE&&RANGE.to?new Date(RANGE.to):null);
  const dong=(nhan,so,cls)=>`<tr class="${cls||''}"><td>${nhan}</td><td class="n">${so}</td></tr>`;
  const buoc=[
    dong(`Lọc tay trên sheet — cột "Tình trạng" là đang làm việc`,d.loc,'tot'),
    d.truDaNghi ?dong('– Trừ: đã điền Ngày nghỉ việc trước ngày chốt',`−${d.truDaNghi}`):'',
    d.truChuaVao?dong('– Trừ: Ngày nhận việc sau ngày chốt',`−${d.truChuaVao}`):'',
    d.congChuaNghi?dong('– Cộng: ghi đã nghỉ nhưng ngày nghỉ ở tương lai',`+${d.congChuaNghi}`):'',
    dong('<b>Headcount cuối kỳ trên báo cáo</b>',`<b>${d.headcount}</b>`,'tot')
  ].join('');
  const tt=d.theoTT.map(([k,v])=>dong(escHtml(k),v)).join('');
  return panelT('Đối chiếu Headcount với sheet',
    `${d.tongDong} dòng dữ liệu · ngày chốt ${fmtd(RANGE.to)}`,
    `<div class="tw"><table id="tbl-doichieu">
       <thead><tr><th>Diễn giải</th><th class="n">Số người</th></tr></thead>
       <tbody>${buoc}
         <tr class="grp"><td colspan="2">Số dòng theo từng giá trị cột "Tình trạng"</td></tr>
         ${tt}</tbody></table></div>`,
    tools('tbl-doichieu'));
}
function renderReport(m){
  const r=REP[m.id];
  const K=(window.HQLive?HQLive.apply(m.id,r.kpis):r.kpis);
  let ch="",group=[],span="g3";
  r.charts.forEach(c=>{
    if(c.span){ if(group.length){ch+=`<div class="grid ${span}">${group.join('')}</div>`;group=[]} span=c.span }
    group.push(panel(c.t,c.h,`<div class="chartbox ${c.cls||''}"><canvas id="${c.id}"></canvas></div>`));
    if(group.length===(span==="g3"?3:2)){ch+=`<div class="grid ${span}">${group.join('')}</div>`;group=[]}
  });
  if(group.length)ch+=`<div class="grid ${span}">${group.join('')}</div>`;
  let tb=r.tables.map(t=>{
    const rw=typeof t.rows==='function'?(t.rows()||[]):t.rows;
    const tt=typeof t.total==='function'?t.total(rw):t.total;
    return panelT(t.t,`${rw.length} dòng dữ liệu`,dataTable(t.id,t.cols,rw,tt,t.groups),tools(t.id),tfoot(rw.length));
  }).join('<div style="height:16px"></div>');
  if(window.HQLive){
    m.src.filter(k=>HQLive.has(k)).forEach(k=>{
      const id="live-"+k, n=HQLive.rows(k).length;
      tb+='<div style="height:16px"></div>'+panelT(
        `Dữ liệu nguồn trực tiếp · ${SOURCES[k].n}`,
        `${n} dòng đọc từ Google Sheet lúc ${HQLive.meta[k].at}`,
        HQLive.sheetTable(k,id), tools(id), tfoot(Math.min(n,300)));
    });
  }

  const hasSum=r.summary&&r.summary.length, hasAct=r.actions&&r.actions.length;
  const parts=[];
  parts.push(["Phân tích","Diễn giải bằng biểu đồ",ch]);
  if(hasSum||hasAct){
    const boxes=(hasSum?`<div class="exbox"><h4>Nhận định chính</h4><ol>${r.summary.map(s=>`<li>${s}</li>`).join('')}</ol></div>`:'')+
      (hasAct?`<div class="exbox act"><h4>Việc cần quyết</h4><ol>${r.actions.map(([a,t])=>`<li>${a}<span class="tagr ${t}">${t==='t-hi'?'ƯU TIÊN CAO':t==='t-md'?'TRUNG BÌNH':'THEO DÕI'}</span></li>`).join('')}</ol></div>`:'');
    parts.push(["Tóm tắt điều hành","Nhận định và việc cần quyết trong kỳ",
      `<div class="exec"${hasSum&&hasAct?'':' style="grid-template-columns:1fr"'}>${boxes}</div>`]);
  }
  parts.push(["Bảng chỉ số chính","So sánh kỳ trước · mục tiêu · xu hướng 6 kỳ",
    panelT("Toàn bộ chỉ số theo dõi","đánh giá theo mục tiêu kỳ",scorecard("sc-"+m.id,K),tools("sc-"+m.id))]);
  const dc=bangDoiChieu(m);
  parts.push(["Dữ liệu chi tiết","Bảng gốc phục vụ đối chiếu",
    dc?dc+'<div style="height:16px"></div>'+tb:tb]);
  parts.push(["Định nghĩa chỉ số","",defsBox(r.defs)+`<div class="note">${r.note}</div>`]);
  return mast(m,r)+
  `<div class="wrap">${canhBaoThieuNgayNghi(m)}${kpiStrip(K,r.kgroups)}</div>
   <div class="wrap">${parts.map((p,i)=>sec(i+1,p[0],p[1],p[2])).join('')}</div>`;
}

/* ---- Trang tổng hợp ---- */
function renderHome(){
  const rows=MODULES.slice(1).map(x=>{
    const r=REP[x.id],st=STATE[x.id],sl=STLABEL[st];
    const linked=x.src.filter(s=>SOURCES[s].url).length;
    const hi=r.actions.filter(a=>a[1]==='t-hi').length;
    const i=MODULES.indexOf(x)-1, t=TILE[i%TILE.length];
    return [`<span style="display:inline-flex;align-items:center;gap:9px"><span style="width:28px;height:28px;border-radius:9px;background:${t};color:#fff;display:inline-grid;place-items:center;font-size:9.5px;font-weight:800">${x.code.replace('HRM','')}</span><b>${x.code}</b></span>`,
      r.title,r.meta.cycle,r.meta.by,r.meta.issue,`v${r.meta.ver}`,
      progCell(linked/x.src.length*100,linked===x.src.length?"#10B981":"#F59E0B"),
      hi?`<span class="pill p-b">${hi} việc gấp</span>`:'<span class="pill p-ok">Không</span>',
      `<span class="pill ${st==='ok'?'p-ok':st==='wait'?'p-w':'p-n'}">${sl[0]}</span>`,
      `<button class="tbtn" onclick="go('${x.id}')">Mở</button>`]});
  const K=[
    {k:"Tổng nhân sự",u:"người",cur:148,prev:148,tgt:150,dir:1,p:0,sp:[141,144,146,147,148,148]},
    {k:"Turnover luỹ kế năm",u:"%",cur:9.8,prev:8.4,tgt:15,dir:-1,sp:[2.1,4,5.6,7,8.4,9.8]},
    {k:"Quỹ lương kỳ",u:"triệu",cur:1952,prev:1938,tgt:2000,dir:-1,p:0,f:v=>vnd(v),sp:[1861,1890,1904,1921,1938,1952]},
    {k:"Time-to-Hire",u:"ngày",cur:26,prev:28,tgt:30,dir:-1,p:0,sp:[33,31,30,29,28,26]},
    {k:"Tuân thủ chấm công",u:"%",cur:97,prev:96,tgt:95,dir:1,p:0,sp:[94,95,95,96,96,97]},
    {k:"Chi phí nhân sự trên doanh thu",u:"%",cur:18.4,prev:18.9,tgt:20,dir:-1,sp:[20.1,19.7,19.4,19.1,18.9,18.4]},
    {k:"Chi vận hành văn phòng luỹ kế",u:"%",cur:67.9,prev:58.2,tgt:58.3,dir:-1,sp:[19.4,29.1,38.6,48.5,58.2,67.9]},
    {k:"Tỷ lệ phủ bảo hiểm",u:"%",cur:100,prev:98.6,tgt:100,dir:1,p:0,sp:[96,97,98,98,99,100]},
    {k:"Tỷ lệ hồ sơ đầy đủ",u:"%",cur:92.6,prev:90.5,tgt:100,dir:1,sp:[84,86,88,89,91,93]},
    {k:"Tỷ lệ nhân sự quá tải",u:"%",cur:57.1,prev:42.9,tgt:10,dir:-1,sp:[29,29,43,43,43,57]}];
  const linkedAll=Object.values(SOURCES).filter(s=>s.url).length;
  const nHi=MODULES.slice(1).flatMap(x=>(REP[x.id].actions||[]).filter(a=>a[1]==='t-hi')).length;
  const byRep=MODULES.slice(1).filter(x=>canRead(x.id)).map(x=>{
    const r=REP[x.id];
    const kk=window.HQLive?HQLive.apply(x.id,r.kpis):r.kpis;
    const chs=r.charts.slice(0,2).map(c=>panel(c.t,c.h,`<div class="chartbox ${c.cls||''}"><canvas id="${c.id}"></canvas></div>`)).join('');
    return `<div class="rephead"><h3>${x.code} · ${r.title}</h3>
      <span class="hint">${kk.length} chỉ số · chu kỳ ${r.meta.cycle}</span>
      <div class="tools"><button class="tbtn" onclick="go('${x.id}')">Mở báo cáo →</button></div></div>
    <div class="hero">${kk.slice(0,4).map((k,i)=>heroCard(k,i)).join('')}</div>
    <div class="grid g2">${chs}</div>`;
  }).join('');
  return `
  <div class="mast">
    <div class="bar">
      <div class="mtt">
        <div class="eyebrow">Báo cáo tổng hợp · HRM1 → HRM8</div>
        <h1>Báo cáo tổng hợp nhân sự</h1>
        <div class="scoperow">
          <span class="scopepill">Phạm vi: <b>${fmtd(RANGE.from)} → ${fmtd(RANGE.to)}</b></span>
        </div>
      </div>
      <div class="mside">
        <div class="mrow">
          <button class="btn g noprint" onclick="window.print()">${SVG.down}Xuất báo cáo</button>
          <button class="btn g noprint adminonly" onclick="openDrawer()">${SVG.plug}Gắn nguồn dữ liệu</button>
        </div>
        ${filterRow()}
      </div>
    </div>
  </div>
  <div class="wrap">
    ${sec(1,"Chỉ số trọng yếu","Rút từ tám mã báo cáo",
      `<div class="hero">${K.slice(0,4).map((k,i)=>heroCard(k,i)).join('')}</div>
       <div class="grid g21">
        ${panel("Quỹ lương và nhân sự 12 kỳ","triệu đồng · người",`<div class="chartbox tall"><canvas id="z1"></canvas></div>`)}
        ${panel("Cơ cấu nhân sự theo BU","người",`<div class="chartbox tall"><canvas id="z2"></canvas></div>`)}
       </div>
       <div class="grid g2">
        ${panel("Phân bổ quỹ lương theo BU","% quỹ lương kỳ",rankList([
          ["Ritokey","507,5 tr",100],["WGG","370,9 tr",73],["A10GG","292,8 tr",58],
          ["HQS10000","253,8 tr",50],["Khối BO","214,7 tr",42],["VX Team","175,7 tr",35],["Maverick","136,6 tr",27]]))}
        ${panel("Mức tải nhân sự khối BO","% so chuẩn 176 giờ",rankList([
          ["Trần Văn Đức","154%",100],["Lương Minh Quang","141%",92],["Đỗ Minh Khôi","122%",79],
          ["Lã Thị Kiều Trang","118%",77],["Nguyễn Thị Hạnh","111%",72],["Phạm Thu Hương","99%",64],["Vũ Hải Yến","73%",47]]))}
       </div>
       ${panelT("Bảng chỉ số hợp nhất","10 chỉ số trọng yếu",scorecard("sc-home",K),tools("sc-home"))}`)}
    ${sec(2,"Số liệu theo từng mã báo cáo","Chỉ số nổi bật và biểu đồ chính của HRM1 → HRM8",byRep)}
    ${sec(3,"Trạng thái phát hành tám mã báo cáo","",
      panelT("Danh mục báo cáo định kỳ Phòng Nhân sự","",dataTable("t-home",
        [{t:"Mã"},{t:"Tên báo cáo"},{t:"Chu kỳ",a:"c"},{t:"Người lập"},{t:"Phát hành",a:"c"},{t:"Bản",a:"c"},{t:"Nguồn dữ liệu"},{t:"Việc gấp",a:"c"},{t:"Trạng thái",a:"c"},{t:"",a:"c"}],rows,
        ["TỔNG CỘNG","8 báo cáo","—","4 người lập","—","—","—",`${nHi} việc gấp`,"2 duyệt · 3 chờ · 3 nháp","—"],
        [{t:"Định danh báo cáo",s:4},{t:"Phát hành",s:4},{t:"Theo dõi",s:3}]),tools("t-home"),tfoot(8)))}
    ${sec(4,"Việc ưu tiên cao cần theo dõi trong kỳ","Tổng hợp mục 1 của từng báo cáo — Phòng Nhân sự theo dõi và đôn đốc",
      `<div class="exec" style="grid-template-columns:1fr"><div class="exbox act"><h4>Danh mục ưu tiên cao</h4><ol>
        ${MODULES.slice(1).flatMap(x=>REP[x.id].actions.filter(a=>a[1]==='t-hi').map(a=>`<li><b>${x.code}</b> — ${a[0]}</li>`)).join('')}
      </ol></div></div>`)}
  </div>`;
}
function homeCharts(){
  mk("z1","bar",{labels:M12,datasets:[
    {label:"Quỹ lương (triệu)",data:[1712,1748,1760,1755,1802,1836,1861,1890,1904,1921,1938,1952],backgroundColor:C.navy,borderRadius:2,maxBarThickness:26},
    {label:"Nhân sự",type:"line",data:[128,131,134,133,136,139,141,144,146,147,148,148],borderColor:C.gold,borderWidth:2.6,pointRadius:3,pointBackgroundColor:C.gold,tension:.38,yAxisID:"y1"}]},
    {plugins:{legend:{display:true,position:"bottom"}},scales:{x:AX.x,y:AX.y,y1:{position:"right",min:100,max:170,grid:{display:false},border:{display:false}}}});
  mk("z2","doughnut",{labels:BUS,datasets:[{data:[38,27,22,19,14,11,17],backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
    {cutout:"54%",plugins:{legend:{display:true,position:"bottom"}},scales:{}});
}

/* ---- Trang Nguồn & Cấu hình (hệ thống) ---- */
function renderSys(){
  const st=window.HQLive?HQLive.status():{oke:0,khai:0,meta:{}};
  const p=(CFG.ui&&CFG.ui.tuTaiLai)||0;
  const files=new Set(Object.values(SOURCES).filter(s=>s.url).map(s=>(s.url.match(/\/d\/e\/([^/]+)/)||[])[1]||s.url)).size;
  const lastAt=(window.HQLive&&Object.values(HQLive.meta).filter(x=>x.ok).map(x=>x.at).sort().pop())||"—";
  const card=(label,val,sub)=>`<div class="hcard"><div class="k" style="text-transform:uppercase;letter-spacing:.07em;font-size:9.5px;font-family:'IBM Plex Mono',monospace">${label}</div><div class="row"><span class="v" style="font-size:20px">${val}</span></div><div class="k">${sub||""}</div></div>`;
  const method=(AUTH&&AUTH.method)||"—";
  const srcRows=Object.entries(SOURCES).map(([k,s],i)=>{
    const m=window.HQLive?HQLive.meta[k]:null;
    const gid=(s.url.match(/[?&]gid=(\d+)/)||[])[1]||"—";
    const stt=!s.url?'<span class="pill p-n">Chưa khai</span>'
      :(m?(m.dangTai?'<span class="pill p-w">Đang đọc…</span>'
           :m.ok?`<span class="pill p-ok">${m.via||'Trực tiếp Google'}</span>`:'<span class="pill p-b">Đọc lỗi</span>')
         :'<span class="pill p-w">Chưa đọc</span>');
    const note=!s.url?'—'
      :(m?(m.dangTai?'đang gọi…':m.ok?`đọc lúc ${m.at}`:`<span style="color:var(--rose)">${(m.err||'').slice(0,120)}</span>`)
         :'bấm ↻ Làm mới để đọc lại');
    return `<tr><td class="idx">${i+1}</td><td><b>${s.n}</b><div style="font-size:10.5px;color:var(--tx3)">${s.l} · ${s.m}</div></td><td class="mono" style="font-size:10.5px">${gid}</td><td>${stt}</td><td style="text-align:right;font-weight:700">${m&&m.ok?m.n:'—'}</td><td>${note}</td></tr>`;
  }).join('');
  return `<div class="mast"><div class="bar">
    <div class="mtt">
      <div class="eyebrow">Hệ thống · Quản trị</div>
      <h1>Nguồn &amp; Cấu hình</h1>
      <p>Đọc trực tiếp Google Sheet (publish CSV) — mọi cấu hình nằm tại assets/config.js.</p>
      <div class="scoperow"><span class="scopepill">Admin cứng: <b>${AUTHC.admins.join(' · ')}</b></span></div>
    </div>
    <div class="sp"></div>
    <div class="mside">
      <div class="mrow noprint">
        <button class="btn g adminonly" onclick="openDrawer()">${SVG.plug}Gắn nguồn dữ liệu</button>
        <button class="btn" onclick="reloadLive()">${SVG.refresh}Làm mới</button>
      </div>
      <div class="livestat noprint">${liveStat()}</div>
    </div>
  </div></div>
  <div class="wrap">
    <div class="hero kstrip">
      ${card("Nguồn dữ liệu",`${st.oke}/${NSRC}`,`${NSRC} tab · ${files} file Google Sheet`)}
      ${card("Cách đọc","Trực tiếp Google","publish CSV · /api/csv là dự phòng")}
      ${card("Tài khoản",`<span id="sys-acc-v">${AUTH?AUTH.email.split('@')[0]:"—"}</span>`,`<span id="sys-acc-s">${AUTH?`${roleLabel()} · ${method}`:""}</span>`)}
      ${card("Tự làm mới",p>0?`${p} phút`:"Tắt",`lần cuối ${lastAt}`)}
    </div>
    ${AUTH&&AUTH.method!=="Google"?`<div class="warnnote">Bạn đang đăng nhập bằng <b>mật khẩu nội bộ</b> (không có token Google). Hãy <b>đăng nhập lại bằng Google</b> để định danh thật khi quản lý tài khoản.</div>`:''}
    ${panel("Quản lý đăng nhập &amp; phân quyền",`Admin cứng: ${AUTHC.admins.join(' · ')}`,
      `<div style="font-size:12.5px;line-height:1.7">
        <p><b>Phiên hiện tại:</b> ${AUTH?`${AUTH.email} · ${roleLabel()} · đăng nhập bằng ${method}`:'—'}</p>
        <div id="qlbox" style="margin-top:10px">Đang tải danh sách tài khoản…</div>
      </div>`)}
    <div style="height:16px"></div>
    ${panelT("Chẩn đoán nguồn dữ liệu",`${st.oke}/${NSRC} tab đọc được`,
      `<div class="tw"><table id="t-sys"><thead><tr><th class="idx">#</th><th>Tab</th><th>gid</th><th>Nguồn đọc được</th><th style="text-align:right">Số dòng</th><th>Ghi chú / lỗi</th></tr></thead><tbody>${srcRows}</tbody></table></div>`,
      tools("t-sys"))}
    <p style="margin-top:12px;font-size:11px;color:var(--tx3)">Luồng dữ liệu: Google Sheet → Publish CSV → Dashboard${p>0?` (${p} phút/lần)`:''} · "Chưa khai" = tab chưa có link trong config.js · "Trực tiếp lỗi" = tab chưa Publish to web hoặc link sai.</p>
  </div>`;
}

/* ---- Quản lý tài khoản qua KV (giống PVH) ---- */
const ROLES=[["nhanvien","Nhân viên"],["leader","Leader (vận hành)"],["admin","Admin"]];
const ROLE_DEF={nhanvien:[],leader:"*",admin:"*"};
function rsumText(row){
  if(row.querySelector('[data-all]').checked)return"Tất cả báo cáo";
  const sel=[...row.querySelectorAll('[data-r]')].filter(c=>c.checked).map(c=>c.dataset.r.replace('HRM','HRM'));
  return sel.length?sel.join(', '):"— Chọn báo cáo —";
}
function updRsum(row){const s=row.querySelector('.rsum');if(s)s.textContent=rsumText(row)}
function toggleRbox(btn){
  const box=btn.closest('.rbox');
  document.querySelectorAll('.rbox.open').forEach(b=>{if(b!==box)b.classList.remove('open')});
  box.classList.toggle('open');
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.rbox'))document.querySelectorAll('.rbox.open').forEach(b=>b.classList.remove('open'));
});
function rpAll(btn,on){const row=btn.closest('.grantrow');
  row.querySelector('[data-all]').checked=false;
  row.querySelectorAll('[data-r]').forEach(c=>c.checked=on);
  if(on)row.querySelector('[data-all]').checked=true;
  updRsum(row)}
function rpDef(btn){const row=btn.closest('.grantrow');
  const q=ROLE_DEF[row.querySelector('.gsel').value]||[];
  row.querySelector('[data-all]').checked=q==="*";
  row.querySelectorAll('[data-r]').forEach(c=>c.checked=Array.isArray(q)&&q.includes(c.dataset.r));
  updRsum(row)}
function rowCtl(email,cur){
  const all=cur&&cur.quyen==="*";
  const items=MODULES.slice(1).map(m=>`<label class="ritem"><input type="checkbox" data-r="${m.id}" onchange="updRsum(this.closest('.grantrow'))" ${!all&&cur&&Array.isArray(cur.quyen)&&cur.quyen.includes(m.id)?'checked':''}><b>${m.code}</b><span>${m.title}</span></label>`).join('');
  const sum=all?"Tất cả báo cáo":(cur&&Array.isArray(cur.quyen)&&cur.quyen.length?cur.quyen.join(', '):"Mặc định theo vai trò");
  const roles=isAdmin()?ROLES:ROLES.filter(r=>r[0]!=='admin');
  return `<div class="grantrow" data-email="${email}">
    <select class="gsel">${roles.map(([v,l])=>`<option value="${v}" ${cur&&cur.vaiTro===v?'selected':''}>${l}</option>`).join('')}</select>
    <div class="rbox">
      <button type="button" class="rboxbtn" onclick="toggleRbox(this)"><span class="rsum">${sum}</span><i>▾</i></button>
      <div class="rpanel">
        <div class="rpbtns">
          <button type="button" class="tbtn" onclick="rpAll(this,true)">Chọn tất cả</button>
          <button type="button" class="tbtn" onclick="rpAll(this,false)">Bỏ chọn</button>
          <button type="button" class="tbtn" onclick="rpDef(this)">Mặc định vai trò</button>
        </div>
        <label class="ritem"><input type="checkbox" data-all onchange="updRsum(this.closest('.grantrow'))" ${all?'checked':''}><b>ALL</b><span>Tất cả báo cáo</span></label>
        ${items}
      </div>
    </div>
  </div>`;
}
function cfgQuyenTable(){
  const rows=Object.entries(AUTHC.acc).map(([em,ls])=>`<tr><td>${em}</td><td>${ls==="*"?"Tất cả báo cáo":(Array.isArray(ls)?ls.join(' · '):String(ls))}</td></tr>`).join('');
  return `<div class="tw" style="max-height:220px;margin-top:8px"><table id="t-quyen"><thead><tr><th>Email</th><th>Được đọc</th></tr></thead><tbody>
    ${rows||`<tr><td colspan="2" style="color:var(--tx2)">Chưa cấp quyền cho ai — hiện chỉ Admin cứng đăng nhập được.</td></tr>`}
  </tbody></table></div>`;
}
function qlHTML(d){
  const pend=Object.entries(d.pending||{});
  const acc=Object.entries(d.accounts||{});
  const av=em=>`<span class="accav">${em.slice(0,2).toUpperCase()}</span>`;
  const pendHtml=pend.length?pend.map(([em,x])=>`<div class="accitem pend">
      <div class="acchead">${av(em)}<div class="accid"><b>${em}</b><span class="hint2">đang chờ duyệt${x.ten?` · ${x.ten}`:''}${x.phuongThuc?` · ${x.phuongThuc}`:''}${x.luc?` · ${new Date(x.luc).toLocaleString('vi-VN')}`:''}</span></div>
        ${rowCtl(em,null)}
        <div class="tools"><button class="btn gsmall" onclick="grantAcc('${em}')">✓ Cấp quyền</button><button class="tbtn trej" onclick="revokeAcc('${em}')">Bỏ qua</button></div></div>
    </div>`).join(''):`<p style="color:var(--tx2);margin-top:6px">Không có yêu cầu nào đang chờ.</p>`;
  const adminRows=AUTHC.admins.map(em=>`<div class="accitem">
      <div class="acchead">${av(em)}<div class="accid"><b>${em}</b><span class="hint2">admin cứng — không thể thu hồi</span></div>
        <span class="pill p-w" style="font-weight:800">Admin</span>
        <span class="hint2" style="margin-left:10px">Tất cả báo cáo + Cấu hình</span></div>
    </div>`).join('');
  const accHtml=acc.map(([em,x])=>{
    const locked=!isAdmin()&&x.vaiTro==='admin';
    return `<div class="accitem">
      <div class="acchead">${av(em)}<div class="accid"><b>${em}</b><span class="hint2">${x.ten||''} · ${(ROLES.find(r=>r[0]===x.vaiTro)||["","Nhân viên"])[1]}</span></div>
        ${locked?`<span class="pill p-w" style="font-weight:800">Admin</span><span class="hint2" style="margin-left:10px">chỉ Admin sửa được</span>`
          :`${rowCtl(em,x)}
        <div class="tools"><button class="btn gsmall" onclick="grantAcc('${em}')">Lưu</button><button class="tbtn trej" onclick="revokeAcc('${em}')">Thu hồi</button></div>`}</div>
    </div>`}).join('');
  return `<div class="qlsec amber"><b>Chờ cấp quyền</b><span class="hint2" style="margin-left:auto">${pend.length} email đăng nhập lần đầu</span></div>${pendHtml}
    <div class="qlsec green" style="margin-top:14px"><b>Tài khoản đã cấp quyền</b><span class="hint2" style="margin-left:auto">${acc.length+AUTHC.admins.length} tài khoản</span></div>${adminRows}${accHtml}
    <p class="hint2" style="margin-top:10px"><b>Cách dùng:</b> chọn vai trò, mở ô báo cáo để tick đúng báo cáo được xem (hoặc ALL = xem hết), rồi bấm Lưu / Cấp quyền.</p>`;
}
async function loadSys(){
  /* Đang tải nguồn thì tự vẽ lại để bảng chẩn đoán cập nhật theo */
  if(window.HQLive&&HQLive.status().dangTai)setTimeout(()=>{if(current==='SYS')go('SYS')},1500);
  const box=document.getElementById('qlbox'); if(!box)return;
  if(!AUTH||AUTH.method!=="Google"||!AUTH.cred){
    box.innerHTML=`<div class="warnnote">Phiên đăng nhập hết hạn hoặc bạn đăng nhập bằng mật khẩu (không có token Google). Hãy <b>đăng nhập lại bằng Google</b> để quản lý tài khoản.</div>`;
    return;
  }
  const d=await apiAuth({action:'list',credential:AUTH.cred});
  if(!d||d.kvOff||d.loi){
    box.innerHTML=`<div class="warnnote">${d&&d.loi?d.loi:'Chưa nối kho lưu phân quyền (Upstash KV) — vào Vercel → Storage → Connect Project cho <b>bc-pns</b>. Tạm thời dùng danh sách tĩnh tại <span class="mono">auth.taiKhoan</span> trong config.js:'}</div>`+cfgQuyenTable();
    return;
  }
  box.innerHTML=qlHTML(d);
  const nA=Object.keys(d.accounts||{}).length+AUTHC.admins.length, nP=Object.keys(d.pending||{}).length;
  const v=document.getElementById('sys-acc-v'), s=document.getElementById('sys-acc-s');
  if(v)v.textContent=`${nA} tài khoản`;
  if(s)s.innerHTML=nP?`<span style="color:var(--amber)">● ${nP} chờ cấp quyền</span>`:"không có yêu cầu chờ";
}
function readCtl(email){
  const row=document.querySelector(`.grantrow[data-email="${email}"]`); if(!row)return null;
  const vaiTro=row.querySelector('.gsel').value;
  const all=row.querySelector('[data-all]').checked;
  const quyen=all?"*":[...row.querySelectorAll('[data-r]')].filter(c=>c.checked).map(c=>c.dataset.r);
  return {vaiTro,quyen};
}
async function grantAcc(email){
  const c=readCtl(email); if(!c)return;
  if(c.quyen!=="*"&&!c.quyen.length){
    const d0=ROLE_DEF[c.vaiTro];
    if(d0==="*")c.quyen="*";
    else{toast("Chọn ít nhất một báo cáo hoặc tick ALL");return}
  }
  const d=await apiAuth({action:'grant',credential:AUTH.cred,email,vaiTro:c.vaiTro,quyen:c.quyen});
  if(!d||d.loi){toast(d&&d.loi?d.loi:"Không lưu được — kiểm tra kết nối KV");return}
  toast(`Đã cấp quyền cho ${email}`);
  const box=document.getElementById('qlbox'); if(box)box.innerHTML=qlHTML(d);
}
async function revokeAcc(email){
  const d=await apiAuth({action:'revoke',credential:AUTH.cred,email});
  if(!d||d.loi){toast(d&&d.loi?d.loi:"Không lưu được — kiểm tra kết nối KV");return}
  toast(`Đã thu hồi / từ chối ${email}`);
  const box=document.getElementById('qlbox'); if(box)box.innerHTML=qlHTML(d);
}

/* ---- Tìm trong bảng ---- */
function runSearch(){
  const el=document.getElementById('q'); if(!el)return;
  const q=el.value.trim().toLowerCase();
  document.querySelectorAll('.tw tbody tr').forEach(tr=>{
    if(tr.classList.contains('tot'))return;
    tr.style.display = (!q || tr.innerText.toLowerCase().includes(q)) ? "" : "none";
  });
}

/* ---- Nav ---- */
const TIERS=[
  {t:"Tầng 1 · Điều hành (CEO · tháng)",ids:["HRM6","HRM3","HRM8"]},
  {t:"Tầng 2 · Quản trị chi phí & tuyển (tháng)",ids:["HRM1","HRM4","HRM5"]},
  {t:"Tầng 3 · Vận hành (tuần)",ids:["HRM2","HRM7"]}
];
function navBtn(m){
  const st=m.id==="HOME"?"":STATE[m.id];
  const b=el(`<button class="${current===m.id?'on':''}">
    <span class="code">${m.id==="HOME"?"◆":m.code}</span>
    <span class="st ${st==='ok'?'done':st==='draft'?'draft':st==='wait'?'wait':''}"></span>
    <span>${m.title}</span></button>`);
  b.onclick=()=>{go(m.id);closeRail()};return b;
}
function buildNav(){
  const w=document.getElementById('navwrap');w.innerHTML='';
  const rsec=t=>el(`<div class="railsec">${t}</div>`), nv=()=>el('<div class="nav"></div>');
  w.appendChild(rsec("Tổng hợp"));
  const n0=nv();n0.appendChild(navBtn(MODULES[0]));w.appendChild(n0);
  TIERS.forEach(tr=>{
    const ids=tr.ids.filter(id=>canRead(id));
    if(!ids.length)return;
    w.appendChild(rsec(tr.t));
    const g=nv();
    ids.forEach(id=>g.appendChild(navBtn(MODULES.find(m=>m.id===id))));
    w.appendChild(g);
  });
  if(canManage()){
    w.appendChild(rsec("Hệ thống"));
    const gs=nv();
    const bs=el(`<button class="${current==='SYS'?'on':''}"><span class="code">·</span><span class="st done"></span><span>Nguồn &amp; Cấu hình</span></button>`);
    bs.onclick=()=>{go('SYS');closeRail()};gs.appendChild(bs);w.appendChild(gs);
  }
}
function go(id){
  if(id==="SYS"&&!canManage()){toast("Trang hệ thống chỉ dành cho Admin và Leader");return}
  if(id!=="HOME"&&id!=="SYS"&&!canRead(id)){toast("Bạn chưa được cấp quyền đọc báo cáo này — liên hệ Quản trị cấp cao");return}
  current=id;kill();
  const v=document.getElementById('view');
  if(id==="SYS"){v.innerHTML=renderSys();loadSys();buildNav();runSearch();window.scrollTo(0,0);return}
  const m=MODULES.find(x=>x.id===id);
  v.innerHTML = id==="HOME"?renderHome():renderReport(m);
  if(id==="HOME"){homeCharts();MODULES.slice(1).forEach(x=>REP[x.id].charts.slice(0,2).forEach(c=>c.f()))}
  else (REP[m.id].charts||[]).forEach(c=>c.f());
  buildNav();runSearch();window.scrollTo(0,0);
}

/* ---- Drawer ---- */
function openDrawer(){
  if(!isAdmin()){toast("Chỉ Quản trị cấp cao nhất được gắn / sửa nguồn dữ liệu");return}
  document.getElementById('srclist').innerHTML=Object.entries(SOURCES).map(([k,s])=>{
    const m=(window.HQLive&&HQLive.meta[k])||null;
    const daDoc=!!(window.HQLive&&HQLive.has(k));
    /* Nguồn đọc hỏng thì nói thẳng lý do ở đây — trước đây chỉ báo "xem
       Console" nên không ai biết link sai chỗ nào. */
    const pill = daDoc ? `<span class="pill p-ok">Đã đọc ${HQLive.rows(k).length} dòng</span>`
      : (m&&m.ok===false) ? `<span class="pill p-e">Đọc hỏng</span>`
      : (s.url ? `<span class="pill p-w">Đã khai báo</span>` : `<span class="pill p-n">Chưa nối</span>`);
    const loi = (m&&m.ok===false&&m.err) ? `<div class="srcerr">${escHtml(m.err)}</div>` : '';
    return `<div class="srcrow"><div class="t"><b>${s.l}</b>${pill}
      <span class="mods">${s.n} · ${s.m}</span></div>
      <input type="text" data-k="${k}" value="${escHtml(s.url)}" placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv">
      ${loi}<div class="cols"><b>Cột bắt buộc:</b> ${s.c}</div></div>`;
  }).join('');
  document.getElementById('drawer').classList.add('on');document.getElementById('scrim').classList.add('on');
}
function closeDrawer(){document.getElementById('drawer').classList.remove('on');document.getElementById('scrim').classList.remove('on')}

/* ---- Theme ---- */
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  document.getElementById('btn-theme').innerHTML = t==='dark'?SVG.sun:SVG.moon;
  applyChartTheme(); kill(); go(current);
}
document.getElementById('btn-theme').onclick=()=>
  setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark');
/* ---- Menu trượt trên điện thoại ---- */
const railEl=document.getElementById('rail'), railBd=document.getElementById('railbd');
function openRail(){railEl.classList.add('open');railBd.classList.add('on')}
function closeRail(){railEl.classList.remove('open');railBd.classList.remove('on')}
document.getElementById('btn-menu').onclick=()=>railEl.classList.contains('open')?closeRail():openRail();
railBd.onclick=closeRail;

document.getElementById('btn-close').onclick=closeDrawer;
document.getElementById('btn-logout').onclick=logout;
document.getElementById('scrim').onclick=closeDrawer;
document.getElementById('btn-save').onclick=async()=>{
  /* Ghi vào CFG.sheets — chính là chỗ HQLive đọc khi tải — rồi lưu lại và
     đọc lại dữ liệu ngay, thay vì chỉ đổi SOURCES rồi vẽ lại giao diện. */
  const luu={};
  document.querySelectorAll('#srclist input').forEach(i=>{
    const k=i.dataset.k, u=i.value.trim();
    if(!SOURCES[k]) return;
    SOURCES[k].url=u;
    CFG.sheets[k]=u;
    if(u!==String(NGUON_GOC[k]||"").trim()) luu[k]=u;
  });
  luuNguon(luu);
  closeDrawer();
  toast(`Đã lưu ${Object.values(SOURCES).filter(s=>s.url).length}/${NSRC} liên kết · đang đọc lại…`);
  await reloadLive();
};
function setThang(v){
  const y=new Date().getFullYear();
  if(!v){RANGE={from:iso(new Date(y,0,1)),to:iso(new Date()),thang:null,tuan:null}}
  else{const m=parseInt(v,10);RANGE={from:iso(new Date(y,m-1,1)),to:iso(new Date(y,m,0)),thang:m,tuan:null}}
  go(current);toast("Đã áp phạm vi ngày")}
function setTuan(v){
  const y=new Date().getFullYear();
  const m=RANGE.thang||new Date().getMonth()+1;
  if(!v){setThang(RANGE.thang||"");return}
  const w=parseInt(v,10), last=new Date(y,m,0).getDate();
  const d1=Math.min((w-1)*7+1,last), d2=Math.min(w*7,last);
  RANGE={from:iso(new Date(y,m-1,d1)),to:iso(new Date(y,m-1,d2)),thang:m,tuan:w};
  go(current);toast("Đã áp phạm vi ngày")}
function setRange(){
  const f=document.getElementById('d-from').value,t=document.getElementById('d-to').value;
  if(f)RANGE.from=f; if(t)RANGE.to=t; RANGE.thang=null;RANGE.tuan=null;
  go(current);toast("Đã áp phạm vi ngày")}
async function reloadLive(){
  if(!window.HQLive){toast("Chưa nạp được module dữ liệu trực tiếp");return}
  const st=HQLive.status();
  if(!st.khai){openDrawer();toast("Chưa khai nguồn — dán link Google Sheet để chạy số thật");return}
  toast(`Đang đọc ${st.khai} nguồn dữ liệu…`);
  const r=await HQLive.loadAll();
  go(current);buildNav();
  toast(r.failed
    ? `Đã nối ${r.loaded}/${st.khai} nguồn · ${r.failed} nguồn lỗi, xem Console`
    : `Đã nối ${r.loaded}/${st.khai} nguồn dữ liệu`);
}

/* ---- Đăng nhập theo email công ty ---- */
function showLogin(){
  const old=document.getElementById('authwall'); if(old)old.remove();
  const org=(CFG.brand&&CFG.brand.org)||"HQ Group";
  const gg=AUTHC.gcid?`<div class="gbtn" id="gbtn"></div>
    <div class="adiv">hoặc mật khẩu nội bộ</div>`:'';
  document.body.appendChild(el(`<div class="authwall" id="authwall"><div class="authcard">
    <div class="alogo">HQ<i>group</i></div>
    <h2>${org}</h2>
    <p>Đăng nhập nội bộ · HQ Group</p>
    ${gg}
    <input type="text" id="au-mail" placeholder="Email" autocomplete="off"
      onkeydown="if(event.key==='Enter')doLogin()">
    <input type="password" id="au-pass" placeholder="Mật khẩu" autocomplete="off"
      onkeydown="if(event.key==='Enter')doLogin()">
    <button class="btn" onclick="doLogin()">Đăng nhập</button>
    <div class="err" id="au-err"></div>
    <p class="ahint">Liên hệ Admin <b>${AUTHC.admins[0]}</b> để được cấp quyền truy cập.</p>
  </div></div>`));
  mountGoogleBtn();
  document.getElementById('au-mail').focus();
}
function mountGoogleBtn(){
  if(!AUTHC.gcid)return;
  const c=document.getElementById('gbtn'); if(!c)return;
  let tries=0;
  (function tick(){
    if(window.google&&google.accounts&&google.accounts.id){
      google.accounts.id.initialize({client_id:AUTHC.gcid,callback:onGoogleCred,auto_select:true,cancel_on_tap_outside:false});
      google.accounts.id.renderButton(c,{theme:"filled_blue",size:"large",width:300,text:"signin_with",locale:"vi"});
      google.accounts.id.prompt();
    }else if(tries++<60)setTimeout(tick,150);
  })();
}
function jwtPayload(t){
  try{
    const b=t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    return JSON.parse(decodeURIComponent(atob(b).split('').map(c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')));
  }catch(e){return null}
}
async function onGoogleCred(resp){
  const err=document.getElementById('au-err');
  const p=jwtPayload(resp&&resp.credential||'');
  if(!p||!p.email){err.textContent="Không đọc được tài khoản Google. Thử lại.";return}
  const v=p.email.toLowerCase();
  if(!p.email_verified){err.textContent="Tài khoản Google chưa xác minh email.";return}
  err.textContent="Đang kiểm tra quyền truy cập…";
  const d=await apiAuth({action:'login',credential:resp.credential});
  if(!d||d.kvOff){
    const g=grantOf(v);
    if(!g){err.textContent="Tài khoản chưa được cấp quyền truy cập.";return}
    AUTH={email:v,role:g,quyen:g==='admin'?'*':AUTHC.acc[v],name:p.name||v.split('@')[0],method:"Google",cred:resp.credential};
  }else if(d.ok){
    AUTH={email:v,role:d.vaiTro==='admin'?'admin':'viewer',vaiTro:d.vaiTro,quyen:d.quyen,name:p.name||v.split('@')[0],method:"Google",cred:resp.credential};
  }else if(d.pending){
    err.textContent="Tài khoản đang chờ Admin phê duyệt — sẽ vào được ngay khi được cấp quyền.";return}
  else{err.textContent=d.loi||"Không đăng nhập được — thử lại.";return}
  document.getElementById('authwall').remove();
  initApp();
}
async function doLogin(){
  const v=document.getElementById('au-mail').value.trim().toLowerCase();
  const err=document.getElementById('au-err');
  if(!/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(v)){err.textContent="Email không hợp lệ.";return}
  if(!AUTHC.pass){err.textContent="Đăng nhập tay đang tắt — dùng nút Đăng nhập với Google.";return}
  const pw=(document.getElementById('au-pass')||{}).value||'';
  if(pw!==AUTHC.pass){err.textContent="Mật khẩu không đúng. Liên hệ Admin.";return}
  err.textContent="Đang kiểm tra quyền truy cập…";
  const d=await apiAuth({action:'login',email:v});
  if(!d||d.kvOff){
    const g=grantOf(v);
    if(!g){err.textContent="Tài khoản chưa được cấp quyền truy cập.";return}
    AUTH={email:v,role:g,quyen:g==='admin'?'*':AUTHC.acc[v],method:"Mật khẩu nội bộ"};
  }else if(d.ok){
    AUTH={email:v,role:d.vaiTro==='admin'?'admin':'viewer',vaiTro:d.vaiTro,quyen:d.quyen,method:"Mật khẩu nội bộ"};
  }else if(d.pending){
    err.textContent="Tài khoản đang chờ Admin phê duyệt — sẽ vào được ngay khi được cấp quyền.";return}
  else{err.textContent=d.loi||"Không đăng nhập được — thử lại.";return}
  document.getElementById('authwall').remove();
  initApp();
}
function logout(){location.reload()}
function applyAuthUI(){
  document.body.classList.toggle('viewer',!isAdmin());
  const w=document.querySelector('.who');
  if(w&&AUTH){
    const name=AUTH.name||AUTH.email.split('@')[0];
    w.querySelector('.av').textContent=name.slice(0,1).toUpperCase();
    w.querySelector('b').textContent=name;
    w.querySelector('span').textContent=roleLabel();
  }
}
function initApp(){
  applyAuthUI();
  buildNav();go("HOME");
  bootLive();
}

/* ---- Khởi động ---- */
const mode=(CFG.ui&&CFG.ui.themeMacDinh)||"auto";
const prefersDark = mode==="dark" || (mode==="auto" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
document.documentElement.setAttribute('data-theme', prefersDark?'dark':'light');
document.getElementById('btn-theme').innerHTML = prefersDark?SVG.sun:SVG.moon;
applyChartTheme();
if(CFG.brand){
  const w=document.querySelector('.who');
  if(w){ w.querySelector('.av').textContent=(CFG.brand.user||"Q").slice(0,1).toUpperCase();
         w.querySelector('b').textContent=CFG.brand.user||"";
         w.querySelector('span').textContent=CFG.brand.userRole||""; }
  const b=document.querySelector('.brand');
  if(b){ b.querySelector('b').textContent=CFG.brand.org||"HQ Group";
         b.querySelector('span').textContent=CFG.brand.tagline||""; }
}
showLogin();

/* ---- Nạp dữ liệu thật từ Google Sheet ---- */
async function bootLive(){
  if(!window.HQLive) return;
  const st=HQLive.status();
  if(!st.khai) return;
  toast(`Đang đọc ${st.khai} nguồn dữ liệu…`);
  const r=await HQLive.loadAll();
  go(current);
  buildNav();
  toast(r.failed
    ? `Đã nối ${r.loaded}/${st.khai} nguồn · ${r.failed} nguồn lỗi, xem Console`
    : `Đã nối ${r.loaded}/${st.khai} nguồn dữ liệu`);
  const p=(CFG.ui&&CFG.ui.tuTaiLai)||0;
  if(p>0) setInterval(async()=>{ await HQLive.loadAll(); go(current); }, p*60000);
}
