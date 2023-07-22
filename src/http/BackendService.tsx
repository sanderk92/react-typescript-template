import useAuthService from "../auth/AuthService";
import axios from "axios";
import {HomePageRow} from "../pages/HomePage";

export interface BackendServiceProps {
    getUserDetails(): Promise<UserDetails>
    getHomePageRows(): Promise<HomePageRow[]>
    createHomePageRow(): Promise<null>
}

export const useBackend = (): BackendServiceProps => {

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

    const createHomePageRow = (): Promise<null> => {
        return new Promise(resolve => setTimeout(resolve, 2000))
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

const homePageRows : HomePageRow[] = [
    {id: "a", cells: [{value: "testa"}, {value: "test1"}, {value: "test13"}], extra: "test32"},
    {id: "b", cells: [{value: "testb"}, {value: "test2"}, {value: "test14"}], extra: "test33"},
    {id: "c", cells: [{value: "testc"}, {value: "test3"}, {value: "test15"}], extra: "test34"},
    {id: "d", cells: [{value: "testd"}, {value: "test4"}, {value: "test16"}], extra: "test35"},
    {id: "e", cells: [{value: "teste"}, {value: "test5"}, {value: "test31"}], extra: "test36"},
    {id: "f", cells: [{value: "testf"}, {value: "test6"}, {value: "test17"}], extra: "test37"},
    {id: "g", cells: [{value: "testg"}, {value: "test7"}, {value: "test18"}], extra: "test38"},
    {id: "h", cells: [{value: "testh"}, {value: "test8"}, {value: "test19"}], extra: "test39"},
    {id: "i", cells: [{value: "testi"}, {value: "test9"}, {value: "test20"}], extra: "test40"},
    {id: "j", cells: [{value: "testj"}, {value: "test10"}, {value: "test21"}], extra: "test41"},
    {id: "k", cells: [{value: "testk"}, {value: "test11"}, {value: "test22"}], extra: "test42"},
    {id: "l", cells: [{value: "testk"}, {value: "test12"}, {value: "test23"}], extra: "test43"},
]