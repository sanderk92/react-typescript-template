import {useParams} from "react-router-dom";
import {Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, Text} from "@chakra-ui/react";
import * as React from "react";
import {HomePageRow} from "./HomePage";

export interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
    input: HomePageRow[]
}

export default function DetailsDrawer({isOpen, onClose, input}: DetailsDrawerProps) {
    const { id } = useParams();

    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Details</DrawerHeader>
            <Text>{
                input.find(it => it.id === id)?.extra
            }</Text>
            <DrawerCloseButton/>
        </DrawerContent>
    </Drawer>;
}
