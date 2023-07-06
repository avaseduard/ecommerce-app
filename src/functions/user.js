import axios from 'axios'

// Send user cart to database
export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
