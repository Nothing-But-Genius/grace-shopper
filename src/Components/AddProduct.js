import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/product";

function AddProduct() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: "",
  });

  //Dispatch thunk when submit is clicked
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(addProduct(formData));
  };

  // functional component to handle form change
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleFormChange}
      />
      <input
        type="text"
        name="details"
        placeholder=" Details"
        value={formData.details}
        onChange={handleFormChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleFormChange}
      />
      <button type="submit"> Submit </button>
    </form>
  );
}

export default AddProduct;
