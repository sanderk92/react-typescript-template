import useAuthService from "../auth/AuthService";
import axios from "axios";
import {v4 as uuid} from 'uuid';
import {DataEntry, DataStatus, DataView} from "./model/Data";
import {UserDetails} from "./model/UserDetails";
import {useEffect} from "react";

// eslint-disable react-hooks/exhaustive-deps
export interface BackendProps {
    getUserDetails(): Promise<UserDetails>
    getData(id: String): Promise<DataView | undefined>
    queryData(state: DataStatus[], start: Date, end: Date): Promise<DataView[]>
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

    const getUser = (): Promise<UserDetails> =>
        axios.get<UserDetails>(backendUrl + "/user")
            .then(result => result.data)

    const getData = (id: String): Promise<DataView | undefined> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => inboxRow.find(row => row.id === id))

    const queryData = (status: DataStatus[], start: Date, end: Date): Promise<DataView[]> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => inboxRow)
            .then(rows => rows.filter(row => status.includes(row.status)))
            .then(rows => rows.filter(row => row.time.getTime() >= start.getTime()))
            .then(rows => rows.filter(row => row.time.getTime() <= end.getTime()))

    const createData = (entry: DataEntry): Promise<DataView> =>
        new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => ({id: uuid(), status: DataStatus.open, company: entry.input, time: new Date()}))

    return {
        getUserDetails: getUser,
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
    {id: "2d303168-4ee9-45c6-96ef-9cecc0927509", status: DataStatus.finished, company: 'Meer B.V.', time: new Date(2023, 2, 2, 10, 0, 0)},
    {id: "e15f0687-09c1-4017-b57c-a5b351e062de", status: DataStatus.finished, company: 'Altijd aan B.V.', time: new Date(2023, 1, 2, 10, 0, 0)},
    {id: "46b8b942-9261-4c12-bc4a-4433cd07cb71", status: DataStatus.finished, company: 'Zoek je ons B.V.', time: new Date(2022, 12, 2, 10, 0, 0)},
    {id: "056395d8-4130-409b-a845-b7cf397fbeed", status: DataStatus.finished, company: 'Wij zijn Beter B.V.', time: new Date(2022, 11, 2, 10, 0, 0)},
    {id: "ff1a83dd-0740-48a8-a2d2-76c17c1a0877", status: DataStatus.finished, company: 'Joe B.V.', time: new Date(2022, 10, 2, 10, 0, 0)},
    {id: "edbba5af-673b-4fd2-8fcb-9ee535f42c66", status: DataStatus.finished, company: 'Oke B.V.', time: new Date(2022, 9, 2, 10, 0, 0)},
    {id: "3277d36e-0144-467a-8f97-010aac4dabfe", status: DataStatus.finished, company: 'Waarom B.V.', time: new Date(2022, 8, 2, 10, 0, 0)},
    {id: "23a98dbf-aec0-49b5-abec-58e53b68a27a", status: DataStatus.finished, company: 'Wat is er B.V.', time: new Date(2022, 7, 2, 10, 0, 0)},
    {id: "b91a1133-4b1c-4329-83bb-2eb1abb70602", status: DataStatus.finished, company: 'Test B.V.', time: new Date(2022, 6, 2, 10, 0, 0)},
    {id: "f53d3ece-2a0b-4751-8a4f-28cc79d5a9c8", status: DataStatus.finished, company: 'Mannen B.V.', time: new Date(2022, 5, 2, 10, 0, 0)},
    {id: "9170623e-a204-478a-972b-3cbe7e012ec5", status: DataStatus.finished, company: 'Vrouwen B.V.', time: new Date(2022, 4, 2, 10, 0, 0)},
    {id: "d6710dfa-8e4d-4f4c-b29f-33672117e5ed", status: DataStatus.finished, company: 'Kinder B.V.', time: new Date(2022, 3, 2, 10, 0, 0)},
    {id: "2a8cc34c-accd-47ff-ade4-f5faff94184f", status: DataStatus.finished, company: 'Ouder B.V.', time: new Date(2022, 2, 2, 10, 0, 0)},
]
