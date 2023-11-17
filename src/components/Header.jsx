import { Link } from "react-router-dom"

/**
 * 
 * @returns Header
 */
const Header = () => {
    return (
        <>
            <nav className="p-[20px] md:p-[44px] flex justify-around items-center hero-overlay">
                <Link to="/" aria-current="page">
                    <h2 className="text-4xl text-white">The Gamer<span className="">Hub</span></h2>
                </Link>
                <div className="hidden sm:flex  sm:space-x-8">
                    <Link to="/" aria-current='page'>
                        <button className="btn text-[#DDDDDD]">
                            Home
                        </button>
                    </Link>
                    <Link to="/create">
                        <button className=" btn text-[#DDDDDD] ">
                            Create new Post
                        </button>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Header