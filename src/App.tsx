import * as React from "react"
import {useEffect, useState} from "react"
import {ChakraProvider, theme} from "@chakra-ui/react"
import Navigation from "./Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "react-oidc-context";
import {authSettings} from "./auth/AuthSettings";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import useAuthService from "./auth/AuthService";
import {useBackend, UserDetails} from "./http/BackendService";
import ErrorBoundary from "./ErrorBoundary";

export function App() {
    return (
        <ErrorBoundary>
            <AuthProvider {...authSettings}>
                <UserInterface/>
            </AuthProvider>
        </ErrorBoundary>
    )
}

export function UserInterface() {
    const authService = useAuthService()
    const backendService = useBackend()

    const [user, setUser] = useState<UserDetails>({id: "sander", roles:[]})

    // useEffect(() => {
    //     if (!authService.isLoading() && !authService.isLoggedIn()) {
    //         authService.login()
    //     }
    // })
    //
    // useEffect(() => {
    //     if (authService.isLoggedIn() && user == null) {
    //         backendService.getUserDetails().then((user) => setUser(user))
    //     }
    // })

    if (user == null) {
        return <></>
    } else {
        return (
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <Navigation user={user}>
                        <Routes>
                            <Route path="/*" element={<HomePage/>}/>
                            <Route path="/contact" element={<ContactPage/>}/>
                        </Routes>
                    </Navigation>
                </BrowserRouter>
            </ChakraProvider>
        )
    }
}
