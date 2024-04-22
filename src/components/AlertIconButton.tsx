import {AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, IconButton, useDisclosure} from "@chakra-ui/react";
import {useRef} from "react";
import * as React from "react";

export interface AlertIconButtonProps {
    icon: React.JSX.Element,
    color: string,
    title: string,
    text: string,
    onClick: () => void
    isLoading?: boolean,
    isRound?: boolean
    size?: string,
}

export const AlertIconButton = ({icon, title, text, color, onClick, isLoading, isRound, size}: AlertIconButtonProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    return (
        <Box>
            <IconButton
                m={1}
                size={size}
                borderRadius={isRound ? "25px" : "0px"}
                colorScheme={color}
                isLoading={isLoading}
                icon={icon}
                aria-label={title}
                onClick={onOpen}
            ></IconButton>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {title}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {text}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme={color} onClick={() => {onClick(); onClose()}} ml={3}>
                                Continue
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}