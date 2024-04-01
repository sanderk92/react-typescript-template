import {User} from "oidc-client-ts";
import {useAuth} from "react-oidc-context";
import {authSettings} from "./AuthSettings";

export interface AuthServiceProps {
    getUser(): User | null | undefined
    getAccessToken(): string | undefined
    isLoading(): boolean
    isLoggedIn(): boolean
    login(): Promise<void>
    logout(): Promise<void>
}

export const useAuthService = (): AuthServiceProps => {
    const auth = useAuth();

    const getUser = (): User | null | undefined => {
        return auth.user
    }

    const getAccessToken = (): string | undefined => {
        return auth.user?.access_token
    }

    const isLoading = (): boolean => {
        return auth.isLoading
    }

    const isLoggedIn = (): boolean => {
        return auth.isAuthenticated
    }

    const login = (): Promise<void> => {
        return auth.signinRedirect()
    }

    const logout = (): Promise<void> => {
        return auth.signoutRedirect({extraQueryParams: {...authSettings}})
    }

    return {
        getUser,
        getAccessToken,
        isLoading,
        isLoggedIn,
        login,
        logout,
    }
}

export default useAuthService
