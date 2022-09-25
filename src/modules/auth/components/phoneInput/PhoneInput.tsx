import React, { FC } from "react";
import NumberFormat from "react-number-format";
import styles from "./PhoneInput.module.scss";

type Props = {};

const PhoneInput: FC = () => {
  return (
    <>
      <NumberFormat className={styles.phoneInput} format="### ### ####" />
      <div className={styles.digitHolderContainer}>
        <div className={styles.digitHolder} />
        <div className={styles.digitHolder} />
        <div className={styles.largeDigitHolder} />
      </div>
    </>
  );
};

export default PhoneInput;
