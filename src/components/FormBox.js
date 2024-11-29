import React from "react";
import "../styles/FormBox.css";

// eslint-disable-next-line react/prop-types
const FormBox = ({ fields, actions }) => {
  return (
    <div className={"form-box"}>
      <div className={"form-fields"}>{fields}</div>
      <div className={"form-actions"}>{actions}</div>
    </div>
  );
};

export default FormBox;
