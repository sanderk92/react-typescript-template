import {Box, Card, Flex, Input, InputGroup, useColorModeValue} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";

export interface DropdownRow<T> {
    id: string
    key: string
    value: string
    object: T
}

export interface DropdownProps<T> {
    rows: DropdownRow<T>[]
    selected: DropdownRow<T> | undefined
    onSelect: (row: DropdownRow<T>) => void
    centerText?: boolean,
    width?: string
    disabled?: boolean
}

export default function Dropdown<T>(
    {rows, selected, onSelect, centerText, width, disabled}: DropdownProps<T>
) {
    const [isOpen, setOpen] = useState(false)
    const colorScheme = useColorModeValue('gray.50', 'gray.600')
    const outsideClickRef = useRef<HTMLDivElement>(null);

    const selectRow = (row: DropdownRow<T>) => {
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
                        className={"clickable"}
                        textAlign={centerText ? 'center' : undefined}
                        w={width}
                        readOnly={true}
                        isDisabled={disabled}
                        placeholder={"Please make a selection"}
                        variant={"outline"}
                        value={selected?.value ?? ""}
                        onClick={() => setOpen(!isOpen)}/>
                </InputGroup>
            </Flex>
            <Card
                maxH={"300px"}
                overflowY={"scroll"}
                position={"absolute"}
                zIndex={999}
                bg={colorScheme}
                w={width}
                hidden={!isOpen}
            >
                    {rows.map(row =>
                        <Input
                            readOnly
                            key={row.key}
                            minH={"50px"}
                            borderRadius={0}
                            variant={"filled"}
                            className={"clickable"}
                            value={row.value}
                            onClick={() => selectRow(row)}/>
                    )}
            </Card>
        </Box>
    )
}