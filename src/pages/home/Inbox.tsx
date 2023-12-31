import {TableCell, TableRow} from "../../components/SimpleTable";
import * as React from "react";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {DataStatus, DataView, findData} from "./InboxStubs";
import InboxDetailsDrawer from "./InboxDetailsDrawer";
import InboxCreateModal from "./InboxCreateModal";
import {RiAddCircleFill, RiAddLine, RiCheckboxCircleFill, RiCloseCircleFill, RiFilterLine, RiRefreshLine} from "react-icons/ri";
import {RiPlayCircleFill} from "react-icons/ri";
import {minusMonths, timeIndicator} from "../../utils/Date";
import InboxFiltersDrawer from "./InboxFiltersDrawer";
import {Box, Flex, IconButton, useBoolean} from "@chakra-ui/react";
import SimpleTableWithTaskbar from "../../components/SimpleTableWithTaskbar";

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
    const [refresh, setRefreshing] = useBoolean()

    const navigate = useNavigate()

    const navigateBase = () => navigate("/inbox")
    const navigateCreate = () => navigate("create")
    const navigateFilters = () => navigate("filters")
    const navigateDetails = (id: string) => navigate(id)

    useEffect(() => {
        setRows(undefined)
        findData(filter.status, filter.from, filter.until).then(setRows)
    }, [refresh, filter])

    return (
        <Box>
            <SimpleTableWithTaskbar
                onSelect={(row: TableRow) => navigateDetails(row.id)}
                rows={rows?.map(tableRow)}
                header={tableHeader()}
                defaultSort={{ direction: false, column: 1 }}
                buttons={
                    <Flex alignItems={"flex-end"} justifyContent={"flex-end"}>
                        <IconButton mr="2" icon={<RiAddLine/>} aria-label={"create"} onClick={navigateCreate}/>
                        <IconButton mr="2" icon={<RiFilterLine/>} aria-label={"filter"} onClick={navigateFilters}/>
                        <IconButton mr="2" icon={<RiRefreshLine/>} aria-label={"refresh"} isLoading={rows == null} onClick={() => setRefreshing.toggle()}/>
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
        {value: "time ago", maxWidth: secondColumnWidth},
    ]
});

const tableRow = (data: DataView): TableRow => ({
    id: data.id,
    cells: [
        companyCell(data.company),
        timeCell(data),
    ],
})

const companyCell = (name: string): TableCell => {
    return {
        sortValue: name,
        maxWidth: secondColumnWidth,
        value: name,
    }
}

const timeCell = (data: DataView): TableCell => {
    return {
        sortValue: data.time.getTime(),
        maxWidth: firstColumnWidth,
        value:
            <Flex justifyContent={"space-between"}>
                { timeIndicator(data.time) }
                { statusIndicator(data.status) }
            </Flex>,
    }
}

const statusIndicator = (status: DataStatus): React.JSX.Element => {
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

