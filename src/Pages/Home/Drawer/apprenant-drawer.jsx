import React, { useState, forwardRef } from "react";

const ApprenantDrawer = forwardRef(({ isOpen, onClose ,module}, ref) => {
  // export default function ApprenantDrawer({ isOpen, onClose, module }) {
  const [showAddAppr, setShowAddAppr] = useState(false);
  const apprenants = [
    {
      nom: "MAHAZOMANANA",
      prenom: "Tiffani",
      entreprise: "GROUPE FILATEX (IMMOBILIER)",
      score1: 0,
      score2: 0,
    },
    {
      nom: "SARANGAN",
      prenom: "Judgeerao",
      entreprise: "GROUPE FILATEX (IMMOBILIER)",
      score1: 0,
      score2: 0,
    },
  ];

  return (
    <>{!showAddAppr && 
    <div
       ref={ref}
      className={`fixed top-0 right-0 z-50 h-full w-full max-w-[60rem] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-100">
        <p className="text-lg font-medium text-gray-600">
          Nombres d'apprenants : <span className="font-bold">{apprenants.length}</span>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddAppr(!showAddAppr)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-black border border-black rounded-lg hover:bg-green-50 transition"
          >
            <i className="fa-solid fa-plus"></i>
            Ajouter d'autres apprenants
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-600"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 px-6 py-6">
        {/* Module info card */}
        <div className="bg-white rounded-xl shadow p-4 flex gap-4 items-center">
          <div className="w-[116px] h-[77px] rounded-xl overflow-hidden border">
            <img
              src={module?.image}
              alt="Module"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center w-full">
            <h3 className="text-2xl font-semibold text-slate-800 line-clamp-2">
              {module?.title ?? "Nom du module"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-3">
              {module?.description ?? "Description du module"}
            </p>
          </div>
        </div>

        {/* Liste des apprenants */}
        <div>
          <p className="text-xl font-medium text-gray-600 mt-4 mb-2">
            GROUPE FILATEX (IMMOBILIER)
          </p>
          <ul className="divide-y divide-dashed divide-gray-200">
            {apprenants.map((apprenant, idx) => (
              <li key={idx} className="py-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <i className="fa-solid fa-user text-xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg text-slate-600 font-medium">
                      {apprenant.nom}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-base text-slate-600">{apprenant.prenom}</p>
                      <div className="flex gap-2">
                        {[apprenant.score1, apprenant.score2].map((score, i) => (
                          <div
                            key={i}
                            className="relative w-[27px] h-[35px] border border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-800"
                          >
                            {score}
                            <span
                              className={`absolute bottom-0 left-0 w-full z-[-1] rounded-md ${
                                i === 0
                                  ? "bg-gray-700/50"
                                  : "bg-[#a462a4]/50"
                              }`}
                              style={{ height: `${score}%` }}
                            ></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>}
    {showAddAppr && 
    <AddApprenantDrawer   isOpen={showAddAppr}
    onClose={() => setShowAddAppr(false)}/> }
    </>
  );
});
export default ApprenantDrawer;


function AddApprenantDrawer({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const [selectedEtp, setSelectedEtp] = useState("1007");
  const [selectedApprenants, setSelectedApprenants] = useState([
    { id: 1336, nom: "AKBARALY", prenom: "Sidika" },
    { id: 1337, nom: "MAMODHOUSSEN", prenom: "Sarah" },
  ]);

  const allApprenants = [
    { id: 1336, nom: "AKBARALY", prenom: "Sidika", entrepriseId: "1007" },
    { id: 1337, nom: "MAMODHOUSSEN", prenom: "Sarah", entrepriseId: "1007" },
    { id: 1008, nom: "SIDIKA", prenom: "AKBARALY", entrepriseId: "1007" },
  ];

  const entreprises = [{ id: "1007", nom: "Groupe SIPROMAD" }];

  const ajouterApprenant = (apprenant) => {
    if (!selectedApprenants.find((a) => a.id === apprenant.id)) {
      setSelectedApprenants([...selectedApprenants, apprenant]);
    }
  };

  const supprimerApprenant = (id) => {
    setSelectedApprenants(selectedApprenants.filter((a) => a.id !== id));
  };

  const apprenantsFiltres = allApprenants.filter(
    (a) =>
      a.entrepriseId === selectedEtp &&
      (a.nom.toLowerCase().includes(search.toLowerCase()) ||
        a.prenom.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full max-w-[60rem] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-100">
        <h2 className="text-xl font-semibold text-slate-700">
          👥 Apprenants sélectionnés :{" "}
          <span className="text-indigo-600">{selectedApprenants.length}</span>
        </h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600"
        >
          <i className="fa-solid fa-arrow-left text-xl text-gray-600" />

        </button>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liste des apprenants disponibles */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Apprenants disponibles</h3>
          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="🔍 Rechercher par nom ou prénom"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={selectedEtp}
              onChange={(e) => setSelectedEtp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none"
            >
              {entreprises.map((etp) => (
                <option key={etp.id} value={etp.id}>
                  {etp.nom}
                </option>
              ))}
            </select>
          </div>

          <ul className="space-y-3">
            {apprenantsFiltres.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm uppercase">
                    {a.nom.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-slate-700">{a.nom}</p>
                    <p className="text-slate-500">{a.prenom}</p>
                  </div>
                </div>
                <button
                  onClick={() => ajouterApprenant(a)}
                  className="text-green-600 hover:text-white hover:bg-green-500 border border-green-500 rounded-full w-8 h-8 flex items-center justify-center transition"
                >
                  <i className="fa-solid fa-plus text-sm"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Liste des apprenants sélectionnés */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">Apprenants sélectionnés</h3>
          {entreprises.map((etp) => {
            const apprenantsEtp = selectedApprenants.filter(
              (a) =>
                allApprenants.find((ap) => ap.id === a.id)?.entrepriseId === etp.id
            );
            if (apprenantsEtp.length === 0) return null;

            return (
              <div key={etp.id} className="mb-6">
                <h4 className="text-base font-semibold text-indigo-700 mb-2">{etp.nom}</h4>
                <ul className="space-y-3">
                  {apprenantsEtp.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm uppercase">
                          {a.nom.charAt(0)}
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-slate-700">{a.nom}</p>
                          <p className="text-slate-500">{a.prenom}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => supprimerApprenant(a.id)}
                        className="text-red-600 hover:text-white hover:bg-red-500 border border-red-500 rounded-full w-8 h-8 flex items-center justify-center transition"
                      >
                        <i className="fa-solid fa-minus text-sm"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

