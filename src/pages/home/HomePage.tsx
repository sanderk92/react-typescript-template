import GenericTable, {TableCell, TableRow} from "../../components/GenericTable";
import {Text} from "@chakra-ui/react";
import * as React from "react";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useBackend} from "../../http/BackendService";
import DetailsDrawer from "./DetailsDrawer";
import CreateModal from "./CreateModal";
import SpinnerCentered from "../../components/SpinnerCentered";

export interface HomePageRow extends TableRow {
    id: string
    cells: TableCell[]
    extra: string
}

export default function HomePage() {
    const backend = useBackend()
    const navigate = useNavigate()

    const [rows, setRows] = useState<HomePageRow[] | undefined>(undefined)

    const navigateBack = () => {
        navigate(-1)
    }

    const navigateDetails = (row: HomePageRow) => {
        navigate(row.id)
    }

    const navigateCreate = () => {
        navigate("create")
    }

    useEffect(() => {
        backend.getHomePageRows().then(rows => setRows(rows))
    }, [backend])

    if (rows == null) {
        return <SpinnerCentered/>
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
                <Route path=":id" element={
                    <DetailsDrawer isOpen={true} onClose={navigateBack} input={rows!!}/>
                }/>
                <Route path="create" element={
                    <CreateModal isOpen={true} onClose={navigateBack} onCreated={row => {rows?.push(row)}}/>
                }/>
            </Routes>
        </GenericTable>
    )
}
