import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiSearch, FiClock, FiCalendar } from 'react-icons/fi';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Reseach = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [definition, setDefinition] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [savedQueries, setSavedQueries] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [searchHistoryByDay, setSearchHistoryByDay] = useState({});
    const [relatedImages, setRelatedImages] = useState([]);
    const searchButtonRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedQueries')) || [];
        setSavedQueries(saved);
        groupSearchesByDay(saved);
    }, []);

    const groupSearchesByDay = (queries) => {
        const grouped = {};
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        queries.forEach(query => {
            const queryDate = new Date(query.timestamp || new Date());
            const dateKey = queryDate.toLocaleDateString();

            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(query);
        });

        const organizedHistory = {};
        Object.keys(grouped).forEach(dateKey => {
            const date = new Date(dateKey);
            if (date.toLocaleDateString() === today.toLocaleDateString()) {
                organizedHistory['Aujourd\'hui'] = grouped[dateKey];
            } else if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
                organizedHistory['Hier'] = grouped[dateKey];
            } else {
                const weekStart = new Date(today);
                weekStart.setDate(weekStart.getDate() - today.getDay());
                if (date >= weekStart) {
                    if (!organizedHistory['Cette semaine']) {
                        organizedHistory['Cette semaine'] = [];
                    }
                    organizedHistory['Cette semaine'].push(...grouped[dateKey]);
                } else {
                    if (!organizedHistory['Plus ancien']) {
                        organizedHistory['Plus ancien'] = [];
                    }
                    organizedHistory['Plus ancien'].push(...grouped[dateKey]);
                }
            }
        });

        setSearchHistoryByDay(organizedHistory);
    };

    
    const fetchRelatedImages = async (query) => {
        try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: query,
                    per_page: 7, // Nombre d'images à afficher
                    client_id: 'UZHpGCnCxVYuSRk5I-vJOknOK8w94JYVax3L7Vv4XjU', // Remplacez par votre clé API Unsplash
                },
            });
            setRelatedImages(response.data.results);
        } catch (error) {
            console.error('Erreur lors de la récupération des images :', error);
        }
    };

    
    const fetchDefinition = async (query) => {
        try {
            const response = await axios.get('https://fr.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts',
                    exintro: true, 
                    explaintext: true, 
                    titles: query,
                    origin: '*', 
                },
            });
    
            console.log("Réponse de Wikipedia :", response.data);
    
            const pages = response.data.query.pages;
            const pageId = Object.keys(pages)[0];
    
            if (pages[pageId] && pages[pageId].extract) {
                // Limite la longueur de la définition avant de la retourner
                const definition = pages[pageId].extract;
                return definition.length > 200 ? `${definition.slice(0, 200)}...` : definition;
            }
            return "Aucune définition trouvée sur Wikipedia.";
        } catch (error) {
            console.error('Erreur lors de la récupération de la définition :', error);
            return "Erreur lors de la récupération.";
        }
    };
    
    
    

    const handleSearch = async () => {
        if (!query) return;

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5001/api/chatbot', { query, lang: 'fr' });
            console.log('Réponse de l\'API :', response.data);

            // Récupérer la définition depuis Wiktionary
            const definition = await fetchDefinition(query);
            setDefinition(definition || "Aucune définition disponible.");

            setResults(response.data.results);
            setImage(response.data.image);

            // Récupérer les images associées
            await fetchRelatedImages(query);

            const updatedQueries = [{ query, timestamp: new Date() }, ...savedQueries.slice(0, 4)];
            setSavedQueries(updatedQueries);
            localStorage.setItem('savedQueries', JSON.stringify(updatedQueries));
            groupSearchesByDay(updatedQueries);
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            console.error("La reconnaissance vocale n'est pas supportée par ce navigateur.");
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'fr-FR';
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            if (isListening) {
                recognition.start();
            } else {
                setIsListening(false);
            }
        };

        recognition.onresult = (event) => {
            const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();

            if (speechResult === 'effacer' || speechResult === 'supprimer') {
                setQuery('');
            } else if (speechResult === 'rechercher') {
                return;
            } else {
                setQuery(speechResult);
                setTimeout(() => {
                    if (searchButtonRef.current) {
                        searchButtonRef.current.click();
                    }
                }, 500);
            }
        };

        return () => recognition.stop();
    }, [isListening]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Menu des anciennes recherches */}
            <div className="w-64 bg-white shadow-md p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <FiClock className="mr-2" /> Historique
                </h2>
                {Object.entries(searchHistoryByDay).map(([period, queries]) => (
                    <div key={period} className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 flex items-center">
                            {period === 'Aujourd\'hui' && <FiCalendar className="mr-2" />}
                            {period === 'Hier' && <FiCalendar className="mr-2" />}
                            {period}
                        </h3>
                        <ul className="mt-2 space-y-2">
                            {queries.map((item, index) => (
                                <li
                                    key={index}
                                    className="text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                                    onClick={() => setQuery(item.query)}
                                >
                                    {item.query}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col">
                <div className="w-full bg-white-500 text-black text-center text-sm py-2">
                    Hey, je suis DocTeq
                </div>

                {/* Barre de recherche modernisée */}
                <div className="w-full bg-white p-4 shadow-lg flex items-center justify-center">
                    <div className="flex items-center w-full max-w-2xl">
                        <img src="/robot-logo.png" alt="Logo Robot" className="w-12 h-12 mr-4 rounded-full shadow-md" />
                        <div className="flex-grow flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Rechercher..."
                                className="flex-grow p-3 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
                            />
                            <button
                                onClick={toggleListening}
                                className={`p-3 ${
                                    isListening
                                        ? 'bg-red-500 hover:bg-red-600'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                } text-white rounded-lg transition-colors duration-300 transform hover:scale-105`}
                            >
                                {isListening ? (
                                    <FaMicrophoneSlash className="w-5 h-5" />
                                ) : (
                                    <FaMicrophone className="w-5 h-5" />
                                )}
                            </button>
                            <button
                                ref={searchButtonRef}
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="text-lg"
                                    >
                                        🔄
                                    </motion.span>
                                ) : (
                                    <FiSearch className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section des résultats et des images */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* Résultats de recherche */}
                    <div className="col-span-2 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {/* Affichage de la définition */}
{definition && (
  <div className="bg-white p-6 mt-6 rounded-xl shadow-lg border-l-4 border-blue-500 transition-transform transform hover:scale-105">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{`Définition de "${query}"`}</h2>
    <p className="text-gray-700 leading-relaxed text-sm">
      {definition.length > 200 ? `${definition.slice(0, 200)}...` : definition}
    </p>
    {definition.length > 200 && (
      <button
        className="mt-3 text-blue-500 hover:text-blue-700 font-semibold"
        onClick={() => alert('Afficher la définition complète')}>
        Voir plus
      </button>
    )}
  </div>
)}<br/>


                        {/* Affichage des résultats */}
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-4 rounded-lg shadow-md mb-4"
                                >
                                    <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        <h2 className="text-xl font-semibold">{result.title}</h2>
                                    </a>
                                    <p className="text-gray-700 mt-2">{result.snippet}</p>
                                    <p className="text-sm text-gray-500 mt-1">{result.link}</p>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Aucun résultat trouvé.</p>
                        )}
                    </div>

                    {/* Images associées */}
                    <div className="col-span-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                        <h2 className="text-lg font-semibold mb-4">Images associées</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {relatedImages.map((image, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    <img
                                        src={image.urls.small}
                                        alt={image.alt_description || 'Image associée'}
                                        className="w-full h-auto rounded-lg"
                                    />
                                    <p className="text-sm text-gray-600 mt-2">{image.description || 'Aucune description'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reseach;