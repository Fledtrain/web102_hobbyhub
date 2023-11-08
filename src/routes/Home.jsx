import { useEffect, useState } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom"

const Home = () => {
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState(0)

    const getPosts = async () => {
        let { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        try {
            setPosts(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getPosts()
    }, [])

    const likeCounter = async () => {
        setLikes(likes + 1)

        // If user likes post twice, remove the like
        if (likes === 1) {
            setLikes(likes - 1)
        }


        const { data } = await supabase
            .from('posts')
            .update({ likes: posts.likes })
            .eq('postID', posts.postID)
            .select('likes')
    }


    return (
        <>
            <section className="p-[60px] grid 2xl:grid-cols-4 md:grid-cols-2">
                {posts && posts.map(post => (
                    <section key={post?.id} className="p-[40px] w-96 shadow-xl card card-bordered">
                        <p>Posted {post.created_at} </p>
                        <div className="card-body">
                            <h2 className="card-title">{post?.title}</h2>
                            <p className="card">{post?.content}</p>
                        </div>
                        <div className="card-footer flex space-x-32">
                            <Link to={`/post/${post?.postID}`}>
                                <button className="btn ">Read More</button>
                            </Link>
                            <button className="btn " onClick={() => likeCounter}>👍{likes}</button>
                        </div>
                    </section>
                ))}
            </section>
        </>
    )
}

export default Home