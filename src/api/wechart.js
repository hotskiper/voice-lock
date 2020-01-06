import axios from "axios";
// import qs from 'qs'
import baseurl from "./base";
// let base = 'http://10.1.122.207:8080'

export const getSignature = params => {
  // ajaxTag=1&reqSource=wx&wxcode="+wxcode
  return axios
    .post(baseurl.api + `/geturlsignature`, params)
    .then(res => res.data);
};
// export const getSignature = params => {
//   // ajaxTag=1&reqSource=wx&wxcode="+wxcode
//   return axios
//     .get(`http://miap.cc:8585/ailab/signature`, { params: params })
//     .then(res => res.data);
// };
