/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { supabase } from "../client"

/** Returns all posts in the DB
 * @param {Object} props
 * @param {Array} props.posts - Array of posts
 * @param {Function} props.setPosts - Function to set posts
 * @param {Boolean} props.status - Status of the posts
 * @returns 
 */
const AllPosts = ({ posts, setPosts, status }) => {

    /** Increments the like counter for a post
     * @param {Number} postID 
     * @returns Updated like
     */
    const likeCounter = async (postID) => {
        const postToUpdate = posts.find(post => post.id === postID)

        if (postToUpdate) {
            const updatedLikes = postToUpdate.likes + 1

            await supabase
                .from('posts')
                .update({ likes: updatedLikes })
                .eq('id', postID)
                .select('likes')

            setPosts(prevPosts => prevPosts.map(post => {
                if (post.id === postID) {
                    return { ...post, likes: updatedLikes }
                }
                return post
            }))

        }
    }
    return (
        <>
            <section className="p-[28px] sm:p-[60px] flex justify-center flex-wrap sm:grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 ">
                {posts && posts.map(post => (
                    <section key={post?.id} className="p-[40px] w-96 card-bordered card card-normal mt-4 bg-neutral-focus shadow-lg">
                        {status.loading ?
                            <div className="card-body">
                                <p className="loading loading-lg card-title ml-[6rem]">1</p>
                            </div>
                            :
                            <>
                                <p>Posted {post.created_at} </p>
                                <div className="card-body">
                                    <h2 className="card-title text-white">{post?.title}</h2>
                                </div>
                                <div className="card-footer flex space-x-32">
                                    <Link to={`/post/${post?.postID}`}>
                                        <button className="btn ">Read More</button>
                                    </Link>
                                    <button className="btn " onClick={() => likeCounter(post?.id)}>👍{post?.likes}</button>
                                </div>
                            </>
                        }
                    </section>
                ))}
            </section>
        </>
    )
}

export default AllPosts