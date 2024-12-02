import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Alert } from "@mui/material";
import { connectUser } from "../store/userSlice";
import FormBox from "../components/FormBox";
import useSocket from "../hooks/useSocket";
import "../styles/HomePage.css";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { connect } = useSocket();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
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
    connect(data.username, data.maxCalls);
  };
  
  useEffect(() => {
    if (user.connected) {
      navigate("/call-center");
    }
    if (user.error) {
      console.error("Erro de conexão detectado:", user.error);
      setError(user.error || "Erro ao conectar ao servidor");
    }
  }, [user, navigate])

  return (
    <Container className={"home-page"}>
      <Box className={"home-page-box"}>
        <Typography className={"home-page-title"} variant="h4">Central de Chamados</Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
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
