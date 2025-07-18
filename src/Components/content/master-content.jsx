import { NavBarAccueil } from "../../Pages/NavBar/nav-bar-accueil";
export function MasterContent({children}){
    return (
        <>
        <div className="flex flex-col w-screen h-screen overflow-hidden bg-white">
            <div className="fixed top-0 z-50 w-full bg-white/90 text-slate-600 backdrop-blur-lg backdrop-saturate-150">
            <NavBarAccueil/>
            </div>
            <div className="flex items-center justify-center w-full h-full overflow-hidden bg-gray-100">
            {children}
            </div>
        </div>
        </>
    )
}