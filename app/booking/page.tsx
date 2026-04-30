"use client";

import { useState } from "react";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Reservation data:", form);

    alert("Reservation submitted!");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Make a Reservation</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          type="number"
          name="guests"
          min="1"
          value={form.guests}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:opacity-80"
        >
          Reserve
        </button>
      </form>
    </div>
  );
}