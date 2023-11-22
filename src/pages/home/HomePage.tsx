import * as React from "react";
import {Box, Tab, TabList, Tabs} from "@chakra-ui/react";
import Inbox from "./Inbox";
import Outbox from "./Outbox";
import {Route, Routes, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ScrollReset from "../../ScrollReset";

export default function HomePage() {
    const navigate = useNavigate()

    useEffect(() => {
        if (window.location.pathname === "/") {
            navigate("/inbox")
        }
    })

    return (
        <Box>
            <Tabs isFitted variant='line' size={"md"} index={calculateTabIndex()}>
                <TabList>
                    <Tab onClick={() => navigate("/inbox")}>Inbox</Tab>
                    <Tab onClick={() => navigate("/outbox")}>Outbox</Tab>
                </TabList>
                <Box m='0.5em'>
                    <Routes>
                        <Route path="/inbox/*" element={<Inbox/>}></Route>
                        <Route path="/outbox/*" element={<Outbox/>}></Route>
                    </Routes>
                </Box>
            </Tabs>
            <ScrollReset/>
        </Box>
    )

    function calculateTabIndex(): number {
        if (window.location.pathname.startsWith("/inbox")) {
            return 0
        } else if (window.location.pathname.startsWith("/outbox")) {
            return 1
        } else {
            return -1
        }
    }
}