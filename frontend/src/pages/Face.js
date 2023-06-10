import React from "react";
import * as faceapi from "face-api.js";
import face from "../assets/face.svg";
import { useUser } from "../provider/UserProvider";
import axios from "axios";
import Navbar from "../components/Navbar";
import { USER_PROFILE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Face = () => {
  const { user } = useUser();
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();
  const resultRef = React.useRef();

  const navigate = useNavigate();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        resultRef.current = detections[0]?.expressions;
        console.log(detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceExpressions(
            canvasRef.current,
            resizedDetections
          );
      }
    }, 1000);
  };

  const closeWebcam = () => {
    console.log("current", videoRef.current);
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  const getMaxResult = (data) => {
    let maxKey = null;
    let maxValue = Number.NEGATIVE_INFINITY;

    for (const [key, value] of Object.entries(data)) {
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    }
    return { [maxKey]: maxValue };
  };

  const saveResult = async () => {
    try {
      const body = {
        result: getMaxResult(resultRef.current),
        type: "face",
      };
      const response = await axios.request({
        url: `http://localhost:5000/report/${user.id}`,
        method: "POST",
        data: body,
        withCredentials: true,
      });
      window.localStorage.setItem(
        USER_PROFILE,
        JSON.stringify(response.data.user)
      );
      toast.success("Result saved successfully");
      navigate("/dass");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-[#F5F5F5] text-primary-content h-screen w-full">
      <Navbar />
      <div className="flex justify-center py-24">
        <div className="w-[500px]">
          <h1 className="text-3xl font-bold text-center mb-4">
            Face Detection
          </h1>
          <div className="text-lg font-semibold text-center">
            Scan your face to detect your face expression.
          </div>
          <div className="mb-8">
            {captureVideo ? (
              modelsLoaded ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <video
                      ref={videoRef}
                      height={videoHeight}
                      width={videoWidth}
                      onPlay={handleVideoOnPlay}
                      style={{ borderRadius: "10px" }}
                    />
                    <canvas ref={canvasRef} style={{ position: "absolute" }} />
                  </div>
                </div>
              ) : (
                <></>
              )
            ) : (
              <div>
                <div className="flex flex-col items-center justify-between">
                  <div className="mx-auto my-10">
                    <img src={face} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative z-50">
            {captureVideo && modelsLoaded ? (
              <>
                <button
                  onClick={saveResult}
                  className="btn btn-primary w-full mb-2"
                >
                  Save
                </button>
                <button onClick={closeWebcam} className="btn w-full">
                  Close Webcam
                </button>
              </>
            ) : (
              <button onClick={startVideo} className="btn btn-primary w-full">
                Open Webcam
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Face;
