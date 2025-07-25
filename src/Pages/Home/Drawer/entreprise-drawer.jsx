
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import useApi from '../../../Hooks/Api';

const EntrepriseDrawer = (({  idEtp,isOpen, onClose }, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [entreprise, setEntreprise] = useState([]);
  const { callApi } = useApi();
  const endpoint = import.meta.env.VITE_ENDPOINT_IMG;
  
  useEffect(()=>{
  if (!isOpen || !idEtp) return;  
  const openEntrepriseDrawer = async (idEtp) => {
  setIsLoading(true);
  setEntreprise([]); // Clear les anciennes données
  try {
    const res = await callApi(`/cfp/etp-drawer/${idEtp}`);
    setEntreprise(res);
  } catch (error) {
    console.error("Erreur chargement entreprise", error);
  } finally {
    setIsLoading(false); 
  }
  };
  openEntrepriseDrawer(idEtp);
  },[idEtp,isOpen]);

  if (!isOpen) return null;
  console.log(entreprise);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-[70em] bg-white shadow-xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="absolute top-1 right-1 flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
  
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center bg-white/70">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-[6px] border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-lg font-semibold tracking-wide">Chargement en cours...</p>
                </div>
              </div>
            ) : (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col w-full mt-12"
              >
                {/* Profil Entreprise */}
                <div className="w-full p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[116px] h-[77px] bg-white flex items-center justify-center p-1">
                      {entreprise?.customer?.logo ? (
                        <img
                          className="object-cover w-full h-auto rounded-xl"
                          src={`${endpoint}/img/entreprises/${entreprise?.customer?.logo}`}
                          alt="Logo entreprise"
                        />
                      ) : (
                        <img
                          className="object-cover w-full h-auto rounded-xl"
                          src={`no_img.svg`}
                          alt="Logo entreprise"
                        />
                      )}

                    </div>
                    <div className="flex flex-col justify-start gap-y-2 w-full">
                      <h3 className="text-2xl font-bold text-gray-700">{entreprise?.customer?.customerName}</h3>
                      <p className="text-base text-gray-500">{entreprise?.customer?.siteWeb}</p>
                    </div>
                  </div>
                </div>

                {/* Référent principal */}
                <div className="w-full px-4">
                  <p className="text-xl font-semibold text-gray-900 mb-2">Référent principal</p>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-2xl">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        <i className="fa-solid fa-user mr-1"></i>
                        {entreprise?.referents[0]?.name || ''} {entreprise?.referents[0]?.firstName || ''} {entreprise?.referents[0]?.fonction || ''}
                      </p>
                      <p className="text-sm text-gray-500">
                        <i className="fa-solid fa-envelope mr-1"></i>
                        {entreprise?.referents[0]?.email || ''}
                      </p>
                      <p className="text-sm text-gray-500">
                        <i className="fa-solid fa-phone mr-1"></i>
                        {entreprise?.referents[0]?.phone || ''}
                      </p>
                    </div>
                  </div>

                  {/* Autres référents */}
                  <div className="mt-4">
                    <p className="text-xl font-semibold text-gray-900 mb-2">Autres référents</p>
                    {entreprise?.referents?.slice(1).map((referent, i) => (
                      <li key={i} className="pt-3 pb-0 sm:pt-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {referent.photo ? (
                              <img
                                className="w-10 h-10 rounded-full"
                                src={`https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/employes/${referent.photo}`}
                                alt={referent.name || ''}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full text-gray-500 font-bold text-2xl text-center bg-gray-200 relative">
                                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  {referent.name ? referent.name.charAt(0) : 'I'}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              <i className="fa-solid fa-user text-sm mr-1" />
                              {referent.name || ''} {referent.firstName || ''}{' '}
                              {referent.fonction ? `(${referent.fonction})` : ''}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              <i className="fa-solid fa-envelope text-sm mr-1" />
                              {referent.email || '--'}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              <i className="fa-solid fa-phone text-sm mr-1" />
                              {referent.phone || '--'}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>

                  {/* Projets */}
                  {entreprise.projects_future?.length !== 0 && (
                    <TableProject data={entreprise.projects_future} etat="Planifié" />
                  )}
                  {entreprise.projects_in_preparation?.length !== 0 && (
                    <TableProject data={entreprise.projects_in_preparation} etat="En préparation" />
                  )}
                  {entreprise.projects_in_progress?.length !== 0 && (
                    <TableProject data={entreprise.projects_in_progress} etat="En cours" />
                  )}
                  {entreprise.projects_finished?.length !== 0 && (
                    <TableProject data={entreprise.projects_finished} etat="Terminé" />
                  )}
                  {entreprise.projects_fenced?.length !== 0 && (
                    <TableProject data={entreprise.projects_fenced} etat="Clôturé" />
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default EntrepriseDrawer ;
function TableProject({ data, etat }) {
  const colorClass = {
    Clôturé: "bg-[#6F1926]",
    "En cours": "bg-[#369ACC]",
    "En préparation": "bg-[#F8E16F] text-gray-800",
    Planifié: "bg-[#CBABD1]",
    Terminé: "bg-[#95CF92]",
  }[etat] || "bg-gray-400 text-white";

  return (
    <>
      <div className="mt-6">
        <span className={`text-sm text-white font-medium inline-block rounded-full py-1 px-4 ${colorClass}`}>
          {etat}
        </span>
      </div>

      <div className="mt-2 overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Cours</th>
              <th className="px-4 py-2">Ref</th>
              <th className="px-4 py-2">Lieu</th>
              <th className="px-4 py-2 text-center">
                <i className="fa-solid fa-user"></i>
              </th>
              <th className="px-4 py-2">Montant (Ar)</th>
              <th className="px-4 py-2">
                <i className="fa-solid fa-money-bill-transfer"></i>
              </th>
              <th className="px-4 py-2">Début - Fin</th>
              <th className="px-4 py-2 text-center">Détail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((project, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{project.module_name}</td>
                <td className="px-4 py-2">{project.project_reference}</td>
                <td className="px-4 py-2">{project.ville}</td>
                <td className="px-4 py-2 text-center">{project.total_apprenant}</td>
                <td className="px-4 py-2">{project.total_ht}</td>
                <td className="px-4 py-2 text-center">
                  {project.isPaid ? (
                    <i className="fa-solid fa-circle-check text-green-500" title="Payé"></i>
                  ) : (
                    <i className="fa-solid fa-circle-question text-gray-400" title="Non facturé"></i>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{project.date_debut} - {project.date_fin}</td>
                <td className="px-4 py-2 text-center">
                  <a href={`/cfp/projets/${project.id}/detail`}>
                    <i className="fa-solid fa-eye text-gray-500 hover:text-indigo-600"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


