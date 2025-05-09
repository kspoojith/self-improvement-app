import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Heading,
  Text,
  Checkbox,
  useToast,
  Image,
  HStack,
  FormErrorMessage
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const RegisterForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      navigate('/'); // Redirect to home if user already logged in
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending registration data:', formData);
      
      const response = await axios.post('https://self-improvement-app-mbvc.onrender.com/api/users', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data.success) {
        if (response.data.data?.token) {
          localStorage.setItem('token', response.data.data.token);
        }
        
        toast({
          title: "Registration successful",
          description: "Welcome to our platform!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate('/login');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        errorMessage = error.response.data.message || error.response.data.error || errorMessage;
      } else if (error.request) {
        console.error('No response received:', error.request);
        errorMessage = 'No response from server. Please check if the server is running.';
      } else {
        console.error('Error setting up request:', error.message);
      }

      toast({
        title: "Registration failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Image 
            src="/logo-no-background.png" 
            alt="Logo"
            width="300px"
            height="auto"
            objectFit="contain"
            mx="auto"
          />
          <Text mt={2}>Create your account to get started</Text>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input 
                name="username"
                type="text" 
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input 
                name="email"
                type="email" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input 
                name="password"
                type="password" 
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button 
              type="submit" 
              colorScheme="blue" 
              width="full"
              mt={5}
              isLoading={isLoading}
              loadingText="Registering..."
            >
              Register
            </Button>

            <HStack justify="center" spacing={2} alignItems="center" mt={2}>
              <Text fontSize="sm" display="flex" alignItems="center" mt={4}>Already have an account?</Text>
              <Button
                size="sm"
                colorScheme="red"
                variant="ghost"
                rightIcon={<ArrowForwardIcon />}
                onClick={handleLogin}
                py={0}
                px={2}
                height="auto"
                minH="24px"
              >
                Login
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default RegisterForm;