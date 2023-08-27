import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Tag, TagCloseButton,
    TagLabel, useColorModeValue
} from "@chakra-ui/react";
import React, {useState} from "react";
import SimpleTable, {TableRow} from "./SimpleTable";
import {CloseIcon, SearchIcon} from "@chakra-ui/icons";

export interface SimpleTableDropdownProps {
    rows: TableRow[]
    onSearch: (query: string) => void
    selections: TableRow[]
    onSelect: (row: TableRow) => void
    onUnselect: (row: TableRow) => void
    tagValue: (row: TableRow) => string
    isLoading: boolean
}

export default function SimpleTableDropdown({rows, onSearch, selections, onSelect, onUnselect, tagValue, isLoading}: SimpleTableDropdownProps) {
    const [search, setSearch] = useState<string>('')
    const colorScheme = useColorModeValue('gray.50', 'gray.700')

    return <Box>
        { selections.map((row) =>
            <Tag size={"sm"} mr={"1"}>
                <TagLabel>{tagValue(row)}</TagLabel>
                <TagCloseButton onClick={() => onUnselect(row)}></TagCloseButton>
            </Tag>
        )}
        <Flex justifyContent={"space-between"}>
            <InputGroup size='md'>
                <InputLeftElement>
                    <SearchIcon/>
                </InputLeftElement>
                <Input variant={"filled"} bg={colorScheme} value={search} onChange={event => setSearch(event.target.value)}/>
                <InputRightElement>
                    <CloseIcon className={"clickable"} onClick={() => setSearch("")}/>
                </InputRightElement>
            </InputGroup>
            <Button isLoading={isLoading} onClick={() => onSearch(search)}>Search</Button>
        </Flex>
        <Box>
            <SimpleTable
                maxHeight={"30vh"}
                rows={rows}
                onSelect={row => {onSelect(row); onSelect(row)}}
            />
        </Box>
    </Box>
}