// https://opentdb.com/api.php?amount=15
// import axios from "axios";

import origin from "axios"; 
import { BASEURL } from "./api"; 
//dev
// export const baseURL = "http://103.13.114.194:4080/webapp/";
// live
// export const baseURL = "https://opentdb.com/";
export const axios = origin.create({
    BASEURL,
});

axios.interceptors.request.use(async (config) => {
//   await store.dispatch(startLoading());

//   const token = await sessionStorage.getItem("smbToken");
//   if (token) {
//     config.headers["Authorization"] = "Bearer " + token;
//   }

  return config;
});

axios.interceptors.response.use(async (res) => {
//   await store.dispatch(stopLoading());
  return res;
});
export default axios;
