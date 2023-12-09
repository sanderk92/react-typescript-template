import * as React from "react"
import {useEffect, useState} from "react"
import {Box, ChakraProvider, Spinner, theme, useToast} from "@chakra-ui/react"
import Navigation from "./Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "react-oidc-context";
import {authSettings} from "./auth/AuthSettings";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import ErrorBoundary from "./ErrorBoundary";

import "react-datepicker/dist/react-datepicker.css";
import useAuthService from "./auth/AuthService";
import {CurrentUserDto, OpenAPI, UserService} from "../generated";
import RedirectPage from "./pages/Redirect";
import LogoutPage from "./pages/Logout";
import {HiLightningBolt} from "react-icons/all";

export function App() {
    return (
        <ErrorBoundary>
            <AuthProvider {...authSettings}>
                <ChakraProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<AppNavigation/>}/>
                            <Route path="/logout" element={<LogoutPage/>}/>
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

    const [error, setError] = useState(false)
    const [user, setUser] = useState<CurrentUserDto | undefined>()

    OpenAPI.BASE = window.location.protocol + "//api." + window.location.host + "/v1"
    OpenAPI.TOKEN = auth.getAccessToken();

    useEffect(() => {
        if (!error && !auth.isLoading() && !auth.isLoggedIn()) {
            localStorage.setItem("request-url", window.location.href) // TODO Should use state parameter for this
            auth.login()
                .catch(e => {
                    setError(true)
                    toast({title: `Login error`, description: e.message, status: "error", duration: 5000})
                })
        }
    })

    useEffect(() => {
        if (!error && auth.isLoggedIn() && user == null) {
            UserService.getCurrentUser()
                .then((user) => setUser(user))
                .catch(e => {
                    setError(true)
                    toast({title: `Server error`, description: e.message, status: "error", duration: 5000})
                })
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
                    <Route path="/*" element={<HomePage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/redirect" element={<RedirectPage/>}/>
                </Routes>
            </Navigation>
        )
    }
}
