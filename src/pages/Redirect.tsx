import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {host} from "../auth/AuthSettings";

export default function RedirectPage() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate(localStorage.getItem("request-url")?.replace(host, "") ?? "/")
    })
    return <></>
}
