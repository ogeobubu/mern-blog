const Reducer = (state, action) => {
  switch (action.type) {
    case "START_LOGIN":
      return {
        user: null,
        isLoading: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoading: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isLoading: false,
        error: true,
      };

    case "START_UPDATE":
      return {
        ...state,
        isLoading: true,
      };

    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        isLoading: false,
        error: false,
      };

    case "UPDATE_FAILURE":
      return {
        user: state.user,
        isLoading: false,
        error: true,
      };

    case "LOGOUT":
      return {
        user: null,
        isLoading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default Reducer;
