import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "..";
import { PaginatedResponse } from "../models/pagination";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = () => new Promise(resolve => setTimeout(resolve, 400));

axios.interceptors.response.use(async response => {
  // await sleep();
  const pagination = response.headers['pagination'];
  if(pagination) {
    response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
    return response;
  }
  return response;
}, (error: AxiosError) => {
  const data = error.response!.data;
  const status = error.response!.status;

  switch (status) {
    case 400:
      if (data.errors) {
        const modelStateErrors: string[] =
          Object.keys(data.errors)
            .map(key => data.errors[key])
            .flat();

        modelStateErrors.forEach(err => toast.warning(err));

        throw modelStateErrors;
      }
      toast.error(data.title);
      throw data;
    case 401:
      toast.error(data.title);
      throw data;
    case 500:
      history.push('/server-error', {error: data});
  }

  return Promise.reject(error.response);
})

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  getAll: (params: URLSearchParams) => requests.get('products', params),
  getOne: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get(`products/filters`),
};

const TestErrors = {
  get400Error: () => requests.get('error/bad-request'),
  get401Error: () => requests.get('error/unauthorized'),
  get404Error: () => requests.get('error/not-found'),
  get500Error: () => requests.get('error/server-error'),
  getValidationError: () => requests.get('error/validation-error'),
}

const Basket = {
  get: () => requests.get('basket'),
  addItem: (productId: number, quantity: number) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity?: number) =>
    quantity === undefined
    ? requests.delete(`basket?productId=${productId}&quantity=${2147483647}`)
    : requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const User = {
  login: (values: any) => requests.post('user/login', values),
  register: (values: any) => requests.post('user/register', values),
  getUser: () => requests.get('user/user'),
}

const agent = {
  Catalog,
  Basket,
  TestErrors,
  User
}

export default agent;