import {
    Checkbox,
    Flex,
    FormControl,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import * as React from "react";
import {RiAddCircleFill, RiCheckboxFill, RiCheckboxIndeterminateFill} from "react-icons/all";
import {RiPlayCircleFill} from "react-icons/ri";

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
                        <Checkbox m={2} size={"lg"} isChecked={true}>
                            <Flex>
                                <RiAddCircleFill color={"orange"}/>
                                <Text m={1}>Open</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"} isChecked={true}>
                            <Flex>
                                <RiPlayCircleFill color={"dodgerblue"}/>
                                <Text m={1}>Running</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>
                            <Flex>
                                <RiCheckboxIndeterminateFill color={"red"}/>
                                <Text m={1}>Cancelled</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>
                            <Flex>
                                <RiCheckboxFill color={"green"}></RiCheckboxFill>
                                <Text m={1}>Completed</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
