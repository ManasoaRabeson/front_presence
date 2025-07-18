
import { BrowserRouter as Router } from "react-router-dom";
import { GenRoute } from "./Routes/route-general";
export default function App() {
    return(
        <>
            <Router>
                <GenRoute/>
            </Router>
        </>
    )
}
