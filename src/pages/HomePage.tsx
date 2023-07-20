import StringKeyTable, {TableCell, TableRow} from "../components/StringKeyTable";
import {Text, Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import * as React from "react";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";

interface HomePageRow extends TableRow {
    id: string
    cells: TableCell[]
    extra: string
}

const input = [
    {id: "a", cells: [{value: "testa"}, {value: "test1"}, {value: "test13"}], extra: "test32"},
    {id: "b", cells: [{value: "testb"}, {value: "test2"}, {value: "test14"}], extra: "test33"},
    {id: "c", cells: [{value: "testc"}, {value: "test3"}, {value: "test15"}], extra: "test34"},
    {id: "d", cells: [{value: "testd"}, {value: "test4"}, {value: "test16"}], extra: "test35"},
    {id: "e", cells: [{value: "teste"}, {value: "test5"}, {value: "test31"}], extra: "test36"},
    {id: "f", cells: [{value: "testf"}, {value: "test6"}, {value: "test17"}], extra: "test37"},
    {id: "g", cells: [{value: "testg"}, {value: "test7"}, {value: "test18"}], extra: "test38"},
    {id: "h", cells: [{value: "testh"}, {value: "test8"}, {value: "test19"}], extra: "test39"},
    {id: "i", cells: [{value: "testi"}, {value: "test9"}, {value: "test20"}], extra: "test40"},
    {id: "j", cells: [{value: "testj"}, {value: "test10"}, {value: "test21"}], extra: "test41"},
    {id: "k", cells: [{value: "testk"}, {value: "test11"}, {value: "test22"}], extra: "test42"},
    {id: "l", cells: [{value: "testk"}, {value: "test12"}, {value: "test23"}], extra: "test43"},
]


export default function HomePage() {
    const navigate = useNavigate()
    const absoluteBase = "/home"

    const select = (row: HomePageRow) => {
        navigate(row.id)
    }

    const closeSelect = () => {
        navigate(absoluteBase)
    }

    const create = () => {
        navigate(`create`)
    }

    const closeCreate = () => {
        navigate(absoluteBase)
    }

    return (
            <StringKeyTable
                headers={[{value: "first"}, {value: "second"}, {value: "third"}, {value: "fourth", numerical: true}]}
                onSelect={select}
                onCreate={create}
                rows={input}
            >
                <Routes>
                    <Route path=":id" element={<DetailsDrawer isOpen={true} onClose={closeSelect}/>}/>
                    <Route path="create" element={<CreateModal isOpen={true} onClose={closeCreate}/>}/>
                </Routes>
            </StringKeyTable>
    )
}

interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
    // selection: HomePageRow
}

function DetailsDrawer({isOpen, onClose}: DetailsDrawerProps) {
    const { id } = useParams();

    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Details</DrawerHeader>
            {
                <Text>{input.find(it => it.id === id)!!.extra}</Text>
            }
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