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
    TagLabel, useBoolean,
    useColorModeValue
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import SimpleTable, {TableHeader, TableRow} from "./SimpleTable";
import {CloseIcon, SearchIcon} from "@chakra-ui/icons";

export interface SimpleTableDropdownProps<T extends TableRow> {
    onSearch: (query: string) => Promise<T[]>
    selections: T[]
    onSelect: (row: T) => void
    onUnselect: (row: T) => void
    header?: TableHeader
}

export default function SimpleTableSearchDropdown<T extends TableRow>(
    {onSearch, selections, onSelect, onUnselect, header}: SimpleTableDropdownProps<T>
) {
    const [rows, setRows] = useState<T[]>([])
    const [query, setQuery] = useState<string>("")

    const [isOpen, setOpen] = useBoolean()
    const [isLoading, setLoading] = useBoolean()

    const colorScheme = useColorModeValue('gray.50', 'gray.600')
    const outsideClickRef = useRef<HTMLDivElement>(null);

    const requestSearch = () => {
        setLoading.on()
    }

    const selectRow = (row: T) => {
        onSelect(row)
        resetInput()
    }

    const resetInput = () => {
        setQuery("");
        setOpen.off()
    }

    const handleOutsideClick = (event: MouseEvent) => {
        if (outsideClickRef.current && !outsideClickRef.current.contains(event.target as HTMLElement)) {
            setOpen.off()
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
                .then(() => setOpen.on())
                .then(() => setLoading.off())
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