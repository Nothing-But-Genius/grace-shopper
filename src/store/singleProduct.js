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



//Get single product axios thunk
export const fetchSingleProduct = (productId) =>(dispatch) => {
    axios
    .get(`api/products/${productId}`)
    .then((response) => {
      const data = response.data
      dispatch (getSingleProduct(response.data))
    })
    .catch((error)=> {
      console.log("Error fetching single product", error)
    })
}




const initialState = {};

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default singleProductReducer;
