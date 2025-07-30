import { useContext, useEffect, useMemo, useState } from "react";
import { AllSearchBar } from "./all-search-bar";
import { ResultSearch } from "./result-search";
import useApi from "../../Hooks/Api";
import { ProjectContext } from "../../Contexts/count-project";
import { Spinner } from "../../Components/spinner";

export function Formation() {
  const [data, setData] = useState(null);

  const [dataFiltre, setDataFiltre] = useState(null);
  const { loading, callApi } = useApi();
  const {  selected } = useContext(ProjectContext);
  const defaultSelected = {
  Entreprise: [],
  Cours: [],
  Ville: [],
  Formateur: [],
  Mois: [],
  Projet: [],
  Periode: null,
};
const [select, setSelect] = useState(defaultSelected);


  useEffect(() => {
  let isMounted = true;

  const fetchData = async (selected) => {
    try {
      console.log(selected);
      const res = await callApi(`/cfp/projets/${selected}`);
      if (isMounted) {
        setData(res.projets);
        setDataFiltre(res.filtre);
        //setCountProject(res?.projet_counts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchData(selected);
  return () => { isMounted = false; };
}, [selected]); // maintenant dépend de selected
const projetsFiltres = data?.filter((projet) => {
  const villeValide = Array.isArray(select?.Ville)
    ? select.Ville.length === 0 || select.Ville.includes(projet?.li_name)
    : true;

  const typeValide = Array.isArray(select?.Projet)
    ? select.Projet.length === 0 || select.Projet.includes(projet?.project_type)
    : true;

  return villeValide && typeValide;
});


  if (loading || !data) return <Spinner />;
  console.log(projetsFiltres);


  return (
    <div className="w-full min-h-screen mt-2">
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-full  mx-auto tab-content-project">
          {/* Search bar */}
          <div className="block transition-opacity duration-200 opacity-100">
            <AllSearchBar filtreData={dataFiltre} selected={select} setSelected={setSelect}/>
          </div>
          {/* Résultat */}
          <div className="flex flex-col mt-6 h-full" id="scrollArea">
            <ResultSearch data={projetsFiltres} />
          </div>
        </div>
      </div>
    </div>
  );
}
