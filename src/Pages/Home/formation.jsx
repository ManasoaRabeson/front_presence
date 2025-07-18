import { useContext, useEffect } from "react";
import { useFilter } from "../../Contexts/filter";
import { AllSearchBar } from "./all-search-bar";
import { ResultSearch } from "./result-search";
import useApi from "../../Hooks/Api";
import { useState } from "react";
import { ProjectContext } from "../../Contexts/count-project";
import { Spinner } from "../../Components/spinner";

export function Formation(){
const [isFiltering, setIsFiltering] = useState(false);
const { isOpen } = useFilter();
const [data,setData] = useState(null);
const {loading,callApi} = useApi();
const { setCountProject , selected } = useContext(ProjectContext);
const [dataDetails,setDataDetails] = useState([]);
useEffect(()=>{
    const fetchData = async() =>{
    try {
        const res = await callApi('/cfp/projets');
        setData(res);
        setCountProject(res?.projet_counts);
    } catch (error) {
        console.log(error);
    }
    };
    fetchData();

},[callApi]);



useEffect(() => {
  if (!data) return;

  setIsFiltering(true); // ✅ commence le chargement

  const timer = setTimeout(() => {
    switch (selected) {
      case "cloture":
        setDataDetails(data.projets.clotures ?? []);
        break;
      case "En_cours":
        setDataDetails(data.projets.en_cours ?? []);
        break;
      case "Terminé":
        setDataDetails(data.projets.termines ?? []);
        break;
      default:
        setDataDetails([]);
        break;
    }

    setIsFiltering(false); // ✅ terminé
  }, 100); // petit délai optionnel pour fluidité

  return () => clearTimeout(timer);
}, [selected, data]);

if (loading || isFiltering) return <Spinner />;


return(<>
    <div class="w-full min-h-screen mt-2">
        <div class="flex flex-col w-full h-full">
            <div  class="w-full h-full p-2 mx-auto tab-content-project">
                {/*searchbar*/}
                <div class="block transition-opacity duration-200 opacity-100">
                    {isOpen && <AllSearchBar/>} 
                </div>
                {/*Resultat(liste) */} 
                <div class="flex flex-col mt-6 h-full" id="scrollArea">
                    <ResultSearch data={dataDetails}/>
                </div>
            </div>
            
        </div>
      
    </div>
    
    
</>)
}