import { useEffect, useState } from "react"
import { supabase } from "../client"
import LandingPage from "./LandingPage"
import AllPosts from "../components/AllPosts"

const Home = () => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState({
        sortBy: false,
        loading: false
    })

    const getPosts = async () => {
        setStatus({ ...status, loading: true })
        let { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: status.sortBy })

        try {
            setPosts(data)
            setStatus({ ...status, loading: false })
        } catch (error) {
            console.error(error)
            setStatus({ ...status, loading: false })
        }
    }
    useEffect(() => {
        getPosts()
    }, [status.sortBy])

    const handleSortChange = () => {
        setStatus({ ...status, sortBy: !status.sortBy })
    }

    const searchPosts = async () => {
        // Searching posts by Title
        const { data } = await supabase
            .from('posts')
            .select('*')
            .textSearch('title', search)

        setPosts(data)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        searchPosts()
    }


    return (
        <>
            <LandingPage />
            <form className="hero mt-4">
                <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Search Posts by Title"
                    onChange={(e) =>
                        setSearch(e.target.value)
                    } />
            </form>
            <div className="space-x-6 flex justify-center mt-2">
                <button className="btn" onClick={(e) => handleFormSubmit(e)}>Search</button>
                <button className="btn" onClick={() => getPosts()}>Reset</button>
            </div>
            <div className="space-x-5 flex justify-center mt-3">
                <button
                    className="btn"
                    onClick={() => handleSortChange()}
                >
                    Sort Date {status.sortBy ? 'Ascending' : 'Descending'}
                </button>
            </div>
            <AllPosts posts={posts} setPosts={setPosts} status={status} />
        </>
    )
}

export default Home