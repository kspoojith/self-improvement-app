import { Box, Flex, Text, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, useColorModeValue } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

const TodoCard = ({ todo, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const cardHoverBgColor = useColorModeValue('gray.100', 'gray.600');
  const textColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleModalOpen = () => {
    setNewTitle(todo.title); 
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    const updatedTodo = { ...todo, title: newTitle };
    onEdit(updatedTodo); 
    handleModalClose(); 
  };

  return (
    <>
      <Box
        p={4}
        mb={4}
        borderWidth="1px"
        borderRadius="md"
        shadow="md"
        bg={cardBgColor}
        borderColor={borderColor}
        _hover={{ bg: cardHoverBgColor }}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text fontSize="xl" fontWeight="bold" mb={2} color={textColor}>
          {todo.title}
        </Text>
        <Flex justify="flex-end" gap={2}>
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            size="sm"
            onClick={handleModalOpen} 
          />
          <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            size="sm"
            onClick={() => onDelete(todo._id)} 
          />
        </Flex>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title"
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoCard;
