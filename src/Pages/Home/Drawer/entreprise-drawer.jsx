import React, { useState, forwardRef } from "react";
 const EntrepriseDrawer = forwardRef(({ isOpen, onClose }, ref) => {

  const [showClientEdit, setShowClientEdit] = useState(false);

  const handleEdit = () => {
    setShowClientEdit(!showClientEdit);
  };


  return (
    <>{ !showClientEdit &&
    <div
      ref={ref}
      className={`fixed top-0 right-0 z-50 h-full w-[70em] bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Header buttons */}
      <div className="absolute top-1 right-1 flex items-center gap-2">
        <button
          onClick={handleEdit}
          className="btn border border-slate-300 text-sm px-3 py-1 rounded-md text-slate-700 hover:bg-gray-100"
        >
          <i className="fa-solid fa-pen mr-1"></i>Changer l'entreprise
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-500"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full mt-12">
        {/* Profil Entreprise */}
        <div className="w-full p-3">
          <div className="flex items-center gap-3">
            <div className="w-[116px] h-[77px] bg-white flex items-center justify-center p-1">
              <img
                className="object-cover w-full h-auto rounded-xl"
                src="https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/entreprises/681a0e123a24f.webp"
                alt="SALONE"
              />
            </div>
            <div className="flex flex-col justify-start gap-y-2 w-full">
              <h3 className="text-2xl font-bold text-gray-700">SALONE</h3>
              <p className="text-base text-gray-500">Site web --</p>
            </div>
          </div>
        </div>

        {/* Référent principal */}
        <div className="w-full px-4">
          <div>
            <p className="text-xl font-semibold text-gray-900 mb-2">Référent principal</p>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  <i className="fa-solid fa-user mr-1"></i> Admin_SALONE Admin_SALONE
                </p>
                <p className="text-sm text-gray-500">
                  <i className="fa-solid fa-envelope mr-1"></i> salone@forma-fusion.com
                </p>
                <p className="text-sm text-gray-500">
                  <i className="fa-solid fa-phone mr-1"></i> --
                </p>
              </div>
            </div>
          </div>

          {/* Autres référents */}
          <div className="mt-4">
            <p className="text-xl font-semibold text-gray-900 mb-2">Autres référents</p>
            {/* Liste vide ou future boucle ici */}
          </div>

          {/* Projets en cours */}
          <div className="mt-4">
            <span className="text-md rounded-xl py-1 px-3 text-white bg-[#369ACC]"> En cours </span>
          </div>

          <div className="mt-1 overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-gray-700">
                <tr>
                  <th className="px-2 py-2">#</th>
                  <th className="px-2 py-2">Cours</th>
                  <th className="px-2 py-2">Ref</th>
                  <th className="px-2 py-2">Lieu</th>
                  <th className="px-2 py-2 text-center">
                    <i className="fa-solid fa-user text-sm"></i>
                  </th>
                  <th className="px-2 py-2">Montant (Ar)</th>
                  <th className="px-2 py-2">
                    <i className="fa-solid fa-money-bill-transfer"></i>
                  </th>
                  <th className="px-2 py-2">Début - Fin</th>
                  <th className="px-2 py-2 text-center">Détail</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-2 py-1">1</td>
                  <td className="px-2 py-1">Bundle Power BI ...</td>
                  <td className="px-2 py-1">SALONE</td>
                  <td className="px-2 py-1">Antananarivo (101)</td>
                  <td className="px-2 py-1 text-center">0</td>
                  <td className="px-2 py-1">3.20M Ar</td>
                  <td className="px-2 py-1">
                    <i className="fa-solid fa-circle-question text-gray-500" title="Non facturé"></i>
                  </td>
                  <td className="px-2 py-1">4.07.25 - 26.09.25</td>
                  <td className="px-2 py-1 text-center">
                    <a href="/cfp/projets/849/detail">
                      <i className="fa-solid fa-eye opacity-50"></i>
                    </a>
                  </td>
                </tr>
                {/* Ajoute ici d'autres lignes si nécessaire */}
              </tbody>
            </table>
          </div>

          {/* Tu peux ajouter les autres tableaux ici avec les mêmes structures (préparation, terminé, etc.) */}
        </div>
      </div>
    </div>}
    {showClientEdit && <ClientEditDrawer onClose={() => setShowClientEdit(false)} />}
    </>
  );
});

export default EntrepriseDrawer ;
const entreprises = [
  {
    id: 1761,
    nom: '2ACF',
    email: '2ACF forma-fusion.com',
    avatar: null,
  },
  {
    id: 2039,
    nom: 'ACTIV SOLUTIONS MADAGASCAR',
    email: 'activsolutionsforma-fusion.com',
    avatar: 'https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/entreprises/680f302f434c9.webp',
  },
];

const selectedEntreprise = {
  id: 681,
  nom: 'SALONE',
  email: 'saloneforma-fusion.com',
  avatar: 'https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/entreprises/681a0e123a24f.webp',
};

function ClientEditDrawer({ onClose }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(selectedEntreprise);

  const handleAssign = (etpId) => {
    const etp = entreprises.find((e) => e.id === etpId);
    if (etp) setSelected(etp);
  };

  const filtered = entreprises.filter((etp) =>
    etp.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed top-0 right-0 z-50 h-full w-[70em] bg-white shadow-xl overflow-y-auto transition-transform duration-300 translate-x-0">
      {/* Bouton fermer */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-gray-200 text-gray-500 flex items-center justify-center"
        >
          <i className="fa-solid fa-arrow-left text-xl text-gray-600" />
        </button>
      </div>

      <div className="flex h-full p-6 mt-12">
        {/* Liste des clients */}
        <div className="flex flex-col w-1/2 pr-6 border-r border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-red-400"></div>
            <h2 className="text-2xl font-semibold text-slate-700">Entreprises disponibles</h2>
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Chercher une entreprise"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <i className="fa fa-search absolute top-2.5 left-3 text-gray-400"></i>
          </div>

          <div className="space-y-3 overflow-y-auto pr-2">
            {filtered.map((etp) => (
              <div
                key={etp.id}
                className="flex items-center justify-between p-3 bg-white shadow-sm rounded-md hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-20 h-14 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
                    {etp.avatar ? (
                      <img
                        src={etp.avatar}
                        alt={etp.nom}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-xl font-bold text-slate-600">{etp.nom[0]}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold uppercase text-slate-700">{etp.nom}</h3>
                    <p className="text-sm text-slate-500">{etp.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAssign(etp.id)}
                  className="px-3 py-1 border border-green-500 text-green-600 text-sm rounded-md hover:bg-green-100"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Client sélectionné */}
        <div className="flex flex-col w-1/2 pl-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-green-400"></div>
            <h2 className="text-2xl font-semibold text-slate-700">Client sélectionné</h2>
          </div>

          <div className="p-4 bg-white rounded-md shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-24 h-16 rounded-md overflow-hidden bg-slate-100 flex items-center justify-center">
                {selected.avatar ? (
                  <img
                    src={selected.avatar}
                    alt={selected.nom}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-xl font-bold text-slate-600">{selected.nom[0]}</span>
                )}
              </div>
              <div>
                <h3 className="font-bold uppercase text-slate-700 text-lg">{selected.nom}</h3>
                <p className="text-sm text-slate-500">{selected.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

