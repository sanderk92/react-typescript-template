import {useParams} from "react-router-dom";
import {Drawer, DrawerBody, DrawerCloseButton, DrawerContent, FormControl, FormLabel, Input,} from "@chakra-ui/react";
import * as React from "react";
import {DataView} from "../../http/model/Data";
import MissingResultDisplay from "../../components/MissingResultDisplay";
import useBackend from "../../http/BackendService";
import {useEffect, useState} from "react";
import SpinnerCentered from "../../components/SpinnerCentered";

export interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function InboxDetailsDrawer({isOpen, onClose}: DetailsDrawerProps) {
    const [selected, setSelected] = useState<DataView | undefined>()
    const [isLoading, setLoading] = useState<boolean>(true)

    const backend = useBackend()
    const { id } = useParams();

    useEffect(() => {
        setLoading(true)
        backend.getData(id!!)
            .then(setSelected)
            .then(() => setLoading(false))
    }, [id])

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerContent>
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
