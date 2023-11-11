import { useState } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom"

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


    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ ...status, loading: true })

        // Remove the fake path from the image
        const path = form.image.split('\\')
        const newPath = path[path.length - 1]

        // Check if all fields are filled
        if (!form.title || !form.description || !form.passKey) {

            setStatus({ ...status, alert: true })
            setStatus({ ...status, loading: false })

            setTimeout(() => {
                setStatus({ ...status, alert: false })

            }, 2000)
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

            const createPost = async () => {
                await supabase
                    .from("posts")
                    .insert([updatedPost])
            }

            await createPost()

            setStatus({ ...status, loading: false })
            setStatus({ ...status, success: true })
            setForm({
                title: '',
                description: '',
                passKey: 0,
                image: ''
            })
        }
    }

    return (
        <>
            <section className="p-[90px] ">
                <h2 className="text-3xl hero mb-4 text-white">Create New Post</h2>
                {setStatus.alert && <p className="alert alert-error mb-[20px]">Please fill in all fields</p>}
                <form className="flex justify-center items-center form-control  ">
                    <input
                        type="text"
                        placeholder="Enter Title"
                        className="input input-bordered mb-5 w-[35rem] "
                        onChange={(e) => setForm(
                            { ...form, title: e.target.value }
                        )} />
                    <div className="form-control">
                        <textarea
                            className="textarea textarea-bordered h-24 w-[35rem]"
                            placeholder="Enter Description"
                            onChange={(e) => setForm({
                                ...form, description: e.target.value
                            })}
                        ></textarea>
                        <label className="label">
                            <span className="label-text-alt"></span>
                            <span className="label-text-alt">Enter Description </span>
                        </label>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered mb-5 w-[35rem]"
                        placeholder="Enter Image URL | Optional"
                        onChange={(e) => setForm(
                            { ...form, image: e.target.value }
                        )} />
                    <div>
                        <input
                            type="number"
                            placeholder="Enter 4 digit passkey"
                            className="input input-bordered w-[35rem]"
                            onChange={(e) => setForm(
                                { ...form, passKey: Number(e.target.value) }
                            )} />
                        <label className="label">
                            <span className="label-text-alt ">For Editing post later </span>
                        </label>
                    </div>
                    {setStatus.loading ?
                        <p className="loading"></p>
                        : <button
                            className="btn mt-5 w-[35rem] text-white"
                            onClick={handleSubmit}>Create Post</button>}
                    {
                        setStatus.success &&
                        <>
                            <p className="alert alert-success mt-5">Post created successfully</p>
                            <Link to="/" className="btn mt-5">Check it out here!</Link>
                        </>
                    }
                </form>
            </section>
        </>
    )
}

export default Create