import React, { useState, useContext, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import GlobalModal from './AddApprenantModal';
import axiosClient from '../axios';
import { useProjectContext } from '../contexte/ProjectApprFiltreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ViewContext } from '../contexte/ViewContext';
import { SearchContext } from '../contexte/SearchContext';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { ApprenantContext } from '../contexte/ApprenantContexte';
import ApprenantsList from '../Pages/CFP/DashboardCFP';


function Layout({ children }) {

const{setApprFiltre} = useContext(ApprenantContext);
const { apprFiltre } = useContext(ApprenantContext);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearchTerm } = useContext(SearchContext);
  const { setView, view } = useContext(ViewContext);
  const [companiesList, setCompaniesList] = useState([]);
  const [filteredCompaniesList, setFilteredCompaniesList] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [coursesList, setCoursesList] = useState([]);
  const [filteredCoursesList, setFilteredCoursesList] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [modalitiesList, setModalitiesList] = useState([]); // Nouvelle state pour la liste des modalités
  const [filteredModalitiesList, setFilteredModalitiesList] = useState([]); // Nouvelle state pour la liste filtrée des modalités
  const [selectedModalities, setSelectedModalities] = useState([]); // Nouvelle state pour les modalités sélectionnées
  const [modalitySearchTerm, setModalitySearchTerm] = useState(''); // Nouvelle state pour la recherche de modalités
  const [statusList, setStatusList] = useState([]); // Nouvelle state pour la liste des statuts
  const [filteredStatusList, setFilteredStatusList] = useState([]); // Nouvelle state pour la liste filtrée des statuts
  const [selectedStatus, setSelectedStatus] = useState([]); // Nouvelle state pour les statuts sélectionnés
  const [statusSearchTerm, setStatusSearchTerm] = useState(''); // Nouvelle state pour la recherche de statuts
  const [periodesList, setPeriodesList] = useState([]); // Nouvelle state pour la liste des périodes
  const [selectedPeriodes, setSelectedPeriodes] = useState(''); // Nouvelle state pour les périodes sélectionnées
  const { t, i18n } = useTranslation();
   

  const {companyFilter, setCompanyFilter} = useState('');
  const {courseFilter, setCourseFilter} = useState('');
  const {modalityFilter, setModalityFilter} = useState('');
  const {statusFilter, setStatusFilter} = useState('');
  const {periodeFilter, setPeriodeFilter} = useState('');


  const { projetsapprfiltre, setProjetsApprfiltre } = useProjectContext();
  

  const onSearchChange = async (
    companyFilter, 
    courseFilter, 
    modalityFilter, 
    statusFilter, 
    periodeFilter
  ) => {
    try {
      const params = new URLSearchParams({
        idEtp: (companyFilter || []).join(','),       // Entreprises
        idModule: (courseFilter || []).join(','),     // Modules
        idModalite: (modalityFilter || []).join(','), // Modalités
        idStatut: (statusFilter || []).join(','),     // Statuts
        idPeriode: periodeFilter || ''                // Période
      });
  
      const response = await axiosClient.get(`/cfp/apprenants/filter/items?${params.toString()}`);
      
      setApprFiltre(response.data.apprs);
      
    } catch (error) {
      console.error("Erreur lors du filtrage :", error);
    }
  };
  // useEffect(() => {
  //   if (apprFiltre.length > 0) {
      
    
  //     apprFiltre.forEach((apprenant) => {
       
  //       axiosClient.get(`/cfp/etp-drawers/apprenant/${apprenant.idEmploye}`)
  //         .then((response) => {
  //           console.log(`Projets récupérés pour ${apprenant.emp_name}:`, response.data);
  //           setProjetsApprfiltre((prevProjects) => ({
  //             ...prevProjects,
  //             [apprenant.idEmploye]: {
  //               preparation: response.data.projects_in_preparation || [],
  //               future: response.data.projects_future || [],
  //               progress: response.data.projects_in_progress || [],
  //               finished: response.data.projects_finished || [],
  //               fenced: response.data.projects_fenced || [],
  //             },
  //           }));
          
  //         })
  //         .catch((error) => {
  //           console.error(`Erreur lors de la récupération des projets pour ${apprenant.emp_name}:`, error);
            
  //         });
  //     });
  //   }
  // }, [apprFiltre]);
  

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axiosClient.get('/cfp/apprenants/filter/dropdown');
        setCompaniesList(response.data?.etps || []);
        setFilteredCompaniesList(response.data?.etps || []);
        setCoursesList(response.data?.modules || []);
        setFilteredCoursesList(response.data?.modules || []);
        setModalitiesList(response.data?.modalites || []);
        setFilteredModalitiesList(response.data?.modalites || []);
        setStatusList(response.data?.status || []);
        setFilteredStatusList(response.data?.status || []);
  
        const periodesData = [
          response.data?.periodePrev3 ? { ...response.data.periodePrev3 } : { p_id_periode: 'prev_3_month', emp_nb: 0 },
          response.data?.periodePrev6 ? { ...response.data.periodePrev6 } : { p_id_periode: 'prev_6_month', emp_nb: 0 },
          response.data?.periodePrev12 ? { ...response.data.periodePrev12 } : { p_id_periode: 'prev_12_month', emp_nb: 0 },
          response.data?.periodeNext3 ? { ...response.data.periodeNext3 } : { p_id_periode: 'next_3_month', emp_nb: 0 },
          response.data?.periodeNext6 ? { ...response.data.periodeNext6 } : { p_id_periode: 'next_6_month', emp_nb: 0 },
          response.data?.periodeNext12 ? { ...response.data.periodeNext12 } : { p_id_periode: 'next_12_month', emp_nb: 0 },
        ];
        setPeriodesList(periodesData);
  
      } catch (error) {
        console.error("Erreur lors de la récupération des données du dropdown :", error);
        // Gérer l'erreur ici
      }
    };
  
    fetchDropdownData();
  }, []);


  useEffect(() => {
    const filteredList = modalitiesList.filter((modality) =>
      modality.project_modality?.toLowerCase().includes(modalitySearchTerm.toLowerCase())
    );
    setFilteredModalitiesList(filteredList);
  }, [modalitySearchTerm, modalitiesList]);

 
  useEffect(() => {
    const filteredList = companiesList.filter((company) =>
      company.etp_name?.toLowerCase().includes(companySearchTerm.toLowerCase())
    );
    setFilteredCompaniesList(filteredList);
  }, [companySearchTerm, companiesList]);



  useEffect(() => {
    const filteredList = coursesList.filter((course) =>
      course.module_name?.toLowerCase().includes(courseSearchTerm.toLowerCase())
    );
    setFilteredCoursesList(filteredList);
  }, [courseSearchTerm, coursesList]);

  useEffect(() => {
    const filteredList = statusList.filter((status) =>
      status.project_status?.toLowerCase().includes(statusSearchTerm.toLowerCase())
    );
    setFilteredStatusList(filteredList);
  }, [statusSearchTerm, statusList]);

  const handleFilterToggle = (isVisible) => {
    setIsFilterVisible(isVisible);
  };

  // const handleGlobalSearchChange = (event) => {
  //   const newValue = event.target.value;
  //   setSearchQuery(newValue)
  //   setSearchTerm(newValue);
  //   onSearchChange(
  //     newValue,
  //     companyFilter,
  //     courseFilter,
  //     modalityFilter,
  //     statusFilter,
  //     periodeFilter
  //   );
  // };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchTerm(event.target.value);
   
  };
  

  const handleStatusCheckboxChange = (event) => {
    const status = event.target.value;
    const isChecked = event.target.checked; 
    const newSelectedStatus = isChecked
      ? [...selectedStatus, status]
      : selectedStatus.filter((s) => s !== status);
  
    setSelectedStatus(newSelectedStatus);
    
    onSearchChange(
      
      selectedCompanies,
      selectedCourses,
      selectedModalities,
      newSelectedStatus,
      selectedPeriodes
    );
    if (!isChecked) {
      window.location.reload();
    }
  };
  
  const handleClearStatusFilter = () => {
    setSelectedStatus([]); // Réinitialise le state des statuts
    
    onSearchChange(
      
      selectedCompanies || [], // Entreprises
      selectedCourses || [],   // Modules
      selectedModalities || [],// Modalités
      [],                      // Statuts vidés
      selectedPeriodes         // Période
    );
  };

  

  const handleListView = () => {
    setView('list');
  };

  const handleCardView = () => {
    setView('card');
  };

  const handleResetFilter = () => {
    window.location.reload();
  };

  const handleCompanyCheckboxChange = (event) => {
    const companyId = parseInt(event.target.value);
    const isChecked = event.target.checked;
  
    const newSelectedCompanies = isChecked
      ? [...selectedCompanies, companyId]
      : selectedCompanies.filter((id) => id !== companyId);
  
    setSelectedCompanies(newSelectedCompanies);
    
    // Envoyer les filtres mis à jour
    onSearchChange(
      
      newSelectedCompanies, // Entreprises
      selectedCourses,      // Modules
      selectedModalities,   // Modalités
      selectedStatus,       // Statuts
      selectedPeriodes      // Période
    );

    if (!isChecked) {
      window.location.reload();
    }
  };

const handleClearCompanyFilter = () => {
  setSelectedCompanies([]);
  onSearchChange(
    
    [], // companies vide
    selectedCourses || [],
    selectedModalities || [],
    selectedStatus || [],
    selectedPeriodes
  );
};

  const handleCompanySearchInputChange = (event) => {
    setCompanySearchTerm(event.target.value);
  };

  const handleCourseCheckboxChange = (event) => {
    const courseId = parseInt(event.target.value);
    const isChecked = event.target.checked;
  
    const newSelectedCourses = isChecked
      ? [...selectedCourses, courseId]
      : selectedCourses.filter((id) => id !== courseId);
  
    setSelectedCourses(newSelectedCourses);
    
    onSearchChange(
      
      selectedCompanies,
      newSelectedCourses,
      selectedModalities,
      selectedStatus,
      selectedPeriodes
    );
    if (!isChecked) {
      window.location.reload();
    }
  };
  
  const handleClearCourseFilter = () => {
    setSelectedCourses([]);
    onSearchChange(
      
      selectedCompanies || [],
      [], // courses vide
      selectedModalities || [],
      selectedStatus || [],
      selectedPeriodes
    );
  };
  
  

  const handleCourseSearchInputChange = (event) => {
    setCourseSearchTerm(event.target.value);
  };

  const handleModalityCheckboxChange = (event) => {
    const modality = event.target.value;
    const isChecked = event.target.checked;
  
    const newSelectedModalities = isChecked
      ? [...selectedModalities, modality]
      : selectedModalities.filter((m) => m !== modality);
  
    setSelectedModalities(newSelectedModalities);
    
    onSearchChange(
      
      selectedCompanies,
      selectedCourses,
      newSelectedModalities,
      selectedStatus,
      selectedPeriodes
    );

    if (!isChecked) {
      window.location.reload();
    }
  };
  
  const handleClearModalityFilter = () => {
    setSelectedModalities([]); // Réinitialise le state des modalités
    
    onSearchChange(
      
      selectedCompanies || [], // Entreprises (avec fallback array)
      selectedCourses || [],   // Modules (avec fallback array)
      [],                      // Modalités vidées
      selectedStatus || [],    // Statuts (avec fallback array)
      selectedPeriodes         // Période
    );
  };

  const handlePeriodeRadioChange = (event) => {
    const periodeId = event.target.value;
    setSelectedPeriodes(periodeId);
    
    onSearchChange(
      
      selectedCompanies || [],
      selectedCourses || [],
      selectedModalities || [],
      selectedStatus || [],
      periodeId // Envoie directement la valeur (ex: "next_3_month")
    );
  
  };
  
  const handleClearPeriodeFilter = () => {
    setSelectedPeriodes(null);
    onSearchChange(
      
      selectedCompanies || [],
      selectedCourses || [],
      selectedModalities || [],
      selectedStatus || [],
      null // Envoie null plutôt qu'une chaîne vide
    );
  };

  const handleModalitySearchInputChange = (event) => {
    setModalitySearchTerm(event.target.value);
  };

  const handleStatusSearchInputChange = (event) => {
    setStatusSearchTerm(event.target.value);
  };

  const isCompanySelected = (companyId) => {
    return selectedCompanies.includes(companyId);
  };


  const isCourseSelected = (courseId) => {
    return selectedCourses.includes(courseId);
  };
  const isModalitySelected = (modality) => {
    return selectedModalities.includes(modality);
  };
  const isStatusSelected = (status) => {
    return selectedStatus.includes(status);
  };
  const isPeriodeSelected = (periodeId) => {
    return selectedPeriodes === periodeId;
  };


  const hasSelectedCompanies = selectedCompanies.length > 0;
  const hasSelectedCourses = selectedCourses.length > 0;
  const hasSelectedModalities = selectedModalities.length > 0;
  const hasSelectedStatus = selectedStatus.length > 0;
  
  const hasSelectedPeriodes = selectedPeriodes !== '';

    const [openDropdown, setOpenDropdown] = useState({
    entreprise: false,
    periode: false,
    cours: false,
    modalite: false,
    status: false,
  });

   // Référence pour détecter les clics à l'extérieur
  const dropdownRef = useRef(null);

  // Fermer les menus quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonction pour basculer l'état d'un menu
  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => ({
      ...Object.fromEntries(
        Object.keys(prev).map((key) => [key, false])
      ), // Ferme tous les autres
      [dropdown]: !prev[dropdown], // Ouvre/ferme celui cliqué
    }));
  };

 const closeAllDropdowns = () => {
  setOpenDropdown({
    entreprise: false,
    periode: false,
    cours: false,
    modalite: false,
    status: false
  });
};
  return (
    <div className=" flex flex-col bg-gray-50">
      <Navbar
        isFilterVisible={isFilterVisible}
        onFilterToggle={handleFilterToggle}
      />

        {isFilterVisible && (
      <section
        id="filterSection"
        className="p-2 bg-white shadow-md border border-gray-300 rounded-lg mt-1 mx-2"
        ref={dropdownRef}
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 bg-white rounded-lg shadow-sm p-1 mb-3">
            <div className="grid my-1 md:grid-cols-3 gap-x-2 gap-y-1">
              {/* Champ de recherche global */}
              <div className="grid col-span-1">
                <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-1 focus-within:ring-purple-500 focus-within:border-purple-500">
                  <svg
                    className="h-4 w-4 opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="text"
                    placeholder={t("search")}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="ml-2 p-1 w-full focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Filtre Entreprise */}
              <div className="relative">
                <div
                  tabIndex={0}
                  className="inline-flex items-center w-full"
                  onClick={() => toggleDropdown("entreprise")}
                >
                  <span
                    id="entreprise"
                    className={`w-full px-3 py-2 border rounded-l-md ${
                      hasSelectedCompanies
                        ? "bg-slate-700 hover:bg-slate-900 text-white border-slate-700"
                        : "border-gray-300 hover:bg-red hover:border-slate-400 text-slate-500"
                    } flex items-center justify-between cursor-pointer transition-colors duration-200`}
                  >
                    {t("companies")}
                    <i
                      className={`fa-solid fa-chevron-down transition-transform duration-200 ${
                        hasSelectedCompanies ? "text-white" : ""
                      } ${openDropdown.entreprise ? "transform rotate-180" : ""}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  {/* {hasSelectedCompanies && (
                     <div
                                            className="w-10 btnDropSelectedIcon ml-[1px] iconClose-entreprise input input-bordered bg-slate-700 hover:bg-slate-900 text-white hover:border-slate-900 cursor-pointer duration-200 rounded-r-md border-slate-700 flex items-center justify-center"
                                            onClick={handleClearCompanyFilter}
                                          >
                                            <FontAwesomeIcon icon={faXmark} className="iconClose duration-200" aria-hidden="true" />
                                          </div>
                  )} */}
                </div>

                {openDropdown.entreprise && (
                  <div
                    id="drop-entreprise"
                    className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-3"
                    
                  >
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-xl font-bold text-gray-700">
                        {t("companies")}
                      </h5>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                      <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-1 w-full">
                        <input
                          type="search"
                          id="input-entreprise"
                          className="w-full focus:outline-none"
                          placeholder="Search"
                          onChange={handleCompanySearchInputChange}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div
                      id="list-entreprise"
                      className="w-full flex flex-col space-y-2 max-h-[20em] overflow-y-auto my-2"
                    >
                      <div id="filterEntreprise">
                        {filteredCompaniesList.map((company) => (
                          <div
                            key={company.idEtp}
                            className={`etp_item_${company.idEtp} hover:bg-gray-100 rounded-md p-1`}
                          >
                            <div className="grid grid-cols-6">
                              <div
                                className="grid grid-cols-subgrid col-span-5 truncate"
                                title={company.etp_name}
                              >
                                <span className="flex items-center gap-2 px-2">
                                  <input
                                    type="checkbox"
                                    value={company.idEtp}
                                    className="w-4 h-4 cursor-pointer transition-colors duration-200 border border-gray-300 rounded-sm checked:ring-1 checked:ring-offset-1 checked:ring-[#A462A4] checked:bg-[#A462A4]"
                                    checked={isCompanySelected(company.idEtp)}
                                    onChange={handleCompanyCheckboxChange}
                                  />
                                  <p className="text-gray-500">
                                    {company.etp_name}
                                  </p>
                                </span>
                              </div>
                              <div
                                className={`cols-span-1 flex items-center justify-end nb_emp_etp_${company.idEtp}`}
                              >
                                {company.emp_nb}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre Periode */}
              <div className="relative">
                <div
                  tabIndex={0}
                  className="inline-flex items-center w-full"
                  onClick={() => toggleDropdown("periode")}
                >
                  <span
                    id="periode"
                    className={`w-full px-3 py-2 border rounded-l-md ${
                      hasSelectedPeriodes
                        ? "bg-slate-700 hover:bg-slate-900 text-white border-slate-700"
                        : "border-gray-300 hover:bg-slate-200 hover:border-slate-400 text-slate-500"
                    } flex items-center justify-between cursor-pointer transition-colors duration-200`}
                  >
                    {t("training_period")}
                    <i
                      className={`fa-solid fa-chevron-down transition-transform duration-200 ${
                        hasSelectedPeriodes ? "text-white" : ""
                      } ${openDropdown.periode ? "transform rotate-180" : ""}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  {/* {hasSelectedPeriodes && (
                    <div
                      className="absolute right-0 top-0 h-full w-10 ml-[1px] border border-slate-700 bg-slate-700 hover:bg-slate-900 text-white cursor-pointer transition-colors duration-200 rounded-r-md flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearPeriodeFilter();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="transition-colors duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  )} */}
                </div>

                {openDropdown.periode && (
                  <div
                    id="drop-periode"
                    className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-xl font-bold text-gray-700">
                        {t("training_period")}
                      </h5>
                    </div>
                    <div
                      id="list-periode"
                      className="w-full flex flex-col space-y-2 max-h-[20em] overflow-y-auto my-2"
                    >
                      <div id="filterPeriode">
                        {periodesList.map((periode) => (
                          <div
                            key={periode.p_id_periode}
                            className={`periode_item_${periode.p_id_periode?.replace(
                              /\s+/g,
                              "_"
                            )} hover:bg-gray-100 cursor-pointer rounded-md p-2`}
                          >
                            <label className="flex items-center w-full">
                              <input
                                type="radio"
                                name="periode"
                                value={periode.p_id_periode}
                                className="h-4 w-4 text-purple-500 focus:ring-purple-500 mr-2"
                                checked={isPeriodeSelected(periode.p_id_periode)}
                                onChange={handlePeriodeRadioChange}
                              />
                              <span className="flex-grow">
                                {periode.p_id_periode === "prev_3_month" &&
                                  t("last_3_months")}
                                {periode.p_id_periode === "prev_6_month" &&
                                  t("last_6_months")}
                                {periode.p_id_periode === "prev_12_month" &&
                                  t("last_12_months")}
                                {periode.p_id_periode === "next_3_month" &&
                                  t("next_3_months")}
                                {periode.p_id_periode === "next_6_month" &&
                                  t("next_6_months")}
                                {periode.p_id_periode === "next_12_month" &&
                                  t("next_12_months")}
                              </span>
                              <span className="text-gray-700 ml-2">
                                {periode.emp_nb}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre Cours */}
              <div className="relative">
                <div
                  tabIndex={0}
                  className="inline-flex items-center w-full"
                  onClick={() => toggleDropdown("cours")}
                >
                  <span
                    id="cours"
                    className={`w-full px-3 py-2 border rounded-l-md ${
                      hasSelectedCourses
                        ? "bg-slate-700 hover:bg-slate-900 text-white border-slate-700"
                        : "border-gray-300 hover:bg-slate-200 hover:border-slate-400 text-slate-500"
                    } flex items-center justify-between cursor-pointer transition-colors duration-200`}
                  >
                    {t("courses")}
                    <i
                      className={`fa-solid fa-chevron-down transition-transform duration-200 ${
                        hasSelectedCourses ? "text-white" : ""
                      } ${openDropdown.cours ? "transform rotate-180" : ""}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  {/* {hasSelectedCourses && (
                    <div
                      className="absolute right-0 top-0 h-full w-10 ml-[1px] border border-slate-700 bg-slate-700 hover:bg-slate-900 text-white cursor-pointer transition-colors duration-200 rounded-r-md flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearCourseFilter();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="transition-colors duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  )} */}
                </div>

                {openDropdown.cours && (
                  <div
                    id="drop-cours"
                    className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-xl font-bold text-gray-700">
                        {t("courses")}
                      </h5>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                      <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-1 w-full">
                        <input
                          type="search"
                          id="input-cours"
                          className="w-full focus:outline-none"
                          placeholder="Search"
                          onChange={handleCourseSearchInputChange}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div
                      id="list-cours"
                      className="w-full flex flex-col space-y-2 max-h-[20em] overflow-y-auto my-2"
                    >
                      <div id="filterCours">
                        {filteredCoursesList.map((course) => (
                          <div
                            key={course.idModule}
                            className={`cours_item_${course.idModule} hover:bg-gray-100 rounded-md p-1`}
                          >
                            <div className="grid grid-cols-1">
                              <span className="flex items-center gap-2 px-2">
                                <input
                                  type="checkbox"
                                  value={course.idModule}
                                  className="w-4 h-4 cursor-pointer transition-colors duration-200 border border-gray-300 rounded-sm checked:ring-1 checked:ring-offset-1 checked:ring-[#A462A4] checked:bg-[#A462A4]"
                                  checked={isCourseSelected(course.idModule)}
                                  onChange={handleCourseCheckboxChange}
                                />
                                <p className="text-gray-500">
                                  {course.module_name}
                                </p>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre modalité */}
              <div className="relative">
                <div
                  tabIndex={0}
                  className="inline-flex items-center w-full"
                  onClick={() => toggleDropdown("modalite")}
                >
                  <span
                    id="modalite"
                    className={`w-full px-3 py-2 border rounded-l-md ${
                      hasSelectedModalities
                        ? "bg-slate-700 hover:bg-slate-900 text-white border-slate-700"
                        : "border-gray-300 hover:bg-slate-200 hover:border-slate-400 text-slate-500"
                    } flex items-center justify-between cursor-pointer transition-colors duration-200`}
                  >
                    {t("training_method")}
                    <i
                      className={`fa-solid fa-chevron-down transition-transform duration-200 ${
                        hasSelectedModalities ? "text-white" : ""
                      } ${openDropdown.modalite ? "transform rotate-180" : ""}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  {/* {hasSelectedModalities && (
                    <div
                      className="absolute right-0 top-0 h-full w-10 ml-[1px] border border-slate-700 bg-slate-700 hover:bg-slate-900 text-white cursor-pointer transition-colors duration-200 rounded-r-md flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearModalityFilter();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="transition-colors duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  )} */}
                </div>

                {openDropdown.modalite && (
                  <div
                    id="drop-modalite"
                    className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-xl font-bold text-gray-700">
                        {t("training_method")}
                      </h5>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                      <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-1 w-full">
                        <input
                          type="search"
                          id="input-modalite"
                          className="w-full focus:outline-none"
                          placeholder="Search"
                          onChange={handleModalitySearchInputChange}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div
                      id="list-modalite"
                      className="w-full flex flex-col space-y-2 max-h-[20em] overflow-y-auto my-2"
                    >
                      <div id="filterModalite">
                        {filteredModalitiesList.map((modality) => (
                          <div
                            key={modality.project_modality}
                            className={`modalite_item_${modality.project_modality.replace(
                              /\s+/g,
                              "_"
                            )} hover:bg-gray-100 rounded-md p-1`}
                          >
                            <div className="grid grid-cols-6">
                              <div className="grid grid-cols-subgrid col-span-5 truncate">
                                <span className="flex items-center gap-2 px-2">
                                  <input
                                    type="checkbox"
                                    value={modality.project_modality}
                                    className="w-4 h-4 cursor-pointer transition-colors duration-200 border border-gray-300 rounded-sm checked:ring-1 checked:ring-offset-1 checked:ring-[#A462A4] checked:bg-[#A462A4]"
                                    checked={isModalitySelected(
                                      modality.project_modality
                                    )}
                                    onChange={handleModalityCheckboxChange}
                                  />
                                  <p className="text-gray-500">
                                    {modality.project_modality}
                                  </p>
                                </span>
                              </div>
                              <div
                                className={`cols-span-1 flex items-center justify-end nb_emp_modalite_${modality.project_modality.replace(
                                  /\s+/g,
                                  "_"
                                )}`}
                              >
                                {modality.emp_nb}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtre Status */}
              <div className="relative">
                <div
                  tabIndex={0}
                  className="inline-flex items-center w-full"
                  onClick={() => toggleDropdown("status")}
                >
                  <span
                    id="status"
                    className={`w-full px-3 py-2 border rounded-l-md ${
                      hasSelectedStatus
                        ? "bg-slate-700 hover:bg-slate-900 text-white border-slate-700"
                        : "border-gray-300 hover:bg-slate-200 hover:border-slate-400 text-slate-500"
                    } flex items-center justify-between cursor-pointer transition-colors duration-200`}
                  >
                    {t("training_status")}
                    <i
                      className={`fa-solid fa-chevron-down transition-transform duration-200 ${
                        hasSelectedStatus ? "text-white" : ""
                      } ${openDropdown.status ? "transform rotate-180" : ""}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  {/* {hasSelectedStatus && (
                    <div
                      className="absolute right-0 top-0 h-full w-10 ml-[1px] border border-slate-700 bg-slate-700 hover:bg-slate-900 text-white cursor-pointer transition-colors duration-200 rounded-r-md flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearStatusFilter();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="transition-colors duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  )} */}
                </div>

                {openDropdown.status && (
                  <div
                    id="drop-status"
                    className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full flex items-center justify-between">
                      <h5 className="text-xl font-bold text-gray-700">
                        {t("training_status")}
                      </h5>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                      <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-1 w-full">
                        <input
                          type="search"
                          id="input-status"
                          className="w-full focus:outline-none"
                          placeholder="Search"
                          onChange={handleStatusSearchInputChange}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div
                      id="list-status"
                      className="w-full flex flex-col space-y-2 max-h-[20em] overflow-y-auto my-2"
                    >
                      <div id="filterStatus">
                        {filteredStatusList.map((status) => (
                          <div
                            key={status.project_status}
                            className={`status_item_${status.project_status?.replace(
                              /\s+/g,
                              "_"
                            )} hover:bg-gray-100 rounded-md p-1`}
                          >
                            <div className="grid grid-cols-6">
                              <div className="grid grid-cols-subgrid col-span-5 truncate">
                                <span className="flex items-center gap-2 px-2">
                                  <input
                                    type="checkbox"
                                    value={status.project_status}
                                    className="w-4 h-4 cursor-pointer transition-colors duration-200 border border-gray-300 rounded-sm checked:ring-1 checked:ring-offset-1 checked:ring-[#A462A4] checked:bg-[#A462A4]"
                                    checked={isStatusSelected(
                                      status.project_status
                                    )}
                                    onChange={handleStatusCheckboxChange}
                                  />
                                  <p className="text-gray-500">
                                    {status.project_status}
                                  </p>
                                </span>
                              </div>
                              <div
                                className={`cols-span-1 flex items-center justify-end nb_emp_status_${status.project_status?.replace(
                                  /\s+/g,
                                  "_"
                                )}`}
                              >
                                {status.emp_nb}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-1">
              <button
                id="listView"
                className={`p-2 rounded-md ${
                  view === "list"
                    ? "bg-white text-[#A462A4] border border-[#A462A4] hover:bg-[#A462A4] hover:text-white  "
                    : "hover:bg-gray-200"
                }`}
                onClick={handleListView}
                aria-label="Vue Liste"
              >
                <i className="fa-solid fa-list text-xl"></i>
              </button>
              <button
                id="cardView"
                className={`p-2 rounded-md ${
                  view === "card"
                    ? "bg-white text-[#A462A4] border border-[#A462A4] hover:bg-[#A462A4] hover:text-white  "
                    : "hover:bg-gray-200"
                }`}
                onClick={handleCardView}
                aria-label="Vue Carte"
              >
                <i className="fa-solid fa-square text-2xl"></i>
              </button>
              <button
                type="button"
                onClick={handleResetFilter}
                className="flex items-center gap-1 p-2 text-[#A462A4]  hover:text-purple-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                <i className="fa-solid fa-rotate-right"></i>
                <span>{t("reset filter")}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }


    
      <main className="!flex-1 overflow-x-hidden overflow-y-auto rounded-t-lg mt-6  ">
        {/* <div className="bg-gray-100 rounded-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { search: searchQuery, companyFilter: selectedCompanies, courseFilter: selectedCourses })
          )}
        </div> */}
        {/* <div className="bg-gray-100 rounded-lg">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              search: searchQuery,
              companyFilter: selectedCompanies,
              courseFilter: selectedCourses,
              modalityFilter: selectedModalities,
              statusFilter: selectedStatus,
              periodeFilter: selectedPeriodes,
            })
          )}
        </div> */}

            <div className="bg-white-100 rounded-lg">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && typeof child.type !== 'string') {
                  // child.type !== 'string' => c’est un composant personnalisé, pas du HTML natif
                  return React.cloneElement(child, {
                    search: searchQuery,
                    companyFilter: selectedCompanies,
                    courseFilter: selectedCourses,
                    modalityFilter: selectedModalities,
                    statusFilter: selectedStatus,
                    periodeFilter: selectedPeriodes,
                    apprFiltre:apprFiltre,
                    projetsapprfiltre: projetsapprfiltre, // Ajoutez cette ligne
                    setProjetsApprfiltre: setProjetsApprfiltre 
                  });
                }
                return child; // On ne touche pas aux éléments HTML
              })}
            </div>
 

      </main>
    </div>
  );
}

export default Layout;

































  















  





                
               




