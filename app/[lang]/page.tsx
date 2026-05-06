import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import Hero from '../components/home/hero';
import About from '../components/home/about';
import Services from '../components/home/services';
import Accommodation from '../components/home/accommodations';
import Location from '../components/home/location';
import Contact from '../components/home/contact';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>

      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Services dict={dict.services} />
      <Accommodation dict={dict.accommodations} lang={lang} />
      <Location dict={dict.location} />
      <Contact dict={dict.contact} />
    </>
  );
}
