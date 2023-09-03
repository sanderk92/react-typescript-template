import {AspectRatio, Box, Flex, Image, Modal, ModalContent, ModalOverlay, useBoolean} from "@chakra-ui/react"
import React, {useState} from "react";

export interface CollageProps {
    photos: string[]
}

export default function Collage({photos}: CollageProps) {
    const [open, setOpen] = useBoolean()
    const [selection, setSelection] = useState<string | undefined>(undefined);

    return (
        <Box>
            <Flex flexWrap={"wrap"}>
                {
                    photos.map((photo, index) =>
                        <Box flex={"50%"} _hover={{cursor: "zoom-in"}}>
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