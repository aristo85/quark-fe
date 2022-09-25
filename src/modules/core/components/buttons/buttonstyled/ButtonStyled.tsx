import React, { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from "react";
import styles from "./ButtonStyled.module.scss";

type ButtonStyledProps = {
  children: ReactNode;
  handleClick?: () => void;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonStyled = forwardRef<HTMLButtonElement, ButtonStyledProps>(
  ({ children, handleClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.buttonContent} ${className}`}
        onClick={handleClick || (() => {})}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default ButtonStyled;
