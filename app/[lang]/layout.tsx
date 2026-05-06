import { hasLocale } from './dictionaries'
import { notFound } from 'next/navigation'
import Navigation from '../components/Navigation/navigation'
import Footer from '../components/footer'
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'mn' }]
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return <>
      <Navigation lang={lang}/>
  {children}
  <Footer/>
  </>
}
