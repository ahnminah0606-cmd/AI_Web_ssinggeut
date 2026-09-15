import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'씽긋 · 내 생각이 자라는 시간',description:'짧은 영상에서 시작하는 나만의 질문. 씽씽과 자료를 탐구하고 토론을 준비해요.',icons:{icon:'/assets/logo.png'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
