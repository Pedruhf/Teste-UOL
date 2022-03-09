import { CustomerRepository } from "../../data/repositories/customerRepository";
import { storageHandler } from "../utils/storageHandler"

const customerRepository = new CustomerRepository(storageHandler);

export { customerRepository };