import { useState } from "react";
import "./Comments.css";


const INITIAL_COMMENTS = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar: "https://picsum.photos/seed/user1/36/36",
    text: "This is exactly what I was looking for! The explanation around the 15-minute mark was super clear. Subscribed immediately 🙌",
    time: "2 days ago",
    likes: 142,
  },
  {
    id: 2,
    author: "Priya Sharma",
    avatar: "https://picsum.photos/seed/user2/36/36",
    text: "Great video! Could you do a follow-up on how this connects to real-world projects? I struggle with going from tutorials to actual apps.",
    time: "5 hours ago",
    likes: 87,
  },
];

function Comments() {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);



return (
    <div className="comments">
      <h3 className="comments__heading">{comments.length} Comments</h3>

      <div className="comments__add">
        <div className="comments__add-avatar">
          <img src="https://picsum.photos/seed/me/36/36" alt="Your avatar" />
        </div>
        <div className="comments__add-field">
          <input
            type="text"
            className={`comments__input ${isFocused ? "comments__input--focused" : ""}`}
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
          />

          {isFocused && (
            <div className="comments__add-actions">
              <span className="comments__hint">Ctrl+Enter to post</span>
              <div className="comments__add-btns">
                <button className="comments__cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button
                  className={`comments__submit-btn ${newComment.trim() ? "comments__submit-btn--enabled" : ""}`}
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="comments__list">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}



export default Comments;
