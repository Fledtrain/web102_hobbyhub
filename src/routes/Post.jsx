import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../client"
import { useEffect, useState } from "react"
import CommentSection from "../components/CommentSection"

const Post = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [secretKey, setSecretkey] = useState(0)
    const [status, setStatus] = useState({
        isNotSecretKey: false,
        isSecretKey: false,
        loading: false
    })


    /** Function for getting the post from the database
     */
    const getPost = async () => {
        setStatus({ ...status, loading: true })
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('postID', params.id)

        setStatus({ ...status, loading: false })
        setPost(data[0])
    }

    /** Function for checking the secretKey
     * @param {number} secretKey 
     */
    const checkPasskey = async (e, secretKey) => {
        e.preventDefault()
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('postID', params.id)
            .eq('secretKey', secretKey)

        // If the secretKey is correct, redirect to the Update page
        if (data.length > 0) {
            setStatus({ ...status, isSecretKey: true})
            setTimeout(() => {

                navigate(`/update/${params.id}`)
            }, 1500)
        }
        else {
            setStatus({ ...status, isNotSecretKey: true})
            
            setTimeout(() => {
                setStatus({ ...status, isNotSecretKey: false})
            }, 2500)
        }

    }

    useEffect(() => {
        getPost()
    }, [])



    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full xl:w-2/4">
                    <section className="p-[50px]">
                        {post && (
                            <section className="p-[120px] w-[55rem] shadow-xl card card-bordered bg-neutral-focus "  >
                                <div className="card-body">
                                    {status.loading ?
                                        <div className="hero">
                                            <p className="loading loading-lg p-[30px]"></p>
                                        </div>
                                        :
                                        <>
                                            <h2 className="hero text-4xl text-white ">{post?.title}</h2>
                                            <p className="card text-2xl text-ellipsis ">{post?.content}</p>
                                            <div className="mt-4">
                                                <p className="text-xl">👍: {post?.likes}</p>
                                            </div>
                                        </>
                                    }
                                </div>
                            </section>
                        )}
                    </section>
                </div >
                <section className="p-[50px] w-full xl:w-2/4 ">
                    <CommentSection postID={post?.postID} />
                </section>
            </div >
            <section className="flex flex-col">
                <form>
                    <div className="hero">
                        <input
                            type="number"
                            className="input input-bordered text-ellipsis mt-5 w-[17rem] text-center  "
                            placeholder="Enter Secret Key to edit post"
                            onChange={(e) => { setSecretkey(Number(e.target.value)) }} />
                    </div>
                    <div className="hero">
                        <button className="btn mt-5 w-[20rem]" onClick={(e) => checkPasskey(e, secretKey)}>Enter secretKey</button>
                    </div>
                </form>
                <div className="hero">
                    <div className="">
                        {status.isSecretKey && <p className="alert alert-success uppercase mt-5">You are allowed to Edit</p>}
                        {status.isNotSecretKey && <p className="alert alert-error uppercase mt-5 font-semibold">secretKey is Wrong</p>}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Post