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
        <section >
            <h2 className='hero text-4xl'>Comments Section</h2>
            <aside className=''>
                <textarea
                    className='textarea textarea-bordered h-40 hero mt-5 '
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
            </aside>
            <div className='hero'>
                <button onClick={addComment} className='btn mt-4  w-[20rem]'>Submit</button>
            </div>
            <ul className=' hero-overlay mt-2'>
                {comments?.map((comment) => (
                    <li key={comment.postID}>User {1}: {comment.comment}</li>
                ))}
            </ul>
        </section>
    );
};

export default CommentSection;
