import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../client"

const Update = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [form, setForm] = useState({
        title: '',
        description: '',
    })


    const getPost = async () => {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('postID', params.id)
        setPost(data[0])
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
                                ...form, description: e.target.value
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
                            onClick={(e) => { }}>Save Changes </button>
                        <button
                            className="btn"
                            onClick={(e) => { }}>Delete Post </button>



                        <button
                            className="btn"
                            onClick={() => {
                                navigate(`/update/${params.id}}`
                                )
                            }}>See Changes  </button>
                    </section>
                </form>
            </section>
        </>
    )
}

export default Update