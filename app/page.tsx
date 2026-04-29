import AnimatedButton from "./button";


export default function DevSystem() {
  const colors = [
    { name: "ink", className: "bg-ink text-cream", var: "--ink" },
    {
      name: "charcoal",
      className: "bg-charcoal text-cream",
      var: "--charcoal",
    },

    {
      name: "black",
      className: "bg-black text-cream",
      var: "--black",
    },

    {
      name: "cream",
      className: "bg-cream text-ink border border-stone",
      var: "--cream",
    },
    {
      name: "cream-warm",
      className: "bg-cream-warm text-ink",
      var: "--cream-warm",
    },
    {
      name: "paper",
      className: "bg-paper text-ink border border-stone",
      var: "--paper",
    },

    {
      name: "green-yellow",
      className: "bg-green-yellow text-cream",
      var: "--green-yellow",
    },
    {
      name: "green-deep",
      className: "bg-green-deep text-cream",
      var: "--green-deep",
    },
    {
      name: "green-soft",
      className: "bg-green-soft text-ink",
      var: "--green-soft",
    },

    { name: "fog", className: "bg-fog text-ink", var: "--fog" },
    { name: "stone", className: "bg-stone text-cream", var: "--stone" },
    { name: "bark", className: "bg-bark text-cream", var: "--bark" },

    { name: "gold", className: "bg-gold text-ink", var: "--gold" },
  ];

  return (
    <main className="marush min-h-screen bg-cream text-ink p-10 space-y-24">
      <nav className="m-nav">
        <div>
          <p className="m-meta lowercase!">m-wordmark</p>
          <div className="m-wordmark">MARUSH</div>
        </div>

        <div className="m-nav__links">
          m-nav__links
          <a className="m-nav__link">m-nav__link |</a>
          <a className="m-nav__link">Rooms</a>
          <a className="m-nav__link">Spa</a>
          <a className="m-nav__link">Dining</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="space-y-6 m-fade">
        <p className="m-eyebrow">m-eyebrow | Design System</p>

        <h1 className="m-display m-h1">
          m-display + m-h1 | Marush <em>UI System</em>
        </h1>

        <h1 className="m-display">m-display</h1>

        <p className="m-italic">
          m-italic | A refined palette, typography system, and component
          language for luxury resort experience.
        </p>

        <div className="flex gap-20">
          <div>
            <p className="text-sm font-light">m-btn + m-btn--filled</p>
            <button className="m-btn m-btn--filled">
              Primary <span className="arr">→</span>
            </button>
          </div>
          <div>
            <p className="text-sm font-light">m-btn</p>
            <button className="m-btn">
              Secondary <span className="arr">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* COLOR PALETTE */}
      <section className="space-y-8">
        <div className="m-div">Colors</div>

        <div className="grid md:grid-cols-4 gap-6">
          {colors.map((c) => (
            <div
              key={c.name}
              className={`${c.className} p-6 rounded-xl space-y-2 m-fade`}
            >
              <p className="m-meta">{c.name}</p>
              <p className="text-xs opacity-70">{c.var}</p>
              <p className="text-xs opacity-70 break-all">{c.className}</p>
            </div>
          ))}
        </div>
        <div className="bg-green-yellow p-10">
          <p className="text-gold m-italic">Text gold</p>
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section className="space-y-10">
        <div className="m-div">
          <p className="lowercase normal-case;">m-div</p>
          Typography
        </div>

        <div className="space-y-6">
          <h1 className="m-h1">Heading H1</h1>
          <h2 className="m-h2">Heading H2</h2>
          <h3 className="m-h3">Heading H3</h3>

          <div className="m-italic">
            <p className="m-italic">m-italic</p>
            This is a lede paragraph used for storytelling and emphasis.
          </div>

          <div className="m-body">
            <p className="m-body">m-body</p>
            This is body text. It should feel clean, readable, and editorial.
          </div>

          <div className="m-body m-body--muted">
            <p className="m-body m-body--muted">m-body m-body--muted</p>
            This is muted secondary text.
          </div>

          <div className="m-meta">
            <p className="m-meta">m-meta</p>
            Metadata / Label text
          </div>
        </div>
      </section>

      {/* BUTTONS */}
      <section className="space-y-10">
        <div className="m-div">Buttons</div>

        <div className="flex flex-wrap gap-6">
          <button className="m-btn">
            Default <span className="arr">→</span>
          </button>

          <button className="m-btn m-btn--filled">
            Filled <span className="arr">→</span>
          </button>
        </div>
      </section>

      {/* CARDS */}
      <section className="space-y-10">
        <div className="m-div">Cards</div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-[var(--rule)] space-y-4 m-fade">
            <p className="m-meta">01</p>
            <h3 className="m-h3">Forest Room</h3>
            <p className="m-body m-body--muted">
              Calm, minimal, surrounded by nature.
            </p>
            <button className="m-btn">
              View <span className="arr">→</span>

            </button>
          </div>

          <div className="p-6 border border-[var(--rule)] space-y-4 m-fade">
            <p className="m-meta">02</p>
            <h3 className="m-h3">Spa Experience</h3>
            <p className="m-body m-body--muted">
              Restore balance and reconnect.
            </p>
            <button className="m-btn m-btn--filled">
              Book <span className="arr">→</span>
            </button>
          </div>

          <div className="p-6 border space-y-4 m-fade bg-green-deep text-cream">
            <p className="m-meta">03</p>
            <h3 className="m-h3">Dining</h3>
            <p className="m-body m-body--muted">
              Seasonal cuisine and curated taste.
            </p>
            <AnimatedButton buttonClassName="bg-ink">Explore <span className="arr">→</span></AnimatedButton>
          </div>
        </div>
        <div className="bg-green-yellow p-10 ">
          <p className="m-img-cap">img cap</p>
          <img src="next.svg" alt="" className="m-img" />
          <button className="btn btn-square">
            <span className="loading loading-spinner"></span>
          </button>


        </div>

      </section>


    </main>
  );
}
