import { Customer } from "../../domain/models/customer";
import StorageHandler from "../../main/utils/storageHandler";
import { validateCreateUser } from "../../main/utils/validateCreateUser";

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

export class CustomerRepository {
  customers: Customer[];

  constructor (private storageHandler: StorageHandler) {
    this.customers = storageHandler.getDataFromLocalStorage()?.customers || INITAL_STATE;
  }

  createCustomer(customer: Customer): void {
    let customerExists = this.customers.some(item => item.id === customer.id);
    if (customerExists) {
      throw new Error("Este CPF já foi cadastrado");
    }

    customerExists = this.customers.some(item => item.email === customer.email);
    if (customerExists) {
      throw new Error("Este e-mail já foi cadastrado");
    }

    validateCreateUser(customer);
    this.customers.push(customer);

    this.storageHandler.setDataInLocalStorage({
      customers: [...this.customers, customer]
    });
  }

  getCustomerById(id: string): Customer | null {
    const customer = this.customers.find(customer => customer.id === id);
    if (!customer) {
      return null;
    }

    return customer;
  }

  editCustomer(customer: Customer): void {
    const customerIndex = this.customers.findIndex(item => item.id === customer.id);
    if (customerIndex < 0) {
      throw new Error("Usuário não encontrado");
    }
    
    validateCreateUser(customer);
    this.customers[customerIndex] = customer;

    this.storageHandler.setDataInLocalStorage({
      customers: this.customers
    });
  }
}