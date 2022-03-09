import { Header } from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { CustomerContextProvider } from "./main/contexts/customers";
import AppRoutes from "./main/routes";

import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <CustomerContextProvider>
        <Header />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CustomerContextProvider>
    </div>
  );
}

export default App;
