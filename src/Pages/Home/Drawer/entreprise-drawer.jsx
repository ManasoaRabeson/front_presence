import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useApi from "../../../Hooks/Api";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");
const EntrepriseDrawer = ({ idEtp, isOpen, onClose, ref }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [entreprise, setEntreprise] = useState(null);
  const { callApi } = useApi();
  const endpoint = import.meta.env.VITE_ENDPOINT_IMG;
  const { t } = useTranslation();
  const role = parseInt(sessionStorage.getItem("role"));
  console.log(role);
  useEffect(() => {
    if (!isOpen || !idEtp) return;

    const openEntrepriseDrawer = async (id) => {
      setIsLoading(true);
      setEntreprise(null);
      try {
        const res = await callApi(`/cfp/etp-drawer/${id}`);
        setEntreprise(res);
      } catch (error) {
        console.error("Erreur chargement entreprise", error);
      } finally {
        setIsLoading(false);
      }
    };
    openEntrepriseDrawer(idEtp);
  }, [idEtp, isOpen]);

  if (!isOpen) return null;
  //console.log(entreprise);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 z-50 h-full w-full max-w-[720px] bg-white shadow-xl overflow-y-auto px-6 md:px-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Header sticky */}
          <div className="sticky top-0 z-20 flex items-center justify-between py-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-700 truncate">
              {entreprise?.customer?.customerName || t("companyDetails")}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
              aria-label={t("close")}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {isLoading ? (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 text-lg font-semibold tracking-wide">
                  {t("loading")}
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="mt-6 mb-12"
            >
              {/* Profil Entreprise */}
              <section className="flex items-center gap-4 mb-8">
                <div className="w-[116px] h-[77px] rounded-xl overflow-hidden shadow-md flex items-center justify-center p-1 bg-white">
                  <img
                    className="object-contain w-full h-full"
                    src={
                      entreprise?.customer?.logo
                        ? `${endpoint}/img/entreprises/${entreprise.customer.logo}`
                        : `no_img.svg`
                    }
                    alt={t("companyLogo")}
                  />
                </div>
                <div className="flex flex-col justify-start gap-1 w-full truncate">
                  <h3 className="text-2xl font-bold text-gray-700 truncate">
                    {entreprise?.customer?.customerName}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {entreprise?.customer?.siteWeb}
                  </p>
                </div>
              </section>

              {/* Référent principal */}
              <section className="mb-8">
                <p className="text-xl font-semibold text-gray-900 mb-4">
                  {t("mainReferent")}
                </p>
                {entreprise?.referents?.[0] ? (
                  <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {`${entreprise.referents[0].name || ""} ${
                          entreprise.referents[0].firstName || ""
                        } ${entreprise.referents[0].fonction || ""}`}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <i className="fa-solid fa-envelope"></i>
                        {entreprise.referents[0].email || ""}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <i className="fa-solid fa-phone"></i>
                        {entreprise.referents[0].phone || ""}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">{t("noReferent")}</p>
                )}
              </section>

              {/* Autres référents */}
              <section className="mb-10">
                <p className="text-xl font-semibold text-gray-900 mb-4">
                  {t("otherReferents")}
                </p>
                {entreprise?.referents?.slice(1).length ? (
                  <ul className="space-y-3">
                    {entreprise.referents.slice(1).map((referent, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg shadow-sm"
                      >
                        <div className="flex-shrink-0">
                          {referent.photo ? (
                            <img
                              className="w-12 h-12 rounded-full object-cover"
                              src={`https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/employes/${referent.photo}`}
                              alt={`${referent.name || ""}`}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl">
                              {referent.name ? referent.name?.charAt(0) : "I"}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate flex items-center gap-1">
                            <i className="fa-solid fa-user text-sm"></i>
                            {referent.name || ""} {referent.firstName || ""}{" "}
                            {referent.fonction ? `(${referent.fonction})` : ""}
                          </p>
                          <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                            <i className="fa-solid fa-envelope text-sm"></i>
                            {referent.email || "--"}
                          </p>
                          <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                            <i className="fa-solid fa-phone text-sm"></i>
                            {referent.phone || "--"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">{t("otherReferents")}</p>
                )}
              </section>

              {/* Projets */}
              {role === 3 && (
                <>
                  {entreprise.projects_future?.length > 0 && (
                    <TableProject
                      data={entreprise.projects_future}
                      etat={t("planned")}
                    />
                  )}
                  {entreprise.projects_in_preparation?.length > 0 && (
                    <TableProject
                      data={entreprise.projects_in_preparation}
                      etat={t("preparing")}
                    />
                  )}
                  {entreprise.projects_in_progress?.length > 0 && (
                    <TableProject
                      data={entreprise.projects_in_progress}
                      etat={t("inProgress")}
                    />
                  )}
                  {entreprise.projects_finished?.length > 0 && (
                    <TableProject
                      data={entreprise.projects_finished}
                      etat={t("finished")}
                    />
                  )}
                  {entreprise.projects_fenced?.length > 0 && (
                    <TableProject
                      data={entreprise.projects_fenced}
                      etat={t("closed")}
                    />
                  )}
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntrepriseDrawer;

function TableProject({ data, etat }) {
  const { t } = useTranslation();
  console.log(data);
  const colorClass =
    {
      [t("closed")]: "bg-[#6F1926] text-white",
      [t("inProgress")]: "bg-[#369ACC] text-white",
      [t("preparing")]: "bg-[#F8E16F] text-gray-800",
      [t("planned")]: "bg-[#CBABD1] text-white",
      [t("finished")]: "bg-[#95CF92] text-white",
    }[etat] || "bg-gray-400 text-white";

  return (
    <section className="mb-10">
      <div className="mt-6">
        <span
          className={`text-sm font-medium inline-block rounded-full py-1 px-4 ${colorClass}`}
        >
          {etat}
        </span>
      </div>

      <div className="mt-2 overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="min-w-[1000px]  divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">{t("Cours")}</th>
              <th className="px-6 py-3 text-left">{t("Ref")}</th>
              <th className="px-6 py-3 text-left">{t("Ville")}</th>
              <th className="px-6 py-3 text-center">
                <i className="fa-solid fa-user"></i>
              </th>
              <th className="px-6 py-3 text-right">{t("Montant (Ar)")}</th>
              <th className="px-6 py-3 text-center">
                <i className="fa-solid fa-money-bill-transfer"></i>
              </th>
              <th className="px-6 py-3 text-left">{t("Début - Fin")}</th>
              <th className="px-6 py-3 text-center">{t("Détail")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((project, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                title={`${project.module_name} (${project.project_reference})`}
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{project.module_name}</td>
                <td className="px-6 py-3">{project.project_reference}</td>
                <td className="px-6 py-3">{project.ville}</td>
                <td className="px-6 py-3 text-center">
                  {project.total_apprenant}
                </td>
                <td className="px-6 py-3 text-right">{project.total_ht}</td>
                <td className="px-6 py-3 text-center">
                  {project.isPaid ? (
                    <i
                      className="fa-solid fa-circle-check text-green-500"
                      title={t("Payé")}
                      aria-label={t("Payé")}
                    />
                  ) : (
                    <i
                      className="fa-solid fa-circle-question text-gray-400"
                      title={t("Non facturé")}
                      aria-label={t("Non facturé")}
                    />
                  )}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">
                  {dayjs(project.date_debut).format("DD MMM YYYY")} -{" "}
                  {dayjs(project.date_fin).format("DD MMM YYYY")}
                </td>
                <td className="px-6 py-3 text-center">
                  <a
                    href={`https://projet.mg.formafusion.io/cfp/projets/${project.id_projet}`}
                    aria-label={t("Voir détail")}
                  >
                    <i className="fa-solid fa-eye text-gray-500 hover:text-indigo-600 transition-colors"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
