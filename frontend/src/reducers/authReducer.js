const authRedecer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      const itemStr = localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.data })
      );
      const timeToWait = 60 * 1000;
      setTimeout(() => {
        localStorage.removeItem("profile");
      }, timeToWait);
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "UPDATING_START":
      return { ...state, updateloading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.data?.data })
      );
      return {
        ...state,
        authData: action.data.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, error: true };
    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          data: {
            ...state.authData.data,
            followings: [...state.authData.data.followings, action.data],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          data: {
            ...state.authData.data,
            followings: [
              ...state.authData.data.followings.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };

    default:
      return state;
  }
};

export default authRedecer;
