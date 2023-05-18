import { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {
  createCategory,
  getCategories,
  getCategory,
  removeCategory,
  updateCategory,
} from '../../../functions/category'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const CategoryUpdate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const { user } = useSelector(state => ({ ...state }))
  const { slug } = useParams()
  const navigate = useNavigate()

  // Load the category we want to edit when component mounts
  useEffect(() => {
    loadCategory()
  }, [])

  // Get category from backend based on slug
  const loadCategory = () =>
    getCategory(slug).then(res => setName(res.data.name))

  // Add a new category
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Use the create category method to create one in database
    updateCategory(slug, { name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" category has been updated`)
        navigate('/admin/category')
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        if (err.response.status === 400) {
          toast.error(err.response.data)
        }
      })
  }

  // // Delete a category
  // const handleRemove = async slug => {
  //   // Prompt admin for confirmation
  //   if (window.confirm(`Are you sure you want to delete ${slug} category`)) {
  //     setLoading(true)
  //     // Use remobve category method to remove one form database
  //     removeCategory(slug, user.user.token)
  //       .then(res => {
  //         setLoading(false)
  //         toast.success(`${res.data.name} category successfully removed`)
  //         // loadCategories()
  //       })
  //       .catch(err => {
  //         setLoading(false)
  //         console.log(err)
  //         if (err.response.status === 400) {
  //           toast.error(err.response.data)
  //         }
  //       })
  //   }
  // }

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
            <h4>Update category</h4>
          )}
          <form onSubmit={handleSubmit} className='form-group'>
            <label>Enter new name</label>
            <input
              type='text'
              className='form-control'
              onChange={e => setName(e.target.value)}
              value={name}
              autoFocus
              required
            />
            <br />
            <button className='btn btn-outline-primary'>Save</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}

export default CategoryUpdate
