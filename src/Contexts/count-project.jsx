// DataContext.js
import { createContext,  useState } from "react";
export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [countProject, setCountProject] = useState(null);
  const [selected, setSelected] = useState("En_cours");
  return (
    <ProjectContext value={{ countProject, setCountProject ,selected, setSelected }}>
      {children}
    </ProjectContext>
  );
}
