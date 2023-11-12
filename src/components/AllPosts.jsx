/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { supabase } from "../client"


const AllPosts = ({ posts, setPosts, status }) => {
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
            <section className="p-[60px] grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 ">
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
                                    <h2 className="card-title">{post?.title}</h2>
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