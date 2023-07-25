import {Box, Text} from "@chakra-ui/react";
import * as React from "react";

export default function NoResultDisplay() {
    return <Box className={"centered-parent"}><Text as={"em"} className={"centered-child"}>Nothing to see here!</Text></Box>
}
