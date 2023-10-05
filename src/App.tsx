import * as React from "react"
import {useEffect, useState} from "react"
import {ChakraProvider, theme, useToast} from "@chakra-ui/react"
import Navigation from "./Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "react-oidc-context";
import {authSettings} from "./auth/AuthSettings";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import ErrorBoundary from "./ErrorBoundary";
import {LoggedInUser} from "./http/model/user";

import "react-datepicker/dist/react-datepicker.css";
import {fetchUser, setBackendAccessToken} from "./http/backendService";
import useAuthService from "./auth/AuthService";
import SpinnerCentered from "./components/SpinnerCentered";

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
    const toast = useToast()
    const authService = useAuthService()

    const [user, setUser] = useState<LoggedInUser | undefined>()

    useEffect(() => {
        if (!authService.isLoading() && !authService.isLoggedIn()) {
            authService.login()
        }
    })

    useEffect(() => {
        if (authService.isLoggedIn() && authService.getAccessToken()) {
            console.log("set token to " + authService.getAccessToken())
            setBackendAccessToken(authService.getAccessToken()!!)
        }
    }, [authService])

    useEffect(() => {
        if (authService.isLoggedIn() && user == null) {
            fetchUser()
                .then((user) => setUser(user))
                .catch(reason => toast({title: 'Try again later.', description: reason.toString(), status: 'error', isClosable: true}))
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
