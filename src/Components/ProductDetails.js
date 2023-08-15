import React from "react"


const ProductDetails = (props) => {
    const { text } = props
    return (
        <div className = "product-details">
            <p>{text}</p>
        </div>
    )

}


export default ProductDetails