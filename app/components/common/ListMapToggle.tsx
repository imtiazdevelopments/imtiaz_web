export default function ListMapToggle({
    view,
    setView,
}: {
    view: "list" | "map";
    setView: (val: "list" | "map") => void;
}) {
    return (
        <div className="flex items-center gap-2 font-medium text-description">
            <button
                onClick={() => setView("list")}
                className={`transition-colors ${
                    view === "list"
                        ? "text-gray-900"
                        : "text-gray-400 hover:text-gray-600"
                }`}
            >
                LIST
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={() => setView("map")}
                className={`transition-colors ${
                    view === "map"
                        ? "text-gray-900"
                        : "text-gray-400 hover:text-gray-600"
                }`}
            >
                MAP
            </button>
        </div>
    );
}