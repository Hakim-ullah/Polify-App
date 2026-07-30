import { useState } from "react";
import { User, AtSign, FileText, Check, AlertCircle, Camera } from "lucide-react";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Avatar } from "../assets/helpers component/UIElements.jsx";
import { loginStyles as ls } from "../assets/dummyStyles.jsx";

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("username", form.username);
      fd.append("bio", form.bio);
      if (avatarFile) fd.append("avatar", avatarFile);
      const { data } = await api.put("/auth/profile", fd);
      updateUser(data.user);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-5">
        {success && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
            <Check size={15} /> {success}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-medium">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <div className="flex items-center gap-4 pb-4 border-b border-zinc-800/80">
          <div className="relative">
            <Avatar user={user} className="w-16 h-16 text-lg ring-2 ring-zinc-700" />
            <label className="absolute -bottom-1 -right-1 cursor-pointer bg-zinc-800 rounded-full p-1.5 hover:bg-zinc-700 transition-colors">
              <Camera size={12} className="text-zinc-300" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{user?.name}</div>
            <div className="text-xs text-zinc-500">@{user?.username}</div>
          </div>
        </div>

        <div className={ls.field}>
          <label className={ls.label}>Full Name</label>
          <div className={ls.inputWrapper}>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className={`${ls.input} ${ls.inputWithIcon}`}
            />
            <User size={16} className={ls.icon} />
          </div>
        </div>

        <div className={ls.field}>
          <label className={ls.label}>Username</label>
          <div className={ls.inputWrapper}>
            <input
              type="text"
              name="username"
              required
              value={form.username}
              onChange={handleChange}
              className={`${ls.input} ${ls.inputWithIcon}`}
            />
            <AtSign size={16} className={ls.icon} />
          </div>
        </div>

        <div className={ls.field}>
          <label className={ls.label}>Bio</label>
          <div className={ls.inputWrapper}>
            <textarea
              name="bio"
              rows={3}
              placeholder="Tell the community about yourself..."
              value={form.bio}
              onChange={handleChange}
              className={`${ls.input} resize-y min-h-20`}
            />
          </div>
        </div>

        <button type="submit" disabled={busy} className={ls.submitButton}>
          {busy ? "Saving changes..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
