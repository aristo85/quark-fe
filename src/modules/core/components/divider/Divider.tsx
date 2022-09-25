import React from "react";
import styles from "./Divider.module.scss";

type DividerProps = {
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ className }) => {
  return <hr className={`${styles.divider} ${className}`} />;
};

export default Divider;
