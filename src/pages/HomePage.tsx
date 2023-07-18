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
                    {firstColumn: "testa", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testb", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testc", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testd", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "teste", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testf", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testg", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testh", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testi", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testj", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testk", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testl", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testf", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testg", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testo", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testp", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testq", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testr", secondColumn: "test4", thirdColumn: "test3"},
                    {firstColumn: "tests", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testt", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testu", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testv", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testw", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testx", secondColumn: "test2", thirdColumn: "test3"},
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