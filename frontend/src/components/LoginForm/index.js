import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Container,
  Text,
  useToast,
  Image,
  HStack,
  FormErrorMessage
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs'; 
import { useEffect } from 'react';


const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      navigate('/'); 
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
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
      const response = await axios.get('https://self-improvement-app-mbvc.onrender.com/api/users');
      const users = response.data?.data || [];

      const user = users.find(u => u.email === formData.email);

      if (!user) {
        throw new Error("No user found with that email");
      }

      const isMatch = await bcrypt.compare(formData.password, user.password);

      if (isMatch) {
        localStorage.setItem('user', JSON.stringify(user));

        toast({
          title: "Login successful",
          description: `Welcome back, ${user.username}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate('/'); 
      } else {
        throw new Error("Invalid password");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Could not log in",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
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
          <Text mt={2}>Login to your account</Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
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
              loadingText="Logging in..."
            >
              Login
            </Button>

            <HStack justify="center" spacing={2} mt={2}>
              <Text fontSize="sm" mt={4}>Don't have an account?</Text>
              <Button
                size="sm"
                colorScheme="teal"
                variant="ghost"
                rightIcon={<ArrowBackIcon />}
                onClick={handleRegister}
                py={0}
                px={2}
                height="auto"
              >
                Register
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default LoginForm;
