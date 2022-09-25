import { setLogout } from "modules/auth/authSlice";
import ButtonStyled from "modules/core/components/buttons/buttonstyled/ButtonStyled";
import React from "react";
import { useAppDispatch } from "./../modules/core/hooks";

type Props = {};

const Landing = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <ButtonStyled onClick={() => dispatch(setLogout())}>Logout</ButtonStyled>
    </div>
  );
};

export default Landing;
