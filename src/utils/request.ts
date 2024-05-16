import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const request = (options: AxiosRequestConfig): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const { url, method, headers, data } = options;

    axios({
      method,
      url,
      headers,
      data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default request;
