import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HandPoseDetection from './components/HandPoseDetection';
import theme from './theme';

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/detection" element={<HandPoseDetection />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
