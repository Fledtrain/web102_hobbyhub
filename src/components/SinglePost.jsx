/* eslint-disable react/prop-types */

/** SinglePost component
 * @param {object} props - props from the parent component
 * @param {object} props.post - post object from the database
 * @param {boolean} props.status - loading status
 * @returns 
 */
const SinglePost = ({ post, status }) => {
    return (
        <>
            <div className="w-full lg:w-2/4">
                <section className="p-[50px]">
                    {post && (
                        <section className="p-[120px] w-[30rem] sm:w-[35rem] xl:w-[45rem] shadow-xl card card-bordered bg-neutral-focus "  >
                            <div className="card-body">
                                {status.loading ?
                                    <div className="hero">
                                        <p className="loading loading-lg p-[30px]"></p>
                                    </div>
                                    :
                                    <>
                                        <h2 className="hero text-4xl text-white ">{post?.title}</h2>
                                        <div className="overflow-auto overflow-ellipsis text-left ">
                                            <p className="card text-2xl text-ellipsis">{post?.content}</p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-xl">👍: {post?.likes}</p>
                                        </div>
                                    </>
                                }
                            </div>
                        </section>
                    )}
                </section>
            </div >
        </>
    )
}

export default SinglePost