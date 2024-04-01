import {Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useToast,} from "@chakra-ui/react";
import * as React from "react";
import {useState} from "react";
import {DataView, submitData} from "./InboxStubs";

export interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (data: DataView) => void
}

export default function InboxCreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()

    const [type, setType] = useState<string>("Destruction")
    const [assignment, setAssignment] = useState<string | undefined>(undefined)
    const [isLoading, setLoading] = useState(false)

    const isComplete = () : boolean => {
        return type !== undefined && assignment !== undefined
    }

    const submitCreate = () => {
        toast.promise(create(),  {
            success: { title: 'Created', isClosable: true, duration: 1000 },
            error: { title: 'Failed to create', isClosable: true, duration: 1000 },
            loading: { title: 'Creating ...', isClosable: true, duration: 1000 },
        })
    }

    const create = (): Promise<void> => {
        setLoading(true)
        return submitData({company: 'Test B.V.'})
            .then(data => {onCreated(data); onClose()})
            .finally(() => setLoading(false))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Create</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Type</FormLabel>
                        <Select>
                            <option onClick={() => setType("Destruction")}>Destruction</option>
                            <option onClick={() => setType("Deliver")}>Deliver</option>
                            <option onClick={() => setType("Move")}>Move</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Assignment</FormLabel>
                        <Textarea placeholder={"Please write an assignment"} onChange={event => setAssignment(event.target.value)}/>
                    </FormControl>
                    <ModalFooter>
                        <Button ml={4} isDisabled={!isComplete() || isLoading} onClick={submitCreate}>Create</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
