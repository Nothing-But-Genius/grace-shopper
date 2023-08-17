import axios from "axios";

const SET_REVIEWS = "SET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";


export const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    reviews,
  };
};

export const _addReview = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};


export const fetchReviews = (productId) => {
  return async (dispatch) => {
      try {
          const { data }  = await axios
          .get(`/api/reviews/${productId}`)
          dispatch(setReviews(data))         
      } catch (error) {
          console.log("Error fetching product reviews:", error)          
      }
  }
}


//add new Review 
  export const addReview = (reviewData) => (dispatch) => {
    axios
      .post("/api/reviews", reviewData)
      .then((response) => {
        const review = response.data;
        dispatch(_addReview(review));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  


const initialState = [];

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default reviewsReducer;
