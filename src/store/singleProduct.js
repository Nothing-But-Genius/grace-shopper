import Redux from "react-redux"
import axios from "axios"


//aciton type

export const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT"


//action creator 

export const getSingleProduct = (product) => {
    return {
        type: GET_SINGLE_PRODUCT,
        product,
    }
}



export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
      try {
          const { data }  = await axios
          .get(`/api/products/${productId}`)
          dispatch(getSingleProduct(data))         
      } catch (error) {
          console.log("Error fetching single product:", error)          
      }
  }
}



const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state;
  }
};


