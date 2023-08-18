import {Button, Checkbox, Flex, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text,} from "@chakra-ui/react";
import * as React from "react";
import {useState} from "react";
import {RiAddCircleFill} from "react-icons/all";
import {RiCheckboxCircleFill, RiCloseCircleFill, RiPlayCircleFill} from "react-icons/ri";
import {InboxFilter} from "./Inbox";
import {DataStatus} from "../../http/model/Data";

export interface FiltersDrawerProps {
    isOpen: boolean
    onClose: () => void
    filter: InboxFilter,
    setFilter: (filter: InboxFilter) => void
}

export default function InboxFiltersModal({isOpen, onClose, filter, setFilter}: FiltersDrawerProps) {
    const [open, setOpen] = useState(filter.status.includes(DataStatus.open))
    const [running, setRunning] = useState(filter.status.includes(DataStatus.running))
    const [cancelled, setCancelled] = useState(filter.status.includes(DataStatus.cancelled))
    const [finished, setFinished] = useState(filter.status.includes(DataStatus.finished))

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Filters</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>

                    <Text as={"b"}>Status</Text>
                    <FormControl  >
                        <Checkbox m={2} size={"lg"} isChecked={open} onChange={() => setOpen(!open)}>
                            <Flex>
                                <RiAddCircleFill color={"green"}/>
                                <Text m={1}>Open</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"} isChecked={running} onChange={() => setRunning(!running)}>
                            <Flex>
                                <RiPlayCircleFill color={"dodgerblue"}/>
                                <Text m={1}>Running</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"} isChecked={cancelled} onChange={() => setCancelled(!cancelled)}>
                            <Flex>
                                <RiCloseCircleFill color={"red"}/>
                                <Text m={1}>Cancelled</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Checkbox m={2} size={"lg"} isChecked={finished} onChange={() => setFinished(!finished)}>
                            <Flex>
                                <RiCheckboxCircleFill color={"grey"}></RiCheckboxCircleFill>
                                <Text m={1}>Completed</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Button onClick={() => {
                            setFilter({status : extractStatus()})
                            onClose()}}
                        >Apply</Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

    function extractStatus() : DataStatus[] {
        return [DataStatus.open, DataStatus.running, DataStatus.cancelled, DataStatus.finished]
            .filter(status => !open ? status !== DataStatus.open : true)
            .filter(status => !running ? status !== DataStatus.running : true)
            .filter(status => !cancelled ? status !== DataStatus.cancelled : true)
            .filter(status => !finished ? status !== DataStatus.finished : true)
    }
}
