import { notFound } from 'next/navigation';
import { hasLocale } from '../dictionaries';
import Navigation from '../../components/Navigation/navigation';
import BookingForm from './reservaltion';


export default async function BookingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <BookingForm />
    </>
  );
}
