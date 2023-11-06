import { useState } from "react"
import { supabase } from "../client"

const Create = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        passKey: 0,
        image: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
    

        const createPost = async () => {
            await supabase
                .from('posts')
                .insert([
                    { title: form.title, content: form.description, secretKey: form.passKey, image: form.image }
                ])
        }

        await createPost()
    }

    return (
        <>
            <section className="p-[90px] ">
                <form className="">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="input input-bordered mb-5"
                            onChange={(e) => setForm(
                                { ...form, title: e.target.value }
                            )} />
                    </div>
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
                    <div>
                        <input
                            type="number"
                            placeholder="Enter Passkey"
                            className="input input-bordered"
                            onChange={(e) => setForm(
                                { ...form, passKey: Number(e.target.value) }
                            )} />
                    </div>
                    <button className="btn" onClick={handleSubmit}>Create Post</button>
                </form>
            </section>
        </>
    )
}

export default Create