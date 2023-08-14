import axios from "axios";

const CREATE_USER = "CREATE_USER";
const GET_USERS = "GET_USERS";

export const _getAllUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const _createUser = (user) => ({
  type: CREATE_USER,
  payload: user,
});

export const getAllUsers = () => {
  return async (dispatch) => {
    await axios
      .get("/api/users")
      .then((res) => {
        dispatch(_getAllUsers(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const createUser = (user) => {
  return async (dispatch) => {
    await axios
      .post("/api/users", user)
      .then((res) => {
        dispatch(_createUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
