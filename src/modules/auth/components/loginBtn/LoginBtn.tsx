import React, { FC } from "react";
import styles from "./LoginBtn.module.scss";

type Props = {
  title: string;
  onClick: () => void;
};

const LoginBtn: FC<Props> = ({ title, onClick }) => {
  return (
    <button className={styles.loginBtn} onClick={onClick}>
      {title}
    </button>
  );
};

export default LoginBtn;
