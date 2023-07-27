import useAuthService from "../auth/AuthService";
import axios from "axios";
import {HomePageRow} from "../pages/home/HomePage";
import {RiMapPin2Fill, RiMapPin3Fill, RiMapPinAddFill} from "react-icons/all";
import {RiMapPinTimeFill} from "react-icons/ri";

export interface BackendProps {
    getUserDetails(): Promise<UserDetails>
    getHomePageRows(): Promise<HomePageRow[]>
    createHomePageRow(): Promise<HomePageRow>
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

    const getHomePageRows = (): Promise<HomePageRow[]> => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => homePageRows);
    }

    const createHomePageRow = (): Promise<HomePageRow> => {
        return new Promise(resolve => setTimeout(resolve, 2000))
            .then(_ => newHomePageRow);
    }

    return {
        getUserDetails,
        getHomePageRows,
        createHomePageRow,
    }
}

export interface UserDetails {
    id: string,
    roles: string[],
}

const newHomePageRow : HomePageRow =
    {id: "new", cells: [{value: "new", width: 85}, {value: "time", width: 10}, {value: "", width: 5}], extra: "new"}


const pad = (minutes: number): string => minutes.toString().padStart(2, '0')
const time = (minus: number): string => pad(new Date().getHours() - minus) + ":" + pad(new Date().getMinutes())
const date = (minus: number): string => pad(new Date().getMonth() - minus) + "-" + pad(new Date().getDate())

// TODO Move data formatting to home page
const homePageRows : HomePageRow[] = [
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: time(0), width: 10}, {value: <RiMapPinAddFill color={"green"}/>, width: 5, sortValue: 0}], extra: "test33"},
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: time(1), width: 10}, {value: <RiMapPinTimeFill color={"dodgerblue"}/>, width: 5, sortValue: 1}, ], extra: "test33"},
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: time(2), width: 10}, {value: <RiMapPinTimeFill color={"dodgerblue"}/>, width: 5, sortValue: 1}], extra: "test33"},
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: time(3), width: 10}, {value: <RiMapPin2Fill color={"red"}/>, width: 5, sortValue: 2}], extra: "test33"},
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: date(1), width: 10}, {value: <RiMapPin3Fill color={"grey"}/>, width: 5, sortValue: 3}], extra: "test33"},
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: date(2), width: 10}, {value: <RiMapPin3Fill color={"grey"}/>, width: 5, sortValue: 3}], extra: "test33"},
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: date(3), width: 10}, {value: <RiMapPin3Fill color={"grey"}/>, width: 5, sortValue: 3}], extra: "test33"},
    {id: "b", cells: [{value: "Bandel B.V", width:85}, {value: date(4), width: 10}, {value: <RiMapPin3Fill color={"grey"}/>, width: 5, sortValue: 3}], extra: "test33"},
]
