import { useState } from "react";
import { MasterContent } from "../../Components/content/master-content";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [types] = useState([
    { idTypeEtp: 1, type_etp_desc: "Entreprise privée" },
    { idTypeEtp: 2, type_etp_desc: "Groupe d'entreprise" },
    { idTypeEtp: 4, type_etp_desc: "Institution publique" },
    { idTypeEtp: 5, type_etp_desc: "ONG ou Association" },
    { idTypeEtp: 6, type_etp_desc: "Zone franche et entreprise speciale" },
    { idTypeEtp: 7, type_etp_desc: "Autres" },
    { idTypeEtp: 8, type_etp_desc: "Particulier" },
    { idTypeEtp: 9, type_etp_desc: "Centre de formation" }
  ]);

  return (
    <MasterContent>
      <RegisterForm typeEntreprises={types} />
    </MasterContent>
  );
}

function RegisterForm({ typeEntreprises }) {
  const [formData, setFormData] = useState({
    customer_email: "",
    account_type: "",
    customer_name: "",
    referent_name: "",
    referent_firstName: "",
    part_name: "",
    part_firstName: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Effacer l'erreur quand l'utilisateur corrige
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, account_type: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customer_email) {
      newErrors.customer_email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
      newErrors.customer_email = "Email invalide";
    }
    
    if (!formData.account_type) {
      newErrors.account_type = "Le type de compte est requis";
    }
    
    if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit avoir au moins 8 caractères";
    }
    
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register", 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      if (response.data.status === 200) {
        navigate("/login", { 
          state: { message: "Compte créé avec succès!" } 
        });
      }
    } catch (err) {
      if (err.response?.status === 422) {
        // Erreurs de validation du serveur
        setErrors(err.response.data.errors || {});
      } else {
        setErrors({
          general: err.response?.data.message || "Une erreur s'est produite"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEntreprise = ["1", "2", "4", "5", "6", "7", "9"].includes(formData.account_type);
  const isParticulier = formData.account_type === "8";

  return (
    <div className="container mx-auto h-full px-1 pt-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col xl:flex-row xl:mx-0 mt-20 lg:mt-24 bg-[#f1f1f4] rounded-xl">
          <div className="w-full xl:w-2/4 xl:px-24 px-10 lg:mt-14 mt-4 lg:mb-20">
            <img src="/img/logo/Logo_mark.svg" alt="Logo" className="w-28 h-28 mx-auto" />
            <h1 className="text-xl md:text-4xl mt-4 font-extrabold text-[#A462A4] text-center xl:text-left">
              Inscrivez-vous
            </h1>

            {errors.general && (
              <div className="text-red-500 mt-4 p-2 bg-red-50 rounded">
                {errors.general}
              </div>
            )}

            <h1 className="text-xl font-extrabold mt-6">Adresse email</h1>
            <input
              type="email"
              name="customer_email"
              placeholder="votre-adresse@email.com"
              value={formData.customer_email}
              onChange={handleChange}
              className={`w-full h-10 mt-2 border px-3 rounded ${errors.customer_email ? "border-red-500" : ""}`}
            />
            {errors.customer_email && (
              <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
            )}

            <div className="mt-6">
              <Link to="/login" className="text-[#a462a4] underline hover:text-[#8a3b8e] transition">
                J'ai déjà un compte
              </Link>
            </div>
          </div>

          <div className="xl:w-2/4 xl:px-24 text-lg mb-6 xl:pr-20 xl:mt-10 px-10">
            <p className="text-xl font-extrabold my-6">
              Etes-vous nouveau par ici ! Renseignez vos informations
            </p>

            <div>
              <select
                name="account_type"
                onChange={handleTypeChange}
                className={`w-full border rounded px-3 py-2 ${errors.account_type ? "border-red-500" : ""}`}
                value={formData.account_type}
              >
                <option value="">--veuillez choisir votre type de compte--</option>
                {typeEntreprises.map((type) => (
                  <option key={type.idTypeEtp} value={type.idTypeEtp}>
                    {type.type_etp_desc}
                  </option>
                ))}
              </select>
              {errors.account_type && (
                <p className="text-red-500 text-sm mt-1">{errors.account_type}</p>
              )}
            </div>

            {/* Champs Entreprise */}
            {isEntreprise && (
              <>
                <div className="mt-4">
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="Raison sociale"
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="referent_name"
                    placeholder="Nom du responsable"
                    value={formData.referent_name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="referent_firstName"
                    placeholder="Prénom du responsable"
                    value={formData.referent_firstName}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </>
            )}

            {/* Champs Particulier */}
            {isParticulier && (
              <>
                <div className="mt-4">
                  <input
                    type="text"
                    name="part_name"
                    placeholder="Nom"
                    value={formData.part_name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="part_firstName"
                    placeholder="Prénoms"
                    value={formData.part_firstName}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </>
            )}

            {/* Champs communs */}
            {(isEntreprise || isParticulier) && (
              <>
                <div className="mt-4">
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border px-3 py-2 rounded ${errors.password ? "border-red-500" : ""}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                <div className="mt-4">
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmation mot de passe"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className={`w-full border px-3 py-2 rounded ${errors.password_confirmation ? "border-red-500" : ""}`}
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                  )}
                </div>
                <div className="grid place-items-center my-6">
                  <button 
                    type="submit" 
                    className={`rounded-full bg-[#a462a4] px-4 py-2 text-white ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}