import axios from "axios";

class ApiService {
  login(email: string, password: string) {
    return this.api('POST', 'auth/login', {
      email,
      password
    });
  }

  createAccount(signUpFormData: any) {
    return this.api('POST', 'auth/register', signUpFormData).then(response => {
      return response.data;
    }).catch(e => {
      return Promise.reject(e.response.data);
    });
  }

  api(method: string, endpoint: string, data: any) {
    return axios({
      method,
      url: `${import.meta.env.VITE_APP_API_BASE}/${endpoint}`,
      data,
    })
  }
}

export default new ApiService();
