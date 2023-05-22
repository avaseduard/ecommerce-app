import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { createProduct } from '../../../functions/product'
import { useNavigate } from 'react-router-dom'

const intitialState = {
  title: 'Example product 1',
  description: 'Description of example product 1',
  price: '1234',
  categories: [],
  category: '',
  subcategories: [],
  shipping: 'Yes',
  quantity: '3',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  color: 'Silver',
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  brand: 'Apple',
}

const ProductCreate = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => ({ ...state }))
  const [values, setValues] = useState(intitialState)
  const {
    title,
    description,
    price,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values

  const handleSubmit = e => {
    e.preventDefault()
    createProduct(values, user.user.token)
      .then(res => {
        console.log(res)
        // toast.success(`"${res.data.title}" product has been created`)
        window.alert(`"${res.data.title}" product has been created`)
        window.location.reload()
        // navigate('/admin/products')
      })
      .catch(error => {
        console.log(error)
        // Show the error message that we're sending from backend
        toast.error(error.response.data.error)
      })
  }

  // Spread through the values object form state and update the value of e.target.name with e.target.value
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
    // console.log(e.target.name, '->', e.target.value)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Create product</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                className='form-control'
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                className='form-control'
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Price</label>
              <input
                type='number'
                name='price'
                className='form-control'
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Shipping</label>
              <select
                name='shipping'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select...</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>

            <div className='form-group'>
              <label>Quantity</label>
              <input
                type='number'
                name='quantity'
                className='form-control'
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Color</label>
              <select
                name='color'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select...</option>
                {colors.map(color => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-group'>
              <label>Brand</label>
              <select
                name='brand'
                className='form-control'
                onChange={handleChange}
              >
                <option>Please select...</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <button className='btn btn-outline-info'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductCreate
