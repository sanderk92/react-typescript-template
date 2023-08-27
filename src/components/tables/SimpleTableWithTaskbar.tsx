import React, {useState} from "react";
import SimpleTable, {TableComponentProps, TableRow} from "./SimpleTable";
import {Box, Flex, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue} from "@chakra-ui/react";
import {CloseIcon, SearchIcon} from "@chakra-ui/icons";
import EmptyResultDisplay from "../EmptyResultDisplay";
import SpinnerCentered from "../SpinnerCentered";

export interface SearchableTableComponentProps extends TableComponentProps {
    buttons?: React.JSX.Element
}

export default function SimpleTableWithTaskbar({header, rows, onSelect, defaultSort, buttons}: SearchableTableComponentProps) {
    const [search, setSearch] = useState<string>('')
    const colorScheme = useColorModeValue('gray.50', 'gray.700')

    return (
        <Flex m={"1"} flexDirection={"column"}>
            <Flex m={"2"} justifyContent={"flex-end"}>
                <Box mr={"2"}>
                    <InputGroup size='md'>
                        <InputLeftElement>
                            <SearchIcon/>
                        </InputLeftElement>
                        <Input variant={"filled"} bg={colorScheme} value={search} onChange={event => setSearch(event.target.value)} placeholder={"Search"}/>
                        <InputRightElement>
                            <CloseIcon className={"clickable"} onClick={() => setSearch("")}/>
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <Box>{buttons}</Box>
            </Flex>
            {
                rows == null ? <SpinnerCentered/> : rows.length === 0 ? <EmptyResultDisplay/> :
                <SimpleTable
                    rows={rows?.filter(row => filter(row, search))}
                    onSelect={onSelect}
                    header={header}
                    defaultSort={defaultSort}
                ></SimpleTable>
            }
        </Flex>
    )
}

function filter(row: TableRow, search: string): boolean {
    const cells = row.cells.map(cell => cell.value)
    return Object.values(cells).join(" ").toLowerCase().includes(search.toLowerCase())
}

