import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import {
  Fingerprint, HeartPulse, Droplets, Thermometer, Gauge, Activity,
  Moon, Watch, BatteryCharging, Shield, Smile, Frown, Calendar
} from 'lucide-react';
import { useSelector } from 'react-redux';

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Créez une fonction de navigation

  const userName = user ? user.name : 'Utilisateur';

  // Générer des données de santé aléatoires
  const generateHealthData = () => {
    return {
      heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
      hydration: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
      bodyTemperature: (Math.random() * (37.5 - 36.0) + 36.0).toFixed(1),
      stressLevel: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      oxygenLevel: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
      bloodPressure: `${Math.floor(Math.random() * (140 - 90 + 1)) + 90}/${Math.floor(Math.random() * (90 - 60 + 1)) + 60}`,
      sleepQuality: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      steps: Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000,
      caloriesBurned: Math.floor(Math.random() * (500 - 100 + 1)) + 100,
      immuneStrength: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
    };
  };

  // Simuler le scan de l'empreinte digitale
  const handleFingerprintScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  
    // Démarrer le scan après 5 secondes
    setTimeout(() => {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            const data = generateHealthData();
            setHealthData(data);
            setIsScanning(false);
  
            // Sauvegarder le scan dans le localStorage
            const savedScans = JSON.parse(localStorage.getItem('scans')) || [];
            savedScans.push({ ...data, timestamp: new Date().toLocaleString() });
            localStorage.setItem('scans', JSON.stringify(savedScans));
  
            return 100;
          }
          return prev + 1;
        });
      }, 60); // 6 à 7 secondes pour compléter le scan
    }, 4000); // Délai de 5 secondes avant de commencer le scan
  };

  // Évaluer si les données de santé sont bonnes
  const isHealthGood = () => {
    if (!healthData) return false;
    return (
      healthData.heartRate >= 60 && healthData.heartRate <= 100 &&
      healthData.hydration >= 60 &&
      healthData.bodyTemperature >= 36.0 && healthData.bodyTemperature <= 37.5 &&
      healthData.stressLevel <= 5 &&
      healthData.oxygenLevel >= 95 &&
      healthData.sleepQuality >= 7
    );
  };

  // Données pour les graphiques
  const chartData = [
    { name: 'Fréquence cardiaque', value: healthData?.heartRate || 0 },
    { name: 'Hydratation', value: healthData?.hydration || 0 },
    { name: 'Température', value: healthData?.bodyTemperature || 0 },
    { name: 'Stress', value: healthData?.stressLevel || 0 },
    { name: 'Oxygène', value: healthData?.oxygenLevel || 0 },
  ];

  const pieData = [
    { name: 'Sommeil', value: healthData?.sleepQuality || 0 },
    { name: 'Activité', value: healthData?.steps || 0 },
    { name: 'Calories', value: healthData?.caloriesBurned || 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Scanner de Santé</h1>

        <div className="text-center mb-8">
          <p className="text-xl text-gray-700">Bienvenue, <span className="font-semibold">{userName}</span></p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
            {isScanning && (
              <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping"></div>
            )}
            <button
              onClick={handleFingerprintScan}
              disabled={isScanning}
              className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              <Fingerprint className="h-8 w-8" />
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            {isScanning ? `Scan en cours... ${scanProgress}%` : 'Posez votre doigt pour scanner'}
          </p>
        </div>

        {healthData && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-blue-800">Résultats du Scan</h2>

            {/* Affichage des résultats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <HealthMetricCard
                icon={<HeartPulse className="h-6 w-6 text-blue-500" />}
                title="Fréquence cardiaque"
                value={`${healthData.heartRate} bpm`}
                description={`${healthData.heartRate >= 60 && healthData.heartRate <= 100 ? 'Normale' : 'À surveiller'}`}
              />
              <HealthMetricCard
                icon={<Droplets className="h-6 w-6 text-blue-500" />}
                title="Hydratation"
                value={`${healthData.hydration}%`}
                description={`${healthData.hydration >= 60 ? 'Optimal' : 'À améliorer'}`}
              />
              <HealthMetricCard
                icon={<Thermometer className="h-6 w-6 text-blue-500" />}
                title="Température"
                value={`${healthData.bodyTemperature}°C`}
                description={`${healthData.bodyTemperature >= 36.0 && healthData.bodyTemperature <= 37.5 ? 'Normale' : 'À surveiller'}`}
              />
              <HealthMetricCard
                icon={<Gauge className="h-6 w-6 text-blue-500" />}
                title="Niveau de stress"
                value={`${healthData.stressLevel}/10`}
                description={`${healthData.stressLevel <= 5 ? 'Modéré' : 'Élevé'}`}
              />
              <HealthMetricCard
                icon={<Activity className="h-6 w-6 text-blue-500" />}
                title="Taux d'oxygène"
                value={`${healthData.oxygenLevel}%`}
                description={`${healthData.oxygenLevel >= 95 ? 'Normal' : 'À surveiller'}`}
              />
              <HealthMetricCard
                icon={<Moon className="h-6 w-6 text-blue-500" />}
                title="Qualité du sommeil"
                value={`${healthData.sleepQuality}/10`}
                description={`${healthData.sleepQuality >= 7 ? 'Bonne' : 'À améliorer'}`}
              />
              <HealthMetricCard
                icon={<Watch className="h-6 w-6 text-blue-500" />}
                title="Pas aujourd'hui"
                value={`${healthData.steps}`}
                description={`${healthData.steps >= 8000 ? 'Objectif atteint' : 'À améliorer'}`}
              />
              <HealthMetricCard
                icon={<BatteryCharging className="h-6 w-6 text-blue-500" />}
                title="Calories brûlées"
                value={`${healthData.caloriesBurned} kcal`}
                description={`${healthData.caloriesBurned >= 300 ? 'Bon effort' : 'À améliorer'}`}
              />
            </div>

            {/* Message de santé */}
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              {isHealthGood() ? (
                <>
                  <Smile className="h-12 w-12 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold text-green-600 mt-4">Votre santé est bonne !</h3>
                  <p className="text-gray-600 mt-2">
                    Continuez à bien manger, à faire de l'exercice et à dormir suffisamment.
                  </p>
                </>
              ) : (
                <>
                  <Frown className="h-12 w-12 text-red-500 mx-auto" />
                  <h3 className="text-xl font-semibold text-red-600 mt-4">Votre santé nécessite attention.</h3>
                  <p className="text-gray-600 mt-2">
                    Prenez rendez-vous avec un professionnel de santé pour un bilan complet.
                  </p>
                  <button
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/appointment')} // Redirection vers la page de rendez-vous
                  >
                    <Calendar className="inline-block mr-2" />
                    Prendre rendez-vous
                  </button>
                </>
              )}
            </div>

            {/* Graphiques */}
            <div>
              <h3 className="text-xl font-medium text-blue-700 mb-4">Graphiques de santé</h3>
              <div className="space-y-8">
                <LineChart width={800} height={300} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>

                <PieChart width={800} height={400}>
                  <Pie
                    data={pieData}
                    cx={400}
                    cy={200}
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HealthMetricCard = ({ icon, title, value, description }) => (
  <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <h3 className="text-lg font-medium text-blue-700 mt-4">{title}</h3>
    <p className="text-3xl font-bold text-blue-800 mt-2">{value}</p>
    <p className="text-sm text-gray-600 mt-2">{description}</p>
  </div>
);

export default Scanner;