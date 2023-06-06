import axios from 'axios'

// Create new product
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken: authtoken,
    },
  })

// List all products by count
export const getProductsByCount = async count =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`)

// Remove a product
export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  })

// List product by slug
export const getProductBySlug = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

// Update product
export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken: authtoken,
    },
  })

// List all products by sort criteria
export const getProducts = async (sort, order, limit) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort: sort,
    order: order,
    limit: limit,
  })
