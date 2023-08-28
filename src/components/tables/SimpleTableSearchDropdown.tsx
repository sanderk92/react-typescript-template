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
    rows: TableRow[]
    onSearch: (query: string) => void
    selections: TableRow[]
    onSelect: (row: TableRow) => void
    onUnselect: (row: TableRow) => void
    isLoading: boolean
}

export default function SimpleTableSearchDropdown({rows, onSearch, selections, onSelect, onUnselect, isLoading}: SimpleTableDropdownProps) {
    const [search, setSearch] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const colorScheme = useColorModeValue('gray.50', 'gray.600')
    const outsideClickRef = useRef<HTMLDivElement>(null);

    const open = (query: string) => {
        onSearch(query)
        setIsOpen(true)
    }

    const select = (row: TableRow) => {
        onSelect(row)
        reset()
    }

    const reset = () => {
        setSearch("");
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

    return (
        <Box ref={outsideClickRef}>
            <Flex mb={"1"} justifyContent={"space-between"}>
                <InputGroup size="md">
                    <InputLeftElement>
                        <SearchIcon/>
                    </InputLeftElement>
                    <Input variant={"outline"} value={search}
                           onChange={event => setSearch(event.target.value)}
                           onKeyDown={e=> {if (e.key === 'Enter') open(search)}}/>
                    <InputRightElement>
                        <CloseIcon className={"clickable"} onClick={reset}/>
                    </InputRightElement>
                </InputGroup>
                <Button isLoading={isLoading} onClick={() => open(search)}>Search</Button>
            </Flex>
            <Card position={"absolute"} zIndex={999} bg={colorScheme} width={"100%"} hidden={!isOpen}>
                <SimpleTable
                    maxHeight={"30vh"}
                    rows={rows}
                    onSelect={select}
                />
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