import { Customer } from "../../models/customer";
import { CustomerContext } from "../../contexts/customers";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cpfMask, phoneMask } from "../../utils/inputMasks";

import styles from "./styles.module.scss";

export const EditCustomer = () => {
  const { getCustomerById, editCustomer } = useContext(CustomerContext);
  const customerId = useParams().id;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  
  function setCustomer(customer: Customer): void {
    setName(customer.name);
    setEmail(customer.email);
    setId(customer.id);
    setPhone(customer.phone);
    setStatus(customer.status);
  }

  function handleEditUser(event: FormEvent): void {
    event.preventDefault();
    try {
      const customer: Customer = {
        id,
        name,
        email,
        phone,
        status,
      }
      
      editCustomer(customer);

      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    const customer = getCustomerById(customerId || '');
    if (!customer) {
      return navigate("/");
    }
    
    setCustomer(customer);
  }, []);

  return (
    <main className={styles.homeContainer}>
      <div className={styles.pageTitle}>
        <FiUser />
        <span>Painel de Clientes</span>
      </div>

      <hr />

      <div className={styles.usersListInfoContainer}>
        <div className={styles.usersListInfoContent}>
          <p>Novo usuário</p>
          <span>Informe os campos a seguir para criar um novo usuário:</span>
        </div>
      </div>

      <form className={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={id}
          onChange={event => setId(cpfMask(event.target.value))}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={event => setPhone(phoneMask(event.target.value))}
        />
        <select
          value={status}
          onChange={event => setStatus(event.target.value)}
        >
          <option value="" hidden>Status</option>
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
          <option value="waiting">Aguardando ativação</option>
          <option value="disabled">Desativado</option>
        </select>

      </form>
      <div className={styles.controlButtons}>
        <button onClick={(event) => handleEditUser(event)}>Editar</button>
        <Link to="/">Voltar</Link>
      </div>
    </main>
  );
}