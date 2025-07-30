
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export function AllSearchBar({selected,setSelected,filtreData}) {
const[isAdvancedFiltersOpen,setIsAdvancedFiltersOpen] = useState(false);
const [data, setData] = useState([
  { id: "null", label: "Aucun", count: 1 },
  { id: "100", label: "2ADH", count: 1 },
  { id: "101", label: "3BTS", count: 2 },
  { id: "102", label: "1INFO", count: 3 },
  { id: "103", label: "S4TECH", count: 1 },
]);

const [cours, setCours] = useState([
  { id: "c1", label: "Mathématiques", count: 5 },
  { id: "c2", label: "Physique", count: 4 },
  { id: "c3", label: "Informatique", count: 6 },
  { id: "c4", label: "Chimie", count: 2 },
  { id: "c5", label: "Anglais", count: 3 },
]);


const [formateur, setFormateur] = useState([
  { id: "f1", label: "M. Rakoto", count: 3 },
  { id: "f2", label: "Mme Rasoanaivo", count: 2 },
  { id: "f3", label: "M. Andrianina", count: 4 },
  { id: "f4", label: "Mme Raharisoa", count: 1 },
  { id: "f5", label: "M. Ratsimba", count: 5 },
]);

const [mois, setMois] = useState([
  { id: "m1", label: "Janvier", count: 4 },
  { id: "m2", label: "Février", count: 3 },
  { id: "m3", label: "Mars", count: 5 },
  { id: "m4", label: "Avril", count: 2 },
  { id: "m5", label: "Mai", count: 6 },
]);




  const handleUpdateSelected = (name, values) => {
    setSelected((prev) => ({
      ...prev,
      [name]: values,
    }));
  };
  
console.log(filtreData);
const lieuxFormates = filtreData?.lieux.map((lieu) => ({
  id: lieu,
  label: lieu,

}));
const TypeProjetsFormates = filtreData?.type_projets.map((projet) => ({
  id: projet.type,
  label: projet.type,
}));
console.log(TypeProjetsFormates);

  return (
<section className="">
  <div className="flex items-center flex-wrap gap-4">
    {/* Bouton filtres */}
    <button
      onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isAdvancedFiltersOpen
          ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <i className="fa-solid fa-filter text-lg"></i>
      <span>Filtres</span>
      {isAdvancedFiltersOpen ? (
        <ChevronUpIcon className="w-4 h-4" />
      ) : (
        <ChevronDownIcon className="w-4 h-4" />
      )}
    </button>

    {/* Tags des filtres actifs */}
    <div className="flex flex-wrap gap-2">
      {Object.entries(selected).map(([key, value]) => {
        // Couleurs personnalisées par clé
        const colorMap = {
          Entreprise: "bg-purple-600",
          Projet: "bg-blue-600",
          Periode: "bg-green-600",
          Cours: "bg-yellow-600",
          Ville: "bg-red-600",
          Formateur: "bg-indigo-600",
          Mois: "bg-pink-600",
        };

        const bgColor = colorMap[key] || "bg-gray-600";

        if (Array.isArray(value) && value.length > 0) {
          const label = `${value.length} ${key}`;
          return (
            <button
              key={key}
              className={`flex items-center gap-2 ${bgColor} text-white px-3 py-1 rounded-full text-sm`}
              onClick={() =>
                setSelected((prev) => ({ ...prev, [key]: [] }))
              }
            >
              <span className="capitalize">{label}</span>
              <i className="fas fa-times text-xs"></i>
            </button>
          );
        }

        if (!Array.isArray(value) && value !== null) {
          const label = `1 ${key}`;
          return (
            <button
              key={key}
              className={`flex items-center gap-2 ${bgColor} text-white px-3 py-1 rounded-full text-sm`}
              onClick={() =>
                setSelected((prev) => ({ ...prev, [key]: null }))
              }
            >
              <span className="capitalize">{label}</span>
              <i className="fas fa-times text-xs"></i>
            </button>
          );
        }

        return null;
      })}
    </div>
  </div>

  {/* Filtres avancés */}
  <AnimatePresence>
    {isAdvancedFiltersOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className={`grid gap-4 my-2 2xl:grid-cols-5 md:grid-cols-4`}
      >
        <SearchBar
          name="Entreprise"
          role="Entreprise"
          data={data}
          selected={selected.Entreprise}
          onChange={handleUpdateSelected}
        />
        <TypeProjet
          name="Projet"
          onChange={handleUpdateSelected}
          selected={selected.Projet}
          types={TypeProjetsFormates}
        />
        <PeriodeFormation
          name="Periode"
          selected={selected.Periode}
          onChange={(name, value) =>
            setSelected((prev) => ({ ...prev, [name]: value }))
          }
        />
        <SearchBar
          name="Cours"
          role="Cours"
          data={cours}
          selected={selected.Cours}
          onChange={handleUpdateSelected}
        />
        <SearchBar
          name="Ville"
          role="Ville"
          data={lieuxFormates}
          selected={selected.Ville}
          onChange={handleUpdateSelected}
        />
        <SearchBar
          name="Formateur"
          role="Formateur"
          data={formateur}
          selected={selected.Formateur}
          onChange={handleUpdateSelected}
        />
        <SearchBar
          name="Mois"
          role="Mois"
          data={mois}
          selected={selected.Mois}
          onChange={handleUpdateSelected}
        />
      </motion.div>
    )}
  </AnimatePresence>
</section>

  );
}

// function SearchBar({role,data,selected,setSelected}){
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const [search,setSearch] = useState("");
//     const toggleDropdown = () => setIsOpen(!isOpen);

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setSearch('');
//       }
//     };

//     useEffect(() => {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//   const handleCheckboxChange = (id) => {
//     setSelected((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((item) => item !== id) // remove if already selected
//         : [...prevSelected, id] // add if not selected
//     );
//   };

//   //filtre

//       const filtres = data?.filter((item) =>
//         search === ""
//           ? true
//           : item.label.toLowerCase().includes(search.toLowerCase())
//       );
//     return(
//       <>
//             <div className="col-span-1 relative" ref={dropdownRef}>
//             {/* BUTTON */}
//             <button
//               onClick={toggleDropdown}
//               className="w-full flex justify-between items-center px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100 transition duration-200"
//             >
//               {role}
//               <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}></i>
//             </button>

//             {/* DROPDOWN CONTENT */}
//             {isOpen && (
//               <div
//                 className="absolute mt-2 w-full z-20 p-4 bg-white rounded-lg shadow-lg border border-gray-200 animate-dropdown"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-2">
//                   <h5 className="text-gray-700 font-semibold">{role}</h5>
//                 </div>

//                 {/* Search Input */}
//                 <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
//                   <input
//                     type="search"
//                     placeholder="Rechercher..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-base"
//                   />
//                   <svg
//                     className="w-5 h-5 text-gray-500"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
//                     />
//                   </svg>
//                 </label>


//                 {/* LIST */}
//                 <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto">
//                   {filtres.map((item) => (
//                     <li key={item.id}>
//                       <label className="flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-100">
//                         <div className="flex items-center gap-3">
//                           <input
//                             type="checkbox"
//                             checked={selected.includes(item.id)}
//                             value={item.id}
//                             onChange={() => handleCheckboxChange(item.id)}
//                             className="h-4 w-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
//                           />
//                           <span className="text-xl text-gray-700">{item.label}</span>
//                         </div>
//                         <span className="text-xs text-gray-500">{item.count}</span>
//                       </label>
//                     </li>
//                   ))}
//                 </ul>

//               </div>
//             )}
//           </div>
//                 {/* Animation style */}
//       <style>
//         {`
//           .animate-dropdown {
//             animation: dropdownAnim 0.2s ease-out forwards;
//             transform-origin: top;
//           }

//           @keyframes dropdownAnim {
//             0% {
//               opacity: 0;
//               transform: scaleY(0.95);
//             }
//             100% {
//               opacity: 1;
//               transform: scaleY(1);
//             }
//           }
//         `}
//       </style>
//   </>
//   )
// }

function SearchBar({ name, role, data, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [search, setSearch] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setSearch("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    onChange(name, updated); // appelle le parent avec nom + valeur mise à jour
  };

  const filtres = data?.filter((item) =>
    search === ""
      ? true
      : item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="col-span-1 relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100 transition duration-200"
        >
          {role}
          <i
            className={`fa-solid fa-chevron-down transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          ></i>
        </button>
        

        {isOpen && (
          <div className="absolute mt-2 w-full z-20 p-4 bg-white rounded-lg shadow-lg border border-gray-200 animate-dropdown">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-gray-700 font-semibold">{role}</h5>
            </div>

            <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="search"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-base"
              />
              <svg
                className="w-5 h-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
            </label>

            <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-2">
              {filtres.map((item) => (
                <li key={item.id}>
                  <label className="flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="h-4 w-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.count}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>
        {`
          .animate-dropdown {
            animation: dropdownAnim 0.2s ease-out forwards;
            transform-origin: top;
          }

          @keyframes dropdownAnim {
            0% {
              opacity: 0;
              transform: scaleY(0.95);
            }
            100% {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </>
  );
}

 function TypeProjet({ name, selected, onChange,types }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleCheckboxChange = (id) => {
    const updated = Array.isArray(selected) && selected.includes(id)
    ? selected.filter((item) => item !== id)
    : [...(selected || []), id];
    onChange(name, updated);
  };

  return (
    <div className="col-span-1 relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100 transition duration-200"
      >
        Type de projet
        <i
          className={`fa-solid fa-chevron-down transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full z-20 p-4 bg-white rounded-lg shadow-lg border border-gray-200 animate-dropdown">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-gray-700 font-semibold">Type de projet</h5>
          </div>

          <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {types.map((item) => (
              <li key={item.id}>
                <label className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={`type_${item.id}`}
                      checked={Array.isArray(selected) && selected.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <span className="text-gray-600">{item.label}</span>
                  </div>
                  {/* <span className="text-gray-400 text-sm">{item?.count}</span> */}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>
        {`
          .animate-dropdown {
            animation: dropdownAnim 0.2s ease-out forwards;
            transform-origin: top;
          }

          @keyframes dropdownAnim {
            0% {
              opacity: 0;
              transform: scaleY(0.95);
            }
            100% {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
}


 function PeriodeFormation({ name, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const periods = [
    { id: "prev_3_month", label: "3 derniers mois", count: 54 },
    { id: "prev_6_month", label: "6 derniers mois", count: 93 },
    { id: "prev_12_month", label: "12 derniers mois", count: 186 },
    "separator",
    { id: "next_3_month", label: "3 prochains mois", count: 33 },
    { id: "next_6_month", label: "6 prochains mois", count: 63 },
    { id: "next_12_month", label: "12 prochains mois", count: 63 },
  ];

  const handleRadioChange = (id) => {
    onChange(name, id);
    setIsOpen(false);
  };

  return (
    <div className="col-span-1 relative" ref={dropdownRef}>
      {/* BUTTON */}
      <button
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100 transition duration-200"
      >
        {selected
          ? periods.find((p) => p !== "separator" && p.id === selected)?.label
          : "Période de formation"}
        <i
          className={`fa-solid fa-chevron-down transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute mt-2 w-full z-20 p-4 bg-white rounded-lg shadow-lg border border-gray-200 animate-dropdown">
          <div className="flex justify-between items-center mb-2">
            <h5 className="text-gray-700 font-semibold">Période de formation</h5>
          </div>

          <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {periods.map((item, index) =>
              item === "separator" ? (
                <hr
                  key={`sep-${index}`}
                  className="border-[1px] border-gray-200 my-2"
                />
              ) : (
                <li key={item.id}>
                  <label className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="periode"
                        value={item.id}
                        checked={selected === item.id}
                        onChange={() => handleRadioChange(item.id)}
                        className="radio"
                      />
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{item.count}</span>
                  </label>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          .animate-dropdown {
            animation: dropdownAnim 0.2s ease-out forwards;
            transform-origin: top;
          }

          @keyframes dropdownAnim {
            0% {
              opacity: 0;
              transform: scaleY(0.95);
            }
            100% {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
}


{/* Filtres avancés (desktop) */}
          // <AnimatePresence>
          //   {isAdvancedFiltersOpen && (
          //     <motion.div
          //       initial={{ opacity: 0, height: 0 }}
          //       animate={{ opacity: 1, height: "auto" }}
          //       exit={{ opacity: 0, height: 0 }}
          //       transition={{ duration: 0.2 }}
          //       className={`mb-6 p-4 rounded-lg ${
          //         theme === "dark"
          //           ? "bg-gray-700"
          //           : "bg-gray-50"
          //       }`}
          //     >
          //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          //         {/* Filtre année */}
          //         <div>
          //           <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          //             Année
          //           </label>
          //           <select
          //             value={selectedYear || ""}
          //             onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
          //             className={`w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
          //               theme === "dark"
          //                 ? "bg-gray-600 border-gray-500 text-white"
          //                 : "bg-white border-gray-300 text-gray-800"
          //             }`}
          //           >
          //             <option value="">Toutes les années</option>
          //             {years.map((year) => (
          //               <option key={year} value={year}>
          //                 {year}
          //               </option>
          //             ))}
          //           </select>
          //         </div>

          //         {/* Filtre mois */}
          //         <div>
          //           <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          //             Mois
          //           </label>
          //           <select
          //             value={activeMonth !== null ? activeMonth : ""}
          //             onChange={(e) => setActiveMonth(e.target.value !== "" ? parseInt(e.target.value) : null)}
          //             className={`w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
          //               theme === "dark"
          //                 ? "bg-gray-600 border-gray-500 text-white"
          //                 : "bg-white border-gray-300 text-gray-800"
          //             }`}
          //           >
          //             <option value="">Tous les mois</option>
          //             {months.map((month) => (
          //               <option key={month.value} value={month.value}>
          //                 {month.label}
          //               </option>
          //             ))}
          //           </select>
          //         </div>

          //         {/* Filtre statut */}
          //         <div>
          //           <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          //             Statut
          //           </label>
          //           <select
          //             value={status}
          //             onChange={(e) => setStatus(e.target.value)}
          //             className={`w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
          //               theme === "dark"
          //                 ? "bg-gray-600 border-gray-500 text-white"
          //                 : "bg-white border-gray-300 text-gray-800"
          //             }`}
          //           >
          //             <option value="all">Tous les statuts</option>
          //             {Object.values(statusLabels).map((label) => (
          //               <option key={label} value={label}>
          //                 {label}
          //               </option>
          //             ))}
          //           </select>
          //         </div>

          //         {/* Filtre type */}
          //         <div>
          //           <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          //             Type
          //           </label>
          //           <select
          //             value={type}
          //             onChange={(e) => setType(e.target.value)}
          //             className={`w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
          //               theme === "dark"
          //                 ? "bg-gray-600 border-gray-500 text-white"
          //                 : "bg-white border-gray-300 text-gray-800"
          //             }`}
          //           >
          //             <option value="all">Tous les types</option>
          //             <option value="Inter">Inter</option>
          //             <option value="Intra">Intra</option>
          //           </select>
          //         </div>

          //         {/* Filtre ville */}
          //         <div>
          //           <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          //             Ville
          //           </label>
          //           <select
          //             value={villeFilter}
          //             onChange={(e) => setVilleFilter(e.target.value)}
          //             className={`w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
          //               theme === "dark"
          //                 ? "bg-gray-600 border-gray-500 text-white"
          //                 : "bg-white border-gray-300 text-gray-800"
          //             }`}
          //           >
          //             <option value="all">Toutes les villes</option>
          //             {getUniqueOptions("villes").map(
          //               (ville) =>
          //                 ville !== "all" && (
          //                   <option key={ville} value={ville}>
          //                     {ville}
          //                   </option>
          //                 )
          //             )}
          //           </select>
          //         </div>

          //         {/* Filtre entreprise */}
          //         <div>
          //           <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          //             Entreprise
          //           </label>
          //           <select
          //             value={entrepriseFilter}
          //             onChange={(e) => setEntrepriseFilter(e.target.value)}
          //             className={`w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${
          //               theme === "dark"
          //                 ? "bg-gray-600 border-gray-500 text-white"
          //                 : "bg-white border-gray-300 text-gray-800"
          //             }`}
          //           >
          //             <option value="all">Toutes les entreprises</option>
          //             {getUniqueOptions("entreprises").map(
          //               (entreprise) =>
          //                 entreprise !== "all" && (
          //                   <option key={entreprise} value={entreprise}>
          //                     {entreprise}
          //                   </option>
          //                 )
          //             )}
          //           </select>
          //         </div>
          //       </div>
          //     </motion.div>
          //   )}
          // </AnimatePresence>