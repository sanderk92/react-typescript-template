import {useEffect, useState} from "react";
import {isScrolled, resetToTop} from "./utils/Scroll";
import {Fade, IconButton} from "@chakra-ui/react";
import {ChevronUpIcon} from "@chakra-ui/icons";
import * as React from "react";

export default function ScrollReset() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        document.addEventListener("scroll", () => {
            if (isScrolled()) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        })
    })
    return (
        <Fade in={scrolled}>
            <IconButton
                icon={<ChevronUpIcon/>}
                borderRadius={"100"}
                position={"fixed"}
                aria-label={`To Page Top`}
                left={"50%"}
                transform={"translate(-50%)"}
                bottom={4}
                onClick={resetToTop}
                opacity={"75%"}
                animation={"fadein 1s"}
            ></IconButton>
        </Fade>
    )
}