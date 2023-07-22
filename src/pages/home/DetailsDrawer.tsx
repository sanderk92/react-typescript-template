import {useParams} from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    FormControl,
    FormLabel, Input,
    Text
} from "@chakra-ui/react";
import * as React from "react";
import {HomePageRow} from "./HomePage";

export interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
    input: HomePageRow[]
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
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input value={row.id} placeholder='First name'/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last name</FormLabel>
                        <Input value={row.id} placeholder='Last name'/>
                    </FormControl>
                </DrawerBody>
                <DrawerCloseButton/>
            </DrawerContent>
        </Drawer>
    )
}
