import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export function WelcomePage(){

    return(      
        //     <div className="h-full">
        //         <header className="flex flex-col items-center justify-center h-screen px-6 text-center  animate-[fadeIn_1s_ease-in-out_forwards]">
        //             <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
        //             Gestion des factures
        //             </h2>
        //             <p className="mb-6 text-base sm:text-lg md:text-xl text-gray-700">
        //             Un système intuitif pour créer, suivre et gérer vos facturations en toute simplicité.
        //             </p>
        //             <a onClick={handleNagive}
        //             aria-label="Se connecter à l'espace utilisateur"
        //             className="flex items-center px-6 py-3 text-lg font-semibold text-[#A462A4] hover:text-white bg-white rounded-full shadow-md hover:!bg-[#A462A4] active:scale-95 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        //             >
        //             Se connecter
        //             </a>

        //         </header>             
        //         <style>{`
        //             @keyframes fadeIn {
        //             from { opacity: 0; }
        //             to { opacity: 1; }
        //             }
        //         `}</style>
        //         <span id="drawer_content_detail"></span>
        //         <span id="modal_content_master"></span>
        // </div>
            <div className="font-poppins">
      <div className="relative font-poppins min-h-screen overflow-hidden">

        {/* Background blobs */}
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-purple-100 via-fuchsia-50 to-indigo-100">
          <div className="absolute top-[-5rem] left-[-5rem] w-[400px] h-[400px] bg-purple-300 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-5rem] right-[-5rem] w-[400px] h-[400px] bg-fuchsia-300 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-200 opacity-20 rounded-full filter blur-2xl animate-ping"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-10 max-w-screen-xl mx-auto">

          <main className="flex flex-col lg:flex-row w-full h-full items-center gap-6">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative lg:flex-1 flex justify-center z-10"
            >
              <img
                src="Invoice-bro.svg"
                alt="Illustration Gestion des factures"
                className="w-full max-w-[1000px] h-auto object-contain"
              />
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-center lg:text-left lg:flex-1 px-4 lg:px-0"
            >
              <h1
                className="
                  text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight
                  bg-gradient-to-r from-purple-800 via-fuchsia-700 to-[#c98dc9]
                  bg-clip-text text-transparent drop-shadow-md
                  mb-6
                  mt-[-1rem] sm:mt-[-2rem] lg:mt-[-3rem]
                  ml-[1rem] sm:ml-[4rem] lg:ml-0
                "
              >
                Gestion des presences
              </h1>

              <p
                className="
                  text-xl sm:text-2xl lg:text-2xl font-medium text-purple-900
                  max-w-lg mx-auto lg:mx-0
                  leading-relaxed
                  mb-10
                  px-6
                  lg:px-0
                "
              >
                Bienvenue dans votre espace de suivi !<br /> Ici, 
                vous pouvez créer, visualiser et gérer vos <br />
                presence en toute simplicité.
              </p>

              <div>
                <Link
                  to="/login"
                  className="
                    inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 via-fuchsia-700 to-fuchsia-700
                    hover:from-purple-700 hover:via-fuchsia-700 hover:to-fuchsia-600
                    text-white font-semibold py-3 px-7 rounded-full shadow-xl
                    transition-all duration-300 ease-in-out transform hover:scale-105 text-lg
                    mx-auto lg:mx-0
                  "
                >
                  <span>🚀 Commencer l'accompagnement</span>
                </Link>
              </div>
            </motion.div>

          </main>
        </div>
      </div>
    </div>
    )
}