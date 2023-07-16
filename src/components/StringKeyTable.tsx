import React, {ReactNode, useState} from 'react';
import {Divider, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {CloseIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import "./tables.css"

export interface TableHeaders {
    first: ReactNode,
    second: ReactNode,
    third: ReactNode,
}

export interface TableEntry {
    firstColumn: string,
    secondColumn: ReactNode,
    thirdColumn: ReactNode,
}

export interface TableComponentProps {
    headers: TableHeaders
    entries: TableEntry[]
    details: (entry: TableEntry) => React.JSX.Element
}

/**
 * A table intended for showing entries with a plain string first column.
 *  - 3 columns of equal width
 *  - Sortable by the first column
 *  - Searchable by all columns
 */
export default function StringKeyTable({headers, entries, details}: TableComponentProps) {
    const [selection, select] = useState<TableEntry | undefined>()
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<boolean>(true) // ascending

    return selection ?
        <Details selection={selection} details={details} onClose={() => select(undefined)}/> :
        <TableContainer p="4">
            <SearchField search={search} onSearch={(query) => setSearch(query)}/>
            <Divider/>
            <Table variant='simple'>
                <Thead>
                    <TableHeader headers={headers} setSort={setSort} sort={sort}/>
                </Thead>
                <Tbody>
                    <TableRows entries={filterEntries(entries, search, sort)} onSelect={select}/>
                </Tbody>
            </Table>
        </TableContainer>
}

interface SearchFieldProps {
    search: string
    onSearch: (query: string) => void
}

const SearchField = ({search, onSearch}: SearchFieldProps) => {
    const colorScheme = useColorModeValue('white', 'gray.900')

    return <Flex pr="2" pb="4" alignItems={"right"} justifyContent={"right"}>
        <InputGroup size='md' width={"25vw"}>
            <InputLeftElement>
                <SearchIcon/>
            </InputLeftElement>
            <Input bg={colorScheme} value={search} onChange={event => onSearch(event.target.value)}/>
            <InputRightElement>
                <CloseIcon className={"clickable"} background={colorScheme} onClick={() => onSearch("")}/>
            </InputRightElement>
        </InputGroup>
    </Flex>;
}

interface TableHeaderProps {
    headers: TableHeaders
    setSort: (sort: boolean) => void
    sort: boolean
}

const TableHeader = ({setSort, sort, headers}: TableHeaderProps) => {
    const colorScheme = useColorModeValue('white', 'gray.900')

    return <Tr>
        <Th className={"unselectable clickable"} _hover={{background: colorScheme}}
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
        entries.map(entry =>
            <Tr
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
        .sort((a, b) => {
            return sort ? (a.firstColumn > b.firstColumn ? 1 : -1) : (a.firstColumn > b.firstColumn ? -1 : 1)
        })
}

interface DetailsPageProps {
    selection: TableEntry
    details: (entry: TableEntry) => React.JSX.Element
    onClose : () => void
}

const Details = ({selection, details, onClose}: DetailsPageProps) => {
    return (
        <>
            <IconButton size={"xs"} isRound={true} icon={<CloseIcon/>} colorScheme='blackAlpha' onClick={onClose} aria-label={'Close'}></IconButton>{details(selection)}
        </>
    );
}