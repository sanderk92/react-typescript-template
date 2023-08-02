import {Checkbox, FormControl, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,} from "@chakra-ui/react";
import * as React from "react";

export interface FiltersDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function FiltersModal({isOpen, onClose}: FiltersDrawerProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Filters</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <Text as={"b"}>Status</Text>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>Open</Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>Running</Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>Cancelled</Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>Finished</Checkbox>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
