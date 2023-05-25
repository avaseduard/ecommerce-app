import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { createProduct } from '../../../functions/product'
import { useNavigate } from 'react-router-dom'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {
  getCategories,
  getSubcategoriesByCategoryId,
} from '../../../functions/category'

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
  const [subcategoryOptions, setSucategoryOptions] = useState([])
  const [showSubcategories, setShowSubcategories] = useState(false)

  // Get the categories from backend
  const loadCategories = () =>
    getCategories().then(categories =>
      setValues({ ...values, categories: categories.data })
    )

  // Whenpage loads, populate categories for dropdown
  useEffect(() => {
    loadCategories()
  }, [])

  // When the admin selects a category, send the id to backend and return the subcategories
  const handleCategoryChange = e => {
    e.preventDefault()
    setValues({ ...values, subcategories: [], category: e.target.value })
    getSubcategoriesByCategoryId(e.target.value).then(res => {
      setSucategoryOptions(res.data)
    })
    setShowSubcategories(true)
  }

  // Spread through the values object form state and update the value of e.target.name with e.target.value
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Create product in database using the values input by user
  const handleSubmit = e => {
    e.preventDefault()
    createProduct(values, user.user.token)
      .then(res => {
        console.log(res)
        // toast.success(`"${res.data.title}" product has been created`)
        // navigate('/admin/products')
      })
      .catch(error => {
        console.log(error)
        // Show the error message that we're sending from backend
        toast.error(error.response.data.error)
      })
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
          <ProductCreateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subcategoryOptions={subcategoryOptions}
            showSubcategories={showSubcategories}
          />
        </div>
        
      </div>
    </div>
  )
}

export default ProductCreate
