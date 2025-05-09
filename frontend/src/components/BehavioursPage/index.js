import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Flex,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Nav from '../Navbar';
import axios from 'axios';
import TodoCard from '../TodoCard';

const BehavioursPage = () => {
  const { id } = useParams();
  const [behaviour, setBehaviour] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTodo, setNewTodo] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchBehaviourDetails = async () => {
    try {
      const behaviourRes = await axios.get(`https://self-improvement-app-mbvc.onrender.com/api/behaviours/${id}`);
      setBehaviour(behaviourRes.data.data);

      const todosRes = await axios.get(`https://self-improvement-app-mbvc.onrender.com/api/todos/${id}`);
      setTodos(todosRes.data.data);
    } catch (err) {
      console.error('Error fetching behaviour details:', err.message);
      setError('Failed to load behaviour and todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBehaviourDetails();
  }, [id]);

  const handleEditTodo = async (updatedTodo) => {
    try {
      const response = await axios.patch(`https://self-improvement-app-mbvc.onrender.com/api/todos/${updatedTodo._id}`, updatedTodo);
      if (response.data) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === updatedTodo._id ? response.data.data : todo
          )
        );
      }
    } catch (err) {
      console.error('Error updating todo:', err.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://self-improvement-app-mbvc.onrender.com/api/todos/${todoId}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      console.error('Error deleting todo:', err.message);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      alert('Please enter a todo');
      return;
    }

    try {
      const response = await axios.post(`https://self-improvement-app-mbvc.onrender.com/api/todos`, {
        title: newTodo,
        behaviour:id
      });

      if (response.data) {
        setTodos((prevTodos) => [...prevTodos, response.data.data]);
        setNewTodo('');
        onClose();
      }
    } catch (err) {
      console.error('Error adding todo:', err.message);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" color="red.500" mt={4}>
        <Text>{error}</Text>
      </Box>
    );
  }

  if (!behaviour) {
    return (
      <Box textAlign="center" mt={4}>
        <Text>No behaviour found.</Text>
      </Box>
    );
  }

  return (
    <>
      <Nav />

      <Box maxW="800px" mx="auto" p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h2" size="xl">{behaviour.title}</Heading>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            aria-label="Add Todo"
            onClick={onOpen}
          >
            Add Todo
          </Button>
        </Flex>

        <Text fontSize="lg" mb={6}>{behaviour.description}</Text>

        <Stack spacing={4} mt={6}>
          {todos.length === 0 ? (
            <Text>No todos for this behaviour yet.</Text>
          ) : (
            todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </Stack>

        <Button colorScheme="blue" mt={6} onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="todo">
              <FormLabel>Todo Description</FormLabel>
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter todo description"
              />
            </FormControl>
            <Button colorScheme="blue" mt={4} onClick={handleAddTodo}>
              Add Todo
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BehavioursPage;
