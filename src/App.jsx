import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CivilPeb from "./pages/CivilPeb.jsx";
import Mep from "./pages/Mep.jsx";
import PowerSystemDesign from "./pages/PowerSystemDesign.jsx";
import AuditsTesting from "./pages/AuditsTesting.jsx";
import Compliance from "./pages/Compliance.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="civil-peb" element={<CivilPeb />} />
        <Route path="mep" element={<Mep />} />
        <Route path="power-system-design" element={<PowerSystemDesign />} />
        <Route path="audits-testing" element={<AuditsTesting />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
