import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSingleProduct } from "../store/singleProduct"


// const ProductDetails = (props) => {
//     const { text } = props
//     return (
//         <div className = "product-details">
//             <p>Product Details component</p>
//         </div>
//     )

// }


const ProductDetails = (props) => {
    const{ id } = props.match.params
    const dispatch = useDispatch()
    const product = useSelector((state)=> state.singleProduct.product)

    useEffect(()=>{
        dispatch(getSingleProduct(id))
    }, [dispatch, id])
 

const { name, details, price } = product

return <div>
    <h1>{`${name}`}</h1>
    <h2>{`${details}`}</h2>
    <h3>{`${price}`}</h3>
</div>
}


export default ProductDetails