import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

// Add interceptors for request and response
axiosClient.interceptors.request.use(
  (response) => response,
  (error) => {
    let errorMessage = "An error occurred";
    
    if (error.response) {
      errorMessage = error.response.data?.message || error.response.statusText;
    } else if (error.request) {
      errorMessage = "No response received from server";
    }

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;