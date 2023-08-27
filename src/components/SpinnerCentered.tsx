import {Box, Spinner} from "@chakra-ui/react";
import * as React from "react";
import "../styles.css"

export default function SpinnerCentered() {
    return <Box className={"centered-parent"}><Spinner className="centered-child"></Spinner></Box>
}
