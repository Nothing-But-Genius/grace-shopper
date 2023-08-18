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


    

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id, dispatch]);


  if (!product) {
    return <div>Loading product...</div>;
  }

  const { name, details, price, imageUrl } = product;



  return (
    <div>
    <div className= "productcontainer">
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} id="productimg"/>
      <p>Price: $ {price}</p>
      <p>Details: {details}</p>
    </div>

  <Reviews />
</div>


  );
};


export default Product;
