// components/VerticalGlowLine.jsx

export default function VerticalGlowLine({
  height = "h-12",
  className = "",
  animated = true,
}) {
  return (
    <div
      className={`
        w-px
        ${height}
        bg-gradient-to-b
        from-gold
        to-transparent
        ${animated ? "animate-[shimmer_2s_ease-in-out_infinite]" : ""}
        ${className}
      `}
    />
  );
}