import GenericTable, {TableCell, TableRow} from "../../components/GenericTable";
import * as React from "react";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useBackend} from "../../http/BackendService";
import DetailsDrawer from "./DetailsDrawer";
import CreateModal from "./CreateModal";
import {RiAddCircleFill, RiAddLine, RiCheckboxCircleFill, RiCloseCircleFill, RiFilterLine, RiRefreshLine} from "react-icons/all";
import {RiPlayCircleFill} from "react-icons/ri";
import {dateShortFormatted, isSameDate, timeShortFormatted} from "../../utils/Date";
import {Data} from "../../http/model/Data";
import FiltersModal from "./FiltersModal";
import {Box, Flex, IconButton} from "@chakra-ui/react";

export default function HomePage() {
    const [rows, setRows] = useState<Data[] | undefined>(undefined)
    const [refresh, setRefreshing] = useState(false)

    const backend = useBackend()
    const navigate = useNavigate()

    const navigateBase = () => navigate("/")
    const navigateCreate = () => navigate("create")
    const navigateFilters = () => navigate("filters")
    const navigateDetails = (row: TableRow) => navigate(row.id)

    useEffect(() => {
        setRows(undefined)
        backend.getData().then(setRows)
    }, [refresh])

    return (
        <Box>
            <Flex pt="2" alignItems={"flex-end"} justifyContent={"flex-end"}>
                <IconButton mr="2" icon={<RiRefreshLine/>} aria-label={"refresh"} onClick={() => setRefreshing(!refresh)}/>
                <IconButton mr="2" icon={<RiFilterLine/>} aria-label={"filter"} onClick={navigateFilters}/>
                <IconButton mr="2" icon={<RiAddLine/>} aria-label={"create"} onClick={navigateCreate}/>
            </Flex>
            <GenericTable header={tableHeader()} onSelect={navigateDetails} rows={rows?.map(tableRow)}/>
            <Routes>
                <Route path=":id" element={
                    <DetailsDrawer isOpen={true} onClose={navigateBase} input={rows!!}/>
                }/>
                <Route path="create" element={
                    <CreateModal isOpen={true} onClose={navigateBase} onCreated={data => { rows?.push(data) }}/>
                }/>
                <Route path="filters" element={
                    <FiltersModal isOpen={true} onClose={navigateBase}/>
                }/>
            </Routes>
        </Box>
    )
}

const firstColumnWidth = "20"
const secondColumnWidth = "40"
const thirdColumnWidth = "20"

const tableHeader = () => ({
    cells: [
        {value: "", width: firstColumnWidth},
        {value: "name", width: secondColumnWidth},
        {value: "time", width: thirdColumnWidth},
    ]
});

const tableRow = (data: Data): TableRow => ({
    id: data.id,
    cells: [
        statusCell(data.status),
        companyCell(data.company),
        timeCell(data.time),
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
        return {sortValue: 3, width: firstColumnWidth, value: <RiCheckboxCircleFill color={"grey"}/>}
    }
}

const companyCell = (name: string): TableCell => {
    return {
        sortValue: name,
        width: secondColumnWidth,
        value: name,
    }
}

const timeCell = (date: Date): TableCell => {
    return {
        sortValue: date.getTime(),
        width: thirdColumnWidth,
        numerical: true,
        value: isSameDate(new Date(), date) ? timeShortFormatted(date) : dateShortFormatted(date),
    }
}
