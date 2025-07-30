import { useContext, useEffect, useRef, useState, useTransition } from "react";
import axios from "axios";
import React from 'react';
import { useNavigate } from "react-router-dom";

import { AppLauncher } from "../../Components/app-launcher";
import { AnimatePresence, motion } from "framer-motion";
import { useFilter } from "../../Contexts/filter";
import { ProjectContext } from "../../Contexts/count-project";
import useApi from "../../Hooks/Api";
export const HomeNavBar = React.memo(function NavBarAccueil() {
    const { countProject,selected, setSelected } = useContext(ProjectContext);
    const {  toggleModal } = useFilter();
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [showModal, setShowModal] = useState(false);
    const [showAppLauncher, setShowAppLauncher] = useState(false);
    const appLauncherRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [openLangue, setOpenLangue] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownRefLangue = useRef(null);
    const {callApi} = useApi();
    const [isListView, setIsListView] = useState(true);
    const [_,transition] = useTransition();
    const [data,setData] = useState();

    const toggleView = () => {
        setIsListView(!isListView);
    };
    const [showMessage, setShowMessage] = useState(false);
    const betaRef = useRef(null);
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (betaRef.current && !betaRef.current.contains(event.target)) {
       setShowMessage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await callApi(`/countProject`
                );
                setData(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [callApi]);
   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (appLauncherRef.current && !appLauncherRef.current.contains(event.target)) {
                setShowAppLauncher(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenLangue(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(
                'http://127.0.0.1:8000/api/logout',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.status === 200) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('role');
                sessionStorage.removeItem('setting');
                navigate('/login');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
            alert("Une erreur est survenue lors de la déconnexion.");
        }
    };

    const changeTab = (tab) =>{
        transition(()=>{
            setSelected(tab);
        })
    }

    return (
        <>
            {/* Navbar principale */}
            <div className="bg-base-100 shadow-sm px-4">
                <div className="w-full navbar mx-auto" >
                    {/* Menu mobile */}
                    <div className="inline-flex items-center gap-4">
                        {/* <a href="https://presence.forma-fusion.com/cfp/projets" className="flex items-center gap-2">
                        <img src="https://presence.forma-fusion.com/img/icones/Présence.png" className="mb-1 w-9"/>
                        <h1 className="text-2xl font-semibold text-gray-700">Présence</h1> */}
                        
                        <p className="flex items-center gap-2" ref={betaRef}> 
                        <img
                        src="https://presence.forma-fusion.com/img/icones/Présence.png"
                        className="mb-1 w-9"
                        alt="Icon"
                        />
                        <span className="relative inline-block text-2xl text-gray-700">
                        Présence
                        <span
                            onClick={() => setShowMessage((prev) => !prev)}
                            className="absolute -top-2 -right-8 text-xs px-2 py-0.5 bg-green-500 text-white rounded-full border border-white shadow-md cursor-pointer"
                        >
                            Beta
                        </span>
                        </span>
                    </p>
                    <AnimatePresence>
                        {showMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-72 bg-black text-sm text-gray-700 p-4 rounded shadow-lg border z-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                        >
                            <p className="font-semibold mb-1">La plateforme est en BETA ouverte !</p>
                            <p>
                            💬 Nous travaillons activement pour l'améliorer.{" "}
                            <a
                                href="https://forma-fusion.com/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 underline cursor-pointer dark:text-purple-400"
                            >
                                Contactez-nous ici
                            </a>.
                            </p>
                        </motion.div>
                        )}
                    </AnimatePresence>
                        {/* </a> */}
                    </div>

                    {/*Milieu */}
                    <div className="">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
                        {/* En cours */}
                        <button
                            onClick={() => changeTab("En cours")}
                            className={`relative flex items-center justify-between w-44 px-4 py-2 border rounded-lg shadow-sm transition-all font-medium text-sm
                            ${selected === "En cours" ? "bg-[#369ACC] text-white" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"}`}
                        >
                            <span>En cours</span>
                            <span className={`text-xs font-semibold h-[1.3rem] min-w-[1.3rem] px-2 rounded-full flex items-center justify-center shadow
                            ${selected === "En cours" ? "bg-white text-black" : "bg-[#369ACC] text-white"}`}>
                            {data?.projet_counts?.en_cours}
                            </span>
                        </button>

                        {/* Terminé */}
                        <button
                            onClick={() => changeTab("Terminé")}
                            className={`relative flex items-center justify-between w-44 px-4 py-2 border rounded-lg shadow-sm transition-all font-medium text-sm
                            ${selected === "Terminé" ? "bg-[#95CF92] text-white" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"}`}
                        >
                            <span>Terminé</span>
                            <span className={`text-xs font-semibold h-[1.3rem] min-w-[1.3rem] px-2 rounded-full flex items-center justify-center shadow
                            ${selected === "Terminé" ? "bg-white text-black" : "bg-[#95CF92] text-white"}`}>
                            {data?.projet_counts?.termines}
                            </span>
                        </button>

                        {/* Clôturé */}
                        <button
                            onClick={() => changeTab("Cloturé")}
                            className={`relative flex items-center justify-between w-44 px-4 py-2 border rounded-lg shadow-sm transition-all font-medium text-sm
                            ${selected === "Cloturé" ? "bg-[#6F1926] text-white" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"}`}
                        >
                            <span>Clôturé</span>
                            <span className={`text-xs font-semibold h-[1.3rem] min-w-[1.3rem] px-2 rounded-full flex items-center justify-center shadow
                            ${selected === "Cloturé" ? "bg-white text-black" : "bg-[#6F1926] text-white"}`}>
                            {data?.projet_counts?.clotures}
                            </span>
                        </button>
                    </div>
                    </div>

                    {/* Boutons côté droit */}
                    <div className="flex gap-2">
                        {/* Menu Nouveau */}
                        <div className="relative" ref={dropdownRefLangue}>
                            <button
                                onClick={() => setOpenLangue(!openLangue)}
                                className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition"
                            >
                                <i className="fa-solid fa-earth text-2xl"></i>
                                <span>Fr</span>
                            </button>

                            {openLangue && (
                                <ul className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-md z-20 p-2 space-y-1">
                                <li>
                                    <a
                                    href="/locale/fr"
                                    className="block px-3 py-2 text-sm rounded hover:bg-slate-100 transition"
                                    >
                                    Français
                                    </a>
                                </li>
                                <li>
                                    <a
                                    href="/locale/en"
                                    className="block px-3 py-2 text-sm rounded hover:bg-slate-100 transition"
                                    >
                                    English
                                    </a>
                                </li>
                                </ul>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-2 lg:flex-row" data-head="filter">
                            {/* Toggle List/Card View */}
                            <button
                                onClick={toggleView}
                                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-100 transition"
                                title={isListView ? "Tableau" : "Carte"}
                            >
                                {isListView ? (
                                <i className="fa-solid fa-list text-lg"></i>
                                ) : (
                                <i className="fa-solid fa-square text-lg"></i>
                                )}
                            </button>

                            {/* Filtrer le projet */}
                            <button
                            onClick={toggleModal}
                                id="filterButton"
                                className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-100 transition"
                                title="Filtrer le projet"
                            >
                                <i className="fa-solid fa-filter text-lg"></i>
                            </button>
                        </div>
                                
                        {/* App Launcher */}
                        <div className="relative" ref={appLauncherRef}>
                            <button 
                            onClick={() => setShowAppLauncher(!showAppLauncher)}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-full  duration-200 cursor-pointer hover:shadow-lg  transition-all active:shadow-xl">
                                <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
                                style={{ "--color": "var(--accent)" }}
                                >
                                <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z"></path>
                            </svg>
                            </button>
                            <AnimatePresence>
                            {showAppLauncher && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 z-40"
                            >
                            <AppLauncher />
                            </motion.div>
                            )}
                            </AnimatePresence>
                        </div>

                         <div className="relative" ref={dropdownRef}>
                            {/* Avatar bouton */}
                            <button onClick={() => setOpen(!open)} className="mt-1 w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 focus:outline-none">
                                <img
                                src="https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/referents/6761ccda65d31.webp"
                                alt="Profile"
                                className="object-cover w-full h-full"
                                />
                            </button>

                            {/* Menu déroulant */}
                            {open && (
                                <ul className="absolute right-0 mt-3 w-64 bg-white rounded-md shadow-lg z-30 text-sm py-2 space-y-1">
                                {/* Header */}
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="font-medium text-gray-900">{user?.name} {user?.firstName}</p>
                                    <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>

                                {/* Lien compte */}
                                <li>
                                    <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://profils.forma-fusion.com/cfp/profils"
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                    <i className="fa-solid fa-user"></i>
                                    Gérer mon compte
                                    </a>
                                </li>

                                {/* Lien paramètres */}
                                <li className="cursor-pointer">
                                    <span className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
                                    <i className="fa-solid fa-gear"></i>
                                    Paramètres
                                    </span>
                                </li>

                                {/* Déconnexion */}
                                <li className="cursor-pointer" onClick={() => setShowModal(true)}>
                                    <span className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600 transition">
                                    <i className="fa-solid fa-power-off"></i>
                                    Déconnexion
                                    </span>
                                </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de déconnexion */}
            {showModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
                {/* Icône + titre */}
                <div className="flex items-center gap-3 mb-4">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#87388C]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z"
                    />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-800">Confirmation de déconnexion</h3>
                </div>

                <p className="text-gray-600 mb-6">
                    Voulez-vous vraiment vous déconnecter ?
                </p>

                {/* Boutons */}
                <div className="flex justify-end gap-3">
                    <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                    Non, annuler
                    </button>
                    <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-[#87388C] text-white font-semibold hover:bg-[#732b77] transition"
                    >
                    Oui, je confirme
                    </button>
                </div>
                </div>
            </div>
            )}
        </>
    )
});

// function UserInfo({ user }) {
//     const strLimit = (str, limit) => str?.length > limit ? str.slice(0, limit) + '...' : str;
  
//     return (
//         <div>
//             <h1 className="text-lg font-medium text-gray-700">
//                 {strLimit(user.name || '', 20)} {strLimit(user.firstName || '', 20)}
//             </h1>
//             <span className="text-base text-gray-500">
//                 {strLimit(user.email || '', 30)}
//             </span>
//         </div>
//     );
// }