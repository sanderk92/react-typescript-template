import React, {ReactNode, useState} from 'react';
import {Flex, Icon, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import "../components.css"
import {v4 as uuid} from 'uuid';

export interface TableCell {
    value: ReactNode
    maxWidth?: string
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
    rows?: TableRow[]
    header?: TableHeader
    defaultSort?: SortState
    maxHeight?: string
    onSelect: (row: TableRow) => void
}

interface SortState {
    direction: boolean,
    column: number
}

export default function SimpleTable({header, rows, onSelect, defaultSort, maxHeight}: TableComponentProps) {
    const [sort, setSort] = useState<SortState>(defaultSort ?? {column: 0, direction: false})

    return (
        <TableContainer maxH={maxHeight} overflowY={"scroll"}>
            <Table variant='simple' size="md">
                {header ? <TableHead header={header} sort={sort} setSort={setSort}/> : null}
                {rows ? <TableBody rows={sorted(rows, sort)} onSelect={onSelect}/> : null}
            </Table>
        </TableContainer>
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
                            maxWidth={cell.maxWidth}
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

function sorted(rows: TableRow[], sort: SortState) {
    const collator = Intl.Collator([], {numeric: true})
    return rows.sort((a, b) => compare(getSortValue(a), getSortValue(b)))

    function getSortValue(a: TableRow): ReactNode {
        const cell = a.cells[sort.column]
        return cell.sortValue != null ? cell.sortValue : cell.value
    }

    function compare(a: ReactNode, b: ReactNode): number {
        return sort.direction ? (collator.compare(`${a}`, `${b}`)) : (collator.compare(`${b}`, `${a}`))
    }
}
