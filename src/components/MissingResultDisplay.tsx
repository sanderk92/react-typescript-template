import {Box, Text} from "@chakra-ui/react";
import * as React from "react";

export default function MissingResultDisplay() {
    return <Box className={"centered-parent"}>
        <Text as={"em"} className={"centered-child"}>The requested data was not found</Text>
    </Box>
}
