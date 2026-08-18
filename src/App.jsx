import { Routes, Route, Navigate } from "react-router-dom";

import Inicio from "./pages/inicio";
import Holograma from "./pages/Holograma";
import SoporteTecnico from "./pages/SoporteTecnico";
import ProgramacionBD from "./pages/ProgramacionBD";
import SistemasRedes from "./pages/SistemasRedes";
import Diseño from "./pages/DisenoWeb";
import Ofimatica from "./pages/Ofimatica";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route path="/holograma" element={<Holograma />} />

      <Route path="/soporte" element={<SoporteTecnico />} />

      <Route path="/programacion" element={<ProgramacionBD />} />

      <Route path="/redes" element={<SistemasRedes />} />

      <Route path="/diseno-web" element={<Diseño />} />

      <Route path="/ofimatica" element={<Ofimatica />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;