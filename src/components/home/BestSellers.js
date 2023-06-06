import { useEffect, useState } from 'react'
import { getProducts } from '../../functions/product'
import LoadingCard from '../cards/LoadingCard'
import ProductCard from '../cards/ProductCard'

const BestSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const limit = 3

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProducts('sold', 'desc', limit)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log('LOADING BEST SELLERS FAILED -->', error)
      })
  }

  return (
      <div className='container'>
        {loading ? (
          <LoadingCard limit={limit} />
        ) : (
          <div className='row'>
            {products.map(product => (
              <div key={product._id} className='col-md-4'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
  )
}

export default BestSellers
