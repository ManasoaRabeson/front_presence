import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MasterContent } from "../../Components/content/master-content";
const LoadingScreen = () => (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
    </div>
);
export function LoginHome(){
    return <>
            <div>
                <MasterContent>
                    <FormLogin/>
                </MasterContent>
            </div>
            </>
}
 function FormLogin() {
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); 
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries()); 

        try {
            // 2. Envoi des données au serveur

            const response = await axios.post("http://127.0.0.1:8000/api/login", data);
            if (response.data.status === 200) {
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("role",response.data.role.role_id);
                console.log(response.data);
                sessionStorage.setItem("setting", JSON.stringify(response.data?.setting));
                switch(response.data.role.role_id)
                {
                    case 3 : 
                    navigate("/home");
                    break;
                    default :
                    navigate("/non-autorise")
                }
                
            } else {
                setMessage(response.data.message || "Identifiants incorrects");
            }
        } catch (error) {
            setMessage("Erreur de connexion : " + error.message);
        } finally {
            setIsSubmitting(false); // Désactive le LoadingScreen
        }
    };


    return (
        <>
            {isSubmitting && <LoadingScreen />}
            <div className="container h-full mx-auto px-1 pt-4">
                <div className="flex flex-col lg:flex-row items-center justify-center px-6 lg:mx-80 h-full">
                    <div className="xl:w-3/4 w-full justify-center mb-20 px-10 pb-10 bg-[#f1f1f4] rounded-xl">
                        <div className="w-full flex flex-col items-center mb-6">
                            <img src="/react/Logo_mark.svg" alt="Logo" className="w-28 h-28 mt-6" />
                            <h1 className="text-xl md:text-3xl mt-4 font-extrabold text-[#A462A4] leading-tight text-center">
                                Connectez-vous
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-xl">
                            <div className="mb-4">
                                <label htmlFor="email" className="text-gray-700">Adresse email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre-adresse@gmail.com"
                                     className=" bg-white outline-none w-full pl-2 h-10 border border-gray-200 rounded-md hover:border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 text-gray-700"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="text-gray-700">Mot de passe</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        className="password bg-white outline-none w-full pl-2 h-10 border border-gray-200 rounded-md hover:border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 text-gray-700"
                                        required
                                    />
                                    <i
                                        className={`fa-solid ${
                                            isPasswordVisible ? "fa-eye-slash" : "fa-eye"
                                        } absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer`}
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                                {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
                            </div>

                            <div className="grid mt-6 place-items-center">
                            <button
                                    type="submit"
                                    disabled={isSubmitting} // Désactive le bouton pendant la soumission
                                    className={`rounded-xl w-full bg-[#a462a4] px-4 py-2 text-white ${
                                        isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#A462A4]/90"
                                    }`}
                                >
                                    {isSubmitting ? "Connexion en cours..." : "Connexion"}
                                </button>
                            </div>
                        </form>
                        <p className="pt-4 text-lg text-[#a462a4] underline font-bold hover:text-[#9d4ed4] hover:underline-offset-4 text-center">
                            <Link to="/register">Pas encore de compte ? Inscrivez-vous</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
