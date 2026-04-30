const PHOTO = "https://www.figma.com/api/mcp/asset/77c8b40c-4a59-4ab9-a981-20d01959bb54";

export default function PhotoSection() {
  return (
    <section className="w-full overflow-hidden">
      {/* Desktop: landscape crop, centered */}
      <div className="hidden md:block w-full aspect-[3/2]">
        <img
          src={PHOTO}
          alt="Photographer with camera"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Mobile: portrait crop, shifted right to focus on subject's face */}
      <div className="block md:hidden w-full aspect-[390/550]">
        <img
          src={PHOTO}
          alt="Photographer with camera"
          className="w-full h-full object-cover object-[65%_center]"
        />
      </div>
    </section>
  );
}
