import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "../styles/CallPageHeader.css";

/* eslint-disable react/prop-types */
const CallPageHeader = ({ action }) => {
    return (
        <AppBar className="call-page-header">
            <Toolbar className="call-page-header-toolbar">
                <Typography variant="h5">Controle de Chamados</Typography>
                <Button variant="contained" color="error" onClick={() => action()}>Desconectar</Button>
            </Toolbar>
        </AppBar>
    );
};
export default CallPageHeader;