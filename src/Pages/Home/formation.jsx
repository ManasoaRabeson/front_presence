import { useContext, useEffect, useMemo, useState } from "react";
import { useFilter } from "../../Contexts/filter";
import { AllSearchBar } from "./all-search-bar";
import { ResultSearch } from "./result-search";
import useApi from "../../Hooks/Api";
import { ProjectContext } from "../../Contexts/count-project";
import { Spinner } from "../../Components/spinner";

export function Formation() {
  const [data, setData] = useState(null);
  const { loading, callApi } = useApi();
  const { setCountProject, selected } = useContext(ProjectContext);
  const { isOpen } = useFilter();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await callApi("/cfp/projets");
        if (isMounted) {
          setData(res);
          setCountProject(res?.projet_counts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []); 

  const dataDetails = useMemo(() => {
    if (!data) return [];

    switch (selected) {
      case "cloture": return data.projets.clotures ?? [];
      case "En_cours": return data.projets.en_cours ?? [];
      case "Terminé": return data.projets.termines ?? [];
      default: return [];
    }
  }, [data, selected]);

  if (loading || !data) return <Spinner />;

  return (
    <div className="w-full min-h-screen mt-2">
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-full p-2 mx-auto tab-content-project">
          {/* Search bar */}
          <div className="block transition-opacity duration-200 opacity-100">
            {isOpen && <AllSearchBar />}
          </div>
          {/* Résultat */}
          <div className="flex flex-col mt-6 h-full" id="scrollArea">
            <ResultSearch data={dataDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
