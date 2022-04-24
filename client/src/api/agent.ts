import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://localhost:5001/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {
    return Promise.reject({
        details: error.response,
        message: `${error.response?.data.status}: ${error.response?.data.title}`,
    });
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

const agent = {
    Catalog,
    TestErrors,
}

export default agent;