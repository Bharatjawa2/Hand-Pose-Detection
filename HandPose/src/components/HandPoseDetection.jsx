import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Heading, VStack, useColorMode, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from '../utils/utilities';

const HandPoseDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  useEffect(() => {
    runHandPose();
  }, []);

  const runHandPose = async () => {
    const net = await handpose.load();
    console.log("HandPose model loaded successfully.");
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'white'}>
      <Container maxW="container.xl" py={8} centerContent>
        <VStack spacing={8} maxW="1200px" mx="auto">
          <Heading
            as="h1"
            size="xl"
            color={colorMode === 'dark' ? 'white' : 'gray.800'}
            textAlign="center"
          >
            Hand Pose Detection
          </Heading>

          <Text fontSize="lg" color={colorMode === 'dark' ? 'gray.300' : 'gray.600'} textAlign="center">
            Position your hand in front of the camera to see real-time detection
          </Text>
          
          <Box
            position="relative"
            width="640px"
            height="480px"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="2xl"
            border="4px solid"
            borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '2xl',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.2)',
              pointerEvents: 'none',
            }}
          >
            <Webcam
              ref={webcamRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zIndex: 9,
                width: 640,
                height: 480,
                borderRadius: '1rem',
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zIndex: 9,
                width: 640,
                height: 480,
                borderRadius: '1rem',
              }}
            />
          </Box>

          <Button
            bg="gray.800"
            color="white"
            onClick={() => navigate('/')}
            size="lg"
            px={8}
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
            Back to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default HandPoseDetection; 