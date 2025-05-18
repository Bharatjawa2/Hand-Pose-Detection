import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Container, Flex, Heading, VStack, useColorMode, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from '../utils/utilities';
import * as fgp from "fingerpose";
import victory from "../images/victory.png";
import thumbs_up from "../images/thumbs_up.png";

const HandPoseDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const [emoji, setEmoji] = useState(null);
  const [gestureName, setGestureName] = useState("");
  const images = { 
    thumbs_up: thumbs_up, 
    victory: victory 
  };

  useEffect(() => {
    runHandPose();
    
    return () => {
      if (webcamRef.current?.video?.srcObject) {
        const stream = webcamRef.current.video.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const runHandPose = async () => {
    try {
      await tf.ready();
      const net = await handpose.load();
      
      const detectInterval = setInterval(() => {
        detect(net);
      }, 100);

      return () => clearInterval(detectInterval);
    } catch (error) {
      console.error("Error loading handpose model:", error);
    }
  };

  const detect = async (net) => {
    try {
      if (webcamRef.current?.video?.readyState === 4) {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const hand = await net.estimateHands(video);
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, videoWidth, videoHeight);

        if (hand.length > 0) {
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-videoWidth, 0);
          drawHand(hand, ctx);
          ctx.restore();

          const GE = new fgp.GestureEstimator([
            fgp.Gestures.VictoryGesture,
            fgp.Gestures.ThumbsUpGesture,
          ]);

          const gesture = GE.estimate(hand[0].landmarks, 8);
          
          if (gesture.gestures?.length > 0) {
            const bestGesture = gesture.gestures.reduce((prev, current) => 
              (prev.score > current.score) ? prev : current
            );
            
            if (bestGesture.score > 7) {
              setEmoji(images[bestGesture.name]);
              setGestureName(bestGesture.name);
            }
          }
        } else {
          setEmoji(null);
          setGestureName("");
        }
      }
    } catch (error) {
      console.error("Error during detection:", error);
    }
  };

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'white'}>
      <Container maxW="container.xl" py={8} centerContent>
        <VStack spacing={8} width="100%">
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

          <Flex 
            direction={['column', 'row']} 
            align="center" 
            justify="center" 
            gap={8}
            width="100%"
          >
            {/* Webcam Container - Fixed width */}
            <Box
              position="relative"
              width="640px"
              height="480px"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
              border="4px solid"
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
              flexShrink={0}  // Prevent shrinking
            >
              <Webcam
                ref={webcamRef}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: 9,
                }}
                mirrored={true}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  zIndex: 10,
                }}
              />
            </Box>

            {/* Emoji Container - Always present but hidden when no gesture */}
            <Box
              p={6}
              borderRadius="2xl"
              bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
              boxShadow="xl"
              width={['100%', '300px']}
              minHeight="200px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              visibility={emoji ? "visible" : "hidden"}
              opacity={emoji ? 1 : 0}
              transition="opacity 0.2s ease"
            >
              {emoji ? (
                <>
                  <Text 
                    fontSize="2xl" 
                    fontWeight="bold" 
                    mb={4}
                    color={colorMode === 'dark' ? 'white' : 'gray.800'}
                  >
                    Detected: {gestureName.replace('_', ' ')}
                  </Text>
                  <Image 
                    src={emoji} 
                    alt={gestureName}
                    boxSize="150px"
                    objectFit="contain"
                  />
                </>
              ) : (
                <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}>
                  No gesture detected
                </Text>
              )}
            </Box>
          </Flex>

          <Button
            colorScheme={colorMode === 'dark' ? 'gray' : 'blackAlpha'}
            onClick={() => navigate('/')}
            size="lg"
            px={8}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'xl',
            }}
          >
            Back to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default HandPoseDetection;