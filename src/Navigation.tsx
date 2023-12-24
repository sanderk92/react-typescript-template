import React, {ReactNode, useEffect} from 'react';
import {Avatar, Box, CloseButton, Drawer, DrawerContent, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tab, TabList, Tabs, Text, useColorModeValue, useMediaQuery, VStack,} from '@chakra-ui/react';
import {FiChevronDown, FiInbox, FiMail, FiMenu, FiMessageCircle,} from 'react-icons/fi';
import {IconType} from 'react-icons';
import {ColorModeSwitcher} from "./ColorModeSwitcher";
import {Link as RouteLink, useLocation, useNavigate} from "react-router-dom";
import {Logo} from "./Logo";
import {CurrentUserDto} from "../generated";
import {onResize, resetOnResize} from "./utils/Resize";

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
            bg={useColorModeValue('gray.100', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={60}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <Logo/>
                </Text>
            </Flex>
            <Flex p="1" mx="4"><Text as={"b"} fontSize={"xs"}>General</Text></Flex>
            <NavItem key="Inbox" name="Inbox" link="/inbox" icon={FiInbox}></NavItem>
            <NavItem key="Outbox" name="Outbox" link="/outbox" icon={FiMessageCircle}></NavItem>
            <NavItem key="Contact" name="Contact" link="/contact" icon={FiMail}></NavItem>
        </Box>
    );
};

const MobileBars = ({isOpen, onClose, ...rest}: {
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
                    <Box
                        bg={useColorModeValue('gray.100', 'gray.900')}
                        borderRight="1px"
                        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                        w={{base: 'full', md: 60}}
                        pos="fixed"
                        h="full"
                        {...rest}>
                        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                                <Logo/>
                            </Text>
                            <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
                        </Flex>
                        <Flex p="1" mx="4"><Text as={"b"} fontSize={"xs"}>General</Text></Flex>
                        <NavItem key="Contact" name="Contact" link="/contact" icon={FiMail}></NavItem>
                    </Box>
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
            id={"footer"}
            bg={useColorModeValue('gray.100', 'gray.900')}
            width={"100%"}
            variant='enclosed-colored'
            index={calculateTabIndex()}
            size={"lg"}
            {...rest}>
            <TabList>
                <Tab onClick={() => navigate("/inbox")}><FiInbox/><Text ml={2}>Inbox</Text></Tab>
                <Tab onClick={() => navigate("/outbox")}><FiMessageCircle/><Text ml={2}>Outbox</Text></Tab>
            </TabList>
        </Tabs>
    )
}

const TopNavigation = ({user, onOpen, ...rest}: {
    user: CurrentUserDto
    onOpen: () => void
}) => {
    const navigate = useNavigate()
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            alignItems="center"
            bg={useColorModeValue('gray.700', 'gray.900')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                bg={useColorModeValue('gray.100', 'gray.700')}
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
                                <Avatar size={'sm'} src={'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}/>
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm" color={"white"}>{`${user.firstName} ${user.lastName}`}</Text>=
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown color={"white"}/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={() => navigate("/logout")}>Sign out</MenuItem>
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
    icon: IconType
    link: string
    name: string
    onClick?: () => void
}) => {
    return (
        <RouteLink to={link} onClick={onClick}>
            <Flex align="center"
                  p="4"
                  mx="4"
                  borderRadius="lg"
                  role="group"
                  cursor="pointer"
                  _hover={{bg: useColorModeValue('gray.500', 'gray.700'), color: 'white',}}>
                {icon && (<Icon mr="4" as={icon} fontSize="16" _groupHover={{color: 'white'}}/>)}
                {name}
            </Flex>
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