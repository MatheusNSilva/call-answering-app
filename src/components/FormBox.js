/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { OutlinedInput, Button, Box } from "@mui/material";
import { integersInputValidation } from "../utils/integersInputHelper";
import "../styles/FormBox.css";

const FormBox = ({ formData, onSubmit, onChange }) => {
  const { username, maxCalls } = formData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { username, maxCalls },
  });

  const onSubmitForm = (data) => {
    console.log("cheguei no Submit Form", data);
    onSubmit(data);
  };

  const handleMaxCallsOnChange = (e) => {
    const correctedValue = integersInputValidation(e.target.value);
    setValue("maxCalls", correctedValue);
    onChange({ target: { name: "maxCalls", value: correctedValue } });
  };

  return (
    <Box>
      <form className={"form-box"} onSubmit={handleSubmit(onSubmitForm)}>
        <OutlinedInput
          name={"username"}
          className={"form-input"}
          placeholder="Nome do usuário"
          error={!!errors.username}
          {...register("username", {
            required: "O nome de usuário é obrigatório.",
          })}
        />
        <OutlinedInput
          name={"max-chats"}
          className={"form-input"}
          placeholder="Máximo de chats"
          error={!!errors.maxCalls}
          {...register("maxCalls", {
            required: "O número máximo de chats é obrigatório.",
            onChange: handleMaxCallsOnChange,
          })}
        />
        <Button variant={"contained"} type={"submit"} className={"form-button"}>
          Conectar
        </Button>
      </form>
    </Box>
  );
};

export default FormBox;
