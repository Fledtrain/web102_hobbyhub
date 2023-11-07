import { useEffect, useState } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom"

const Home = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        let { data } = await supabase
            .from('posts')
            .select('*')

        try {
            setPosts(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getPosts()
    }, [])

    console.log(posts[0]?.created_at)
    // Format date to hours
    const date = new Date(posts[0]?.created_at)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const formattedDate = `${hours}:${minutes}:${seconds}`
    console.log(formattedDate)


    return (
        <>
            <section className="p-[60px]">
                {posts && posts.map(post => (
                    <section key={post?.id} className="p-[40px] w-96 shadow-xl card card-bordered">
                        <p>Posted {post.created_at} hours ago </p>
                        <div className="card-body">
                            <h2 className="card-title">{post?.title}</h2>
                            <p className="card">{post?.content}</p>
                        </div>
                        <div className="card-footer">
                            <Link to={`/post/${post?.postID}`}>
                                <button className="btn ">Read More</button>
                            </Link>
                        </div>
                    </section>
                ))}
            </section>
        </>
    )
}

export default Home