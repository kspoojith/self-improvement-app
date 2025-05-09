import React, { useState, useRef } from 'react';
import {
  Box, Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure,
  useColorMode, useColorModeValue, Stack, Center, Image, IconButton, Drawer, DrawerBody,
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, useToast
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, PlusSquareIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';

export default function Nav({ onBehaviourAdded }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();
  const navigate = useNavigate();  

  const logoSrc = useColorModeValue(
    "/logo-no-background.png",
    "/self-improvement-app-high-resolution-logo-transparent.png"
  );

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!title || !description) {
      toast({
        title: "Missing fields.",
        description: "Please fill in both title and description.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await axios.post('https://self-improvement-app-mbvc.onrender.com/api/behaviours', {
        title,
        description,
        user: user._id
      });

      toast({
        title: "Success",
        description: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTitle('');
      setDescription('');
      closeModal();

      if (onBehaviourAdded) {
        onBehaviourAdded();
      }

    } catch (err) {
      console.error("Error adding behaviour:", err.message);
      toast({
        title: "Error",
        description: "Failed to add behaviour.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); 
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={{ base: 4, md: 8 }} boxShadow="sm">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Image
              src={logoSrc}
              alt="Logo"
              height={{ base: "15px", md: "25px" }}
              objectFit="contain"
              bg="transparent"
            />
          </Box>

          <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                leftIcon={<PlusSquareIcon />}
                variant="solid"
                size="md"
                onClick={openModal}
              >
                Add Behaviour
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    name={JSON.parse(localStorage.getItem('user'))?.username || 'U'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      name={JSON.parse(localStorage.getItem('user'))?.username || 'U'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{JSON.parse(localStorage.getItem('user'))?.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>  
                </MenuList>
              </Menu>
            </Stack>
          </Flex>

          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={openDrawer}
            icon={<HamburgerIcon />}
            variant="ghost"
            aria-label="Open Menu"
          />
        </Flex>
      </Box>

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={closeDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Button onClick={toggleColorMode} leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}>
                Toggle Theme
              </Button>
              <Button
                leftIcon={<PlusSquareIcon />}
                variant="solid"
                size="md"
                onClick={openModal}
              >
                Add Behaviour
              </Button>
              <Button
                leftIcon={<Avatar size="sm" name={JSON.parse(localStorage.getItem('user'))?.username || 'U'} />}
                variant="ghost"
              >
                {JSON.parse(localStorage.getItem('user'))?.username}
              </Button>
              <Button variant="ghost" colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Behaviour</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Enter Behaviour Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder='Enter Behaviour Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
