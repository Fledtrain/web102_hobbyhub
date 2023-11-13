// CommentSection.js
import { useEffect, useState } from 'react';
import { supabase } from '../client';

/** Returns all comments for a post
 * @param {Object} props
 * @param {Number} props.postID - ID of the post  
 * @returns 
*/
// eslint-disable-next-line react/prop-types
const CommentSection = ({ postID }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userID, setUserID] = useState('');
    const [commentError, setCommentError] = useState(false);
    const [loading, setLoading] = useState(false);

    /** Fetches all comments for a post
     * @returns {String} All comments for a post
     */
    const getComments = async () => {
        setLoading(true)

        const { data } = await supabase
            .from('comments')
            .select()
            .eq('postID', postID)
            .order('created_at', { ascending: false });

        if (!data) {
            setLoading(false)
            return
        }
        setComments(data);
        setLoading(false)
    };

    /** Adds a comment to a post
     * @returns {String} Adds a comment to a post
     */
    const addComment = async () => {
        setLoading(true)
        if (newComment.trim() === '') {
            setCommentError(true)
            setLoading(false)
            return;
        }
        if (userID === '') {
            setCommentError(true)
            setLoading(false)
            return;
        }

        await supabase
            .from('comments')
            .insert([
                {
                    postID: postID,
                    comment: newComment,
                    user_id: userID,
                },
            ])
            .eq('postID', postID)

        // Clear the input field after adding a comment
        setNewComment('');
        setUserID('');

        // Fetch comments again to include the newly added comment
        getComments();
        setLoading(false)
    };

    useEffect(() => {
        getComments();
    }, [postID]);

    return (
        <section >
            <h2 className='hero text-4xl'>Comments </h2>
            <div className='flex justify-center'>
                {commentError && <p className='alert alert-error mt-2 w-[40rem] '>Please fill in the info before Commenting!</p>}
            </div>
            <form className=''>
                <textarea
                    className='textarea textarea-bordered h-40 hero mt-5 '
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <div className='hero'>
                    <input
                        type="number"
                        className='input input-bordered w-[20rem] text-center mt-4'
                        placeholder='Enter A ID'
                        onChange={(e) => setUserID(Number(e.target.value))}
                    />
                </div>
            </form>
            <div className='hero'>
                {loading ? <p className='loading'></p> :
                    <button onClick={addComment} className='btn mt-4 w-[20rem]'>Submit</button>
                }
            </div>
            <ul className=' hero-overlay mt-2'>
                {comments?.map((comment) => (
                    <li key={comment.id}>User {comment.user_id}: {comment.comment}</li>
                ))}
            </ul>
        </section>
    );
};

export default CommentSection;
