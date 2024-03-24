import {useColorModeValue} from "@chakra-ui/react";

export const primaryBackgroundColor = () => useColorModeValue('#2d3c56', '#252e44')
export const secondaryBackgroundColor = () => useColorModeValue('gray.100', 'gray.800')
export const tertiaryBackgroundColor = () => useColorModeValue('white', 'gray.700')

export const elementHoverColor = () => useColorModeValue("#607eb2", "#45597e")
export const elementInactiveColor = () =>  useColorModeValue("#516a9a", "#3a4b6c")
export const elementActiveColor = () => useColorModeValue("#2d3c56", "#252e44")