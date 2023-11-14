import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { supabase } from "../client"

/** Function for update post page
 * @returns Update Route
 */
const Update = () => {
    const params = useParams()
    const [post, setPost] = useState(null)
    const [form, setForm] = useState({
        title: '',
        content: '',
    })

    const [status, setStatus] = useState({
        isUpdated: false,
        isDeleted: false,
        isLoading: false
    })


    /** Function to get the post from the database
     * @returns Post from the database
     */
    const getPost = async () => {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('postID', params.id)
        setPost(data[0])
    }


    /** Function to update the post
     * @param {Event} e - Event 
     * @returns Updated post
     */
    const updatePost = async (e) => {
        e.preventDefault()
        setStatus({ ...status, isLoading: true })

        const updatedPost = {
            title: form.title === '' ? post.title : form.title,
            content: form.content === '' ? post.content : form.content,
        }

        await supabase
            .from('posts')
            .update(updatedPost)
            .eq('postID', params.id)

        setStatus({ ...status, isLoading: false, isUpdated: true })
        setTimeout(() => {
            setStatus({ ...status, isUpdated: false })
        }, 4000)
        getPost()
    }

    /** Function to delete the post
     * @param {Event} e - Event 
     */
    const deletePost = async (e) => {
        e.preventDefault()
        setStatus({ ...status, isLoading: true })

        await supabase
            .from('comments')
            .delete()
            .eq('postID', params.id)

        await supabase
            .from('posts')
            .delete()
            .eq('postID', params.id)


        setStatus({ ...status, isLoading: false, isDeleted: true })
        setTimeout(() => {
            setStatus({ ...status, isDeleted: false })

        }, 8000)
    }



    useEffect(() => {
        getPost()
    }, [])
    return (
        <>
            <section className="p-[50px]">
                {post && (
                    <div className="hero">
                        <section className="p-[120px] w-[55rem] shadow-xl card card-bordered bg-neutral-focus  "  >
                            <div className="card-body">
                                <h2 className="hero text-4xl ">{post?.title}</h2>
                                <p className="card text-2xl text-ellipsis ">{post?.content}</p>
                            </div>
                            {post?.image ?
                                <img src={post?.image} className="w-[70px]" alt="Image" /> :
                                null
                            }
                        </section>
                    </div>
                )}
                <form className="flex flex-col hero mt-5">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-[35rem] mb-5"
                        onChange={(e) => setForm({
                            ...form, title: e.target.value
                        })} />
                    <div className="form-control">
                        <textarea
                            className="textarea textarea-bordered w-[35rem] h-36"
                            placeholder={"Enter Description"}
                            onChange={(e) => setForm({
                                ...form, content: e.target.value
                            })}
                        ></textarea>
                        <label className="label">
                            <span className="label-text-alt"></span>
                            <span className="label-text-alt">Enter Description </span>
                        </label>
                    </div>
                    <section className="space-x-6">
                        {status.isLoading ? <p className="loading loading-lg"></p> :
                            <>
                                <button
                                    className="btn"
                                    onClick={(e) => { updatePost(e) }}>Save Changes</button>
                                <button
                                    className="btn"
                                    onClick={(e) => { deletePost(e) }}>Delete Post </button>
                            </>
                        }
                    </section>
                    <section>
                        {status.isUpdated && (
                            <div className="alert alert-success mt-5">
                                <div className="">
                                    <label className="label ">Post Updated Successfully!!</label>
                                </div>
                                <Link to={`/post/${params.id}`}>
                                    <button className="">Click here to go to back to post</button>
                                </Link>
                            </div>
                        )}
                        {
                            status.isDeleted && (
                                <div className="alert alert-error mt-5">
                                    <div className="flex">
                                        <label className="label">Post Deleted Successfully!!</label>
                                    </div>
                                    <Link to="/">
                                        <button className="">Click here to go to Home Page</button>
                                    </Link>
                                </div>
                            )
                        }
                    </section>
                </form>
            </section>
        </>
    )
}

export default Update