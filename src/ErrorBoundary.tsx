import React, {Component, ErrorInfo, ReactNode} from "react";
import {HiLightningBolt} from "react-icons/hi";
import {Box} from "@chakra-ui/react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <Box className={"centered-parent"}><HiLightningBolt className={"centered-child"} size={60}/></Box>
        }
        return this.props.children
    }
}
