import {AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, useDisclosure} from "@chakra-ui/react";
import {useRef} from "react";
import * as React from "react";

export interface AlertTaskButtonProps {
    tag: string,
    color: string,
    title: string,
    text: string,
    onFinalize: () => void
    isLoading: boolean,
}

export const AlertButton = ({tag, title, text, color, onFinalize, isLoading}: AlertTaskButtonProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    return (
        <Box>
            <Button
                m={1}
                colorScheme={color}
                isLoading={isLoading}
                aria-label={tag}
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
                            <Button colorScheme={color} onClick={() => {onFinalize(); onClose()}} ml={3}>
                                Continue
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}