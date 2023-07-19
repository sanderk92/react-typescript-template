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
import "./tables.css"

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
    onSelect?: (isOpen: boolean, onClose: () => void, row: Row) => React.JSX.Element
    onCreate?: (isOpen: boolean, onClose: () => void) => React.JSX.Element
}

interface SortState {
    direction: boolean,
    column: number
}

/**
 * A table intended for showing entries with a plain string first column.
 *  - dynamic number of columns of equal width with numerical and empty cell support
 *  - Searchable by all columns
 *  - Smart sort by all columns
 *  - Optional customizable selection page
 *  - Optional customizable creation page
 */
export default function StringKeyTable<Row extends TableRow>({headers, rows, onSelect, onCreate}: TableComponentProps<Row>) {
    const [createOpen, setCreateOpen] = useState<boolean>(false)
    const [selection, select] = useState<Row | undefined>()
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<SortState>({column: 0, direction: true})

    const selectOpen = selection !== undefined

    const openSelect = (row: Row): void => {
        select(row);
        onBackButton(() => closeSelect())
    }

    const openCreate = (): void => {
        setCreateOpen(true)
        onBackButton(() => closeCreate())
    }
    const closeSelect = (): void => {
        select(undefined);
        restoreBackButton()
    }

    const closeCreate = (): void => {
        setCreateOpen(false);
        restoreBackButton()
    }

    return <>
        <TableContainer p="4">
            <Flex pr="2" pb="4" alignItems={"flex-end"} justifyContent={"flex-end"}>
                <SearchField search={search} onSearch={(query) => setSearch(query)}/>
                {onCreate ? <IconButton ml="4" icon={<AddIcon/>} aria-label={"create"} onClick={openCreate}/> : null}
            </Flex>
            <Divider/>
            <Table variant='simple'>
                <Thead>
                    <TableHeader headers={headers} sort={sort} setSort={setSort}/>
                </Thead>
                <Tbody>
                    <TableRows rows={filterEntries(rows, search, sort)} onSelect={openSelect}/>
                </Tbody>
            </Table>
        </TableContainer>
        {onSelect && selectOpen ? onSelect(selectOpen, closeSelect, selection) : null}
        {onCreate && createOpen ? onCreate(createOpen, closeCreate) : null}
    </>
}

const SearchField = ({search, onSearch}: {
    search: string
    onSearch: (query: string) => void
}) => {
    const colorScheme = useColorModeValue('white', 'gray.900')

    return <InputGroup size='md' width={"25vw"}>
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
    const hoverColorScheme = useColorModeValue('gray.50', 'gray.700')

    return (
        <Tr>
            {headers.map((cell, index) =>
                <Th className={"unselectable clickable"}
                    isNumeric={cell.numerical}
                    _hover={{background: hoverColorScheme}}
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
                        <Td isNumeric={cell.numerical}>{cell.value}</Td>)}
                </Tr>
            )
        }</>
    )
}

function filterEntries<Row extends TableRow>(rows: Row[], search: string, sort: SortState) {
    const collator = Intl.Collator([], {numeric: true})

    return rows
        .filter(row => Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => compare(a.cells[sort.column]?.value, b.cells[sort.column]?.value))

    function compare(a?: ReactNode, b?: ReactNode): number {
        return sort.direction ? (collator.compare(`${a}`, `${b}`)) : (collator.compare(`${b}`, `${a}`))
    }
}

/**
 * Hack to allow the back button to be used to control modals, drawers etc.
 */
const onBackButton = (callback: () => void) => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
        callback();
    };
};

/**
 * Reset the back button to default behaviour.
 */
const restoreBackButton = () => {
    window.history.back();
    window.onpopstate = null;
};