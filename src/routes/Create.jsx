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
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [success, setSuccess] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Remove the fake path from the image
        const path = form.image.split('\\')
        const newPath = path[path.length - 1]

        // Check if all fields are filled
        if (!form.title || !form.description || !form.passKey) {
            setAlert(true)
            setLoading(false)

            setTimeout(() => {
                setAlert(false)

            }, 2000)
        }
        else {

            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth()
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

            setLoading(false)
            setSuccess(true)
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
                {alert && <p className="alert alert-error mb-[20px]">Please fill in all fields</p>}
                <form className="form-control">
                    <input
                        type="text"
                        placeholder="Enter Title"
                        className="input input-bordered mb-5"
                        onChange={(e) => setForm(
                            { ...form, title: e.target.value }
                        )} />
                    <div className="form-control">
                        <textarea
                            className="textarea textarea-bordered h-24"
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
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                        className="file-input file-input-bordered mb-5"
                        onChange={(e) => setForm(
                            { ...form, image: e.target.value }
                        )} />
                    <div>
                        <input
                            type="number"
                            placeholder="Enter 4 digit passkey"
                            className="input input-bordered"
                            onChange={(e) => setForm(
                                { ...form, passKey: Number(e.target.value) }
                            )} />
                        <label className="label">
                            <span className="label-text-alt ">For Editing post later </span>
                        </label>
                    </div>
                    {loading ?
                        <p className="loading"></p>
                        : <button className="btn mt-5 " onClick={handleSubmit}>Create Post</button>}
                    {
                        success &&
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