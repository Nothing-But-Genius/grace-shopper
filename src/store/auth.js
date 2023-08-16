import axios from "axios";
const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/api/auth", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: "SET_AUTH", auth: response.data });
      }
    } catch (error) {
      console.error("Error during login with token:", error);
      dispatch(logout()); // If token is invalid, log the user out
    }
  };
};
export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth", credentials);
      window.localStorage.setItem("token", response.data.token);
      dispatch(loginWithToken());
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };
};
export const attemptRegister = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/signup", credentials);
      const token = response.data.token;
      if (token) {
        window.localStorage.setItem("token", token);
        dispatch(loginWithToken());
        return true;
      } else {
        console.error("Token not received during registration attempt.");
        return false;
      }
    } catch (error) {
      console.error("Error during registration attempt:", error);
      return false;
    }
  };
};
export default auth;
