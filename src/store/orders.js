import axios from "axios";

const SET_ORDERS = "SET_ORDERS";
const CREATE_ORDER = "CREATE_ORDER";
const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

export const createOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});

export const updateOrderStatus = (orderId, status) => ({
  type: UPDATE_ORDER_STATUS,
  orderId,
  status,
});

export const fetchOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: SET_ORDERS, orders: response.data });
  };
};

export const fetchOrder = (orderId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: SET_ORDERS, orders: response.data });
  };
};

export const createOrderThunk = (orderData) => async (dispatch) => {
  const response = await axios.post("/api/orders", orderData);
  dispatch(createOrder(response.data));
};

export const updateOrderStatusThunk = (orderId, status) => async (dispatch) => {
  const response = await axios.put(`/api/orders/${orderId}`, { status });
  dispatch(updateOrderStatus(response.data.id, response.data.status));
};

const initialState = {};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...state, action.order];
    case UPDATE_ORDER_STATUS:
      return state.map((order) => {
        if (order.id === action.orderId) {
          return { ...order, status: action.status };
        } else {
          return order;
        }
      });
    default:
      return state;
  }
}
