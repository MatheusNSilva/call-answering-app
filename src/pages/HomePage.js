import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connectUser } from "../store/userSlice";
import { Container, Box, Typography } from "@mui/material";
import FormBox from "../components/FormBox";
import "../styles/HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    maxChats: 0,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("handleInputChange", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    dispatch(connectUser({ name: data.username, maxChats: data.maxChats }));
    console.log('Dados do formulário enviados para o Redux:', data);
  };

  return (
    <Container className={"home-page"}>
      <Box className={"home-page-box"}>
        <Typography className={"home-page-title"} variant="h4">Central de Chamados</Typography>
        <FormBox 
          formData={formData}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        />
      </Box>
    </Container>
  );
};

export default HomePage;
