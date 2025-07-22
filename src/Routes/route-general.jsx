import { Route, Routes, useLocation } from 'react-router-dom';
import { WelcomeContent } from '../Pages/welcome-content';
// import PrivateRoute from './private-route';
import { LoginHome } from '../Pages/Auth/login-form';

import { AnimatePresence } from 'framer-motion';
import { NonAutorise } from '../Pages/non-autorise';
import { HomeContent } from '../Components/content/home-content';
import { Formation } from '../Pages/Home/formation';
import { FilterProvider } from '../Contexts/filter';
import PrivateRoute from './private-route';
import FormafusionSignup from '../component/FormafusionSignup';
export function GenRoute() {
  const location = useLocation();
  return (
    <FilterProvider>
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WelcomeContent />} />
        <Route path="/login" element={<LoginHome />} />
        <Route path="/register" element={<FormafusionSignup />} />
        <Route path="/non-autorise" element={<NonAutorise />} />s

        {/* Route facture */}
        <Route path="/*" element={<HomeContent />}>
          {/* <Route path="formation" element={<Formation />}  /> */}
          <Route path="home" element={<PrivateRoute element={<Formation />} />} />
        </Route>
      </Routes>
      </AnimatePresence>
    </FilterProvider>
  );
}
