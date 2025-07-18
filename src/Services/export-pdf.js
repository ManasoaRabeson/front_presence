import axios from "axios";

export const ExportPdf = async (idInvoice) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/cfp/factures/export/${idInvoice}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
   
    const contentType = response.headers["content-type"];
    if (contentType !== "application/pdf") {
      throw new Error("Le fichier retourné n'est pas un PDF");
    }

    const blob = new Blob([response.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(blob);
    
    // Créer une nouvelle fenêtre ou onglet avec un iframe pour afficher le PDF
    const newWindow = window.open("", "_blank");
    newWindow.document.title = `Facture-${idInvoice}.pdf`; // Définir le titre
    
    // Créer un iframe pour afficher le PDF
    const iframe = newWindow.document.createElement("iframe");
    iframe.src = pdfUrl;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    
    // Ajouter l'iframe à la nouvelle fenêtre
    newWindow.document.body.style.margin = "0";
    newWindow.document.body.appendChild(iframe);
    
    // Libérer la mémoire après un délai
    setTimeout(() => {
      URL.revokeObjectURL(pdfUrl);
    }, 1000);

  } catch (error) {
    console.error("Erreur lors de l'exportation en PDF", error);
  }
};