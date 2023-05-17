import { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const CategoryCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories().then(res => setCategories(res.data))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    createCategory({ name }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name} category has been created`)
        loadCategories()
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        if (err.response.status === 400) {
          toast.error(err.response.data)
        }
      })
  }

  const handleRemove = async slug => {
    if (window.confirm(`Are you sure you want to delete ${slug} category`)) {
      setLoading(true)
      removeCategory(slug, user.user.token)
        .then(res => {
          setLoading(false)
          toast.success(`${res.data.name} category successfully removed`)
          loadCategories()
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          if (err.response.status === 400) {
            toast.error(err.response.data)
          }
        })
    }
  }

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
            <h4>Create category</h4>
          )}
          <form onSubmit={handleSubmit} className='form-group'>
            <label>Name</label>
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
          {categories.map(category => (
            <div key={category._id} className='alert alert-secondary'>
              {category.name}{' '}
              <span
                onClick={() => handleRemove(category.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${category.slug}`}>
                <span className='btn btn-sm float-right'>
                  <EditOutlined className='text-warning' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate