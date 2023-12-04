import axios from "axios";

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
    } catch (error) {
      console.error("An error occurred while logging in");
    }
  };
};
