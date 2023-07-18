import StringKeyTable, {TableEntry} from "../components/StringKeyTable";
import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader, IconButton,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import * as React from "react";
import {AddIcon, PlusSquareIcon} from "@chakra-ui/icons";

export default function HomePage() {
    return (
        <StringKeyTable
            headers={{first: "first", second: "second", third: "third"}}
            onCreate={(isOpen, onClose) => createDrawer(isOpen, onClose)}
            onSelect={(isOpen, onClose, entry) => detailsDrawer(isOpen, onClose, entry)}
            entries={
                [
                    {firstColumn: <AddIcon/>, secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: <PlusSquareIcon/>, secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: 3, secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: 4, secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testbb", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testf", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testg", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testh", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testi", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testj", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testk", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testl", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: 5, secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: 6, secondColumn: "test2", thirdColumn: "test3"},
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

function detailsDrawer(isOpen: boolean, onClose: () => void, entry: TableEntry) {
    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Details</DrawerHeader>
            <DrawerCloseButton/>
        </DrawerContent>
    </Drawer>;
}

function createDrawer(isOpen: boolean, onClose: () => void) {
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Create</ModalHeader>
            <ModalCloseButton/>
        </ModalContent>
    </Modal>
}