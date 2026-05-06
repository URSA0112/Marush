"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Villa = {
  id: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
};

type BookingFormData = {
  villa: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
};

type FormStep = "dates" | "guests" | "contact" | "review";

// ─── Data ─────────────────────────────────────────────────────────────────────

const VILLAS: Villa[] = [
  {
    id: "forest-villa",
    name: "Forest Villa",
    price: 480,
    capacity: 4,
    description: "Nestled among ancient pines with private terrace & plunge pool",
  },
  {
    id: "ridge-suite",
    name: "Ridge Suite",
    price: 680,
    capacity: 2,
    description: "Panoramic mountain views, open fireplace, butler service",
  },
  {
    id: "valley-lodge",
    name: "Valley Lodge",
    price: 920,
    capacity: 6,
    description: "Sprawling private estate with chef's kitchen & infinity pool",
  },
];

const STEPS: { id: FormStep; label: string; icon: string }[] = [
  { id: "dates", label: "Dates", icon: "◈" },
  { id: "guests", label: "Guests", icon: "◉" },
  { id: "contact", label: "Contact", icon: "◇" },
  { id: "review", label: "Review", icon: "◎" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingForm() {
  const [step, setStep] = useState<FormStep>("dates");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<BookingFormData>({
    villa: "forest-villa",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
  });

  // ── Derived ──

  const selectedVilla = VILLAS.find((v) => v.id === form.villa)!;
  const nights = nightsBetween(form.checkIn, form.checkOut);
  const subtotal = nights * selectedVilla.price;
  const taxRate = 0.12;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;

  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  // ── Handlers ──

  function update<K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function goTo(target: FormStep) {
    setStep(target);
  }

  function next() {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id);
  }

  function back() {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx > 0) setStep(STEPS[idx - 1].id);
  }

  function canProceed(): boolean {
    if (step === "dates") return !!form.checkIn && !!form.checkOut && nights > 0;
    if (step === "guests") return form.adults >= 1;
    if (step === "contact")
      return !!form.firstName && !!form.lastName && !!form.email;
    return true;
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  // ─── Confirmation ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.confirmCard}>
          <div style={styles.confirmBadge}>✦</div>
          <h2 style={styles.confirmTitle}>Reservation Confirmed</h2>
          <p style={styles.confirmSub}>
            A confirmation has been sent to{" "}
            <span style={{ color: "var(--gold)" }}>{form.email}</span>
          </p>

          <div style={styles.confirmMeta}>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Villa</span>
              <span style={styles.confirmValue}>{selectedVilla.name}</span>
            </div>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Check-in</span>
              <span style={styles.confirmValue}>{formatDate(form.checkIn)}</span>
            </div>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Check-out</span>
              <span style={styles.confirmValue}>{formatDate(form.checkOut)}</span>
            </div>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Guests</span>
              <span style={styles.confirmValue}>
                {form.adults} adults{form.children > 0 ? `, ${form.children} children` : ""}
              </span>
            </div>
            <div style={{ ...styles.confirmRow, borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: 16, marginTop: 4 }}>
              <span style={{ ...styles.confirmLabel, color: "var(--gold)" }}>Total Paid</span>
              <span style={{ ...styles.confirmValue, color: "var(--gold)", fontSize: 20 }}>
                ${total.toLocaleString()}
              </span>
            </div>
          </div>

          <p style={{ color: "var(--stone)", fontSize: 13, marginTop: 24, lineHeight: 1.6 }}>
            Our concierge team will reach out within 24 hours to personalise your stay.
          </p>
        </div>
        <style>{cssString}</style>
      </div>
    );
  }

  // ─── Main Form ────────────────────────────────────────────────────────────

  return (
    <div style={styles.page}>
      <style>{cssString}</style>

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>Marush Resort · Reserve</p>
        <h1 style={styles.title}>Your Stay Awaits</h1>
      </div>

      {/* Step indicator */}
      <div style={styles.stepBar}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => i < currentStepIndex && goTo(s.id)}
            style={{
              ...styles.stepItem,
              ...(s.id === step ? styles.stepActive : {}),
              ...(i < currentStepIndex ? styles.stepDone : {}),
              cursor: i < currentStepIndex ? "pointer" : "default",
            }}
          >
            <span style={styles.stepIcon}>{i < currentStepIndex ? "✓" : s.icon}</span>
            <span style={styles.stepLabel}>{s.label}</span>
          </button>
        ))}
        <div
          style={{
            ...styles.stepProgress,
            width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%`,
          }}
        />
      </div>

      <div style={styles.layout}>
        {/* ── Left panel: form ── */}
        <div style={styles.formCard}>

          {/* STEP 1: Dates */}
          {step === "dates" && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepTitle}>Select your villa & dates</h2>

              {/* Villa picker */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Villa</label>
                <div style={styles.villaGrid}>
                  {VILLAS.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => update("villa", v.id)}
                      style={{
                        ...styles.villaCard,
                        ...(form.villa === v.id ? styles.villaCardActive : {}),
                      }}
                    >
                      <div style={styles.villaName}>{v.name}</div>
                      <div style={styles.villaDesc}>{v.description}</div>
                      <div style={styles.villaPrice}>${v.price} <span style={styles.villaPerNight}>/ night</span></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date fields */}
              <div style={styles.dateRow}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Check-in</label>
                  <input
                    type="date"
                    min={getTodayString()}
                    value={form.checkIn}
                    onChange={(e) => {
                      update("checkIn", e.target.value);
                      if (form.checkOut && e.target.value >= form.checkOut) {
                        update("checkOut", "");
                      }
                    }}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Check-out</label>
                  <input
                    type="date"
                    min={form.checkIn || getTodayString()}
                    value={form.checkOut}
                    onChange={(e) => update("checkOut", e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              {nights > 0 && (
                <div style={styles.nightBadge}>
                  {nights} night{nights !== 1 ? "s" : ""} · {formatDate(form.checkIn)} → {formatDate(form.checkOut)}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Guests */}
          {step === "guests" && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepTitle}>Who's joining you?</h2>
              <p style={styles.stepHint}>
                The {selectedVilla.name} accommodates up to {selectedVilla.capacity} guests.
              </p>

              {(["adults", "children"] as const).map((type) => (
                <div key={type} style={styles.guestRow}>
                  <div>
                    <div style={styles.guestType}>
                      {type === "adults" ? "Adults" : "Children"}
                    </div>
                    <div style={styles.guestSub}>
                      {type === "adults" ? "Age 13+" : "Age 2–12"}
                    </div>
                  </div>
                  <div style={styles.counter}>
                    <button
                      style={styles.counterBtn}
                      onClick={() =>
                        update(type, Math.max(type === "adults" ? 1 : 0, form[type] - 1))
                      }
                    >
                      −
                    </button>
                    <span style={styles.counterVal}>{form[type]}</span>
                    <button
                      style={styles.counterBtn}
                      onClick={() => {
                        const total = form.adults + form.children;
                        if (total < selectedVilla.capacity) update(type, form[type] + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Special requests</label>
                <textarea
                  rows={4}
                  placeholder="Dietary requirements, accessibility needs, celebration arrangements…"
                  value={form.requests}
                  onChange={(e) => update("requests", e.target.value)}
                  style={{ ...styles.input, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Contact */}
          {step === "contact" && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepTitle}>Your details</h2>

              <div style={styles.dateRow}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>First name</label>
                  <input
                    type="text"
                    placeholder="Sofia"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Last name</label>
                  <input
                    type="text"
                    placeholder="Larsson"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email address</label>
                <input
                  type="email"
                  placeholder="sofia@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Phone number <span style={{ opacity: 0.5 }}>(optional)</span></label>
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === "review" && (
            <div style={styles.stepContent}>
              <h2 style={styles.stepTitle}>Review your reservation</h2>

              {[
                { label: "Villa", value: selectedVilla.name },
                { label: "Check-in", value: formatDate(form.checkIn) },
                { label: "Check-out", value: formatDate(form.checkOut) },
                { label: "Duration", value: `${nights} night${nights !== 1 ? "s" : ""}` },
                {
                  label: "Guests",
                  value: `${form.adults} adult${form.adults !== 1 ? "s" : ""}${form.children > 0 ? `, ${form.children} child${form.children !== 1 ? "ren" : ""}` : ""}`,
                },
                { label: "Guest name", value: `${form.firstName} ${form.lastName}` },
                { label: "Email", value: form.email },
              ].map(({ label, value }) => (
                <div key={label} style={styles.reviewRow}>
                  <span style={styles.reviewLabel}>{label}</span>
                  <span style={styles.reviewValue}>{value}</span>
                </div>
              ))}

              {form.requests && (
                <div style={styles.requestsBox}>
                  <div style={styles.reviewLabel}>Special requests</div>
                  <p style={{ color: "var(--cream)", fontSize: 14, marginTop: 4, lineHeight: 1.6 }}>
                    {form.requests}
                  </p>
                </div>
              )}

              <p style={styles.policyNote}>
                Free cancellation up to 14 days before arrival. By confirming you agree to
                Marush Resort's booking terms and privacy policy.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div style={styles.navRow}>
            {currentStepIndex > 0 && (
              <button onClick={back} style={styles.btnSecondary}>
                ← Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step !== "review" ? (
              <button
                onClick={next}
                disabled={!canProceed()}
                style={{ ...styles.btnPrimary, opacity: canProceed() ? 1 : 0.4 }}
              >
                Continue →
              </button>
            ) : (
              <button onClick={handleSubmit} style={styles.btnPrimary}>
                Confirm Reservation
              </button>
            )}
          </div>
        </div>

        {/* ── Right panel: summary ── */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryVillaName}>{selectedVilla.name}</div>
          <div style={styles.summaryVillaDesc}>{selectedVilla.description}</div>

          <div style={styles.summaryDivider} />

          {nights > 0 ? (
            <>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>
                  ${selectedVilla.price} × {nights} night{nights !== 1 ? "s" : ""}
                </span>
                <span style={styles.summaryValue}>${subtotal.toLocaleString()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Taxes & fees (12%)</span>
                <span style={styles.summaryValue}>${taxes.toLocaleString()}</span>
              </div>
              <div style={styles.summaryDivider} />
              <div style={{ ...styles.summaryRow, alignItems: "center" }}>
                <span style={{ ...styles.summaryLabel, color: "var(--gold)", fontWeight: 600 }}>
                  Total
                </span>
                <span style={styles.summaryTotal}>${total.toLocaleString()}</span>
              </div>
            </>
          ) : (
            <p style={{ color: "var(--stone)", fontSize: 13, lineHeight: 1.7 }}>
              Select your dates to see pricing.
            </p>
          )}

          <div style={styles.summaryDivider} />

          <div style={styles.perkList}>
            {[
              "✦ Daily housekeeping",
              "✦ Private forest trail access",
              "✦ Welcome amenities basket",
              "✦ 24-hour concierge",
            ].map((p) => (
              <div key={p} style={styles.perk}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--bg, #0f1a0f)",
    padding: "48px 24px 80px",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "var(--gold, #c9a84c)",
    marginBottom: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: 300,
    color: "var(--cream, #faf7f0)",
    fontStyle: "italic",
    margin: 0,
    letterSpacing: "0.02em",
  },
  stepBar: {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    marginBottom: 40,
    position: "relative",
    maxWidth: 480,
    margin: "0 auto 40px",
  },
  stepItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "8px 4px",
    background: "none",
    border: "none",
    color: "var(--stone, #6b8f7e)",
    fontSize: 11,
    letterSpacing: "0.1em",
    transition: "color 0.2s",
  },
  stepActive: {
    color: "var(--gold, #c9a84c)",
  },
  stepDone: {
    color: "var(--green-soft, #7aad7a)",
  },
  stepIcon: {
    fontSize: 18,
    lineHeight: 1,
  },
  stepLabel: {
    textTransform: "uppercase",
    fontSize: 10,
  },
  stepProgress: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 1,
    background: "var(--gold, #c9a84c)",
    transition: "width 0.4s ease",
  },
  layout: {
    display: "flex",
    gap: 24,
    maxWidth: 960,
    margin: "0 auto",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  formCard: {
    flex: "1 1 520px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: 16,
    padding: "40px",
    backdropFilter: "blur(8px)",
  },
  summaryCard: {
    flex: "0 0 280px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,168,76,0.12)",
    borderRadius: 16,
    padding: "32px 28px",
    position: "sticky",
    top: 24,
  },
  stepContent: {
    minHeight: 320,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 300,
    color: "var(--cream, #faf7f0)",
    fontStyle: "italic",
    marginBottom: 8,
    marginTop: 0,
  },
  stepHint: {
    fontSize: 14,
    color: "var(--stone, #6b8f7e)",
    marginBottom: 28,
    lineHeight: 1.6,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    display: "block",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--stone, #6b8f7e)",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: 8,
    padding: "12px 16px",
    color: "var(--cream, #faf7f0)",
    fontSize: 15,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  dateRow: {
    display: "flex",
    gap: 16,
    marginBottom: 4,
  },
  nightBadge: {
    marginTop: 12,
    padding: "10px 16px",
    background: "rgba(201,168,76,0.1)",
    border: "1px solid rgba(201,168,76,0.25)",
    borderRadius: 8,
    color: "var(--gold, #c9a84c)",
    fontSize: 13,
    letterSpacing: "0.03em",
  },
  villaGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 24,
  },
  villaCard: {
    textAlign: "left",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  villaCardActive: {
    border: "1px solid rgba(201,168,76,0.5)",
    background: "rgba(201,168,76,0.06)",
  },
  villaName: {
    fontSize: 17,
    fontWeight: 500,
    color: "var(--cream, #faf7f0)",
    marginBottom: 2,
  },
  villaDesc: {
    fontSize: 12,
    color: "var(--stone, #6b8f7e)",
    marginBottom: 6,
    lineHeight: 1.5,
  },
  villaPrice: {
    fontSize: 15,
    color: "var(--gold, #c9a84c)",
  },
  villaPerNight: {
    fontSize: 12,
    color: "var(--stone, #6b8f7e)",
  },
  guestRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    marginBottom: 4,
  },
  guestType: {
    fontSize: 17,
    color: "var(--cream, #faf7f0)",
  },
  guestSub: {
    fontSize: 12,
    color: "var(--stone, #6b8f7e)",
    marginTop: 2,
  },
  counter: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid rgba(201,168,76,0.3)",
    background: "transparent",
    color: "var(--gold, #c9a84c)",
    fontSize: 20,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    lineHeight: 1,
  },
  counterVal: {
    fontSize: 22,
    color: "var(--cream, #faf7f0)",
    minWidth: 24,
    textAlign: "center",
  },
  reviewRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  reviewLabel: {
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--stone, #6b8f7e)",
  },
  reviewValue: {
    fontSize: 15,
    color: "var(--cream, #faf7f0)",
    textAlign: "right",
  },
  requestsBox: {
    marginTop: 16,
    padding: "14px 16px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  policyNote: {
    marginTop: 20,
    fontSize: 12,
    color: "var(--stone, #6b8f7e)",
    lineHeight: 1.7,
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    marginTop: 32,
    paddingTop: 24,
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  btnPrimary: {
    padding: "14px 36px",
    background: "linear-gradient(135deg, #e8c97a, #c9a84c, #a8832a)",
    border: "none",
    borderRadius: 8,
    color: "#1a1200",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    transition: "opacity 0.2s, transform 0.15s",
  },
  btnSecondary: {
    padding: "14px 24px",
    background: "transparent",
    border: "1px solid rgba(201,168,76,0.25)",
    borderRadius: 8,
    color: "var(--stone, #6b8f7e)",
    fontSize: 13,
    letterSpacing: "0.06em",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  // Summary panel
  summaryVillaName: {
    fontSize: 22,
    fontStyle: "italic",
    color: "var(--cream, #faf7f0)",
    marginBottom: 6,
  },
  summaryVillaDesc: {
    fontSize: 12,
    color: "var(--stone, #6b8f7e)",
    lineHeight: 1.6,
  },
  summaryDivider: {
    height: 1,
    background: "rgba(201,168,76,0.12)",
    margin: "20px 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 13,
    color: "var(--stone, #6b8f7e)",
  },
  summaryValue: {
    fontSize: 14,
    color: "var(--cream, #faf7f0)",
  },
  summaryTotal: {
    fontSize: 26,
    color: "var(--gold, #c9a84c)",
    fontStyle: "italic",
  },
  perkList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  perk: {
    fontSize: 12,
    color: "var(--stone, #6b8f7e)",
    letterSpacing: "0.04em",
  },
  // Confirmation
  confirmCard: {
    maxWidth: 480,
    margin: "80px auto 0",
    textAlign: "center",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.2)",
    borderRadius: 20,
    padding: "56px 48px",
  },
  confirmBadge: {
    fontSize: 40,
    color: "var(--gold, #c9a84c)",
    marginBottom: 20,
  },
  confirmTitle: {
    fontSize: 36,
    fontWeight: 300,
    fontStyle: "italic",
    color: "var(--cream, #faf7f0)",
    margin: "0 0 8px",
  },
  confirmSub: {
    fontSize: 15,
    color: "var(--stone, #6b8f7e)",
    marginBottom: 32,
  },
  confirmMeta: {
    textAlign: "left",
    borderTop: "1px solid rgba(201,168,76,0.15)",
    paddingTop: 20,
  },
  confirmRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  confirmLabel: {
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--stone, #6b8f7e)",
  },
  confirmValue: {
    fontSize: 15,
    color: "var(--cream, #faf7f0)",
  },
};

// ─── CSS (Google Fonts + input focus) ─────────────────────────────────────────

const cssString = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

:root {
  --bg: #0d1a0d;
  --cream: #faf7f0;
  --gold: #c9a84c;
  --gold-light: #e8c97a;
  --stone: #7a8f7a;
  --green-soft: #7aad7a;
}

* { box-sizing: border-box; }

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.7) sepia(1) saturate(2) hue-rotate(10deg);
  cursor: pointer;
}

input:focus, textarea:focus {
  border-color: rgba(201,168,76,0.5) !important;
  box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
}

button:hover:not(:disabled) {
  opacity: 0.88;
}
`;