/* eslint-disable react/prop-types */
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "../styles/CallList.css";

const CallList = ({ calls, action }) => {
  return (
    <List className={"call-list"}>
      {calls.map((callItem) => (
        <ListItem
          className={"call-list-item"}
          button
          key={callItem.callId}
          onClick={() => action(callItem)}
        >
          <ListItemButton>
            <ListItemText primary={callItem.caller} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CallList;
