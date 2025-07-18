import { useNavigate } from "react-router-dom"

export function WelcomePage(){
    const navige = useNavigate();
    const handleNagive = () =>{
        navige("/login");
    }
    return(      
            <div className="h-full">
                <header className="flex flex-col items-center justify-center h-screen px-6 text-center  animate-[fadeIn_1s_ease-in-out_forwards]">
                    <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
                    Gestion des factures
                    </h2>
                    <p className="mb-6 text-base sm:text-lg md:text-xl text-gray-700">
                    Un système intuitif pour créer, suivre et gérer vos facturations en toute simplicité.
                    </p>
                    <a onClick={handleNagive}
                    aria-label="Se connecter à l'espace utilisateur"
                    className="flex items-center px-6 py-3 text-lg font-semibold text-[#A462A4] hover:text-white bg-white rounded-full shadow-md hover:!bg-[#A462A4] active:scale-95 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    >
                    Se connecter
                    </a>

                </header>             
                <style>{`
                    @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                    }
                `}</style>
                <span id="drawer_content_detail"></span>
                <span id="modal_content_master"></span>
        </div>
    )
}