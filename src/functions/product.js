import axios from 'axios'

// Create new category
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken: authtoken,
    },
  })

// To list all products
export const getProductsByCount = async count =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

// To remove a product
export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// To update a product
export const getProductBySlug = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
