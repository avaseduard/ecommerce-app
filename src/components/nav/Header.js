import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { Menu } from 'antd'
import {
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'

import { logoutUser } from '../../store/reducers/user.reducer'
import Search from '../forms/Search'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [current, setCurrent] = useState('home')
  const { user } = useSelector(state => ({ ...state }))


  const logout = () => {
    auth.signOut()
    dispatch(
      logoutUser({
        user: null,
      })
    )
    navigate('/')
  }

  const menuItems = [
    {
      label: (
        <Link to='/' style={{ textDecoration: 'none' }}>
          Home
        </Link>
      ),
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link to='/shop' style={{ textDecoration: 'none' }}>
          Shop
        </Link>
      ),
      key: 'shop',
      icon: <ShoppingOutlined />,
    },
    {
      label: 'user',
      key: 'user',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          // label: 'Item 1',
          children: [
            {
              label:
                user?.user?.role === 'subscriber' ? (
                  <Link to='/user/history' style={{ textDecoration: 'none' }}>
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to='/admin/dashboard'
                    style={{ textDecoration: 'none' }}
                  >
                    Dashboard
                  </Link>
                ),
              // key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
            {
              label: 'logout',
              key: 'logout',
              icon: <LogoutOutlined />,
              onClick: () => {
                logout()
              },
            },
          ],
        },
      ],
    },
    {
      label: (
        <Link to='/register' style={{ textDecoration: 'none' }}>
          register
        </Link>
      ),
      key: 'register',
      icon: <UserAddOutlined />,
      className: 'float-end',
      style: { marginLeft: 'auto' },
    },
    {
      label: (
        <Link to='/login' style={{ textDecoration: 'none' }}>
          login
        </Link>
      ),
      key: 'login',
      icon: <UserOutlined />,
      className: 'float-end',
    },
  ]

  const onClick = e => {
    setCurrent(e.key)
  }

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={menuItems}
      />

      <span className='float-right p-1'>
        <Search />
      </span>
    </>
  )
}
export default Header
