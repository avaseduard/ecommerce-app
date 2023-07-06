import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import { userCart } from '../functions/user'

const Cart = () => {
  const navigate = useNavigate()
  const { cart, user } = useSelector(state => ({ ...state }))

  const cartLength = cart.cart.length

  const cartTotal = cart.cart
    .map(product => product.count * product.price)
    .reduce((a, b) => a + b, 0)

  // Save the order to db and redirect to checkout
  const saveOrderToDb = () => {
    console.log(cart)
    userCart(cart.cart, user.user.token)
      .then(res => {
        console.log('ORDER SAVED TO DB -->', res)
        if (res.data.ok) navigate('/checkout')
      })
      .catch(err => console.log('ORDER SAVED TO DB ERROR -->', err))
  }

  return (
    <div className='container-fluid pt-2'>
      {/* Shopping cart */}
      <div className='row'>
        <div className='col-md-8'>
          {!cartLength ? (
            <p>
              No products in cart. Start <Link to='/shop'>shopping</Link>.
            </p>
          ) : (
            <>
              <p>Shopping cart ({cartLength} items)</p>
              <table className='table table-bordered'>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Image</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Brand</th>
                    <th scope='col'>Color</th>
                    <th scope='col'>Count</th>
                    <th scope='col'>Shipping</th>
                    <th scope='col'>Remove</th>
                  </tr>
                </thead>
                {cart.cart.map(product => (
                  <ProductCardInCheckout key={product._id} product={product} />
                ))}
              </table>
            </>
          )}
        </div>
        {/* Order summary */}
        <div className='col-md-4'>
          <h4>Order summary</h4>
          <hr />
          <p>Products</p>
          {cart.cart.map((product, index) => (
            <div key={index}>
              <p>
                {product.title} x {product.count} = $
                {product.price * product.count}
              </p>
            </div>
          ))}
          <hr />
          TOTAL: <b>${cartTotal}</b>
          <hr />
          {/* Button */}
          {user.user ? (
            <button
              onClick={saveOrderToDb}
              disabled={!cartLength}
              className='btn btn-primary btn-sm mt-2'
            >
              Proceed to checkout
            </button>
          ) : (
            <Link to='/login' state={{ from: '/cart' }}>
              <button className='btn btn-primary btn-sm mt-2'>
                Login to checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
