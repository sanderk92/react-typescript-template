import StringKeyTable, {TableRow} from "../components/StringKeyTable";
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
    firstColumn: React.ReactNode
    secondColumn: React.ReactNode
    thirdColumn: React.ReactNode
    extra: string
}

export default function HomePage() {
    return (
        <StringKeyTable
            headers={{first: "first", second: "second", third: "third"}}
            onCreate={(isOpen, onClose) => <CreateModal isOpen={isOpen} onClose={onClose}/>}
            onSelect={(isOpen, onClose, selection) => <DetailsDrawer isOpen={isOpen} onClose={onClose} selection={selection}/>}
            rows={
                [
                    {id: "a", firstColumn: "testa", secondColumn: "test1", thirdColumn: "test31", extra: "lol"},
                    {id: "b", firstColumn: "testb", secondColumn: "test2", thirdColumn: "test32", extra: "lol"},
                    {id: "c", firstColumn: "testc", secondColumn: "test3", thirdColumn: "test33", extra: "lol"},
                    {id: "d", firstColumn: "testd", secondColumn: "test8", thirdColumn: "test34", extra: "lol"},
                    {id: "e", firstColumn: "teste", secondColumn: "test9", thirdColumn: "test35", extra: "lol"},
                    {id: "f", firstColumn: "testf", secondColumn: "test0", thirdColumn: "test36", extra: "lol"},
                    {id: "g", firstColumn: "testg", secondColumn: "test8", thirdColumn: "test37", extra: "lol"},
                    {id: "h", firstColumn: "testh", secondColumn: "test38", thirdColumn: "test38", extra: "lol"},
                    {id: "i", firstColumn: "testi", secondColumn: "test8", thirdColumn: "test39", extra: "lol"},
                    {id: "j", firstColumn: "testj", secondColumn: "test10", thirdColumn: "test41", extra: "lol"},
                    {id: "k", firstColumn: "testk", secondColumn: "test11", thirdColumn: "test42", extra: "lol"},
                    {id: "l", firstColumn: "testl", secondColumn: "test12", thirdColumn: "test43", extra: "lol"},
                    {id: "m", firstColumn: "testm", secondColumn: "test13", thirdColumn: "test44", extra: "lol"},
                    {id: "n", firstColumn: "testn", secondColumn: "test14", thirdColumn: "test45", extra: "lol"},
                    {id: "o", firstColumn: "testo", secondColumn: "test15", thirdColumn: "test46", extra: "lol"},
                    {id: "p", firstColumn: "testp", secondColumn: "test16", thirdColumn: "test47", extra: "lol"},
                    {id: "q", firstColumn: "testq", secondColumn: "test17", thirdColumn: "test48", extra: "lol"},
                    {id: "r", firstColumn: "testr", secondColumn: "test18", thirdColumn: "test49", extra: "lol"},
                    {id: "s", firstColumn: "tests", secondColumn: "test19", thirdColumn: "test50", extra: "lol"},
                    {id: "t", firstColumn: "testt", secondColumn: "test20", thirdColumn: "test51", extra: "lol"},
                    {id: "u", firstColumn: "testu", secondColumn: "test21", thirdColumn: "test52", extra: "lol"},
                    {id: "v", firstColumn: "testv", secondColumn: "test22", thirdColumn: "test53", extra: "lol"},
                    {id: "w", firstColumn: "testw", secondColumn: "test23", thirdColumn: "test54", extra: "lol"},
                    {id: "x", firstColumn: "testx", secondColumn: "test24", thirdColumn: "test55", extra: "lol"},
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