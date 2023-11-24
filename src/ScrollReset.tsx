import * as React from "react";
import {useEffect, useState} from "react";
import {canScrollDown, canScrollUp, isAtBottom, isAtTop, resetToBottom, resetToTop} from "./utils/Scroll";
import {Fade, IconButton} from "@chakra-ui/react";
import {ArrowDownIcon, ArrowUpIcon} from "@chakra-ui/icons";

interface ScrollResetProps {
    clear: boolean
    up?: boolean
    down?: boolean
}

export default function ScrollReset({clear, up, down}: ScrollResetProps) {
    const [showScrollUp, setShowScrollUp] = useState(false)
    const [showScrollDown, setShowScrollDown] = useState(false)

    useEffect(() => {
        if (clear) {
            setShowScrollUp(false)
            setShowScrollDown(false)
        }
        document.addEventListener("scroll", () => {
            setShowScrollUp(!isAtTop() && canScrollUp(300))
            setShowScrollDown(!isAtTop() && !isAtBottom() && canScrollDown(25))
        })
    }, [clear])
    return (
        <>
            <Fade in={up && showScrollUp}>
                <IconButton
                    icon={<ArrowUpIcon/>}
                    borderRadius={"100"}
                    position={"fixed"}
                    aria-label={`To Page Top`}
                    transform={"translate(-50%, -50%)"}
                    top={7}
                    onClick={resetToTop}
                    animation={"fadein 1s"}
                    opacity={"50%"}
                ></IconButton>
            </Fade>
            <Fade in={down && showScrollDown}>
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
                    opacity={"50%"}
                ></IconButton>
            </Fade>
        </>
    )
}
