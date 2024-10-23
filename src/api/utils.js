import { jwtDecode } from "jwt-decode";
import { refreshToken } from '../services/authService';

async function getToken(abortSignal) {
  let token = localStorage.getItem("accessToken");

  if ((!token || isTokenExpired(token)) && getRefreshToken()){
    const isRefreshed = await refreshToken(abortSignal);
    if(isRefreshed){
      token = localStorage.getItem("accessToken");
    } else {
      //access and refresh bad so throw new response to redirect user to login page
      console.log("Bad token alert!");
      
    }
  } 
  return token;
}

function getRefreshToken(){
  return sessionStorage.getItem("refreshToken");
}

function isTokenExpired(token) {
  const { exp } = jwtDecode(token);
  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  const isExpired = exp < currentTime;
  console.log("isExpired --> ", isExpired);
  
  return isExpired;
}

const API_URL = import.meta.env.VITE_API_URL;

export { getToken, API_URL };
