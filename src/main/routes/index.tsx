import { Route, Routes } from "react-router-dom";
import { Home } from "../../views/Home";
import { CreateCustomer } from "../../views/CreateCustomer";
import { EditCustomer } from "../../views/EditCustomer";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/criar" element={<CreateCustomer />} />
      <Route path="/editar/:id" element={<EditCustomer />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
}
