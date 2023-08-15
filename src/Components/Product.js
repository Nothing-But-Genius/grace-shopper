import React from "react"
import { connect } from "react-redux";
import ProductDetails from  "./ProductDetails"

import { Route, Link } from "react-router-dom"




const Product = (props) => {
    const { products, productID} = props

    const product = products.find((product) => product.id == productID)

    return (
        <div className="product-wrapper">
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
        <Link to={`/products/${productID}/details`}>Description</Link>
        <Link to={`/products/${productID}/reviews`}>Reviews</Link>
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

const mapStateToProps = () => {

}


export default connect (mapStateToProps)(Product)