// CommentSection.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import { data } from 'autoprefixer';

const CommentSection = ({ postID }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const getComments = async () => {
        const { data } = await supabase
            .from('comments')
            .select()
            .eq('postID', postID);

        if (!data) return;
        setComments(data);
    };

    const addComment = async () => {
        if (newComment.trim() === '') return;

        await supabase
        .from('comments')
        .insert([
            {
                postID: postID,
                comment: newComment,
            },
        ])
        .eq('postID', postID)

        // Clear the input field after adding a comment
        setNewComment('');

        // Fetch comments again to include the newly added comment
        getComments();
    };

    useEffect(() => {
        getComments();
    }, [postID]);

    return (
        <div className="comment-section">
            <h2 className='hero text-4xl'>Comments Section</h2>
            <ul className='hero'>
                {comments?.map((comment) => (
                    <li key={comment.postID}>{comment.comment}</li>

                ))}
            </ul>
            <div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button onClick={addComment}>Submit</button>
            </div>
        </div>
    );
};

export default CommentSection;
