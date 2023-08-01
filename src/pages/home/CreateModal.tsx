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
    useToast,
} from "@chakra-ui/react";
import {Data, useBackend} from "../../http/BackendService";
import * as React from "react";
import {useState} from "react";

export interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (data: Data) => void
}

export default function CreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()
    const backend = useBackend()
    const [isCreating, setIsCreating] = useState(false)

    return (
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
                        <Button ml={4} isLoading={isCreating} onClick={create}>Create</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

    function create() {
        setIsCreating(true)
        backend.createData()
            .then(row => onCreated(row))
            .then(_ => {toast({title: "Successfully created!", status: 'success', isClosable: true})})
            .catch(_ => toast({title: "Error creating.", status: 'error', isClosable: true}))
            .finally(() => setIsCreating(false))
    }
}
