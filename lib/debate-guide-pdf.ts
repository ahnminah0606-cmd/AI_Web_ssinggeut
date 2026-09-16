'use client';

export type StudentSummary={nickname:string;question:string;opinion:string;evidence:string;nextQuestion:string;updated?:string|null};
export type DebateGuide={groupName:string;topic:string;due?:string|null;students:StudentSummary[]};

let fontData='';
async function koreanFont(){
 if(fontData)return fontData;
 const response=await fetch('/fonts/GowunDodum-Regular.ttf');
 if(!response.ok)throw new Error('PDF 글꼴을 불러오지 못했어요.');
 const bytes=new Uint8Array(await response.arrayBuffer()),chunks:string[]=[];
 for(let i=0;i<bytes.length;i+=0x8000)chunks.push(String.fromCharCode(...bytes.subarray(i,i+0x8000)));
 fontData=btoa(chunks.join(''));return fontData;
}

export async function downloadDebateGuidePdf(data:DebateGuide){
 const [{jsPDF},font]=await Promise.all([import('jspdf'),koreanFont()]);
 const pdf=new jsPDF({unit:'mm',format:'a4'});
 pdf.addFileToVFS('GowunDodum-Regular.ttf',font);pdf.addFont('GowunDodum-Regular.ttf','GowunDodum','normal');pdf.setFont('GowunDodum');
 const footer=()=>{pdf.setDrawColor(202,228,243);pdf.line(14,284,196,284);pdf.setFontSize(8);pdf.setTextColor(114,145,164);pdf.text('학생의 최종 준비 기록을 모은 선생님용 토론 진행 자료입니다. AI 대화 원문은 포함하지 않습니다.',105,290,{align:'center'})};
 const nextPage=()=>{footer();pdf.addPage();return 18};
 pdf.setFillColor(235,247,255);pdf.roundedRect(14,14,182,35,5,5,'F');pdf.setTextColor(26,70,101);pdf.setFontSize(22);pdf.text('씽긋 토론 진행 자료',22,29);pdf.setFontSize(10);pdf.setTextColor(73,119,148);pdf.text(`${data.groupName} · 준비 완료 ${data.students.length}명`,22,40);
 pdf.setTextColor(25,53,77);pdf.setFontSize(13);pdf.text(data.topic,18,62);if(data.due){pdf.setFontSize(10);pdf.setTextColor(91,126,148);pdf.text(`토론 일시  ${new Date(data.due).toLocaleString('ko-KR')}`,18,71)}
 let y=data.due?84:76;pdf.setFontSize(14);pdf.setTextColor(36,129,180);pdf.text('학생별 최종 결론 목차',18,y);y+=10;pdf.setFontSize(10);pdf.setTextColor(25,53,77);
 data.students.forEach((s,i)=>{if(y>272)y=nextPage();pdf.text(`${i+1}. ${s.nickname} - ${s.opinion||'최종 결론 미작성'}`,20,y,{maxWidth:172});y+=pdf.splitTextToSize(`${i+1}. ${s.nickname} - ${s.opinion||'최종 결론 미작성'}`,172).length*5+2});
 for(const [i,s] of data.students.entries()){
  const sections=[['질문',s.question],['최종 결론',s.opinion],['근거',s.evidence],['더 살펴볼 질문',s.nextQuestion||'없음']];
  const measured=sections.map(([label,value])=>({label,value,lines:pdf.splitTextToSize(value||'작성하지 않음',170)}));
  const blockHeight=18+measured.reduce((height,section)=>height+6+section.lines.length*5.5+7,0);
  if(y+blockHeight>278)y=nextPage();pdf.setFillColor(245,251,255);pdf.roundedRect(14,y,182,12,3,3,'F');pdf.setFontSize(14);pdf.setTextColor(36,129,180);pdf.text(`${i+1}. ${s.nickname}`,19,y+8);y+=18;
  for(const {label,lines} of measured){pdf.setFontSize(10);pdf.setTextColor(91,126,148);pdf.text(label,19,y);y+=6;pdf.setFontSize(11);pdf.setTextColor(25,53,77);pdf.text(lines,19,y);y+=lines.length*5.5+7}
 }
 footer();const safe=(data.groupName+'-'+data.topic+'-토론진행자료').replace(/[\\/:*?"<>|]/g,'-');pdf.save(safe+'.pdf');
}
