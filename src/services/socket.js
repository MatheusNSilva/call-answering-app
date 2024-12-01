import { io } from "socket.io-client";

const SERVER_URL = "http://dev.digitro.com";

const socket = io(SERVER_URL, {
  path: "/callcontrol",
  reconnectionDelay: 10000,
});

export default socket;
