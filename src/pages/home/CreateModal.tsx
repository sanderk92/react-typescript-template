import {
    Button,
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
    const [isCreating, setIsCreating] = useState(false)

    if (isCreating) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <Spinner className="spinner"></Spinner>
            </Modal>
        )
    }

    else return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Create new</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>First</FormLabel>
                        <Input placeholder='First'/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Second</FormLabel>
                        <Input placeholder='Second'/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Third</FormLabel>
                        <Input placeholder='Third'/>
                    </FormControl>
                    <ModalFooter>
                        <Button onClick={create}>Create</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

    function create() {
        setIsCreating(true)
        backend.createHomePageRow()
            .then(row => onCreated(row))
            .then(_ => {toast({title: "Successfully created!", status: 'success', isClosable: true})})
            .catch(_ => toast({title: "Error creating.", status: 'error', isClosable: true}))
            .finally(() => setIsCreating(false))
    }
}
