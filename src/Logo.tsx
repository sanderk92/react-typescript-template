import * as React from "react"
import {
  chakra,
  keyframes,
  ImageProps,
  forwardRef, useColorModeValue, useColorMode,
} from "@chakra-ui/react"
import light from "./logo-light.png"
import dark from "./logo-dark.png"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  const colorMode = useColorMode()

  if (colorMode.colorMode === 'light') {
    return <chakra.img src={light} ref={ref} {...props} maxWidth={"150px"} />
  } else {
    return <chakra.img src={dark} ref={ref} {...props} maxWidth={"150px"} />
  }
})
