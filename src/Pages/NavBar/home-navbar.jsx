import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectContext } from "../../Contexts/count-project";
import useApi from "../../Hooks/Api";
import { useTranslation } from "react-i18next";
import AppLauncher from "../../Components/AppLauncherGrid";

export const HomeNavBar = React.memo(function NavBarAccueil() {
  const { selected, setSelected } = useContext(ProjectContext);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);
  const appLauncherRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openLangue, setOpenLangue] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefLangue = useRef(null);
  const { callApi } = useApi();
  const [_, transition] = useTransition();
  const [data, setData] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const betaRef = useRef(null);
  const { t, i18n } = useTranslation();

  // Codes langue en minuscules pour i18n
  const [langue, setLangue] = useState(
    sessionStorage.getItem("langue")?.toLowerCase() || "fr"
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (betaRef.current && !betaRef.current.contains(event.target)) {
        setShowMessage(false);
      }
      if (
        appLauncherRef.current &&
        !appLauncherRef.current.contains(event.target)
      ) {
        setShowAppLauncher(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (
        dropdownRefLangue.current &&
        !dropdownRefLangue.current.contains(event.target)
      ) {
        setOpenLangue(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApi(`/project/count`);
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [callApi]);

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      alert(t("Une erreur est survenue lors de la déconnexion."));
    }
  };

  const changeTab = (tab) => {
    transition(() => {
      setSelected(tab);
    });
  };

  const handleLangueChange = (code) => {
    i18n.changeLanguage(code);
    setLangue(code);
    sessionStorage.setItem("langue", code);
    setOpenLangue(false);
  };

  return (
    <>
      {/* Navbar principale */}
      <div className="bg-base-100 shadow-sm px-4 fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="w-full navbar mx-auto">
          {/* Menu mobile et titre */}
          <div className="inline-flex items-center gap-4">
            <p className="flex items-center gap-2" ref={betaRef}>
              <img
                src="https://presence.forma-fusion.com/img/icones/Présence.png"
                className="mb-1 w-9"
                alt="Icon"
              />
              <span className="relative inline-block text-2xl text-gray-700">
                {t("Présence")}
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
                  <p className="font-semibold mb-1">
                    {t("La plateforme est en BETA ouverte !")}
                  </p>
                  <p>
                    💬 {t("Nous travaillons activement pour l'améliorer.")}{" "}
                    <a
                      href="https://forma-fusion.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 underline cursor-pointer dark:text-purple-400"
                    >
                      {t("Contactez-nous ici")}
                    </a>
                    .
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Milieu : onglets */}
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
              {/* En cours */}
              <button
                onClick={() => changeTab("En cours")}
                className={`relative flex items-center justify-between w-44 px-4 py-2 border rounded-lg shadow-sm transition-all font-medium text-sm
                            ${
                              selected === "En cours"
                                ? "bg-[#369ACC] text-white"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
              >
                <span>{t("En cours")}</span>
                <span
                  className={`text-xs font-semibold h-[1.3rem] min-w-[1.3rem] px-2 rounded-full flex items-center justify-center shadow
                            ${
                              selected === "En cours"
                                ? "bg-white text-black"
                                : "bg-[#369ACC] text-white"
                            }`}
                >
                  {data?.projet_counts?.en_cours ?? 0}
                </span>
              </button>

              {/* Terminé */}
              <button
                onClick={() => changeTab("Terminé")}
                className={`relative flex items-center justify-between w-44 px-4 py-2 border rounded-lg shadow-sm transition-all font-medium text-sm
                            ${
                              selected === "Terminé"
                                ? "bg-[#95CF92] text-white"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
              >
                <span>{t("Terminé")}</span>
                <span
                  className={`text-xs font-semibold h-[1.3rem] min-w-[1.3rem] px-2 rounded-full flex items-center justify-center shadow
                            ${
                              selected === "Terminé"
                                ? "bg-white text-black"
                                : "bg-[#95CF92] text-white"
                            }`}
                >
                  {data?.projet_counts?.termines ?? 0}
                </span>
              </button>

              {/* Clôturé */}
              <button
                onClick={() => changeTab("Cloturé")}
                className={`relative flex items-center justify-between w-44 px-4 py-2 border rounded-lg shadow-sm transition-all font-medium text-sm
                            ${
                              selected === "Cloturé"
                                ? "bg-[#6F1926] text-white"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
              >
                <span>{t("Clôturé")}</span>
                <span
                  className={`text-xs font-semibold h-[1.3rem] min-w-[1.3rem] px-2 rounded-full flex items-center justify-center shadow
                            ${
                              selected === "Cloturé"
                                ? "bg-white text-black"
                                : "bg-[#6F1926] text-white"
                            }`}
                >
                  {data?.projet_counts?.clotures ?? 0}
                </span>
              </button>
            </div>
          </div>

          {/* Côté droit : langues, app launcher, avatar */}
          <div className="flex gap-2 items-center">
            {/* Drapeau statique (toujours FR?) */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition">
              <img
                src={
                  langue === "fr"
                    ? "https://flagcdn.com/w40/fr.png"
                    : "https://flagcdn.com/w40/gb.png"
                }
                alt={langue.toUpperCase()}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Menu langue */}
            <div className="relative" ref={dropdownRefLangue}>
              <button
                onClick={() => setOpenLangue(!openLangue)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition font-medium text-slate-700"
                aria-haspopup="true"
                aria-expanded={openLangue}
                aria-label={t("Changer la langue")}
              >
                {langue.toUpperCase()}
              </button>

              {openLangue && (
                <ul
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-md border border-slate-200 z-20 overflow-hidden animate-fadeIn"
                  role="menu"
                >
                  <li role="none">
                    <button
                      role="menuitem"
                      onClick={() => handleLangueChange("fr")}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <img
                        src="https://flagcdn.com/w20/fr.png"
                        alt="FR"
                        className="w-5 h-5 rounded-full"
                      />
                      Français
                    </button>
                  </li>
                  <li role="none">
                    <button
                      role="menuitem"
                      onClick={() => handleLangueChange("en")}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <img
                        src="https://flagcdn.com/w20/gb.png"
                        alt="EN"
                        className="w-5 h-5 rounded-full"
                      />
                      English
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {/* App Launcher */}
            <div className="relative" ref={appLauncherRef}>
              <button
                onClick={() => setShowAppLauncher(!showAppLauncher)}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full duration-200 cursor-pointer hover:shadow-lg transition-all active:shadow-xl"
                aria-label={t("Ouvrir le lanceur d'applications")}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
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
                    className="origin-top-right absolute right-0 mt-4 w-[90vw] max-w-md sm:max-w-xl rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-gray-200/50 overflow-hidden"
                  >
                    <AppLauncher />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar utilisateur */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="mt-1 w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label={t("Menu utilisateur")}
              >
                <img
                  src="https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/referents/6761ccda65d31.webp"
                  alt={t("Avatar utilisateur")}
                  className="object-cover w-full h-full"
                />
              </button>

              {/* Menu déroulant utilisateur */}
              {open && (
                <ul
                  className="absolute right-0 mt-3 w-64 bg-white rounded-md shadow-lg z-30 text-sm py-2 space-y-1"
                  role="menu"
                  aria-label={t("Menu utilisateur")}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">
                      {user?.name} {user?.firstName}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  <li role="none">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://compte.mg.formafusion.io"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                      role="menuitem"
                    >
                      <i className="fa-solid fa-user"></i>
                      {t("Gérer mon compte")}
                    </a>
                  </li>

                  {/* <li
                    role="menuitem"
                    tabIndex={0}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <i className="fa-solid fa-gear"></i>
                    {t("Paramètres")}
                  </li> */}

                  <li
                    className="cursor-pointer"
                    onClick={() => setShowModal(true)}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <span className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600 transition">
                      <i className="fa-solid fa-power-off"></i>
                      {t("Déconnexion")}
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
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <div className="flex items-center gap-3 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#87388C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
                />
              </svg>
              <h2
                className="text-lg font-semibold text-gray-700"
                id="logout-title"
              >
                {t("Déconnexion")}
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              {t("Voulez-vous vraiment vous déconnecter ?")}
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                onClick={() => setShowModal(false)}
              >
                {t("Annuler")}
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#87388C] text-white hover:bg-[#752d79] transition"
                onClick={handleLogout}
              >
                {t("Déconnexion")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
