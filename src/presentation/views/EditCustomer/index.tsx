import React from "react";
import { Customer } from "../../../domain/models/customer";
import { CustomerContext } from "../../../main/contexts/customers";
import { MaskHandler } from "../../../main/utils/maskHandler";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toast as ToastType } from "../../../components/Toast/toast";
import { Toast } from "../../../components/Toast";
import { VscWarning } from "react-icons/vsc";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import styles from "./styles.module.scss";

export const EditCustomer: React.FC = () => {
  const { handleGetCustomerById, handleEditCustomer } = useContext(CustomerContext);
  const customerId = useParams().id;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [toastConfig, setToastConfig] = useState({} as ToastType);
  
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
      
      handleEditCustomer(customer);

      const toastConfig = {
        type: "success",
        message: "Usuário editado com sucesso!",
        icon: <IoIosCheckmarkCircleOutline />,
        position: "right",
        timeout: 3000,
      };
      setToastConfig(toastConfig);
      setIsToastVisible(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: any) {
      const toastConfig = {
        type: "warning",
        message: error.message || "Erro ao tentar realizar operação",
        icon: <VscWarning />,
        position: "right",
        timeout: 4000,
      };
      setToastConfig(toastConfig);
      setIsToastVisible(true);
    }
  }

  useEffect(() => {
    const customer = handleGetCustomerById(customerId || '');
    if (!customer) {
      return navigate("/");
    }
    
    setCustomer(customer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          disabled
          onChange={event => setId(MaskHandler.cpfMask(event.target.value))}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={event => setPhone(MaskHandler.phoneMask(event.target.value))}
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

      {isToastVisible && <Toast toast={toastConfig} onClose={() => setIsToastVisible(false)} />}
    </main>
  );
}