import React, {ReactNode, useState} from 'react';
import {Divider, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {AddIcon, CloseIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
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
 *  - Sortable by the first column's string value natural key
 *  - Optional customizable selection page
 *  - Optional customizable creation page
 */
export default function StringKeyTable({headers, entries, onSelect, onCreate}: TableComponentProps) {
    const [createOpen, setCreateOpen] = useState<boolean>(false)
    const [selection, select] = useState<TableEntry | undefined>()
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<boolean>(true) // ascending

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
                        <TableHeader headers={headers} setSort={setSort} sort={sort}/>
                    </Thead>
                    <Tbody>
                        <TableRows entries={filterEntries(entries, search, sort)} onSelect={openSelect}/>
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
    setSort: (sort: boolean) => void
    sort: boolean
}

const TableHeader = ({setSort, sort, headers}: TableHeaderProps) => {
    const hoverColorScheme = useColorModeValue('gray.50', 'gray.700')

    return <Tr>
        <Th className={"unselectable clickable"} _hover={{background: hoverColorScheme}}
            onClick={() => setSort(!sort)}>
            {headers.first}{sort ? <TriangleUpIcon/> : <TriangleDownIcon/>}
        </Th>
        <Th className={"unselectable"}>{headers.second}</Th>
        <Th className={"unselectable"}>{headers.third}</Th>
    </Tr>;
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

function filterEntries(entries: TableEntry[], search: string, sort: boolean) {
    return entries
        .filter(entry =>
            Object.values(entry).join(" ").toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            sort ?
                (`${a.firstColumn}` > `${b.firstColumn}` ? 1 : -1) :
                (`${a.firstColumn}` > `${b.firstColumn}` ? -1 : 1)
        )
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