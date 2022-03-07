import api from "../../config/api";
import { useContext, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { CustomerCard } from "../../components/CustomerCard/customer-card";

import styles from "./styles.module.scss";
import { CustomerContext } from "../../contexts/customers";
import { Link } from "react-router-dom";

export const Home = () => {
  const { customers } = useContext(CustomerContext);

  async function getCustomers(): Promise<void> {
    try {
      const res = await api.get("/customers.json");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomers();
  });

  return (
    <main className={styles.homeContainer}>
      <div className={styles.pageTitle}>
        <FiUser />
        <span>Painel de Clientes</span>
      </div>

      <hr />

      <div className={styles.usersListInfoContainer}>
        <div className={styles.usersListInfoContent}>
          <p>Listagem de usuários</p>
          <span>Escolha um cliente para visualizar os detalhes</span>
        </div>
        <Link to="/criar">Novo cliente</Link>
      </div>

      <div className={styles.customersContainer}>
        {customers.map(customer => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      <p className={styles.customersQuantity}>Exibindo {customers.length} clientes</p>
    </main>
  );
}