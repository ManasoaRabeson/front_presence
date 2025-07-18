import { createContext, useEffect, useState } from "react";
export const InvoiceContext = createContext();
export const InvoiceProvider = ({ children }) => {
  const [isPaid, setIsPaid] = useState(0);
  const [idInvoice, setIdInvoice] = useState(() => {
    return sessionStorage.getItem('id') || null;
  });
  const [pageRecent] = useState();
  useEffect(() => {
    if (idInvoice) {
      sessionStorage.setItem('id', idInvoice);
    }
  }, [idInvoice]);
  return (
    <InvoiceContext.Provider value={{ isPaid, setIsPaid, idInvoice, setIdInvoice, pageRecent }}>
      {children}
    </InvoiceContext.Provider>
  );
};
