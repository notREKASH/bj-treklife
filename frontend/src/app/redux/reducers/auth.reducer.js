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
    default:
      return state;
  }
}
