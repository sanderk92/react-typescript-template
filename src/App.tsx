import * as React from "react"
import {useEffect, useState} from "react"
import {ChakraProvider, theme} from "@chakra-ui/react"
import Navigation from "./Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "react-oidc-context";
import {authSettings} from "./auth/AuthSettings";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import useAuthService from "./auth/AuthService";
import ErrorBoundary from "./ErrorBoundary";
import {LoggedInUser} from "./http/model/user";

import "react-datepicker/dist/react-datepicker.css";
import {fetchUser} from "./http/backendService";

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
    // const authService = useAuthService()

    const [user, setUser] = useState<LoggedInUser | undefined>({id: "abc", firstName: "sander", lastName: "krabbenborg", roles: []})

    // useEffect(() => {
    //     if (!authService.isLoading() && !authService.isLoggedIn()) {
    //         authService.login()
    //     }
    // })
    //
    // useEffect(() => {
    //     if (authService.isLoggedIn() && user == null) {
    //         fetchUser().then((user) => setUser(user))
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
