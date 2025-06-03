import React, { useContext, useState } from 'react';
import { DocumentContext } from '../contexts/DocumentContext';
import { UserContext } from '../contexts/UserContext';

const CommentsPanel = () => {
    const { comments, addComment } = useContext(DocumentContext);
    const { currentUser } = useContext(UserContext);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            addComment({ user: currentUser.id, text: newComment });
            setNewComment('');
        }
    };

    return (
        <div className="comments-panel">
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.user}</strong>: {comment.text}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentsPanel;