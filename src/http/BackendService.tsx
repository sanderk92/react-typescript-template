import useAuthService from "../auth/AuthService";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import {DataEntry, DataStatus, DataView} from "./model/Data";
import {UserDetails} from "./model/UserDetails";
import {useEffect} from "react";

export interface BackendProps {
    getUserDetails(): Promise<UserDetails>
    getData(id: String): Promise<DataView | undefined>
    queryData(state: DataStatus[]): Promise<DataView[]>
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

    const getData = (id: String): Promise<DataView | undefined> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => inboxRow.find(row => row.id === id))

    const queryData = (status: DataStatus[]): Promise<DataView[]> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => inboxRow)
            .then(rows => rows.filter(row => status.includes(row.status)))

    const createData = (entry: DataEntry): Promise<DataView> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => ({id: uuid(), status: DataStatus.open, company: entry.company, time: new Date()}))

    return {
        getUserDetails,
        getData,
        queryData,
        createData,
    }
}

export default useBackend

const inboxRow : DataView[] = [
    {id: "25c83a41-4918-46bf-9f20-4f15f1651a17", status: DataStatus.open, company: 'Pikobello B.V.', time: new Date()},
    {id: "f111ad08-1b28-4862-ba7a-3296859de416", status: DataStatus.open, company: 'Bandel B.V.', time: new Date(2023, 4, 4, 10, 0, 0)},
    {id: "ca299b6b-8ac0-4614-a32d-6167f1299e69", status: DataStatus.running, company: 'Jantje B.V.', time: new Date(2023, 4, 4, 9, 0, 0)},
    {id: "f1f153a9-d46e-409b-a7e4-576bae900b9d", status: DataStatus.running, company: 'Oke B.V.', time: new Date(2023, 4, 3, 10, 0, 0)},
    {id: "abe4deea-ff10-4668-9b8c-7ee8e9d9117c", status: DataStatus.cancelled, company: 'Altijd optijd B.V.', time: new Date(2023, 4, 3, 10, 15, 0)},
    {id: "5684af58-469e-4b29-98e4-1ec22c9eeda1", status: DataStatus.finished, company: 'Minder B.V.', time: new Date(2023, 3, 2, 10, 0, 0)},
]
