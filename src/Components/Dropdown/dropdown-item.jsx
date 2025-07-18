import React, { useContext } from 'react';
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { ExportPdf } from '../../Services/export-pdf';
import { InvoiceContext } from '../../Contexts/invoice';
import { useNavigate } from 'react-router-dom';
import useApi from '../../Hooks/Api';
dayjs.locale("fr");
const DropdownItem = ({
  type = '',
  titre = '',
  action = '',
  nature = '',
  onClick = () => {},
  idInvoice,
  drawerClick,
  data,
  setData
})=> {
  // const formatDate = (date) => dayjs(date).format("D MMMM YYYY");
  const { setIdInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();
  const {callApi} = useApi();
  const handleClick = async () => {
    if (titre === "Exporter en PDF") {
      ExportPdf(idInvoice);
    } else if (titre === "Supprimer") {
      try {
        const res = await callApi(`/cfp/factures/${idInvoice}/destroy`, { method: 'GET' });
        if(res.status === 200){
          const filtrer = data.invoices.filter(invoice => invoice.idInvoice !== idInvoice);
          setData(prevData => ({
            ...prevData,
            invoices: filtrer
          }));
        }

      } catch (error) {
        alert(error);
      }
    }else if(nature ==="EditerInvoice"){
      setIdInvoice(idInvoice);
      navigate("/edit-invoice")
    } else if(nature ==="EditerProforma")
    {
      setIdInvoice(idInvoice);
      navigate("/edit-proforma");
    }else {
      setIdInvoice(idInvoice);
      navigate("/details" );
    }
  };

  const renderByType = () => {
    switch (type) {
      case 'lien':
        return (
          <li>
            <a onClick={handleClick} className="dropdown-item hover:bg-gray-50 text-base text-gray-600 cursor-pointer">
              {titre}
            </a>
          </li>
        );
      case 'buttonDelete':
        return (
          <li className="z-50">
            <form action={action} method="post">
              <button type="submit" className="dropdown-item hover:bg-gray-50 text-base text-gray-600">
                {titre}
              </button>
            </form>
          </li>
        );
      case 'customBtn':
        return (
          <li>
            <button onClick={onClick} type="button" className="dropdown-item hover:bg-gray-50 text-base text-gray-600">
              {titre}
            </button>
          </li>
        );
      case 'drawer':
        return (
          <li>
            <a onClick={drawerClick} className="dropdown-item hover:bg-gray-50 text-base text-gray-600 cursor-pointer">
              {titre}
            </a>
          </li>
        );
      default:
        return null;
    }
  };

  return renderByType();
};

export default React.memo(DropdownItem);
