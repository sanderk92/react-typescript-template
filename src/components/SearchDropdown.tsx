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
import SimpleTable, {TableHeader, TableRow} from "./SimpleTable";
import {CloseIcon, SearchIcon} from "@chakra-ui/icons";

export interface SimpleTableSearchDropdownProps<T extends TableRow> {
    onSearch: (query: string) => Promise<T[]>
    selections: T[]
    onSelect: (row: T) => void
    onUnselect: (row: T) => void
    header?: TableHeader
}

export default function SearchDropdown<T extends TableRow>(
    {onSearch, selections, onSelect, onUnselect, header}: SimpleTableSearchDropdownProps<T>
) {
    const [rows, setRows] = useState<T[]>([])
    const [query, setQuery] = useState<string>("")
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)

    const colorScheme = useColorModeValue('gray.50', 'gray.600')
    const outsideClickRef = useRef<HTMLDivElement>(null);

    const requestSearch = () => {
        setLoading(true)
    }

    const selectRow = (row: T) => {
        onSelect(row)
        resetInput()
    }

    const resetInput = () => {
        setQuery("");
        setOpen(false)
    }

    useEffect(() => {
        if (isLoading) {
            onSearch(query)
                .then(setRows)
                .then(() => setOpen(true))
                .then(() => setLoading(false))
        }
    }, [isLoading, onSearch, query])

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (outsideClickRef.current && !outsideClickRef.current.contains(event.target as HTMLElement)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])

    return (
        <Box ref={outsideClickRef}>
            <Flex mb={"1"} justifyContent={"space-between"}>
                <InputGroup size="md">
                    <InputLeftElement>
                        <SearchIcon/>
                    </InputLeftElement>
                    <Input
                        placeholder={"Please enter a query"}
                        variant={"outline"} value={query}
                        onChange={event => setQuery(event.target.value)}
                        onKeyDown={e=> {if (e.key === 'Enter') requestSearch()}}/>
                    <InputRightElement>
                        <CloseIcon className={"clickable"} onClick={resetInput}/>
                    </InputRightElement>
                </InputGroup>
                <Button isLoading={isLoading} onClick={requestSearch}>Search</Button>
            </Flex>
            <Card position={"absolute"} zIndex={999} bg={colorScheme} width={"100%"} hidden={!isOpen}>
                <SimpleTable maxHeight={"30vh"} rows={rows} onSelect={selectRow} header={header}/>
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