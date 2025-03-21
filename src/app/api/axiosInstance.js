import axios from "axios";
const GLOBAL_TOKEN =
  "eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.sbNKOujGI5Zr-b2vi07jQuFa-7lcxIKgsO7FJPLp4CMcTOZ8GszZ2RaIm_FX0dOpQdcJ-EPlIp0zum51zKoK2AdJwKLO5dEX.5uGbDhoYv8Vqq4p-lLcUFw.24t-Qkw8u2uprWxhTbDrSpQ5c8NSE48SXvNMmBzOvHg_J_hTedhBjT5mHvgT3TDsjuZ03KEw7Quj_ycMD_JXItTwvxnLxDr2ghKLZQt4mBy8bzG4Pvto-DSod9Cz09lKYH1uoCUwUYiA9PQAQHjYVM8oLArXypTxLD_8Ncrn0uK8pKAa-tXH2OK1IREzNxYIoJT7doxzQmMLE_xgOMn60A.ecne1E6D-ws4p2CMvYjgPSqXTpYP5z0-XqLfWF2JQwE";
const api = axios.create({
  baseURL: "https://entaklymotors.com/backend_api/",
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
