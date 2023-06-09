import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductBySlug } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'

const Product = () => {
  const [product, setProduct] = useState({})
  const { slug } = useParams()

  useEffect(() => {
    loadSingleProduct()
  }, [slug])

  const loadSingleProduct = () =>
    getProductBySlug(slug)
      .then(res => {
        console.log(res.data)
        setProduct(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct product={product} />
      </div>
      <div className='row'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Related products</h4>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default Product
