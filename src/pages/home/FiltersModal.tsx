import {
    Checkbox,
    FormControl,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Box, Flex, Divider,
} from "@chakra-ui/react";
import * as React from "react";
import {TableCell} from "../../components/GenericTable";
import {RiAddCircleFill, RiCloseCircleFill} from "react-icons/all";
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
                        <Checkbox m={2} size={"lg"}>
                            <Flex>
                                <RiAddCircleFill color={"green"}/>
                                <Text m={1}>Open</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>
                            <Flex>
                                <RiPlayCircleFill color={"dodgerblue"}/>
                                <Text m={1}>Running</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>
                            <Flex>
                                <RiCloseCircleFill color={"red"}/>
                                <Text m={1}>Cancelled</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"}>
                            <Flex>
                                <RiCloseCircleFill color={"grey"}></RiCloseCircleFill>
                                <Text m={1}>Cancelled</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
