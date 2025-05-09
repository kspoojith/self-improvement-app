import React, { useEffect, useState } from 'react';
import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Navbar';
import BehaviourCard from '../BehaviourCard';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const HomePage = () => {
  const [behaviours, setBehaviours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBehaviour, setSelectedBehaviour] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://self-improvement-app-mbvc.onrender.com/api/behaviours/${id}`);
      setBehaviours((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error('Failed to delete behaviour:', err.message);
      setError('Delete failed');
    }
  };

  const handleEdit = (behaviour) => {
    setSelectedBehaviour(behaviour);
    setTitle(behaviour.title);
    setDescription(behaviour.description);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user._id) {
      navigate('/login');
      return;
    }

    if (!title || !description) {
      setError('Please fill in both title and description.');
      return;
    }

    try {
      let res;
      if (selectedBehaviour) {
        res = await axios.patch(`https://self-improvement-app-mbvc.onrender.com/api/behaviours/${selectedBehaviour._id}`, {
          title,
          description,
          user: user._id
        });
      } else {
        res = await axios.post('https://self-improvement-app-mbvc.onrender.com/api/behaviours', {
          title,
          description,
          user: user._id
        });
      }

      setError('');
      setIsModalOpen(false);

      fetchBehaviours();
    } catch (err) {
      console.error('Error saving behaviour:', err.message);
      setError('Failed to save behaviour');
    }
  };

  const fetchBehaviours = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user._id) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get(`https://self-improvement-app-mbvc.onrender.com/api/behaviours/${user._id}`);
      const behavioursData = res.data.data;

      const behavioursWithTodoCount = await Promise.all(
        behavioursData.map(async (behaviour) => {
          const todoRes = await axios.get(`https://self-improvement-app-mbvc.onrender.com/api/todos/${behaviour._id}`);
          return {
            ...behaviour,
            todoCount: todoRes.data.data.length 
          };
        })
      );

      const sortedBehaviours = behavioursWithTodoCount
        .sort((a, b) => b.todoCount - a.todoCount)
        .slice(0, 5); 

      setBehaviours(sortedBehaviours);
    } catch (err) {
      console.error('Error fetching behaviours:', err.message);
      setError('Failed to load behaviours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBehaviours();
  }, []);

  return (
    <>
      <Nav onBehaviourAdded={fetchBehaviours} />

      {!loading && !error && behaviours.length > 0 && (
        <Heading
          as="h2"
          size="lg"
          mt={4}
          mb={5}
          fontFamily="Roboto, sans-serif"
          textAlign="center"
          width="100%"
        >
          Your Top 5 Behaviours
        </Heading>
      )}
      {loading ? (
        <Flex justify="center" mt={10}>
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Text color="red.500" textAlign="center" mt={4}>
          {error}
        </Text>
      ) : (
        <Flex wrap="wrap" justify="space-around" p={4} m={4} gap={4}>
          {behaviours.length === 0 ? (
            <Text fontSize="lg" color="gray.600" textAlign="center" mt={8}>
              You haven't added any behaviours yet. Click the "+ Add Behaviour" button to get started!
            </Text>
          ) : (
            behaviours.map((b) => (
              <BehaviourCard
                key={b._id}
                behaviour={b}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={() => navigate(`/behaviours/${b._id}`)}
              />
            ))
          )}
        </Flex>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedBehaviour ? 'Edit Behaviour' : 'Add Behaviour'}</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Behaviour Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Behaviour Description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              {selectedBehaviour ? 'Save Changes' : 'Save'}
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;
