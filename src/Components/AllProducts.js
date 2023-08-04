import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/product';

// import { useSelector, useDispatch } from 'react-redux';

const AllProducts = ({ loadProducts, products }) => {
  useEffect(() => {
    try {
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  }, [products]);
  return (
    <div id="allProducts">
      <ul>
        {products.map((product) => {
          return <li>{product.name}</li>;
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
