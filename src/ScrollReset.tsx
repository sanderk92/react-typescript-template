import * as React from "react";
import {useEffect, useState} from "react";
import {canScrollDown, canScrollUp, resetToBottom, resetToTop} from "./utils/Scroll";
import {Fade, IconButton} from "@chakra-ui/react";
import {ArrowDownIcon, ArrowUpIcon} from "@chakra-ui/icons";

interface ScrollResetProps {
    clear: boolean
}

export default function ScrollReset({clear}: ScrollResetProps) {
    const [showScrollUp, setShowScrollUp] = useState(false)
    const [showScrollDown, setShowScrollDown] = useState(false)

    useEffect(() => {
        if (clear) {
            setShowScrollUp(false)
            setShowScrollDown(false)
        }
        document.addEventListener("scroll", () => {
            setShowScrollUp(canScrollUp(300))
            setShowScrollDown(canScrollDown(0))
        })
    }, [clear])
    return (
        <>
            <Fade in={showScrollUp}>
                <IconButton
                    icon={<ArrowUpIcon/>}
                    borderRadius={"100"}
                    position={"fixed"}
                    aria-label={`To Page Top`}
                    right={"40%"}
                    transform={"translate(-50%, -50%)"}
                    top={7}
                    onClick={resetToTop}
                    animation={"fadein 1s"}
                ></IconButton>
            </Fade>
            <Fade in={showScrollDown}>
                <IconButton
                    icon={<ArrowDownIcon/>}
                    borderRadius={"100"}
                    position={"fixed"}
                    aria-label={`To Page Bottom`}
                    right={"40%"}
                    transform={"translate(-50%, -50%)"}
                    bottom={-2}
                    onClick={resetToBottom}
                    animation={"fadein 1s"}
                ></IconButton>
            </Fade>
        </>
    )
}
