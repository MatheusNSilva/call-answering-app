/* eslint-disable react/prop-types */
import React from "react";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ErrorAlert = ({ label, onClose }) => {
  if (label) {
    return (
      <Alert
        severity={"error"}
        sx={{ marginBottom: 2, marginLeft: 4 }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => onClose()}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        {label}
      </Alert>
    );
  }
};
export default ErrorAlert;
