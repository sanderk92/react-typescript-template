import {Box, Flex, Image, Modal, ModalContent, ModalOverlay, useBoolean} from "@chakra-ui/react"
import React, {useState} from "react";

export interface CollageProps {
    photos: string[]
    imagesPerRow: number
}

export default function Collage({photos, imagesPerRow}: CollageProps) {
    const [open, setOpen] = useBoolean()
    const [selection, setSelection] = useState<string | undefined>(undefined);

    return (
        <Box>
            <Flex flexWrap={"wrap"}>
                {
                    photos.map((photo, index) =>
                        <Box flex={`${100 / imagesPerRow}%`} _hover={{cursor: "zoom-in"}}>
                            <Image borderRadius="md" src={photo} alt="photo" p={0.4} onClick={() => {setOpen.on(); setSelection(photo)}}/>
                        </Box>
                    )
                }
            </Flex>
            {
                !open ? null :
                    <Modal isOpen={open} onClose={() => setOpen.off()}>
                        <ModalOverlay/>
                        <ModalContent>
                            <Image src={selection}></Image>
                        </ModalContent>
                    </Modal>
            }
        </Box>
    )
}