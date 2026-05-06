
export default function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          #C9A96E 0px,
          #C9A96E 1px,
          transparent 1px,
          transparent 60px
        )`,
      }} />
    </div>
  );
}