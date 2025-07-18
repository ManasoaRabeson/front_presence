import axios from "axios";
// export const handleConverti = async(idInvoice) =>{
//   try {
//     // console.log(sessionStorage.getItem('token'));
    
//    await axios.post(`http://127.0.0.1:8000/api/cfp/factureProfo/${idInvoice}/convertir`,{}, {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`
//       }
//     });
//    window.location.reload();


//   } catch (error) {
//     console.error('Erreur lors de l’approbation :', error);
//   }
// }
export const handleApprouve = async(idInvoice,setData,index,setLoading) =>{
    try {
      // console.log(sessionStorage.getItem('token'));
      setLoading(true);
      const response = await axios.post(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/approve`,{}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      if (response.data) {
        setData(prevData => ({
          ...prevData,
          invoices: prevData.invoices.map((invoice, i) => {
            if (i === index) {
              return {
                ...invoice,
                invoice_status: 2,
                status_color: "rose-500",
                status: {
                  ...invoice.status,
                  idInvoiceStatus: 2,
                  invoice_status_name: "Non envoyé"
                }
              };
            } else {
              return invoice;
            }
          })
        }));
      }  

    } catch (error) {
      console.error('Erreur lors de l’approbation :', error);
    }finally{
      setLoading(false);
    }
  }
  export const handleApprouveDraft = async(idInvoice) =>{
    try {
     const response = await axios.post(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/approve`,{},{
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
              }
     });
     if(response.data.message ==='OK'){
      window.location.reload();
     }
   
    //  setData(prevData => ({
    //   ...prevData,
    //   invoicesDraft: {
    //     ...prevData.invoicesDraft,
    //     invoicesDraft: prevData.invoicesDraft.map((invoice, i) => {
    //       if (i === index) { 
    //         return {
    //           ...invoice,
    //           invoice_status: 2,
    //           status : {...invoice.status ,
    //             idInvoiceStatus: 2,
    //             invoice_status_name : "Non envoyé" 
    //             }
    //         };
    //       } else {
    //         return invoice;
    //       }
    //     })
    //   }
    // }));
    // console.log(data);
    
    } catch (error) {
      console.error('Erreur lors de l’approbation :', error);
    }
  }
  export const handleCancel = async(idInvoice,setData,index)=>{
    try {
      const response= await axios.post(`http://127.0.0.1:8000/api/cfp/factures/${idInvoice}/cancel`,{},{
        headers:{
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }});
      if(response.data.message ==="OK"){
        setData(prevData => ({
          ...prevData,
          invoices:  prevData.invoices.map((invoice, i) => {
              if (i === index) { 
                return {
                  ...invoice,
                  invoice_status: 9,
                  status_color : "rose-500",
                  status : {...invoice.status ,
                    idInvoiceStatus: 9,
                    invoice_status_name : "Annulé" 
                    }
                };
              } else {
                return invoice;
              }
            })
          }));
      }

    } catch (error) {
      console.error('Erreur lors de l\'annulation :', error);
    }
  }
  export const handleSendEmail = async(idInvoice,setData,index,setLoading) => {
    try {
      setLoading(true);
      // Effectuer un appel POST avec des données dans le body
   const response =  await axios.post(`http://127.0.0.1:8000/api/cfp/factures/send-invoice-email/${idInvoice}`,{},{
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
    });
    
    if(response.data.status === 400){
      console.log(response.data.message);
    }
      if(response.data.status === 200) {
        setData(prevData => ({
          ...prevData,
          invoices: prevData.invoices.map((invoice, i) => {
              if (i === index) { 
                return {
                  ...invoice,
                  invoice_status: 3,status_color : "[#37718e]",
                  status : {...invoice.status ,
                    idInvoiceStatus: 3,
                    invoice_status_name : "Envoyé" 
                    }
                };
              } else {
                return invoice;
              }
            })
          
        }));
      }
      
    } catch (err) {
      console.error('Erreur lors de l\'envoi des données:', err);
    }finally{
      setLoading(false);
    }
  }
  export const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return '#9CA3AF'; // gray-400
      case 2:
        return '#F43F5E'; // rose-500
      case 3:
        return '#37718e'; // couleur personnalisée
      case 4:
        return '#0D9488'; // teal-600
      case 5:
        return '#CA8A04'; // yellow-600
      case 6:
        return '#F87171'; // red-400
      case 7:
        return '#16A34A'; // green-600
      case 8:
        return '#DC2626'; // red-600
      case 9:
        return '#F43F5E'; // rose-500
      default:
        return '#3B82F6'; // bleu (par défaut)
    }
  };
  