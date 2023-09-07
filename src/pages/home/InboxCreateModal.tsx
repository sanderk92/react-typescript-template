import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import * as React from "react";
import {useState} from "react";
import {DataView} from "../../http/model/data";
import {TableRow} from "../../components/SimpleTable";
import SimpleTableSearchDropdown from "../../components/SimpleTableSearchDropdown";
import {UserDetails} from "../../http/model/user";
import SimpleTableDropdown from "../../components/SimpleTableDropdown";
import { submitData, findUsers } from "../../http/backendService";

export interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (data: DataView) => void
}

export default function InboxCreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()

    const [userSelection, setUserSelection] = useState<UserDetails | undefined>()
    const [companySelection, setCompanySelection] = useState<TableRow | undefined>()
    const [assignment, setAssignment] = useState<string | undefined>(undefined)

    const [isCreating, setCreating] = useState(false)

    const isComplete = () : boolean => {
        return userSelection !== undefined && companySelection !== undefined && assignment !== undefined
    }

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
                        <FormLabel>Type</FormLabel>
                        <SimpleTableDropdown
                            selection={companySelection != null ? companySelection : undefined}
                            rows={[
                                {id: "Destruction", cells: [{value: "Destruction"}]},
                                {id: "Delivery", cells: [{value: "Delivery"}]},
                                {id: "Move", cells: [{value: "Move"}]},
                            ]}
                            onSelect={row => setCompanySelection(row)}
                        />
                    </FormControl>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Assignment</FormLabel>
                        <Textarea placeholder={"Please write an assignment"} onChange={event => setAssignment(event.target.value)}/>
                    </FormControl>
                    <ModalFooter>
                        <Button ml={4} isDisabled={!isComplete()} isLoading={isCreating} onClick={create}>Create</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

    function create() {
        setCreating(true)
        submitData({input: companySelection?.id ?? "joe"})
            .then(data => {onCreated(data); onClose()})
            .then(_ => {toast({title: "Successfully created!", status: 'success', isClosable: true})})
            .catch(_ => toast({title: "Error creating.", status: 'error', isClosable: true}))
            .finally(() => setCreating(false))
    }

    function fetchUsers(name: string): Promise<UserTableRow[]> {
        return findUsers(name)
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