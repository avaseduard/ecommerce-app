const Checkout = () => {
  const saveAddressToDb = () => {
    //
  }

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h4>Delivery address</h4>
        <br />
        <br />
        text area
        <button className='btn btn-primary mt-2' onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Gout coupon?</h4>
        <br />
        coupon input and apply coupon
      </div>

      <div className='col-md-6'>
        <h4>Order summary</h4>
        <hr />
        <p>Products X</p>
        <hr />
        <p>List of products</p>
        <hr />
        <p>Cart total: $x</p>

        <div className='row'>
          <div className='col-md-6'>
            <button className='btn btn-primary'>Place order</button>
          </div>

          <div className='col-md-6'>
            <button className='btn btn-primary'>Empty cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
