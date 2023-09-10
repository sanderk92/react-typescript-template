import {Box, Flex, Image, Modal, ModalContent, ModalOverlay} from "@chakra-ui/react"
import React, {useState} from "react";

export interface CollageProps {
    photos: string[]
    imagesPerRow: number
}

export default function Collage({photos, imagesPerRow}: CollageProps) {
    const [open, setOpen] = useState(false)
    const [selection, setSelection] = useState<string | undefined>(undefined);

    return (
        <Box>
            <Flex flexWrap={"wrap"}>
                {
                    photos.map((photo, index) =>
                        <Box flex={`${100 / imagesPerRow}%`} _hover={{cursor: "zoom-in"}}>
                            <Image borderRadius="md" src={photo} alt="photo" p={0.5} onClick={() => {setOpen(true); setSelection(photo)}}/>
                        </Box>
                    )
                }
            </Flex>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <ModalOverlay/>
                <ModalContent>
                    <Image src={selection}></Image>
                </ModalContent>
            </Modal>
        </Box>
    )
}