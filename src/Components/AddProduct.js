import React, {useState} from "react"
import { useDispatch } from "react-redux"


function AddProduct(){
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name:'',
        details:'',
    })


    const handleFormSubmit = (event) => {
        event.preventDefault()
        // dispatch(createProduct action (formData))
    }
// functional component to handle formchange
    const handleFormChange = (event) => {
        const{ name, value } = event.target
        setFormData((prevFormData)=>({
            ...prevFormData,
            [name]: value,
        }))
    }

    return (
        <form onSubmit={handleFormSubmit} >
            <input 
                type = "text"
                name = "name"
                placeholder= "Product Name"
                value = {formData.name}
                onChange = {handleFormChange}
            />
            <input 
                type = "text"
                name = "details"
                placeholder=" Details"
                value = {formData.details}
                onChange = {handleFormChange}
            />
            <button type= "submit"> Submit </button>
        </form>

    )

}



export default AddProduct