import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
            <nav className="p-[44px] flex justify-around items-center hero-overlay">
                <Link to="/">
                    <h2 className="text-4xl">The GamerHub</h2>
                </Link>
                <ul className="space-x-6">
                    <Link to="/">
                        <button className="btn ">
                            Home
                        </button>
                    </Link>
                    <Link to="/create">
                        <button className="btn ">
                            Create new Post
                        </button>
                    </Link>
                </ul>
            </nav>
        </>
    )
}

export default Header