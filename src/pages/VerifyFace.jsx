import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyFace = () => {
  const location = useLocation();
  const { photo } = location.state || {};
  const navigate = useNavigate();

  const handleVerify = () => {
    // Ici, vous pouvez ajouter la logique pour vérifier le visage
    console.log('Vérification du visage en cours...');
    navigate('/home'); // Rediriger vers la page d'accueil après vérification
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Vérification du visage</h2>
        {photo ? (
          <>
            <img src={photo} alt="Visage capturé" className="w-full h-48 object-cover rounded-lg shadow-md" />
            <button
              onClick={handleVerify}
              className="w-full bg-green-500 text-white py-2 rounded-lg mt-4"
            >
              Vérifier mon visage
            </button>
          </>
        ) : (
          <p className="text-red-500 text-sm text-center">Aucune photo disponible.</p>
        )}
      </div>
    </div>
  );
};

export default VerifyFace;