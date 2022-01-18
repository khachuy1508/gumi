import axios, { Method } from "axios";
const API_URL = "https://images-api.nasa.gov";

export const callApi = (method: Method, uri: string, data?: any) => {
  return axios({
    method: method,
    url: API_URL + uri,
    data: data,

    headers: {
      Accept: "application/vnd.collection+json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err.response) {
        return err.response.data;
      }
    });
};
