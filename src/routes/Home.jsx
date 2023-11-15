import { useEffect, useState } from "react"
import { supabase } from "../client"
import LandingPage from "./LandingPage"
import AllPosts from "../components/AllPosts"

/** Function for home page
 * @returns Home Route
 */
const Home = () => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState({
        sortBy: false,
        loading: false
    })

    /** Function to get all posts
     * @returns All posts
     */
    const getPosts = async () => {
        setStatus({ ...status, loading: true })
        try {
            let { data } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: status.sortBy })

            setPosts(data)
        } catch (error) {
            console.error(error)
            setStatus({ ...status, loading: false })
        } finally {
            setStatus({ ...status, loading: false })
        }
    }
    useEffect(() => {
        getPosts()
    }, [status.sortBy])

    /** Function to sort posts
     * @returns Sorted posts
     */
    const handleSortChange = () => {
        setStatus({ ...status, sortBy: !status.sortBy })
    }

    /** Function to search posts
     *  @returns Searched posts
     */
    const searchPosts = async () => {
        // Searching posts by Title
        const { data } = await supabase
            .from('posts')
            .select('*')
            .textSearch('title', search)

        setPosts(data)
    }

    /** Function to handle form submit
     * @param {Event} e - Event 
     * @returns {Function} searchPosts
     */
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