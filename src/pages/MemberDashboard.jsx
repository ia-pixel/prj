import { useSelector } from 'react-redux';

const MemberDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mon espace membre</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold">Informations personnelles</h3>
            <p className="mt-2">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          
          <div>
            <h3 className="font-semibold">Statut</h3>
            <p className="mt-2">Membre depuis : 01/01/2024</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Mettre à jour mon profil</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nouveau nom"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Nouvel email"
              className="w-full p-2 border rounded-lg"
            />
            <button className="bg-[#4938e4] text-white px-4 py-2 rounded-lg">
              Mettre à jour
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;