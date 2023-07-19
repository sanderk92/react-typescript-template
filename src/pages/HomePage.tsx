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

export default function HomePage() {
    return (
        <StringKeyTable
            headers={{first: "first", second: "second", third: "third"}}
            onCreate={(isOpen, onClose) => <CreateModal isOpen={isOpen} onClose={onClose}/>}
            onSelect={(isOpen, onClose, entry) => <DetailsDrawer isOpen={isOpen} onClose={onClose} entry={entry}/>}
            entries={
                [
                    {id: "a", firstColumn: "testa", secondColumn: "test1", thirdColumn: "test31"},
                    {id: "b", firstColumn: "testb", secondColumn: "test2", thirdColumn: "test32"},
                    {id: "c", firstColumn: "testc", secondColumn: "test3", thirdColumn: "test33"},
                    {id: "d", firstColumn: "testd", secondColumn: "test4", thirdColumn: "test34"},
                    {id: "e", firstColumn: "teste", secondColumn: "test5", thirdColumn: "test35"},
                    {id: "f", firstColumn: "testf", secondColumn: "test6", thirdColumn: "test36"},
                    {id: "g", firstColumn: "testg", secondColumn: "test7", thirdColumn: "test37"},
                    {id: "h", firstColumn: "testh", secondColumn: "test8", thirdColumn: "test38"},
                    {id: "i", firstColumn: "testi", secondColumn: "test9", thirdColumn: "test39"},
                    {id: "j", firstColumn: "testj", secondColumn: "test10", thirdColumn: "test41"},
                    {id: "k", firstColumn: "testk", secondColumn: "test11", thirdColumn: "test42"},
                    {id: "l", firstColumn: "testl", secondColumn: "test12", thirdColumn: "test43"},
                    {id: "m", firstColumn: "testm", secondColumn: "test13", thirdColumn: "test44"},
                    {id: "n", firstColumn: "testn", secondColumn: "test14", thirdColumn: "test45"},
                    {id: "o", firstColumn: "testo", secondColumn: "test15", thirdColumn: "test46"},
                    {id: "p", firstColumn: "testp", secondColumn: "test16", thirdColumn: "test47"},
                    {id: "q", firstColumn: "testq", secondColumn: "test17", thirdColumn: "test48"},
                    {id: "r", firstColumn: "testr", secondColumn: "test18", thirdColumn: "test49"},
                    {id: "s", firstColumn: "tests", secondColumn: "test19", thirdColumn: "test50"},
                    {id: "t", firstColumn: "testt", secondColumn: "test20", thirdColumn: "test51"},
                    {id: "u", firstColumn: "testu", secondColumn: "test21", thirdColumn: "test52"},
                    {id: "v", firstColumn: "testv", secondColumn: "test22", thirdColumn: "test53"},
                    {id: "w", firstColumn: "testw", secondColumn: "test23", thirdColumn: "test54"},
                    {id: "x", firstColumn: "testx", secondColumn: "test24", thirdColumn: "test55"},
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