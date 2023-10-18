import * as React from "react"
import {useEffect, useState} from "react"
import {ChakraProvider, theme} from "@chakra-ui/react"
import Navigation from "./Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "react-oidc-context";
import {authSettings} from "./auth/AuthSettings";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import ErrorBoundary from "./ErrorBoundary";

import "react-datepicker/dist/react-datepicker.css";
import useAuthService from "./auth/AuthService";
import SpinnerCentered from "./components/SpinnerCentered";
import {CurrentUserDto, OpenAPI, UserService} from "../generated";

export function App() {
    return (
        <ErrorBoundary>
            <AuthProvider {...authSettings}>
                <ChakraProvider theme={theme}>
                    <LoginAndRoute/>
                </ChakraProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export function LoginAndRoute() {
    const authService = useAuthService()
    const [user, setUser] = useState<CurrentUserDto | undefined>()

    OpenAPI.BASE = window.location.protocol + "//" + window.location.host + "/api"
    OpenAPI.TOKEN = authService.getAccessToken();

    useEffect(() => {
        if (!authService.isLoading() && !authService.isLoggedIn()) {
            authService.login()
                .catch(_ => { throw new Error() })
        }
    })

    useEffect(() => {
        if (authService.isLoggedIn() && user == null) {
            UserService.getCurrentUser()
                .then((user) => setUser(user))
                .catch(_ => { throw new Error() })
        }
    })

    if (user == null) {
        return <SpinnerCentered/>
    } else {
        return (
            <BrowserRouter>
                <Navigation user={user}>
                    <Routes>
                        <Route path="/*" element={<HomePage/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                    </Routes>
                </Navigation>
            </BrowserRouter>
        )
    }
}
