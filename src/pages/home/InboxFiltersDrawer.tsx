import {
    Box,
    Button,
    Checkbox,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Flex,
    FormControl,
    Text,
} from "@chakra-ui/react";
import * as React from "react";
import {useState} from "react";
import {RiAddCircleFill} from "react-icons/all";
import {RiCheckboxCircleFill, RiCloseCircleFill, RiPlayCircleFill} from "react-icons/ri";
import {InboxFilter} from "./Inbox";
import {DataStatus} from "../../http/model/Data";
import DatePicker from "react-datepicker";

export interface FiltersDrawerProps {
    isOpen: boolean
    onClose: () => void
    filter: InboxFilter,
    setFilter: (filter: InboxFilter) => void
}

export default function InboxFiltersDrawer({isOpen, onClose, filter, setFilter}: FiltersDrawerProps) {
    const [from, setFrom] = useState(filter.from)
    const [until, setUntil] = useState(filter.until)

    const [open, setOpen] = useState(filter.status.includes(DataStatus.open))
    const [running, setRunning] = useState(filter.status.includes(DataStatus.running))
    const [cancelled, setCancelled] = useState(filter.status.includes(DataStatus.cancelled))
    const [finished, setFinished] = useState(filter.status.includes(DataStatus.finished))

    const initialFocus = React.useRef(null)

    return (
        <Drawer isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocus}>
            <DrawerContent>
                <DrawerHeader>Filters</DrawerHeader>
                <DrawerBody>
                    <FormControl pb={4}>
                        <Flex>
                            <Box>
                                <Text as={"b"}>From</Text>
                                <DatePicker
                                    maxDate={until}
                                    dateFormat={"dd-MM-yyyy"}
                                    customInput={<Button>{from.toLocaleDateString()}</Button>}
                                    selected={from}
                                    onChange={date=> setFrom(date ?? from)}>
                                </DatePicker>
                            </Box>
                            <Box>
                                <Text as={"b"}>Until</Text>
                                <DatePicker
                                    minDate={from}
                                    maxDate={new Date()}
                                    onChangeRaw={e => e.preventDefault()}
                                    dateFormat={"dd-MM-yyyy"}
                                    customInput={<Button>{until.toLocaleDateString()}</Button>}
                                    selected={until}
                                    onChange={date => setUntil(date ?? until)}>
                                </DatePicker>
                            </Box>
                        </Flex>
                    </FormControl>
                    <Text as={"b"}>Status</Text>
                    <FormControl pb={4}>
                        <Checkbox size={"lg"} isChecked={open} onChange={() => setOpen(!open)}>
                            <Flex>
                                <RiAddCircleFill color={"green"}/>
                                <Text m={1}>Open</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl pb={4}>
                        <Checkbox size={"lg"} isChecked={running} onChange={() => setRunning(!running)}>
                            <Flex>
                                <RiPlayCircleFill color={"dodgerblue"}/>
                                <Text m={1}>Running</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl pb={4}>
                        <Checkbox size={"lg"} isChecked={cancelled} onChange={() => setCancelled(!cancelled)}>
                            <Flex>
                                <RiCloseCircleFill color={"red"}/>
                                <Text m={1}>Cancelled</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl pb={4}>
                        <Checkbox size={"lg"} isChecked={finished} onChange={() => setFinished(!finished)}>
                            <Flex>
                                <RiCheckboxCircleFill color={"grey"}></RiCheckboxCircleFill>
                                <Text m={1}>Completed</Text>
                            </Flex>
                        </Checkbox>
                    </FormControl>
                    <FormControl>
                        <Button ref={initialFocus} onClick={() => {
                            setFilter({status : extractStatus(), from: from, until: until})
                            onClose()}
                        }
                        >Apply</Button>
                    </FormControl>
                </DrawerBody>
                <DrawerCloseButton/>
            </DrawerContent>
        </Drawer>
    )

    function extractStatus() : DataStatus[] {
        return [DataStatus.open, DataStatus.running, DataStatus.cancelled, DataStatus.finished]
            .filter(status => !open ? status !== DataStatus.open : true)
            .filter(status => !running ? status !== DataStatus.running : true)
            .filter(status => !cancelled ? status !== DataStatus.cancelled : true)
            .filter(status => !finished ? status !== DataStatus.finished : true)
    }
}
