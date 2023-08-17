import { fetchSingleProduct } from "../store/singleProduct";
import { useDispatch, useSelector } from "react-redux";

import { Route, Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import Reviews from "./Reviews";

import React, { useEffect } from 'react';
import { fetchReviews } from "../store/reviews";


const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();// must use if react-router v6 and above
  const product = useSelector(state => state.singleProduct) //replaces matchStateToProps


  // //Reviews
  const reviews = useSelector (state =>state.reviews)
  

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [id, dispatch])

  if (!product) {
    return <div>Loading product...</div>;
  }

  const { name, details, price, imageUrl } = product;



  return (
    <div>
    <div>
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} />
      <p>Price: {price}</p>
      <p>Details: {details}</p>
    </div>
  
  <div className="product-sub-nav">
    {/* Links to `<current url>/reviews` and `<current url>/description`
    <Link to={`/products/${id}/text`}>Description</Link>
    <Link to={`/products/${id}/reviews`}>Reviews</Link>
  </div>
  
  
  <div>
    <Route
      path="/products/:productId/text"
      render={() => <ProductDetails text={details} />}
    />
    <Route
      path="/products/:productsId/reviews"
      render={() => <ProductDetails text={Reviews} />}
    /> */}
  </div>
  <Reviews />
</div>


  );
};


export default Product;
