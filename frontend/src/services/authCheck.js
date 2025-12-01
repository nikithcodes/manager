import axios from "axios";
import { BASE_URL } from "../constants";


const checkAuth = async (navigate) => {
  try {
    const res = await axios.get(`${BASE_URL}/user/authcheck`,{withCredentials:true});
    if (res.status === 200) {
      navigate('/dashboard');
    }
    else {
        navigate('/')
    }
  } catch (error) {
   const status = await refreshAccessToken();
    if (status !== 200) {
      navigate('/');
    } 
    else {
      window.location.reload()
    }
  }
};


const refreshAccessToken = async () => {
  try {
      const res = await axios.get(`${BASE_URL}/user/refreshToken`,{withCredentials:true})
      return res.status
  } catch (error) {
      return error.status
  }
}


  export {checkAuth}