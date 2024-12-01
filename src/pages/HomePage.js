import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { connectUser } from "../store/userSlice";
import FormBox from "../components/FormBox";
import useSocket from "../hooks/useSocket";
import "../styles/HomePage.css";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { connect } = useSocket();
  const navigate = useNavigate();
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
    setFormData(data);
    dispatch(connectUser({ name: data.username, maxCalls: data.maxCalls }))
    connect(data.username, data.maxCalls);
    navigate("/call-center");
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
