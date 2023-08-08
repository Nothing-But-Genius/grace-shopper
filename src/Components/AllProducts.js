import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../store/product';

const AllProducts = () => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(getProducts());
    } catch (error) {
      console.log(error);
    }
  }, []);
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

export default AllProducts;
