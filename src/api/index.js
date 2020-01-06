import axios from "axios";
import qs from "qs";
import baseurl from "./base";

export const getCode = params => {
  return axios
    .post(baseurl.api + `/create`, qs.stringify(params))
    .then(res => res.data);
};

export const getParams = params => {
  return axios
    .post(baseurl.api + `/parse`, qs.stringify(params))
    .then(res => res.data);
};

export const getUserInfo2 = params => {
  return axios.get(baseurl.api + `/user`, params).then(res => res.data);
};

export const voiceTest2 = params => {
  return axios
    .post(baseurl.api + `/multimedia/audio/digital`, qs.stringify(params))
    .then(res => res.data);
};
export const voiceTest = params => {
  return axios
    .post(baseurl.api + `/audio`, JSON.stringify(params), {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.data);
};
export const getUserInfo = params => {
  return axios
    .post(
      baseurl.api + `/voice/getuserinfo`,
      JSON.stringify(params),
      // qs.stringify(params),
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => res.data);
};
export const getUserRecordState = params => {
  return axios
    .post(
      baseurl.api + `/audio/recorded`,
      JSON.stringify(params),
      // qs.stringify(params), noid,sysid,User_info
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => res.data);
};
export const numberRecog = params => {
  return axios
    .post(
      baseurl.api + `/audio`,
      JSON.stringify(params),
      // qs.stringify(params), noid,sysid,ID_Upload,User_info   status '0',results:['123','/work/us.wav']
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => res.data);
};
export const addVoice = params => {
  return axios
    .post(
      baseurl.api + `/audio/add`,
      JSON.stringify(params),
      // qs.stringify(params), sysid,User_info,audio
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => res.data);
};
export const matchVoice = params => {
  return axios
    .post(
      baseurl.api + `/audio/match`,
      JSON.stringify(params),
      // qs.stringify(params), sysid,User_info,audio
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => res.data);
};
export const queryRecordTimes = userId => {
  // number=x4653
  return axios
    .get(baseurl.api + `/voice/entrycount?number=` + userId)
    .then(res => res.data);
};
export const resetVoice = userId => {
  return axios
    .get(baseurl.api + `/voice/delentry?number=` + userId)
    .then(res => res.data);
};
