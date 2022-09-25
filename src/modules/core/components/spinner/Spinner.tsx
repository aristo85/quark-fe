import React, { FC } from "react";
import { Box, CircularProgress, Modal } from "@mui/material";

import styles from "./Spinner.module.scss";

type SpinnerProps = {
  isSpiner: boolean;
};

const Spinner: FC<SpinnerProps> = ({ isSpiner }) => {
  return (
    <Modal
      open={isSpiner}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.spinner}>
        <CircularProgress />
      </Box>
    </Modal>
  );
};

export default Spinner;
