import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AppIcon = ({ iconUrl, label, colorClass }) => (
  <div
    className={`w-10 h-10 flex items-center justify-center rounded-xl ${colorClass} mb-1 transition-all hover:shadow-lg hover:scale-105 shadow-md`}
  >
    {iconUrl ? (
      <img
        src={iconUrl}
        alt={label}
        className="w-9 h-9 object-contain"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            label
          )}&background=E5E7EB&color=4B5563`;
        }}
      />
    ) : (
      <span className="text-white text-lg font-bold">
        {label.charAt(0).toUpperCase()}
      </span>
    )}
  </div>
);

const AppLauncher = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const categoryConfig = {
    PÉDAGOGIE: {
      colorClass: "bg-gradient-to-br from-blue-500 to-blue-600",
      titleColor: "text-blue-600",
      titleBg: "bg-blue-50",
    },
    ADMINISTRATION: {
      colorClass: "bg-gradient-to-br from-green-500 to-green-600",
      titleColor: "text-green-600",
      titleBg: "bg-green-50",
    },
    LOGISTIQUE: {
      colorClass: "bg-gradient-to-br from-purple-500 to-purple-600",
      titleColor: "text-purple-600",
      titleBg: "bg-purple-50",
    },
    "ANALYTICS & ÉVALUATION": {
      colorClass: "bg-gradient-to-br from-orange-500 to-orange-600",
      titleColor: "text-orange-600",
      titleBg: "bg-orange-50",
    },
    AUTRES: {
      colorClass: "bg-gradient-to-br from-gray-500 to-gray-600",
      titleColor: "text-gray-600",
      titleBg: "bg-gray-50",
    },
  };

  useEffect(() => {
    const fetchAppLaunchers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/applauncher"
        );
        if (!response.data) throw new Error("Aucune donnée reçue de l'API");

        const responseData = response.data.data || [];
        if (!Array.isArray(responseData))
          throw new Error("Format de données invalide");

        const formattedCategories = responseData.map((category) => {
          const config =
            categoryConfig[category.name] || categoryConfig["AUTRES"];

          return {
            name: category.name,
            titleColor: config.titleColor,
            titleBg: config.titleBg,
            items: category.items.map((item) => ({
              id: `${item.label}-${item.link}`,
              label: item.label,
              href: item.link,
              icon: item.icone
                ? `https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/${item.icone}`
                : null,
              colorClass: config.colorClass,
            })),
          };
        });

        setCategories(formattedCategories);
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(err.message || "Erreur lors du chargement des applications");
      } finally {
        setLoading(false);
      }
    };

    fetchAppLaunchers();
  }, []);

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-blue-500"></div>
        <p className="text-gray-600 text-sm font-medium">
          Chargement des applications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="text-center p-6 rounded-2xl bg-red-50 border border-red-100 max-w-md">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-700 font-medium text-sm mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }
  //console.log(filteredCategories);
  return (
    // <div className="w-full p-3 h-[500px] flex flex-col overflow-hidden">
    <div className="w-full p-3 max-h-[75vh] sm:max-h-[500px] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto pr-1">
        <AnimatePresence>
          {filteredCategories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-gray-500"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-center px-4">
                {searchQuery
                  ? `Aucune application trouvée pour "${searchQuery}"`
                  : "Aucune application disponible."}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <div className="text-center mb-2">
                    <h3
                      className={`text-xs font-bold ${category.titleColor} uppercase tracking-wide`}
                    >
                      {category.name}
                    </h3>
                  </div>

                  {/* <div className="grid grid-cols-5 gap-2 justify-items-center"> */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 justify-items-center">
                    {category.items.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          setSelectedApp(item.id);
                          if (item.href) {
                            window.open(
                              item.href,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex flex-col items-center p-1 rounded-lg transition-all text-center w-16 ${
                          selectedApp === item.id
                            ? "bg-white shadow-sm border border-gray-100"
                            : "hover:bg-white/50"
                        }`}
                      >
                        <AppIcon
                          iconUrl={item.icon}
                          label={item.label}
                          colorClass={item.colorClass}
                        />
                        <span className="text-[9px] font-medium text-gray-700 mt-1 line-clamp-2 leading-tight">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppLauncher;
