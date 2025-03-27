import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FaCamera, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FaceIDLogin = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Charger les modèles
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        console.log('Modèles chargés avec succès');
      } catch (err) {
        console.error("Erreur lors du chargement des modèles :", err);
        setError("Erreur lors du chargement des modèles de détection faciale.");
      }
    };
    loadModels();
  }, []);

  // Activer la caméra
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOn(true);
        }
      })
      .catch(err => {
        console.error("Erreur lors de l'accès à la caméra :", err);
        setError("Impossible d'accéder à la caméra. Veuillez vérifier vos permissions.");
      });
  };

  // Capturer une photo
  const capturePhoto = () => {
    let count = 3;
    const countdown = setInterval(() => {
      if (count > 0) {
        setError(`Photo dans ${count}...`);
        count--;
      } else {
        clearInterval(countdown);
        setError('');

        // Prendre la photo
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/png');
        setCapturedPhoto(photo);
      }
    }, 1000);
  };

  // Sauvegarder la photo de l'utilisateur
  const saveFacePhoto = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/save-face-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // Remplacez par l'ID de l'utilisateur connecté
          facePhoto: capturedPhoto,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde de la photo.');
      }

      const data = await response.json();
      toast.success('Photo sauvegardée avec succès !', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
    } catch (err) {
      console.error("Erreur lors de la sauvegarde de la photo :", err);
      setError(err.message || 'Une erreur est survenue, veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifier la photo
  const verifyPhoto = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/faceid-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facePhoto: capturedPhoto,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la vérification de la photo.');
      }

      const data = await response.json();
      toast.success('Connexion réussie !', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
      navigate('/');
    } catch (err) {
      console.error("Erreur lors de la vérification de la photo :", err);
      setError(err.message || 'Une erreur est survenue, veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">FaceID</h2>

        {/* Conteneur pour la vidéo et la photo */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Vidéo et cercle de guidage */}
          <div className="relative w-full md:w-1/2 h-48 flex items-center justify-center">
            <div className="absolute w-40 h-40 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-48 object-cover rounded-lg shadow-md"
            ></video>
          </div>

          {/* Photo capturée */}
          {capturedPhoto && (
            <div className="w-full md:w-1/2 h-48 flex items-center justify-center">
              <img
                src={capturedPhoto}
                alt="Photo capturée"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Canvas caché pour capturer la photo */}
        <canvas ref={canvasRef} className="hidden"></canvas>

        {/* Boutons */}
        {!isCameraOn && (
          <button
            onClick={startVideo}
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 flex items-center justify-center"
          >
            <FaCamera className="mr-2" />
            Activer la caméra
          </button>
        )}

        {isCameraOn && !capturedPhoto && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={capturePhoto}
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 flex items-center justify-center"
          >
            <FaCamera className="mr-2" />
            Prendre une photo
          </motion.button>
        )}

        {isCameraOn && capturedPhoto && (
          <>
            {/* Bouton pour sauvegarder la photo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveFacePhoto}
              disabled={isLoading}
              className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sauvegarde en cours...
                </div>
              ) : (
                <>
                  <FaCheckCircle className="mr-2" />
                  Sauvegarder ma photo
                </>
              )}
            </motion.button>

            {/* Bouton pour vérifier la photo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={verifyPhoto}
              disabled={isLoading}
              className="w-full bg-purple-500 text-white py-2 rounded-lg mt-4 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Vérification en cours...
                </div>
              ) : (
                <>
                  <FaCheckCircle className="mr-2" />
                  Vérifier ma photo
                </>
              )}
            </motion.button>

            {/* Bouton pour reprendre une photo */}
            <button
              onClick={() => setCapturedPhoto(null)}
              className="w-full bg-gray-500 text-white py-2 rounded-lg mt-4 flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" />
              Reprendre une photo
            </button>
          </>
        )}

        {/* Message d'erreur */}
        {error && (
          <p className={`text-sm mt-4 text-center ${error.includes('réussie') ? 'text-green-500' : 'text-red-500'}`}>
            {error}
          </p>
        )}

        {/* Option de connexion classique */}
        {error && !error.includes('réussie') && (
          <Link
            to="/login"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg mt-4 block text-center"
          >
            Se connecter avec email/mot de passe
          </Link>
        )}
      </div>
    </div>
  );
};

export default FaceIDLogin;