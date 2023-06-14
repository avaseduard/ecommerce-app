import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductBySlug, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'

const Product = () => {
  const [product, setProduct] = useState({})
  const [star, setStar] = useState(0)
  const { slug } = useParams()
  const { user } = useSelector(state => ({ ...state }))
  const userToken = user.user?.token

  // Check if the user has already left rating for this product and extract the stars
  const existingObjectRating = product.ratings?.find(
    element => element.postedBy.toString() === user.user?._id.toString()
  )
  const existingRating = existingObjectRating?.star

  useEffect(() => {
    loadSingleProduct()
  }, [slug])

  // If the user is logged and there is a rating, show his rating in modal
  useEffect(() => {
    if (userToken && existingObjectRating) {
      setStar(existingRating)
    }
  }, [existingObjectRating])

  const loadSingleProduct = () =>
    getProductBySlug(slug)
      .then(res => {
        setProduct(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  // Leave rating in database for current product, by current user
  const onStarClick = (newRating, name) => {
    setStar(newRating)
    productStar(name, newRating, user.user.token)
      .then(res => {
        loadSingleProduct()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
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
