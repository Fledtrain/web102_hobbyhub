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
            <section className="p-[50px] hero">

                {post && (
                    <section className="p-[120px] w-[55rem] shadow-xl card card-bordered "  >
                        <div className="card-body">
                            <h2 className="hero text-4xl ">{post?.title}</h2>
                            <p className="card text-2xl text-ellipsis ">{post?.content}</p>
                        </div>
                    </section>
                )}
            </section>
            <section className="flex flex-col">
                <form className="hero">
                    <input
                        type="number"
                        className="input input-bordered text-ellipsis mt-5 w-[17rem] text-center "
                        placeholder="Enter Secret Key to edit post"
                        onChange={(e) => { setSecretkey(Number(e.target.value)) }} />
                </form>
                <div className="hero">
                    <div className="">
                        <button className="btn mt-5 w-[20rem]" onClick={() => checkPasskey(secretKey)}>Enter secretKey</button>
                        {isSecretKey && <p className="alert alert-success uppercase mt-5">You are allowed to Edit</p>}
                        {isNotSecretKey && <p className="alert alert-error uppercase mt-5 font-semibold">secretKey is Wrong</p>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Post