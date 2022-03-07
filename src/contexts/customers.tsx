import { createContext, ReactNode, useState } from "react";
import { Customer } from "../models/customer";
import { validateCreateUser } from "../utils/validateCreateUser";

type CustomersContext = {
  customers: Customer[];
  handleCreateCustomer: (customer: Customer) => void;
}

type CustomerProviderProps = {
  children: ReactNode;
}

const CustomerContext = createContext({} as CustomersContext);

function CustomerContextProvider(props: CustomerProviderProps) {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      "id": "512.536.530-03",
      "name": "Camila Souza",
      "email": "camila.souza@email.com",
      "phone": "(11) 93463-2347",
      "status": "active"
    },
    {
      "id": "397.553.820-11",
      "name": "Pedro Ferreira",
      "email": "peferreira@email.com",
      "phone": "(11) 95529-5678",
      "status": "inactive"
    },
    {
      "id": "921.818.210-20",
      "name": "Marcela Silva",
      "email": "masilva@email.com",
      "phone": "(11) 93470-3391",
      "status": "waiting"
    },
    {
      "id": "533.278.870-39",
      "name": "Carlos Ferraz",
      "email": "carlosferraz@email.com",
      "phone": "(11) 96744-0233",
      "status": "disabled"
    }
  ]);

  function handleCreateCustomer(customer: Customer): void {
    validateCreateUser(customer);
    setCustomers([...customers, customer]);
  }

  return(
    <CustomerContext.Provider value={{ customers, handleCreateCustomer }}>
      { props.children }
    </CustomerContext.Provider>
  );
}

export { CustomerContextProvider, CustomerContext };