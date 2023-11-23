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
import RedirectPage from "./pages/Redirect";
import LogoutPage from "./pages/Logout";

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
    const authService = useAuthService()
    const [user, setUser] = useState<CurrentUserDto | undefined>()

    OpenAPI.BASE = window.location.protocol + "//api." + window.location.host + "/v1"
    OpenAPI.TOKEN = authService.getAccessToken();

    useEffect(() => {
        if (!authService.isLoading() && !authService.isLoggedIn()) {
            localStorage.setItem("request-url", window.location.href)
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
