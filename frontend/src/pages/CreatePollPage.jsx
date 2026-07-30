import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, AlertCircle, X } from "lucide-react";
import api from "../utils/api.js";
import { TYPE_META } from "../assets/helpers component/FilterBar.jsx";
import { inputCls, Button } from "../assets/helpers component/UIElements.jsx";
import { createPollStyles as s } from "../assets/dummyStyles";

const CATEGORIES = [
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

const Label = ({ children }) => <span className={s.label}>{children}</span>;

export default function CreatePoll() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("General");
  const [type, setType] = useState("yesno");
  const [options, setOptions] = useState(["", ""]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const setOpt = (i, v) =>
    setOptions(options.map((o, idx) => (idx === i ? v : o)));

  // add one or many images (appended to what's already chosen, capped at 4)
  const addImages = (e) => {
    const picked = [...e.target.files];
    setImages((prev) => [...prev, ...picked].slice(0, 4));
    e.target.value = ""; // let the user re-pick the same file later
  };
  const removeImage = (i) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (type === "image" && images.length < 2)
      return setError("Please add at least 2 images");
    setBusy(true);
    try {
      await api.post("/polls", {
        question,
        type,
        category: category || "General",
        options: type === "single" ? options : undefined,
      });
      navigate("/my-polls");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create poll");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className={s.heading}>Create a poll</h1>

      <form onSubmit={submit} className={s.form}>
        {error && (
          <div className={s.errorBox}>
            <AlertCircle size={14} className="shrink-0 mt-0.5" /> {error}
          </div>
        )}

        {/* Question */}
        <div>
          <Label>Question</Label>
          <textarea
            className={`${inputCls} ${s.textarea}`}
            placeholder="What do you want to ask the community?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-zinc-900">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Poll type */}
        <div>
          <Label>Poll type</Label>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(TYPE_META).map(([key, { label, Icon }]) => (
              <button
                type="button"
                key={key}
                onClick={() => setType(key)}
                className={`${s.typeButtonBase} ${
                  type === key ? s.typeButtonActive : s.typeButtonInactive
                }`}
              >
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Single choice options */}
        {type === "single" && (
          <div className={s.optionsContainer}>
            <Label>Options</Label>
            {options.map((o, i) => (
              <div key={i} className={s.optionInputWrapper}>
                <input
                  className={inputCls}
                  placeholder={`Option ${i + 1}`}
                  value={o}
                  onChange={(e) => setOpt(i, e.target.value)}
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() =>
                      setOptions(options.filter((_, idx) => idx !== i))
                    }
                    className={s.optionDeleteButton}
                  >
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOptions([...options, ""])}
              className={s.addOptionButton}
            >
              <Plus size={13} /> Add option
            </Button>
          </div>
        )}

        {/* Image options */}
        {type === "image" && (
          <div>
            <Label>Images (2–4)</Label>
            <div className={s.imageGrid}>
              {images.map((f, i) => (
                <div key={i} className={s.imageItem}>
                  <img
                    src={URL.createObjectURL(f)}
                    alt=""
                    className={s.imageThumb}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    title="Remove"
                    className={s.imageRemoveButton}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {images.length < 4 && (
                <label className={s.imageAddLabel}>
                  <div className={s.imageAddContent}>
                    <Plus size={16} />
                    <span className="text-[10px] font-medium">Add</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={addImages}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className={s.imageHint}>
              {images.length}/4 selected · need at least 2. Add one at a time or
              many together; tap ✕ to remove.
            </p>
          </div>
        )}

        <Button disabled={busy} className={s.submitButton}>
          {busy ? "Creating…" : "Publish poll"}
        </Button>
      </form>
    </div>
  );
}
