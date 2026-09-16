import {topicCatalog} from './topic-catalog';
const DATA='ssinggeut-demo-v1', ACCOUNT='ssinggeut-demo-account';
export const demoAccounts=[{id:'선생님',nickname:'체험 선생님',role:'teacher'},...Array.from({length:6},(_,i)=>({id:`학생0${i+1}`,nickname:`학생 ${i+1}`,role:'student'}))];
export function demoAccount(){return typeof window==='undefined'?null:sessionStorage.getItem(ACCOUNT)}
export function loginDemo(id:string){if(!demoAccounts.some(a=>a.id===id.trim()))throw new Error('선생님 또는 학생01~학생06을 입력해 주세요.');sessionStorage.setItem(ACCOUNT,id.trim());window.location.reload()}
export function exitDemo(){sessionStorage.removeItem(ACCOUNT);window.location.reload()}
const stamp=()=>new Date().toISOString();
function load(){const saved=localStorage.getItem(DATA);if(saved)return JSON.parse(saved);const c=topicCatalog[0];return {groups:[{id:'demo-group',owner:'선생님',name:'체험 토론반',code:'DEMO0001',created:stamp()}],topics:[{id:'demo-topic',group_id:'demo-group',title:c.title,context:c.context,due:new Date(Date.now()+7*86400000).toISOString(),created:stamp()}],members:demoAccounts.map(a=>({group_id:'demo-group',user_id:a.id})),sessions:[],messages:[],allocations:[],attendance:[]}}
function persist(d:any){try{localStorage.setItem(DATA,JSON.stringify(d))}catch{throw new Error('브라우저 저장 공간이 부족해 체험 기록을 저장하지 못했어요.')}}
export async function demoRequest(query='',body?:any){
 const uid=demoAccount(),user=demoAccounts.find(a=>a.id===uid);if(!user)throw new Error('체험 계정을 선택해 주세요.');
 const d=load(),p=new URLSearchParams(query),action=body?.action||p.get('action');
 const owner=(gid:string)=>{const g=d.groups.find((g:any)=>g.id===gid&&g.owner===uid);if(!g)throw new Error('그룹 선생님만 할 수 있어요.');return g};
 const member=(gid:string)=>{if(!d.members.some((m:any)=>m.group_id===gid&&m.user_id===uid))throw new Error('이 그룹에 참여해 주세요.')};
 const session=(id:string)=>{const s=d.sessions.find((s:any)=>s.id===id&&s.owner===uid);if(!s)throw new Error('내 기록만 열 수 있어요.');return s};
 const roster=(gid:string)=>demoAccounts.filter(a=>a.role==='student'&&d.members.some((m:any)=>m.group_id===gid&&m.user_id===a.id));
 const latest=(tid:string,id:string)=>d.sessions.filter((s:any)=>s.topic_id===tid&&s.owner===id).sort((a:any,b:any)=>b.updated.localeCompare(a.updated))[0];
 const allocation=(gid:string,tid?:string)=>d.allocations.filter((a:any)=>a.group_id===gid&&(!tid||a.topic_id===tid)).at(-1)||null;
 const lesson=(g:any,t:any)=>{const students=roster(g.id).map(r=>{const s=latest(t.id,r.id);return {id:r.id,nickname:r.nickname,active:!!s&&(!!(s.question||s.opinion||s.evidence)||d.messages.some((m:any)=>m.session_id===s.id)),complete:!!s?.complete,stance:s?.stance||'undecided',updated:s?.updated||null}});return {...t,students,active:students.filter(s=>s.active).length,complete:students.filter(s=>s.complete).length,pro:students.filter(s=>s.complete&&s.stance==='pro').length,con:students.filter(s=>s.complete&&s.stance==='con').length,allocation:allocation(g.id,t.id)}};
 const touch=()=>{const day=new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'});if(!d.attendance.some((a:any)=>a.user_id===uid&&a.day===day))d.attendance.push({user_id:uid,day})};
 if(!body){
 if(action==='teacher-summary'){if(user.role!=='teacher')throw new Error('선생님 화면이에요.');return {groups:d.groups.filter((g:any)=>g.owner===uid).map((g:any)=>({...g,studentCount:roster(g.id).length,topics:d.topics.filter((t:any)=>t.group_id===g.id).slice().reverse().map((t:any)=>lesson(g,t))}))}}
 if(action==='session'){const s=session(p.get('id')||'');return {session:s,messages:d.messages.filter((m:any)=>m.session_id===s.id)}}
 if(action==='group'){const gid=p.get('id')||'';member(gid);const g=d.groups.find((g:any)=>g.id===gid),ts=d.topics.filter((t:any)=>t.group_id===gid).slice().reverse(),a=allocation(gid);return {group:g,topics:ts,roster:g.owner===uid?roster(gid):[],progress:[],allocation:a?{...a,assignments:JSON.stringify(a.assignments)}:null}}
 return {signedIn:true,demo:true,admin:false,profile:{...user},groups:d.groups.filter((g:any)=>d.members.some((m:any)=>m.group_id===g.id&&m.user_id===uid)),sessions:d.sessions.filter((s:any)=>s.owner===uid).slice().reverse(),attendance:d.attendance.filter((a:any)=>a.user_id===uid)};
 }
 let result:any={ok:true};
 if(action==='session-create'){const t=d.topics.find((t:any)=>t.id===body.topicId);if(!t)throw new Error('배정된 주제를 선택해 주세요.');member(t.group_id);const id=crypto.randomUUID();d.sessions.push({id,owner:uid,topic_id:t.id,title:t.title,question:'',opinion:'',evidence:'',next_question:'',stance:'undecided',complete:0,created:stamp(),updated:stamp()});result={id}}
 else if(action==='save'){const s=session(body.sessionId);if(body.complete&&(!body.question?.trim()||!body.opinion?.trim()||!body.evidence?.trim()))throw new Error('질문, 내 생각, 근거를 적어 주세요.');Object.assign(s,{question:body.question||'',opinion:body.opinion||'',evidence:body.evidence||'',next_question:body.nextQuestion||'',stance:body.stance,complete:body.complete?1:0,updated:stamp()});touch()}
 else if(action==='chat'){const s=session(body.sessionId);const answer='[체험 응답] 그 생각을 확인하려면 어떤 자료가 필요할까? 영상에서 기억나는 장면 하나를 골라 네 질문으로 적어 보자.';d.messages.push({id:crypto.randomUUID(),session_id:s.id,role:'user',content:body.message,created:stamp()},{id:crypto.randomUUID(),session_id:s.id,role:'assistant',content:answer,created:stamp()});s.updated=stamp();touch();result={answer}}
 else if(action==='group-create'){if(user.role!=='teacher')throw new Error('선생님만 그룹을 만들 수 있어요.');const id=crypto.randomUUID();d.groups.push({id,owner:uid,name:body.name,code:crypto.randomUUID().slice(0,8).toUpperCase(),created:stamp()});d.members.push({group_id:id,user_id:uid});result={id}}
 else if(action==='group-join'){const g=d.groups.find((g:any)=>g.code===body.code.trim().toUpperCase());if(!g)throw new Error('코드를 확인해 주세요.');if(!d.members.some((m:any)=>m.group_id===g.id&&m.user_id===uid))d.members.push({group_id:g.id,user_id:uid});result={id:g.id}}
 else if(action==='topic-create'){owner(body.groupId);const c=topicCatalog.find(t=>t.id===body.catalogId);if(!c||!Number.isFinite(Date.parse(body.due))||Date.parse(body.due)<=Date.now())throw new Error('주제와 앞으로의 날짜를 선택해 주세요.');const id=crypto.randomUUID();d.topics.push({id,group_id:body.groupId,title:c.title,context:c.context,due:body.due,created:stamp()});result={id}}
 else if(action==='allocate'){const g=owner(body.groupId);if(!d.topics.some((t:any)=>t.id===body.topicId&&t.group_id===g.id))throw new Error('그룹의 주제를 선택해 주세요.');const rs=roster(g.id),counts:Record<string,number>={};d.allocations.filter((a:any)=>a.group_id===g.id).forEach((a:any)=>a.assignments.forEach((r:any)=>{if(r.role!=='jury')counts[r.id]=(counts[r.id]||0)+1}));const candidates=(stance:string)=>rs.filter(r=>{const s=latest(body.topicId,r.id);return s?.complete&&s.stance===stance}).sort((a,b)=>(counts[a.id]||0)-(counts[b.id]||0)||a.id.localeCompare(b.id));const pro=candidates('pro'),con=candidates('con'),n=Math.min(3,pro.length,con.length);if(!n)throw new Error('준비 완료한 찬성과 반대가 각각 1명 이상 필요해요.');const assignments=rs.map(r=>({id:r.id,nickname:r.nickname,role:pro.slice(0,n).some(a=>a.id===r.id)?'pro':con.slice(0,n).some(a=>a.id===r.id)?'con':'jury'}));d.allocations.push({id:crypto.randomUUID(),group_id:g.id,topic_id:body.topicId,assignments,created:stamp()});result={assignments}}
 else throw new Error('이 기능은 실제 계정에서 이용해 주세요.');
 persist(d);return result;
}
