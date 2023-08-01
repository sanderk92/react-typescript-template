import GenericTable, {TableCell, TableRow} from "../../components/GenericTable";
import * as React from "react";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Data, useBackend} from "../../http/BackendService";
import DetailsDrawer from "./DetailsDrawer";
import CreateModal from "./CreateModal";
import SpinnerCentered from "../../components/SpinnerCentered";
import NoResultDisplay from "../../components/NoResultDisplay";
import {RiAddCircleFill, RiCloseCircleFill} from "react-icons/all";
import {RiPlayCircleFill} from "react-icons/ri";
import {dateShortFormatted, isSameDate, timeShortFormatted} from "../../utils/Date";

export interface HomePageRow extends TableRow {
    id: string
    cells: TableCell[]
}

const firstRowWidth = "10"
const secondRowWidth = "75"
const thirdRowWidth = "15"

export default function HomePage() {
    const backend = useBackend()
    const navigate = useNavigate()

    const [rows, setRows] = useState<HomePageRow[] | undefined>(undefined)

    const navigateBack = () => {
        navigate("/")
    }

    const navigateDetails = (row: HomePageRow) => {
        navigate(row.id)
    }

    const navigateCreate = () => {
        navigate("create")
    }

    useEffect(() => {
        backend.getData().then(data => setRows(data.map(asHomePageRow)))
    }, [backend])

    if (rows == null) {
        return <SpinnerCentered/>
    } else if (rows?.length === 0) {
        return <NoResultDisplay/>
    } else return (
        <GenericTable
            headers={[{value: "status", width: firstRowWidth}, {value: "title", width: secondRowWidth}, {value: "time", width: thirdRowWidth}]}
            onSelect={navigateDetails}
            onCreate={navigateCreate}
            onFilter={navigateCreate}
            rows={rows!!}>
            <Routes>
                <Route path=":id" element={
                    <DetailsDrawer isOpen={true} onClose={navigateBack} input={rows!!}/>
                }/>
                <Route path="create" element={
                    <CreateModal isOpen={true} onClose={navigateBack} onCreated={row => {
                        rows?.push(asHomePageRow(row));
                        navigateBack()
                    }}/>
                }/>
            </Routes>
        </GenericTable>
    )
}

const asHomePageRow = (row: Data): HomePageRow => ({
    id: row.id,
    cells: [
        statusCell(row.status),
        companyCell(row.company),
        timeCell(row.time)
    ],
})

const statusCell = (status: 'open' | 'running' | 'cancelled' | 'finished'): TableCell => {
    if (status === 'open') {
        return {sortValue: 0, width: firstRowWidth, value: <RiAddCircleFill color={"green"}/>}
    } else if (status === 'running') {
        return {sortValue: 1, width: firstRowWidth, value: <RiPlayCircleFill color={"dodgerblue"}/>}
    } else if (status === 'cancelled') {
        return {sortValue: 2, width: firstRowWidth, value: <RiCloseCircleFill color={"red"}/>}
    } else {
        return {sortValue: 3, width: firstRowWidth, value: <RiCloseCircleFill color={"grey"}/>}
    }
}

const companyCell = (name: string): TableCell => {
    return {
        sortValue: name,
        width: secondRowWidth,
        value: name
    }
}

const timeCell = (date: Date): TableCell => {
    return {
        sortValue: date.getTime(),
        width: thirdRowWidth,
        value: isSameDate(new Date(), date) ? timeShortFormatted(date) : dateShortFormatted(date)
    }
}
