import React, { FC, useMemo, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useToastApp,
} from "modules/core/hooks";
import { userLogin } from "modules/auth/authThunks";
import logo from "assets/images/logo.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputStyled from "modules/core/components/inputs/inputStyled/InputStyled";
import ButtonStyled from "modules/core/components/buttons/buttonstyled/ButtonStyled";
import Divider from "modules/core/components/divider/Divider";

import styles from "./LoginForm.module.scss";
import { LoginRequest } from "modules/auth/types";
import ForgotPassword from "modules/core/components/modals/ForgotPassword";
import Spinner from "modules/core/components/spinner/Spinner";

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const userLoginData = useAppSelector((state) => state.auth);
  const [isRessetPass, setIsRessetPass] = useState<boolean>(false);
  const [handleClickVariant] = useToastApp();

  const handleRessetPassPopup = (val: boolean) => {
    setIsRessetPass(val);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .min(5)
        .test("len", "username required", (val) => !!val?.trim().length),
    });
  }, []);
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const handleSignInRequest = async (data: LoginRequest) => {
    const res = await dispatch(userLogin(data));
    if (userLogin.rejected.match(res)) {
      handleClickVariant(`${res.payload}`, "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.welcome}>
          <p className={styles.welcomeText}>Welcome</p>
          <p className={styles.infoText}>Please sign in to continue</p>
          <Divider />
        </div>
        <form onSubmit={handleSubmit(handleSignInRequest)}>
          <img src={logo} alt="logo" className={styles.formLogo} />
          <InputStyled
            className={styles.formInput}
            label="Username"
            autoComplete="off"
            {...register("username")}
            error={errors.username?.message}
          />
          <InputStyled
            className={styles.formInput}
            label="Password"
            type="password"
            adornment
            {...register("password")}
            error={errors.password?.message}
          />
          <div className={styles.actions}>
            <ButtonStyled type="submit">Sign In</ButtonStyled>
            <p onClick={() => handleRessetPassPopup(true)}>Forgot password?</p>
          </div>
        </form>
        <footer>
          <Divider />
          <div className={styles.footerContent}>
            <div className={styles.block}>
              <p className={styles.blockTitle}>LATEST BLOG POST</p>
              <p className={styles.blockBody}>
                October 15, 2018 Create Efficiency with a Creative Asset
                Management Platform
              </p>
            </div>
            <div className={styles.block}>
              <p className={styles.blockTitle}>RECENT TWEET</p>
              <p className={styles.blockBody}>
                April 25, 2018 #HenryStewartEvents are bringing their
                #CreativeOps show to NYC for the third…
              </p>
            </div>
          </div>
        </footer>
      </div>
      <ForgotPassword isOpen={isRessetPass} setPopup={handleRessetPassPopup} />
      <Spinner isSpiner={userLoginData.status === "loading"} />
    </div>
  );
};

export default LoginForm;
