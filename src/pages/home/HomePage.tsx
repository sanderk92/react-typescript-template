import GenericTable, {TableCell, TableRow} from "../../components/GenericTable";
import * as React from "react";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useBackend} from "../../http/BackendService";
import DetailsDrawer from "./DetailsDrawer";
import CreateModal from "./CreateModal";
import SpinnerCentered from "../../components/SpinnerCentered";
import NoResultDisplay from "../../components/NoResultDisplay";
import {RiAddCircleFill, RiCloseCircleFill} from "react-icons/all";
import {RiPlayCircleFill} from "react-icons/ri";
import {dateShortFormatted, isSameDate, timeShortFormatted} from "../../utils/Date";
import {Data} from "../../http/model/Data";

export default function HomePage() {
    const backend = useBackend()
    const navigate = useNavigate()

    const [rows, setRows] = useState<Data[] | undefined>(undefined)

    const navigateBack = () => {
        navigate("/")
    }

    const navigateDetails = (row: TableRow) => {
        navigate(row.id)
    }

    const navigateCreate = () => {
        navigate("create")
    }

    useEffect(() => {
        backend.getData().then(data => setRows(data))
    })

    if (rows == null) {
        return <SpinnerCentered/>
    } else if (rows?.length === 0) {
        return <NoResultDisplay/>
    } else return (
        <GenericTable
            header={tableHeader()}
            onSelect={navigateDetails}
            onCreate={navigateCreate}
            onFilter={navigateCreate}
            rows={rows!!.map(tableRow)}>
            <Routes>
                <Route path=":id" element={
                    <DetailsDrawer isOpen={true} onClose={navigateBack} input={rows!!}/>
                }/>
                <Route path="create" element={
                    <CreateModal isOpen={true} onClose={navigateBack} onCreated={data => {rows?.push(data); navigateBack()}}/>
                }/>
            </Routes>
        </GenericTable>
    )
}

const firstColumnWidth = "20"
const secondColumnWidth = "40"
const thirdColumnWidth = "20"

const tableHeader = () => ({
    cells: [
        {value: "", width: firstColumnWidth},
        {value: "title", width: secondColumnWidth},
        {value: "time", width: thirdColumnWidth}
    ]
});

const tableRow = (data: Data): TableRow => ({
    id: data.id,
    cells: [
        statusCell(data.status),
        companyCell(data.company),
        timeCell(data.time)
    ],
})

const statusCell = (status: 'open' | 'running' | 'cancelled' | 'finished'): TableCell => {
    if (status === 'open') {
        return {sortValue: 0, width: firstColumnWidth, value: <RiAddCircleFill color={"green"}/>}
    } else if (status === 'running') {
        return {sortValue: 1, width: firstColumnWidth, value: <RiPlayCircleFill color={"dodgerblue"}/>}
    } else if (status === 'cancelled') {
        return {sortValue: 2, width: firstColumnWidth, value: <RiCloseCircleFill color={"red"}/>}
    } else {
        return {sortValue: 3, width: firstColumnWidth, value: <RiCloseCircleFill color={"grey"}/>}
    }
}

const companyCell = (name: string): TableCell => {
    return {
        sortValue: name,
        width: secondColumnWidth,
        value: name
    }
}

const timeCell = (date: Date): TableCell => {
    return {
        sortValue: date.getTime(),
        width: thirdColumnWidth,
        numerical: true,
        value: isSameDate(new Date(), date) ? timeShortFormatted(date) : dateShortFormatted(date)
    }
}
