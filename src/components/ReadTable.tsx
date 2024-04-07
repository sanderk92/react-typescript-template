import React, {ReactNode, useEffect, useState} from 'react';
import {Flex, Text, Icon, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue, Box, InputGroup, InputLeftElement, Input, InputRightElement, MenuButton, IconButton, MenuList, Menu, MenuItem, MenuOptionGroup, Button, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField, Divider, useMediaQuery} from '@chakra-ui/react';
import {CloseIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import {v4 as uuid} from 'uuid';
import {BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight, BsMailbox} from "react-icons/bs";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {isLgDevice} from "../utils/Mode";

export interface TableCell {
    value: ReactNode
    width?: string
    numerical?: boolean
    sortValue?: ReactNode
}

export interface TableRow {
    id: string,
    key: string,
    cells: TableCell[]
    menu?: boolean
}

export interface TableHeaderCell extends TableCell {
    sortable?: boolean,
}

export interface TableHeaderRow {
    cells: TableHeaderCell[]
}

export interface TaskBarButton {
    label: string,
    onClick: () => void
    icon?: React.JSX.Element
    isLoading?: boolean
}

export interface ContextMenuGroup {
    label: string,
    items: ContextMenuItem[]
}

export interface ContextMenuItem {
    label: string,
    onClick: () => void
    icon?: React.JSX.Element
    disabled?: boolean
}

interface SortState {
    ascending: boolean,
    column: number
}

interface PageState {
    page: number,
    size: number,
}

export interface TableComponentProps<T extends TableRow> {
    rows?: T[]
    header?: TableHeaderRow
    defaultSort?: SortState
    defaultPage?: PageState
    maxHeight?: string
    size?: "sm" | "md" | "lg",
    buttons?: TaskBarButton[]
    menu?: (row: T) => ContextMenuGroup[]
    onSelect?: (row: T) => void
}

export const ReadTable = <T extends TableRow>(
    {rows, header, defaultSort, defaultPage, maxHeight, size, buttons, menu, onSelect}: TableComponentProps<T>
) => {
    const [search, setSearch] = useState<string>('')
    const [sort, setSort] = useState<SortState>(defaultSort ?? {column: 0, ascending: false})
    const [page, setPage] = useState<PageState | undefined>(defaultPage)

    const [isLg] = isLgDevice()

    return (
        <Flex mb={1} flexDirection={"column"}>
            {buttons && <TableTaskbar taskbar={buttons} search={search} onSearch={setSearch}/>}
            <Divider/>
            {page && <Pagination enabled={isLg} paginator={page} setPage={setPage} totalRows={curatedRowCount()}/>}
            <TableContainer maxH={maxHeight}>
                {header && rows &&
                  <Table width={"full"} size={size}>
                    <TableHead header={header} sort={sort} setSort={setSort}/>
                    <TableBody rows={curatedRows()} menu={menu} size={size} onSelect={onSelect}/>
                  </Table>
                }
                {!header && rows &&
                  <Table width={"full"} size={size}>
                    <TableBody rows={curatedRows()} menu={menu} size={size} onSelect={onSelect}/>
                  </Table>
                }
                {header && !rows &&
                  <Table width={"full"} size={size}>
                    <TablePlaceHolder size={size}/>
                  </Table>
                }
            </TableContainer>
            {rows && rows.length === 0 && <EmptyResultDisplay/>}
        </Flex>
    )

    function curatedRows(): T[] {
        return sorted(rows ?? [])
            .filter(row => filtered(row))
            .filter((_, index) => !isLg || paginated(index))
    }

    function curatedRowCount(): number {
        return (rows ?? [])
            .filter(row => filtered(row))
            .length
    }

    function sorted(rows: T[]): T[] {
        const sorted = rows.sort((a, b) => compare(a, b))
        return sort.ascending ? sorted : sorted.reverse()
    }

    function compare(a: TableRow, b: TableRow): number {
        const collator = Intl.Collator([], {numeric: true})
        return collator.compare(sortValue(a), sortValue(b))
    }

    function sortValue(a: TableRow): string {
        const cell = a.cells[sort.column]
        return cell.sortValue ? `${cell.sortValue}` : `${cell.value}`
    }

    function filtered(row: TableRow): boolean {
        const cells = row.cells.map(cell => cell.value)
        return Object.values(cells).join(" ").toLowerCase().includes(search.toLowerCase())
    }

    function paginated(index: number): boolean {
        return !page || index >= (page.size * page.page) && index < (page.size * (page.page + 1))
    }
};

interface TableTaskbarProps {
    taskbar: TaskBarButton[] | undefined
    search: string
    onSearch: (value: string) => void
}

const TableTaskbar = ({taskbar, search, onSearch}: TableTaskbarProps): React.JSX.Element => {
    const colorScheme = useColorModeValue('gray.50', 'gray.700')

    return <Flex mb={2} justifyContent={"flex-end"}>
        <Box>
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
        <Flex alignItems={"flex-end"} justifyContent={"flex-end"}>
            {taskbar?.map(button =>
                <IconButton
                    key={button.label}
                    ml="2"
                    icon={button.icon}
                    aria-label={button.label}
                    onClick={button.onClick}
                    isLoading={button.isLoading}
                />
            )}
        </Flex>
    </Flex>
};

interface TableHeadProps {
    header: TableHeaderRow
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
                        width={cell.width}
                        isNumeric={cell.numerical}
                        bg={backgroundColorScheme}
                        className={isSortable(cell) ? "unselectable clickable" : "unselectable"}
                        _hover={isSortable(cell) ? {background: hoverColorScheme} : {backgroundColorScheme}}
                        _active={isSortable(cell) ? {background: activeColorScheme} : {backgroundColorScheme}}
                        onClick={() => {
                            if (isSortable(cell)) setSort({ascending: !sort.ascending, column: index})
                        }}
                    >
                        <Flex justifyContent="space-between">
                            <Text
                                overflow={"hidden"}
                                whiteSpace={"nowrap"}
                                textOverflow={"ellipsis"}
                            >{cell.value}</Text>
                            {sort.column === index ? sortIcon() : <Icon visibility={"hidden"}/>}
                        </Flex>
                    </Th>
                )}
            </Tr>
        </Thead>
    )

    function sortIcon() {
        return sort.ascending ? <TriangleUpIcon boxSize={2}/> : <TriangleDownIcon boxSize={2}/>;
    }

    function isSortable(cell: TableHeaderCell): boolean {
        return cell?.sortable ?? true
    }
};

interface TableBodyProps<T extends TableRow> {
    rows: T[]
    onSelect?: (row: T) => void
    menu?: (row: T) => ContextMenuGroup[]
    size?: "sm" | "md" | "lg"
}

const TableBody = <T extends TableRow>({rows, menu, onSelect, size}: TableBodyProps<T>): React.JSX.Element => {
    const [contextMenuOpenFor, setContextMenuOpenFor] = useState<number | undefined>()
    const hoverColorScheme = useColorModeValue('gray.100', 'gray.700')
    const activeColorScheme = useColorModeValue('gray.200', 'gray.600')

    return (
        <Tbody>{
            rows.map((row, rowIndex) =>
                <Tr
                    key={row.id}
                    className={"unselectable clickable"}
                    onClick={() => onSelect && onSelect(row)}
                    _hover={{background: hoverColorScheme}}
                    _active={onSelect && {background: activeColorScheme}}>
                    {row.cells.map((cell, cellIndex) =>
                        <Td
                            key={`${row.id}-${cellIndex}`}
                            width={cell.width}
                            overflow={"hidden"}
                            text-overflow={"ellipsis"}
                            white-space={"no-wrap"}>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <Text whiteSpace={"break-spaces"}>{cell.value}</Text>
                                {menu && cellIndex === row.cells.length - 1 &&
                                  <ContextMenu
                                    isOpen={contextMenuOpenFor === rowIndex}
                                    onOpen={() => setContextMenuOpenFor(rowIndex)}
                                    onClose={() => setContextMenuOpenFor(undefined)}
                                    menu={menu(row)}
                                    size={size}
                                  />
                                }
                            </Flex>
                        </Td>
                    )}
                </Tr>
            )
        }</Tbody>
    )
};

interface ContextMenuProps {
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void,
    menu: ContextMenuGroup[],
    size?: "sm" | "md" | "lg",
}

const ContextMenu = ({isOpen, onOpen, onClose, menu, size}: ContextMenuProps): React.JSX.Element => {
    const menuHoverBg = useColorModeValue("gray.300", "gray.600")

    return (
        <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton
                size={size}
                variant=''
                _hover={{bg: menuHoverBg}}
                onClick={e => {onOpen(); e.stopPropagation()}}
                as={IconButton}
                aria-label='Options'
                icon={<HiOutlineDotsVertical/>}
            />
            <MenuList justifyContent={"flex-end"}>
                {menu.map(group =>
                    <MenuOptionGroup
                        key={group.label}
                        defaultValue='asc'
                        title={group.label}
                        type={"radio"}
                        onClick={e => e.stopPropagation()}
                    >
                        {group.items.map(item =>
                            <MenuItem
                                key={item.label}
                                icon={item.icon}
                                isDisabled={item.disabled}
                                onClick={e => {item.onClick(); e.stopPropagation()}}
                            >{item.label}</MenuItem>
                        )}
                    </MenuOptionGroup>
                )}
            </MenuList>
        </Menu>
    )
}

interface PaginationProps {
    enabled: boolean
    paginator: PageState,
    setPage: (page: PageState) => void
    totalRows: number,
}

const Pagination = ({enabled, paginator, setPage, totalRows}: PaginationProps) => {

    useEffect(() => {
        currentPageStart() > totalRows && setPage({ page: lastPage(), size: paginator.size })
    })

    return enabled && paginator && (
        <Flex justifyContent={"space-between"}>
            <Flex my={1} justifyContent={"flex-end"}>
                <IconButton
                    mx={1}
                    size={"xs"}
                    icon={<BsChevronDoubleLeft/>}
                    aria-label={"reset-backward"}
                    isDisabled={isAtFirstPage() || isEmptyTable()}
                    onClick={() =>
                        setPage({ page: 0, size: paginator.size })
                    }
                />
                <IconButton
                    mx={1}
                    size={"xs"}
                    icon={<BsChevronLeft/>}
                    aria-label={"backward"}
                    isDisabled={isAtFirstPage() || isEmptyTable()}
                    onClick={() =>
                        setPage({ page: decrementPage(), size: paginator.size })
                    }
                />
                <Button
                    mx={1}
                    width={8}
                    size={"xs"}
                    variant={"outline"}
                >{paginator.page}</Button>
                <IconButton
                    mx={1}
                    size={"xs"}
                    icon={<BsChevronRight/>}
                    aria-label={"forward"}
                    isDisabled={isAtLastPage() || isEmptyTable()}
                    onClick={() => {
                        setPage({ page: incrementPage(), size: paginator.size })
                    }}
                />
                <IconButton
                    mx={1}
                    size={"xs"}
                    icon={<BsChevronDoubleRight/>}
                    aria-label={"reset-forward"}
                    isDisabled={isAtLastPage() || isEmptyTable()}
                    onClick={() =>
                        setPage({ page: lastPage(), size: paginator.size })
                    }
                />
            </Flex>
            <Flex
                alignItems={"center"}>
                <Text
                    mx={1}
                    fontSize={12}>
                    {currentPageStart()} - {currentPageEnd()} of {totalRows}
                </Text>
                <NumberInput
                    mx={1} size={"xs"} maxW={16} step={10} min={10} max={100} value={paginator.size}
                    onChange={value => setPage({page: 0, size: +value})}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>
        </Flex>
    )

    function isEmptyTable() {
        return totalRows === 0;
    }

    function firstPage() {
        return 0
    }

    function lastPage() {
        return Math.ceil(totalRows / paginator.size) - 1;
    }

    function isAtFirstPage() {
        return paginator.page === firstPage();
    }

    function isAtLastPage() {
        return paginator.page === lastPage();
    }

    function currentPageStart() {
        return paginator.page * paginator.size;
    }

    function currentPageEnd() {
        return Math.min(totalRows, paginator.size * (paginator.page + 1));
    }

    function decrementPage() {
        return Math.max(firstPage(), paginator.page - 1);
    }

    function incrementPage() {
        return Math.min(lastPage(), paginator.page + 1);
    }
}

interface TablePlaceholderProps {
    size?: "sm" | "md" | "lg"
}

const TablePlaceHolder = ({size}: TablePlaceholderProps): React.JSX.Element => {
    const backgroundColorScheme = useColorModeValue('gray.200', 'gray.800')
    const header = 2
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
