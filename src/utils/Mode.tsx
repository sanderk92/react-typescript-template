import {useMediaQuery} from "@chakra-ui/react";

// https://chakra-ui.com/docs/styled-system/responsive-styles
export const isSmDevice = () => useMediaQuery("(min-width: 0em)")
export const isMdDevice = () => useMediaQuery("(min-width: 48em)")
export const isLgDevice = () => useMediaQuery("(min-width: 62em)")
