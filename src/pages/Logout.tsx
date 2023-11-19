import React, {useEffect} from "react";
import {Box, Button} from "@chakra-ui/react";
import {Logo} from "../Logo";
import {useNavigate} from "react-router-dom";
import useAuthService from "../auth/AuthService";

export default function LogoutPage() {
    const navigate = useNavigate()
    const auth = useAuthService()

    useEffect(() => { auth.logout().catch() }, [])

    return (
        <Box className={"centered-parent"}>
            <Box className={"centered-child"}>
                <Logo marginBottom={"20px"}></Logo>
                <Button onClick={() => navigate("/")} width={"100%"}>Login
                </Button>
            </Box>
        </Box>
    )
}
