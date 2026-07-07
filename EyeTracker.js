import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function EyeTracker({

    studyRunning,
    breakRunning,
    setStudyPaused,

    setFacePresence,

    setEyeTracking,

    lookingAwayCount,
    setLookingAwayCount,

    faceMissingCount,
    setFaceMissingCount,

    setFocusedSeconds,

    setDistractedSeconds

}){

    const videoRef = useRef(null);
    const modelsLoaded = useRef(false);

    const [status, setStatus] = useState("Waiting...");
    const [missingSeconds, setMissingSeconds] = useState(0);

    useEffect(() => {

        if (!studyRunning) return;
        if (breakRunning) return;
        let interval;
        let stream;

        const startCamera = async () => {

            try {

                // Load models once
                if (!modelsLoaded.current) {

                    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

                    modelsLoaded.current = true;
                }

                // Open camera
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });

                videoRef.current.srcObject = stream;

                await videoRef.current.play();

                // Detection loop
                interval = setInterval(async () => {

                    const detection =
                        await faceapi
                            .detectSingleFace(
                                videoRef.current,
                                new faceapi.TinyFaceDetectorOptions()
                            )
                            .withFaceLandmarks();

                    if (!detection) {
                      setFacePresence(0);
                      setFaceMissingCount(prev => {

    const count = prev + 1;

    if (count >= 10) {

        setStudyPaused(true);

        setStatus("⛔ Study Paused - Face Missing");

    }

    return count;

});

setDistractedSeconds(prev => prev + 1);
setEyeTracking(0);

                        setMissingSeconds(prev => {

                            const value = prev + 1;

                            if (value >= 10) {
                                setStudyPaused(true);
                            }
                            

                            return value;

                        });

                        setStatus("❌ Face Missing");
                        return;
                    }

                    // Face found
                    setMissingSeconds(0);
                    if (
    lookingAwayCount < 10 &&
    faceMissingCount < 10
) {
    setStudyPaused(false);
}
                    setFacePresence(100);

                    const nose =
                        detection.landmarks.getNose()[3];
                        if (nose.x < 180) {

    setStatus("👀 Looking Away");

    setLookingAwayCount(prev => {

    const count = prev + 1;

    if (count >= 10) {

        setStudyPaused(true);
        setStatus("⛔ Study Paused - Too Many Distractions");

    }

    return count;

});

setDistractedSeconds(prev => prev + 1);

setEyeTracking(50);
}
                    else if (nose.x > 280) {

    setStatus("👀 Looking Away");

    setLookingAwayCount(prev => prev + 1);

   setLookingAwayCount(prev => {

    const count = prev + 1;

    if (count >= 10) {

        setStudyPaused(true);

        setStatus("⛔ Study Paused - Too Many Distractions");

    }

    return count;

});

}
                    else {

    setStatus("✅ Looking At Screen");

    setFocusedSeconds(prev => prev + 1);

    setFacePresence(100);

    setEyeTracking(100);

}

                }, 1000);

            }
            catch (err) {

                console.error(err);
                setStatus("Camera Error");

            }

        };

        startCamera();

        return () => {

            clearInterval(interval);

            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

        };

    }, [studyRunning, setStudyPaused]);

    if (!studyRunning) return null;

    return (
        <div
            style={{
                marginTop: 20,
                border: "2px solid #ccc",
                padding: 15,
                borderRadius: 10
            }}
        >

            <h2>👀 Eye Tracker</h2>

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                width="400"
            />

            <h3>{status}</h3>

            <p>
                Face Missing Time:
                {missingSeconds} sec
            </p>

        </div>
        
    );
    
}

export default EyeTracker;