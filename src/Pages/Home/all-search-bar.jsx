import { ChevronDownIcon } from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useApi from "../../Hooks/Api";
import { ProjectContext } from "../../Contexts/count-project";
import { useTranslation } from "react-i18next";

// 🔹 Composant principal AllSearchBar
export function AllSearchBar({ selected, setSelected }) {
  const { t } = useTranslation();
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [filtreData, setFiltreData] = useState([]);
  const { callApi } = useApi();
  const { selected: select } = useContext(ProjectContext);
  const role = parseInt(sessionStorage.getItem("role"));

  useEffect(() => {
    const fetchData = async (select) => {
      try {
        const res = await callApi(`/cfp/projets/filtre/${select}`);
        setFiltreData(res.filtre);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(select);
  }, [select]);

  const handleUpdateSelected = (name, values) => {
    setSelected((prev) => ({ ...prev, [name]: values }));
  };

  // 🔹 Formatage dynamique des données
  const formates = {
    Ville: filtreData?.lieux?.map((lieu) => ({ id: lieu, label: lieu })) || [],
    Projet:
      filtreData?.type_projets?.map((projet) => ({
        id: projet.type,
        label: projet.type,
      })) || [],
    Entreprise:
      filtreData?.entreprises?.map((etp) => ({
        id: etp.idEtp,
        label: etp.etp_name,
      })) || [],
    Cours:
      filtreData?.modules?.map((module) => ({
        id: module.idModule,
        label: module.module_name,
      })) || [],
    Formateur:
      filtreData?.formateurs?.map((frmtr) => ({
        id: frmtr.idFormateur,
        label: `${frmtr.form_name} ${frmtr.form_firstname}`,
      })) || [],
    Mois:
      filtreData?.mois?.map((ms) => ({
        id: ms.id,
        label: ms.label,
      })) || [],
  };

  // 🔹 Couleur des tags
  const colorMap = {
    Entreprise: "bg-purple-600",
    Projet: "bg-blue-600",
    Periode: "bg-green-600",
    Cours: "bg-yellow-600",
    Ville: "bg-red-600",
    Formateur: "bg-indigo-600",
    Mois: "bg-pink-600",
  };

  return (
    <section>
      {/* Bouton et tags */}
      <div className="flex items-center flex-wrap gap-4">
        <button
          onClick={() => setIsAdvancedFiltersOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
            isAdvancedFiltersOpen
              ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <i className="fa-solid fa-filter text-lg"></i>
          <span>{t("filters")}</span>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ${
              isAdvancedFiltersOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Tags actifs */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(selected).map(([key, value]) => {
            const bgColor = colorMap[key] || "bg-gray-600";

            if (Array.isArray(value) && value.length > 0) {
              return (
                <button
                  key={key}
                  className={`flex items-center gap-2 ${bgColor} text-white px-3 py-1 rounded-full text-sm transition hover:scale-105`}
                  onClick={() =>
                    setSelected((prev) => ({ ...prev, [key]: [] }))
                  }
                >
                  <span className="capitalize">
                    {t("selectedCount", { count: value.length, label: t(key) })}
                  </span>
                  <i className="fas fa-times text-xs"></i>
                </button>
              );
            }

            if (!Array.isArray(value) && value !== null) {
              return (
                <button
                  key={key}
                  className={`flex items-center gap-2 ${bgColor} text-white px-3 py-1 rounded-full text-sm transition hover:scale-105`}
                  onClick={() =>
                    setSelected((prev) => ({ ...prev, [key]: null }))
                  }
                >
                  <span className="capitalize">
                    {t("selectedCount", { count: 1, label: t(key) })}
                  </span>
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
            transition={{ duration: 0.25 }}
            className="grid gap-4 my-2 2xl:grid-cols-5 md:grid-cols-4"
          >
            <DropdownSearch
              name="Entreprise"
              label={t("Entreprise")}
              data={formates.Entreprise}
              selected={selected.Entreprise}
              onChange={handleUpdateSelected}
              t={t}
            />
            <DropdownSearch
              name="Projet"
              label={t("Type de projet")}
              data={formates.Projet}
              selected={selected.Projet}
              onChange={handleUpdateSelected}
              t={t}
            />
            <DropdownRadio
              name="Periode"
              label={t("Période de formation")}
              selected={selected.Periode}
              onChange={(n, val) => setSelected((p) => ({ ...p, [n]: val }))}
              t={t}
            />
            <DropdownSearch
              name="Cours"
              label={t("Cours")}
              data={formates.Cours}
              selected={selected.Cours}
              onChange={handleUpdateSelected}
              t={t}
            />
            <DropdownSearch
              name="Ville"
              label={t("Ville")}
              data={formates.Ville}
              selected={selected.Ville}
              onChange={handleUpdateSelected}
              t={t}
            />
            {role !== 5 && (
              <DropdownSearch
                name="Formateur"
                label={t("Formateur")}
                data={formates.Formateur}
                selected={selected.Formateur}
                onChange={handleUpdateSelected}
                t={t}
              />
            )}

            <DropdownSearch
              name="Mois"
              label={t("Mois")}
              data={formates.Mois}
              selected={selected.Mois}
              onChange={handleUpdateSelected}
              t={t}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// 🔹 Dropdown avec recherche multi-sélection
function DropdownSearch({ name, label, data, selected, onChange, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef();

  const filtered = data.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    onChange(name, updated);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative col-span-1" ref={dropdownRef}>
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100 transition duration-200"
      >
        {label}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.9 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full z-20 p-4 bg-white rounded-lg shadow-lg border border-gray-200 origin-top"
          >
            <input
              type="search"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto">
              {filtered.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="cursor-pointer"
                >
                  <label className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </label>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 🔹 Dropdown radio (période)
function DropdownRadio({ name, label, selected, onChange, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const options = [
    { id: "prev_3_month", label: t("last_3_months") },
    { id: "prev_6_month", label: t("last_6_months") },
    { id: "prev_12_month", label: t("last_12_months") },
    "separator",
    { id: "next_3_month", label: t("next_3_months") },
    { id: "next_6_month", label: t("next_6_months") },
    { id: "next_12_month", label: t("next_12_months") },
  ];

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative col-span-1" ref={dropdownRef}>
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center px-4 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-100 transition duration-200"
      >
        {selected
          ? options.find((o) => o !== "separator" && o.id === selected)?.label
          : label}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scaleY: 0.9 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full z-20 p-4 bg-white rounded-lg shadow-lg border border-gray-200 origin-top flex flex-col gap-1 max-h-60 overflow-y-auto"
          >
            {options.map((item, idx) =>
              item === "separator" ? (
                <hr key={`sep-${idx}`} className="my-1 border-gray-200" />
              ) : (
                <li key={item.id}>
                  <label className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition">
                    <input
                      type="radio"
                      name={name}
                      value={item.id}
                      checked={selected === item.id}
                      onChange={() => onChange(name, item.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </label>
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
