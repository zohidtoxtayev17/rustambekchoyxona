import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { languageStorageKey, metadata, translate, type Language } from './translations';
const LanguageContext = createContext<{language: Language; setLanguage: (language: Language) => void}>({language:'uz',setLanguage:()=>{}});
export function LanguageProvider({children}: {children: ReactNode}) {
 const [language,setLanguage] = useState<Language>('uz');
 const [ready,setReady] = useState(false);
 useEffect(()=>{try { if (localStorage.getItem(languageStorageKey) === 'en') setLanguage('en'); } catch { /* Storage is optional. */ } setReady(true);},[]);
 useEffect(()=>{
  document.documentElement.lang = language;
  document.title = metadata[language].title;
  for (const selector of ['meta[name="description"]','meta[property="og:description"]']) document.querySelector(selector)?.setAttribute('content',metadata[language].description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',metadata[language].title);
  if (ready) { try { localStorage.setItem(languageStorageKey,language); } catch { /* Storage is optional. */ } }
 },[language,ready]);
 return <LanguageContext.Provider value={{language,setLanguage}}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { const context = useContext(LanguageContext); return {...context,t:(text:string)=>translate(text,context.language)}; }
export function LanguageSwitcher() {
 const {language,setLanguage} = useLanguage();
 return <div className="flex shrink-0 items-center text-sm" role="group" aria-label={language === 'uz' ? 'Tilni tanlash' : 'Choose language'}>{(['uz','en'] as const).map((value,index)=><span className="flex items-center" key={value}>{index > 0 && <span aria-hidden="true" className="text-on-dark-muted">|</span>}<Button variant="ghost" className={`h-11 min-w-11 px-2 hover:bg-forest hover:text-gold ${language === value ? 'font-semibold text-gold underline underline-offset-4' : 'text-on-dark-muted'}`} aria-pressed={language === value} aria-label={value === 'uz' ? 'O‘zbekcha' : 'English'} onClick={()=>setLanguage(value)}>{value.toUpperCase()}</Button></span>)}</div>;
}
