import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { cloneDeep, get, isNumber, isString } from 'lodash-es';

function createHttp() {
  const client = axios.create({
    timeout: 1000 * 60 * 10,
    headers: {},
  });

  client.interceptors.request.use((config: AxiosRequestConfig) => {
    const conf = cloneDeep(config);
    return conf;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data = {}, config = {} } = response;
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  return client;
}

const $http = createHttp();

export { $http };
