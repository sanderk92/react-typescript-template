import GenericTable, {TableCell, TableRow} from "../components/GenericTable";
import {
    Text,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Center,
    Button,
    useToast, Input, FormControl, FormLabel, ModalBody, ModalFooter
} from "@chakra-ui/react";
import * as React from "react";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {useBackend} from "../http/BackendService";
import {useEffect, useState} from "react";
import "./pages.css"

const basePath = "/"

export interface HomePageRow extends TableRow {
    id: string
    cells: TableCell[]
    extra: string
}

export default function HomePage() {
    const backend = useBackend()
    const navigate = useNavigate()

    const [loading, isLoading] = useState<boolean>(true)
    const [rows, setRows] = useState<HomePageRow[] | undefined>(undefined)

    const select = (row: HomePageRow) => {
        navigate(row.id)
    }

    const closeSelect = () => {
        navigate(basePath)
    }

    const create = () => {
        navigate(`create`)
    }

    const closeCreate = () => {
        navigate(basePath)
    }

    const onCreate = (row: HomePageRow) => {
        navigate(basePath)
        rows?.push(row)
    }

    useEffect(() => {
        if (rows != null) {
            isLoading(false)
        }
    }, [rows])

    useEffect(() => {
        backend.getHomePageRows().then(rows => setRows(rows))
    }, [backend])

    if (loading) {
        return <Center><Spinner className="spinner"></Spinner></Center>
    }

    else if (rows?.length === 0) {
        return <Text>No results</Text>
    }

    else return (
            <GenericTable
                headers={[{value: "first"}, {value: "second"}, {value: "third"}]}
                onSelect={select}
                onCreate={create}
                rows={rows!!}>
                <Routes>
                    <Route path=":id" element={<DetailsDrawer isOpen={true} onClose={closeSelect} input={rows!!}/>}/>
                    <Route path="create" element={<CreateModal isOpen={true} onClose={closeCreate} onCreated={onCreate}/>}/>
                </Routes>
            </GenericTable>
    )
}

interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
    input: HomePageRow[]
}

function DetailsDrawer({isOpen, onClose, input}: DetailsDrawerProps) {
    const { id } = useParams();

    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Details</DrawerHeader>
            <Text>{
                input.find(it => it.id === id)?.extra
            }</Text>
            <DrawerCloseButton/>
        </DrawerContent>
    </Drawer>;
}

interface CreateDrawerProps {
    isOpen: boolean
    onClose: () => void
    onCreated: (page: HomePageRow) => void
}

function CreateModal({isOpen, onClose, onCreated}: CreateDrawerProps) {
    const toast = useToast()
    const backend = useBackend()
    const [loading, isLoading] = useState(false)

    if (loading) {
        return <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <Center><Spinner className="spinner"></Spinner></Center>
        </Modal>
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Create new</ModalHeader>
            <ModalCloseButton/>
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input placeholder='First name' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Last name</FormLabel>
                    <Input placeholder='Last name' />
                </FormControl>
                <ModalFooter>
                    <Button onClick={() => {
                        isLoading(true)
                        backend.createHomePageRow()
                            .then(row => {onCreated(row); toast({title: `Created '${row.id}'.`, status: 'success', isClosable: true})})
                            .catch(_ => toast({title: "Error creating.", status: 'error', isClosable: true}))
                            .finally(() => isLoading(false))
                    }}>Create</Button>
                </ModalFooter>
            </ModalBody>
        </ModalContent>
    </Modal>
}
