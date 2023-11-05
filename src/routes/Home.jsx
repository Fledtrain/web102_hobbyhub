import { useEffect, useState } from "react"
import { supabase } from "../client"

const Home = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        let { data, error } = await supabase
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

    return (
        <>
            <section>
                <h1>Home Page</h1>
                {posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
                </section>
        </>
    )
}

export default Home