// filterContext.jsx
import { createContext, useContext, useState } from "react";

// Création du contexte
export const FilterContext = createContext();

// Fournisseur de contexte
export const FilterProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // modal fermé par défaut

  // Fonction utilitaire pour toggler l'ouverture
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <FilterContext.Provider value={{ isOpen, setIsOpen, toggleModal }}>
      {children}
    </FilterContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useFilter = () => useContext(FilterContext);
