import { useEffect, useState } from 'react'
import { getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'
import LoadingCard from '../components/cards/LoadingCard'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const count = 3

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(count)
      .then(res => {
        setLoading(false)
        setProducts(res.data)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <>
      <div className='jumbotron h1 text-center text-danger font-weight-bold'>
        <Jumbotron text={['New arrivals', 'Best sellers', 'Special offers']} />
      </div>

      <div className='container'>
        {loading ? (
          <LoadingCard count={count} />
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
    </>
  )
}

export default Home
