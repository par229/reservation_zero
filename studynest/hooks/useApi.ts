import axios from "axios";

// Django 서버 주소
const API_BASE_URL = "http://127.0.0.1:8000"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
