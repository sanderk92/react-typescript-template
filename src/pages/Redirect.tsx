import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {clearRequestUrl, getRequestUrl} from "../utils/Login";

export default function RedirectPage() {
    const navigate = useNavigate()

    useEffect(() => {
        const url = getRequestUrl()
        clearRequestUrl()
        navigate(url ? new URL(url).pathname : "/inbox")
    })
    return <></>
}
