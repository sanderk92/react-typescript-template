import React, {ReactNode, useState} from 'react';
import {Flex, Icon, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue, Box, InputGroup, InputLeftElement, Input, InputRightElement} from '@chakra-ui/react';
import {CloseIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import {v4 as uuid} from 'uuid';
import {BsMailbox} from "react-icons/bs";

export interface TableCell {
    value: ReactNode
    maxWidth?: string
    numerical?: boolean
    sortValue?: ReactNode
}

export interface TableRow {
    id: string,
    key: string,
    cells: TableCell[]
}

export interface TableHeaderCell extends TableCell {
    sortable?: boolean,
}

export interface TableHeader {
    cells: TableHeaderCell[]
}

export interface TableComponentProps<T extends TableRow> {
    rows?: T[]
    header?: TableHeader
    defaultSort?: SortState
    maxHeight?: string
    size?: "sm" | "md",
    taskbar?: React.JSX.Element
    context?: (row: T) => React.JSX.Element
    onSelect: (row: T) => void
}

interface SortState {
    direction: boolean,
    column: number
}

export const SimpleTable = <T extends TableRow>(
    {rows, header, defaultSort, maxHeight, size, taskbar, context, onSelect}: TableComponentProps<T>
) => {
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<SortState>(defaultSort ?? {column: 0, direction: false})

    return (
        <Flex mb={1} flexDirection={"column"}>
            {taskbar && <TableTaskbar taskbar={taskbar} search={search} onSearch={setSearch}/>}

            <TableContainer maxH={maxHeight}>
                {header && rows &&
                  <Table variant='simple' size={size}>
                    <TableHead header={header} sort={sort} setSort={setSort}/>
                    <TableBody rows={sortedAndFiltered(rows, sort, search)} context={context} onSelect={onSelect}/>
                  </Table>
                }
                {!header && rows &&
                  <Table variant='simple' size={size}>
                    <TableBody rows={sortedAndFiltered(rows, sort, search)} context={context} onSelect={onSelect}/>
                  </Table>
                }
                {header && !rows &&
                  <Table variant='simple' size={size}>
                    <TablePlaceHolder size={size}/>
                  </Table>
                }

                {rows?.length === 0 && <EmptyResultDisplay/>}
            </TableContainer>
        </Flex>
    )
};

interface TableTaskbarProps {
    taskbar: React.JSX.Element
    search: string
    onSearch: (value: string) => void
}

const TableTaskbar = ({taskbar, search, onSearch}: TableTaskbarProps): React.JSX.Element => {
    const colorScheme = useColorModeValue('gray.50', 'gray.700')

    return <Flex mb={2} justifyContent={"flex-end"}>
        <Box mr={2}>
            <InputGroup>
                <InputLeftElement>
                    <SearchIcon/>
                </InputLeftElement>
                <Input variant={"filled"} bg={colorScheme} value={search} onChange={event => onSearch(event.target.value)} placeholder={"Search"}/>
                <InputRightElement>
                    <CloseIcon className={"clickable"} onClick={() => onSearch("")}/>
                </InputRightElement>
            </InputGroup>
        </Box>
        <Flex alignItems={"flex-end"} justifyContent={"flex-end"}>{taskbar}</Flex>
    </Flex>
};

interface TableHeadProps {
    header: TableHeader
    sort: SortState
    setSort: (sort: SortState) => void
}

const TableHead = ({header, sort, setSort}: TableHeadProps): React.JSX.Element => {
    const backgroundColorScheme = useColorModeValue('gray.200', 'gray.800')
    const hoverColorScheme = useColorModeValue('gray.300', 'gray.700')
    const activeColorScheme = useColorModeValue('gray.400', 'gray.600')

    return (
        <Thead>
            <Tr>
                {header.cells.map((cell, index) =>
                    <Th
                        key={uuid()}
                        overflowX={"hidden"}
                        maxWidth={cell.maxWidth}
                        isNumeric={cell.numerical}
                        bg={backgroundColorScheme}
                        className={isSortable(cell) ? "unselectable clickable" : "unselectable"}
                        _hover={isSortable(cell) ? {background: hoverColorScheme} : {backgroundColorScheme}}
                        _active={isSortable(cell) ? {background: activeColorScheme} : {backgroundColorScheme}}
                        onClick={() => {
                            if (isSortable(cell)) setSort({direction: !sort.direction, column: index})
                        }}
                    >
                        <Flex justifyContent="space-between">
                            {cell.value}
                            {sort.column === index ? sortIcon() : <Icon visibility={"hidden"} boxSize={2}/>}
                        </Flex>
                    </Th>
                )}
            </Tr>
        </Thead>
    )

    function sortIcon() {
        return sort.direction ? <TriangleUpIcon boxSize={2}/> : <TriangleDownIcon boxSize={2}/>;
    }

    function isSortable(cell: TableHeaderCell): boolean {
        return cell?.sortable ?? true
    }
};

interface TableBodyProps<T extends TableRow> {
    rows: T[]
    onSelect: (row: T) => void
    context?: (row: T) => React.JSX.Element
}

const TableBody = <T extends TableRow>({rows, context, onSelect}: TableBodyProps<T>): React.JSX.Element => {
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
                            maxWidth={cell.maxWidth}
                            overflow={"hidden"}
                            text-overflow={"ellipsis"}
                            white-space={"no-wrap"}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Box whiteSpace="break-spaces">{cell.value}</Box>
                                {context && index === row.cells.length - 1 && context(row)}
                            </Flex>
                        </Td>
                    )}
                </Tr>
            )
        }</Tbody>
    )
};

interface TablePlaceholderProps {
    size?: "sm" | "md"
}

const TablePlaceHolder = ({size}: TablePlaceholderProps): React.JSX.Element => {
    const backgroundColorScheme = useColorModeValue('gray.200', 'gray.800')
    const header = size === "sm" ? 2 : 2
    const row = size === "sm" ? 4 : 5

    return (
        <>
            <Thead>
                <Tr bg={backgroundColorScheme}>
                    <Td><Skeleton height={header} isLoaded/></Td>
                </Tr>
            </Thead>
            <Tbody>
                <Tr><Td><Skeleton height={row} opacity={"10%"}/> </Td></Tr>
                <Tr><Td><Skeleton height={row} opacity={"10%"}/> </Td></Tr>
                <Tr><Td><Skeleton height={row} opacity={"10%"}/> </Td></Tr>
                <Tr><Td><Skeleton height={row} opacity={"10%"}/> </Td></Tr>
                <Tr><Td><Skeleton height={row} opacity={"10%"}/> </Td></Tr>
            </Tbody>
        </>
    )
};

function EmptyResultDisplay() {
    return <Box className={"centered-parent"}>
        <Box className={"centered-child"}>
            <BsMailbox size={100} opacity={"10%"}/>
        </Box>
    </Box>
}

function sortedAndFiltered<T extends TableRow>(rows: T[], sort: SortState, search: string): T[] {
    return sorted(rows, sort).filter(row => filtered(row, search))
}

function sorted<T extends TableRow>(rows: T[], sort: SortState): T[] {
    const collator = Intl.Collator([], {numeric: true})
    return rows
        .sort((a, b) => compare(getSortValue(a), getSortValue(b)))

    function getSortValue(a: TableRow): ReactNode {
        const cell = a.cells[sort.column]
        return cell.sortValue != null ? cell.sortValue : cell.value
    }

    function compare(a: ReactNode, b: ReactNode): number {
        return sort.direction ? (collator.compare(`${a}`, `${b}`)) : (collator.compare(`${b}`, `${a}`))
    }
}

function filtered(row: TableRow, search: string): boolean {
    const cells = row.cells.map(cell => cell.value)
    return Object.values(cells).join(" ").toLowerCase().includes(search.toLowerCase())
}
