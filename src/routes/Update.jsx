import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../client"

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
    })


    const getPost = async () => {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('postID', params.id)
        setPost(data[0])
    }


    const updatePost = async (e) => {
        e.preventDefault()

        const updatedPost = {
            title: form.title === '' ? post.title : form.title,
            content: form.content === '' ? post.content : form.content,
        }

        await supabase
            .from('posts')
            .update(updatedPost)
            .eq('postID', params.id)

        setStatus({ isUpdated: true })
        setTimeout(() => {
            setStatus({ isUpdated: false })

        }, 2000)
    }

    const deletePost = async (e) => {
        e.preventDefault()

        await supabase
            .from('posts')
            .delete()
            .eq('postID', params.id)

        setStatus({ isDeleted: true })
        setTimeout(() => {
            setStatus({ isDeleted: false })

        }, 2000)
    }

    useEffect(() => {
        getPost()
    }, [])
    return (
        <>
            <section className="p-[50px]">
                {post && (
                    <section className="p-[120px] w-[55rem] shadow-xl card card-bordered "  >
                        <div className="card-body">
                            <h2 className="hero text-4xl ">{post?.title}</h2>
                            <p className="card text-2xl text-ellipsis ">{post?.content}</p>
                        </div>
                        <img src={post?.image} alt="Image of Bug by User" />
                    </section>
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
                            placeholder="Enter Description"
                            onChange={(e) => setForm({
                                ...form, content: e.target.value
                            })}
                        ></textarea>
                        <label className="label">
                            <span className="label-text-alt"></span>
                            <span className="label-text-alt">Enter Description </span>
                        </label>
                    </div>
                    <section>
                        <button
                            className="btn"
                            onClick={(e) => { updatePost(e) }}>Save Changes</button>
                        <button
                            className="btn"
                            onClick={(e) => { deletePost(e) }}>Delete Post </button>

                        {status.isUpdated && (
                            <div className="alert alert-success mt-5">
                                <div className="flex-1">
                                    <label className="label">Post Updated Successfully!! Please Refresh Page to see changes</label>
                                </div>
                            </div>
                        )}
                        {
                            status.isDeleted && (
                                <div className="alert alert-success mt-5">
                                    <div className="flex-1">
                                        <label className="label">Post Deleted Successfully!! Click here to go to Home Page</label>
                                    </div>
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