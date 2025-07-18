
import React, { useEffect, useState } from 'react'
import axios from 'axios';
const digitalOcean = "https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg";
export function AppLauncher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/applauncher");
        setData(res.data); // Accès direct à data
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

 
  // const menus = [
  //   { label: 'Apprenants', icone: 'img/icones/Apprenants.png', link: 'https://apprenants.forma-fusion.com/cfp/apprenants' },
  //   { label: 'Formateurs', icone: 'img/icones/Formateurs.png', link: 'https://formateurs.forma-fusion.com/cfp/forms' },
  //   { label: 'Administrateurs', icone: 'img/icones/Administrateurs.png', link: 'https://referents.forma-fusion.com/cfp/referents' },
  //   { label: 'Projets', icone: 'img/icones/Projets.png', link: 'https://projets.forma-fusion.com/cfp/projets' },
  //   { label: 'Agenda', icone: 'img/icones/Agenda.png', link: 'https://agenda.forma-fusion.com/agendaCfps' },
  //   { label: 'Réservation', icone: 'img/icones/Réservation.png', link: 'https://reservation.forma-fusion.com/cfp/rsv/5' },
  //   { label: 'Suivi pédagogique', icone: 'img/icones/Suivi pédagogique.png', link: 'https://suivipeda.forma-fusion.com/cfp/peda' },
  //   { label: 'Evaluation', icone: 'img/icones/Evaluation.png', link: 'https://evaluations.forma-fusion.com/cfp/projets' },
  //   { label: 'Tests', icone: 'img/icones/Tests.png', link: 'https://tests.forma-fusion.com/qcm/index' },
  //   { label: 'Factures', icone: 'img/icones/Factures.png', link: 'https://factures.forma-fusion.com/cfp/factures/id/1' },
  //   { label: 'Clients', icone: 'img/icones/Clients.png', link: 'https://clients.forma-fusion.com/cfp/invites/etp/list/1' },
  //   { label: 'Licence', icone: 'img/icones/Licence.png', link: 'https://licence.forma-fusion.com/cfp/abonnement' },
  //   { label: 'Marketplace', icone: 'img/icones/Marketplace.png', link: 'https://marketplace.forma-fusion.com/' },
  //   { label: 'Catalogue', icone: 'img/icones/Catalogue.png', link: 'https://catalogue.forma-fusion.com/cfp/modules' },
  //   { label: 'Présence', icone: 'img/icones/Présence.png', link: 'https://presence.forma-fusion.com/cfp/projets' },
  //   { label: 'Dossiers', icone: 'img/icones/Dossiers.png', link: 'https://dossiers.forma-fusion.com/cfp/dossier' },
  //   { label: 'Badges', icone: 'img/icones/Badges.png', link: 'https://badge.forma-fusion.com/cfp/badge' },
  //   { label: 'Lieu et Salle', icone: 'img/icones/Lieu et Salle.png', link: 'https://lieu-salle.forma-fusion.com/cfp/lieux' },
  //   { label: 'Analytics', icone: 'img/icones/Analytics.png', link: 'https://analytics.forma-fusion.com/home' },
  //   { label: 'Reporting', icone: 'img/icones/Reporting.png', link: 'https://reporting.forma-fusion.com/reporting/formation' },
  // ];
if(data === null) return;

  return (
    <div tabIndex="0" className="z-30 mt-3 bg-white rounded-lg shadow-lg w-96 ring-1 ring-black ring-opacity-5">
      <div className="">
        <div className="grid grid-cols-3 gap-2">
          {data.data.map((menu, index) => (
            <a
              key={index}
              href={menu.link}
              target="_blank"
              rel="noopener noreferrer"
             className="flex flex-col items-center p-3 transition-colors rounded-lg hover:bg-gray-50"
            >
              <span className="mb-1 text-2xl"> 
                <img src={ `${digitalOcean}/${menu.icone}`} alt={menu.label} style={{ width: 25, height: 25, objectFit: 'contain' }} 
                className= "mb-1 w-9"/>
              </span>
              <span className="text-sm text-center text-gray-600">{menu.label}</span>
            </a>
          ))}
                      {sessionStorage.getItem('token') && (
            <a
              href="https://profils.forma-fusion.com/cfp/profils"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-3 transition-colors rounded-lg cursor-pointer hover:bg-slate-100"
            >
              <div tabIndex="0" role="button" className="mt-1 mb-1 avatar">
                <div className="rounded-full w-7">
                  <img
                    alt="Profile"
                    src="https://formafusionmg.ams3.cdn.digitaloceanspaces.com/formafusionmg/img/referents/6761ccda65d31.webp"
                  />
                </div>
              </div>
              <span className="text-sm text-center text-gray-600">Compte</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
