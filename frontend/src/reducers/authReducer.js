const authRedecer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
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
      // console.log("...action?.data= ", ...action?.data);
      console.log("yse");
      return {
        ...state,
        authData: action.data.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, error: true };
    case "FOLLOW_USER":
      console.log("object 1");
      // console.log("=> ", ...state.authData);
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
      console.log("object 2");

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
