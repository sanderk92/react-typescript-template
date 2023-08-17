import {Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast,} from "@chakra-ui/react";
import {useBackend} from "../../http/BackendService";
import * as React from "react";
import {useState} from "react";
import {DataView} from "../../http/model/DataView";

export interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (data: DataView) => void
}

export default function CreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()
    const backend = useBackend()

    const [isCreating, setIsCreating] = useState(false)
    const [companyInput, setCompanyInput] = useState("")

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Create</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl isRequired={true}>
                        <FormLabel>Company name</FormLabel>
                        <Input placeholder='Name' onChange={event => setCompanyInput(event.target.value)}/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Test</FormLabel>
                        <Input placeholder='Test' disabled={true}/>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Test</FormLabel>
                        <Input placeholder='Test'  disabled={true}/>
                    </FormControl>
                    <ModalFooter>
                        <Button ml={4} isDisabled={companyInput.length === 0} isLoading={isCreating} onClick={create}>Create</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

    function create() {
        setIsCreating(true)
        backend.createData({company: companyInput})
            .then(row => {onCreated(row); onClose()})
            .then(_ => {toast({title: "Successfully created!", status: 'success', isClosable: true})})
            .catch(_ => toast({title: "Error creating.", status: 'error', isClosable: true}))
            .finally(() => setIsCreating(false))
    }
}
