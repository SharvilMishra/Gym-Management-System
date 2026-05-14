/* ========================================
   GMS — Gym Management System
   Firebase Backend (Auth + Firestore)
   ======================================== */

/* ===== FIREBASE CONFIG =====
   Replace with credentials from
   Firebase Console > Settings > Web app */


const firebaseConfig = {
    apiKey: "AIzaSyATe35VBqDOioLdU6OPBTv3_pTfGNjV_1s",
    authDomain: "gym-management-system-646e7.firebaseapp.com",
    projectId: "gym-management-system-646e7",
   storageBucket: "gym-management-system-646e7.appspot.com",
    messagingSenderId: "352464054004",
    appId: "1:352464054004:web:94118d435cabf1fd9820a1"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(), db = firebase.firestore();

/* ===== SEED DATA ===== */
const SEED_MEMBERS = [
    {id:'M001',fn:'Alex',ln:'Johnson',email:'alex.j@email.com',phone:'555-0101',photo:'https://picsum.photos/seed/gym1/100/100',ms:'Premium',sd:'2026-01-15',ed:'2026-07-15',st:'Active',health:'No known conditions',ec:'Jane Johnson - 555-0102'},
    {id:'M002',fn:'Maria',ln:'Garcia',email:'maria.g@email.com',phone:'555-0103',photo:'https://picsum.photos/seed/gym2/100/100',ms:'VIP',sd:'2026-02-01',ed:'2026-08-01',st:'Active',health:'Mild asthma - inhaler in bag',ec:'Carlos Garcia - 555-0104'},
    {id:'M003',fn:'James',ln:'Wilson',email:'james.w@email.com',phone:'555-0105',photo:'https://picsum.photos/seed/gym3/100/100',ms:'Basic',sd:'2026-03-10',ed:'2026-06-10',st:'Active',health:'Previous knee surgery (2024)',ec:'Lisa Wilson - 555-0106'},
    {id:'M004',fn:'Priya',ln:'Sharma',email:'priya.s@email.com',phone:'555-0107',photo:'https://picsum.photos/seed/gym4/100/100',ms:'Premium',sd:'2025-11-20',ed:'2026-05-20',st:'Active',health:'None',ec:'Raj Sharma - 555-0108'},
    {id:'M005',fn:'Tyler',ln:'Brooks',email:'tyler.b@email.com',phone:'555-0109',photo:'https://picsum.photos/seed/gym5/100/100',ms:'Basic',sd:'2026-04-01',ed:'2026-10-01',st:'Active',health:'Lower back pain - avoid heavy deadlifts',ec:'Mike Brooks - 555-0110'},
    {id:'M006',fn:'Emma',ln:'Davis',email:'emma.d@email.com',phone:'555-0111',photo:'https://picsum.photos/seed/gym6/100/100',ms:'VIP',sd:'2025-12-01',ed:'2026-06-01',st:'Active',health:'Diabetes Type 2 - monitor blood sugar',ec:'Tom Davis - 555-0112'},
    {id:'M007',fn:'Kai',ln:'Nakamura',email:'kai.n@email.com',phone:'555-0113',photo:'https://picsum.photos/seed/gym7/100/100',ms:'Premium',sd:'2026-01-01',ed:'2026-07-01',st:'Active',health:'None',ec:'Yuki Nakamura - 555-0114'},
    {id:'M008',fn:'Olivia',ln:'Brown',email:'olivia.b@email.com',phone:'555-0115',photo:'https://picsum.photos/seed/gym8/100/100',ms:'Basic',sd:'2026-04-15',ed:'2026-07-15',st:'Active',health:'None',ec:'Sam Brown - 555-0116'},
    {id:'M009',fn:'Derek',ln:'Lee',email:'derek.l@email.com',phone:'555-0117',photo:'https://picsum.photos/seed/gym9/100/100',ms:'Premium',sd:'2025-10-01',ed:'2026-04-01',st:'Inactive',health:'Shoulder impingement - physical therapy',ec:'Jen Lee - 555-0118'},
    {id:'M010',fn:'Sofia',ln:'Martinez',email:'sofia.m@email.com',phone:'555-0119',photo:'https://picsum.photos/seed/gym10/100/100',ms:'Basic',sd:'2025-09-15',ed:'2026-03-15',st:'Inactive',health:'None',ec:'Luis Martinez - 555-0120'},
    {id:'M011',fn:'Noah',ln:'Kim',email:'noah.k@email.com',phone:'555-0121',photo:'https://picsum.photos/seed/gym11/100/100',ms:'VIP',sd:'2026-03-01',ed:'2026-09-01',st:'Active',health:'Peanut allergy',ec:'Min Kim - 555-0122'},
    {id:'M012',fn:'Ava',ln:'Thompson',email:'ava.t@email.com',phone:'555-0123',photo:'https://picsum.photos/seed/gym12/100/100',ms:'Premium',sd:'2026-05-01',ed:'2026-11-01',st:'Active',health:'None',ec:'Ben Thompson - 555-0124'}
];
const SEED_PAYMENTS = [
    {id:'P001',mid:'M001',mn:'Alex Johnson',amt:120,method:'Card',date:'2026-05-01',st:'Paid'},
    {id:'P002',mid:'M002',mn:'Maria Garcia',amt:200,method:'Card',date:'2026-05-01',st:'Paid'},
    {id:'P003',mid:'M003',mn:'James Wilson',amt:60,method:'Cash',date:'2026-05-03',st:'Paid'},
    {id:'P004',mid:'M004',mn:'Priya Sharma',amt:120,method:'UPI',date:'2026-05-05',st:'Paid'},
    {id:'P005',mid:'M005',mn:'Tyler Brooks',amt:60,method:'Cash',date:'2026-04-15',st:'Paid'},
    {id:'P006',mid:'M006',mn:'Emma Davis',amt:200,method:'Card',date:'2026-05-02',st:'Paid'},
    {id:'P007',mid:'M007',mn:'Kai Nakamura',amt:120,method:'Bank Transfer',date:'2026-05-04',st:'Paid'},
    {id:'P008',mid:'M008',mn:'Olivia Brown',amt:60,method:'Cash',date:'2026-05-06',st:'Pending'},
    {id:'P009',mid:'M009',mn:'Derek Lee',amt:120,method:'Card',date:'2026-04-01',st:'Overdue'},
    {id:'P010',mid:'M010',mn:'Sofia Martinez',amt:60,method:'Cash',date:'2026-03-15',st:'Overdue'},
    {id:'P011',mid:'M011',mn:'Noah Kim',amt:200,method:'Card',date:'2026-05-07',st:'Paid'},
    {id:'P012',mid:'M012',mn:'Ava Thompson',amt:120,method:'UPI',date:'2026-05-08',st:'Pending'},
    {id:'P013',mid:'M001',mn:'Alex Johnson',amt:120,method:'Card',date:'2026-04-01',st:'Paid'},
    {id:'P014',mid:'M002',mn:'Maria Garcia',amt:200,method:'Card',date:'2026-04-01',st:'Paid'},
    {id:'P015',mid:'M006',mn:'Emma Davis',amt:200,method:'Bank Transfer',date:'2026-04-01',st:'Paid'}
];
function genSeedAtt(){
    const a=[],act=SEED_MEMBERS.filter(m=>m.st==='Active');
    const dates=['2026-05-07','2026-05-08','2026-05-09','2026-05-10','2026-05-11','2026-05-12','2026-05-13'];
    const cnts=[6,8,7,10,5,9,4];let id=1;
    dates.forEach((d,di)=>{for(let i=0;i<cnts[di];i++){const m=act[(di*3+i*2)%act.length];
        const hI=6+((i*37+di*13)%10),mI=(i*17+di*23)%60,hO=hI+1+(i%2),mO=(mI+30)%60,stillIn=di===6&&i>=2;
        a.push({id:'A'+String(id++).padStart(3,'0'),mid:m.id,mn:m.fn+' '+m.ln,date:d,
            ci:d+'T'+String(hI).padStart(2,'0')+':'+String(mI).padStart(2,'0')+':00',
            co:stillIn?null:d+'T'+String(hO).padStart(2,'0')+':'+String(mO).padStart(2,'0')+':00'});}});
    return a;
}
const SEED_USERS=[
    {email:'admin@gms.com',password:'admin123',role:'admin',name:'Marcus Chen'},
    {email:'trainer@gms.com',password:'trainer123',role:'trainer',name:'Sarah Mitchell'},
    {email:'member@gms.com',password:'member123',role:'member',name:'Alex Johnson'}
];

/* ===== STATE ===== */
let curUser=null,curUserDoc=null,curPage='dashboard',mPage=1,mSearch='',mFStatus='all',mFType='all';
let chartA=null,chartM=null;const PS=8;
const titles={dashboard:'Dashboard',members:'Members',attendance:'Attendance',payments:'Payments',settings:'Settings'};

/* ===== HELPERS ===== */
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const fmtD=s=>{if(!s)return'-';return new Date(s).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})};
const fmtT=s=>{if(!s)return'-';return new Date(s).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})};
const fmtC=n=>'$'+Number(n).toFixed(2);
const stB=s=>s==='Active'?'badge-ok':s==='Inactive'?'badge-err':s==='Pending'?'badge-warn':s==='Overdue'?'badge-err':'badge-acc';
const msB=s=>s==='VIP'?'badge-hl':s==='Premium'?'badge-acc':'badge-ok';
function animV(el,end,dur=600){const t0=performance.now();(function s(ts){const p=Math.min((ts-t0)/dur,1);el.textContent=Math.floor(p*end);if(p<1)requestAnimationFrame(s);else el.textContent=end;})(t0);}

/* ===== TOAST ===== */
function toast(msg,type='info'){const t=document.createElement('div');t.className='toast '+type;const i={ok:'fa-check-circle',err:'fa-times-circle',warn:'fa-exclamation-triangle',info:'fa-info-circle'};t.innerHTML=`<i class="fas ${i[type]||i.info}"></i><span>${msg}</span>`;$('#toastBox').appendChild(t);setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),300);},3500);}

/* ===== MODAL ===== */
function showModal(h){$('#modalBody').innerHTML=h;$('#modalOverlay').classList.remove('hidden');}
function hideModal(){$('#modalOverlay').classList.add('hidden');}

/* ===== THEME ===== */
function applyTheme(t){document.documentElement.dataset.theme=t;localStorage.setItem('gms-theme',t);$('#themeBtn').innerHTML=t==='aqua'?'<i class="fas fa-sun"></i><span>Aqua Mode</span>':'<i class="fas fa-moon"></i><span>Dark Mode</span>';$$('#theme-opt').forEach(el=>el.classList.toggle('active',el.dataset.t===t));}
function toggleTheme(){applyTheme(document.documentElement.dataset.theme==='dark'?'aqua':'dark');if(curPage==='dashboard')renderDashboard();}

/* ===== FIREBASE DATA LAYER ===== */
async function getMembers(){return(await db.collection('members').get()).docs.map(d=>d.data());}
async function getPayments(){return(await db.collection('payments').get()).docs.map(d=>d.data());}
async function getAttendance(){return(await db.collection('attendance').get()).docs.map(d=>d.data());}
async function addMemberDoc(data){const id='M'+String(Date.now()).slice(-6);data.id=id;data.sd=new Date().toISOString().split('T')[0];data.st='Active';if(!data.health)data.health='';if(!data.ec)data.ec='';await db.collection('members').doc(id).set(data);return id;}
async function updateMemberDoc(id,data){await db.collection('members').doc(id).set(data,{merge:true});}
async function deleteMemberDoc(id){await db.collection('members').doc(id).delete();const b=db.batch();(await db.collection('attendance').where('mid','==',id).get()).forEach(d=>b.delete(d.ref));(await db.collection('payments').where('mid','==',id).get()).forEach(d=>b.delete(d.ref));await b.commit();}
async function checkInDoc(mid,mn){const id='A'+String(Date.now()).slice(-6);const now=new Date(),ds=now.toISOString().split('T')[0];const e={id,mid,mn,date:ds,ci:now.toISOString(),co:null};await db.collection('attendance').doc(id).set(e);return e;}
async function checkOutDoc(aid){await db.collection('attendance').doc(aid).update({co:new Date().toISOString()});}
async function addPaymentDoc(data){const id='P'+String(Date.now()).slice(-6);data.id=id;await db.collection('payments').doc(id).set(data);return id;}
async function getUserDoc(uid){const d=await db.collection('users').doc(uid).get();return d.exists?d.data():null;}
async function findMemberByEmail(email){const s=await db.collection('members').where('email','==',email).get();return s.empty?null:s.docs[0].data();}
async function seedData(){const b=db.batch();SEED_MEMBERS.forEach(m=>b.set(db.collection('members').doc(m.id),m));SEED_PAYMENTS.forEach(p=>b.set(db.collection('payments').doc(p.id),p));genSeedAtt().forEach(a=>b.set(db.collection('attendance').doc(a.id),a));await b.commit();}

/* ================================================================
   SEEDING — Fixed: create admin FIRST to get auth token,
   THEN seed Firestore, THEN create remaining users.
   This breaks the chicken-and-egg deadlock with auth-required rules.
   ================================================================ */
function isConfigErr(err){
    const m=(err.message||'')+(err.code||'');
    return m.includes('api-key')||m.includes('API key')||m.includes('auth/api-key')||m.includes('auth/invalid-api-key')||m.includes('auth/configuration-not-found')||m.includes('PERMISSION_DENIED');
}

async function initDemoData(){
    /* Step 1: Get an auth token by creating or signing in as admin.
       Firebase Auth API works independently of Firestore rules. */
    try{
        const cred=await auth.createUserWithEmailAndPassword('admin@gms.com','admin123');
        await db.collection('users').doc(cred.user.uid).set({role:'admin',name:'Marcus Chen',email:'admin@gms.com'});
    }catch(err){
        if(err.code==='auth/email-already-in-use'){
            /* Admin already exists — sign in to get auth token */
            const cred=await auth.signInWithEmailAndPassword('admin@gms.com','admin123');
            const doc=await db.collection('users').doc(cred.user.uid).get();
            if(!doc.exists)await db.collection('users').doc(cred.user.uid).set({role:'admin',name:'Marcus Chen',email:'admin@gms.com'});
        }else{
            throw err;
        }
    }

    /* Step 2: With auth token active, check if Firestore needs seeding */
    const snap=await db.collection('members').limit(1).get();
    if(snap.empty)await seedData();

    /* Step 3: Create remaining demo users (trainer, member) */
    for(const u of SEED_USERS.slice(1)){
        try{
            const cred=await auth.createUserWithEmailAndPassword(u.email,u.password);
            await db.collection('users').doc(cred.user.uid).set({role:u.role,name:u.name,email:u.email});
        }catch(err){
            if(err.code!=='auth/email-already-in-use')console.warn('User create skip:',u.email,err.message);
        }
    }

    /* Step 4: Sign out so the login screen appears clean */
    await auth.signOut();
}

/* ===== AUTH ===== */
async function handleLogin(e){
    e.preventDefault();
    const email=$('#loginEmail').value.trim(),pass=$('#loginPass').value;
    if(!email||!pass){toast('Enter email and password','warn');return;}
    try{await auth.signInWithEmailAndPassword(email,pass);}
    catch(err){
        const m={'auth/user-not-found':'No account with this email','auth/wrong-password':'Incorrect password','auth/invalid-credential':'Invalid email or password','auth/too-many-requests':'Too many attempts — wait a moment','auth/invalid-email':'Enter a valid email','auth/network-request-failed':'Network error — check connection'};
        toast(m[err.code]||'Login failed: '+err.message,'err');
    }
}
async function handleLogout(){await auth.signOut();curUser=null;curUserDoc=null;$('#app').classList.add('hidden');$('#loginScreen').classList.remove('hidden');$('#loginEmail').value='';$('#loginPass').value='';destroyCharts();}
async function showApp(){$('#loginScreen').classList.add('hidden');$('#app').classList.remove('hidden');
    const ini=curUserDoc.name.split(' ').map(w=>w[0]).join('');$('#sbAvatar').textContent=ini;$('#sbName').textContent=curUserDoc.name;
    $('#sbRole').textContent={admin:'Administrator',trainer:'Trainer',member:'Member'}[curUserDoc.role];
    $$('#sbNav a').forEach(a=>{const r=a.dataset.roles;a.style.display=r&&!r.split(',').includes(curUserDoc.role)?'none':'';});
    $('#logoutBtn').onclick=handleLogout;
    $('#tbDate').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    navigate('dashboard');}

/* ===== NAV ===== */
async function navigate(page){curPage=page;mPage=1;mSearch='';mFStatus='all';mFType='all';
    $$('#sbNav a').forEach(a=>a.classList.toggle('active',a.dataset.page===page));
    $('#pageTitle').textContent=titles[page]||page;closeSidebar();destroyCharts();
    const r={dashboard:renderDashboard,members:renderMembers,attendance:renderAttendance,payments:renderPayments,settings:renderSettings};if(r[page])await r[page]();}
function closeSidebar(){$('#sidebar').classList.remove('open');$('#sbOverlay').classList.remove('show');}

/* ===== DASHBOARD ===== */
async function renderDashboard(){if(curUserDoc.role==='member'){await renderMemberDash();return;}
    const[members,attendance,payments]=await Promise.all([getMembers(),getAttendance(),getPayments()]);
    const active=members.filter(m=>m.st==='Active').length;
    const today=new Date().toISOString().split('T')[0];
    const todayAtt=attendance.filter(a=>a.date===today).length;
    const inGym=attendance.filter(a=>!a.co);
    const rev=payments.filter(p=>p.st==='Paid'&&p.date.startsWith(new Date().toISOString().slice(0,7))).reduce((s,p)=>s+p.amt,0);
    const now=new Date(),expSoon=members.filter(m=>{const d=(new Date(m.ed)-now)/864e5;return d>0&&d<=30&&m.st==='Active';});
    $('#pageContent').innerHTML=`
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-users"></i></div><div><div class="stat-val" data-t="${active}">0</div><div class="stat-lbl">Active Members</div></div></div>
            <div class="stat-card"><div class="stat-icon green"><i class="fas fa-clipboard-check"></i></div><div><div class="stat-val" data-t="${todayAtt}">0</div><div class="stat-lbl">Today's Check-ins</div></div></div>
            <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-dollar-sign"></i></div><div><div class="stat-val" data-t="${rev}" data-f="c">${fmtC(rev)}</div><div class="stat-lbl">Monthly Revenue</div></div></div>
            <div class="stat-card"><div class="stat-icon red"><i class="fas fa-exclamation-circle"></i></div><div><div class="stat-val" data-t="${expSoon.length}">0</div><div class="stat-lbl">Expiring Soon</div></div></div>
        </div>
        <div class="charts-grid">
            <div class="card"><h3><span class="live-dot"></span>Attendance Trend (Last 7 Days)</h3><canvas id="chartAtt"></canvas></div>
            <div class="card"><h3>Membership Distribution</h3><canvas id="chartMs"></canvas></div>
        </div>
        ${expSoon.length?`<div class="card"><h3>Expiring in 30 Days</h3><div style="display:flex;flex-direction:column;gap:.5rem">${expSoon.map(m=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:.5rem .75rem;background:var(--bg-i);border-radius:var(--rs)"><div style="display:flex;align-items:center;gap:.6rem"><img src="${m.photo}" class="tbl-img"><span>${m.fn} ${m.ln}</span></div><div><span class="badge ${msB(m.ms)}">${m.ms}</span><span style="margin-left:.5rem;color:var(--warn);font-size:.85rem">${fmtD(m.ed)}</span></div></div>`).join('')}</div></div>`:''}
        <div class="card" style="margin-top:1rem"><h3><span class="live-dot"></span>Currently in Gym: <strong>${inGym.length}</strong></h3>${inGym.length?`<div class="active-list">${inGym.map(a=>{const m=members.find(x=>x.id===a.mid);return`<div class="active-item">${m?`<img src="${m.photo}">`:''}<div><div style="font-weight:600;font-size:.85rem">${a.mn}</div><div style="font-size:.75rem;color:var(--tx-d)">Since ${fmtT(a.ci)}</div></div></div>`;}).join('')}</div>`:'<p style="color:var(--tx-d);font-size:.9rem">No members currently checked in.</p>'}</div>`;
    $$('.stat-val[data-t]').forEach(el=>{if(el.dataset.f==='c')el.textContent=fmtC(el.dataset.t);else animV(el,parseInt(el.dataset.t));});
    setTimeout(()=>renderCharts(attendance,members),50);}

async function renderMemberDash(){const m=await findMemberByEmail(curUser.email);
    if(!m){$('#pageContent').innerHTML='<div class="empty"><i class="fas fa-user-slash"></i><p>Member profile not found. Contact admin.</p></div>';return;}
    const[allA,allP]=await Promise.all([getAttendance(),getPayments()]);
    const myA=allA.filter(a=>a.mid===m.id),myP=allP.filter(p=>p.mid===m.id),tot=myP.filter(p=>p.st==='Paid').reduce((s,p)=>s+p.amt,0);
    $('#pageContent').innerHTML=`
        <div class="profile-hero"><img src="${m.photo}"><div><h2>${m.fn} ${m.ln}</h2><p>${m.email} &bull; ${m.phone}</p><div style="margin-top:.5rem"><span class="badge ${stB(m.st)}">${m.st}</span><span class="badge ${msB(m.ms)}" style="margin-left:.5rem">${m.ms}</span></div></div></div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-calendar-check"></i></div><div><div class="stat-val">${m.st}</div><div class="stat-lbl">Membership Status</div></div></div>
            <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-clock"></i></div><div><div class="stat-val" style="font-size:1.1rem">${fmtD(m.ed)}</div><div class="stat-lbl">Expires On</div></div></div>
            <div class="stat-card"><div class="stat-icon green"><i class="fas fa-sign-in-alt"></i></div><div><div class="stat-val">${myA.length}</div><div class="stat-lbl">Total Check-ins</div></div></div>
            <div class="stat-card"><div class="stat-icon red"><i class="fas fa-wallet"></i></div><div><div class="stat-val">${fmtC(tot)}</div><div class="stat-lbl">Total Paid</div></div></div>
        </div>
        <div class="card" style="margin-bottom:1rem"><h3>Recent Attendance</h3><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Check In</th><th>Check Out</th><th>Duration</th></tr></thead><tbody>${myA.slice(-10).reverse().map(a=>`<tr><td>${fmtD(a.date)}</td><td>${fmtT(a.ci)}</td><td>${a.co?fmtT(a.co):'<span class="badge badge-ok">Active</span>'}</td><td>${a.co?Math.round((new Date(a.co)-new Date(a.ci))/36e5)+'h':'In Progress'}</td></tr>`).join('')||'<tr><td colspan="4" class="empty">No records</td></tr>'}</tbody></table></div></div>
        <div class="card"><h3>Payment History</h3><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead><tbody>${myP.map(p=>`<tr><td>${fmtD(p.date)}</td><td>${fmtC(p.amt)}</td><td>${p.method}</td><td><span class="badge ${stB(p.st)}">${p.st}</span></td></tr>`).join('')||'<tr><td colspan="4" class="empty">No records</td></tr>'}</tbody></table></div></div>`;}

/* ===== CHARTS ===== */
function cCol(){const a=document.documentElement.dataset.theme==='aqua';return a?{p:'#16ff00',s:'#00ffed',g:'rgba(110,184,214,.12)',t:'#6eb8d6'}:{p:'#8f43ee',s:'#f0eb8d',g:'rgba(160,152,152,.12)',t:'#a09898'};}
function renderCharts(att,mem){const c=cCol();const lb=[],ct=[];
    for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const ds=d.toISOString().split('T')[0];lb.push(d.toLocaleDateString('en-US',{month:'short',day:'numeric'}));ct.push(att.filter(a=>a.date===ds).length);}
    const c1=$('#chartAtt');if(c1){chartA=new Chart(c1,{type:'line',data:{labels:lb,datasets:[{label:'Check-ins',data:ct,borderColor:c.p,backgroundColor:c.p+'22',fill:true,tension:.4,pointBackgroundColor:c.p,pointRadius:5,pointHoverRadius:7}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:c.g},ticks:{color:c.t}},y:{beginAtZero:true,grid:{color:c.g},ticks:{color:c.t,stepSize:2}}}}});}
    const mc={Basic:0,Premium:0,VIP:0};mem.filter(m=>m.st==='Active').forEach(m=>mc[m.ms]++);
    const c2=$('#chartMs');if(c2){chartM=new Chart(c2,{type:'doughnut',data:{labels:['Basic','Premium','VIP'],datasets:[{data:[mc.Basic,mc.Premium,mc.VIP],backgroundColor:[c.p+'88',c.s+'88',c.p+'cc'],borderColor:c.p,borderWidth:2,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:c.t,padding:16,usePointStyle:true,pointStyle:'circle'}},tooltip:{callbacks:{label:x=>x.label+': '+x.raw+' members'}}}}});}}
function destroyCharts(){if(chartA){chartA.destroy();chartA=null;}if(chartM){chartM.destroy();chartM=null;}}

/* ===== MEMBERS ===== */
async function renderMembers(){const all=await getMembers();
    const f=all.filter(m=>{const ms=!mSearch||m.fn.toLowerCase().includes(mSearch)||m.ln.toLowerCase().includes(mSearch)||m.email.toLowerCase().includes(mSearch);return ms&&(mFStatus==='all'||m.st===mFStatus)&&(mFType==='all'||m.ms===mFType);});
    const tot=f.length,pages=Math.ceil(tot/PS);if(mPage>pages)mPage=1;const sl=f.slice((mPage-1)*PS,mPage*PS);const isA=curUserDoc.role==='admin';
    $('#pageContent').innerHTML=`
        <div class="pg-hdr"><h2>Members <span style="font-size:.85rem;color:var(--tx-d);font-weight:400">(${tot})</span></h2>${isA?'<button class="btn btn-p" onclick="showMemberForm()"><i class="fas fa-plus"></i> Add Member</button>':''}</div>
        <div class="filters"><input type="text" placeholder="Search by name or email..." value="${mSearch}" oninput="mSearch=this.value.toLowerCase();mPage=1;renderMembers()"><select onchange="mFStatus=this.value;mPage=1;renderMembers()"><option value="all" ${mFStatus==='all'?'selected':''}>All Status</option><option value="Active" ${mFStatus==='Active'?'selected':''}>Active</option><option value="Inactive" ${mFStatus==='Inactive'?'selected':''}>Inactive</option></select><select onchange="mFType=this.value;mPage=1;renderMembers()"><option value="all" ${mFType==='all'?'selected':''}>All Types</option><option value="Basic" ${mFType==='Basic'?'selected':''}>Basic</option><option value="Premium" ${mFType==='Premium'?'selected':''}>Premium</option><option value="VIP" ${mFType==='VIP'?'selected':''}>VIP</option></select></div>
        <div class="tbl-wrap"><table><thead><tr><th>Member</th><th>Email</th><th>Phone</th><th>Membership</th><th>Status</th><th>Expires</th>${isA?'<th>Actions</th>':''}</tr></thead><tbody>${sl.length?sl.map(m=>`<tr><td><div class="tbl-name"><img src="${m.photo}" class="tbl-img" style="cursor:pointer" onclick="showMemberDetail('${m.id}')"><span style="cursor:pointer" onclick="showMemberDetail('${m.id}')">${m.fn} ${m.ln}</span></div></td><td>${m.email}</td><td>${m.phone}</td><td><span class="badge ${msB(m.ms)}">${m.ms}</span></td><td><span class="badge ${stB(m.st)}">${m.st}</span></td><td>${fmtD(m.ed)}</td>${isA?`<td><div class="tbl-acts"><button class="btn btn-s btn-sm" onclick="showMemberForm('${m.id}')"><i class="fas fa-edit"></i></button><button class="btn btn-d btn-sm" onclick="confirmDel('${m.id}')"><i class="fas fa-trash"></i></button></div></td>`:''}</tr>`).join(''):`<tr><td colspan="${isA?7:6}" class="empty"><i class="fas fa-search"></i>No members found</td></tr>`}</tbody></table></div>
        ${pages>1?`<div class="pagi">${mPage>1?`<button onclick="mPage--;renderMembers()"><i class="fas fa-chevron-left"></i></button>`:''}${Array.from({length:pages},(_,i)=>`<button class="${i+1===mPage?'active':''}" onclick="mPage=${i+1};renderMembers()">${i+1}</button>`).join('')}${mPage<pages?`<button onclick="mPage++;renderMembers()"><i class="fas fa-chevron-right"></i></button>`:''}</div>`:''}`;}

async function showMemberDetail(id){const all=await getMembers();const m=all.find(x=>x.id===id);if(!m)return;
    const[allA,allP]=await Promise.all([getAttendance(),getPayments()]);const myA=allA.filter(a=>a.mid===id),myP=allP.filter(p=>p.mid===id);
    showModal(`<div class="detail-header"><img src="${m.photo}"><div><h3>${m.fn} ${m.ln}</h3><div style="margin-top:.3rem"><span class="badge ${stB(m.st)}">${m.st}</span><span class="badge ${msB(m.ms)}" style="margin-left:.5rem">${m.ms}</span></div></div></div>
        <div class="detail-grid"><div class="detail-item"><label>Email</label><p>${m.email}</p></div><div class="detail-item"><label>Phone</label><p>${m.phone}</p></div><div class="detail-item"><label>Start Date</label><p>${fmtD(m.sd)}</p></div><div class="detail-item"><label>End Date</label><p>${fmtD(m.ed)}</p></div><div class="detail-full detail-item"><label>Health Notes</label><p>${m.health||'None'}</p></div><div class="detail-full detail-item"><label>Emergency Contact</label><p>${m.ec||'Not provided'}</p></div></div>
        <div style="margin-top:1.25rem"><h4 style="margin-bottom:.5rem;font-size:.9rem;color:var(--tx-m)">Recent Attendance (${myA.length})</h4><div style="max-height:160px;overflow-y:auto"><table><thead><tr><th>Date</th><th>In</th><th>Out</th></tr></thead><tbody>${myA.slice(-5).reverse().map(a=>`<tr><td>${fmtD(a.date)}</td><td>${fmtT(a.ci)}</td><td>${a.co?fmtT(a.co):'--'}</td></tr>`).join('')||'<tr><td colspan="3" style="text-align:center;color:var(--tx-d)">No records</td></tr>'}</tbody></table></div></div>
        <div style="margin-top:1rem"><h4 style="margin-bottom:.5rem;font-size:.9rem;color:var(--tx-m)">Payments (${fmtC(myP.reduce((s,p)=>s+p.amt,0))})</h4><div style="max-height:160px;overflow-y:auto"><table><thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead><tbody>${myP.slice(-5).reverse().map(p=>`<tr><td>${fmtD(p.date)}</td><td>${fmtC(p.amt)}</td><td>${p.method}</td><td><span class="badge ${stB(p.st)}">${p.st}</span></td></tr>`).join('')||'<tr><td colspan="4" style="text-align:center;color:var(--tx-d)">No records</td></tr>'}</tbody></table></div></div>
        <div class="form-acts"><button class="btn btn-s" onclick="hideModal()">Close</button>${curUserDoc.role==='admin'?`<button class="btn btn-p" onclick="hideModal();showMemberForm('${m.id}')"><i class="fas fa-edit"></i> Edit</button>`:''}</div>`);}

function showMemberForm(id){if(id){db.collection('members').doc(id).get().then(d=>{if(d.exists)buildMF(d.data());});}else{buildMF(null);}}
function buildMF(m){const t=m?'Edit Member':'Add New Member';const su='https://picsum.photos/seed/'+Math.random().toString(36).slice(2,6)+'/100/100';
    showModal(`<h3 style="margin-bottom:1.25rem">${t}</h3><form id="mForm"><input type="hidden" name="id" value="${m?m.id:''}"><div class="fr"><div class="fg"><label>First Name</label><input name="fn" value="${m?m.fn:''}" required></div><div class="fg"><label>Last Name</label><input name="ln" value="${m?m.ln:''}" required></div></div><div class="fr"><div class="fg"><label>Email</label><input type="email" name="email" value="${m?m.email:''}" required></div><div class="fg"><label>Phone</label><input name="phone" value="${m?m.phone:''}" required></div></div><div class="fr"><div class="fg"><label>Membership</label><select name="ms"><option value="Basic" ${m&&m.ms==='Basic'?'selected':''}>Basic</option><option value="Premium" ${m&&m.ms==='Premium'?'selected':''}>Premium</option><option value="VIP" ${m&&m.ms==='VIP'?'selected':''}>VIP</option></select></div><div class="fg"><label>End Date</label><input type="date" name="ed" value="${m?m.ed:''}" required></div></div><div class="fg"><label>Photo URL</label><input name="photo" value="${m?m.photo:su}"></div><div class="fg"><label>Health Notes</label><textarea name="health" rows="2">${m?m.health:''}</textarea></div><div class="fg"><label>Emergency Contact</label><input name="ec" value="${m?m.ec:''}"></div><div class="form-acts"><button type="button" class="btn btn-s" onclick="hideModal()">Cancel</button><button type="submit" class="btn btn-p">${m?'Update':'Add'} Member</button></div></form>`);
    $('#mForm').onsubmit=async(e)=>{e.preventDefault();const fd=new FormData(e.target),data=Object.fromEntries(fd);const id=data.id;delete data.id;
        try{if(id){await updateMemberDoc(id,data);toast('Member updated','ok');}else{await addMemberDoc(data);toast('Member added','ok');}hideModal();renderMembers();}catch(err){toast('Error: '+err.message,'err');}};}

function confirmDel(id){db.collection('members').doc(id).get().then(d=>{if(!d.exists)return;const m=d.data();
    showModal(`<h3 style="margin-bottom:.75rem">Confirm Deletion</h3><p style="color:var(--tx-m);margin-bottom:1.5rem">Delete <strong>${m.fn} ${m.ln}</strong>? This also removes their attendance and payment records.</p><div class="form-acts"><button class="btn btn-s" onclick="hideModal()">Cancel</button><button class="btn btn-d" onclick="deleteMember('${m.id}')"><i class="fas fa-trash"></i> Delete</button></div>`);});}
async function deleteMember(id){try{await deleteMemberDoc(id);hideModal();toast('Member deleted','ok');renderMembers();}catch(err){toast('Error: '+err.message,'err');}}

/* ===== ATTENDANCE ===== */
async function renderAttendance(){const[allM,allA]=await Promise.all([getMembers(),getAttendance()]);
    const inGym=allA.filter(a=>!a.co),today=new Date().toISOString().split('T')[0];
    const todayLog=allA.filter(a=>a.date===today).sort((a,b)=>b.ci.localeCompare(a.ci));
    const canLog=curUserDoc.role==='admin'||curUserDoc.role==='trainer';
    const aIds=inGym.map(a=>a.mid),avail=allM.filter(m=>m.st==='Active'&&!aIds.includes(m.id));
    $('#pageContent').innerHTML=`
        <div class="pg-hdr"><h2>Attendance</h2></div>
        ${canLog?`<div class="att-quick"><h3><i class="fas fa-bolt" style="color:var(--hl);margin-right:.4rem"></i>Quick Check-In</h3><div class="att-form"><div class="fg"><label>Select Member</label><select id="attMember">${avail.map(m=>`<option value="${m.id}" data-n="${m.fn} ${m.ln}">${m.fn} ${m.ln}</option>`).join('')}</select></div><button class="btn btn-p" onclick="doCheckIn()" style="height:42px;margin-bottom:0"><i class="fas fa-sign-in-alt"></i> Check In</button></div></div>`:''}
        <div class="card" style="margin-bottom:1.5rem"><h3><span class="live-dot"></span>Currently in Gym: <strong>${inGym.length}</strong></h3>${inGym.length?`<div class="active-list">${inGym.map(a=>{const m=allM.find(x=>x.id===a.mid);return`<div class="active-item">${m?`<img src="${m.photo}">`:''}<div style="flex:1;min-width:0"><div style="font-weight:600;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.mn}</div><div style="font-size:.75rem;color:var(--tx-d)">Since ${fmtT(a.ci)}</div></div>${canLog?`<button class="btn btn-s btn-sm" onclick="doCheckOut('${a.id}')"><i class="fas fa-sign-out-alt"></i></button>`:''}</div>`;}).join('')}</div>`:'<p style="color:var(--tx-d);font-size:.9rem;padding:.5rem 0">No members currently checked in.</p>'}</div>
        <div class="card"><h3>Today's Log</h3><div class="tbl-wrap"><table><thead><tr><th>Member</th><th>Check In</th><th>Check Out</th><th>Duration</th><th>Status</th></tr></thead><tbody>${todayLog.length?todayLog.map(a=>{const dur=a.co?Math.round((new Date(a.co)-new Date(a.ci))/36e5)+'h '+Math.round(((new Date(a.co)-new Date(a.ci))%36e5)/6e4)+'m':'--';return`<tr><td>${a.mn}</td><td>${fmtT(a.ci)}</td><td>${a.co?fmtT(a.co):'--'}</td><td>${dur}</td><td>${a.co?'<span class="badge badge-ok">Completed</span>':'<span class="badge badge-acc">Active</span>'}</td></tr>`;}).join(''):'<tr><td colspan="5" class="empty"><i class="fas fa-clipboard"></i>No entries today</td></tr>'}</tbody></table></div></div>`;}
async function doCheckIn(){const sel=$('#attMember');if(!sel||!sel.value){toast('Select a member','warn');return;}const n=sel.selectedOptions[0].dataset.n;
    try{await checkInDoc(sel.value,n);toast(n+' checked in','ok');renderAttendance();}catch(err){toast('Error: '+err.message,'err');}}
async function doCheckOut(aid){try{await checkOutDoc(aid);toast('Checked out','ok');renderAttendance();}catch(err){toast('Error: '+err.message,'err');}}

/* ===== PAYMENTS ===== */
async function renderPayments(){const allP=await getPayments();
    const paid=allP.filter(p=>p.st==='Paid').reduce((s,p)=>s+p.amt,0);
    const pend=allP.filter(p=>p.st==='Pending').reduce((s,p)=>s+p.amt,0);
    const od=allP.filter(p=>p.st==='Overdue').reduce((s,p)=>s+p.amt,0);
    const isA=curUserDoc.role==='admin';
    $('#pageContent').innerHTML=`
        <div class="pg-hdr"><h2>Payments</h2>${isA?'<button class="btn btn-p" onclick="showPayForm()"><i class="fas fa-plus"></i> Record Payment</button>':''}</div>
        <div class="stats-grid">
            <div class="stat-card"><div class="stat-icon green"><i class="fas fa-check-circle"></i></div><div><div class="stat-val">${fmtC(paid)}</div><div class="stat-lbl">Total Paid</div></div></div>
            <div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-clock"></i></div><div><div class="stat-val">${fmtC(pend)}</div><div class="stat-lbl">Pending</div></div></div>
            <div class="stat-card"><div class="stat-icon red"><i class="fas fa-exclamation-circle"></i></div><div><div class="stat-val">${fmtC(od)}</div><div class="stat-lbl">Overdue</div></div></div>
            <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-receipt"></i></div><div><div class="stat-val">${allP.length}</div><div class="stat-lbl">Transactions</div></div></div>
        </div>
        <div class="tbl-wrap"><table><thead><tr><th>Member</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead><tbody>${allP.sort((a,b)=>b.date.localeCompare(a.date)).map(p=>`<tr><td>${p.mn}</td><td style="font-weight:600">${fmtC(p.amt)}</td><td>${p.method}</td><td>${fmtD(p.date)}</td><td><span class="badge ${stB(p.st)}">${p.st}</span></td></tr>`).join('')}</tbody></table></div>`;}

async function showPayForm(){const allM=await getMembers();const act=allM.filter(m=>m.st==='Active');
    showModal(`<h3 style="margin-bottom:1.25rem">Record Payment</h3><form id="pForm"><div class="fg"><label>Member</label><select name="mid" required>${act.map(m=>`<option value="${m.id}" data-n="${m.fn} ${m.ln}">${m.fn} ${m.ln}</option>`).join('')}</select></div>
        <div class="fr"><div class="fg"><label>Amount ($)</label><input type="number" name="amt" min="0" step="0.01" required></div><div class="fg"><label>Method</label><select name="method"><option>Card</option><option>Cash</option><option>UPI</option><option>Bank Transfer</option></select></div></div>
        <div class="fr"><div class="fg"><label>Date</label><input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" required></div><div class="fg"><label>Status</label><select name="st"><option>Paid</option><option>Pending</option></select></div></div>
        <div class="form-acts"><button type="button" class="btn btn-s" onclick="hideModal()">Cancel</button><button type="submit" class="btn btn-p">Record Payment</button></div></form>`);
    $('#pForm').onsubmit=async(e)=>{e.preventDefault();const fd=new FormData(e.target),data=Object.fromEntries(fd);data.amt=parseFloat(data.amt);data.mn=e.target.mid.selectedOptions[0].dataset.n;
        try{await addPaymentDoc(data);hideModal();toast('Payment recorded','ok');renderPayments();}catch(err){toast('Error: '+err.message,'err');}};}

/* ===== SETTINGS ===== */
function renderSettings(){const ct=document.documentElement.dataset.theme;
    $('#pageContent').innerHTML=`
        <div class="pg-hdr"><h2>Settings</h2></div>
        <div class="settings-section"><h3>Appearance</h3><p style="color:var(--tx-m);font-size:.85rem;margin-bottom:1rem">Choose your preferred color theme.</p>
            <div class="theme-options">
                <div class="theme-opt ${ct==='dark'?'active':''}" id="theme-opt" data-t="dark" onclick="applyTheme('dark')"><div class="swatch" style="background:linear-gradient(135deg,#2d2727,#8f43ee)"></div><span>Dark Mode</span><p style="font-size:.75rem;color:var(--tx-d);margin-top:.25rem">Warm dark with purple accent</p></div>
                <div class="theme-opt ${ct==='aqua'?'active':''}" id="theme-opt" data-t="aqua" onclick="applyTheme('aqua')"><div class="swatch" style="background:linear-gradient(135deg,#000,#16ff00)"></div><span>High-Energy Aqua</span><p style="font-size:.75rem;color:var(--tx-d);margin-top:.25rem">Black with neon green and cyan</p></div>
            </div>
        </div>
        <div class="settings-section"><h3>Account</h3><div style="display:flex;align-items:center;gap:1rem"><div class="avatar" style="width:48px;height:48px;font-size:1rem">${curUserDoc.name.split(' ').map(w=>w[0]).join('')}</div><div><div style="font-weight:600">${curUserDoc.name}</div><div style="font-size:.85rem;color:var(--tx-m)">${curUser.email}</div><div style="font-size:.8rem;color:var(--tx-d);text-transform:capitalize">${curUserDoc.role}</div></div></div></div>
        <div class="settings-section"><h3>Danger Zone</h3><p style="color:var(--tx-m);font-size:.85rem;margin-bottom:1rem">Reset all data to original demo state. Cannot be undone.</p><button class="btn btn-d" onclick="resetDemo()"><i class="fas fa-redo"></i> Reset Demo Data</button></div>`;}

function resetDemo(){showModal(`<h3 style="margin-bottom:.75rem">Reset Demo Data</h3><p style="color:var(--tx-m);margin-bottom:1.5rem">Delete all members, payments, and attendance, then re-seed. Continue?</p><div class="form-acts"><button class="btn btn-s" onclick="hideModal()">Cancel</button><button class="btn btn-d" onclick="doReset()"><i class="fas fa-redo"></i> Reset</button></div>`);}
async function doReset(){try{const b=db.batch();for(const c of['members','payments','attendance'])(await db.collection(c).get()).forEach(d=>b.delete(d.ref));await b.commit();await seedData();hideModal();toast('Demo data reset','ok');navigate(curPage);}catch(err){toast('Reset failed: '+err.message,'err');}}

/* ===== SETUP ERROR SCREEN ===== */
function showSetupScreen(errMsg){
    document.body.innerHTML=`<div style="position:fixed;inset:0;z-index:9999;background:#2d2727;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:'Segoe UI',system-ui,sans-serif">
        <div style="max-width:600px;text-align:center;color:#f0ece4">
            <div style="width:64px;height:64px;border-radius:16px;background:#8f43ee;display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;font-size:1.6rem;color:#fff"><i class="fas fa-dumbbell"></i></div>
            <h2 style="font-size:1.4rem;margin-bottom:.5rem;font-family:'Space Grotesk',sans-serif">Firebase Setup Required</h2>
            ${errMsg?`<p style="color:#f87171;margin-bottom:1rem;font-size:.9rem">${errMsg}</p>`:''}
            <p style="color:#a09898;margin-bottom:1.5rem;line-height:1.7">Open <strong style="color:#f0ece4">app.js</strong> and replace the placeholder <code style="background:#413543;padding:.15rem .5rem;border-radius:4px;font-size:.85rem">firebaseConfig</code> on line 10 with your Firebase project credentials.</p>
            <ol style="text-align:left;color:#a09898;line-height:2.4;font-size:.9rem;padding-left:1.5rem;margin-bottom:1.5rem">
                <li>Create a project at <strong style="color:#f0ece4">console.firebase.google.com</strong></li>
                <li>Build > Authentication > Sign-in method > enable <strong style="color:#f0ece4">Email/Password</strong></li>
                <li>Build > Firestore Database > Create in <strong style="color:#f0ece4">test mode</strong></li>
                <li>Add a <strong style="color:#f0ece4">Web app</strong> (the &lt;/&gt; icon) and copy the config</li>
                <li>Paste it into <code style="background:#413543;padding:.15rem .5rem;border-radius:4px;font-size:.85rem">app.js</code> line 10</li>
                <li>Set Firestore rules (see below) then <strong style="color:#f0ece4">refresh this page</strong></li>
            </ol>
            <div style="text-align:left;background:#413543;border-radius:8px;padding:1rem;font-size:.78rem;color:#a09898;font-family:monospace;line-height:1.7;margin-bottom:1.25rem;border:1px solid #5a4f52">rules_version = '2';<br>service cloud.firestore {<br>&nbsp;&nbsp;match /databases/{database}/documents {<br>&nbsp;&nbsp;&nbsp;&nbsp;match /{document=**} {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;allow read, write: if request.auth != null;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}</div>
            <p style="font-size:.82rem;color:#6b6161;line-height:1.6">Demo data auto-seeds on first load after valid config.<br>Demo accounts: admin / trainer / member (all @gms.com, password: admin123, trainer123, member123)</p>
        </div></div>`;
}

/* ================================================================
   BOOTSTRAP — Fixed ordering:
   1. Apply saved theme
   2. Bind static UI events
   3. Run seeding (creates admin → gets token → seeds Firestore → creates other users → signs out)
   4. ONLY THEN register onAuthStateChanged
   5. Manually check if user is already signed in (persisted session)
   ================================================================ */
applyTheme(localStorage.getItem('gms-theme')||'dark');
 $('#loginForm').onsubmit=handleLogin;
 $('#themeBtn').onclick=toggleTheme;
 $('#modalClose').onclick=hideModal;
 $('#modalOverlay').onclick=e=>{if(e.target===$('#modalOverlay'))hideModal();};
 $('#menuBtn').onclick=()=>{$('#sidebar').classList.toggle('open');$('#sbOverlay').classList.toggle('show');};
 $('#sbOverlay').onclick=closeSidebar;
 $$('#sbNav a').forEach(a=>a.onclick=e=>{e.preventDefault();navigate(a.dataset.page);});

/* Auth state handler — only called after seeding is complete */
async function handleAuthState(user){
    if(user){
        curUser=user;
        curUserDoc=await getUserDoc(user.uid);
        if(!curUserDoc){
            const seed=SEED_USERS.find(u=>u.email===user.email);
            curUserDoc={role:seed?seed.role:'member',name:seed?seed.name:(user.displayName||user.email.split('@')[0]),email:user.email};
            await db.collection('users').doc(user.uid).set(curUserDoc);
        }
        showApp();
    }else{
        curUser=null;curUserDoc=null;
        $('#app').classList.add('hidden');$('#loginScreen').classList.remove('hidden');destroyCharts();
    }
}

/* Main init sequence */
(async()=>{
    try{await initDemoData();}catch(err){
        console.error('Seed error:',err);
        if(isConfigErr(err)){showSetupScreen(err.message);return;}
    }
    auth.onAuthStateChanged(handleAuthState);
    if(auth.currentUser)await handleAuthState(auth.currentUser);
})();
