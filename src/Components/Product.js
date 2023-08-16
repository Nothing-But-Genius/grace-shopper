import React, { useEffect, useState } from "react"
import ProductDetails from  "./ProductDetails"
import { getSingleProduct } from "../store/singleProduct";
import { fetchSingleProduct } from "../store/singleProduct";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Route, Link } from "react-router-dom"




const Product = () => {
  const product = useSelector((state) => state.product)
  const { productId } = useParams()
  const dispatch =  useDispatch()



  useEffect (()=> {
    if(productId) fetchSingleProduct()
  }, [productId]) 
  
  // const { id, name , details, price} = product

    return (
        <div className="product-wrapper">
          <div>
  <h1>{`${name}`}</h1>
  <h2>{`${details}`}</h2>
  <h3>{`${price}`}</h3>
</div>
      <div className="product-header">
        <div className="image-wrapper">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-title-wrapper">
          <h2>{product.name}</h2>
          <h4>${product.price}</h4>
        </div>
      </div>

      <div className="product-sub-nav">
        {/* Links to `<current url>/reviews` and `<current url>/description` */}
        <Link to={`/products/${productId}/details`}>Description</Link>
        <Link to={`/products/${productId}/reviews`}>Reviews</Link>
      </div>


      <div>
        <Route
          path="/products/:productId/details"
          render={() => <ProductDetails text={product.details} />}
        />
        {/* <Route
          path="/products/:productsId/reviews"
          render={() => <ProductDetails text={product.reviews} />}
        /> */}
      </div>
      </div>
    )
    

}


export default Product