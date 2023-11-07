import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../client"

const Update = () => {
    const params = useParams()
    const [post, setPost] = useState(null)


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
            <p>{params.id}</p>
            {post && (
                <section className="p-[40px] w-96 shadow-xl card card-bordered"  >
                    <div className="card-body">
                        <h2 className="card-title">{post?.title}</h2>
                        <p className="card">{post?.content}</p>
                    </div>
                </section>
            )}

            <section>
                <button className="btn">Save Changes </button>
                <button className="btn">Delete Post </button>
            </section>
        </>
    )
}

export default Update