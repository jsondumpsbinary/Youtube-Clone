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

  function handleInputChange(e) {
    setNewComment(e.target.value);
  }

  function handleAddComment() {
    const trimmed = newComment.trim();
    if (!trimmed) return; 


    const commentToAdd = {
      id: Date.now(), 
      author: "You",
      avatar: "https://picsum.photos/seed/me/36/36",
      text: trimmed,
      time: "Just now",
      likes: 0,
    };


    setComments((prev) => [commentToAdd, ...prev]);
    setNewComment("");
    setIsFocused(false);
  }

  function handleCancel() {
    setNewComment("");
    setIsFocused(false);
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleAddComment();
    }
  }

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

function CommentItem({ comment }) {
  const [likes, setLikes] = useState(comment.likes);
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  }

  return (
    <div className="comment">
      <img
        className="comment__avatar"
        src={comment.avatar}
        alt={comment.author}
        loading="lazy"
      />
      <div className="comment__body">
        <div className="comment__header">
          <span className="comment__author">{comment.author}</span>
          <span className="comment__time">{comment.time}</span>
        </div>
        <p className="comment__text">{comment.text}</p>
        <div className="comment__actions">
          <button
            className={`comment__like-btn ${liked ? "comment__like-btn--active" : ""}`}
            onClick={handleLike}
            aria-label={liked ? "Unlike comment" : "Like comment"}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
            </svg>
            {likes > 0 && <span>{likes}</span>}
          </button>
          <button className="comment__reply-btn">Reply</button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
