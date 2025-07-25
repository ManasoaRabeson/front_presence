import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MasterContent } from "../../Components/content/master-content";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
                    case 3:
                    case 5:
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
            <div className="min-h-screen flex items-center justify-center bg-[#f1f1f4] px-6 py-12">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-purple-300/30 p-10">

                    <div className="flex flex-col items-center mb-8">
                    <img src="Logo_mark.svg" alt="Logo" className="w-28 h-28" />
                    <h1 className="mt-5 text-4xl font-extrabold text-[#A462A4] tracking-wide">Connectez-vous</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                    <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                        Adresse email
                    </label>
                    <div className="relative">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre-adresse@gmail.com"
                        className="w-full h-14 px-5 rounded-2xl border border-gray-300 text-gray-700 text-base font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#A462A4] transition-shadow shadow-sm hover:shadow-md"
                        required
                        />
                        <MdEmail
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={22}
                        />
                    </div>
                    </div>


                    <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                        Mot de passe
                    </label>
                    <div className="relative">
                        <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 px-5 rounded-2xl border border-gray-300 text-gray-700 text-base font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-[#A462A4] transition-shadow shadow-sm hover:shadow-md"
                        required
                        />
                            {isPasswordVisible ? (
                            <FaEyeSlash
                                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#A462A4] transition-colors"
                                size={22}
                                onClick={togglePasswordVisibility}
                            />
                            ) : (
                            <FaEye
                                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#A462A4] transition-colors"
                                size={22}
                                onClick={togglePasswordVisibility}
                            />
                            )}
                    </div>
                    {message && <p className="mt-2 text-sm text-red-600 font-semibold">{message}</p>}
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-[#A462A4] text-white font-extrabold text-lg transition-all ${
                        isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:bg-[#933d99] shadow-lg hover:shadow-[#A462A4]/60"
                    }`}
                    >

                    {isSubmitting ? "Connexion en cours..." : "Connexion"}
                    </button>
                    </form>

                    <p className="mt-10 text-center text-[#A462A4] font-bold underline hover:text-[#9d4ed4] hover:underline-offset-4 transition cursor-pointer text-base">
                <Link to="/register">Pas encore de compte ? Inscrivez-vous</Link>
                    </p>
                </div>
            </div>
        </>
    );
}
