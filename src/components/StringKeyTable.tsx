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
import {AddIcon, CloseIcon, LockIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import "./tables.css"

export interface TableHeaders {
    first: ReactNode,
    second: ReactNode,
    third: ReactNode,
}

export interface TableEntry {
    id: string,
    firstColumn: ReactNode,
    secondColumn: ReactNode,
    thirdColumn: ReactNode,
}

export interface TableComponentProps {
    headers: TableHeaders
    entries: TableEntry[]
    onSelect?: (isOpen: boolean, onClose: () => void, entry: TableEntry) => React.JSX.Element
    onCreate?: (isOpen: boolean, onClose: () => void) => React.JSX.Element
}

/**
 * A table intended for showing entries with a plain string first column.
 *  - 3 columns of equal width
 *  - Searchable by all columns
 *  - Smart sort by all columns
 *  - Optional customizable selection page
 *  - Optional customizable creation page
 */
export default function StringKeyTable({headers, entries, onSelect, onCreate}: TableComponentProps) {
    const [createOpen, setCreateOpen] = useState<boolean>(false)
    const [selection, select] = useState<TableEntry | undefined>()
    const [search, setSearch] = useState<string>('')
    const [sortDirection, setSortDirection] = useState<boolean>(true) // ascending
    const [sortColumn, setSortColumn] = useState<0 | 1 | 2>(0)

    const selectOpen = selection !== undefined

    const openSelect = (entry: TableEntry): void => {
        select(entry);
        onBackButton(() => closeSelect())
    }

    const openCreate = () : void => {
        setCreateOpen(true)
        onBackButton(() => closeCreate())
    }
    const closeSelect = (): void => {
        select(undefined);
        restoreBackButton()
    }

    const closeCreate = () : void => {
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
                        <TableHeader
                            headers={headers}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            sortColumn={sortColumn}
                            setSortColumn={setSortColumn}
                        />
                    </Thead>
                    <Tbody>
                        <TableRows
                            entries={filterEntries(entries, search, sortDirection, sortColumn)}
                            onSelect={openSelect}
                        />
                    </Tbody>
                </Table>
            </TableContainer>
            { onSelect && selectOpen ? onSelect(selectOpen, closeSelect, selection) : null }
            { onCreate && createOpen ? onCreate(createOpen, closeCreate) : null}
        </>
    }

interface SearchFieldProps {
    search: string
    onSearch: (query: string) => void
}

const SearchField = ({search, onSearch}: SearchFieldProps) => {
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

interface TableHeaderProps {
    headers: TableHeaders
    sortDirection: boolean
    setSortDirection: (direction: boolean) => void
    sortColumn: 0 | 1 | 2
    setSortColumn: (column: 0 | 1 | 2) => void
}

const TableHeader = ({headers, sortDirection, setSortDirection, sortColumn, setSortColumn}: TableHeaderProps) => {
    const hoverColorScheme = useColorModeValue('gray.50', 'gray.700')

    return <Tr>
        <Th className={"unselectable clickable"}
            _hover={{background: hoverColorScheme}}
            onClick={() => {
                setSortDirection(!sortDirection)
                setSortColumn(0)
            }}>
            <Flex
                display={"flex"}
                justifyContent={"space-between"}>
                {headers.first}
                {sortColumn === 0 ? sortIcon() : <Icon visibility={"hidden"}/>}
            </Flex>
        </Th>
        <Th className={"unselectable clickable"}
            _hover={{background: hoverColorScheme}}
            onClick={() => {
                setSortDirection(!sortDirection)
                setSortColumn(1)
            }}>
            <Flex
                justifyContent={"space-between"}>
                {headers.second}
                {sortColumn === 1 ? sortIcon() : <Icon visibility={"hidden"}/>}
            </Flex>
        </Th>
        <Th className={"unselectable clickable"}
            _hover={{background: hoverColorScheme}}
            onClick={() => {
                setSortDirection(!sortDirection);
                setSortColumn(2)
            }}>
            <Flex
                justifyContent={"space-between"}>
                {headers.third}
                {sortColumn === 2 ? sortIcon() : <Icon visibility={"hidden"}/>}
            </Flex>
        </Th>
    </Tr>;

    function sortIcon() {
        return sortDirection ? <TriangleUpIcon/> : <TriangleDownIcon/>;
    }
}

interface TableRowsProps {
    entries: TableEntry[]
    onSelect: (entry: TableEntry) => void
}

const TableRows = ({entries, onSelect}: TableRowsProps) => {
    const hoverColorScheme = useColorModeValue('gray.100', 'gray.700')
    const activeColorScheme = useColorModeValue('gray.200', 'gray.600')

    return <>{
        entries.map(entry=>
            <Tr
                key={entry.id}
                className={"unselectable clickable"}
                onClick={() => onSelect(entry)}
                _hover={{background: hoverColorScheme}}
                _active={{background: activeColorScheme}}>
                <Td>{entry.firstColumn}</Td>
                <Td>{entry.secondColumn}</Td>
                <Td>{entry.thirdColumn}</Td>
            </Tr>
        )
    }</>
}

function filterEntries(entries: TableEntry[], search: string, sortDirection: boolean, sortColumn: 0 | 1 | 2) {
    return entries
        .filter(entry =>
            Object.values(entry).join(" ").toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortColumn === 0) {
                return compare(a.firstColumn, b.firstColumn, sortDirection)
            } else if (sortColumn === 1) {
                return compare(a.secondColumn, b.secondColumn, sortDirection)
            } else {
                return compare(a.thirdColumn, b.thirdColumn, sortDirection)
            }
        }
    )
}

function compare(a: ReactNode, b: ReactNode, sortDirection: boolean): number {
    const collator = Intl.Collator([], {numeric: true})
    return sortDirection ? (collator.compare(`${a}`, `${b}`)) : (collator.compare(`${b}`, `${a}`))
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