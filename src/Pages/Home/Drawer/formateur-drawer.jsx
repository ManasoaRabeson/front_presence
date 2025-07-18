import React, { useState, forwardRef } from "react";
const FormateurDrawer = forwardRef(({ isOpen, onClose }, ref) => {
// export default function FormateurDrawer({ isOpen, onClose }) {
  const [showEdit, setShowEdit] = useState(false);
  if (!isOpen) return null;

  return (<>{!showEdit && 
    <div 
    ref={ref}      
    className={`fixed top-0 right-0 z-50 h-full w-full max-w-[60rem] bg-white shadow-2xl overflow-y-auto transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true">
      <div className="bg-white w-[60rem] h-full shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="w-full px-4 py-2 flex items-center justify-between bg-gray-100">
          <p className="text-lg text-gray-500 font-medium">A propos du formateur</p>
          <div className="flex items-center gap-2">
            <button className="text-sm border border-gray-300 px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setShowEdit(!showEdit)}
            >
              <i className="fa-solid fa-add mr-2"></i>Ajouter d'autre formateur
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-md hover:bg-gray-200 flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark text-gray-500"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Profile */}
          <div className="flex p-4 rounded-3xl bg-gray-50">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src="https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/6686b29f6595b.webp"
                alt="profil"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-bold text-gray-700">Raveloson Levy</h3>
              <p className="text-base text-gray-500">Formateur expert</p>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="border border-dashed border-gray-200 rounded-md p-4 space-y-2">
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold text-gray-600">Email :</h5>
              <p className="text-base text-gray-400">contact@forma-fusion.com</p>
            </div>
            <div className="flex justify-between">
              <h5 className="text-lg font-semibold text-gray-600">Téléphone :</h5>
              <p className="text-base text-gray-400">(+261) 32 03 231 62</p>
            </div>
          </div>

          {/* Expériences et Formations */}
          <div className="border border-dashed border-gray-200 rounded-md p-4 space-y-4">
            <div>
              <h5 className="text-lg font-semibold text-gray-600">Expériences</h5>
              <ul className="space-y-2">
                <li className="flex justify-between text-gray-400">
                  <div className="flex gap-2">
                    <span>Formateur</span>
                    <span>- NUMERIKA</span>
                  </div>
                  <span>20 janv. 2016 - 20 oct. 2024</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <div className="flex gap-2">
                    <span>Ecommerce</span>
                    <span>- Newrise</span>
                  </div>
                  <span>20 janv. 2007 - 20 déc. 2015</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-600">Formations</h5>
              <ul className="space-y-2">
                <li className="flex justify-between text-gray-400">
                  <div className="flex gap-2">
                    <span>DSSAE</span>
                    <span>- INSCAE</span>
                  </div>
                  <span>20 janv. 1997 - 20 déc. 2000</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Compétences et Langues */}
          <div className="border border-dashed border-gray-200 rounded-md p-4 space-y-4">
            <div>
              <h5 className="text-lg font-semibold text-gray-600">Compétences</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="flex justify-between">
                  <span>Microsoft Excel</span>
                  <span className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src="/stars/star-on.png" className="w-5 h-5" alt="star" />
                    ))}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Microsoft Power BI</span>
                  <span className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src="/stars/star-on.png" className="w-5 h-5" alt="star" />
                    ))}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-600">Langues</h5>
              <ul className="space-y-2 text-gray-400">
                {[{ name: "Français", stars: 4 }, { name: "Anglais", stars: 4 }, { name: "Malagasy", stars: 4 }].map((lang, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={`/stars/star-${i < lang.stars ? "on" : "off"}.png`}
                          className="w-5 h-5"
                          alt="star"
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>}
    {showEdit && 
    <FormateurDrawerEdit
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
      />
      }
    </>
  );
});
export default FormateurDrawer;



function FormateurDrawerEdit({ isOpen, onClose }) {
  const allFormateurs = [
    { id: 42, nom: "Andrianjafisoa", prenom: "Mialy Vololona Eva", photo: "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/672c52eeb1eec.webp" },
    { id: 22, nom: "El Fayad", prenom: "Said Oumari", photo: "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/66c606b059d6e.webp" },
    { id: 320, nom: "RAKOTOMANDIMBY JEAN FREDY", prenom: "Soasombola Tsilavina", photo: "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/1740403237.png" },
    { id: 1094, nom: "RAMAROKOTO ANDRIANIRINTSOA", prenom: "Tsiory Dera", photo: "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/6756e88a9b88f.webp" },
    { id: 1356, nom: "RAMIANDRISOANIANINA", prenom: "Daniel Eddy", photo: "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/67b583cc6e13a.webp" },
    { id: 152, nom: "Raveloson", prenom: "Levy", photo: "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/6686b29f6595b.webp" },
    { id: 32, nom: "Tovoniaina", prenom: "Tsinjonjanahary Ernest", photo: "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/formateurs/1737356626.png" },
  ];

  const [selected, setSelected] = useState([152]);
  const [search, setSearch] = useState("");

  const ajouter = (id) => setSelected((prev) => [...prev, id]);
  const retirer = (id) => setSelected((prev) => prev.filter((i) => i !== id));

  const formateursFiltrés = allFormateurs.filter((f) =>
    `${f.nom} ${f.prenom}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full max-w-[60rem] bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* En-tête */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-100">
        <p className="text-lg font-medium text-gray-600">À propos du formateur</p>
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-200"
            onClick={onClose}
          >
           <i className="fa-solid fa-arrow-left text-xl text-gray-600" />

          </button>
        </div>
      </div>

      {/* Corps */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tous les formateurs */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Liste de tous les formateurs</h2>
          <input
            type="text"
            placeholder="🔍 Chercher un formateur"
            className="input input-bordered w-full mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="space-y-4">
            {formateursFiltrés.map((f) => (
              <div key={f.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={f.photo}
                    alt={f.nom}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold uppercase text-slate-700">{f.nom}</span>
                    <span className="text-sm text-slate-600">{f.prenom}</span>
                  </div>
                </div>
                <button
                  onClick={() => ajouter(f.id)}
                  disabled={selected.includes(f.id)}
                  className="btn btn-sm btn-success btn-outline rounded-full"
                >
                  <i className="fa-solid fa-plus" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Formateurs sélectionnés */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Formateurs sélectionnés</h2>
          {selected.length === 0 ? (
            <p className="text-gray-500 italic">Aucun formateur sélectionné.</p>
          ) : (
            <div className="space-y-4">
              {selected.map((id) => {
                const f = allFormateurs.find((f) => f.id === id);
                if (!f) return null;
                return (
                  <div key={f.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow">
                    <div className="flex items-center gap-4">
                      <img
                        src={f.photo}
                        alt={f.nom}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold uppercase text-slate-700">{f.nom}</span>
                        <span className="text-sm text-slate-600">{f.prenom}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => retirer(f.id)}
                      className="btn btn-sm btn-error btn-outline rounded-full"
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
