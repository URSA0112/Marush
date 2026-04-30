"use client";

import { useState } from "react";
import BookingForm from "./reservaltion";

type ReservationType = {
  name: string;
  date: string;
  time: string;
  guests: number;
};

export default function Reservation() {
  const [form, setForm] = useState<ReservationType>({
    name: "",
    date: "",
    time: "",
    guests: 1,
  });

  const [reservations, setReservations] = useState<ReservationType[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "guests"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setReservations([...reservations, form]);

    setForm({
      name: "",
      date: "",
      time: "",
      guests: 1,
    });
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Reservation</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2"/>
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2"/>
        <input type="time" name="time" value={form.time} onChange={handleChange} className="border p-2"/>
        <input type="number" name="guests" value={form.guests} onChange={handleChange} min="1" className="border p-2"/>

        <button className="bg-black text-white p-2">Reserve</button>
      </form>

      {/* Reservation List */}
      <div className="mt-6">
        <h3 className="font-semibold">Reservations</h3>
        {reservations.length === 0 ? (
          <p>No reservations yet</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {reservations.map((r, i) => (
              <li key={i} className="border p-2 rounded">
                {r.name} — {r.date} at {r.time} ({r.guests} guests)
              </li>
            ))}
          </ul>
        )}
      </div>
      <BookingForm/>
    </div>
  );
}