import React, {ReactNode, useEffect} from 'react';
import {Avatar, Box, BoxProps, CloseButton, Drawer, DrawerContent, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, useDisclosure, VStack,} from '@chakra-ui/react';
import {FiChevronDown, FiHome, FiMenu, FiMessageCircle,} from 'react-icons/fi';
import {IconType} from 'react-icons';
import {ColorModeSwitcher} from "./ColorModeSwitcher";
import {Link as RouteLink} from "react-router-dom";
import useAuthService from "./auth/AuthService";
import {Logo} from "./Logo";
import {onResize} from "./utils/Resize";
import {onBack} from "./utils/History";
import {LoggedInUser} from "./http/model/user";

export interface NavigationProps {
    user: LoggedInUser
    children: ReactNode
}

export default function Navigation({user, children}: NavigationProps) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Box minH="100vh">
            <SidebarContent onClose={onClose} display={{base: 'none', md: 'block'}}/>
            <SidebarDrawer isOpen={isOpen} onClose={onClose}/>
            <TopNavigation onOpen={onOpen} user={user}/>
            <Box ml={{base: 0, md: 60}}>{children}</Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('gray.300', 'gray.900')}
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
            <NavItem onClick={onClose} key="Home" name="Home" link="/" icon={FiHome}></NavItem>
            <NavItem onClick={onClose} key="Contact" name="Contact" link="/contact" icon={FiMessageCircle}></NavItem>
        </Box>
    );
};

const NavItem = ({icon, link, name, onClick, ...rest}: {
    icon: IconType
    link: string
    name: string
    onClick: () => void
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

const SidebarDrawer = ({isOpen, onClose, ...rest}: {
    isOpen: boolean
    onClose: () => void
}) => {

    useEffect(() => {
        onResize(onClose)
        onBack(onClose)
    })

    return (
        <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full">
            <DrawerContent>
                <SidebarContent onClose={onClose}/>
            </DrawerContent>
        </Drawer>
    )
}

const TopNavigation = ({user, onOpen, ...rest}: {
    user: LoggedInUser
    onOpen: () => void
}) => {
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('gray.700', 'gray.900')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                bg={useColorModeValue('gray.300', 'gray.700')}
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
                                    <Text fontSize="sm" color={"white"}>{user.id}</Text>=
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown color={"white"}/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={useAuthService().logout}>Sign out</MenuItem>
                            <MenuDivider/>
                            <ColorModeSwitcher flex={"auto"} justifySelf="center"/>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
