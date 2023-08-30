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
import {UserDetails} from "../../http/model/CurrentUserDetails";

export interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (data: DataView) => void
}

export default function InboxCreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()
    const backend = useBackend()

    const [companyInput, setInput] = useState("")
    const [userSelection, setUserSelection] = useState<UserDetails | undefined>()

    const [isCreating, setIsCreating] = useState(false)

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
                            onSearch={fetchUsers}
                            selections={userSelection != null ? [asTableRow(userSelection)] : []}
                            onSelect={row => setUserSelection(row.user)}
                            onUnselect={() => setUserSelection(undefined)}
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
                        <Button ml={4} isDisabled={userSelection === undefined} isLoading={isCreating} onClick={create}>Create</Button>
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

    function fetchUsers(name: string): Promise<UserTableRow[]> {
        return backend.queryUsers(name)
            .then(users => users.map(user => asTableRow(user)))
            .catch(_ => { toast({title: "Error fetching users.", status: 'error', isClosable: true}); return []})
    }

    function asTableRow(user: UserDetails): UserTableRow {
        return { id: user.id, user: user, cells: [{value: user.firstName}, {value:user.lastName}]}
    }
}

interface UserTableRow extends TableRow {
    user: UserDetails
}