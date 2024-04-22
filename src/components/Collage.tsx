import {Box, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react"
import React, {useState} from "react";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {BiTrash} from "react-icons/bi";
import {AlertIconButton} from "./AlertIconButton";

export interface CollageProps {
    photos: Photo[]
    imagesPerRow: number
    size: number
    onDelete?: (photo: Photo) => void
}

export interface Photo {
    id: string,
    link: string,
}

export default function Collage({photos, imagesPerRow, size, onDelete}: CollageProps) {
    const [open, setOpen] = useState(false)
    const [selection, setSelection] = useState<string | undefined>();

    // Take full advantage of the given size by depending on image count
    function calculateImageSize() {
        return photos.length > imagesPerRow ? size / imagesPerRow : size / photos.length;
    }

    return (
        <Box>
            <Flex flexWrap={"wrap"} width={size}>
                {
                    photos.map(photo =>
                        <Flex
                            key={photo.id}
                            _hover={{cursor: "zoom-in"}}
                            position={"relative"}>
                            { onDelete &&
                                <Box
                                    position={"absolute"}
                                    top={0}
                                    right={0}>
                                    <AlertIconButton
                                        isRound={true}
                                        size={"xs"}
                                        title={"Confirm"}
                                        text={"Are you sure you want to delete this picture?"}
                                        color={"red"}
                                        icon={<BiTrash/>}
                                        onClick={() => onDelete(photo)}
                                    />
                              </Box>
                            }
                            <Image
                                objectFit={"cover"}
                                height={calculateImageSize()}
                                width={calculateImageSize()}
                                borderRadius="md"
                                src={photo.link}
                                alt="photo"
                                p={0.5}
                                onClick={() => {setOpen(true); setSelection(photo.link)}}/>
                        </Flex>
                    )
                }
            </Flex>
            <Modal isOpen={open} onClose={() => setOpen(false)} size={"xl"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalHeader>Image preview</ModalHeader>
                    <ModalBody mb={4}>
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