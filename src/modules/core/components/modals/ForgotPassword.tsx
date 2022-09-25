import React, { useState, useMemo } from "react";
import { Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import InputStyled from "../inputs/inputStyled/InputStyled";
import ButtonStyled from "../buttons/buttonstyled/ButtonStyled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RessetPassRequest } from "modules/auth/types";
import { resetPassword } from "modules/auth/authThunks";
import { useAppDispatch, useToastApp } from "modules/core/hooks";
import styles from "./ForgotPassword.module.scss";

type ForgotPasswordProps = {
  isOpen: boolean;
  setPopup: (val: boolean) => void;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  isOpen,
  setPopup,
}) => {
  const dispatch = useAppDispatch();
  const [resetStep, setResetStep] = useState<number>(1);
  const [handleClickVariant] = useToastApp();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      email: yup.string().email().required(),
    });
  }, []);
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RessetPassRequest>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const handleRessetRequest = async (data: RessetPassRequest) => {
    const res = await dispatch(resetPassword(data));
    if (resetPassword.fulfilled.match(res)) {
      setResetStep(2);
    }
    if (resetPassword.rejected.match(res)) {
      handleClickVariant(`${res.payload}`, "error");
    }
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={styles.modal}
    >
      <form
        className={styles.modalContent}
        onSubmit={handleSubmit(handleRessetRequest)}
      >
        <div className={styles.modalContentHeader}>
          <p className={styles.modalContentHeaderTitle}>Password Reset</p>
          <CancelIcon
            className={styles.modalContentHeaderCloseIcon}
            onClick={setPopup.bind(null, false)}
          />
        </div>
        <div className={styles.modalContentBody}>
          {resetStep === 1 ? (
            <p className={styles.modalContentBodyTxt}>
              Please enter the email address associated with your globaledit
              account to reset your password.
            </p>
          ) : (
            <p
              className={`${styles.modalContentBodyTxt} ${styles.modalContentBodyTxt2}`}
            >
              Thank you, instructions to reset your password have been e-mailed
              to the address you provided!
            </p>
          )}
          {resetStep === 1 && (
            <InputStyled
              label="Email Address"
              className={styles.emailInput}
              {...register("email")}
              error={errors.email?.message}
            />
          )}
        </div>
        {resetStep === 1 && (
          <footer>
            <ButtonStyled type="submit">Submit</ButtonStyled>
            <ButtonStyled onClick={() => setPopup(false)}>Cancel</ButtonStyled>
          </footer>
        )}
      </form>
    </Modal>
  );
};

export default ForgotPassword;
