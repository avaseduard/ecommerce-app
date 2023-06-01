import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { createProduct, getProductBySlug } from '../../../functions/product'
import { useNavigate, useParams } from 'react-router-dom'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {
  getCategories,
  getSubcategoriesByCategoryId,
} from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

// Initial keys and values of product state
const intitialState = {
  title: '',
  description: '',
  price: '',
  // categories: [],
  category: '',
  subcategories: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  color: '',
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  brand: '',
}

const ProductUpdate = () => {
  const { slug } = useParams()
  const [values, setValues] = useState(intitialState)
  const [subcategoryOptions, setSubcategoryOptions] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [arrayOfSubcategoriesIds, setArrayOfSubcategoriesIds] = useState([])
  // const [showSubcategories, setShowSubcategories] = useState(false)
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadProduct()
    loadCategories()
  }, [])

  // Get the product from backend and set it to state
  const loadProduct = () => {
    getProductBySlug(slug).then(product => {
      // Load single product and set in state
      setValues({ ...values, ...product.data })
      // Load single product category subcatgeories
      getSubcategoriesByCategoryId(product.data.category._id).then(res =>
        setSubcategoryOptions(res.data)
      )
      // Create array with sub ids to show as default
      let arr = []
      product.data.subcategories.map(subcategory => {
        arr.push(subcategory._id)
        // console.log('ARR of subcategories', arr)
        setArrayOfSubcategoriesIds(arr)
        // console.log('arrayOfSubcategoriesIds', arrayOfSubcategoriesIds)
      })
    })
  }

  // Get the categories from backend and set them in their own state
  const loadCategories = () =>
    getCategories().then(categories => setCategories(categories.data))

  // Dinamically take each key and value that the admin selects and set it to product state
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // When the admin selects a category, send the id to backend, return the subcategories and populate the dropdown
  const handleCategoryChange = e => {
    e.preventDefault()
    setValues({ ...values, subcategories: [] })
    //
    setSelectedCategory(e.target.value)
    //
    getSubcategoriesByCategoryId(e.target.value).then(res => {
      setSubcategoryOptions(res.data)
    })
    // When initial category is selected, show the corresponding subs
    if (values.category._id === e.target.value) loadProduct()
    // When category is changed, show the appropriate subs
    setArrayOfSubcategoriesIds([])
  }

  // Create product in database using the values input by admin
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Update product</h4>
          <hr />

          {JSON.stringify(values)}

          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subcategoryOptions={subcategoryOptions}
            setArrayOfSubcategoriesIds={setArrayOfSubcategoriesIds}
            arrayOfSubcategoriesIds={arrayOfSubcategoriesIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate
