import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import useApi from "../../../Hooks/Api";
import { useTranslation } from "react-i18next";

dayjs.locale("fr");

const FormateurDrawer = ({ idFormateur, isOpen, onClose, ref }) => {
  const { t } = useTranslation();
  const endpoint = import.meta.env.VITE_ENDPOINT_IMG;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { callApi } = useApi();

  useEffect(() => {
    const openFormateurDrawer = async (idFormateur) => {
      setIsLoading(true);
      setData([]); // Clear anciennes données
      try {
        const res = await callApi(`/employes/projets/${idFormateur}/mini-cv`);
        setData(res);
      } catch (error) {
        console.error("Erreur chargement entreprise", error);
      } finally {
        setIsLoading(false);
      }
    };

    openFormateurDrawer(idFormateur);
  }, [idFormateur]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          key="formateur-drawer"
          className="fixed top-0 right-0 z-50 h-full w-full max-w-[60rem] bg-white shadow-2xl overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-[60rem] h-full shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="w-full px-4 py-2 flex items-center justify-between bg-gray-100">
              <p className="text-lg text-gray-500 font-medium">
                {t("aboutTrainer")}
              </p>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-md hover:bg-gray-200 flex items-center justify-center"
                aria-label={t("close")}
              >
                <i className="fa-solid fa-xmark text-gray-500"></i>
              </button>
            </div>
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center bg-white/70">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-[6px] border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-lg font-semibold tracking-wide">
                    {t("loading")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-6">
                {/* Profil */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex p-4 rounded-3xl bg-gray-50"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                      src={`${endpoint}/img/formateurs/${data?.form?.photo}`}
                      alt={t("profile")}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-700">
                      {data.form.name} {data.form.firstName}
                    </h3>
                    <p className="text-base text-gray-500">
                      {data.speciality?.form_titre}
                    </p>
                  </div>
                </motion.div>

                {/* Coordonnées */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="border border-dashed border-gray-200 rounded-md p-4 space-y-2"
                >
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold text-gray-600">
                      {t("email")} :
                    </h5>
                    <p className="text-base text-gray-400">
                      {data.form?.email}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <h5 className="text-lg font-semibold text-gray-600">
                      {t("phone")} :
                    </h5>
                    <p className="text-base text-gray-400">
                      {data.form?.phone}
                    </p>
                  </div>
                </motion.div>

                {/* Expériences et Formations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border border-dashed border-gray-200 rounded-md p-4 space-y-4"
                >
                  {/* Expériences */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-600">
                      {t("experiences")}
                    </h5>
                    <ul className="space-y-2">
                      {data.experiences?.length === 0 ? (
                        <li className="flex justify-between text-gray-400">
                          {t("noExperience")}
                        </li>
                      ) : (
                        data.experiences?.map((exp, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between text-gray-400"
                          >
                            <div className="flex gap-2">
                              <span>{exp.Fonction}</span>
                              <span>- {exp.Lieu_de_stage}</span>
                            </div>
                            <span>
                              {dayjs(exp.Date_debut).format("D MMM YYYY")} -{" "}
                              {dayjs(exp.Date_fin).format("D MMM YYYY")}
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* Formations */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-600">
                      {t("trainings")}
                    </h5>
                    <ul className="space-y-2">
                      {data?.diplomes.length === 0 ? (
                        <li className="flex justify-between text-gray-400">
                          {t("noDiploma")}
                        </li>
                      ) : (
                        data?.diplomes.map((dpl, i) => (
                          <li
                            key={i}
                            className="flex justify-between text-gray-400"
                          >
                            <div className="flex gap-2">
                              <span>{dpl.Diplome}</span>
                              <span>- {dpl.Ecole}</span>
                            </div>
                            <span>
                              {dayjs(dpl.Date_debut).format("D MMM YYYY")} -{" "}
                              {dayjs(dpl.Date_fin).format("D MMM YYYY")}
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </motion.div>

                {/* Compétences et Langues */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="border border-dashed border-gray-200 rounded-md p-4 space-y-4"
                >
                  {/* Compétences */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-600">
                      {t("skills")}
                    </h5>
                    <ul className="space-y-2 text-gray-400">
                      {data?.competences.length === 0 ? (
                        <li className="flex justify-between text-gray-400">
                          {t("noSkill")}
                        </li>
                      ) : (
                        data?.competences.map((cmpt, i) => (
                          <li
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <span>{cmpt.Competence}</span>
                            <span className="flex gap-1">
                              {[...Array(5)].map((_, index) => (
                                <img
                                  key={index}
                                  src={
                                    index < cmpt.note
                                      ? "/img/star.png"
                                      : "/img/star-empty.png"
                                  }
                                  alt="star"
                                  className="w-5 h-5"
                                />
                              ))}
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* Langues */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-600">
                      {t("languages")}
                    </h5>
                    <ul className="space-y-2 text-gray-400">
                      {data?.langues.length === 0 ? (
                        <li className="flex justify-between text-gray-400">
                          {t("noLanguage")}
                        </li>
                      ) : (
                        data?.langues.map((lng, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{lng.Langue}</span>
                            <span className="flex gap-1">
                              {[...Array(5)].map((_, index) => (
                                <img
                                  key={index}
                                  src={
                                    index < lng.note
                                      ? "/img/star.png"
                                      : "/img/star-empty.png"
                                  }
                                  alt="star"
                                  className="w-5 h-5"
                                />
                              ))}
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormateurDrawer;
