export default (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload,
      };
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };

    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };

    case "AUTH_ERROR":
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
