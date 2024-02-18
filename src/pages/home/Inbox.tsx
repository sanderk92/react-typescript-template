import {TableCell, TableRow, SimpleTable} from "../../components/SimpleTable";
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
import {Box, useBoolean} from "@chakra-ui/react";

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
        <Box m={4}>
            <SimpleTable
                onSelect={(row: TableRow) => navigateDetails(row.id)}
                rows={rows?.map(tableRow)}
                header={tableHeader()}
                defaultSort={{ ascending: false, column: 1 }}
                buttons={[
                    {label: "create", icon: <RiAddLine/>, onClick: () => navigateCreate()},
                    {label: "filter", icon: <RiFilterLine/>, onClick: () => navigateFilters()},
                    {label: "refresh", icon: <RiRefreshLine/>, onClick: () => setRefreshing.toggle(), isLoading: rows == null},
                ]}
                menu={(row) => [
                    { label: "My group", items: [
                        {label: "My item 1", onClick: () => window.alert('My item 1')},
                        {label: "My item 2", onClick: () => window.alert('My item 2')},
                        {label: "My item 3", onClick: () => window.alert('My item 3')},
                    ]}
                ]}
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
        {value: "age", maxWidth: secondColumnWidth},
        {value: "status", maxWidth: secondColumnWidth},
    ]
});

const tableRow = (data: DataView): TableRow => ({
    id: data.id,
    key: data.id,
    cells: [
        companyCell(data.company),
        timeCell(data),
        statusCell(data),
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
        value: timeIndicator(data.time)
    }
}

const statusCell = (data: DataView): TableCell => {
    return {
        sortValue: data.time.getTime(),
        maxWidth: firstColumnWidth,
        value: statusIndicator(data.status)
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

