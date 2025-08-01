// import React,{ useContext, useEffect, useMemo, useState } from "react";
// import { AllSearchBar } from "./all-search-bar";
// import { ResultSearch } from "./result-search";
// import useApi from "../../Hooks/Api";
// import { ProjectContext } from "../../Contexts/count-project";
// import { Spinner } from "../../Components/spinner";
// import { useDebounce } from "use-debounce";

// export function Formation() {
//   const [data, setData] = useState(null);
//   const [dataFiltre, setDataFiltre] = useState(null);
//   const { loading, callApi } = useApi();
//   const { selected } = useContext(ProjectContext);

//   const defaultSelected = {
//     Entreprise: [],
//     Cours: [],
//     Ville: [],
//     Formateur: [],
//     Mois: [],
//     Projet: [],
//     Periode: null,
//   };

//   const [select, setSelect] = useState(defaultSelected);
//   const [debouncedSelect] = useDebounce(select, 200); // 🔹 debounce pour fluidité

//   // 🔹 Fetch des données
//   useEffect(() => {
//     let isMounted = true;

//     (async () => {
//       try {
//         const res = await callApi(`/cfp/projets/${selected}`);
//         if (isMounted) {
//           setData(
//             res.projets?.map((p) => ({
//               ...p,
//               _mois: `${new Date(p.dateDebut).getFullYear()}-${new Date(p.dateDebut).getMonth() + 1}`,
//               _ville: p.li_name?.toLowerCase(),
//             })) || []
//           );
//           setDataFiltre(res.filtre);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     })();

//     return () => {
//       isMounted = false;
//     };
//   }, [selected, callApi]);

//   // 🔹 Fonctions de filtrage
//   const filtreProjet = (projet) => {
//     const {
//       Ville,
//       Projet,
//       Entreprise,
//       Periode,
//       Cours,
//       Formateur,
//       Mois,
//     } = debouncedSelect;

//     const villeValide =
//       Ville.length === 0 || Ville.includes(projet?.li_name);

//     const typeValide =
//       Projet.length === 0 || Projet.includes(projet?.project_type);

//     const etpValide =
//       Entreprise.length === 0 ||
//       projet.etp_name?.some((etp) => Entreprise.includes(etp.etp_name));

//     const periodeValide = (() => {
//       if (!Periode) return true;
//       const start = new Date(projet.dateDebut);
//       const today = new Date();

//       const periods = {
//         prev_3_month: [
//           new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
//           today,
//         ],
//         prev_6_month: [
//           new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()),
//           today,
//         ],
//         prev_12_month: [
//           new Date(today.getFullYear(), today.getMonth() - 12, today.getDate()),
//           today,
//         ],
//         next_3_month: [
//           today,
//           new Date(today.getFullYear(), today.getMonth() + 3, today.getDate()),
//         ],
//         next_6_month: [
//           today,
//           new Date(today.getFullYear(), today.getMonth() + 6, today.getDate()),
//         ],
//         next_12_month: [
//           today,
//           new Date(today.getFullYear(), today.getMonth() + 12, today.getDate()),
//         ],
//       };

//       const [from, to] = periods[Periode] || [];
//       return from && to ? start >= from && start <= to : true;
//     })();

//     const moduleValide =
//       Cours.length === 0 || Cours.includes(projet?.idModule);

//     const formateurValide =
//       Formateur.length === 0 ||
//       projet.formateurs?.some((form) => Formateur.includes(form.idFormateur));

//     const moisValide =
//       Mois.length === 0 ||
//       Mois.some((moisSelect) => {
//         const [year, month] = moisSelect.split("-");
//         const moisSelectNorm = `${year}-${parseInt(month, 10)}`;
//         return moisSelectNorm === projet._mois;
//       });

//     return (
//       villeValide &&
//       typeValide &&
//       etpValide &&
//       periodeValide &&
//       moduleValide &&
//       formateurValide &&
//       moisValide
//     );
//   };

//   // 🔹 useMemo pour filtrer uniquement quand data ou select changent
//   const projetsFiltres = useMemo(
//     () => data?.filter(filtreProjet) ?? [],
//     [data, debouncedSelect]
//   );

//   if (loading || !data) return <Spinner />;

//   return (
//     <div className="w-full min-h-screen mt-2">
//       <div className="flex flex-col w-full h-full">
//         <div className="w-full h-full mx-auto tab-content-project">
         
//           <div className="block transition-opacity duration-200 opacity-100">
//             <MemoSearchBar
//               filtreData={dataFiltre}
//               selected={select}
//               setSelected={setSelect}
//             />
//           </div>
         
//           <div className="flex flex-col mt-6 h-full" id="scrollArea">
//             <ResultSearch data={projetsFiltres} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // 🔹 Memo pour éviter rerender inutile de la SearchBar
// const MemoSearchBar = React.memo(AllSearchBar);

// import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
// import { AllSearchBar } from "./all-search-bar";
// import { ResultSearch } from "./result-search";
// import useApi from "../../Hooks/Api";
// import { ProjectContext } from "../../Contexts/count-project";
// import { useDebounce } from "use-debounce";

// export function Formation() {
//   const loadingRef = useRef(false); // évite les doublons de requêtes
//   const sentinelRef = useRef(null); // sentinelle pour IntersectionObserver

//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [dataFiltre, setDataFiltre] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const { callApi } = useApi();
//   const { selected } = useContext(ProjectContext);

//   const [filters, setFilters] = useState({
//     Entreprise: [],
//     Cours: [],
//     Ville: [],
//     Formateur: [],
//     Mois: [],
//     Projet: [],
//     Periode: null,
//   });
//   const [debouncedFilters] = useDebounce(filters, 200);

//   // Fonction pour charger une page
//   const loadPage = useCallback(
//     async (pageToLoad = 1) => {
//       if (loadingRef.current || !hasMore) return;

//       loadingRef.current = true;
//       setLoading(true);

//       try {
//         const res = await callApi(`/cfp/projets/${selected}?page=${pageToLoad}`);

//         const newProjets = (res.projets || []).map((p) => ({
//           ...p,
//           _mois: `${new Date(p.dateDebut).getFullYear()}-${new Date(p.dateDebut).getMonth() + 1}`,
//           _ville: p.li_name?.toLowerCase(),
//         }));

//         // Si pas de résultats sur cette page
//         if (newProjets.length === 0) {
//           if (pageToLoad === 1) {
//             setData([]);
//           }
//           setHasMore(false); // Arrête le scroll infini
//           return;
//         }

//         // Sinon on ajoute les projets
//         setData((prev) => (pageToLoad === 1 ? newProjets : [...prev, ...newProjets]));
//         setPage(pageToLoad);
//         setDataFiltre(res.filtre || null);
//       } catch (error) {
//         console.error(error);
//         setHasMore(false);
//       } finally {
//         loadingRef.current = false;
//         setLoading(false);
//       }
//     },
//     [callApi, selected, hasMore]
//   );

//   // Charger la première page à chaque changement de "selected"
//   useEffect(() => {
//     setData([]);
//     setPage(1);
//     setHasMore(true);
//     loadPage(1);
//   }, [selected, loadPage]);

//   // IntersectionObserver pour scroll infini
//   useEffect(() => {
//     if (!sentinelRef.current || !hasMore || loading) return;

//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         loadPage(page + 1);
//       }
//     });

//     observer.observe(sentinelRef.current);
//     return () => observer.disconnect();
//   }, [page, hasMore, loading, loadPage]);

//   // Fonction de filtrage
//   const filtreProjet = (projet) => {
//     const { Ville, Projet, Entreprise, Periode, Cours, Formateur, Mois } = debouncedFilters;

//     const villeValide = Ville.length === 0 || Ville.includes(projet?.li_name);
//     const typeValide = Projet.length === 0 || Projet.includes(projet?.project_type);
//     const etpValide =
//       Entreprise.length === 0 ||
//       projet.etp_name?.some((etp) => Entreprise.includes(etp.etp_name));

//     const periodeValide = (() => {
//       if (!Periode) return true;
//       const start = new Date(projet.dateDebut);
//       const today = new Date();
//       const periods = {
//         prev_3_month: [new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()), today],
//         prev_6_month: [new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()), today],
//         prev_12_month: [new Date(today.getFullYear(), today.getMonth() - 12, today.getDate()), today],
//         next_3_month: [today, new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())],
//         next_6_month: [today, new Date(today.getFullYear(), today.getMonth() + 6, today.getDate())],
//         next_12_month: [today, new Date(today.getFullYear(), today.getMonth() + 12, today.getDate())],
//       };
//       const [from, to] = periods[Periode] || [];
//       return from && to ? start >= from && start <= to : true;
//     })();

//     const moduleValide = Cours.length === 0 || Cours.includes(projet?.idModule);
//     const formateurValide =
//       Formateur.length === 0 ||
//       projet.formateurs?.some((form) => Formateur.includes(form.idFormateur));

//     const moisValide =
//       Mois.length === 0 ||
//       Mois.some((moisSelect) => {
//         const [year, month] = moisSelect.split("-");
//         const moisSelectNorm = `${year}-${parseInt(month, 10)}`;
//         return moisSelectNorm === projet._mois;
//       });

//     return (
//       villeValide &&
//       typeValide &&
//       etpValide &&
//       periodeValide &&
//       moduleValide &&
//       formateurValide &&
//       moisValide
//     );
//   };

//   const projetsFiltres = React.useMemo(() => data.filter(filtreProjet), [data, debouncedFilters]);

//   return (
//     <div className="w-full min-h-screen">
//       <div className="flex flex-col w-full h-full">
//         <div className="w-full h-full mx-auto tab-content-project">
//           <div className="block transition-opacity duration-200 opacity-100">
//             <MemoSearchBar filtreData={dataFiltre} selected={filters} setSelected={setFilters} />
//           </div>

//           <div className="flex flex-col h-full" id="scrollArea">
//             {projetsFiltres.length > 0 ? (
//               <>
//                 <ResultSearch data={projetsFiltres} />

//                 {loading && <p className="text-center py-4 text-gray-500">Chargement...</p>}

//                 {!hasMore && <p className="text-center py-4 text-gray-400">Fin des résultats</p>}

//                 {/* Sentinelle invisible pour déclencher le scroll auto */}
//                 {hasMore && <div ref={sentinelRef} className="h-10"></div>}
//               </>
//             ) : (
//               <div className="py-10 text-center text-gray-500">Aucun projet trouvé.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const MemoSearchBar = React.memo(AllSearchBar);

// import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
// import { AllSearchBar } from "./all-search-bar";
// import { ResultSearch } from "./result-search";
// import useApi from "../../Hooks/Api";
// import { ProjectContext } from "../../Contexts/count-project";
// import { useDebounce } from "use-debounce";

// export function Formation() {
//   const loadingRef = useRef(false);
//   const hasMoreRef = useRef(true);
//   const sentinelRef = useRef(null);
//   const ITEMS_PER_PAGE = 20;

//   const { callApi } = useApi();
//   const { selected } = useContext(ProjectContext);

//   const [page, setPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     Entreprise: [],
//     Cours: [],
//     Ville: [],
//     Formateur: [],
//     Mois: [],
//     Projet: [],
//     Periode: null,
//   });
//   const [debouncedFilters] = useDebounce(filters, 200);

//   const loadPage = useCallback(
//     async (pageToLoad = 1) => {
//       if (loadingRef.current || !hasMoreRef.current) return;

//       loadingRef.current = true;
//       setLoading(true);

//       try {
//         const res = await callApi(`/cfp/projets/${selected}?page=${pageToLoad}`);

//         const newProjets = (res.projets || []).map((p) => ({
//           ...p,
//           _mois: `${new Date(p.dateDebut).getFullYear()}-${new Date(p.dateDebut).getMonth() + 1}`,
//           _ville: p.li_name?.toLowerCase(),
//         }));

//         if (newProjets.length === 0 && pageToLoad === 1) {
//           setData([]);
//           hasMoreRef.current = false;
//           setHasMore(false);
//           return;
//         }

//         if (newProjets.length < ITEMS_PER_PAGE) {
//           hasMoreRef.current = false;
//           setHasMore(false);
//         } else {
//           hasMoreRef.current = true;
//           setHasMore(true);
//         }

//         setData((prev) => (pageToLoad === 1 ? newProjets : [...prev, ...newProjets]));
//         setPage(pageToLoad);
//       } catch (error) {
//         console.error(error);
//         hasMoreRef.current = false;
//         setHasMore(false);
//       } finally {
//         loadingRef.current = false;
//         setLoading(false);
//       }
//     },
//     [callApi, selected]
//   );

//   // Reset data au changement de selected
//   useEffect(() => {
//     hasMoreRef.current = true;
//     setData([]);
//     setPage(1);
//     setHasMore(true);
//     loadPage(1);
//   }, [selected, loadPage]);

//   // Reset data au changement des filtres (debounced)
//   useEffect(() => {
//     hasMoreRef.current = true;
//     setData([]);
//     setPage(1);
//     setHasMore(true);
//     loadPage(1);
//   }, [debouncedFilters, loadPage]);

//   // Scroll infini
//   useEffect(() => {
//     if (!sentinelRef.current || loading || !hasMore) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMoreRef.current && !loading) {
//           loadPage(page + 1);
//         }
//       },
//       {
//         rootMargin: "200px",
//       }
//     );

//     observer.observe(sentinelRef.current);
//     return () => observer.disconnect();
//   }, [page, loading, hasMore, loadPage]);

//   // Filtrage projet inchangé
//   const filtreProjet = (projet) => {
//     const { Ville, Projet, Entreprise, Periode, Cours, Formateur, Mois } = debouncedFilters;

//     const villeValide = Ville.length === 0 || Ville.includes(projet?.li_name);
//     const typeValide = Projet.length === 0 || Projet.includes(projet?.project_type);
//     const etpValide =
//       Entreprise.length === 0 ||
//       projet.etp_name?.some((etp) => Entreprise.includes(etp.etp_name));

//     const periodeValide = (() => {
//       if (!Periode) return true;
//       const start = new Date(projet.dateDebut);
//       const today = new Date();
//       const periods = {
//         prev_3_month: [new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()), today],
//         prev_6_month: [new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()), today],
//         prev_12_month: [new Date(today.getFullYear(), today.getMonth() - 12, today.getDate()), today],
//         next_3_month: [today, new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())],
//         next_6_month: [today, new Date(today.getFullYear(), today.getMonth() + 6, today.getDate())],
//         next_12_month: [today, new Date(today.getFullYear(), today.getMonth() + 12, today.getDate())],
//       };
//       const [from, to] = periods[Periode] || [];
//       return from && to ? start >= from && start <= to : true;
//     })();

//     const moduleValide = Cours.length === 0 || Cours.includes(projet?.idModule);
//     const formateurValide =
//       Formateur.length === 0 ||
//       projet.formateurs?.some((form) => Formateur.includes(form.idFormateur));

//     const moisValide =
//       Mois.length === 0 ||
//       Mois.some((moisSelect) => {
//         const [year, month] = moisSelect.split("-");
//         const moisSelectNorm = `${year}-${parseInt(month, 10)}`;
//         return moisSelectNorm === projet._mois;
//       });

//     return (
//       villeValide &&
//       typeValide &&
//       etpValide &&
//       periodeValide &&
//       moduleValide &&
//       formateurValide &&
//       moisValide
//     );
//   };

//   const projetsFiltres = React.useMemo(() => data.filter(filtreProjet), [data, debouncedFilters]);

//   return (
//     <div className="w-full min-h-screen flex flex-col">
//       <div className="w-full mx-auto tab-content-project">
//         <div className="block transition-opacity duration-200 opacity-100">
//           <MemoSearchBar  selected={filters} setSelected={setFilters} />
//         </div>

//         <div className="flex flex-col flex-grow" id="scrollArea">
//           {projetsFiltres.length > 0 ? (
//             <>
//               <ResultSearch data={projetsFiltres} />

//               {loading && (
//                 <p className="text-center py-4 text-gray-500">Chargement...</p>
//               )}

//               {!loading && !hasMore && (
//                 <p className="text-center py-4 text-gray-400">Fin des résultats</p>
//               )}

//               {/* Sentinelle invisible pour déclencher le scroll infini */}
//               <div ref={sentinelRef} style={{ height: 1 }} />
//             </>
//           ) : (
//             <div className="py-10 text-center text-gray-500">Aucun projet trouvé.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const MemoSearchBar = React.memo(AllSearchBar);

import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { AllSearchBar } from "./all-search-bar";
import { ResultSearch } from "./result-search";
import useApi from "../../Hooks/Api";
import { ProjectContext } from "../../Contexts/count-project";
import { useDebounce } from "use-debounce";

export function Formation() {
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const sentinelRef = useRef(null);
  const ITEMS_PER_PAGE = 20;

  const { callApi } = useApi();
  const { selected } = useContext(ProjectContext);

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    Entreprise: [],
    Cours: [],
    Ville: [],
    Formateur: [],
    Mois: [],
    Projet: [],
    Periode: null,
  });
  const [debouncedFilters] = useDebounce(filters, 200);

  /**
   * Charge une page de projets avec filtres appliqués côté back-end
   */
  const loadPage = useCallback(
    async (pageToLoad = 1) => {
      if (loadingRef.current || !hasMoreRef.current) return;

      loadingRef.current = true;
      setLoading(true);

      try {
        // Convertit les filtres en query string
          const query = new URLSearchParams();
          query.append('page', pageToLoad);
          Object.entries(debouncedFilters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              value.forEach(val => query.append(`${key}[]`, val));
            } else if (value) {
              query.append(key, value);
            }
          });

console.log(query.toString());

        const res = await callApi(`/cfp/projets/${selected}?${query.toString()}`);

        const newProjets = res.projets || [];

        // Si première page vide
        if (newProjets.length === 0 && pageToLoad === 1) {
          setData([]);
          hasMoreRef.current = false;
          setHasMore(false);
          return;
        }

        // Vérifie s'il reste des pages
        if (newProjets.length < ITEMS_PER_PAGE || res.has_more === false) {
          hasMoreRef.current = false;
          setHasMore(false);
        } else {
          hasMoreRef.current = true;
          setHasMore(true);
        }

        // Met à jour la liste des projets
        setData((prev) => (pageToLoad === 1 ? newProjets : [...prev, ...newProjets]));
        setPage(pageToLoad);
      } catch (error) {
        console.error(error);
        hasMoreRef.current = false;
        setHasMore(false);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [callApi, selected, debouncedFilters]
  );

  /**
   * Reset des données quand on change d'onglet (selected)
   */
  useEffect(() => {
    hasMoreRef.current = true;
    setData([]);
    setPage(1);
    setHasMore(true);
    loadPage(1);
  }, [selected, loadPage]);

  /**
   * Reset des données quand on change les filtres
   */
  useEffect(() => {
    hasMoreRef.current = true;
    setData([]);
    setPage(1);
    setHasMore(true);
    loadPage(1);
  }, [debouncedFilters, loadPage]);

  /**
   * Scroll infini avec IntersectionObserver
   */
  useEffect(() => {
    if (!sentinelRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !loading) {
          loadPage(page + 1);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [page, loading, hasMore, loadPage]);
console.log(data);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full mx-auto tab-content-project">
        <div className="block transition-opacity duration-200 opacity-100">
          <MemoSearchBar selected={filters} setSelected={setFilters} />
        </div>

        <div className="flex flex-col flex-grow" id="scrollArea">
          {data.length > 0 ? (
            <>
              <ResultSearch data={data} />

              {loading && (
                <p className="text-center py-4 text-gray-500">Chargement...</p>
              )}

              {!loading && !hasMore && (
                <p className="text-center py-4 text-gray-400">Fin des résultats</p>
              )}

              {/* Sentinelle invisible pour déclencher le scroll infini */}
              <div ref={sentinelRef} style={{ height: 1 }} />
            </>
          ) : (
            <div className="py-10 text-center text-gray-500">
              {loading ? "Chargement..." : "Aucun projet trouvé."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MemoSearchBar = React.memo(AllSearchBar);
