import useAuthService from "../auth/AuthService";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import {DataEntry, DataStatus, DataView} from "./model/Data";
import {UserDetails} from "./model/UserDetails";
import {useEffect} from "react";

export interface BackendProps {
    getUserDetails(): Promise<UserDetails>
    getData(state: DataStatus[]): Promise<DataView[]>
    createData(entry: DataEntry): Promise<DataView>
}

export const useBackend = (): BackendProps => {

    const auth = useAuthService()

    const backendUrl : string = window.location.protocol + "//" + window.location.host

    useEffect(() => {
        axios.interceptors.request.use(config => {
            config.headers.Authorization = "Bearer " + auth.getUser()?.access_token;
            return config;
        });
    })

    const getUserDetails = (): Promise<UserDetails> =>
        axios.get<UserDetails>(backendUrl + "/user")
            .then(result => result.data)

    const getData = (status: DataStatus[]): Promise<DataView[]> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => homePageRows)
            .then(rows => rows.filter(row => status.includes(row.status)))

    const createData = (entry: DataEntry): Promise<DataView> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => ({id: uuid(), status: DataStatus.open, company: entry.company, time: new Date()}))

    return {
        getUserDetails,
        getData: getData,
        createData: createData,
    }
}

export default useBackend

const homePageRows : DataView[] = [
    {id: uuid(), status: DataStatus.open, company: 'Pikobello B.V.', time: new Date()},
    {id: uuid(), status: DataStatus.open, company: 'Bandel B.V.', time: new Date(2023, 4, 4, 10, 0, 0)},
    {id: uuid(), status: DataStatus.running, company: 'Jantje B.V.', time: new Date(2023, 4, 4, 9, 0, 0)},
    {id: uuid(), status: DataStatus.running, company: 'Oke B.V.', time: new Date(2023, 4, 3, 10, 0, 0)},
    {id: uuid(), status: DataStatus.cancelled, company: 'Altijd optijd B.V.', time: new Date(2023, 4, 3, 10, 15, 0)},
    {id: uuid(), status: DataStatus.finished, company: 'Minder B.V.', time: new Date(2023, 3, 2, 10, 0, 0)},
    {id: uuid(), status: DataStatus.finished, company: 'Minder B.V.', time: new Date(2023, 2, 2, 10, 0, 0)}
]
