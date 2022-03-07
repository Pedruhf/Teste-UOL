import { Customer, customerStatus } from "../../models/customer";

import { GoPrimitiveDot } from "react-icons/go";
import styles from "./styles.module.scss";

type CustomerCardProps = {
  customer: Customer
}

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  return (
    <div className={styles.customerContainer}>
      <div className={styles.basicInfo}>
        <strong>{customer.name}</strong>
        <p>{customer.email}</p>
      </div>

      <div className={styles.customerPhone}>
        <strong>{customer.id}</strong>
        <span>{customer.phone}</span>
      </div>
      <span className={styles.customerStatus}>
        <GoPrimitiveDot color={customerStatus[customer.status].color} />
        {customerStatus[customer.status].name}
      </span>

      <button className={styles.editButton}>Editar</button>
    </div>
  );
}
