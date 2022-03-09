import { createContext, ReactNode, useState } from "react";
import { Customer } from "../../domain/models/customer";
import { customerRepository } from "../composers/customerRepository";

type CustomersContext = {
  customers: Customer[];
  handleCreateCustomer: (customer: Customer) => void;
  handleGetCustomerById: (id: string) => Customer | null;
  handleEditCustomer: (customer: Customer) => void;
}

type CustomerProviderProps = {
  children: ReactNode;
}

const CustomerContext = createContext({} as CustomersContext);

function CustomerContextProvider(props: CustomerProviderProps) {
  const [customers, setCustomers] = useState<Customer[]>(customerRepository.customers);

  function handleCreateCustomer(customer: Customer): void {
    customerRepository.createCustomer(customer);
    setCustomers(customerRepository.customers);
  }

  function handleGetCustomerById(id: string): Customer | null {
    const customer = customerRepository.getCustomerById(id);
    return customer;
  }

  function handleEditCustomer(customer: Customer): void {
    customerRepository.editCustomer(customer);
  }

  return(
    <CustomerContext.Provider value={{ customers, handleCreateCustomer, handleGetCustomerById, handleEditCustomer }}>
      { props.children }
    </CustomerContext.Provider>
  );
}

export { CustomerContextProvider, CustomerContext };