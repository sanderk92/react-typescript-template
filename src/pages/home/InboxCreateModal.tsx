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
    Select,
    useToast,
} from "@chakra-ui/react";
import {useBackend} from "../../http/BackendService";
import * as React from "react";
import {useState} from "react";
import {DataView} from "../../http/model/Data";
import {TableRow} from "../../components/tables/SimpleTable";
import SimpleTableSearchDropdown from "../../components/tables/SimpleTableSearchDropdown";

export interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (data: DataView) => void
}

// TODO move user retrieval to backend
export default function InboxCreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()
    const backend = useBackend()

    const [isCreating, setIsCreating] = useState(false)
    const [companyInput, setInput] = useState("")
    const [selection, setSelection] = useState<TableRow | undefined>()
    const [rows, setRows] = useState<TableRow[] | undefined>()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Create</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl isRequired={true}>
                        <FormLabel>Recipient</FormLabel>
                        <SimpleTableSearchDropdown
                            rows={rows ?? []}
                            onSearch={(query: string) => setRows(createRows)}
                            selections={selection != null ? [selection] : []}
                            onSelect={setSelection}
                            onUnselect={() => setSelection(undefined)}
                            onClose={() => setRows(undefined)}
                            tagValue={(row: TableRow) => `${row.cells[0].value} ${row.cells[1].value}`}
                            isLoading={false}
                        />
                    </FormControl>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Test</FormLabel>
                        <Select>
                            <option value='Delivery' onClick={() => setInput("Delivery")}>Delivery</option>
                            <option value='Pickup' onClick={() => setInput("Pickup")}>Pickup</option>
                            <option value='Move' onClick={() => setInput("Move")}>Move</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Test</FormLabel>
                        <Input/>
                    </FormControl>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Test</FormLabel>
                        <Input/>
                    </FormControl>
                    <ModalFooter>
                        <Button ml={4} isDisabled={selection === undefined} isLoading={isCreating} onClick={create}>Create</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

    function create() {
        setIsCreating(true)
        backend.createData({input: companyInput})
            .then(row => {onCreated(row); onClose()})
            .then(_ => {toast({title: "Successfully created!", status: 'success', isClosable: true})})
            .catch(_ => toast({title: "Error creating.", status: 'error', isClosable: true}))
            .finally(() => setIsCreating(false))
    }
}

function createRows(): TableRow[] {
    return [
        { id: "a", cells: [{ value: "sander" }, {value: "krabbenborg"}]},
        { id: "b", cells: [{ value: "vincent" }, {value: "krabbenborg"}]},
        { id: "c", cells: [{ value: "laura" }, {value: "krabbenborg"}]},
        { id: "d", cells: [{ value: "ellen" }, {value: "krabbenborg"}]},
        { id: "e", cells: [{ value: "jacqueline" }, {value: "krabbenborg"}]},
        { id: "f", cells: [{ value: "john" }, {value: "krabbenborg"}]},
        { id: "g", cells: [{ value: "martin" }, {value: "krabbenborg"}]},
    ]
}