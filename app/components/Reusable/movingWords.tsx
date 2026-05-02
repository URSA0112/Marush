const items = [
  "Luxury stays surrounded by nature",
  "Private villas & serene escapes",
  "Unforgettable spa & wellness experiences",
  "Fine dining with breathtaking views",
  "Your perfect getaway starts here"
];

export default function MovingWords() {
  return (
    <div className="overflow-hidden bg-fog py-3">
      <div className="marquee-track">
     
        {[...items, ...items].map((text, i) => (
          <span key={i} className="text-lg font-medium mx-6 whitespace-nowrap">
            {text}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-charcoal mx-6 align-middle" />
          </span>
        ))}
      </div>
    </div>
  );
}