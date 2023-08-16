import axios from "axios";

const GET_REVIEWS = "GET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";


export const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

export const _addReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};


//thunks
export const fetchReviews = () => {
  return (dispatch) => {
    axios
      .get("/api/products/reviews")
      .then((response) => {
        dispatch(getReviews(response.data));
      })
      .catch((error) => {
        console.log("error getting products", error);
      });
  };
};

//add new Review 
export const addReview = (review) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('/api/reviews', { review });
        dispatch(_addReview (response.data));
      } catch (error) {
        console.error('Error adding review:', error);
      }
    };
  };



const initialState = [];

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reviewsReducer;
