import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function WelcomePage() {
  return (
    <div className="font-poppins">
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-purple-100 via-fuchsia-50 to-indigo-100">

        {/* Background animated blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-5rem] left-[-5rem] w-[400px] h-[400px] bg-purple-300 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-5rem] right-[-5rem] w-[400px] h-[400px] bg-fuchsia-300 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-200 opacity-20 rounded-full filter blur-2xl animate-ping"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-10 max-w-screen-xl mx-auto">

          <main className="flex flex-col lg:flex-row w-full items-center gap-12">

            {/* Image section */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center lg:flex-1 z-10"
            >
          <img
            src="Confirmed attendance-amico.svg"
            alt="Illustration Gestion des présences"
            className="w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[500px] h-auto object-contain drop-shadow-xl"
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
                  text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight
                  bg-gradient-to-r from-purple-800 via-fuchsia-700 to-[#c98dc9]
                  bg-clip-text text-transparent drop-shadow-md
                  mb-6
                "
              >
                Gestion des Présences
              </h1>

              <p
                className="
                  text-lg sm:text-xl lg:text-2xl font-medium text-purple-900
                  max-w-lg mx-auto lg:mx-0
                  leading-relaxed
                  mb-10
                "
              >
                Simplifiez le suivi de vos apprenants et collaborateurs.  
                Enregistrez, suivez et gérez vos présences  
                de manière intuitive et rapide.
              </p>

              <div>
                <Link
                  to="/login"
                  className="
                    inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 via-fuchsia-700 to-fuchsia-700
                    hover:from-purple-800 hover:via-fuchsia-700 hover:to-fuchsia-600
                    text-white font-semibold py-3 px-7 rounded-full shadow-xl
                    transition-all duration-300 ease-in-out transform hover:scale-105 text-lg
                    mx-auto lg:mx-0
                  "
                >
                  <span> Accéder à votre espace</span>
                </Link>
              </div>
            </motion.div>

          </main>
        </div>
      </div>
    </div>
  );
}
