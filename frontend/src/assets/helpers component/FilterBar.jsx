import { Scale, List, Star, Image, MessageSquare, Sparkles, X } from "lucide-react";
import { filterBarStyles as s } from "../dummyStyles.jsx";

export const TYPE_META = {
  yesno: { label: "Yes / No", Icon: Scale },
  single: { label: "Single Choice", Icon: List },
  rating: { label: "Rating", Icon: Star },
  image: { label: "Image", Icon: Image },
  open: { label: "Open Ended", Icon: MessageSquare },
};

export const FILTERS = [
  { key: "all", label: "All Types", Icon: Sparkles },
  ...Object.entries(TYPE_META).map(([key, v]) => ({
    key,
    label: v.label,
    Icon: v.Icon,
  })),
];

const CATEGORIES = [
  "All",
  "General",
  "Tech",
  "Food",
  "Sports",
  "Entertainment",
  "Gaming",
  "Music",
  "Travel",
  "Education",
  "Lifestyle",
  "Other",
];

export default function FilterBar({
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="space-y-2">
      {/* Type buttons */}
      <div className={s.container}>
        {FILTERS.map(({ key, label, Icon }) => {
          const active = typeFilter === key;
          return (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={`${s.filterButtonBase} ${
                active ? s.filterButtonActive : s.filterButtonInactive
              }`}
            >
              <Icon size={13} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Category selector pill strip */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mr-1">
          Category:
        </span>
        {CATEGORIES.map((cat) => {
          const active = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                active
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          );
        })}

        {(typeFilter !== "all" || categoryFilter !== "All") && (
          <button
            onClick={() => {
              setTypeFilter("all");
              setCategoryFilter("All");
            }}
            className={s.clearButton}
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}