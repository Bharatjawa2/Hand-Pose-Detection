import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Flex,
  Icon,
  useColorMode
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={colorMode === 'dark' ? 'gray.900' : 'white'}>
      <Flex flex="1" align="right" justify="center" py={20}>
        <VStack spacing={12} align="center" textAlign="center" maxW="1200px" mx="auto">
          <Heading
            as="h1"
            size="2xl"
            color={colorMode === 'dark' ? 'white' : 'gray.800'}
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Hand Pose Detection
          </Heading>

          <Text fontSize="xl" maxW="container.md" color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
            Experience the power of real-time hand pose detection using TensorFlow.js.
            Our application track and analyze hand movements
            in real-time through your webcam.
          </Text>

          <HStack spacing={8} justify="center" wrap="wrap">
            {/* Card 1 */}
            <Box
              p={6}
              bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
              borderRadius="xl"
              boxShadow="xl"
              maxW="300px"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: '2xl',
                border: '1px solid',
                borderColor: colorMode === 'dark' ? 'gray.600' : 'gray.200'
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
                alt="Hand Gesture"
                borderRadius="lg"
                mb={4}
              />
              <Heading size="md" mb={2} color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                Real-time Detection
              </Heading>
              <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                Track hand movements with millisecond precision.
              </Text>
            </Box>

            {/* Card 2 */}
            <Box
              p={6}
              bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
              borderRadius="xl"
              boxShadow="xl"
              maxW="300px"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: '2xl',
                border: '1px solid',
                borderColor: colorMode === 'dark' ? 'gray.600' : 'gray.200'
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="AI Technology"
                borderRadius="lg"
                mb={4}
              />
              <Heading size="md" mb={2} color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                AI-Powered
              </Heading>
              <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                Leveraging TensorFlow.js for accurate and efficient hand pose estimation.
              </Text>
            </Box>

            {/* Card 3 */}
            <Box
              p={6}
              bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
              borderRadius="xl"
              boxShadow="xl"
              maxW="300px"
              transition="all 0.3s"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: '2xl',
                border: '1px solid',
                borderColor: colorMode === 'dark' ? 'gray.600' : 'gray.200'
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                alt="User Interface"
                borderRadius="lg"
                mb={4}
              />
              <Heading size="md" mb={2} color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                User-Friendly
              </Heading>
              <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                Intuitive interface designed for seamless interaction and real-time feedback.
              </Text>
            </Box>
          </HStack>

          <Button
            size="lg"
            bg="gray.800"
            color="white"
            onClick={() => navigate('/detection')}
            px={8}
            py={6}
            fontSize="lg"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '2xl',
              bg: 'gray.700',
              _before: {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 'md',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
              }
            }}
            _active={{
              transform: 'translateY(0)',
              boxShadow: 'lg',
            }}
            transition="all 0.3s"
            position="relative"
          >
            Start Detection
          </Button>
        </VStack>
      </Flex>

      <Box as="footer" py={8} bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}>
        <Container maxW="container.xl">
          <Flex style={{ marginLeft: '100px' }} justify="space-between" align="right" direction={{ base: 'column', md: 'row' }} gap={4}>
            <Text  color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                        © 2025 Hand Pose Detection. Created by BharatJawa
            </Text>
            <HStack spacing={4}>
              <a href="https://github.com/Bharatjawa2" target="_blank" rel="noopener noreferrer"><Icon
                as={FaGithub}
                w={6}
                h={6}
                cursor="pointer"
                color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}
                _hover={{ color: 'gray.800' }}
              />
              </a>
              <a href="https://www.linkedin.com/in/bharat-jawa/" target="_blank" rel="noopener noreferrer"><Icon
                as={FaLinkedin}
                w={6}
                h={6}
                cursor="pointer"
                color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}
                _hover={{ color: 'gray.800' }}
              />
              </a>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
