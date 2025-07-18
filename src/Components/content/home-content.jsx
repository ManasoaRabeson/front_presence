import { Outlet } from "react-router-dom";
import {Footer} from "../../Pages/Footer"
import { HomeNavBar } from "../../Pages/NavBar/home-navbar";
import { ProjectProvider } from "../../Contexts/count-project";
export function HomeContent() {
  return (
    <ProjectProvider>
    <div className="flex flex-col min-h-screen bg-white">
      <HomeNavBar />
      <div className="flex-grow pt-20 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
    </ProjectProvider>
  );
}
