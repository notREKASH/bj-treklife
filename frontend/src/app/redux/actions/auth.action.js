import axios from "axios";
const URL_API = process.env.NEXT_PUBLIC_API_URL;

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL_API}/api/auth/login`, {
        username,
        password,
      });
      dispatch({
        type: "SET_TOKEN",
        payload: res.data,
      });
      sessionStorage.setItem("token", res.data);
    } catch (error) {
      console.error("An error occurred while logging in");
    }
  };
};
