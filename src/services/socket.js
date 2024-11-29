import { io } from "socket.io-client";

const SERVER_URL = "http://dev.digitro.com/callcontrol";

const socket = io(SERVER_URL, {
  autoConnect: false,
});

export default socket;
