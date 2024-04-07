import * as React from "react"
import {useEffect, useState} from "react"
import {Box, ChakraProvider, Spinner, useToast} from "@chakra-ui/react"
import Navigation from "./Navigation";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {AuthProvider} from "react-oidc-context";
import ErrorBoundary from "./ErrorBoundary";

import "react-datepicker/dist/react-datepicker.css";
import useAuthService from "./auth/AuthService";
import {CurrentUserDto, OpenAPI, UsersService} from "../generated";
import RedirectPage from "./pages/Redirect";
import {HiLightningBolt} from "react-icons/hi";
import {storeRequestUrl} from "./utils/Login";
import Inbox from "./pages/inbox/Inbox";
import Outbox from "./pages/inbox/Outbox";
import Contact from "./pages/contact/Contact";
import {authSettings} from "./auth/AuthSettings";
import HomePage from "./pages/home/HomePage";
import {theme} from "./ColorTheme";

export function App() {
    return (
        <ErrorBoundary>
            <AuthProvider {...authSettings}>
                <ChakraProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/*" element={<AppNavigation/>}/>
                        </Routes>
                    </BrowserRouter>
                </ChakraProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export function AppNavigation() {
    const toast = useToast()
    const auth = useAuthService()
    const navigate = useNavigate()

    const [error, setError] = useState(false)
    const [user, setUser] = useState<CurrentUserDto | undefined>()

    OpenAPI.BASE = window.location.protocol + "//api." + window.location.host
    OpenAPI.TOKEN = auth.getAccessToken();

    useEffect(() => {
        if (!error && !auth.isLoading() && !auth.isLoggedIn()) {
            storeRequestUrl()
            auth.login()
                .catch(e => {
                    setError(true)
                    toast({title: `Login error`, description: e.message, status: "error", duration: 5000})
                })
        }
    })

    useEffect(() => {
        if (!error && auth.isLoggedIn() && user == null) {
            UsersService.getCurrentUser()
                .then((user) => setUser(user))
                .catch(e => {
                    setError(true)
                    toast({title: `Server error`, description: e.message, status: "error", duration: 5000})
                })
        }
    })

    useEffect(() => {
        if (!error && user != null && window.location.pathname === "/") {
            navigate("/inbox")
        }
    })

    if (error) {
        return <Box className={"centered-parent"}><HiLightningBolt className={"centered-child"} size={60}/></Box>
    } else if (user == null) {
        return <Box className={"centered-parent"}><Spinner className="centered-child"></Spinner></Box>
    } else {
        return (
            <Navigation user={user}>
                <Routes>
                    <Route path="/inbox/*" element={<Inbox/>}/>
                    <Route path="/outbox/*" element={<Outbox/>}/>
                    <Route path="/contact/*" element={<Contact/>}/>
                    <Route path="/redirect" element={<RedirectPage/>}/>
                </Routes>
            </Navigation>
        )
    }
}
