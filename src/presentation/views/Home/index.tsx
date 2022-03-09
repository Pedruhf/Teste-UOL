import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { CustomerCard } from "../../../components/CustomerCard/customer-card";
import { CustomerContext } from "../../../main/contexts/customers";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

export const Home: React.FC = () => {
  const { customers } = useContext(CustomerContext);

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