import { useEffect, useState } from 'react';
import { FaCheck, FaExclamation, FaTimes } from 'react-icons/fa';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '../../../Hooks/Api';

dayjs.locale('fr');

const PresenceSheet = ({ id, isOpen, onClose }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const endpoint = import.meta.env.VITE_ENDPOINT_IMG;
  const [session, setSession] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { callApi } = useApi();
  const [presenceMap, setPresenceMap] = useState({});
  const [reload,setReload] = useState(1);



  useEffect(() => {
    if (!isOpen || !id) return;

    const openPresenceDrawer = async (id) => {
      setData([]);
      setSession(null);
      setError(null);

      if (!id.idProjet) return;

      try {
        setLoading(true);
        const url = id.idCfp_inter
          ? `/cfp/projet/apprenants/getApprAddedInter/${id.idProjet}`
          : `/cfp/projet/apprenants/getApprenantAdded/${id.idProjet}`;

        const [result, res] = await Promise.all([
          callApi(`/cfp/projets/${id.idProjet}/getDataPresence`),
          callApi(url)
        ]);

        if (!result) return;

        setSession(result.seances);
        setData(res);
        setPresenceMap(() => {
          const map = {};
          res.getPresence?.forEach(v_gp => {
            const key = `${v_gp.idSeance}_${v_gp.idEmploye}`;
            map[key] = v_gp.isPresent;
          });
          return map;
        });
      } catch (error) {
        console.error("Erreur lors du chargement des données de présence", error);
        setError("Impossible de charger les données. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    openPresenceDrawer(id);
  }, [isOpen, id,reload]);


const handleCheckboxChange = (dayId, apprenticeId) => {
  const key = `${dayId}_${apprenticeId}`;
  setSelectedCheckboxes(prev => {
    const updated = { ...prev };
    if (updated[key]) {
      delete updated[key]; // ❌ on supprime si déjà coché
    } else {
      updated[key] = true; // ✅ on coche
    }
    return updated;
  });
};

  // const handleCheckboxChange = (dayId, apprenticeId) => {
  //   const key = `${dayId}_${apprenticeId}`;
  //   setSelectedCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
  // };

  const handleSelectAll = () => {
    const newSelected = {};
    const newSelectAll = !selectAll;

    if (newSelectAll) {
      data?.countDate?.forEach(day => {
        data?.apprs?.forEach(apprentice => {
          newSelected[`${day.idSeance}_${apprentice.idEmploye}`] = true;
        });
      });
    }

    setSelectAll(newSelectAll);
    setSelectedCheckboxes(newSelected);
  };

  const handleDaySelect = (dayId) => {
    const allChecked = data?.apprs?.every(appr => selectedCheckboxes[`${dayId}_${appr.idEmploye}`]);
    const newSelected = { ...selectedCheckboxes };

    data?.apprs?.forEach(appr => {
      newSelected[`${dayId}_${appr.idEmploye}`] = !allChecked;
    });

    setSelectedCheckboxes(newSelected);
  };


const confirmChecking = async (status, projectId) => {
  try {
    const formatSelectedCheckboxes = () => {
      return Object.entries(selectedCheckboxes)
        .map(([key]) => {
          const [dayId, apprenticeId] = key.split('_');
          return {
            idEmploye: parseInt(apprenticeId),
            idSeance: parseInt(dayId),
            isPresent: status,
            idProjet: projectId
          };
        });
    };

    const dataToSend = formatSelectedCheckboxes();
console.log(JSON.stringify(dataToSend));
    if (dataToSend.length === 0) {
      console.warn("Aucune case cochée !");
      return;
    }

    const res = await callApi('/cfp/emargement', {
      method: 'POST',
      body: JSON.stringify(dataToSend)
    });

    console.log(res); // Debug de la réponse

if (res?.success === 'Succès') {
  setReload((v) => v + 1);
  setSelectedCheckboxes({});
}

  } catch (error) {
    console.error("Erreur lors de la validation :", error);
  }
};


console.log(data);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 z-50 w-full max-w-7xl h-full bg-white shadow-lg overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-600">Fiche de présence</h2>
            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded" onClick={onClose}>
              <FaTimes className="text-xl" />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Messages de chargement / erreur / pas de session */}
            {loading ? (
              <div className="text-center py-10 text-gray-500 italic">
                Chargement des données de présence...
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-500 text-center py-4 rounded border border-red-200">
                {error}
              </div>
            ) : session === null ? (
              <div className="text-center py-10 text-gray-400 italic">
                Pas de session pour ce projet
              </div>
            ) : (
              <>
                {/* Légendes */}
                <div className="flex flex-wrap justify-between gap-4">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2 text-green-600 font-medium"><FaCheck /> Présent {data?.percentPresent}</div>
                    <div className="flex items-center gap-2 text-yellow-500 font-medium"><FaExclamation /> Partiellement {data?.percentPartiel}</div>
                    <div className="flex items-center gap-2 text-red-400 font-medium"><FaTimes /> Absent {data?.percentAbsent}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-2 text-gray-400"><div className="w-4 h-4 bg-gray-400 rounded"></div> Non défini</span>
                    <span className="flex items-center gap-2 text-green-400"><div className="w-4 h-4 bg-green-400 rounded"></div> Présent</span>
                    <span className="flex items-center gap-2 text-yellow-400"><div className="w-4 h-4 bg-yellow-400 rounded"></div> Partiellement</span>
                    <span className="flex items-center gap-2 text-red-400"><div className="w-4 h-4 bg-red-400 rounded"></div> Absent</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 items-center">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-600">Tout sélectionner</span>
                  </label>

                  <button
                    onClick={() => confirmChecking(3, id.idProjet)}
                    className="px-4 py-2 text-sm font-medium text-green-700 border border-green-700 rounded-lg hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    Présent
                  </button>

                  <button
                    onClick={() => confirmChecking(1, id.idProjet)}
                    className="px-4 py-2 text-sm font-medium text-red-700 border border-red-700 rounded-lg hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Absent
                  </button>

                  <button
                    onClick={() => confirmChecking(2, id.idProjet)}
                    className="px-4 py-2 text-sm font-medium text-yellow-500 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    Partiellement
                  </button>
                </div>


                {/* Tableau */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm text-sm">
                  <table className="min-w-full text-gray-700">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-3 text-left font-semibold">Apprenant</th>
                        {data?.getSeance?.map(day => (
                          <th key={day.idSeance} className="p-3 text-center font-semibold">
                            <div>{dayjs(day.dateSeance).format("DD MMM YYYY")}</div>
                            <input
                              type="checkbox"
                              onClick={() => handleDaySelect(day.idSeance)}
                              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </th>
                        ))}
                      </tr>
                      <tr className="bg-white text-gray-500">
                        <td className="p-3 font-medium">Heure début</td>
                        {data?.getSeance?.map(day => (
                          <td key={`start-${day.idSeance}`} className="p-3 text-center">{day.heureDebut}</td>
                        ))}
                      </tr>
                      <tr className="bg-white text-gray-500 border-b border-gray-200">
                        <td className="p-3 font-medium">Heure fin</td>
                        {data?.getSeance?.map(day => (
                          <td key={`end-${day.idSeance}`} className="p-3 text-center">{day.heureFin}</td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.apprs?.length === 0 ? (
                        <tr>
                          <td colSpan={data?.countDate?.length + 1} className="text-center py-6 text-gray-400 italic">
                            Aucun apprenant trouvé
                          </td>
                        </tr>
                      ) : (
                        data?.apprs?.map(apprentice => (
                          <tr key={apprentice.idEmploye} className="border-b hover:bg-gray-50">
                            <td className="p-3 flex items-center gap-3 font-medium text-gray-800">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden text-sm font-semibold uppercase text-gray-600">
                                {apprentice.emp_photo ? (
                                  <img
                                    src={`${endpoint}/img/employes/${apprentice.emp_photo}`}
                                    alt=""
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  `${apprentice.emp_name[0]}${apprentice.emp_firstname[0]}`
                                )}
                              </div>
                              {apprentice.emp_name} {apprentice.emp_firstname}
                            </td>
                            {data.getSeance.map(day => {
                              
                              const key = `${day.idSeance}_${apprentice.idEmploye}`;
                             const rawStatus = presenceMap[key];
                              const status = rawStatus === null || rawStatus === undefined ? 'undefined' : parseInt(rawStatus);
                              const isChecked = selectedCheckboxes[key] || false;
                              const getStatusColor = (status) => {
                                switch (status) {
                                  case 3: return 'bg-green-500 border-green-600'; // Présent
                                  case 2: return 'bg-yellow-400 border-yellow-500'; // Partiel
                                  case 1: return 'bg-red-500 border-red-600'; // Absent
                                  case 'undefined': return 'bg-gray-300 border-gray-400'; // Non défini (null)
                                  default: return 'bg-gray-300 border-gray-400';
                                }
                              };

                              return (
                                <td key={key} className="text-center p-3">
                                  <label className="flex items-center justify-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleCheckboxChange(day.idSeance, apprentice.idEmploye)}
                                      
                                      className={` hidden  `}
                                    />

                                    <div
                                      className={`w-6 h-6 flex items-center justify-center rounded-md border transition-colors duration-200  ${getStatusColor(status)} ${
                                        isChecked ? 'bg-green-500 border-green-600' : 'bg-gray-200 border-gray-300'
                                      }`}
                                    >
                                      <FaCheck className={`text-white text-xs ${isChecked ? 'block' : 'hidden'}`} />
                                    </div>
                                  </label>
                                </td>
                              );
                            })}

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PresenceSheet;
