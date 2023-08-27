import {useParams} from "react-router-dom";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    FormControl,
    FormLabel,
    Input, Text,
} from "@chakra-ui/react";
import * as React from "react";
import {DataView} from "../../http/model/Data";
import useBackend from "../../http/BackendService";
import {useEffect, useState} from "react";
import SpinnerCentered from "../../components/SpinnerCentered";
import "../../styles.css"

export interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function InboxDetailsDrawer({isOpen, onClose}: DetailsDrawerProps) {
    const [selected, setSelected] = useState<DataView | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const backend = useBackend()
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true)
        backend.getData(id!!)
            .then(setSelected)
            .then(() => setIsLoading(false))
    }, [id])

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader>Details</DrawerHeader>
                { isLoading ? <SpinnerCentered/> : !selected ? <MissingResultDisplay/> :
                    <DrawerBody>
                        <FormControl >
                            <FormLabel>Id</FormLabel>
                            <Input isDisabled={true} value={selected.id} placeholder='Id'/>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input isDisabled={true} value={selected.company} placeholder='Name'/>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Time</FormLabel>
                            <Input isDisabled={true} value={selected.time.toLocaleString()} placeholder='Time'/>
                        </FormControl>
                        <DrawerCloseButton/>
                    </DrawerBody>
                }
            </DrawerContent>
        </Drawer>
    )
}

function MissingResultDisplay() {
    return <Box className={"centered-parent"}>
        <Text as={"em"} className={"centered-child"}>The requested data was not found</Text>
    </Box>
}

