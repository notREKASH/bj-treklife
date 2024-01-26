const initialState = {
  isAuth: false,
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        isAuth: true,
        token: action.payload,
      };
    case "UPDATE_ISAUTH":
      return {
        ...state,
        isAuth: true,
      };
    default:
      return state;
  }
}
