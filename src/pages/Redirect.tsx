import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function RedirectPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const original = localStorage.getItem("request-url")
        const originalPath = original ? new URL(original).pathname : "/"
        localStorage.removeItem("request-url")
        navigate(originalPath)
    })
    return <></>
}
