import axios from "axios";
import { toast } from "react-toastify";

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
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
      window.location.href = "/dashboard";
    } catch (error) {
      setTimeout(() => {
        toast.error("Mot de passe ou nom d'utilisateur incorrect");
      }, 750);
    }
  };
};
