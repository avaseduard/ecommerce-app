import { useEffect, useState } from 'react'
import { getProductsByCount } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import AdminNav from '../../../components/nav/AdminNav'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(100)
      .then(res => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>All products</h4>
          )}
          <div className='row'>
            {products.map(product => (
              <div key={product._id} className='col-md-4 pb-3'>
                <AdminProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProducts
