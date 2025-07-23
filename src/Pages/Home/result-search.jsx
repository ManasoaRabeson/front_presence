import { useState ,  useEffect, useRef  } from "react";
import EntrepriseDrawer from "./Drawer/entreprise-drawer";
import ApprenantDrawer from "./Drawer/apprenant-drawer";
import FormateurDrawer from "./Drawer/formateur-drawer";
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Pour les mois en français
dayjs.locale('fr');
import { motion ,AnimatePresence} from "framer-motion";
import useApi from "../../Hooks/Api";
import PresenceSheet from "./Drawer/presence-drawer";


export function ResultSearch({data}) {

  const [openDrawer, setOpenDrawer] = useState(null);
   
  //const [idEntreprise,setIdEntreprise] = useState(null); 
  const entrepriseRef = useRef(null);
  const apprenantRef = useRef(null);
  const formateurRef = useRef(null);
  const base_url = "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/entreprises";
  const [entreprise, setEntreprise] = useState([]);
  const [formateur, setFormateur] = useState([]);
  const [apprenant, setApprenant] = useState([]);
  const [id,setId] = useState({
    idProjet : null,
    idCfp_inter : null
  });
   const { callApi } = useApi();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = {
        entreprise: entrepriseRef,
        apprenant: apprenantRef,
        formateur: formateurRef,
      };

      const currentRef = refs[openDrawer];

      if (
        currentRef?.current &&
        !currentRef.current.contains(event.target)
      ) {
        setOpenDrawer(null);
      }
    };

    if (openDrawer) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDrawer]);




   // Regrouper les projets par mois et année
const groupes = data.reduce((acc, projet) => {
  const cle = dayjs(projet.dateDebut).format('YYYY-MM'); // format ISO fiable pour le tri
  if (!acc[cle]) {
    acc[cle] = [];
  }
  acc[cle].push(projet);
  return acc;
}, {});
const groupesTries = Object.entries(groupes).sort((a, b) => {
  return dayjs(b[0], 'YYYY-MM').diff(dayjs(a[0], 'YYYY-MM')); // décroissant
});

  let compteur = 1;

  console.log(groupesTries);



  const hanldeOpenDrawer = (role, id = null,idCfp_inter = null) => {
    if(role ==="entreprise"){
      openEntrepriseDrawer(id,role);
    }
    if(role ==="apprenant"){
      setApprenant(id);
      setOpenDrawer(role);
    }
    if(role ==="presence"){
      setId({
        idProjet: id,
        idCfp_inter: idCfp_inter
      });
      setOpenDrawer(role);
      // openPresenceDrawer(id,role,idCfp_inter);
    }
    if(role ==="formateur"){
      openFormateurDrawer(id,role);
    }

};

  const openEntrepriseDrawer = async (idEtp,role) => {
  setEntreprise([]); // Clear les anciennes données
  try {
    const res = await callApi(`/cfp/etp-drawer/${idEtp}`);
    setEntreprise(res);
    setOpenDrawer(role);
  } catch (error) {
    console.error("Erreur chargement entreprise", error);
  }
};
  const openFormateurDrawer = async (idFormateur,role) => {
  setFormateur([]); // Clear les anciennes données
  try {
    const res = await callApi(`/employes/projets/${idFormateur}/mini-cv`);
    setFormateur(res);
    setOpenDrawer(role);
  } catch (error) {
    console.error("Erreur chargement entreprise", error);
  }
};
// const openPresenceDrawer = async (idProjet, role, idCfp_inter) => {
//   setPresence([]);

//   if (!idProjet) return;

//   try {
//     const url = idCfp_inter
//       ? `/cfp/projet/apprenants/getApprAddedInter/${idProjet}`
//       : `/cfp/projet/apprenants/getApprenantAdded/${idProjet}`;

//     const [result, res] = await Promise.all([
//       callApi(`/cfp/projets/${idProjet}/getDataPresence`),
//       callApi(url)
//     ]);

//     if (!result) return;

//     setSession(result.seances);
//     setPresence(res);
//     setOpenDrawer(role);

//   } catch (error) {
//     console.error("Erreur lors du chargement des données de présence", error);
//     // alert("Impossible de charger les données. Veuillez réessayer.");
//   }
// };

  return (

  <>
  {groupesTries.length === 0 && 
  <div className="flex items-center justify-center h-64">
   <p className="text-gray-500 text-lg">Aucun résultat</p>
  </div>
  }
  <AnimatePresence>
  {groupesTries.map((nombre,index)=>(
    // <div key={index} id="toggleFilter" className="w-full px-4 py-6 bg-white rounded-2xl shadow-md">
<motion.div
  key={index}
  id="toggleFilter"
  className="w-full px-4 py-6 bg-white rounded-2xl shadow-md"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{
    duration: 0.3,
    ease: "easeOut",
    delay: index * 0.05,
  }}
>



      {/* Titre */}
      <ul className="w-full mb-4">
        <li className="text-2xl font-semibold p-4 bg-slate-100 rounded-xl text-slate-700 shadow-sm">
          📅 {dayjs(nombre[0], 'YYYY-MM').format('MMMM YYYY')}
        </li>
      </ul>

      {/* Tableau */}
      <div className="overflow-x-auto">
        
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3 w-1/4">Formation</th>
              <th className="px-4 py-3 w-[15%]">Date</th>
              <th className="px-4 py-3 w-[8%]">Entreprise</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Type de projet</th>
              <th className="px-4 py-3">Modalité</th>
              <th className="px-4 py-3">Apprenants</th>
              <th className="px-4 py-3">Formateurs</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {nombre[1].map((projet,i)=>(
            <tr key={i} className=" transition duration-300 border-b">
              <td className="px-4 py-3">{compteur++}</td>
              <td className="px-4 py-3 text-black font-semibold cursor-pointer ">
                {projet.module_name}
              </td>
              <td className="px-4 py-3 text-base font-semibold"><span>
                {dayjs(projet.dateDebut).format("DD MMM YYYY")} - {dayjs(projet.dateFin).format("DD MMM YYYY")}
              </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex -space-x-2" onClick={() => hanldeOpenDrawer("entreprise",projet.idEtp)}>
                  {projet.etp_logo ? 
                  <img
                    className="h-8 w-[52px] object-cover grayscale hover:grayscale-0 rounded-xl ring-2 ring-white shadow cursor-pointer transition duration-200"
                    src={`${base_url}/${projet.etp_logo}`}
                    alt="logo entreprise"
                  /> : 
                  <img className="inline-block h-[30px] w-[53.2px] rounded-xl ring-2 ring-white text-slate-600 bg-slate-200 flex font-bold items-center justify-center uppercase"/>
                  }
                </div>
                
              </td>
              <td className="px-4 py-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-white text-base  font-semibold shadow-md
                  ${
                    projet.project_status === "Cloturé"
                      ? " bg-[#6F1926]"
                      : projet.project_status === "encours"
                      ? "bg-[#369ACC]"
                      : projet.project_status === "Terminé"
                      ? "bg-[#95CF92]"
                      : "bg-gray-400 text-gray-800"
                  }
                `}
              >
                {projet.project_status.charAt(0).toUpperCase() + projet.project_status.slice(1)}
              </span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-3 py-1 rounded-full text-base text-[#1565c0] bg-[#1565c0]/10">
                  {projet.project_type}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-3 py-1 rounded-full text-base text-[#00b4d8] bg-[#00b4d8]/10">
                  {projet.modalite}
                </span>
              </td>
              <td className="px-4 py-3">
                {/* <div className="flex -space-x-3 rtl:space-x-reverse cursor-pointer" onClick={() => hanldeOpenDrawer("apprenant",projet)}>
                  {["A", "L", "R"].map((letter, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-sm font-semibold shadow"
                    >
                      {letter}
                    </div>
                  ))}
                  <div className="w-8 h-8 bg-neutral text-white rounded-full flex items-center justify-center text-sm font-semibold shadow">
                    +6
                  </div>


                </div> */}
                <div
                  className="flex -space-x-3 rtl:space-x-reverse cursor-pointer"
                  onClick={() => hanldeOpenDrawer("apprenant", projet)}
                >
                  {/* {projet.apprs.slice(0, 3).map((apprenant, idx) => (
                    <img
                      key={idx}
                     src={`https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/employes/${apprenant?.emp_photo}`}
                     alt={apprenant.emp_name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow object-cover"
                    />
                  ))} */}
                  {projet.apprs.slice(0, 3).map((apprenant, idx) => (
                    <div key={apprenant.id || idx}>
                      {apprenant.emp_photo ? (
                        <img
                         src={`https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/employes/${apprenant?.emp_photo}`}
                          alt={apprenant.emp_name}
                          onError={(e) => { e.target.onerror = null; e.target.src = ""; }}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md object-cover bg-slate-100"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-slate-300 text-slate-700 rounded-full flex items-center justify-center text-sm font-semibold border-2 border-white shadow-md">
                          {(apprenant.emp_name?.charAt(0) || '?').toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}

                  {projet.apprs.length > 3 && (
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold tracking-tight shadow-md border-2 border-white">
                      +{projet.apprs.length - 3}
                    </div>
                  )}

                  {projet.apprs.length > 3 && (
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold tracking-tight shadow-md border-2 border-white">
                      +{projet.apprs.length - 3}
                    </div>
                  )}
                </div>

              </td>
              <td className="px-4 py-3">
                <div
                  className="flex -space-x-3 rtl:space-x-reverse cursor-pointer"
                >
                  {projet.formateurs.slice(0, 3).map((formateurs, idx) => (
                    <div key={formateurs.idFormateur || idx} onClick={() => hanldeOpenDrawer("formateur", formateurs.idFormateur)}>
                      {formateurs.form_photo ? (
                        <img
                         src={`https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/${formateurs?.form_photo}`}
                          alt={formateurs.form_name}
                          onError={(e) => { e.target.onerror = null; e.target.src = ""; }}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md object-cover bg-slate-100"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-slate-300 text-slate-700 rounded-full flex items-center justify-center text-sm font-semibold border-2 border-white shadow-md">
                          {(formateurs.form_name?.charAt(0) || '?').toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* {projet.apprs.length > 3 && (
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold tracking-tight shadow-md border-2 border-white">
                      +{projet.apprs.length - 3}
                    </div>
                  )}

                  {projet.apprs.length > 3 && (
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold tracking-tight shadow-md border-2 border-white">
                      +{projet.apprs.length - 3}
                    </div>
                  )} */}
                </div>

              </td>
              <td className="px-4 py-3">
                <button 
                  onClick={()=>hanldeOpenDrawer("presence",projet.idProjet,projet.idCfp_inter)}
                  className=" font-bold px-4 py-1.5 text-sm border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-200 transition duration-200">
                  Présence
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </motion.div>))}
    </AnimatePresence>
    {openDrawer === "entreprise" &&<EntrepriseDrawer
      entreprise={entreprise}
      ref={entrepriseRef}
      isOpen={openDrawer === "entreprise"}
      onClose={() => setOpenDrawer(null)}
    />}
    {openDrawer === "apprenant" &&
    <ApprenantDrawer
      ref={apprenantRef}
      isOpen={openDrawer === "apprenant"}
      onClose={() => setOpenDrawer(null)}
      module={apprenant}
    />}
    {openDrawer === "formateur" && 
    <FormateurDrawer
      data={formateur}
      ref={formateurRef}
      isOpen={openDrawer === "formateur"}
      onClose={() => setOpenDrawer(null)}
    />}
    {openDrawer === "presence" && 
    <PresenceSheet 
      id={id}
      isOpen={openDrawer === "presence"}
      onClose={() => setOpenDrawer(null)}
    />
    }


  </>
  );
}
