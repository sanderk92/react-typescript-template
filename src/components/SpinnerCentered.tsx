import {Box, Spinner} from "@chakra-ui/react";
import * as React from "react";
import "./components.css"

export default function SpinnerCentered() {
    return <Box className={"spinner-parent"}><Spinner className="spinner"></Spinner></Box>
}
