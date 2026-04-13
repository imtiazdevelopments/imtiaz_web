export default function ListMapToggle({
  view,
  setView,
}: {
  view: "list" | "map";
  setView: (val: "list" | "map") => void;
}) {
  return (
    <div className="flex items-center gap-2 text-description z-[10]">
      <button
        onClick={() => setView("list")}
        className={`transition-all duration-300 cursor-pointer ${
          view === "list"
            ? "text-foreground-light"
            : "text-foreground-light/30 hover:text-foreground-light/80"
        }`}
      >
        LIST
      </button>
      <span className="text-foreground-light">|</span>
      <button
        onClick={() => setView("map")}
        className={`transition-all duration-300 cursor-pointer ${
          view === "map"
            ? "text-foreground-light"
            : "text-foreground-light/10 hover:text-foreground-light/80"
        }`}
      >
        MAP
      </button>
    </div>
  );
}
