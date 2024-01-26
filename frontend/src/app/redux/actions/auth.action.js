import axios from "axios";
import { toast } from "react-toastify";

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      dispatch({
        type: "SET_TOKEN",
        payload: res.data,
      });
      sessionStorage.setItem("token", res.data);
      toast.success("Vous êtes connecté");
    } catch (error) {
      setTimeout(() => {
        toast.error("Mot de passe ou nom d'utilisateur incorrect");
      }, 750);
    }
  };
};

export const updateIsAuth = (token) => {
  return async (dispatch) => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-token`, {
        headers: {
          "auth-token": `${token}`,
        },
      });
      dispatch({
        type: "UPDATE_ISAUTH",
      });
    } catch (error) {}
  };
};
