import React, { useState, useEffect, useRef } from 'react';
import { FiMessageCircle, FiSend, FiMic, FiSun, FiMoon, FiUser, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import logo from '../../public/robot-logo.png';
import axios from 'axios';
import { franc } from "franc-min";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
    const [isBotTyping, setIsBotTyping] = useState(false); // Indicateur de réponse en cours
    const [chatSessions, setChatSessions] = useState([]); // Historique des sessions
    const [currentSessionId, setCurrentSessionId] = useState(null); // ID de la session actuelle
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    // Faire défiler la conversation vers le bas
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Charger l'historique des conversations depuis localStorage
    useEffect(() => {
        const savedSessions = localStorage.getItem('chatSessions');
        if (savedSessions) {
            setChatSessions(JSON.parse(savedSessions));
        }
    }, []);

    // Sauvegarder l'historique des conversations dans localStorage
    useEffect(() => {
        localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    }, [chatSessions]);

    // Mettre à jour la session actuelle lorsque les messages changent
    useEffect(() => {
        if (currentSessionId) {
            const updatedSessions = chatSessions.map(session => {
                if (session.id === currentSessionId) {
                    return { ...session, messages };
                }
                return session;
            });
            setChatSessions(updatedSessions);
        }
    }, [messages]);

    // Initialisation de la reconnaissance vocale
    useEffect(() => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            alert("La reconnaissance vocale n'est pas supportée par ce navigateur.");
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'fr-FR';
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            setInput(speechResult);
        };

        return () => recognition.stop();
    }, []);

    // Fonction pour activer/désactiver la reconnaissance vocale
    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const detectLanguage = (text) => {
        const langCode = franc(text);
        return langCode === 'und' ? 'en' : langCode; // Par défaut, 'en' si non détecté
    };

    // Envoyer un message
    const handleSend = async () => {
        if (!input) return;

        const userMessage = { text: input, sender: 'user' };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);

        setIsBotTyping(true);

        try {
            const response = await fetch('http://localhost:5001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input, language: 'fr' }) // On indique la langue
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            let botResponse = data.response;

            const botMessage = { text: botResponse, sender: 'bot' };
            const finalMessages = [...updatedMessages, botMessage];
            setMessages(finalMessages);

        } catch (error) {
            console.error('Erreur lors de la réponse du chatbot :', error);
            const botMessage = { text: `Erreur : ${error.message}`, sender: 'bot' };
            const finalMessages = [...updatedMessages, botMessage];
            setMessages(finalMessages);
        } finally {
            setIsBotTyping(false);
        }

        setInput('');
    };

    // Traduire un message avec Google Translate
    const translateMessage = async (text, targetLang) => {
        try {
            const response = await axios.post('https://libretranslate.com/translate', {
                q: text,
                source: "auto", // Détection automatique de la langue
                target: targetLang,
                format: "text"
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            return response.data.translatedText;
        } catch (error) {
            console.error('Erreur de traduction :', error);
            return text; // Retourne le texte original en cas d'erreur
        }
    };

    // Basculer entre le mode sombre et clair
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
    };

    // Créer une nouvelle session de chat
    const createNewSession = () => {
        // Sauvegarder les messages actuels dans la session précédente
        if (currentSessionId) {
            const updatedSessions = chatSessions.map(session => {
                if (session.id === currentSessionId) {
                    return { ...session, messages };
                }
                return session;
            });
            setChatSessions(updatedSessions);
        }

        // Créer une nouvelle session
        const newSession = {
            id: Date.now(),
            messages: []
        };
        setChatSessions([...chatSessions, newSession]);
        setCurrentSessionId(newSession.id);
        setMessages([]);
    };

    // Charger une session de chat existante
    const loadSession = (sessionId) => {
        const session = chatSessions.find(session => session.id === sessionId);
        if (session) {
            setMessages(session.messages);
            setCurrentSessionId(sessionId);
        }
    };

    // Formater les dates des sessions
    const formatSessionDate = (sessionId) => {
        const now = new Date();
        const sessionDate = new Date(sessionId);
        const diffInDays = Math.floor((now - sessionDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return "Aujourd'hui";
        if (diffInDays === 1) return "Hier";
        if (diffInDays <= 7) return `Il y a ${diffInDays} jours`;
        return "Anciennes sessions";
    };

    return (
        <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Barre des sessions */}
            <div className={`w-64 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} fixed left-0 top-0 h-screen flex flex-col`}>
                {/* Bouton Nouveau Chat */}
                <h2 className="text-2xl font-bold ">DocTeq</h2><br/>
                <button
                    onClick={createNewSession}
                    className={`w-full p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center mb-4`}
                >
                    <FiPlus className="mr-2" /> Nouveau Chat
                </button>

                {/* Liste des sessions */}
                <div className="flex-grow overflow-y-auto">
                    <div className="space-y-2">
                        {Object.entries(
                            chatSessions.reduce((acc, session) => {
                                const dateGroup = formatSessionDate(session.id);
                                if (!acc[dateGroup]) acc[dateGroup] = [];
                                acc[dateGroup].push(session);
                                return acc;
                            }, {})
                        ).map(([dateGroup, sessions]) => (
                            <div key={dateGroup}>
                                <div className="text-sm font-bold mb-2">{dateGroup}</div>
                                {sessions.map(session => (
                                    <div
                                        key={session.id}
                                        onClick={() => loadSession(session.id)}
                                        className={`p-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-lg hover:bg-gray-600 transition-colors duration-300 cursor-pointer ${currentSessionId === session.id ? 'bg-gray-500' : ''}`}
                                    >
                                        {session.messages[0]?.text.slice(0, 30)}...
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ligne de séparation et profil utilisateur (fixés en bas) */}
                <div className="mt-auto">
                    <div className="border-t border-gray-500 w-4/5 mx-auto mb-4"></div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        <span className="font-bold">User</span>
                    </div>
                </div>
            </div>

            {/* Zone de conversation */}
            <div className="ml-64 flex-grow p-6">
                {/* En-tête de la boîte de chat centré */}
                <div className="flex items-center justify-center mb-6 text-center">
                    <img src={logo} alt="Docteq Logo" className="w-12 h-12 mb-2" />
                    <h2 className="text-2xl font-bold"> DocTeq - Comment puis-je vous aider?</h2>
                </div>

                {/* Messages de la conversation */}
                <div className="h-[calc(100vh-150px)] overflow-y-auto mb-5 conversation-area">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'} mb-4`}
                        >
                            <div className={`flex items-start ${message.sender === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300">
                                    {message.sender === 'user' ? (
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                            U
                                        </div>
                                    ) : (
                                        <img src={logo} alt="Chatbot Logo" className="w-8 h-8 rounded-full" />
                                    )}
                                </div>
                                <div className={`p-3 rounded-lg shadow-md max-w-[70%] ${message.sender === 'user' ? 'bg-blue-500 text-white ml-2' : 'bg-gray-200 text-gray-900 mr-2'}`}>
                                    {message.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isBotTyping && (
                        <div className="flex justify-end mb-4">
                            <div className="flex items-end flex-row">
                                <div className="w-8 h-8 rounded-full flex items-right justify-right bg-gray-300">
                                    <img src={logo} alt="Chatbot Logo" className="w-8 h-8 rounded-full" />
                                </div>
                                <div className="p-3 rounded-lg shadow-md bg-gray-200 text-gray-900 ml-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Barre de saisie fixe en bas */}
            <div className={`chat-input-container ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Élément de navigation "Research" */}
                <div
                    className={`nav-item ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                    onClick={() => {
                        // Rediriger vers le chemin "/research"
                        window.location.href = '/reseach';
                    }}
                >
                    <FiMessageCircle className="icon" />
                    <span>Research</span>
                </div>

                {/* Champ de saisie */}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Tapez votre message..."
                    className={`chat-input ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                />

                {/* Boutons */}
                <button
                    onClick={toggleListening}
                    className={`chat-button ${isListening ? 'bg-red-500' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')}`}
                >
                    <FiMic className="w-5 h-5" />
                </button>
                <button
                    onClick={handleSend}
                    className={`chat-button ${isDarkMode ? 'bg-blue-500' : 'bg-blue-400'}`}
                >
                    <FiSend className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;