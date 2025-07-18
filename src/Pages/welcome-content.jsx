import { MasterContent } from "../Components/content/master-content";
import { WelcomePage as ImportWelcome } from "./welcome-page";
import { motion } from 'framer-motion';
export function WelcomeContent(){
    return (
        <>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        <MasterContent>
            <ImportWelcome/>
        </MasterContent>
        </motion.div>
        </>
    )
}