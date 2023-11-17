import { useState } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom"

/** Function for create post page
 * @returns Create Route
 */
const Create = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        passKey: 0,
        image: ''
    })

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: false
    })


    /** Function to handle submit
     * @param {Event} e - Event
     * @returns  
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ ...status, loading: true })

        // Remove the fake path from the image
        const path = form.image.split('\\')
        const newPath = path[path.length - 1]

        // Check if all fields are filled
        if (form.title === "" || form.description === "" || form.passKey === "") {

            setStatus({ ...status, loading: false, error: true })

            setTimeout(() => {
                setStatus({ ...status, error: false })

            }, 3000)
        }
        else {

            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()

            const updatedPost = {
                created_at: `${year}-${month}-${day}`,
                title: form.title,
                content: form.description,
                secretKey: form.passKey,
                image: newPath
            }

            /**Function to create a post
             * @returns Newly created post
             */
            const createPost = async () => {
                await supabase
                    .from("posts")
                    .insert([updatedPost])
            }

            await createPost()

            setStatus({
                loading: false,
                alert: false,
                success: true,
            });
            setForm({
                title: '',
                description: '',
                passKey: 0,
                image: ''
            })

            setTimeout(() => {
                setStatus({ ...status, success: false })
            }, 3000)
        }
    }

    return (
        <>
            <main className="p-[90px] ">
                <h1 className="text-3xl hero mb-4 text-white">Create New Post</h1>
                {status.error &&
                    <div className="flex justify-center">
                        <p className="alert alert-error mb-[20px] w-[35rem]">Please fill in all fields</p>
                    </div>

                }
                <form label="Create Post Form" className="flex justify-center items-center form-control  ">
                    <input
                        type="text"
                        placeholder="Enter Title"
                        className="text-white input input-bordered mb-5 sm:w-[35rem] required:ring-2 required:ring-red-600 required:border-transparent  "
                        required={form.title === "" && status.error ? true : false}
                        onChange={(e) => setForm(
                            { ...form, title: e.target.value }
                        )}
                        aria-labelledby="Enter Title"
                        aria-placeholder="Enter Title"
                        aria-required="true"
                    />
                    <div className="form-control">
                        <textarea
                            className="textarea textarea-bordered 
                            h-24 sm:w-[35rem] text-white required:ring-2 required:ring-red-600 required:border-transparent
                            "
                            required={form.description === "" && status.error ? true : false}
                            placeholder="Enter Description"
                            onChange={(e) => setForm({
                                ...form, description: e.target.value
                            })}
                            aria-required="true"
                            aria-labelledby="Enter Description"
                            aria-placeholder="Enter Description"
                        ></textarea>
                        <label className="label">
                            <span className="label-text-alt"></span>
                            <span className="label-text-alt">Enter Description for Post </span>
                        </label>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered mb-5 sm:w-[35rem] text-white text-ellipsis"
                        aria-labelledby="Enter Image URL | Optional"
                        aria-placeholder="Enter Image URL | Optional"
                        placeholder="Enter Image URL | Optional"
                        onChange={(e) => setForm(
                            { ...form, image: e.target.value }
                        )} />
                    <div>
                        <input
                            type="number"
                            placeholder="Enter 4 digit passkey"
                            className="input input-bordered sm:w-[35rem] text-white required:ring-2 required:ring-red-600 required:border-transparent"
                            required={form.passKey === "" && status.error ? true : false}
                            onChange={(e) => setForm(
                                { ...form, passKey: Number(e.target.value) }
                            )}
                            aria-labelledby="Enter 4 digit passkey"
                            aria-placeholder="1234"
                            aria-required="true"
                        />
                        <label className="label">
                            <span className="label-text-alt ">For Editing post later </span>
                        </label>
                    </div>
                    {status.loading ?
                        <p className="loading"></p>
                        : <button
                            className="btn mt-5 sm:w-[35rem] text-white"
                            onClick={handleSubmit}
                        >
                            Create Post</button>}
                    {
                        status.success &&
                        <>
                            <div>
                                <p className="alert alert-success mt-5 w-[35rem]">Post created successfully</p>
                            </div>
                            <Link to="/" className="btn mt-5">Check it out here!</Link>
                        </>
                    }
                </form>
            </main>
        </>
    )
}

export default Create