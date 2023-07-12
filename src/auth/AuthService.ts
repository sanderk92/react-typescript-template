import {User} from "oidc-client-ts";
import {useAuth} from "react-oidc-context";

export interface AuthServiceProps {
    getUser(): User | null | undefined
    isLoading(): boolean
    isLoggedIn(): boolean
    login(): void
    logout(): void
}

export const useAuthService = (): AuthServiceProps => {

    const auth = useAuth();

    const getUser = (): User | null | undefined => {
        return auth.user
    }

    const isLoading = (): boolean => {
        return auth.isLoading
    }

    const isLoggedIn = (): boolean => {
        return auth.isAuthenticated
    }

    const login = (): void => {
        auth.signinRedirect()
            .then(() => console.log("Login success"))
            .catch((err) => console.warn("Login failure", err))
    }

    const logout = (): void => {
        auth.signoutRedirect()
            .then(() => console.log("Logout success"))
            .catch((err) => console.warn("Logout failure", err))
    }

    return {
        getUser,
        isLoading,
        isLoggedIn,
        login,
        logout,
    }
}

export default useAuthService
