import StringKeyTable, {TableCell, TableRow} from "../components/StringKeyTable";
import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import * as React from "react";

interface HomePageRow extends TableRow {
    id: string
    cells: TableCell[]
    extra: string
}

export default function HomePage() {
    return (
        <StringKeyTable
            headers={[{value: "first"}, {value: "second"}, {value: "third"}, {value: "fourth", numerical: true}]}
            onCreate={(isOpen, onClose) => <CreateModal isOpen={isOpen} onClose={onClose}/>}
            onSelect={(isOpen, onClose, selection) => <DetailsDrawer isOpen={isOpen} onClose={onClose} selection={selection}/>}
            rows={
                [
                    {id: "a", cells: [{value: "testa"}, {value: "test1"}, {value: "test13"}, {value: "yea", numerical: true}], extra: "test"},
                    {id: "b", cells: [{value: "testb"}, {value: "test2"}, {value: "test14"}], extra: "test"},
                    {id: "c", cells: [{value: "testc"}, {value: "test3"}, {value: "test15"}], extra: "test"},
                    {id: "d", cells: [{value: "testd"}, {value: "test4"}, {value: "test16"}], extra: "test"},
                    {id: "e", cells: [{value: "teste"}, {value: "test5"}, {value: "test31"}], extra: "test"},
                    {id: "f", cells: [{value: "testf"}, {value: "test6"}, {value: "test17"}], extra: "test"},
                    {id: "g", cells: [{value: "testg"}, {value: "test7"}, {value: "test18"}], extra: "test"},
                    {id: "h", cells: [{value: "testh"}, {value: "test8"}, {value: "test19"}], extra: "test"},
                    {id: "i", cells: [{value: "testi"}, {value: "test9"}, {value: "test20"}], extra: "test"},
                    {id: "j", cells: [{value: "testj"}, {value: "test10"}, {value: "test21"}], extra: "test"},
                    {id: "k", cells: [{value: "testk"}, {value: "test11"}, {value: "test22"}], extra: "test"},
                    {id: "l", cells: [{value: "testk"}, {value: "test12"}, {value: "test23"}], extra: "test"},
                ]
            }
        ></StringKeyTable>
    )
}

interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
    selection: HomePageRow
}

function DetailsDrawer({isOpen, onClose, selection}: DetailsDrawerProps) {
    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Details</DrawerHeader>
                {selection.extra}
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