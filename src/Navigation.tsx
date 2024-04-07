import React, {ReactNode, useEffect} from 'react';
import {Avatar, Box, Button, CloseButton, Divider, Drawer, DrawerContent, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tab, TabList, Tabs, Text, useColorModeValue, useMediaQuery, VStack,} from '@chakra-ui/react';
import {FiChevronDown, FiFacebook, FiMail, FiMenu, FiTwitter} from 'react-icons/fi';
import {Link as RouteLink, useLocation, useNavigate} from "react-router-dom";
import {Logo} from "./Logo";
import {CurrentUserDto} from "../generated";
import {onResize, resetOnResize} from "./utils/Resize";
import {BsBuildingFill, BsFillBriefcaseFill, BsInboxFill} from "react-icons/bs";
import {SearchIcon} from "@chakra-ui/icons";
import useAuthService from "./auth/AuthService";
import {isLgDevice} from "./utils/Mode";

const mailAddress = "sanderkrabbenborg@hotmail.com"

export interface NavigationProps {
    user: CurrentUserDto
    children: ReactNode
}

export default function Navigation({user, children}: NavigationProps) {
    const location = useLocation()
    const navigate = useNavigate()

    const closeSideBar = () => navigate(-1)
    const openSideBar = () => navigate("/navigation")
    const sideBarIsOpen = () => location.pathname === "/navigation"

    const [isLg] = isLgDevice()

    return (
        <Box minH="100vh">
            { isLg ? <DesktopBars/> : <MobileBars isOpen={sideBarIsOpen()} onClose={closeSideBar}/> }
            <TopNavigation user={user} onOpen={openSideBar}/>
            <Box mb={{base: 14, lg: 0}} ml={{base: 0, lg: 60}}>{children}</Box>
        </Box>
    );
}

const DesktopBars = ({...rest}) => {
    return (
        <Box
            overflowY={"scroll"}
            bg={"secondary.200"}
            borderRight="1px"
            borderRightColor={"secondary.300"}
            w={60}
            pos="fixed"
            h="full"
            {...rest}>

            <Flex direction={"column"} gap={6} height={"100%"}>
                <Flex direction={"column"} gap={6}>

                    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between"><Logo/></Flex>

                    <InputGroup mb={4} width={"85%"} mx="auto">
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon/>
                        </InputLeftElement>
                        <Input
                            readOnly
                            background={"secondary.100"}
                            _placeholder={{ opacity: 1 }}
                            variant={"outline"}
                            type='search'
                            placeholder='Search'
                        />
                    </InputGroup>
                    <Divider/>
                    <Flex width={"85%"} mx="auto" justifyContent={"center"} direction={"column"} gap={2}>
                        <NavItem key="Inbox" name="Inbox" link="/inbox" icon={<BsInboxFill/>}/>
                        <NavItem key="Outbox" name="Outbox" link="/outbox" icon={<BsInboxFill/>}/>
                    </Flex>
                    <Divider/>
                </Flex>

                <Flex height="100%" gap={2} mb={4} alignItems={"flex-end"} justifyContent={"center"}>
                    <SocialIcons/>
                </Flex>
            </Flex>
        </Box>
    )
}

const MobileBars = ({isOpen, onClose}: {
    isOpen: boolean
    onClose: () => void
}) => {

    useEffect(() => {
        if (isOpen) onResize(onClose)
        return () => resetOnResize(onClose)
    })

    return (
        <>
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <Flex
                        h="full"
                        direction={"column"}
                        alignItems={"space-between"}
                        w={{base: 'full', lg: 60}}
                    >
                        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                                <Logo/>
                            </Text>
                            <CloseButton display={{base: 'flex', lg: 'none'}} onClick={onClose}/>
                        </Flex>
                        <Flex height="100%" alignItems="center" gap={2} justifyContent={"center"}>
                            <SocialIcons/>
                        </Flex>
                    </Flex>
                </DrawerContent>
            </Drawer>
            <Bottombar></Bottombar>
        </>
    )
}

const Bottombar = ({...rest}) => {
    const navigate = useNavigate()

    return (
        <Tabs
            isFitted
            zIndex={1000}
            id={"footer"}
            width={"100%"}
            variant='enclosed-colored'
            index={calculateTabIndex()}
            size={"lg"}
            {...rest}>
            <TabList>
                <Tab onClick={() => navigate("/inbox")}><BsInboxFill/><Text fontSize="15" ml={2}>Inbox</Text></Tab>
                <Tab onClick={() => navigate("/outbox")}><BsFillBriefcaseFill/><Text fontSize="15" ml={2}>Outbox</Text></Tab>
            </TabList>
        </Tabs>
    )
}

const TopNavigation = ({user, onOpen, ...rest}: {
    user: CurrentUserDto
    onOpen: () => void
}) => {
    const auth = useAuthService()

    return (
        <Flex
            ml={{base: 0, lg: 60}}
            px={{base: 4, lg: 4}}
            alignItems="center"
            bg={"primary.500"}
            justifyContent={{base: 'space-between', lg: 'flex-end'}}
            {...rest}>
            <IconButton
                color={"white"}
                bgColor={"primary.500"}
                _hover={{bgColor: "primary.100"}}
                display={{base: 'flex', lg: 'none'}}
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', lg: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                <Logo/>
            </Text>

            <HStack spacing={{base: '0', lg: '6'}}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar size={'sm'} src={userAvatarUrl(user)}/>
                                <VStack
                                    display={{base: 'none', lg: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px">
                                </VStack>
                                <Box display={{base: 'none', lg: 'flex'}}>
                                    <FiChevronDown color={"white"}/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={"secondary.100"}>
                            <MenuItem
                                bg={"secondary.100"}
                                _hover={{bgColor: "secondary.200"}}
                                onClick={() => auth.logout()}>
                                Sign out
                            </MenuItem>
                            <MenuDivider/>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

const NavItem = ({icon, link, name, onClick}: {
    icon: React.JSX.Element
    link: string
    name: string
    onClick?: () => void
}) => {
    return (
        <RouteLink to={link} onClick={onClick}>
            <Button
                variant={""}
                color={"white"}
                bgColor={"primary.100"}
                _hover={{bgColor: "primary.300"}}
                _active={{bgColor: "primary.500"}}
                isActive={window.location.pathname.startsWith(link)}
                aria-label="test"
                justifyContent={"flex-start"}
                leftIcon={icon}
                width={"100%"}
            >{name}</Button>
        </RouteLink>
    );
};

function calculateTabIndex(): number {
    if (window.location.pathname.startsWith("/inbox")) {
        return 0
    } else if (window.location.pathname.startsWith("/outbox")) {
        return 1
    } else {
        return -1
    }
}

const SocialIcons = () => {
    return <>
        <IconButton
            color={"white"}
            onClick={() => window.location.href = "mailto:" + mailAddress}
            bgColor={"primary.100"}
            _hover={{bgColor: "primary.300"}}
            w="10px"
            aria-label={"contact"}
            borderRadius={50}
            icon={<FiMail/>}
        />
        <IconButton
            isDisabled
            color={"white"}
            bgColor={"primary.100"}
            _hover={{bgColor: "primary.300"}}
            w="10px"
            aria-label={"contact"}
            borderRadius={50}
            icon={<FiFacebook/>}
        />
        <IconButton
            isDisabled
            color={"white"}
            bgColor={"primary.100"}
            _hover={{bgColor: "primary.300"}}
            w="10px"
            aria-label={"contact"}
            borderRadius={50}
            icon={<FiTwitter/>}
        />
    </>;
}

const userAvatarUrl = (user: CurrentUserDto) =>
    `https://ui-avatars.com/api/?name=${user.firstName.substring(0, 1)} ${user.lastName.substring(0, 1)}`;