import StringKeyTable, {TableEntry} from "../components/StringKeyTable";
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
import {AddIcon, PlusSquareIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    return (
        <StringKeyTable
            headers={{first: "first", second: "second", third: "third"}}
            onCreate={(isOpen, onClose) => <CreateModal isOpen={isOpen} onClose={onClose}/>}
            onSelect={(isOpen, onClose, entry) => <DetailsDrawer isOpen={isOpen} onClose={onClose} entry={entry}/>}
            entries={
                [
                    {id: "a", firstColumn: "testa", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "b", firstColumn: "testb", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "c", firstColumn: "testc", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "d", firstColumn: "testd", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "e", firstColumn: "teste", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "f", firstColumn: "testf", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "g", firstColumn: "testg", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "h", firstColumn: "testh", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "i", firstColumn: "testi", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "j", firstColumn: "testj", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "k", firstColumn: "testk", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "l", firstColumn: "testl", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "m", firstColumn: "testf", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "n", firstColumn: "testg", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "o", firstColumn: "testo", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "o", firstColumn: "testp", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "p", firstColumn: "testq", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "q", firstColumn: "testr", secondColumn: "test4", thirdColumn: "test3"},
                    {id: "r", firstColumn: "tests", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "s", firstColumn: "testt", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "t", firstColumn: "testu", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "u", firstColumn: "testv", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "v", firstColumn: "testw", secondColumn: "test2", thirdColumn: "test3"},
                    {id: "w", firstColumn: "testx", secondColumn: "test2", thirdColumn: "test3"},
                ]
            }
        ></StringKeyTable>
    )
}

interface DetailsDrawerProps {
    isOpen: boolean
    onClose: () => void
    entry: TableEntry
}

function DetailsDrawer({isOpen, onClose, entry}: DetailsDrawerProps) {
    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Details</DrawerHeader>
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