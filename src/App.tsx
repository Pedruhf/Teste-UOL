import { Header } from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

import "./styles/global.scss";
import { CustomerContextProvider } from "./contexts/customers";

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
