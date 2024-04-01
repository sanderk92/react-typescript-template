import React, {ReactNode, useEffect, useState} from 'react';
import {Avatar, AvatarBadge, Box, Button, CloseButton, Divider, Drawer, DrawerContent, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tab, TabList, Tabs, Text, useColorModeValue, useMediaQuery, VStack,} from '@chakra-ui/react';
import {FiChevronDown, FiFacebook, FiMail, FiMenu, FiTwitter} from 'react-icons/fi';
import {Link as RouteLink, useLocation, useNavigate} from "react-router-dom";
import {Logo} from "./Logo";
import {CurrentUserDto} from "../generated";
import {onResize, resetOnResize} from "./utils/Resize";
import {BsBuildingFill, BsFillBriefcaseFill, BsInboxFill} from "react-icons/bs";
import {SearchIcon} from "@chakra-ui/icons";
import {elementActiveColor, elementHoverColor, elementInactiveColor, primaryBackgroundColor, secondaryBackgroundColor, tertiaryBackgroundColor} from "./ColorSchemes";
import {ColorModeSwitcher} from "./ColorModeSwitcher";
import useAuthService from "./auth/AuthService";

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

    const [isDesktop] = useMediaQuery("(min-width: 48em)")

    return (
        <Box minH="100vh">
            { isDesktop ? <DesktopBars/> : <MobileBars isOpen={sideBarIsOpen()} onClose={closeSideBar}/> }
            <TopNavigation user={user} onOpen={openSideBar}/>
            <Box mb={{base: 14, md: 0}} ml={{base: 0, md: 60}}>{children}</Box>
        </Box>
    );
}

const DesktopBars = ({...rest}) => {
    return (
        <Box
            bg={secondaryBackgroundColor()}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
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
                            background={tertiaryBackgroundColor()}
                            isDisabled
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
                        bg={secondaryBackgroundColor()}
                        w={{base: 'full', md: 60}}
                    >
                        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                                <Logo/>
                            </Text>
                            <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
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
                <Tab onClick={() => navigate("/tasks")}><BsInboxFill/><Text fontSize="15" ml={2}>Tasks</Text></Tab>
                <Tab onClick={() => navigate("/partners")}><BsFillBriefcaseFill/><Text fontSize="15" ml={2}>Partners</Text></Tab>
                <Tab onClick={() => navigate("/companies")}><BsBuildingFill/><Text fontSize="15"  ml={2}>Companies</Text></Tab>
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
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            alignItems="center"
            bg={primaryBackgroundColor()}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                color={"white"}
                bgColor={elementInactiveColor()}
                _hover={{bgColor: elementHoverColor()}}
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                <Logo/>
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar size={'sm'} src={userAvatarUrl(user)}/>
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px">
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown color={"white"}/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={tertiaryBackgroundColor()}>
                            <MenuItem
                                bg={tertiaryBackgroundColor()}
                                _hover={{bgColor: secondaryBackgroundColor()}}
                                onClick={() => auth.logout()}>
                                Sign out
                            </MenuItem>
                            <MenuDivider/>
                            <ColorModeSwitcher flex={"auto"} justifySelf="center"/>
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
                bgColor={elementInactiveColor()}
                _hover={{bgColor: elementHoverColor()}}
                _active={{bgColor: elementActiveColor()}}
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
};

const SocialIcons = () => {
    return <>
        <IconButton
            color={"white"}
            onClick={() => window.location.href = "mailto:" + mailAddress}
            bgColor={elementInactiveColor()}
            _hover={{bgColor: elementHoverColor()}}
            w="10px"
            aria-label={"contact"}
            borderRadius={50}
            icon={<FiMail/>}
        />
        <IconButton
            isDisabled
            color={"white"}
            bgColor={elementInactiveColor()}
            _hover={{bgColor: elementHoverColor()}}
            w="10px"
            aria-label={"contact"}
            borderRadius={50}
            icon={<FiFacebook/>}
        />
        <IconButton
            isDisabled
            color={"white"}
            bgColor={elementInactiveColor()}
            _hover={{bgColor: elementHoverColor()}}
            w="10px"
            aria-label={"contact"}
            borderRadius={50}
            icon={<FiTwitter/>}
        />
    </>;
}

const userAvatarUrl = (user: CurrentUserDto) =>
    `https://ui-avatars.com/api/?name=${user.firstName.substring(0, 1)} ${user.lastName.substring(0, 1)}`;