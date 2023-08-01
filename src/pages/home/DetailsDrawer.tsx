import {useParams} from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
import * as React from "react";
import {Data} from "../../http/model/Data";

export interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
    input: Data[]
}

export default function DetailsDrawer({isOpen, onClose, input}: DetailsDrawerProps) {
    const { id } = useParams();

    const row = input.find(it => it.id === id)

    if (row == null) {
        return <></>
    } else return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader>Details</DrawerHeader>
                <DrawerBody>
                    <FormControl >
                        <FormLabel>First</FormLabel>
                        <Input isDisabled={true} value={row.id} placeholder='First'/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Second</FormLabel>
                        <Input isDisabled={true} value={row.company} placeholder='Second'/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Third</FormLabel>
                        <Input isDisabled={true} value={row.status} placeholder='Third'/>
                    </FormControl>
                </DrawerBody>
                <DrawerCloseButton/>
            </DrawerContent>
        </Drawer>
    )
}
