/** Site-curated material. Teachers choose a lesson, students form their own questions. */
export const topicCatalog = [{
 id: 'joseon-princes',
 title: '이방원의 왕자의 난은 정당화될 수 있을까?',
 videoTitle: '조선의 시작, 그리고 왕자의 난',
 video: '/assets/history.mp4', poster:'/assets/history.png', cover:'/assets/history.png', category:'역사', guide:'우리역사넷과 태조실록에서 사건의 과정과 기록의 관점을 비교해 보자.',
 context: '제공된 역사 영상을 보고 이방원의 선택과 그 결과를 살펴봅니다. 각자 궁금한 점을 만들고 자료에서 근거를 확인한 뒤 자신의 입장을 정리합니다. 찬성이나 반대를 미리 정하지 않아도 됩니다. 참고 자료: 우리역사넷 「왕자의 난」, 태조실록 1398년 8월 26일 기사.',
},
{"id": "school-phone", "title": "학교는 쉬는 시간에도 휴대전화 사용을 제한해야 할까?", "videoTitle": "같은 쉬는 시간", "video": "/assets/school-phone.mp4", "poster": "/assets/school-phone.png", "cover": "/assets/school-phone-cover.svg", "category": "학교생활", "guide": "우리 학교 생활규정의 휴대전화 조항을 읽고, 실제 사용 목적과 불편을 조사해 보자.", "context": "토론을 위한 가상의 상황이다. 실제 사건이나 통계가 아니다. 영상 내용: 쉬는 시간에 한 학생은 휴대전화로 그림을 그리고, 다른 학생은 게임을 하고, 또 다른 학생은 가족에게 연락한다. 종이 울리고 학생들이 휴대전화를 가방에 넣는다. 영상에 없는 동기나 결과를 사실로 단정하지 않는다. 학생이 스스로 질문과 판단 근거를 찾도록 돕는다."},
{"id": "ai-homework", "title": "AI의 도움을 받아 만든 과제를 내 결과물로 인정할 수 있을까?", "videoTitle": "세 개의 과제", "video": "/assets/ai-homework.mp4", "poster": "/assets/ai-homework.png", "cover": "/assets/ai-homework-cover.svg", "category": "디지털", "guide": "과제의 평가 기준과 AI 사용 지침을 확인하고, 어떤 도움을 받았는지 구분해 보자.", "context": "토론을 위한 가상의 상황이다. 실제 사건이나 통계가 아니다. 영상 내용: 한 학생은 AI에게 모르는 용어의 설명을 듣고 자기 글을 쓴다. 다른 학생은 AI의 아이디어를 참고한다. 또 다른 학생은 AI가 쓴 문장을 과제에 붙인다. 세 학생이 과제를 제출한다. 영상에 없는 동기나 결과를 사실로 단정하지 않는다. 학생이 스스로 질문과 판단 근거를 찾도록 돕는다."},
{"id": "class-vote", "title": "학급의 결정은 다수결로 정하면 공정할까?", "videoTitle": "우리 반의 하루", "video": "/assets/class-vote.mp4", "poster": "/assets/class-vote.png", "cover": "/assets/class-vote-cover.svg", "category": "공동체", "guide": "학급 의사결정 규칙을 찾아보고, 서로 다른 결정 방식의 결과를 비교해 보자.", "context": "토론을 위한 가상의 상황이다. 실제 사건이나 통계가 아니다. 영상 내용: 가상의 학급 학생 10명이 학급 활동을 정한다. 7명은 공놀이, 3명은 보드게임을 고른다. 교사가 칠판에 7표와 3표를 적는다. 보드게임을 고른 한 학생은 다리에 깁스를 하고 있다. 아직 활동은 정해지지 않았다. 영상에 없는 동기나 결과를 사실로 단정하지 않는다. 학생이 스스로 질문과 판단 근거를 찾도록 돕는다."},
{"id": "museum-return", "title": "박물관은 다른 나라에서 가져온 문화유산을 돌려줘야 할까?", "videoTitle": "유물의 두 장소", "video": "/assets/museum-return.mp4", "poster": "/assets/museum-return.png", "cover": "/assets/museum-return-cover.svg", "category": "사회", "guide": "실제 반환 사례 하나를 골라 반출 경위, 소유권 관련 자료, 양쪽 기관의 설명을 확인해 보자.", "context": "토론을 위한 가상의 상황이다. 실제 사건이나 통계가 아니다. 영상 내용: 가상의 유물은 A국에서 만들어졌고 현재 B국 박물관에 전시되어 있다. A국의 박물관은 반환 요청 편지를 보낸다. B국 박물관에는 관람객이 있다. 유물이 옮겨진 경위는 제시되지 않는다. 영상에 없는 동기나 결과를 사실로 단정하지 않는다. 학생이 스스로 질문과 판단 근거를 찾도록 돕는다."}];

export const lessonForTitle=(title?:string)=>topicCatalog.find(t=>t.title===title)||topicCatalog[0];
