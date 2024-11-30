/* eslint-disable react/prop-types */
import React from "react";
import { useForm } from "react-hook-form";
import { OutlinedInput, Button, Box } from "@mui/material";
import { integersInputValidation } from "../utils/integersInputHelper";
import "../styles/FormBox.css";

const FormBox = ({ formData, onSubmit, onChange }) => {
  const { username, maxChats } = formData;
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: { username, maxChats }, 
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  const handleMaxChatsChange = (e) => {
    const correctedValue = integersInputValidation(e.target.value);
    setValue("maxChats", correctedValue);
    onChange(e);
  };

  return (
    <Box>
      <form className={"form-box"} onSubmit={handleSubmit(onSubmitForm)}>
        <OutlinedInput
          name={"username"}
          className={"form-input"}
          placeholder="Nome do usuário"
          error={!!errors.username}
          {...register("username", { required: "O nome de usuário é obrigatório." })}
        />
        <OutlinedInput
          name={"max-chats"}
          className={"form-input"}
          placeholder="Máximo de chats"
          error={!!errors.maxChats}
          onChange={handleMaxChatsChange}
          {...register("maxChats", { 
            required: "O número máximo de chats é obrigatório."
          })}
        />
        <Button
          variant={"contained"}
          type={"submit"} 
          className={"form-button"} 
        >
          Conectar
        </Button>
      </form>
    </Box>
  );
};

export default FormBox;
