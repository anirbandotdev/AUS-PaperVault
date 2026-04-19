import { io } from "socket.io-client";

// The base URL config already handled via Vite
const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");

// Standardize socket initialization natively here so we can import it across components safely.
export const socket = io(BASE_URL, {
  withCredentials: true,
  extraHeaders: {
    "ngrok-skip-browser-warning": "true",
  },
  autoConnect: true,
});
