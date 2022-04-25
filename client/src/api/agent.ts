import axios, { AxiosError, AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'https://localhost:5001/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
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
      throw data;
  }

  return Promise.reject(error.response);
})

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  getAll: () => requests.get('products'),
  getOne: (id: number) => requests.get(`products/${id}`)
};

const TestErrors = {
  get400Error: () => requests.get('error/bad-request'),
  get401Error: () => requests.get('error/unauthorized'),
  get404Error: () => requests.get('error/not-found'),
  get500Error: () => requests.get('error/server-error'),
  getValidationError: () => requests.get('error/validation-error'),
}

const handleError = (
  error: { status: number, title: string, detail: string },
  navigate: NavigateFunction
) => {
  console.error('Error', error);
  (error.status === 500 || error.status === 503)
    && navigate('/server-error', { state: { error: error } });
}

const agent = {
  Catalog,
  TestErrors,
  handleError
}

export default agent;