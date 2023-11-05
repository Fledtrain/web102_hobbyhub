import { useEffect, useState } from "react"
import { supabase } from "../client"

const Home = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        let { data, error } = await supabase
            .from('posts')
            .select('*')

        console.log(data, error)
    }
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}

export default Home