import { useEffect, useState } from 'react'
import { fetchProductsbyFilter, getProductsByCount } from '../functions/product'
import { getCategories } from '../functions/category'
import ProductCard from '../components/cards/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Menu, Slider } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons'
import { setSearch } from '../store/reducers/search.reducer'

const Shop = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [price, setPrice] = useState([0, 9999])
  const { search } = useSelector(state => ({ ...state }))
  const { text } = search

  const fetchProducts = argument => {
    fetchProductsbyFilter(argument).then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  // Load products and categories by default when page loads
  useEffect(() => {
    loadAllProducts()
    loadCategories()
  }, [])
  //
  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(12).then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }
  //
  const loadCategories = () => {
    setLoading(true)
    getCategories().then(res => {
      setCategories(res.data)
      setLoading(false)
    })
  }

  // Load products based on user search input
  useEffect(() => {
    setLoading(true)
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
    }, 300)
    return () => clearTimeout(delayed)
  }, [text])

  // Load products based on price slider filter with a delay of 300 ms
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ price: price })
    }, 300)
    return () => clearTimeout(delayed)
  }, [price])
  //
  const handleSlider = value => {
    dispatch(setSearch(''))
    setCategoryIds([])
    setPrice(value)
  }

  // Load categories based on checkbox filter
  const handleCheck = e => {
    dispatch(setSearch(''))
    const inTheState = [...categoryIds]
    const justChecked = e.target.value
    const foundInTheState = inTheState.indexOf(justChecked) // index or -1
    // If the category id is not found in the state, add it, if it's found, remove it
    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }
    setCategoryIds(inTheState)
    fetchProducts({category: inTheState})
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Filter</h4>
          <hr />

          <Menu mode='inline' defaultOpenKeys={['1', '2']}>
            {/* Price filter */}
            <SubMenu
              title={
                <span className='h6'>
                  <DollarOutlined /> Price $
                </span>
              }
              key={1}
            >
              <div>
                <Slider
                  range
                  value={price}
                  onChange={handleSlider}
                  // defaultValue={[0, 9999]}
                  max='9999'
                  className='ml-4 mr-4'
                />
              </div>
            </SubMenu>

            {/* Categories filter */}
            <SubMenu
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Categories
                </span>
              }
              key={2}
            >
              {categories.map(category => (
                <div key={category._id}>
                  <Checkbox
                    value={category._id}
                    name='category'
                    onChange={handleCheck}
                    checked={categoryIds.includes(category._id)}
                  >
                    {category.name}
                  </Checkbox>
                  <br />
                </div>
              ))}
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className='row pb-5'>
            {products.map(product => (
              <div key={product._id} className='col-md-4 mt-3'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
