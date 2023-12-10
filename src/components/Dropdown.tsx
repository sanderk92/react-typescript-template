import {Box, Card, Flex, Input, InputGroup, useColorModeValue} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import SimpleTable, {TableHeader, TableRow} from "./SimpleTable";

export interface SimpleTableDropdownProps<T extends TableRow> {
    rows: T[]
    selection: T | undefined
    onSelect: (row: T) => void
    header?: TableHeader
}

export default function SimpleTableSearchDropdown<T extends TableRow>(
    {rows, selection, onSelect, header}: SimpleTableDropdownProps<T>
) {
    const [isOpen, setOpen] = useState(false)
    const colorScheme = useColorModeValue('gray.50', 'gray.600')
    const outsideClickRef = useRef<HTMLDivElement>(null);

    const selectRow = (row: T) => {
        onSelect(row)
        setOpen(false)
    }

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
                    <Input
                        readOnly={true}
                        placeholder={"Please make a selection"}
                        variant={"outline"}
                        value={selection?.cells.map(cell => cell.value).join(" ") ?? ""}
                        onClick={() => setOpen(true)}/>
                </InputGroup>
            </Flex>
            <Card position={"absolute"} zIndex={999} bg={colorScheme} width={"100%"} hidden={!isOpen}>
                <SimpleTable maxHeight={"30vh"} rows={rows} onSelect={selectRow} header={header} size={"md"}/>
            </Card>
        </Box>
    )
}