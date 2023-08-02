import {useParams} from "react-router-dom";
import {Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, FormControl, FormLabel, Input} from "@chakra-ui/react";
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
                        <FormLabel>Id</FormLabel>
                        <Input isDisabled={true} value={row.id} placeholder='Id'/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Name</FormLabel>
                        <Input isDisabled={true} value={row.company} placeholder='Name'/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Time</FormLabel>
                        <Input isDisabled={true} value={row.time.toLocaleString()} placeholder='Time'/>
                    </FormControl>
                </DrawerBody>
                <DrawerCloseButton/>
            </DrawerContent>
        </Drawer>
    )
}
