import {
    Box,
    Button, Card,
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
    onClose: () => void
    tagValue: (row: TableRow) => string
    isLoading: boolean
}

// TODO Improve dark mode
export default function SimpleTableSearchDropdown({rows, onSearch, selections, onSelect, onUnselect, onClose, tagValue, isLoading}: SimpleTableDropdownProps) {
    const [search, setSearch] = useState<string>('')
    const colorScheme = useColorModeValue('gray.50', 'gray.600')

    const reset = () => {
        setSearch("")
        onClose()
    }

    return <Box>
        <Flex mb={"1"} justifyContent={"space-between"}>
            <InputGroup size='md'>
                <InputLeftElement>
                    <SearchIcon/>
                </InputLeftElement>
                <Input variant={"outline"} value={search}
                       onChange={event => setSearch(event.target.value)}
                       onKeyDown={e=> {if (e.key === 'Enter') onSearch(search)}}/>
                <InputRightElement>
                    <CloseIcon className={"clickable"} onClick={() => reset()}/>
                </InputRightElement>
            </InputGroup>
            <Button isLoading={isLoading} onClick={() => onSearch(search)}>Search</Button>
        </Flex>
        <Card position={"absolute"} zIndex={999} bg={colorScheme} width={"100%"}>
            <SimpleTable
                maxHeight={"30vh"}
                rows={rows}
                onSelect={row => {onSelect(row); reset()}}
            />
        </Card>
        { selections.map(row =>
            <Tag size={"sm"} mr={"1"}>
                <TagLabel>{tagValue(row)}</TagLabel>
                <TagCloseButton onClick={() => onUnselect(row)}></TagCloseButton>
            </Tag>
        )}
    </Box>
}