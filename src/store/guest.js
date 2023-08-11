const GET_GUEST = "GET_GUEST";

const setGuest = (token) => {
  return {
    type: GET_GUEST,
    payload: token,
  };
};

export const fetchGuest = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/guest", {
      headers: {
        authorization: token,
      },
    });
    dispatch(setGuest(response.data));
  };
};

const guest = (state = {}, action) => {
  if (action.type === GET_GUEST) {
    return { ...state, token: action.payload };
  }
  return state;
};

export default guest;
