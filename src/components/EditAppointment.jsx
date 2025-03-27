import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAppointment = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    date: '',
    time: '',
    reason: '',
    doctor: null,
  });

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    if (savedAppointments[index]) {
      setAppointment(savedAppointments[index]);
    }
  }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    savedAppointments[index] = appointment;
    localStorage.setItem('appointments', JSON.stringify(savedAppointments));
    navigate('/my-appointments');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Modifier le rendez-vous</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="block text-lg font-medium mb-2">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={appointment.date}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-lg font-medium mb-2">Heure</label>
          <input
            id="time"
            name="time"
            type="time"
            value={appointment.time}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-lg font-medium mb-2">Motif</label>
          <textarea
            id="reason"
            name="reason"
            value={appointment.reason}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-[#4938e4] text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full transition-colors text-lg"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditAppointment;