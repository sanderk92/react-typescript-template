import {Button, FormLabel, Input} from "@chakra-ui/react";
import * as React from "react";
import {useRef} from "react";

interface FileInputButtonProps {
    uniqueId: string,
    text: string
    onFileSelected: (file: File) => void
    isDisabled?: boolean
}

export const ImageUploadButton = ({uniqueId, text, onFileSelected, isDisabled}: FileInputButtonProps) => {
    const uploadRef = useRef<HTMLInputElement | null>(null)

    return (
        <>
            <Button
                p={0}
                m={0}
                isDisabled={isDisabled}>
                <FormLabel
                    cursor={"pointer"}
                    display={"flex"}
                    alignItems={'center'}
                    justifyContent={"center"}
                    htmlFor={uniqueId}
                    width={"100%"}
                    height={"100%"}
                    p={0}
                    m={0}>
                    {text}
                </FormLabel>
            </Button>
            <Input
                id={uniqueId}
                mt={2}
                pt={2}
                display={"none"}
                accept={"image/*"}
                type="file"
                ref={uploadRef}
                onChange={e => uploadRef?.current?.files && onFileSelected(uploadRef.current?.files[0])}
            />
        </>
    )
}