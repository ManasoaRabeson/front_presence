import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { AllSearchBar } from "./all-search-bar";
import { ResultSearch } from "./result-search";
import useApi from "../../Hooks/Api";
import { ProjectContext } from "../../Contexts/count-project";
import { useDebounce } from "use-debounce";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const loadPage = useCallback(
    async (pageToLoad = 1) => {
      if (loadingRef.current || !hasMoreRef.current) return;

      loadingRef.current = true;
      setLoading(true);

      try {
        // Convertit les filtres en query string
        const query = new URLSearchParams();
        query.append("page", pageToLoad);
        Object.entries(debouncedFilters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            value.forEach((val) => query.append(`${key}[]`, val));
          } else if (value) {
            query.append(key, value);
          }
        });

        const res = await callApi(
          `/cfp/projets/${selected}?${query.toString()}`
        );

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
        setData((prev) =>
          pageToLoad === 1 ? newProjets : [...prev, ...newProjets]
        );
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
  // console.log(data);
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
                <p className="text-center py-4 text-gray-500">{t("loading")}</p>
              )}

              {!loading && !hasMore && (
                <p className="text-center py-4 text-gray-400">
                  {t("endOfResults")}
                </p>
              )}

              {/* Sentinelle invisible pour déclencher le scroll infini */}
              <div ref={sentinelRef} style={{ height: 1 }} />
            </>
          ) : (
            <div className="py-10 text-center text-gray-500">
              {loading ? t("loading") : t("noResults")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MemoSearchBar = React.memo(AllSearchBar);
