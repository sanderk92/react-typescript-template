import useAuthService from "../auth/AuthService";
import axios from "axios";

export interface BackendProps {
    getUserDetails(): Promise<UserDetails>
    getData(): Promise<Data[]>
    createData(): Promise<Data>
}

export const useBackend = (): BackendProps => {

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

    const getData = (): Promise<Data[]> => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => homePageRows);
    }

    const createData = (): Promise<Data> => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => newHomePageRow);
    }

    return {
        getUserDetails,
        getData: getData,
        createData: createData,
    }
}

export interface UserDetails {
    id: string,
    roles: string[],
}

export interface Data {
    id: string,
    status: 'open' | 'running' | 'cancelled' | 'finished',
    company: string,
    time: Date,
}

const homePageRows : Data[] = [
    {id: "a", status: 'open', company: 'Pikobello B.V.', time: new Date()},
    {id: "b", status: 'open', company: 'Bandel B.V.', time: new Date(2023, 4, 4, 10, 0, 0)},
    {id: "c", status: 'running', company: 'Jantje B.V.', time: new Date(2023, 4, 4, 9, 0, 0)},
    {id: "d", status: 'running', company: 'Oke B.V.', time: new Date(2023, 4, 3, 10, 0, 0)},
    {id: "e", status: 'cancelled', company: 'Altijd optijd B.V.', time: new Date(2023, 4, 3, 10, 15, 0)},
    {id: "f", status: 'finished', company: 'Minder B.V.', time: new Date(2023, 3, 2, 10, 0, 0)},
    {id: "g", status: 'finished', company: 'Minder B.V.', time: new Date(2023, 2, 2, 10, 0, 0)}
]

const newHomePageRow : Data =
    {id: "h", status: 'finished', company: 'Minder B.V.', time: new Date()}

