import * as React from "react";
import {useEffect, useState} from "react";
import {isScrolled, resetToTop} from "./utils/Scroll";
import {Fade, IconButton} from "@chakra-ui/react";
import {ArrowUpIcon} from "@chakra-ui/icons";

export default function ScrollReset() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (isScrolled(200)) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        })
    })
    return (
        <Fade in={scrolled}>
            <IconButton
                icon={<ArrowUpIcon/>}
                borderRadius={"100"}
                position={"fixed"}
                aria-label={`To Page Top`}
                right={"40%"}
                transform={"translate(-50%, -50%)"}
                top={10}
                onClick={resetToTop}
                animation={"fadein 1s"}
            ></IconButton>
        </Fade>
    )
}