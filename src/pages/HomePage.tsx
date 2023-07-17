import StringKeyTable from "../components/StringKeyTable";
import {Drawer, DrawerCloseButton, DrawerContent, DrawerHeader} from "@chakra-ui/react";
import * as React from "react";

export default function HomePage() {
    return (
        <StringKeyTable
            headers={{first: "first", second: "second", third: "third"}}
            createElement={(isOpen, onClose) => createDrawer(isOpen, onClose)}
            detailsElement={(entry, isOpen, onClose) => detailsDrawer(isOpen, onClose)}
            entries={
                [
                    {firstColumn: "testa", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testb", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testb", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testba", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testbb", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testf", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testg", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testh", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testi", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testj", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testk", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testl", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testm", secondColumn: "test2", thirdColumn: "test3"},
                    {firstColumn: "testn", secondColumn: "test2", thirdColumn: "test3"},
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

function detailsDrawer(isOpen: boolean, onClose: () => void) {
    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Details</DrawerHeader>
            <DrawerCloseButton/>
        </DrawerContent>
    </Drawer>;
}

function createDrawer(isOpen: boolean, onClose: () => void) {
    return <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>Create</DrawerHeader>
            <DrawerCloseButton/>
        </DrawerContent>
    </Drawer>;
}