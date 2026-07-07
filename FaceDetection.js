import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function FaceDetection({ studyRunning }) {
  const videoRef = useRef();
  const [status, setStatus] = useState("Loading AI...");

  useEffect(() => {

    if (!studyRunning) return;

    const loadModels = async () => {

      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      videoRef.current.srcObject = stream;

      detectFaces();
    };

    loadModels();

  }, [studyRunning]);

  const detectFaces = () => {

    setInterval(async () => {

      if (!videoRef.current) return;

      const result =
        await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks();

      if (result) {

        setStatus("😀 Face Detected");

      } else {

        setStatus("❌ Face Not Detected");

      }

    }, 1000);

  };

  return (

    <div
      style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        marginTop:"20px"
      }}
    >

      <h2>AI Face Detection</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="350"
        height="260"
      />

      <h3>{status}</h3>

    </div>

  );

}

export default FaceDetection;