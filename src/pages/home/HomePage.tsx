import GenericTable, {TableCell, TableRow} from "../../components/GenericTable";
import {Center, Progress, SkeletonText, Spinner, Text} from "@chakra-ui/react";
import * as React from "react";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useBackend} from "../../http/BackendService";
import "../pages.css"
import DetailsDrawer from "./DetailsDrawer";
import CreateModal from "./CreateModal";

const basePath = "/"

export interface HomePageRow extends TableRow {
    id: string
    cells: TableCell[]
    extra: string
}

export default function HomePage() {
    const backend = useBackend()
    const navigate = useNavigate()

    const [rows, setRows] = useState<HomePageRow[] | undefined>(undefined)

    const navigateHome = () => {
        navigate(basePath)
    }

    const navigateDetails = (row: HomePageRow) => {
        navigate(row.id)
    }

    const navigateCreate = () => {
        navigate("create")
    }

    const onCreated = (row: HomePageRow) => {
        navigateHome()
        rows?.push(row)
    }

    useEffect(() => {
        backend.getHomePageRows().then(rows => setRows(rows))
    }, [backend])

    if (rows == null) {
        return <Spinner className="spinner"></Spinner>
    }

    else if (rows?.length === 0) {
        return <Text>No results</Text>
    }

    else return (
        <GenericTable
            headers={[{value: "first"}, {value: "second"}, {value: "third"}]}
            onSelect={navigateDetails}
            onCreate={navigateCreate}
            rows={rows!!}>
            <Routes>
                <Route path=":id" element={<DetailsDrawer isOpen={true} onClose={navigateHome} input={rows!!}/>}/>
                <Route path="create" element={<CreateModal isOpen={true} onClose={navigateHome} onCreated={onCreated}/>}/>
            </Routes>
        </GenericTable>
    )
}
