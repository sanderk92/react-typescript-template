import {
    Box,
    Button,
    Card,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Tag,
    TagCloseButton,
    TagLabel,
    useColorModeValue
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import SimpleTable, {TableRow} from "./SimpleTable";
import {CloseIcon, SearchIcon} from "@chakra-ui/icons";

export interface SimpleTableDropdownProps {
    onSearch: (query: string) => Promise<TableRow[]>
    selections: TableRow[]
    onSelect: (row: TableRow) => void
    onUnselect: (row: TableRow) => void
}

export default function SimpleTableSearchDropdown({onSearch, selections, onSelect, onUnselect}: SimpleTableDropdownProps) {
    const [rows, setRows] = useState<TableRow[]>([])
    const [query, setQuery] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const colorScheme = useColorModeValue('gray.50', 'gray.600')
    const outsideClickRef = useRef<HTMLDivElement>(null);

    const requestSearch = () => {
        setIsLoading(true)
    }

    const selectRow = (row: TableRow) => {
        onSelect(row)
        resetInput()
    }

    const resetInput = () => {
        setQuery("");
        setIsOpen(false)
    }

    const handleOutsideClick = (event: MouseEvent) => {
        if (outsideClickRef.current && !outsideClickRef.current.contains(event.target as HTMLElement)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    })

    useEffect(() => {
        if (isLoading) {
            onSearch(query)
                .then(setRows)
                .then(() => setIsOpen(true))
                .then(() => setIsLoading(false))
        }
    }, [isLoading, onSearch, query])

    return (
        <Box ref={outsideClickRef}>
            <Flex mb={"1"} justifyContent={"space-between"}>
                <InputGroup size="md">
                    <InputLeftElement>
                        <SearchIcon/>
                    </InputLeftElement>
                    <Input variant={"outline"} value={query}
                           onChange={event => setQuery(event.target.value)}
                           onKeyDown={e=> {if (e.key === 'Enter') requestSearch()}}/>
                    <InputRightElement>
                        <CloseIcon className={"clickable"} onClick={resetInput}/>
                    </InputRightElement>
                </InputGroup>
                <Button isLoading={isLoading} onClick={requestSearch}>Search</Button>
            </Flex>
            <Card position={"absolute"} zIndex={999} bg={colorScheme} width={"100%"} hidden={!isOpen}>
                <SimpleTable maxHeight={"30vh"} rows={rows} onSelect={selectRow}/>
            </Card>
            { selections.map(row =>
                <Tag size={"sm"} mr={"1"}>
                    <TagLabel>{row.cells.map(cell => cell.value).join(" ")}</TagLabel>
                    <TagCloseButton onClick={() => onUnselect(row)}></TagCloseButton>
                </Tag>
            )}
        </Box>
    )
}