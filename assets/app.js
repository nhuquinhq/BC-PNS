/* ============================================================
   A. NGUỒN DỮ LIỆU
   ============================================================ */
const SOURCES={
 DM_NhanSu:{n:"DM_NhanSu",l:"Danh mục nhân sự (master)",m:"HRM2,3,6,7,8",url:"",c:"Mã NV · Họ tên · Giới tính · Ngày sinh · Phòng ban · BU · Chức danh · Grade · Loại hợp đồng · Ngày vào · Trạng thái"},
 DM_PhongBan:{n:"DM_PhongBan_BU",l:"Danh mục Phòng ban ↔ BU",m:"Tất cả",url:"",c:"Mã phòng · Tên phòng · BU · Khối · Trưởng phòng"},
 DM_Grade:{n:"DM_Grade",l:"Khung Grade G1–G7",m:"HRM3,6,8",url:"",c:"Grade · Track (IC/MGMT) · Min · Mid · Max"},
 RAW_TuyenDung:{n:"RAW_TuyenDung",l:"Pipeline tuyển dụng",m:"HRM1",url:"",c:"Mã JD · Vị trí · Phòng ban · BU · Grade · Nguồn CV · Ứng viên · Vòng hiện tại · Ngày mở · Ngày nhận việc · Kết quả"},
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
Object.entries(CFG.sheets||{}).forEach(([k,u])=>{ if(SOURCES[k]) SOURCES[k].url=(u||"").trim(); });
const NSRC=Object.keys(SOURCES).length;
let current="HOME";
const AUTHC={
  domain:((CFG.auth&&CFG.auth.mienChoPhep)||"hqplay.vn").toLowerCase(),
  admins:((CFG.auth&&CFG.auth.quanTriCapCao)||["quynhhtn@hqplay.vn"]).map(e=>e.toLowerCase())
};
let AUTH=null;
const isAdmin=()=>!!AUTH&&AUTH.role==='admin';
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const fmtd=s=>s.split('-').reverse().join('/');
let RANGE={from:iso(new Date(new Date().getFullYear(),0,1)),to:iso(new Date()),q:'ca'};

/* ============================================================
   B. TIỆN ÍCH
   ============================================================ */
const vnd=n=>new Intl.NumberFormat('vi-VN').format(Math.round(n));
const dec=(n,d=1)=>n.toFixed(d).replace('.',',');
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
const TILE=["#38BDF8","#818CF8","#10B981","#F59E0B","#F5487F","#22D3EE","#FF7A45","#3B82F6"];

const C={navy:"#38BDF8",navy2:"#818CF8",steel:"#94A3B8",red:"#F43F5E",amber:"#F59E0B",green:"#10B981",light:"#7DD3FC",cream:"#C7D2FE",gold:"#FF7A45"};
const PAL=[C.navy,C.navy2,C.green,C.amber,C.gold,C.red,C.light,C.cream];
function cssv(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}
let AX={},AXH={};
function applyChartTheme(){
  const g=cssv('--grid'), t=cssv('--tx3');
  Chart.defaults.font.family="'Plus Jakarta Sans',system-ui,sans-serif";
  Chart.defaults.font.size=11; Chart.defaults.color=t;
  Chart.defaults.maintainAspectRatio=false;
  Chart.defaults.plugins.legend.labels.boxWidth=8;
  Chart.defaults.plugins.legend.labels.boxHeight=8;
  Chart.defaults.plugins.legend.labels.usePointStyle=true;
  Chart.defaults.plugins.legend.labels.padding=13;
  Chart.defaults.plugins.tooltip.backgroundColor="#1E2436";
  Chart.defaults.plugins.tooltip.padding=11;
  Chart.defaults.plugins.tooltip.cornerRadius=10;
  Chart.defaults.plugins.tooltip.titleFont={weight:'700'};
  AX={x:{grid:{display:false},border:{display:false}},y:{grid:{color:g},border:{display:false},beginAtZero:true}};
  AXH={x:{grid:{color:g},border:{display:false},beginAtZero:true},y:{grid:{display:false},border:{display:false}}};
}
applyChartTheme();
function mk(id,type,data,opts={}){
  const cv=document.getElementById(id); if(!cv)return;
  if(data.datasets)data.datasets.forEach(d=>{if(type==='bar'&&d.type!=='line'&&d.borderRadius===1)d.borderRadius=6});
  charts.push(new Chart(cv,{type,data,options:Object.assign({plugins:{legend:{display:false}},scales:AX},opts)}));
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
function signBlock(m){return `<div class="sign">
  <div><div class="r">Người lập</div><div class="n">${m.by}</div><div class="d">${m.byRole}</div></div>
  <div><div class="r">Người kiểm soát</div><div class="n">${m.chk}</div><div class="d">${m.chkRole}</div></div>
  <div><div class="r">Người duyệt</div><div class="n">${m.apv}</div><div class="d">${m.apvRole}</div></div></div>`}
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
 {id:"HRM1",code:"HRM1",title:"Báo cáo tuyển dụng",src:["RAW_TuyenDung","DM_PhongBan"]},
 {id:"HRM2",code:"HRM2",title:"Chấm công & Phép",src:["RAW_ChamCong_T1","RAW_ChamCong_T2","RAW_ChamCong_T3","RAW_ChamCong_T4","RAW_ChamCong_T5","RAW_ChamCong_T6","RAW_Phep","DM_NhanSu"]},
 {id:"HRM3",code:"HRM3",title:"Payroll & C&B",src:["RAW_Luong","DM_NhanSu","DM_Grade"]},
 {id:"HRM4",code:"HRM4",title:"Chi phí vận hành VP",src:["RAW_ChiPhiVP"]},
 {id:"HRM5",code:"HRM5",title:"Chi phí truyền thông NB",src:["RAW_ChiPhiTT"]},
 {id:"HRM6",code:"HRM6",title:"Tình hình nhân sự",src:["DM_NhanSu","RAW_Onboard","RAW_Offboard","RAW_HoSo"]},
 {id:"HRM7",code:"HRM7",title:"Báo cáo BHXH",src:["RAW_BHXH","DM_NhanSu"]},
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
REP.HRM1={
 title:"Báo cáo tuyển dụng",
 sub:"Nhu cầu tuyển, hiệu quả phễu ứng viên, tốc độ tuyển và chất lượng nguồn theo kỳ.",
 meta:{cycle:"Tháng",close:"31/07/2026",issue:"05/08/2026",ver:"2.1",
   by:"Lương Minh Quang",byRole:"Chuyên viên Tuyển dụng · PNS",
   chk:"Lã Thị Kiều Trang",chkRole:"Chuyên viên C&B · PNS",
   apv:"Hoàng Thị Như Quỳnh",apvRole:"Quản trị Khối BO"},
 summary:[], actions:[],
 kpis:[
  {k:"Time-to-Hire",d:"Từ ngày duyệt JD tới ngày nhận việc",u:"ngày",cur:26,prev:28,tgt:30,dir:-1,p:0,sp:[33,31,30,29,28,26]},
  {k:"Tỷ lệ hoàn thành kế hoạch tuyển",d:"Số tuyển được / kế hoạch kỳ",u:"%",cur:85.7,prev:78.6,tgt:100,dir:1,sp:[71,75,79,82,79,86]},
  {k:"Tỷ lệ nhận offer",d:"Offer được chấp nhận / offer gửi",u:"%",cur:84.2,prev:81.0,tgt:80,dir:1,sp:[76,78,80,81,81,84]},
  {k:"Tỷ trọng nguồn giới thiệu nội bộ",u:"%",cur:32.0,prev:29.0,tgt:30,dir:1,sp:[22,24,26,28,29,32]},
  {k:"Tỷ lệ nghỉ trong thử việc",d:"Trong 90 ngày đầu",u:"%",cur:8.0,prev:11.0,tgt:10,dir:-1,sp:[15,14,12,12,11,8]},
  {k:"Chi phí cho một tuyển dụng thành công",u:"triệu",cur:4.2,prev:4.8,tgt:5.0,dir:-1,sp:[6.1,5.7,5.4,5.0,4.8,4.2]},
  {k:"Số CV trên một vị trí",u:"CV",cur:45,prev:38,tgt:30,dir:1,p:0,sp:[26,29,33,36,38,45]},
  {k:"Tỷ lệ qua vòng sàng lọc",u:"%",cur:44.7,prev:41.0,tgt:40,dir:1,sp:[35,37,39,40,41,45]}],
 charts:[
  {id:"a1",t:"Phễu tuyển dụng 7 bước",h:"số ứng viên · kỳ 07/2026",cls:"tall",span:"g21",
   f:()=>mk("a1","bar",{labels:["CV nhận","Sàng lọc đạt","PV vòng 1","PV vòng 2","Gửi offer","Nhận việc","Qua thử việc"],
     datasets:[{data:[318,142,71,38,19,14,12],backgroundColor:[C.light,C.steel,C.navy2,C.navy2,C.navy,C.navy,C.green],borderRadius:1}]},
     {indexAxis:'y',scales:AXH})},
  {id:"a2",t:"Cơ cấu nguồn ứng viên",h:"% tổng CV",cls:"tall",
   f:()=>mk("a2","doughnut",{labels:["Referral nội bộ","Website HQ","LinkedIn","Facebook Careers","Headhunt"],
     datasets:[{data:[32,26,16,14,12],backgroundColor:PAL,borderWidth:0}]},{cutout:"58%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})},
  {id:"a3",t:"Time-to-Hire so mục tiêu",h:"ngày · 12 kỳ",span:"g2",
   f:()=>mk("a3","line",{labels:M12,datasets:[
     {label:"Thực tế",data:[41,38,36,35,33,31,30,29,28,27,26,26],borderColor:C.navy,backgroundColor:"rgba(99,102,241,.14)",fill:true,tension:.3,borderWidth:2,pointRadius:2},
     {label:"Mục tiêu 30 ngày",data:M12.map(()=>30),borderColor:C.red,borderDash:[5,4],borderWidth:1.2,pointRadius:0}]},
     {plugins:{legend:{display:true,position:"bottom"}}})},
  {id:"a4",t:"Kế hoạch so thực tuyển theo phòng ban",h:"người",
   f:()=>mk("a4","bar",{labels:DEPTS,datasets:[
     {label:"Kế hoạch",data:[5,4,3,2,1,1,1],backgroundColor:C.light,borderRadius:1},
     {label:"Thực tuyển",data:[4,4,2,1,1,0,0],backgroundColor:C.navy,borderRadius:1}]},{plugins:{legend:{display:true,position:"bottom"}}})}],
 tables:[{id:"t1",t:"Chi tiết pipeline theo vị trí đang mở và đã đóng",
   cols:[{t:"Mã JD"},{t:"Vị trí"},{t:"Phòng ban"},{t:"BU"},{t:"Grade",a:"c"},{t:"Ngày mở",a:"c"},{t:"Số ngày mở",a:"n"},{t:"CV",a:"n"},{t:"PV1",a:"n"},{t:"PV2",a:"n"},{t:"Offer",a:"n"},{t:"Vòng hiện tại",a:"c"},{t:"Trạng thái",a:"c"},{t:"Phụ trách"}],
   groups:[{t:"Định danh vị trí",s:7},{t:"Số liệu phễu",s:5},{t:"Theo dõi",s:3}],
   rows:[
    ["JD-26-041","Chuyên viên Vận hành đơn","Vận hành","Ritokey","G3","12/06","52","24","6","3","1","PV2",'<span class="pill p-w">Đang tuyển</span>',"QuangLM"],
    ["JD-26-042","Nhân viên CSKH quốc tế","Chăm sóc KH","WGG","G2","18/06","46","41","11","5","2","Offer",'<span class="pill p-w">Đang tuyển</span>',"QuangLM"],
    ["JD-26-043","Backend Developer","Công nghệ","Khối BO","G4","02/06","62","19","4","0","0","PV1",'<span class="pill p-b">Trượt tiến độ</span>',"TuấnNA"],
    ["JD-26-044","Kế toán thanh toán","Kế toán","Khối BO","G3","20/06","44","16","5","2","0","PV2",'<span class="pill p-w">Đang tuyển</span>',"DungNT"],
    ["JD-26-045","Chuyên viên C&B","Nhân sự","Khối BO","G4","25/06","39","11","3","1","0","Sàng lọc",'<span class="pill p-w">Đang tuyển</span>',"TrangLTK"],
    ["JD-26-038","Trưởng nhóm Kinh doanh","Kinh doanh","A10GG","G5","05/05","28","33","9","4","2","—",'<span class="pill p-ok">Đã đóng</span>',"QuânHM"],
    ["JD-26-039","Content Marketing","Marketing","VX Team","G2","10/05","24","28","8","3","1","—",'<span class="pill p-ok">Đã đóng</span>',"QuangLM"],
    ["JD-26-040","Nhân viên kho số","Vận hành","Maverick","G2","15/05","22","22","7","4","2","—",'<span class="pill p-ok">Đã đóng</span>',"HàDT"]],
   total:["TỔNG CỘNG","8 vị trí","—","—","—","—","40","194","53","22","8","—","5 đang mở · 3 đã đóng","—"]}],
 defs:[["Time-to-Hire","Số ngày từ khi JD được BOD duyệt tới ngày ứng viên chính thức nhận việc. Không tính ngày chờ ứng viên bàn giao ở công ty cũ."],
   ["Tỷ lệ nhận offer","Số offer được chấp nhận chia cho tổng số offer đã gửi trong kỳ."],
   ["Tỷ lệ nghỉ trong thử việc","Số nhân sự nghỉ trong 90 ngày đầu chia cho số nhân sự onboard cùng kỳ, tính theo cohort tháng vào."],
   ["Chi phí cho một tuyển dụng thành công","Gồm phí headhunt, quảng cáo tuyển dụng, thưởng referral và chi phí sự kiện tuyển dụng, chia cho số người nhận việc."],
   ["Trượt tiến độ","Vị trí mở quá 45 ngày mà chưa có ứng viên ở vòng cuối."]],
 note:"Số liệu chốt tại 23h59 ngày 31/07/2026 từ tab RAW_TuyenDung. Ứng viên rút hồ sơ sau ngày chốt được ghi nhận vào kỳ kế tiếp."
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
  {k:"Tỷ lệ nhân sự đạt đủ P2",u:"%",cur:71.0,prev:68.0,tgt:85,dir:1,p:0,sp:[59,62,65,66,68,71]},
  {k:"Chi phí nhân sự trên doanh thu",u:"%",cur:18.4,prev:18.9,tgt:20.0,dir:-1,sp:[20.1,19.7,19.4,19.1,18.9,18.4]},
  {k:"Hồ sơ bị chặn chi lương",d:"Do chưa xác nhận công",u:"người",cur:6,prev:9,tgt:0,dir:-1,p:0,sp:[14,12,11,10,9,6]},
  {k:"Compa-ratio bình quân",d:"Lương thực tế trên điểm giữa dải",u:"lần",cur:0.97,prev:0.96,tgt:1.00,dir:1,p:2,sp:[0.93,0.94,0.95,0.95,0.96,0.97]},
  {k:"Chênh lệch bảng lương và MISA",u:"đồng",cur:0,prev:0,tgt:0,dir:-1,p:0,f:v=>vnd(v),sp:[0,0,0,0,0,0]}],
 charts:[
  {id:"c1",t:"Cơ cấu P1 và P2 theo phòng ban",h:"triệu đồng",span:"g2",
   f:()=>mk("c1","bar",{labels:DEPTS,datasets:[
     {label:"P1 cố định",data:[398,289,236,212,131,84,68],backgroundColor:C.navy,borderRadius:1},
     {label:"P2 biến động",data:[99,72,59,53,33,21,17],backgroundColor:C.navy2,borderRadius:1}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{stacked:true,grid:{display:false},border:{color:"rgba(148,163,184,.28)"}},y:{stacked:true,grid:{color:cssv("--grid")},border:{display:false}}}})},
  {id:"c2",t:"Cơ cấu chi phí lương",h:"% quỹ lương",
   f:()=>mk("c2","doughnut",{labels:["Lương P1 + P2","Phụ cấp","Thưởng","Bảo hiểm công ty đóng"],
     datasets:[{data:[78.4,12.1,5.3,4.2],backgroundColor:PAL,borderWidth:0}]},{cutout:"58%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})},
  {id:"c3",t:"Quỹ lương và headcount 12 kỳ",h:"triệu đồng · người",span:"g2",
   f:()=>mk("c3","bar",{labels:M12,datasets:[
     {label:"Quỹ lương",data:[1712,1748,1760,1755,1802,1836,1861,1890,1904,1921,1938,1952],backgroundColor:C.navy,borderRadius:1},
     {label:"Headcount",type:"line",data:[128,131,134,133,136,139,141,144,146,147,148,148],borderColor:C.gold,borderWidth:2,pointRadius:2,yAxisID:"y1"}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:AX.x,y:AX.y,y1:{position:"right",min:100,max:170,grid:{display:false},border:{display:false}}}})},
  {id:"c4",t:"Dải lương theo Grade",h:"triệu đồng · min – mid – max",
   f:()=>mk("c4","bar",{labels:["G1","G2","G3","G4","G5","G6","G7"],datasets:[
     {label:"Min",data:[6,8,10,14,20,30,45],backgroundColor:C.light,borderRadius:1},
     {label:"Mid",data:[7.5,10,13,18,26,40,60],backgroundColor:C.navy2,borderRadius:1},
     {label:"Max",data:[9,12,16,23,34,52,80],backgroundColor:C.navy,borderRadius:1}]},{plugins:{legend:{display:true,position:"bottom"}}})}],
 tables:[{id:"t3",t:"Bảng lương chi tiết kỳ 07/2026",
   cols:[{t:"Mã NV"},{t:"Họ tên"},{t:"Phòng ban"},{t:"Grade",a:"c"},{t:"Track",a:"c"},{t:"P1 cố định",a:"n"},{t:"P2 vận hành",a:"n"},{t:"P2 báo cáo",a:"n"},{t:"Phụ cấp",a:"n"},{t:"Thưởng",a:"n"},{t:"Khấu trừ BH",a:"n"},{t:"Thực nhận",a:"n"},{t:"Trạng thái",a:"c"}],
   groups:[{t:"Nhân sự",s:6},{t:"Cấu phần lương 2P",s:3},{t:"Khoản khác",s:3},{t:"Kết quả",s:2}],
   rows:[
    ["NV-0142","Lã Thị Kiều Trang","Nhân sự","G4.1","IC","14.400.000","1.800.000","1.800.000","1.500.000","0","1.890.000","17.610.000",'<span class="pill p-ok">Đủ điều kiện chi</span>'],
    ["NV-0087","Lương Minh Quang","Nhân sự","G3.2","IC","11.200.000","1.400.000","1.260.000","1.000.000","500.000","1.470.000","13.890.000",'<span class="pill p-ok">Đủ điều kiện chi</span>'],
    ["NV-0203","Nguyễn Thị Hạnh","Kế toán","G3.1","IC","10.400.000","1.300.000","1.300.000","1.000.000","0","1.365.000","12.635.000",'<span class="pill p-ok">Đủ điều kiện chi</span>'],
    ["NV-0311","Trần Văn Đức","Vận hành","G2.2","IC","8.800.000","1.100.000","880.000","800.000","0","1.155.000","10.425.000",'<span class="pill p-b">Chặn — chưa xác nhận công</span>'],
    ["NV-0356","Phạm Thu Hương","Chăm sóc KH","G2.1","IC","8.000.000","1.000.000","1.000.000","800.000","300.000","1.050.000","10.050.000",'<span class="pill p-ok">Đủ điều kiện chi</span>'],
    ["NV-0402","Đỗ Minh Khôi","Công nghệ","G4.2","IC","16.000.000","2.000.000","1.800.000","1.500.000","1.000.000","2.100.000","19.200.000",'<span class="pill p-w">Thiếu chấm công</span>'],
    ["NV-0418","Vũ Hải Yến","Marketing","G3.1","IC","10.400.000","1.300.000","1.300.000","1.000.000","0","1.365.000","12.635.000",'<span class="pill p-ok">Đủ điều kiện chi</span>'],
    ["NV-0455","Bùi Quốc Anh","Kinh doanh","G5.1","MGMT","20.000.000","2.500.000","2.000.000","2.000.000","2.500.000","2.625.000","24.375.000",'<span class="pill p-b">Chặn — chưa xác nhận công</span>']],
   total:["TỔNG CỘNG","8 nhân sự","—","—","—","99.200.000","12.400.000","11.340.000","9.600.000","4.300.000","13.020.000","120.820.000","2 hồ sơ bị chặn"]}],
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
  {k:"Headcount cuối kỳ",u:"người",cur:148,prev:148,tgt:150,dir:1,p:0,sp:[141,144,146,147,148,148]},
  {k:"Turnover tháng",u:"%",cur:1.4,prev:1.9,tgt:2.0,dir:-1,sp:[2.4,2.1,1.8,2.0,1.9,1.4]},
  {k:"Turnover luỹ kế năm",u:"%",cur:9.8,prev:8.4,tgt:15.0,dir:-1,sp:[2.1,4.0,5.6,7.0,8.4,9.8]},
  {k:"Tỷ lệ nghỉ dưới 12 tháng",u:"%",cur:27.3,prev:22.0,tgt:20.0,dir:-1,sp:[18,19,21,23,22,27]},
  {k:"Tỷ lệ hồ sơ đầy đủ",u:"%",cur:92.6,prev:90.5,tgt:100,dir:1,sp:[84,86,88,89,91,93]},
  {k:"Hồ sơ quá hạn 30 ngày",u:"hồ sơ",cur:4,prev:6,tgt:0,dir:-1,p:0,sp:[9,8,7,7,6,4]},
  {k:"Tỷ lệ nhân sự toàn thời gian",u:"%",cur:81.8,prev:82.4,tgt:80.0,dir:1,sp:[84,83,83,82,82,82]},
  {k:"Tỷ lệ hoàn tất Exit Interview",u:"%",cur:81.8,prev:88.9,tgt:100,dir:1,sp:[75,80,83,86,89,82]}],
 charts:[
  {id:"f1",t:"Cơ cấu theo phòng ban",h:"người",span:"g3",
   f:()=>mk("f1","bar",{labels:DEPTS,datasets:[{data:[42,31,26,19,14,9,7],backgroundColor:C.navy,borderRadius:1}]},{indexAxis:'y',scales:AXH})},
  {id:"f2",t:"Cơ cấu theo BU",h:"người",
   f:()=>mk("f2","bar",{labels:BUS,datasets:[{data:[38,27,22,19,14,11,17],backgroundColor:C.navy2,borderRadius:1}]},{indexAxis:'y',scales:AXH})},
  {id:"f3",t:"Cơ cấu theo loại hợp đồng",h:"người",
   f:()=>mk("f3","doughnut",{labels:["Toàn thời gian","Bán thời gian","Thực tập sinh","Cộng tác viên"],
     datasets:[{data:[121,14,9,4],backgroundColor:PAL,borderWidth:0}]},{cutout:"58%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})},
  {id:"f4",t:"Cơ cấu theo Grade",h:"người",span:"g3",
   f:()=>mk("f4","bar",{labels:["G1","G2","G3","G4","G5","G6","G7"],datasets:[{data:[12,29,38,31,22,11,5],backgroundColor:C.navy,borderRadius:1}]})},
  {id:"f5",t:"Cơ cấu theo nhóm tuổi",h:"người",
   f:()=>mk("f5","bar",{labels:["Dưới 22","22–25","25–30","30–35","Trên 35"],datasets:[{data:[9,48,57,26,8],backgroundColor:C.steel,borderRadius:1}]})},
  {id:"f6",t:"Cơ cấu theo giới tính",h:"người",
   f:()=>mk("f6","doughnut",{labels:["Nam","Nữ"],datasets:[{data:[86,62],backgroundColor:[C.navy,C.cream],borderWidth:0}]},{cutout:"58%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})},
  {id:"f7",t:"Biến động headcount 12 kỳ",h:"người vào – ra – tổng",cls:"tall",span:"g21",
   f:()=>mk("f7","bar",{labels:M12,datasets:[
     {label:"Vào",data:[8,9,7,6,11,9,7,10,8,9,12,12],backgroundColor:C.green,borderRadius:1},
     {label:"Ra",data:[-5,-6,-8,-7,-8,-6,-5,-7,-6,-8,-11,-11],backgroundColor:C.red,borderRadius:1},
     {label:"Tổng headcount",type:"line",data:[128,131,134,133,136,139,141,144,146,147,148,148],borderColor:C.gold,borderWidth:2,pointRadius:2,yAxisID:"y1"}]},
     {plugins:{legend:{display:true,position:"bottom"}},scales:{x:{stacked:true,grid:{display:false},border:{color:"rgba(148,163,184,.28)"}},
       y:{stacked:true,grid:{color:cssv("--grid")},border:{display:false}},y1:{position:"right",min:100,max:170,grid:{display:false},border:{display:false}}}})},
  {id:"f8",t:"Lý do nghỉ việc trong kỳ",h:"số người",
   f:()=>mk("f8","bar",{labels:["Cơ hội tốt hơn","Lương – đãi ngộ","Lý do cá nhân","Không đạt hiệu suất","Chuyển ngành","Không qua thử việc"],
     datasets:[{data:[3,2,2,2,1,1],backgroundColor:C.navy,borderRadius:1}]},{indexAxis:'y',scales:AXH})}],
 tables:[
  {id:"t6a",t:"Danh sách nhân sự onboard trong kỳ",
   cols:[{t:"Mã NV"},{t:"Họ tên"},{t:"Vị trí"},{t:"Phòng ban"},{t:"BU"},{t:"Ngày vào",a:"c"},{t:"Nguồn tuyển",a:"c"},{t:"Culture Buddy",a:"c"},{t:"D30",a:"c"},{t:"D60",a:"c"},{t:"D90",a:"c"},{t:"Kết quả",a:"c"}],
   groups:[{t:"Nhân sự",s:6},{t:"Nguồn",s:3},{t:"Mốc đánh giá",s:3},{t:"",s:1}],
   rows:[
    ["NV-0501","Nguyễn Hoài Nam","CV Vận hành đơn","Vận hành","Ritokey","01/07/2026","Referral","HàDT",'<span class="pill p-ok">Đạt</span>','<span class="pill p-w">Đang chờ</span>','<span class="pill p-n">Chưa tới</span>','<span class="pill p-w">Thử việc</span>'],
    ["NV-0502","Trần Bảo Ngọc","NV CSKH quốc tế","Chăm sóc KH","WGG","01/07/2026","LinkedIn","QuangLM",'<span class="pill p-ok">Đạt</span>','<span class="pill p-w">Đang chờ</span>','<span class="pill p-n">Chưa tới</span>','<span class="pill p-w">Thử việc</span>'],
    ["NV-0498","Lê Đình Phúc","Backend Developer","Công nghệ","Khối BO","16/06/2026","Headhunt","TuấnNA",'<span class="pill p-ok">Đạt</span>','<span class="pill p-ok">Đạt</span>','<span class="pill p-n">Chưa tới</span>','<span class="pill p-w">Thử việc</span>'],
    ["NV-0489","Phạm Khánh Linh","CV Kế toán","Kế toán","Khối BO","02/06/2026","Website HQ","HạnhNTH",'<span class="pill p-ok">Đạt</span>','<span class="pill p-ok">Đạt</span>','<span class="pill p-ok">Đạt</span>','<span class="pill p-ok">Chính thức</span>'],
    ["NV-0476","Hoàng Anh Tuấn","NV Kinh doanh","Kinh doanh","A10GG","15/05/2026","Referral","QuânHM",'<span class="pill p-ok">Đạt</span>','<span class="pill p-ok">Đạt</span>','<span class="pill p-ok">Đạt</span>','<span class="pill p-ok">Chính thức</span>'],
    ["NV-0471","Đặng Thuỳ Dương","Content Marketing","Marketing","VX Team","05/05/2026","Facebook","QuangLM",'<span class="pill p-ok">Đạt</span>','<span class="pill p-b">Không đạt</span>',"—",'<span class="pill p-b">Dừng thử việc</span>']],
   total:["TỔNG CỘNG","12 người onboard","—","—","—","—","4 referral","12 đã gán","12 đạt","7 đạt","4 đạt","4 chính thức · 7 thử việc · 1 dừng"]},
  {id:"t6b",t:"Danh sách nhân sự off trong kỳ",
   cols:[{t:"Mã NV"},{t:"Họ tên"},{t:"Phòng ban"},{t:"BU"},{t:"Ngày vào",a:"c"},{t:"Ngày nghỉ",a:"c"},{t:"Thâm niên",a:"n"},{t:"Loại nghỉ",a:"c"},{t:"Lý do"},{t:"Exit Interview",a:"c"},{t:"Bàn giao",a:"c"}],
   rows:[
    ["NV-0322","Ngô Thanh Bình","Vận hành","Ritokey","10/03/2024","15/07/2026","2,3 năm","Tự nguyện","Cơ hội tốt hơn",'<span class="pill p-ok">Đã phỏng vấn</span>','<span class="pill p-ok">Hoàn tất</span>'],
    ["NV-0287","Lý Mai Phương","Chăm sóc KH","WGG","01/09/2023","20/07/2026","2,9 năm","Tự nguyện","Lý do cá nhân",'<span class="pill p-ok">Đã phỏng vấn</span>','<span class="pill p-ok">Hoàn tất</span>'],
    ["NV-0410","Vương Đức Hải","Kinh doanh","A10GG","12/01/2025","31/07/2026","1,6 năm","Không tự nguyện","Không đạt hiệu suất",'<span class="pill p-ok">Đã phỏng vấn</span>','<span class="pill p-w">Đang bàn giao</span>'],
    ["NV-0365","Trịnh Bảo Châu","Marketing","VX Team","05/06/2024","28/07/2026","2,1 năm","Tự nguyện","Chuyển ngành",'<span class="pill p-w">Chưa xếp lịch</span>','<span class="pill p-w">Đang bàn giao</span>'],
    ["NV-0298","Cao Minh Đức","Công nghệ","Khối BO","20/02/2023","25/07/2026","3,4 năm","Tự nguyện","Lương – đãi ngộ",'<span class="pill p-ok">Đã phỏng vấn</span>','<span class="pill p-ok">Hoàn tất</span>'],
    ["NV-0451","Hà Thu Trang","Vận hành","Maverick","03/03/2026","18/07/2026","0,4 năm","Không tự nguyện","Không qua thử việc",'<span class="pill p-n">Không áp dụng</span>','<span class="pill p-ok">Hoàn tất</span>']],
   total:["TỔNG CỘNG","11 người off","—","—","—","—","2,1 năm","8 tự nguyện · 3 không","—","9 đã phỏng vấn","3 đang bàn giao"]},
  {id:"t6c",t:"Tình trạng hoàn thiện hồ sơ nhân sự",
   cols:[{t:"Mã NV"},{t:"Họ tên"},{t:"Phòng ban"},{t:"Ngày vào",a:"c"},{t:"CCCD",a:"c"},{t:"SYLL",a:"c"},{t:"Bằng cấp",a:"c"},{t:"Khám SK",a:"c"},{t:"HĐLĐ",a:"c"},{t:"Sổ BH",a:"c"},{t:"TK NH",a:"c"},{t:"MST",a:"c"},{t:"Hoàn thiện",a:"n"},{t:"Ghi chú",a:"c"}],
   groups:[{t:"Nhân sự",s:5},{t:"Đầu mục hồ sơ bắt buộc",s:8},{t:"Đánh giá",s:2}],
   rows:[
    ["NV-0501","Nguyễn Hoài Nam","Vận hành","01/07/2026","✔","✔","✔","✔","✔","—","✔","✔","89%",'<span class="pill p-w">Thiếu sổ BH</span>'],
    ["NV-0502","Trần Bảo Ngọc","Chăm sóc KH","01/07/2026","✔","✔","—","✔","✔","—","✔","—","67%",'<span class="pill p-b">Thiếu 3 mục</span>'],
    ["NV-0498","Lê Đình Phúc","Công nghệ","16/06/2026","✔","✔","✔","✔","✔","✔","✔","✔","100%",'<span class="pill p-ok">Đầy đủ</span>'],
    ["NV-0489","Phạm Khánh Linh","Kế toán","02/06/2026","✔","✔","✔","✔","✔","✔","✔","✔","100%",'<span class="pill p-ok">Đầy đủ</span>'],
    ["NV-0476","Hoàng Anh Tuấn","Kinh doanh","15/05/2026","✔","✔","✔","—","✔","✔","✔","✔","89%",'<span class="pill p-b">Quá hạn 30 ngày</span>'],
    ["NV-0455","Bùi Quốc Anh","Kinh doanh","12/01/2024","✔","✔","✔","✔","✔","✔","✔","—","89%",'<span class="pill p-w">Thiếu MST</span>']],
   total:["TỔNG CỘNG","148 nhân sự","—","—","148","147","145","145","148","142","148","144","96,1%","137 đầy đủ · 11 còn thiếu"]}],
 defs:[["Headcount","Số nhân sự có trạng thái Đang làm tại ngày chốt số, bao gồm cả nhân sự đang thử việc."],
   ["Turnover tháng","Số người nghỉ trong kỳ chia cho headcount bình quân kỳ."],
   ["Nghỉ dưới 12 tháng","Số người nghỉ có thâm niên dưới 12 tháng, chia cho tổng số nghỉ trong kỳ."],
   ["Hồ sơ đầy đủ","Có đủ 8 đầu mục bắt buộc đã số hoá lên 1Office."],
   ["Quá hạn 30 ngày","Hồ sơ còn thiếu sau 30 ngày kể từ ngày vào làm."]],
 note:"Dữ liệu lọc theo trạng thái Đang làm tại ngày chốt số. Nhân sự nghỉ trong kỳ được tách sang bảng off, không tính vào cơ cấu đội ngũ."
};

/* ---------------- HRM7 ---------------- */
REP.HRM7={
 title:"Báo cáo Bảo hiểm xã hội",
 sub:"Mức độ tham gia, báo tăng – báo giảm, chi phí đóng và tiến độ giải quyết chế độ.",
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
  {k:"Tỷ lệ phủ bảo hiểm",d:"Trên số nhân sự thuộc diện",u:"%",cur:100.0,prev:98.6,tgt:100,dir:1,p:0,sp:[96,97,98,98,99,100]},
  {k:"Số người đang tham gia",u:"người",cur:141,prev:139,tgt:141,dir:1,p:0,sp:[133,135,137,138,139,141]},
  {k:"Quỹ lương đóng bảo hiểm",u:"triệu",cur:1618,prev:1601,tgt:1650,dir:-1,p:0,f:v=>vnd(v),sp:[1542,1563,1578,1590,1601,1618]},
  {k:"Công ty đóng 21,5%",u:"triệu",cur:347.9,prev:344.2,tgt:354.8,dir:-1,sp:[331,336,339,342,344,348]},
  {k:"Người lao động đóng 10,5%",u:"triệu",cur:169.9,prev:168.1,tgt:173.3,dir:-1,sp:[162,164,166,167,168,170]},
  {k:"Hồ sơ báo tăng nộp đúng hạn",u:"%",cur:100.0,prev:100.0,tgt:100,dir:1,p:0,sp:[92,95,100,100,100,100]},
  {k:"Hồ sơ chế độ đang xử lý",u:"hồ sơ",cur:3,prev:2,tgt:0,dir:-1,p:0,sp:[4,3,2,3,2,3]},
  {k:"Chênh lệch đối chiếu cơ quan BH",u:"đồng",cur:0,prev:0,tgt:0,dir:-1,p:0,f:v=>vnd(v),sp:[0,0,0,0,0,0]}],
 charts:[
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
 tables:[{id:"t7",t:"Chi tiết tham gia và giải quyết chế độ bảo hiểm",
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
  {id:"h1",t:"Mức tải theo nhân sự",h:"% so mức chuẩn 176 giờ",cls:"tall",span:"g21",
   f:()=>{const nm=["TrangLTK","QuangLM","HạnhNTH","ĐứcTV","HươngPT","YếnVH","KhôiĐM"],ld=[118,141,111,154,99,73,122];
     mk("h1","bar",{labels:nm,datasets:[
       {data:ld,backgroundColor:ld.map(v=>v>120?C.red:v<70?C.amber:v>100?C.navy2:C.green),borderRadius:1},
       {label:"Mức chuẩn",type:"line",data:nm.map(()=>100),borderColor:"#08182C",borderDash:[5,4],borderWidth:1.2,pointRadius:0}]},
       {indexAxis:'y',scales:{x:{max:180,grid:{color:cssv("--grid")},border:{display:false}},y:{grid:{display:false},border:{display:false}}}})}},
  {id:"h2",t:"Cơ cấu thời gian theo nhóm việc",h:"% tổng giờ",cls:"tall",
   f:()=>mk("h2","doughnut",{labels:["Tuyển dụng & Onboarding","Chấm công – C&B","Hồ sơ – BHXH","Đào tạo & Văn hoá","Báo cáo & Dashboard","Hành chính – Vận hành"],
     datasets:[{data:[26,22,17,14,12,9],backgroundColor:PAL,borderWidth:0}]},{cutout:"55%",plugins:{legend:{display:true,position:"bottom"}},scales:{}})},
  {id:"h3",t:"Tỷ lệ phân bổ quỹ lương về BU",h:"% quỹ lương kỳ",span:"g2",
   f:()=>mk("h3","bar",{labels:ALLOC.map(x=>x[0]),datasets:[{data:ALLOC.map(x=>x[1]),backgroundColor:C.navy,borderRadius:1}]})},
  {id:"h4",t:"Chi phí nhân sự phân bổ theo BU",h:"triệu đồng · P1 và P2",
   f:()=>mk("h4","bar",{labels:ALLOC.map(x=>x[0]),datasets:[
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



/* ============================================================
   E. RENDER
   ============================================================ */
function heroCard(k,i){
  const g=rag(k.cur,k.tgt,k.dir);
  const col=g.c==="g"?"#10B981":g.c==="a"?"#F59E0B":"#F43F5E";
  const t=TILE[i%TILE.length];
  return `<div class="hcard">
    <span class="utag" style="background:${t}20;border-color:${t}55;color:${t}">${(k.u||"chỉ số").toUpperCase()}</span>
    <div class="k">${k.k}</div>
    <div class="row"><span class="v">${k.f?k.f(k.cur):dec(k.cur,k.p??1)}<small>${k.u}</small></span>${delta(k.cur,k.prev,k.dir)}</div>
    <div class="foot">
      <span><i class="dot" style="background:${col}"></i>Mục tiêu ${k.f?k.f(k.tgt):dec(k.tgt,k.p??1)} ${k.u}</span>
      <span class="rag ${g.c}"><i></i>${g.t}</span>
      ${k.live?'<span class="livetag">TRỰC TIẾP</span>':''}
      <span style="margin-left:auto">${spark(k.sp,col)}</span>
    </div></div>`;
}

function filterRow(){
  return `<div class="mrow noprint">
    <div class="fld"><label>Từ ngày</label><input type="date" id="d-from" value="${RANGE.from}" onchange="setRange()"></div>
    <div class="fld"><label>Đến ngày</label><input type="date" id="d-to" value="${RANGE.to}" onchange="setRange()"></div>
    <div class="fld"><label>Nhanh</label><div class="qwrap">
      <button class="qbtn ${RANGE.q==='7n'?'on':''}" onclick="quickRange('7n')">7N</button>
      <button class="qbtn ${RANGE.q==='30n'?'on':''}" onclick="quickRange('30n')">30N</button>
      <button class="qbtn ${RANGE.q==='thang'?'on':''}" onclick="quickRange('thang')">Tháng này</button>
      <button class="qbtn ${RANGE.q==='ca'?'on':''}" onclick="quickRange('ca')">Cả kỳ</button>
    </div></div>
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
        <p>${r.sub}</p>
        <div class="scoperow">
          <span class="scopepill">Phạm vi: <b>${fmtd(RANGE.from)} → ${fmtd(RANGE.to)}</b></span>
          <span class="srctxt">Nguồn: ${m.src.map(k=>SOURCES[k].n).join(' · ')} — Google Sheet</span>
        </div>
      </div>
      <div class="sp"></div>
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

function renderReport(m){
  const r=REP[m.id];
  const K=(window.HQLive?HQLive.apply(m.id,r.kpis):r.kpis);
  let ch="",group=[],span="g2";
  r.charts.forEach(c=>{
    if(c.span){ if(group.length){ch+=`<div class="grid ${span}">${group.join('')}</div>`;group=[]} span=c.span }
    group.push(panel(c.t,c.h,`<div class="chartbox ${c.cls||''}"><canvas id="${c.id}"></canvas></div>`));
    if(group.length===(span==="g3"?3:2)){ch+=`<div class="grid ${span}">${group.join('')}</div>`;group=[]}
  });
  if(group.length)ch+=`<div class="grid ${span}">${group.join('')}</div>`;
  let tb=r.tables.map(t=>panelT(t.t,`${t.rows.length} dòng dữ liệu`,dataTable(t.id,t.cols,t.rows,t.total,t.groups),tools(t.id),tfoot(t.rows.length)))
    .join('<div style="height:16px"></div>');
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
  if(hasSum||hasAct){
    const boxes=(hasSum?`<div class="exbox"><h4>Nhận định chính</h4><ol>${r.summary.map(s=>`<li>${s}</li>`).join('')}</ol></div>`:'')+
      (hasAct?`<div class="exbox act"><h4>Việc cần quyết</h4><ol>${r.actions.map(([a,t])=>`<li>${a}<span class="tagr ${t}">${t==='t-hi'?'ƯU TIÊN CAO':t==='t-md'?'TRUNG BÌNH':'THEO DÕI'}</span></li>`).join('')}</ol></div>`:'');
    parts.push(["Tóm tắt điều hành","Nhận định và việc cần quyết trong kỳ",
      `<div class="exec"${hasSum&&hasAct?'':' style="grid-template-columns:1fr"'}>${boxes}</div>`]);
  }
  parts.push(["Bảng chỉ số chính","So sánh kỳ trước · mục tiêu · xu hướng 6 kỳ",
    panelT("Toàn bộ chỉ số theo dõi","đánh giá theo mục tiêu kỳ",scorecard("sc-"+m.id,K),tools("sc-"+m.id))]);
  parts.push(["Phân tích","Diễn giải bằng biểu đồ",ch]);
  parts.push(["Dữ liệu chi tiết","Bảng gốc phục vụ đối chiếu",tb]);
  parts.push(["Định nghĩa chỉ số và phê duyệt","",defsBox(r.defs)+`<div class="note">${r.note}</div>`+signBlock(r.meta)]);
  return mast(m,r)+
  `<div class="wrap"><div class="hero kstrip">${K.slice(0,4).map((k,i)=>heroCard(k,i)).join('')}</div></div>
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
  const byRep=MODULES.slice(1).map(x=>{
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
        <p>Toàn bộ chỉ số của tám mã báo cáo — Phòng Nhân sự theo dõi vận hành theo kỳ.</p>
        <div class="scoperow">
          <span class="scopepill">Phạm vi: <b>${fmtd(RANGE.from)} → ${fmtd(RANGE.to)}</b></span>
          <span class="srctxt">Nguồn: ${linkedAll}/${NSRC} tab Google Sheet đã nối</span>
        </div>
      </div>
      <div class="sp"></div>
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
    {label:"Quỹ lương (triệu)",data:[1712,1748,1760,1755,1802,1836,1861,1890,1904,1921,1938,1952],backgroundColor:C.navy,borderRadius:6,maxBarThickness:26},
    {label:"Nhân sự",type:"line",data:[128,131,134,133,136,139,141,144,146,147,148,148],borderColor:C.gold,borderWidth:2.6,pointRadius:3,pointBackgroundColor:C.gold,tension:.38,yAxisID:"y1"}]},
    {plugins:{legend:{display:true,position:"bottom"}},scales:{x:AX.x,y:AX.y,y1:{position:"right",min:100,max:170,grid:{display:false},border:{display:false}}}});
  mk("z2","doughnut",{labels:BUS,datasets:[{data:[38,27,22,19,14,11,17],backgroundColor:PAL,borderWidth:0,hoverOffset:6}]},
    {cutout:"64%",plugins:{legend:{display:true,position:"bottom"}},scales:{}});
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
  b.onclick=()=>go(m.id);return b;
}
function buildNav(){
  const w=document.getElementById('navwrap');w.innerHTML='';
  const rsec=t=>el(`<div class="railsec">${t}</div>`), nv=()=>el('<div class="nav"></div>');
  w.appendChild(rsec("Tổng hợp"));
  const n0=nv();n0.appendChild(navBtn(MODULES[0]));w.appendChild(n0);
  TIERS.forEach(tr=>{
    w.appendChild(rsec(tr.t));
    const g=nv();
    tr.ids.forEach(id=>g.appendChild(navBtn(MODULES.find(m=>m.id===id))));
    w.appendChild(g);
  });
  const c=Object.values(SOURCES).filter(s=>s.url).length;
  document.getElementById('linkcount').textContent=c+"/"+NSRC;
  document.getElementById('linkbar').style.width=(c/NSRC*100)+"%";
  const bc=document.getElementById('bellcount');
  if(bc)bc.textContent=MODULES.slice(1).flatMap(x=>(REP[x.id].actions||[]).filter(a=>a[1]==='t-hi')).length;
}
function go(id){
  current=id;kill();
  const m=MODULES.find(x=>x.id===id);
  const v=document.getElementById('view');
  v.innerHTML = id==="HOME"?renderHome():renderReport(m);
  if(id==="HOME"){homeCharts();MODULES.slice(1).forEach(x=>REP[x.id].charts.slice(0,2).forEach(c=>c.f()))}
  else (REP[m.id].charts||[]).forEach(c=>c.f());
  buildNav();runSearch();window.scrollTo(0,0);
}

/* ---- Drawer ---- */
function openDrawer(){
  if(!isAdmin()){toast("Chỉ Quản trị cấp cao nhất được gắn / sửa nguồn dữ liệu");return}
  document.getElementById('srclist').innerHTML=Object.entries(SOURCES).map(([k,s])=>`
    <div class="srcrow"><div class="t"><b>${s.l}</b>
      <span class="pill ${(window.HQLive&&HQLive.has(k))?'p-ok':(s.url?'p-w':'p-n')}">${(window.HQLive&&HQLive.has(k))?('Đã đọc '+HQLive.rows(k).length+' dòng'):(s.url?'Đã khai báo':'Chưa nối')}</span>
      <span class="mods">${s.n} · ${s.m}</span></div>
      <input type="text" data-k="${k}" value="${s.url}" placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv">
      <div class="cols"><b>Cột bắt buộc:</b> ${s.c}</div></div>`).join('');
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
document.getElementById('btn-close').onclick=closeDrawer;
document.getElementById('btn-logout').onclick=logout;
document.getElementById('scrim').onclick=closeDrawer;
document.getElementById('btn-bell').onclick=()=>{
  const n=MODULES.slice(1).flatMap(x=>(REP[x.id].actions||[]).filter(a=>a[1]==='t-hi')).length;
  toast(`${n} việc ưu tiên cao đang theo dõi trong kỳ`)};
document.getElementById('btn-save').onclick=()=>{
  document.querySelectorAll('#srclist input').forEach(i=>SOURCES[i.dataset.k].url=i.value.trim());
  closeDrawer();go(current);toast(`Đã lưu ${Object.values(SOURCES).filter(s=>s.url).length}/${NSRC} liên kết nguồn`)};
document.getElementById('btn-dens').onclick=function(){
  document.body.classList.toggle('compact');
  toast(document.body.classList.contains('compact')?"Đang xem chế độ thu gọn":"Đã trở lại chế độ giãn dòng")};
function quickRange(k){
  const t=new Date(); let f;
  if(k==='7n'){f=new Date(t);f.setDate(t.getDate()-6)}
  else if(k==='30n'){f=new Date(t);f.setDate(t.getDate()-29)}
  else if(k==='thang'){f=new Date(t.getFullYear(),t.getMonth(),1)}
  else{f=new Date(t.getFullYear(),0,1)}
  RANGE={from:iso(f),to:iso(t),q:k};
  go(current);toast("Đã áp phạm vi ngày — nối nguồn thật để số liệu đổi theo")}
function setRange(){
  const f=document.getElementById('d-from').value,t=document.getElementById('d-to').value;
  if(f)RANGE.from=f; if(t)RANGE.to=t; RANGE.q=null;
  go(current);toast("Đã áp phạm vi ngày — nối nguồn thật để số liệu đổi theo")}
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
  document.body.appendChild(el(`<div class="authwall" id="authwall"><div class="authcard">
    <div class="alogo">HQ</div>
    <h2>${org}</h2>
    <p>Đăng nhập bằng email công ty</p>
    <input type="text" id="au-mail" placeholder="ten@${AUTHC.domain}" autocomplete="off"
      onkeydown="if(event.key==='Enter')doLogin()">
    <button class="btn" onclick="doLogin()">Đăng nhập</button>
    <div class="err" id="au-err"></div>
    <p class="ahint">Chỉ email thuộc miền <b>@${AUTHC.domain}</b> được truy cập.</p>
  </div></div>`));
  document.getElementById('au-mail').focus();
}
function doLogin(){
  const v=document.getElementById('au-mail').value.trim().toLowerCase();
  const err=document.getElementById('au-err');
  if(!/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(v)){err.textContent="Email không hợp lệ.";return}
  if(!v.endsWith('@'+AUTHC.domain)){err.textContent=`Chỉ email @${AUTHC.domain} được truy cập. Liên hệ Quản trị cấp cao.`;return}
  AUTH={email:v,role:AUTHC.admins.includes(v)?'admin':'viewer'};
  document.getElementById('authwall').remove();
  initApp();
}
function logout(){location.reload()}
function applyAuthUI(){
  document.body.classList.toggle('viewer',!isAdmin());
  const w=document.querySelector('.who');
  if(w&&AUTH){
    const name=AUTH.email.split('@')[0];
    w.querySelector('.av').textContent=name.slice(0,1).toUpperCase();
    w.querySelector('b').textContent=name;
    w.querySelector('span').textContent=isAdmin()?"Quản trị cấp cao nhất":"Phòng Nhân sự · Xem báo cáo";
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
