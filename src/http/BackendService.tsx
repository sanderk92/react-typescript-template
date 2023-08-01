import useAuthService from "../auth/AuthService";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import {Data, DataEntry} from "./model/Data";
import {UserDetails} from "./model/UserDetails";

export interface BackendProps {
    getUserDetails(): Promise<UserDetails>
    getData(): Promise<Data[]>
    createData(entry: DataEntry): Promise<Data>
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

    const createData = (entry: DataEntry): Promise<Data> => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => ({id: uuid(), status: 'open', company: entry.company, time: new Date()}));
    }

    return {
        getUserDetails,
        getData: getData,
        createData: createData,
    }
}

const homePageRows : Data[] = [
    {id: uuid(), status: 'open', company: 'Pikobello B.V.', time: new Date()},
    {id: uuid(), status: 'open', company: 'Bandel B.V.', time: new Date(2023, 4, 4, 10, 0, 0)},
    {id: uuid(), status: 'running', company: 'Jantje B.V.', time: new Date(2023, 4, 4, 9, 0, 0)},
    {id: uuid(), status: 'running', company: 'Oke B.V.', time: new Date(2023, 4, 3, 10, 0, 0)},
    {id: uuid(), status: 'cancelled', company: 'Altijd optijd B.V.', time: new Date(2023, 4, 3, 10, 15, 0)},
    {id: uuid(), status: 'finished', company: 'Minder B.V.', time: new Date(2023, 3, 2, 10, 0, 0)},
    {id: uuid(), status: 'finished', company: 'Minder B.V.', time: new Date(2023, 2, 2, 10, 0, 0)}
]
