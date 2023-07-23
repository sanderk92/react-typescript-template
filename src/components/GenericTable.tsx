import React, {ReactNode, useState} from 'react';
import {
    Divider,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from '@chakra-ui/react';
import {AddIcon, CloseIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import "./components.css"

export interface TableCell {
    value: ReactNode
    numerical?: boolean
}

export interface TableRow {
    id: string,
    cells: TableCell[]
}

export interface TableComponentProps<Row extends TableRow> {
    headers: TableCell[]
    rows: Row[]
    onSelect: (row: Row) => void
    onCreate?: () => void
    children: React.JSX.Element
}

interface SortState {
    direction: boolean,
    column: number
}

/**
 *  - Generic table with a dynamic number of columns of equal width with numerical and empty cell support
 *  - Searchable by all columns
 *  - Smart sort by all columns
 *  - Mandatory on select action
 *  - Optional on create action
 */
export default function GenericTable<Row extends TableRow>({headers, rows, onSelect, onCreate, children}: TableComponentProps<Row>) {
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<SortState>({column: 0, direction: true})

    return <>
        <TableContainer p="4">
            <Flex pr="2" pb="4" alignItems={"flex-end"} justifyContent={"flex-end"}>
                <SearchField search={search} onSearch={(query) => setSearch(query)}/>
                {onCreate ? <IconButton ml="4" icon={<AddIcon/>} aria-label={"create"} onClick={onCreate}/> : null}
            </Flex>
            <Divider/>
            <Table variant='simple'>
                <Thead>
                    <TableHeader headers={headers} sort={sort} setSort={setSort}/>
                </Thead>
                <Tbody>
                    <TableRows rows={filterEntries(rows, search, sort)} onSelect={onSelect}/>
                </Tbody>
            </Table>
            {children}
        </TableContainer>
    </>
}

const SearchField = ({search, onSearch}: {
    search: string
    onSearch: (query: string) => void
}) => {
    const colorScheme = useColorModeValue('white', 'gray.900')

    return <InputGroup size='md' width={"100%"}>
        <InputLeftElement>
            <SearchIcon/>
        </InputLeftElement>
        <Input bg={colorScheme} value={search} onChange={event => onSearch(event.target.value)}/>
        <InputRightElement>
            <CloseIcon className={"clickable"} background={colorScheme} onClick={() => onSearch("")}/>
        </InputRightElement>
    </InputGroup>
}

const TableHeader = ({headers, sort, setSort}: {
    headers: TableCell[]
    sort: SortState
    setSort: (sort: SortState) => void
}) => {
    const backgroundColorScheme = useColorModeValue('gray.300', 'gray.800')
    const hoverColorScheme = useColorModeValue('gray.400', 'gray.700')
    const activeColorScheme = useColorModeValue('gray.500', 'gray.600')

    return (
        <Tr>
            {headers.map((cell, index) =>
                <Th className={"unselectable clickable"}
                    isNumeric={cell.numerical}
                    bg={backgroundColorScheme}
                    _hover={{background: hoverColorScheme}}
                    _active={{background: activeColorScheme}}
                    onClick={() => {
                        setSort({direction: !sort.direction, column: index})
                    }}>
                    <Flex
                        display={"flex"}
                        justifyContent={"space-between"}>
                        {cell.value}
                        {sort.column === index ? sortIcon() : <Icon visibility={"hidden"}/>}
                    </Flex>
                </Th>
            )}
        </Tr>
    )

    function sortIcon() {
        return sort.direction ? <TriangleUpIcon/> : <TriangleDownIcon/>;
    }
}

const TableRows = <Row extends TableRow>({rows, onSelect}: {
    rows: Row[]
    onSelect: (row: Row) => void
}) => {
    const hoverColorScheme = useColorModeValue('gray.100', 'gray.700')
    const activeColorScheme = useColorModeValue('gray.200', 'gray.600')

    return (
        <>{
            rows.map(row =>
                <Tr
                    key={row.id}
                    className={"unselectable clickable"}
                    onClick={() => onSelect(row)}
                    _hover={{background: hoverColorScheme}}
                    _active={{background: activeColorScheme}}>
                    {row.cells.map(cell =>
                        <Td isNumeric={cell.numerical}>{cell.value}</Td>
                    )}
                </Tr>
            )
        }</>
    )
}

function filterEntries<Row extends TableRow>(rows: Row[], search: string, sort: SortState) {
    const collator = Intl.Collator([], {numeric: true})

    return rows
        .filter(row => {
            const cells = row.cells.map(cell => cell.value)
            return Object.values(cells).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        .sort((a, b) =>
            compare(a.cells[sort.column]?.value, b.cells[sort.column]?.value)
        )

    function compare(a?: ReactNode, b?: ReactNode): number {
        return sort.direction ? (collator.compare(`${a}`, `${b}`)) : (collator.compare(`${b}`, `${a}`))
    }
}
