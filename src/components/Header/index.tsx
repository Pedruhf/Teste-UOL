import React from "react";
import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.png";

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <img src={logoImg} alt="UOL" />
    </header>
  );
}