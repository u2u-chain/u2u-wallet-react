import axios from "axios";
import {store} from "@/redux/store.ts";

class ApiService {
  login(email: string, password: string) {
    return this.api('POST', 'auth/login', {
      email,
      password
    });
  }

  createAccount(signUpFormData: any) {
    return this.api('POST', 'auth/register', signUpFormData);
  }

  getProfile() {
    return this.api('GET', 'auth/profile');
  }

  api(method: string, endpoint: string, data?: any) {
    const token = store.getState().auth.accessToken;
    return axios({
      method,
      url: `${import.meta.env.VITE_APP_API_BASE}/${endpoint}`,
      data,
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      }
    }).then(response => {
      return response.data;
    }).catch(e => {
      return Promise.reject(e.response.data);
    });
  }
}

export default new ApiService();
