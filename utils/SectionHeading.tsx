
export default function SectionHeading({ badge, title, description, center = true }) {
  return (
    <div
      className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-14`}
    >
      {badge && (
        <span className="font-inter inline-block text-xs tracking-widest uppercase text-accent mb-4 font-medium">
          — {badge}
        </span>
      )}
      <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="font-inter mt-5 text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}