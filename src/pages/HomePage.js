import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Box, Typography } from "@mui/material";
import FormBox from "../components/FormBox";
import useSocket from "../hooks/useSocket";
import "../styles/HomePage.css";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const { connect } = useSocket();

  const [formData, setFormData] = useState({
    username: "",
    maxCalls: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (data) => {
    console.log("cheguei no Submit HomePage", data);
    setFormData(data);
    connect(data.username, data.maxCalls);
  };

  useEffect(() => {
    if (user.connected) {
      console.log("Usuário conectado ao WebSocket com nome:", user.name);
    }
  }, [user])

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
