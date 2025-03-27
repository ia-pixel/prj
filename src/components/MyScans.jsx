import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse, Droplets, Thermometer, Gauge, Activity,
  Moon, Watch, BatteryCharging, Calendar
} from 'lucide-react';

const MyScans = () => {
  const [scans, setScans] = useState([]);

  

  // Récupérer les scans depuis le localStorage
  useEffect(() => {
    const savedScans = JSON.parse(localStorage.getItem('scans')) || [];
    // Vérifier si les données sont déjà stockées pour éviter les doublons
  if (scans.length == 0) {
    setScans(savedScans);
  }
}, []);

  const handleDelete = (index) => {
    const updatedScans = scans.filter((_, i) => i !== index);
    setScans(updatedScans);
    localStorage.setItem('scans', JSON.stringify(updatedScans));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Mes Scans</h1>

        {scans.length === 0 ? (
          <p className="text-center text-gray-600">Aucun scan disponible pour le moment.</p>
        ) : (
          <div className="space-y-6">
            {scans.map((scan, index) => (
              <div key={index} className="p-6 border rounded-lg bg-blue-50">
                <h3 className="text-xl font-semibold">Scan du {scan.timestamp}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                  <HealthMetricCard
                    icon={<HeartPulse className="h-6 w-6 text-blue-500" />}
                    title="Fréquence cardiaque"
                    value={`${scan.heartRate} bpm`}
                    description={`${scan.heartRate >= 60 && scan.heartRate <= 100 ? 'Normale' : 'À surveiller'}`}
                  />
                  <HealthMetricCard
                    icon={<Droplets className="h-6 w-6 text-blue-500" />}
                    title="Hydratation"
                    value={`${scan.hydration}%`}
                    description={`${scan.hydration >= 60 ? 'Optimal' : 'À améliorer'}`}
                  />
                  <HealthMetricCard
                    icon={<Thermometer className="h-6 w-6 text-blue-500" />}
                    title="Température"
                    value={`${scan.bodyTemperature}°C`}
                    description={`${scan.bodyTemperature >= 36.0 && scan.bodyTemperature <= 37.5 ? 'Normale' : 'À surveiller'}`}
                  />
                  <HealthMetricCard
                    icon={<Gauge className="h-6 w-6 text-blue-500" />}
                    title="Niveau de stress"
                    value={`${scan.stressLevel}/10`}
                    description={`${scan.stressLevel <= 5 ? 'Modéré' : 'Élevé'}`}
                  />
                  <HealthMetricCard
                    icon={<Activity className="h-6 w-6 text-blue-500" />}
                    title="Taux d'oxygène"
                    value={`${scan.oxygenLevel}%`}
                    description={`${scan.oxygenLevel >= 95 ? 'Normal' : 'À surveiller'}`}
                  />
                  <HealthMetricCard
                    icon={<Moon className="h-6 w-6 text-blue-500" />}
                    title="Qualité du sommeil"
                    value={`${scan.sleepQuality}/10`}
                    description={`${scan.sleepQuality >= 7 ? 'Bonne' : 'À améliorer'}`}
                  />
                  <HealthMetricCard
                    icon={<Watch className="h-6 w-6 text-blue-500" />}
                    title="Pas aujourd'hui"
                    value={`${scan.steps}`}
                    description={`${scan.steps >= 8000 ? 'Objectif atteint' : 'À améliorer'}`}
                  />
                  <HealthMetricCard
                    icon={<BatteryCharging className="h-6 w-6 text-blue-500" />}
                    title="Calories brûlées"
                    value={`${scan.caloriesBurned} kcal`}
                    description={`${scan.caloriesBurned >= 300 ? 'Bon effort' : 'À améliorer'}`}
                  />
                </div>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const HealthMetricCard = ({ icon, title, value, description }) => (
  <div className="bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
    <div className="bg-blue-200 p-2 rounded-full">{icon}</div>
    <h3 className="text-lg font-medium text-blue-700 mt-2">{title}</h3>
    <p className="text-2xl font-bold text-blue-800 mt-1">{value}</p>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);

export default MyScans;