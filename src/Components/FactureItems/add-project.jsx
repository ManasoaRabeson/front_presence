import { useEffect } from "react";
import useApi from "../../Hooks/Api";
export function AddProject({ unites ,clientId ,items,setItems,setSumProject,isEdit}) {
  const {data,callApi} = useApi();
  useEffect(()=>{
    callApi(`/cfp/factures/projects/${clientId}`);
  },[clientId,callApi]);

  const calculerSommeTotale = (arr) =>
    arr.reduce((acc, item) => acc + (item.item_total_price || 0), 0);
    useEffect(()=>{
    setSumProject(calculerSommeTotale(items));
  },[isEdit,items]);
 

  // Gérer la modification des champs
  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "item_qty" || field === "item_unit_price") {
      const qty = parseFloat(updatedItems[index].item_qty) || 0;
      const price = parseFloat(updatedItems[index].item_unit_price) || 0;
      updatedItems[index].item_total_price = qty * price;
    }

    setItems(updatedItems);
    setSumProject(calculerSommeTotale(updatedItems));
  };

  // Supprimer un item
  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setSumProject(calculerSommeTotale(newItems));
  };

  return (
    <>
     {items.map((item, index) => (
        <tr key={index} className="border-b bg-slate-50 item-row">
          <td className="px-4 text-sm text-gray-700">
          <div className="inline-flex items-center gap-2">
          <div className="inline-flex items-center justify-between w-full gap-2">
          <label className="inline-flex items-center flex-1 text-base font-semibold">Projet</label>
            <select
              value={item.idProjet}
              onChange={(e) => handleChange(index, "idProjet", e.target.value)}
              className="p-2 text-base border rounded-md focus:outline-none focus:ring-purple-500 focus:ring-1 w-[100%]"
              required
              name={`items[${item.id}][idProjet]`}
            >
              <option value="">Sélectionner un projet</option>
              {data?.map((projet) => (
                <option key={projet.idProjet} value={projet.idProjet}>
                 {projet.module_name} | {projet.project_reference ?? 'Référence inconnue'} | {projet.dateDebut}
                </option>
              ))}
            </select>
            </div>
            <input type="number" className="hidden" name={`items[${item.id}][idItems]`} value="0"></input>
            </div>
          </td>
          <td className="px-4 text-sm">
            <textarea
              value={item.item_description}
              name={`items[${item.id}][item_description]`}
              onChange={(e) => handleChange(index, "item_description", e.target.value)}
              className="w-full p-2 text-base text-gray-500 border rounded-md outline-none"
              placeholder="Ecrire votre description"
              required
            />
          </td>
          <td className="px-4 text-sm">
            <input
              type="number"
              name={`items[${item.id}][item_qty]`}
              value={item.item_qty}
              onChange={(e) => handleChange(index, "item_qty", e.target.value)}
              className="w-full p-2 text-base text-center text-gray-500 border rounded-md outline-none item-quantity"
              min="1"
              required
            />
          </td>
          <td className="px-4 text-sm">
            <select
            name={`items[${item.id}][idUnite]`}
              value={item.idUnite}
              onChange={(e) => handleChange(index, "idUnite", e.target.value)}
              className="p-2 text-base border rounded-md focus:outline-none focus:ring-purple-500 focus:ring-1" 
              required
            >
              {unites.map((u) => (
                <option key={u.idUnite} value={u.idUnite}>
                  {u.unite_name}
                </option>
              ))}
            </select>
          </td>
          <td className="px-4 text-sm">
            <input
              type="number"
              name={`items[${item.id}][item_unit_price]`}
              value={item.item_unit_price}
              onChange={(e) => handleChange(index, "item_unit_price", e.target.value)}
              className="p-2 border rounded text-right w-full"
              placeholder="Prix unitaire"
              required
            />
          </td>
          <td className="px-4 text-sm">
            <p className="w-full p-2 text-base text-right text-gray-500 border rounded-md">
              {item.item_total_price || '0.00'}
            </p>
            <input
             type="hidden"
             name={`items[${item.id}][item_total_price]`}
             value={item.item_total_price || 0}
             readOnly
             required
            />
            </td>
          <td  className="px-4 text-sm text-right cursor-pointer remove-item">
            <button
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              <i className="text-base text-red-500 fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

