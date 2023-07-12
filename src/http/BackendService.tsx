import useAuthService from "../auth/AuthService";
import axios from "axios";

export interface BackendServiceProps {
    getUserDetails(): Promise<UserDetails>
}

export const useBackendService = (): BackendServiceProps => {

    const auth = useAuthService()

    const backendUrl : string = window.location.protocol + "//" + window.location.host

    const setAuthorization = () => {
        axios.interceptors.request.use(config => {
            config.headers.Authorization = "Bearer " + auth.getUser()?.access_token;
            return config;
        });
    }

    const getUserDetails = (): Promise<UserDetails> => {
        setAuthorization()
        return axios.get<UserDetails>(backendUrl + "/user")
            .then(result => result.data)
    }

    return {
        getUserDetails,
    }
}

export interface UserDetails {
    id: string,
    roles: string[],
}