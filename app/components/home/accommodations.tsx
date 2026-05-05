'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import BookingButton from './bookingBtn';
import type { Dict } from '../../[lang]/dictionaries';

type AmenityKey = keyof Dict['accommodations']['amenities'];

const roomData = [
  {
    index: 0, size: 20, minGuests: 1, maxGuests: 2, count: 8,
    price: '₮700,000', priceNum: 700000, usd: '≈ USD 195', featured: false,
    amenityKeys: ['wifi', 'breakfast', 'nosmoking', 'bathroom', 'heating', 'tv'] as AmenityKey[],
    amenityIcons: ['📶', '🍳', '🚭', '🚿', '🔥', '📺'],
  },
  {
    index: 1, size: 45, minGuests: 3, maxGuests: 4, count: 6,
    price: '₮900,000', priceNum: 900000, usd: '≈ USD 250', featured: false,
    amenityKeys: ['wifi', 'breakfast', 'nosmoking', 'bathroom', 'heating', 'tv', 'seating'] as AmenityKey[],
    amenityIcons: ['📶', '🍳', '🚭', '🚿', '🔥', '📺', '🛋️'],
  },
  {
    index: 2, size: 57, minGuests: 4, maxGuests: 6, count: 3,
    price: '₮1,200,000', priceNum: 1200000, usd: '≈ USD 335', featured: false,
    amenityKeys: ['wifi', 'breakfast', 'nosmoking', 'bathroom', 'heating', 'tv', 'seating', 'mountain'] as AmenityKey[],
    amenityIcons: ['📶', '🍳', '🚭', '🚿', '🔥', '📺', '🛋️', '🏔️'],
  },
  {
    index: 3, size: 57, minGuests: 1, maxGuests: 2, count: 1,
    price: '₮1,500,000', priceNum: 1500000, usd: '≈ USD 420', featured: true,
    amenityKeys: ['wifi', 'breakfast', 'nosmoking', 'luxury_bath', 'heating', 'tv', 'lounge', 'panorama', 'spa'] as AmenityKey[],
    amenityIcons: ['📶', '🍳', '🚭', '🛁', '🔥', '📺', '🛋️', '🏔️', '🧖'],
  },
];

export default function Accommodation({ dict, bookingDict }: { dict: Dict['accommodations']; bookingDict: Dict['booking'] }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="accommodations" ref={ref} className="bg-cream-warm py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-5"
        >
          <div>
            <span className="block text-[0.62rem] tracking-[0.4em] uppercase mb-4 text-gold">{dict.eyebrow}</span>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] font-light leading-tight text-ink">
              {dict.line1}<br />
              <em className="not-italic text-gold">{dict.italic}</em>
            </h2>
          </div>
          <p className="max-w-sm text-[0.84rem] leading-relaxed text-stone">{dict.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2.5 text-[0.78rem] mb-14 text-gold"
        >
          <span className="flex items-center justify-center w-5 h-5 border border-gold/20 rounded-full text-[9px]">✓</span>
          {dict.breakfast_note}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomData.map((room, i) => {
            const amenities = room.amenityKeys.map((key, ki) => ({ icon: room.amenityIcons[ki], label: dict.amenities[key] }));
            const roomType  = dict.room_types[room.index];
            const roomName  = dict.room_names[room.index];

            return (
              <motion.div
                key={room.index}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col h-full p-7 border border-gold/15 transition-all duration-300 ${
                  room.featured
                    ? 'bg-paper shadow-[0_0_40px_rgba(198,164,108,0.1)]'
                    : 'bg-paper hover:border-gold/30'
                }`}
              >
                {room.featured && (
                  <span className="absolute top-5 right-5 text-[0.58rem] tracking-[0.22em] uppercase px-2.5 py-1 border border-gold/20 text-gold">
                    {dict.suite_badge}
                  </span>
                )}

                <div className="space-y-1.5 mb-1">
                  <span className="block text-[0.58rem] tracking-[0.32em] uppercase text-gold/55">{roomType}</span>
                  <span className="block text-[0.85rem] tracking-[0.12em] uppercase font-light text-gold">{roomName}</span>
                </div>

                <div className="font-serif text-[3rem] font-light leading-none mt-3 text-ink">
                  {room.size}<span className="text-base text-stone/55 ml-1">m²</span>
                </div>

                <div className="h-px my-5 bg-gold/12" />

                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-5">
                  {amenities.map(a => (
                    <span key={a.label} className="flex items-center gap-1 text-[0.62rem] text-stone">
                      <span>{a.icon}</span><span>{a.label}</span>
                    </span>
                  ))}
                </div>

                <div className="space-y-3 text-[0.82rem]">
                  <div className="flex justify-between">
                    <span className="text-stone">{dict.guests_label}</span>
                    <span className="text-ink">{room.minGuests}–{room.maxGuests}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone">{dict.available_label}</span>
                    <span className="px-3 py-0.5 text-[0.62rem] border border-gold/20 text-gold">
                      {room.count} {room.count === 1 ? dict.room_singular : dict.room_plural}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gold/12 space-y-2">
                  <div className="font-serif text-[1.6rem] font-light text-ink">{room.price}</div>
                  <div className="text-[0.7rem] text-stone/55">{dict.per_night} · {room.usd}</div>
                  <div className="flex items-center gap-2 text-[0.68rem] text-gold pb-1">
                    <span className="flex items-center justify-center w-4 h-4 border border-gold/20 rounded-full text-[8px]">✓</span>
                    {dict.breakfast_included}
                  </div>
                  <BookingButton
                    roomName={roomName} roomType={roomType} size={room.size}
                    price={room.price} priceNum={room.priceNum} usd={room.usd}
                    amenities={amenities} maxGuests={room.maxGuests}
                    dict={bookingDict}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
