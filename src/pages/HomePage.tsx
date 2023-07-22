import GenericTable, {TableCell, TableRow} from "../components/GenericTable";
import {Text, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Center} from "@chakra-ui/react";
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
    const navigate = useNavigate()
    const backend = useBackend()

    const [rows, setRows] = useState<HomePageRow[] | undefined>(undefined)
    const [loading, isLoading] = useState<boolean>(true)

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

    useEffect(() => {
        if (rows != null) {
            isLoading(false)
        }
    }, [rows])

    useEffect(() => {
        backend.getHomePageRows()
            .then(rows => setRows(rows))
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
                rows={rows!!}
            >
                <Routes>
                    <Route path=":id" element={<DetailsDrawer isOpen={true} onClose={closeSelect} input={rows!!}/>}/>
                    <Route path="create" element={<CreateModal isOpen={true} onClose={closeCreate}/>}/>
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
            {/*TODO optionally fetch from backend*/}
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
}

function CreateModal({isOpen, onClose}: CreateDrawerProps) {
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Create</ModalHeader>
            <ModalCloseButton/>
        </ModalContent>
    </Modal>
}