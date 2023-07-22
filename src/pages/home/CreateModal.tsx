import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useToast
} from "@chakra-ui/react";
import {useBackend} from "../../http/BackendService";
import * as React from "react";
import {useState} from "react";
import {HomePageRow} from "./HomePage";

export interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (page: HomePageRow) => void
}

export default function CreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()
    const backend = useBackend()
    const [loading, isLoading] = useState(false)

    if (loading) {
        return <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <Center><Spinner className="spinner"></Spinner></Center>
        </Modal>
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Create new</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder='First name' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder='Last name' />
                </FormControl>
                <ModalFooter>
                    <Button onClick={() => {
                        isLoading(true)
                        backend.createHomePageRow()
                            .then(row => {onCreated(row); toast({title: `Created '${row.id}'.`, status: 'success', isClosable: true})})
                            .catch(_ => toast({title: "Error creating.", status: 'error', isClosable: true}))
                            .finally(() => isLoading(false))
                    }}>Create</Button>
                </ModalFooter>
            </ModalBody>
        </ModalContent>
    </Modal>
}
