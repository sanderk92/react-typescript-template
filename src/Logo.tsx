import * as React from "react"
import {chakra, forwardRef, ImageProps, useColorMode,} from "@chakra-ui/react"
import light from "./logo-light.png"
import dark from "./logo-dark.png"

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
    const colorMode = useColorMode()

    if (colorMode.colorMode === 'light') {
        return <chakra.img src={light} ref={ref} {...props} maxWidth={"150px"}/>
    } else {
        return <chakra.img src={dark} ref={ref} {...props} maxWidth={"150px"}/>
    }
})
