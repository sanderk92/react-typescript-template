import {useParams} from "react-router-dom";
import {
    Box,
    Drawer,
    DrawerBody, DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Text,
} from "@chakra-ui/react";
import * as React from "react";
import {useEffect, useState} from "react";
import {DataView, fetchData} from "./InboxStubs";
import "../../styles.css"
import Collage from "../../components/Collage";

export interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function InboxDetailsDrawer({isOpen, onClose}: DetailsDrawerProps) {
    const [selected, setSelected] = useState<DataView | undefined>()
    const [isLoading, setLoading] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        setLoading(true)
        fetchData(id!!)
            .then(setSelected)
            .then(() => setLoading(false))
    }, [id])

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader>Details</DrawerHeader>
                { isLoading ? <LoadingDisplay/> : !selected ? <MissingResultDisplay/> :
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
                        <FormControl mt={4}>
                            <FormLabel>Images</FormLabel>
                            <Collage
                                imagesPerRow={2}
                                photos={[
                                    "https://images.unsplash.com/photo-1602271886918-bafecc837c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80 435w",
                                    "https://images.unsplash.com/photo-1602271886918-bafecc837c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80 435w",
                                    "https://images.unsplash.com/photo-1602271886918-bafecc837c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80 435w",
                                    "https://images.unsplash.com/photo-1602271886918-bafecc837c7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80 435w",
                                ]}
                            />
                        </FormControl>
                    </DrawerBody>
                }
                <DrawerCloseButton/>
            </DrawerContent>
        </Drawer>
    )
}

function MissingResultDisplay() {
    return <Box className={"centered-parent"}>
        <Text as={"em"} className={"centered-child"}>The requested data was not found</Text>
    </Box>
}

function LoadingDisplay() {
    return <Box className={"centered-parent"}>
        <Spinner className="centered-child"></Spinner>
    </Box>
}