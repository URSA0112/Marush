"use client";

import React, { useState, useCallback } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
  isWithinInterval,
  isBefore,
  startOfToday,
  differenceInCalendarDays,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DateRange {
  start: Date | null;
  end: Date | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const pricePerDay = 250;
const tw = {
  // Typography scales
  eyebrow:    "text-[10px] uppercase tracking-[0.22em]",
  label:      "text-[10px] uppercase tracking-[0.14em]",
  monthLabel: "text-[13px] uppercase tracking-[0.12em]",

  // Color utilities
  gold:  "text-[var(--gold)]",
  stone: "text-[var(--stone)]",
  cream: "text-[var(--cream)]",

  // Shared border styles
  borderGold:   "border border-[rgba(201,168,76,0.2)]",
  borderSubtle: "border-b border-white/5",

  // Reused compound patterns
  navBtn: [
    "w-8 h-8 flex items-center justify-center rounded-full",
    "border border-[rgba(201,168,76,0.2)]",
    "hover:border-[var(--gold)] hover:text-[var(--gold)]",
    "transition-colors",
  ].join(" "),

  cellInner: [
    "z-10 w-8 h-8 flex items-center justify-center",
    "rounded-full text-sm transition-all",
  ].join(" "),

  // Cell state variants (applied conditionally)
  cellSelected:    "bg-[var(--gold)] text-black scale-105 shadow-md",
  cellHoverable:   "text-[var(--cream)] hover:bg-[rgba(201,168,76,0.15)]",
  cellRangeBg:     "absolute inset-0 bg-[rgba(201,168,76,0.07)]",
  cellTodayDot:    "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--gold)] opacity-60",
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DateSlot({
  label,
  value,
  align = "left",
}: {
  label: string;
  value: string | null;
  align?: "left" | "right";
}) {
  return (
    <div className={cn("flex-1", align === "right" && "text-right")}>
      <p className={cn(tw.label, tw.stone , "text-gold")}>{label}</p>
      <p className={cn("text-2xl italic", tw.cream)}>{value ?? "—"}</p>
    </div>
  );
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} aria-label={label} className={tw.navBtn}>
      {children}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DateRangePicker() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange]               = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate]       = useState<Date | null>(null);

  const today = startOfToday();

  const nights =
    range.start && range.end
      ? Math.max(0, differenceInCalendarDays(range.end, range.start))
      : 0;

  // ── Interaction ──────────────────────────────────────────────────────────

  const handleDateClick = useCallback(
    (day: Date) => {
      if (isBefore(day, today)) return;
      if (!range.start || range.end || day < range.start) {
        setRange({ start: day, end: null });
      } else if (isSameDay(day, range.start)) {
        setRange({ start: null, end: null });
      } else {
        setRange((r) => ({ ...r, end: day }));
      }
    },
    [range, today]
  );

  const isInRange = useCallback(
    (day: Date): boolean => {
      if (range.start && range.end)
        return isWithinInterval(day, { start: range.start, end: range.end });
      if (range.start && hoverDate && !range.end && hoverDate >= range.start)
        return isWithinInterval(day, { start: range.start, end: hoverDate });
      return false;
    },
    [range, hoverDate]
  );

  // ── Calendar data ────────────────────────────────────────────────────────

  const calendarDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end:   endOfWeek(endOfMonth(currentMonth)),
  });

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div
      className="w-80 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklch,var(--green-yellow)_55%,transparent)] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
      onMouseLeave={() => setHoverDate(null)}
    >

      {/* ── Hero ── */}
      <div className="p-7 pb-6 border-b border-[var(--border)] bg-gradient-to-br from-[rgba(201,168,76,0.1)] to-transparent">
        <p className={cn(tw.eyebrow, tw.gold, "opacity-70 mb-4")}>
          Marush Resort · Select dates
        </p>

        <div className="flex items-center">
          <DateSlot
            label="Check in"
            value={range.start ? format(range.start, "MMM dd") : null}
          />
          <div className="px-3 text-center shrink-0">
            {nights > 0 ? (
              <span className={cn("text-[11px] ", tw.gold)}>{nights}
              <p className="text-[9px]"> {nights === 1 ? "night": "nights" }</p>
              </span>
            ) : (
              <span className={cn(tw.stone, "opacity-50")}>→</span>
            )}
          </div>
          <DateSlot
            label="Check out"
            value={range.end ? format(range.end, "MMM dd") : null}
            align="right"
          />
        </div>
      </div>

      {/* ── Month nav ── */}
      <div className={cn("flex justify-between items-center px-5 py-4 ", tw.borderSubtle)}>
        <NavButton
          label="Previous month"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft size={16} />
        </NavButton>

        <span className={cn(tw.monthLabel, tw.cream)}>
          {format(currentMonth, "MMMM yyyy")}
        </span>

        <NavButton
          label="Next month"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight size={16} />
        </NavButton>
      </div>

      {/* ── Calendar grid ── */}
      <div className="p-4">

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className={cn(tw.label, tw.stone, "text-center opacity-100 text-gold")}>
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const past      = isBefore(day, today);
            const sameMonth = isSameMonth(day, currentMonth);
            const start     = !!(range.start && isSameDay(day, range.start));
            const end       = !!(range.end   && isSameDay(day, range.end));
            const selected  = start || end;
            const inRange   = isInRange(day);
            const isToday   = isSameDay(day, today);

            return (
              <div
                key={i}
                role="button"
                tabIndex={past ? -1 : 0}
                aria-label={format(day, "MMMM d, yyyy")}
                aria-pressed={selected}
                aria-disabled={past}
                onClick={() => handleDateClick(day)}
                onMouseEnter={() => !past && setHoverDate(day)}
                onKeyDown={(e) => e.key === "Enter" && handleDateClick(day)}
                className={cn(
                  "aspect-square relative flex items-center justify-center",
                  past       ? "opacity-50 text-gold pointer-events-none " : "cursor-pointer",
                  !sameMonth && "opacity-20",
                )}
              >
                {/* Range highlight */}
                {inRange && !selected && <div className={tw.cellRangeBg} />}

                {/* Date number */}
                <span className={cn(
                  tw.cellInner,
                  selected ? tw.cellSelected : tw.cellHoverable,
                )}>
                  {format(day, "d")}
                </span>

                {/* Today indicator dot */}
                {isToday && !selected && <div className={tw.cellTodayDot} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex justify-between items-center px-5 py-4 border-t border-white/5  ">
        <span className={cn("text-xs text-gold")}>
          {nights > 0 && `${nights} night${nights !== 1 ? "s" : ""} · $${(nights * pricePerDay).toLocaleString()}`}
        </span>

        <button
          onClick={() => { setRange({ start: null, end: null }); setHoverDate(null); }}
          className={cn(
            tw.eyebrow, "text-ink dark:text-cream",
            "border px-3 py-1 rounded",
            "border-[rgba(201,168,76,0.2)]",
            "hover:border-[var(--gold)] hover:text-[var(--gold)]",
            "transition-colors",
          )}
        >
          Clear
        </button>
      </div>
    </div>
  );
}