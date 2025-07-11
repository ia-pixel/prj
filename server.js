import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import axios from 'axios';

// Obtenir __dirname en utilisant import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

// Chemins vers les fichiers JSON
const usersFilePath = path.join(__dirname, 'src/data/users.json');
const MESSAGES_FILE = path.join(__dirname, 'src/data/messages.json');
const NOTIFICATIONS_FILE = path.join(__dirname, 'src/data/reponses.json');

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors()); // Autoriser les requêtes cross-origin

// Fonction pour lire un fichier JSON
const readData = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  };

// Fonction pour écrire dans un fichier JSON
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  };



  // Route pour récupérer les utilisateurs avec le rôle "user"
app.get('/api/users', (req, res) => {
    try {
      // Lire le fichier users.json
      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  
      // Filtrer les utilisateurs avec le rôle "user"
      const filteredUsers = users.filter((user) => user.role === 'user');
  
      // Renvoyer les utilisateurs filtrés
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier users.json :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });


  app.delete('/api/users/:id', (req, res) => {
    let users = readUsers();
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);
    writeUsers(users);

    res.json({ message: 'Utilisateur supprimé avec succès' });
});


  // Ajouter un nouvel utilisateur
  app.post('/api/users', (req, res) => {
    try {
      console.log("Données reçues :", req.body); // Ajout pour debug
  
      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }
  
      const newUser = { id: Date.now(), ...req.body };
      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erreur serveur :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  });
  
  app.put('/api/users/:id', (req, res) => {
    try {
      console.log("ID utilisateur :", req.params.id);
      console.log("Données reçues :", req.body); //  Ajout pour debug
  
      let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const userIndex = users.findIndex((user) => user.id == req.params.id);
  
      if (userIndex === -1) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
  
      if (!req.body.role) {
        return res.status(400).json({ error: "Le rôle est obligatoire" });
      }
  
      users[userIndex].role = req.body.role;
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  
      res.json(users[userIndex]);
    } catch (error) {
      console.error("Erreur serveur :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });
  
// Charger les docteurs depuis le fichier users.json
app.get('/api/doctors', (req, res) => {
    fs.readFile(path.join(__dirname, 'src/data/users.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
      }
  
      try {
        const users = JSON.parse(data);
        const doctors = users.filter(user => user.role === 'doctor');
        
        // Vérifiez si des docteurs sont trouvés
        if (doctors.length === 0) {
          console.warn('Aucun docteur trouvé.');
        }
  
        res.json(doctors);
      } catch (error) {
        console.error('Erreur lors du parsing JSON:', error);
        res.status(500).json({ message: 'Erreur lors du parsing du fichier JSON' });
      }
    });
  });
  
  // Ajouter un nouveau docteur au fichier users.json
  app.post('/api/doctors', (req, res) => {
    const newDoctor = req.body;
    console.log("Données reçues pour l'ajout du docteur:", newDoctor);  // Ajout d'un log pour vérifier les données
  
    if (!newDoctor.id || !newDoctor.name || !newDoctor.email || !newDoctor.role || !newDoctor.specialty) {
      return res.status(400).json({ message: 'Informations manquantes pour ajouter un docteur' });
    }
  
    fs.readFile(path.join(__dirname, 'src/data/users.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
      }
  
      try {
        const users = JSON.parse(data);
        users.push(newDoctor);
  
        fs.writeFile(path.join(__dirname, 'src/data/users.json'), JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier:', err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du docteur' });
          }
          console.log('Nouveau docteur ajouté:', newDoctor); // Log pour confirmer que le docteur est bien ajouté
          res.status(201).json(newDoctor);
        });
      } catch (error) {
        console.error('Erreur lors du parsing JSON:', error);
        res.status(500).json({ message: 'Erreur lors du parsing du fichier JSON' });
      }
    });
  });
  
  
  
  // Supprimer un docteur du fichier users.json
  app.delete('/api/doctors/:id', (req, res) => {
    const doctorId = parseInt(req.params.id);
  
    fs.readFile(path.join(__dirname, 'src/data/users.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
      }
  
      try {
        let users = JSON.parse(data);
        const originalLength = users.length;
        users = users.filter(user => user.id !== doctorId);
  
        // Vérifier si un docteur a bien été supprimé
        if (users.length === originalLength) {
          return res.status(404).json({ message: 'Docteur non trouvé' });
        }
  
        fs.writeFile(path.join(__dirname, 'src/data/users.json'), JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier:', err);
            return res.status(500).json({ message: 'Erreur lors de la suppression du docteur' });
          }
          res.status(200).json({ message: 'Docteur supprimé avec succès' });
        });
      } catch (error) {
        console.error('Erreur lors du parsing JSON:', error);
        res.status(500).json({ message: 'Erreur lors du parsing du fichier JSON' });
      }
    });
  });
  

// Route pour le chatbot avec Cohere AI
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api.cohere.ai/v1/chat',
            {
                model: "command", // Modèle Cohere
                message: message // Message de l'utilisateur
            },
            {
                headers: {
                    'Authorization': `Bearer 6202VzMRTTbh7lktJNXuLkMoVV2HgP52NBstUZKc`, // Clé API Cohere
                    'Content-Type': 'application/json'
                }
            }
        );

        const botMessage = response.data.text || "Je n'ai pas compris.";
        res.status(200).json({ response: botMessage });
    } catch (error) {
        console.error('Erreur API Cohere:', error);
        res.status(500).json({ error: 'Erreur lors de la communication avec Cohere AI' });
    }
});

// Route pour le chatbot avec Google Custom Search
app.post('/api/chatbot', async (req, res) => {
    const { query } = req.body;

    // Clé API et ID du moteur de recherche Google Custom Search
    const API_KEY = 'AIzaSyAV4r3tdt4F4Fd3Fbh665tHN6-Y3W4_d6Q'; // Remplace par ta clé API
    const SEARCH_ENGINE_ID = '31f98696898384cad'; // Remplace par ton Search Engine ID

    try {
        const response = await axios.get(
            `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`
        );

        res.status(200).json({ results: response.data.items || [] });
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
        res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
});

// Route pour l'inscription
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
  }

  let users = readData(usersFilePath);

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
  }

  // Création d'un nouvel utilisateur avec un rôle par défaut et une photo de profil vide
  const newUser = { 
      id: Date.now(), 
      name, 
      email, 
      password,
      role: 'user', // Rôle par défaut
      facePhoto: '' // Photo de profil vide par défaut
  };

  users.push(newUser);

  writeData(usersFilePath, users);
  res.status(201).json({ message: 'Inscription réussie !', user: newUser });
});

// Route pour la connexion
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    let users = readData(usersFilePath);

    const user = users.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json({ error: 'Email incorrect.' });
    }

    if (user.password !== password) {
        return res.status(400).json({ error: 'Mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie !', user });
});



// Route pour sauvegarder ou mettre à jour la photo de l'utilisateur
app.post('/api/save-face-photo', (req, res) => {
  const { userId, facePhoto } = req.body;

  let users = readData(usersFilePath);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Utilisateur non trouvé.' });
  }

  users[userIndex].facePhoto = facePhoto;
  writeData(usersFilePath, users);

  res.status(200).json({ message: 'Photo sauvegardée avec succès !', user: users[userIndex] });
});

// Route pour la connexion via Face ID
app.post('/api/faceid-login', (req, res) => {
  const { facePhoto } = req.body;

  let users = readData(usersFilePath);
  const user = users.find((user) => user.facePhoto === facePhoto);

  if (!user) {
    return res.status(400).json({ error: 'Aucun utilisateur trouvé avec cette photo.' });
  }

  res.status(200).json({ message: 'Connexion réussie !', user });
});
// Route pour récupérer tous les utilisateurs
app.get('/api/users', (req, res) => {
    try {
      const users = readData(usersFilePath); // Utilisez la fonction readData pour lire le fichier users.json
      res.status(200).json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
  });

  // Route pour mettre à jour un utilisateur
  app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10); // Convertir l'ID en nombre
    const updatedUser = req.body; // Données mises à jour
  
    try {
      // Lire le fichier users.json
      let users = readData(usersFilePath);
  
      // Trouver l'utilisateur à mettre à jour
      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
  
      // Mettre à jour l'utilisateur
      users[userIndex] = { ...users[userIndex], ...updatedUser };
  
      // Écrire les modifications dans le fichier users.json
      writeData(usersFilePath, users);
  
      // Réponse réussie
      res.status(200).json({ message: 'Utilisateur mis à jour avec succès !', user: users[userIndex] });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
  });
// Route pour récupérer les notifications d'un utilisateur
app.get('/notifications/:id', (req, res) => {
    const userId = req.params.id;
    let notifications = readData(NOTIFICATIONS_FILE);

    const userNotifications = notifications.filter(n => n.userId === userId);
    res.status(200).json(userNotifications);
});

// Route pour ajouter une réponse à une notification
app.post('/notifications/:id/reponse', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Le message ne peut pas être vide' });
    }

    let notifications = readData(NOTIFICATIONS_FILE);

    const notificationIndex = notifications.findIndex(n => n.id === id);
    if (notificationIndex === -1) {
        return res.status(404).json({ error: 'Notification non trouvée.' });
    }

    if (!notifications[notificationIndex].reponses) {
        notifications[notificationIndex].reponses = [];
    }

    notifications[notificationIndex].reponses.push({
        message,
        timestamp: new Date().toISOString()
    });

    writeData(NOTIFICATIONS_FILE, notifications);
    res.status(201).json({ message: 'Réponse ajoutée avec succès' });
});

// Route pour supprimer un message
app.delete('/messages/:id', (req, res) => {
    const messageId = parseInt(req.params.id, 10);
  
    let messages = readData(MESSAGES_FILE);
    messages = messages.filter(msg => msg.id !== messageId);
  
    writeData(MESSAGES_FILE, messages);
    res.status(200).json({ message: 'Message supprimé avec succès !' });
  });
  
  // Route pour marquer un message comme "lu"
  app.put('/messages/:id/read', (req, res) => {
    const messageId = parseInt(req.params.id, 10);
  
    let messages = readData(MESSAGES_FILE);
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
  
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message non trouvé.' });
    }
  
    messages[messageIndex].read = true;
    writeData(MESSAGES_FILE, messages);
    res.status(200).json({ message: 'Message marqué comme lu.' });
  });

// Route pour récupérer les médecins
app.get('/api/doctors', (req, res) => {
    let users = readData(usersFilePath);
    const doctors = users.filter((user) => user.role === 'doctor');
    res.status(200).json(doctors);
});

// Route pour récupérer les messages
app.get('/messages', (req, res) => {
    let messages = readData(MESSAGES_FILE);
    res.status(200).json(messages);
});

// Route pour ajouter un message
app.post('/messages', (req, res) => {
    const newMessage = req.body;

    let messages = readData(MESSAGES_FILE);
    messages.push(newMessage);

    writeData(MESSAGES_FILE, messages);
    res.status(201).json({ message: 'Message ajouté avec succès !' });
});

// Route pour répondre à un message
app.post('/messages/reply', (req, res) => {
    const reply = req.body;

    let messages = readData(MESSAGES_FILE);
    const messageIndex = messages.findIndex(msg => msg.id === reply.originalNotificationId);

    if (messageIndex === -1) {
        return res.status(404).json({ error: 'Message non trouvé.' });
    }

    if (!messages[messageIndex].replies) {
        messages[messageIndex].replies = [];
    }

    messages[messageIndex].replies.push(reply);
    writeData(MESSAGES_FILE, messages);
    res.status(201).json({ message: 'Réponse ajoutée avec succès !' });
});



// Supprimer un utilisateur du fichier users.json
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Convertir l'ID en nombre
  console.log("Tentative de suppression de l'utilisateur avec l'ID :", userId);

  try {
    // Lire les utilisateurs actuels
    const users = readData(usersFilePath);
    console.log("Utilisateurs chargés :", users);

    // Filtrer les utilisateurs pour exclure celui avec l'ID donné
    const updatedUsers = users.filter(user => user.id !== userId);

    // Vérifier si un utilisateur a été supprimé
    if (users.length === updatedUsers.length) {
      console.log("Aucun utilisateur trouvé avec l'ID :", userId);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Écrire les utilisateurs mis à jour dans le fichier
    writeData(usersFilePath, updatedUsers);
    console.log("Utilisateur supprimé avec succès. Nouvelle liste :", updatedUsers);

    // Répondre avec un message de succès
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
