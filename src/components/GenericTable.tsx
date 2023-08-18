import React, {ReactNode, useState} from 'react';
import {Box, Divider, Flex, Icon, Input, InputGroup, InputLeftElement, InputRightElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {CloseIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import "./components.css"
import { v4 as uuid } from 'uuid';
import SpinnerCentered from "./SpinnerCentered";
import NoResultDisplay from "./NoResultDisplay";

export interface TableCell {
    value: ReactNode
    width?: string
    numerical?: boolean
    sortValue?: ReactNode
}

export interface TableRow {
    id: string,
    cells: TableCell[]
}

export interface TableHeaderCell extends TableCell {
    sortable?: boolean,
}

export interface TableHeader {
    cells: TableHeaderCell[]
}

export interface TableComponentProps {
    header: TableHeader
    rows: TableRow[] | undefined
    onSelect: (row: TableRow) => void
    children?: React.JSX.Element
}

interface SortState {
    direction: boolean,
    column: number
}

export default function GenericTable({header, rows, onSelect, children}: TableComponentProps) {
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<SortState>({column: 0, direction: true})

    return rows == null ? <SpinnerCentered/> : rows.length === 0 ? <NoResultDisplay/> :
        <TableContainer>
                <Table variant='simple'>
                    <TableHead header={header} sort={sort} setSort={setSort}/>
                    <TableBody rows={filterAndSort(rows, search, sort)} onSelect={onSelect}/>
                </Table>
                <SearchField search={search} onSearch={setSearch}/>
                {children}
        </TableContainer>
}

const SearchField = ({search, onSearch}: {
    search: string
    onSearch: (query: string) => void
}) => {
    const colorScheme = useColorModeValue('white', 'gray.900')

    return (
        <Flex pt="2" justifyContent={"right"} >
            <InputGroup width={"100%"} size='md'>
                <InputLeftElement>
                    <SearchIcon/>
                </InputLeftElement>
                <Input bg={colorScheme} value={search} onChange={event => onSearch(event.target.value)} placeholder={"Search"}/>
                <InputRightElement>
                    <CloseIcon className={"clickable"} background={colorScheme} onClick={() => onSearch("")}/>
                </InputRightElement>
            </InputGroup>
        </Flex>

    )
}

const TableHead = ({header, sort, setSort}: {
    header: TableHeader
    sort: SortState
    setSort: (sort: SortState) => void
}) => {
    const backgroundColorScheme = useColorModeValue('gray.200', 'gray.800')
    const hoverColorScheme = useColorModeValue('gray.300', 'gray.700')
    const activeColorScheme = useColorModeValue('gray.400', 'gray.600')

    return (
        <Thead>
            <Tr key={uuid()}>
                {header.cells.map((cell, index) =>
                    <Th
                        overflowX={"hidden"}
                        maxWidth={cell.width}
                        isNumeric={cell.numerical}
                        bg={backgroundColorScheme}
                        className={ isSortable(cell) ? "unselectable clickable" : "unselectable" }
                        _hover={ isSortable(cell) ? {background: hoverColorScheme} : {backgroundColorScheme}}
                        _active={ isSortable(cell) ? {background: activeColorScheme} : {backgroundColorScheme}}
                        onClick={() => {if (isSortable(cell)) setSort({direction: !sort.direction, column: index})}}
                    >
                        <Flex
                            display={"flex"}
                            justifyContent={"space-between"}>
                            {cell.value}
                            {sort.column === index ? sortIcon() : <Icon visibility={"hidden"}/>}
                        </Flex>
                    </Th>
                )}
            </Tr>
        </Thead>
    )

    function sortIcon() {
        return sort.direction ? <TriangleUpIcon/> : <TriangleDownIcon/>;
    }

    function isSortable(cell: TableHeaderCell): boolean {
        return cell?.sortable ?? true
    }
}

const TableBody = ({rows, onSelect}: {
    rows: TableRow[]
    onSelect: (row: TableRow) => void
}) => {
    const hoverColorScheme = useColorModeValue('gray.100', 'gray.700')
    const activeColorScheme = useColorModeValue('gray.200', 'gray.600')

    return (
        <Tbody>{
            rows.map(row =>
                <Tr
                    key={row.id}
                    overflowX={"hidden"}
                    className={"unselectable clickable"}
                    onClick={() => onSelect(row)}
                    _hover={{background: hoverColorScheme}}
                    _active={{background: activeColorScheme}}>
                    {row.cells.map((cell, index) =>
                        <Td
                            key={`${row.id}-${index}`}
                            maxWidth={cell.width}
                            overflow={"hidden"}
                            text-overflow={"ellipsis"}
                            white-space={"no-wrap"}>
                            {cell.value}
                        </Td>
                    )}
                </Tr>
            )
        }</Tbody>
    )
}

function filterAndSort(rows: TableRow[], search: string, sort: SortState) {
    const collator = Intl.Collator([], {numeric: true})

    return rows
        .filter(row => {
            const cells = row.cells.map(cell => cell.value)
            return Object.values(cells).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        .sort((a, b) =>
            compare(getSortValue(a), getSortValue(b))
        )

    function getSortValue(a: TableRow): ReactNode {
        const cell = a.cells[sort.column]
        return cell.sortValue != null ? cell.sortValue : cell.value
    }

    function compare(a: ReactNode, b: ReactNode): number {
        return sort.direction ? (collator.compare(`${a}`, `${b}`)) : (collator.compare(`${b}`, `${a}`))
    }
}
