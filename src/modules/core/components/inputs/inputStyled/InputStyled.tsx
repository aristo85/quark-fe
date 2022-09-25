import React, { forwardRef, InputHTMLAttributes, useState } from "react";

import styles from "./InputStyled.module.scss";

type InputStyledProps = {
  label?: string;
  className?: string;
  error?: string;
  adornment?: boolean;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputStyled = forwardRef<HTMLInputElement, InputStyledProps>(
  ({ label, className, error, adornment, type = "text", ...props }, ref) => {
    const [inputType, setInputType] = useState(type);
    const toggleinputType = () => {
      setInputType((prev) => (prev === 'text' ? "password" : "text"));
    };
    return (
      <div className={`${styles.inputContent} ${className}`}>
        {label && <label className={styles.inputLabel}>{label}</label>}
        <div className={styles.inputWrapper}>
          <input type={inputType} {...props} ref={ref} />
          {adornment && (
            <p className={styles.adornment} onClick={toggleinputType}>
              {inputType === "text" ? "Hide" : "Show"}
            </p>
          )}
        </div>
        <p className={styles.inputError}>{error}</p>
      </div>
    );
  }
);

export default InputStyled;
