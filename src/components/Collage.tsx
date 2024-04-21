import {
    Box,
    Button,
    Flex, IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react"
import React, {useState} from "react";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {BiArchive, BiCross, BiTrash} from "react-icons/bi";
import {CgCross} from "react-icons/cg";
import {FaCross} from "react-icons/fa";
import {LuDelete} from "react-icons/lu";
import {DeleteIcon} from "@chakra-ui/icons";

export interface CollageProps {
    photos: string[]
    imagesPerRow: number
    size: number
    onDelete?: () => void
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
                            key={photo}
                            _hover={{cursor: "zoom-in"}}
                            position={"relative"}>
                            { onDelete && <IconButton
                              color={"white"}
                              bg={"primary.300"}
                              _hover={{bg: "primary.500"}}
                              icon={<BiTrash/>}
                              aria-label={"delete picture"}
                              onClick={onDelete}
                              position={"absolute"}
                              borderRadius={25}
                              top={1}
                              right={1}/>
                            }
                            <Image
                                objectFit={"cover"}
                                height={calculateImageSize()}
                                width={calculateImageSize()}
                                borderRadius="md"
                                src={photo}
                                alt="photo"
                                p={0.5}
                                onClick={() => {setOpen(true); setSelection(photo)}}/>
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