import {Box, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react"
import React, {useState} from "react";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

export interface CollageProps {
    photos: string[]
    imagesPerRow: number
}

export default function Collage({photos, imagesPerRow}: CollageProps) {
    const [open, setOpen] = useState(false)
    const [selection, setSelection] = useState<string | undefined>();

    return (
        <Box>
            <Flex flexWrap={"wrap"}>
                {
                    photos.map(photo =>
                        <Box key={photo} flex={`${100 / imagesPerRow}%`} _hover={{cursor: "zoom-in"}}>
                            <Image
                                borderRadius="md"
                                src={photo}
                                alt="photo" p={0.5}
                                onClick={() => {setOpen(true); setSelection(photo)}}/>
                        </Box>
                    )
                }
            </Flex>
            <Modal isOpen={open} onClose={() => setOpen(false)} size={"xl"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalHeader>Image preview</ModalHeader>
                    <ModalBody>
                        <Flex justifyContent={"center"} >
                            <TransformWrapper>
                                <TransformComponent>
                                    <Image src={selection}></Image>
                                </TransformComponent>
                            </TransformWrapper>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}