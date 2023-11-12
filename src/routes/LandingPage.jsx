import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <>
            <section className="">
                <div className="flex justify-center p-[30px] flex-wrap text-center">
                    <h1 className="text-3xl">
                        Welcome to GamerHub!!!
                        Where you can post the latest Gamer News to everyone around the Globe for
                        <span className="uppercase"> free!</span>
                    </h1>
                </div>
                <Link to="/create">
                    <button className="hero text-2xl font-semibold">Click Here to make a new Post</button>
                </Link>
                <p className="hero text-2xl mt-2">Or Browse Below </p>
            </section>
        </>
    )
}

export default LandingPage