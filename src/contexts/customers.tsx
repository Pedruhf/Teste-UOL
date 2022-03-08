import { createContext, ReactNode, useState } from "react";
import { Customer } from "../models/customer";
import { tokenHandler } from "../utils/storageHandler";
import { validateCreateUser } from "../utils/validateCreateUser";

const INITAL_STATE: Customer[] = [
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
]; 

type CustomersContext = {
  customers: Customer[];
  handleCreateCustomer: (customer: Customer) => void;
  getCustomerById: (id: string) => Customer | null;
  editCustomer: (customer: Customer) => void;
}

type CustomerProviderProps = {
  children: ReactNode;
}

const CustomerContext = createContext({} as CustomersContext);

function CustomerContextProvider(props: CustomerProviderProps) {
  const [customers, setCustomers] = useState<Customer[]>(tokenHandler.getDataFromLocalStorage()?.customers || INITAL_STATE);

  function handleCreateCustomer(customer: Customer): void {
    let customerExists = customers.some(item => item.id === customer.id);
    if (customerExists) {
      throw new Error("Este CPF já foi cadastrado");
    }

    customerExists = customers.some(item => item.email === customer.email);
    if (customerExists) {
      throw new Error("Este e-mail já foi cadastrado");
    }

    validateCreateUser(customer);
    setCustomers([...customers, customer]);
    tokenHandler.setDataInLocalStorage({
      customers: [...customers, customer]
    });
  }

  function getCustomerById(id: string): Customer | null {
    const customer = customers.find(customer => customer.id === id);
    if (!customer) {
      return null;
    }

    return customer;
  }

  function editCustomer(customer: Customer): void {
    const customerIndex = customers.findIndex(item => item.id === customer.id);
    if (customerIndex < 0) {
      throw new Error("Usuário não encontrado");
    }
    
    validateCreateUser(customer);
    customers[customerIndex] = customer;

    tokenHandler.setDataInLocalStorage({
      customers
    });
  }

  return(
    <CustomerContext.Provider value={{ customers, handleCreateCustomer, getCustomerById, editCustomer }}>
      { props.children }
    </CustomerContext.Provider>
  );
}

export { CustomerContextProvider, CustomerContext };