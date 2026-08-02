// Comments — threaded comment list for a poll
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send, Trash2, CornerDownRight } from "lucide-react";
import api from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "./Toast.jsx";
import { Avatar } from "./UIElements.jsx";
import { commentsStyles as s } from "../dummyStyles.jsx";

const ago = (date) => {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  for (const [n, sec] of [["d", 86400], ["h", 3600], ["m", 60]]) {
    const v = Math.floor(s / sec);
    if (v >= 1) return `${v}${n}`;
  }
  return "now";
};

function CommentItem({ c, replies, meId, onReply, onDelete }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onReply(c._id, text.trim());
    setText("");
    setOpen(false);
  };

  return (
    <div className={s.commentItem}>
      <Link to={`/user/${c.user?.username}`}>
        <Avatar user={c.user} className={s.avatarSmall} />
      </Link>
      <div className={s.commentContent}>
        <div className={s.commentBubble}>
          <div className={s.commentHeader}>
            <Link to={`/user/${c.user?.username}`} className={s.usernameLink}>
              @{c.user?.username}
            </Link>
            <span className={s.timestamp}>{ago(c.createdAt)}</span>
          </div>
          <p className={s.commentText}>{c.text}</p>
        </div>

        <div className={s.commentActions}>
          <button onClick={() => setOpen(!open)} className={s.replyButton}>Reply</button>
          {String(c.user?._id) === String(meId) && (
            <button onClick={() => onDelete(c._id)} className={s.deleteButton}>
              <Trash2 size={10} /> Delete
            </button>
          )}
        </div>

        {open && (
          <form onSubmit={send} className={s.replyForm}>
            <input
              className={s.replyInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Reply to @${c.user?.username}`}
              autoFocus
            />
            <button type="submit" className={s.replySubmit}><Send size={12} /></button>
          </form>
        )}

        {replies.length > 0 && (
          <div className={s.repliesContainer}>
            {replies.map((r) => (
              <div key={r._id} className={s.replyItem}>
                <CornerDownRight size={12} className={s.replyIndent} />
                <Link to={`/user/${r.user?.username}`}><Avatar user={r.user} className={s.avatarTiny} /></Link>
                <div className={s.replyBubble}>
                  <div className={s.replyHeader}>
                    <Link to={`/user/${r.user?.username}`} className={s.replyUsername}>@{r.user?.username}</Link>
                    <span className={s.replyTimestamp}>{ago(r.createdAt)}</span>
                  </div>
                  <p className={s.replyText}>{r.text}</p>
                  {String(r.user?._id) === String(meId) && (
                    <button onClick={() => onDelete(r._id)} className={s.replyDelete}>
                      <Trash2 size={9} /> Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Comments({ pollId, onCommentAdded }) {
  const { user } = useAuth();
  const toast = useToast();
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get(`/polls/${pollId}/comments`).then(({ data }) => setList(data)).catch(() => {});
  }, [pollId]);

  // Add a comment with optimistic update — show immediately, then sync with server
  const add = async (e) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    const tempId = "temp-" + Date.now();
    setList((l) => [{ _id: tempId, user, text: text.trim(), createdAt: new Date().toISOString(), parent: null }, ...l]);
    setText("");
    setBusy(true);
    try {
      const { data } = await api.post(`/polls/${pollId}/comments`, { text: text.trim() });
      setList((l) => l.map((c) => (c._id === tempId ? data : c)));
      if (onCommentAdded) onCommentAdded();
    } catch {
      setList((l) => l.filter((c) => c._id !== tempId));
    } finally {
      setBusy(false);
    }
  };

  // Reply to a comment with optimistic update
  const reply = async (parent, body) => {
    const tempId = "temp-reply-" + Date.now();
    setList((l) => [...l, { _id: tempId, user, text: body, createdAt: new Date().toISOString(), parent }]);
    try {
      const { data } = await api.post(`/polls/${pollId}/comments`, { text: body, parent });
      setList((l) => l.map((c) => (c._id === tempId ? data : c)));
      if (onCommentAdded) onCommentAdded();
    } catch {
      setList((l) => l.filter((c) => c._id !== tempId));
    }
  };

  // Delete a comment
  const remove = async (commentId) => {
    try {
      await api.delete(`/polls/${pollId}/comments/${commentId}`);
      setList((l) => l.filter((c) => c._id !== commentId && c.parent !== commentId));
      toast("Comment deleted");
    } catch {
      toast("Failed to delete comment");
    }
  };

  const tops = list.filter((c) => !c.parent);
  const repliesOf = (id) => list.filter((c) => String(c.parent) === String(id)).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className={s.commentsContainer}>
      <form onSubmit={add} className={s.mainForm}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a comment…" className={s.mainInput} />
        <button type="submit" disabled={!text.trim() || busy} className={s.mainSubmit}><Send size={13} /></button>
      </form>

      <div className={s.commentList}>
        {tops.map((c) => (
          <CommentItem key={c._id} c={c} replies={repliesOf(c._id)} meId={user?._id} onReply={reply} onDelete={remove} />
        ))}
        {tops.length === 0 && <p className={s.emptyText}>No comments yet — start the conversation</p>}
      </div>
    </div>
  );
}