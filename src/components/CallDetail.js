/* eslint-disable react/prop-types */
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "../styles/CallDetail.css";

const CallDetail = ({ call, onEndCall }) => {
  if (!call) {
    return (
      <Box className={"call-box-empty"} >
        <Typography component={"div"} className={"call-box-advice"}>
          Selecione uma chamada para vizualizar os detalhes
        </Typography>
      </Box>
    );
  }
  return (
    <Box className={"call-box"}>
      <Box className={"call-detail"}>
        <Typography variant="h6">Detalhes da Chamada</Typography>
        <Typography variant="body1">ID: {call.callId}</Typography>
        <Typography variant="body1">Cliente: {call.caller}</Typography>
        <Typography variant="body1">Status: {call.service}</Typography>
        <Typography variant="body1">Mídia: {call.media}</Typography>
        <Typography variant="body1">
          Data de Início: {call.startDate}
        </Typography>
      </Box>
      <Button variant={"contained"} onClick={() => onEndCall(call.callId)} className={"end-call-button"}>
        Finalizar
      </Button>
    </Box>
  );
};

export default CallDetail;
