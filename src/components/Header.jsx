import { Link } from "react-router-dom"

/**
 * 
 * @returns Header
 */
const Header = () => {
    return (
        <>
            <nav className="p-[44px] flex justify-around items-center hero-overlay">
                <Link to="/">
                    <h2 className="text-4xl text-white">The Gamer<span className="">Hub</span></h2>
                </Link>
                <ul className="space-x-6">
                    <Link to="/">
                        <button className="btn text-[#DDDDDD]">
                            Home
                        </button>
                    </Link>
                    <Link to="/create">
                        <button className="btn text-[#DDDDDD] ">
                            Create new Post
                        </button>
                    </Link>
                </ul>
            </nav>
        </>
    )
}

export default Header