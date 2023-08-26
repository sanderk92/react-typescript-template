import SelectionTable, {TableCell, TableRow} from "../../components/SelectionTable";
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
import {minusMonths, timeAgoIndicator} from "../../utils/Date";
import {DataStatus, DataView} from "../../http/model/Data";
import InboxFiltersDrawer from "./InboxFiltersDrawer";
import {Box, Flex, IconButton} from "@chakra-ui/react";
import SearchDropdown from "../../components/SearchDropdown";

export interface InboxFilter {
    status: DataStatus[],
    from: Date,
    until: Date,
}

const defaultHomeFilter : InboxFilter = {
    status: [DataStatus.open, DataStatus.running],
    from: minusMonths(new Date(), 3),
    until: new Date(),
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
        backend.queryData(filter.status, filter.from, filter.until).then(setRows)
    }, [refresh, filter])

    return (
        <Box>
            <SelectionTable
                header={tableHeader()}
                onSelect={navigateDetails}
                rows={rows?.map(tableRow)}
                defaultSort={{ direction: false, column: 1 }}
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

const firstColumnWidth = "50%"
const secondColumnWidth = "50%"

const tableHeader = () => ({
    cells: [
        {value: "sender", maxWidth: firstColumnWidth},
        {value: "time", maxWidth: secondColumnWidth},
    ]
});

const tableRow = (data: DataView): TableRow => ({
    id: data.id,
    cells: [
        companyCell(data.company),
        timeCell(data),
    ],
})

const timeCell = (data: DataView): TableCell => {
    return {
        sortValue: data.time.getTime(),
        maxWidth: firstColumnWidth,
        value:
            <Flex justifyContent={"space-between"}>
                { timeAgoIndicator(data.time) }
                { statusCell(data.status) }
            </Flex>,
    }
}

const companyCell = (name: string): TableCell => {
    return {
        sortValue: name,
        maxWidth: secondColumnWidth,
        value: name,
    }
}

const statusCell = (status: DataStatus): React.JSX.Element => {
    if (status === DataStatus.open) {
        return <RiAddCircleFill color={"green"}/>
    } else if (status === DataStatus.running) {
        return <RiPlayCircleFill color={"dodgerblue"}/>
    } else if (status === DataStatus.cancelled) {
        return <RiCloseCircleFill color={"red"}/>
    } else {
        return <RiCheckboxCircleFill color={"darkgoldenrod"}/>
    }
}

