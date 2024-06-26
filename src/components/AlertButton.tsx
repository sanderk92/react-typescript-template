import {AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, useDisclosure} from "@chakra-ui/react";
import {useRef} from "react";
import * as React from "react";

export interface AlertButtonProps {
    tag: string,
    color: string,
    title: string,
    text: string,
    onClick: () => void
    isLoading: boolean,
    isRound?: boolean
}

export const AlertButton = ({tag, title, text, color, onClick, isLoading, isRound}: AlertButtonProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    return (
        <Box>
            <Button
                m={1}
                borderRadius={isRound ? "25px" : "0px"}
                colorScheme={color}
                isLoading={isLoading}
                aria-label={title}
                onClick={onOpen}
            >{tag}</Button>
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