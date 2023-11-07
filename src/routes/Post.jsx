import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../client"
import { useEffect, useState } from "react"

const Post = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [secretKey, setSecretkey] = useState(0)
    const [isNotSecretKey, setisNotSecretKey] = useState(false)
    const [isSecretKey, setisSecretKey] = useState(false)


    /** Function for getting the post from the database
     */
    const getPost = async () => {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('postID', params.id)

        setPost(data[0])
    }

    /** Function for checking the secretKey
     * @param {number} secretKey 
     */
    const checkPasskey = async (secretKey) => {
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('postID', params.id)
            .eq('secretKey', secretKey)

        // If the secretKey is correct, redirect to the Update page
        if (data.length > 0) {
            setisSecretKey(true)
            setTimeout(() => {

                navigate(`/update/${params.id}`)
            }, 1500)
        }
        else {
            setisNotSecretKey(true)

            setTimeout(() => {
                setisNotSecretKey(false)
            }, 2500)
        }

    }

    useEffect(() => {
        getPost()
    }, [])


    return (
        <>
            {post && (
                <section className="p-[40px] w-96 shadow-xl card card-bordered"  >
                    <div className="card-body">
                        <h2 className="card-title">{post?.title}</h2>
                        <p className="card">{post?.content}</p>
                    </div>
                </section>
            )}
            <section>
                <form >
                    <input
                        type="number"
                        className="input input-bordered text-ellipsis"
                        placeholder="Enter secretKey to edit post"
                        onChange={(e) => { setSecretkey(Number(e.target.value)) }} />
                </form>
                <button className="btn mt-5" onClick={() => checkPasskey(secretKey)}>Enter secretKey</button>
                {isSecretKey && <p className="alert alert-success uppercase mt-5">You are allowed to Edit</p>}
                {isNotSecretKey && <p className="alert alert-error uppercase mt-5">secretKey is Wrong</p>}
            </section>
        </>
    )
}

export default Post