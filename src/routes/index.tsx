import { Route, Routes } from "react-router-dom";
import { Home } from "../views/Home";
import { CreateCustomer } from "../views/CreateCustomer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/criar" element={<CreateCustomer />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
}
