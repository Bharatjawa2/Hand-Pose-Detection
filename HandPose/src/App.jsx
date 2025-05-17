import React, { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from './utils/utilities';

function App() {

    const webcamRef=useRef(null);
    const canvasRef=useRef(null);

    const runHandPose=async()=>{
      const net=await handpose.load();
      console.log("HandPose model loaded successfully.")
      // Loop and Detect Hands
      setInterval(()=>{
        detect(net)
      },100);
    }

    const detect=async(net)=>{
      if(
        typeof webcamRef.current!=='undefined' && 
        webcamRef.current!==null &&
        webcamRef.current.video.readyState===4
      ){
        // Get video properties
        const video=webcamRef.current.video;
        const videoWidth=webcamRef.current.video.videoWidth;
        const videoHeight=webcamRef.current.video.videoHeight;

        // Set video Height and Width
        webcamRef.current.video.width=videoWidth;
        webcamRef.current.video.height=videoHeight;

        // Set canvas Height and Width
        canvasRef.current.width=videoWidth;
        canvasRef.current.height=videoHeight;

        // Make Detections
        const hand=await net.estimateHands(video);
        console.log(hand);

        // Draw Mesh
        const ctx=canvasRef.current.getContext("2d");
        drawHand(hand,ctx);
      }
    };

    runHandPose();

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <Webcam ref={webcamRef} style={{position:"absolute", marginLeft:"auto", marginRight:"auto", left:0,right:0,textAlign:"center", zIndex:9,width:640,height:480}}/>
          <canvas ref={canvasRef} style={{position:"absolute", marginLeft:"auto", marginRight:"auto", left:0,right:0,textAlign:"center", zIndex:9,width:640,height:480}}/>
        </header>
      </div>
    </>
  )
}

export default App
