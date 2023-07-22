import useAuthService from "../auth/AuthService";
import axios from "axios";
import {HomePageRow} from "../pages/home/HomePage";

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
    {id: "new", cells: [{value: "new"}, {value: "new"}, {value: "new"}], extra: "new"}

const homePageRows : HomePageRow[] = [
    {id: "b", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test14"}], extra: "test33"},
    {id: "a", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test13"}], extra: "test32"},
    {id: "c", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test15"}], extra: "test34"},
    {id: "d", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test16"}], extra: "test35"},
    {id: "e", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test31"}], extra: "test36"},
    {id: "f", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test17"}], extra: "test37"},
    {id: "g", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test18"}], extra: "test38"},
    {id: "h", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test19"}], extra: "test39"},
    {id: "i", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test20"}], extra: "test40"},
    {id: "j", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test21"}], extra: "test41"},
    {id: "k", cells: [{value: new Date().toLocaleTimeString()}, {value: "testc"},  {value: "test22"}], extra: "test42"},
]
