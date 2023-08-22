import SortAndSearchTable, {TableCell, TableRow} from "../../components/SortAndSearchTable";
import * as React from "react";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import useBackend from "../../http/BackendService";
import InboxDetailsDrawer from "./InboxDetailsDrawer";
import InboxCreateModal from "./InboxCreateModal";
import {
    RiAddCircleFill,
    RiAddLine,
    RiCheckboxCircleFill,
    RiCloseCircleFill,
    RiFilterLine,
    RiRefreshLine
} from "react-icons/all";
import {RiPlayCircleFill} from "react-icons/ri";
import {dateShortFormatted, isSameDate, timeShortFormatted} from "../../utils/Date";
import {DataStatus, DataView} from "../../http/model/Data";
import InboxFiltersDrawer from "./InboxFiltersDrawer";
import {Box, Flex, IconButton} from "@chakra-ui/react";

export interface InboxFilter {
    status: DataStatus[]
}

const defaultHomeFilter : InboxFilter = {
    status: [DataStatus.open, DataStatus.running]
}

export default function Inbox() {
    const [rows, setRows] = useState<DataView[] | undefined>(undefined)
    const [filter, setFilter] = useState<InboxFilter>(defaultHomeFilter)
    const [refresh, setRefreshing] = useState(false)

    const backend = useBackend()
    const navigate = useNavigate()

    const navigateBase = () => navigate("/inbox")
    const navigateCreate = () => navigate("create")
    const navigateFilters = () => navigate("filters")
    const navigateDetails = (row: TableRow) => navigate(row.id)

    useEffect(() => {
        setRows(undefined)
        backend.queryData(filter.status).then(setRows)
    }, [refresh, filter])

    return (
        <Box>
            <SortAndSearchTable
                header={tableHeader()}
                onSelect={navigateDetails}
                rows={rows?.map(tableRow)}
                buttons={
                    <Flex alignItems={"flex-end"} justifyContent={"flex-end"}>
                        <IconButton mr="2" icon={<RiAddLine/>} aria-label={"create"} onClick={navigateCreate}/>
                        <IconButton mr="2" icon={<RiFilterLine/>} aria-label={"filter"} onClick={navigateFilters}/>
                        <IconButton mr="2" icon={<RiRefreshLine/>} aria-label={"refresh"} onClick={() => setRefreshing(!refresh)}/>
                    </Flex>
                }
            />

            <Routes>
                <Route path=":id" element={
                    <InboxDetailsDrawer isOpen={true} onClose={navigateBase}/>
                }/>
                <Route path="create" element={
                    <InboxCreateModal isOpen={true} onClose={navigateBase} onCreated={data => { rows?.push(data) }}/>
                }/>
                <Route path="filters" element={
                    <InboxFiltersDrawer isOpen={true} onClose={navigateBase} filter={filter} setFilter={setFilter}/>
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
        {value: "time", width: thirdColumnWidth},
        {value: "sender", width: secondColumnWidth},
        {value: "status", width: firstColumnWidth},
    ]
});

const tableRow = (data: DataView): TableRow => ({
    id: data.id,
    cells: [
        timeCell(data.time),
        companyCell(data.company),
        statusCell(data.status),
    ],
})

const statusCell = (status: DataStatus): TableCell => {
    if (status === DataStatus.open) {
        return {sortValue: 3, width: firstColumnWidth, value: <RiAddCircleFill color={"green"}/>}
    } else if (status === DataStatus.running) {
        return {sortValue: 2, width: firstColumnWidth, value: <RiPlayCircleFill color={"dodgerblue"}/>}
    } else if (status === DataStatus.cancelled) {
        return {sortValue: 1, width: firstColumnWidth, value: <RiCloseCircleFill color={"red"}/>}
    } else {
        return {sortValue: 0, width: firstColumnWidth, value: <RiCheckboxCircleFill color={"darkgoldenrod"}/>}
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
