import { useEffect, useState } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom"
import LandingPage from "./LandingPage"

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

    const likeCounter = async (postID) => {
        const postToUpdate = posts.find(post => post.id === postID)

        if (postToUpdate) {
            const updatedLikes = postToUpdate.likes + 1

            await supabase
                .from('posts')
                .update({ likes: updatedLikes })
                .eq('id', postID)
                .select('likes')

            setPosts(prevPosts => prevPosts.map(post => {
                if (post.id === postID) {
                    return { ...post, likes: updatedLikes }
                }
                return post
            }))

        }
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
                    onChange={(e) =>
                        setSearch(e.target.value)
                    } />
            </form>
            <div className="space-x-5 flex justify-center mt-2">
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
            <section className="p-[60px] grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2">
                {posts && posts.map(post => (
                    <section key={post?.id} className="p-[40px] w-96 card-bordered card card-normal mt-4 bg-neutral-focus shadow-lg">
                        {status.loading ? <p className="loading loading-lg"></p> :
                            <>
                                <p>Posted {post.created_at} </p>
                                <div className="card-body">
                                    <h2 className="card-title">{post?.title}</h2>
                                </div>
                                <div className="card-footer flex space-x-32">
                                    <Link to={`/post/${post?.postID}`}>
                                        <button className="btn ">Read More</button>
                                    </Link>
                                    <button className="btn " onClick={() => likeCounter(post?.id)}>👍{post?.likes}</button>
                                </div>
                            </>
                        }
                    </section>
                ))}
            </section>
        </>
    )
}

export default Home