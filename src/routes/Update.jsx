import { useParams } from "react-router-dom"

const Update = () => {
    const params = useParams()
    return (
        <>
            <div>{params.id}</div>
        </>
    )
}

export default Update