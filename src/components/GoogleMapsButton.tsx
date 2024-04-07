import {IconButton} from "@chakra-ui/react";
import {RiMapPinLine} from "react-icons/ri";
import React from "react";
import {showLocation} from "../utils/GoogleMaps";

interface GoogleMapsButtonProps {
    longitude: number,
    latitude: number,
}

export const GoogleMapsButton = ({longitude, latitude}: GoogleMapsButtonProps) => {
    return (
        <IconButton
            bg={""}
            alignSelf={"center"}
            borderRadius={0}
            aria-label={"open in maps"}
            onClick={() => showLocation(longitude, latitude)}
            icon={<RiMapPinLine/>}
        />
    )
}