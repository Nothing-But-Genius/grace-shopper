import React, { useState, useEffect, useParams } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../store/product';

// import { useSelector, useDispatch } from 'react-redux';

const AllProducts = ({ loadProducts }) => {
  const { id } = useParams();
  useEffect(() => {
    try {
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  }, [id, loadProducts]);
  return <div id="allProducts"></div>;
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
