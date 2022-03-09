import React from "react";
import { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { Toast as ToastModel } from "./toast";
import styles from "./styles.module.scss";

type ToastProps = {
  toast: ToastModel;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ( { toast, onClose } : ToastProps) => {
  const [toastSituation, setToastSituation] = useState<string>("opening");
  
  useEffect(() => {
    setTimeout(() => {
      setToastSituation("closing");
    }, toast.timeout - 500);

    setTimeout(() => {
      onClose();
    }, toast.timeout);

    return () => {
      clearTimeout(toast.timeout);
      setToastSituation("");
      onClose();
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.toastContainer} ${styles[toast.type]} ${styles[`toast-${toastSituation}`]} ${styles[`toast-${toast.position}`]}`}>
      <VscClose onClick={onClose} />
      <div className={styles.toastContent}>
        {toast.icon}
        <p>{toast.message}</p>
      </div>
    </div>
  );
}
