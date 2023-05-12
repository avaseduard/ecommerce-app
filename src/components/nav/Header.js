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
} from '@ant-design/icons'

import { logoutUser } from '../../store/reducers/user.reducer'

const Header = () => {
  const [current, setCurrent] = useState('home')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => ({ ...state }))
  //! const currentUser = user.currentUser

  const logout = () => {
    auth.signOut()
    dispatch(
      logoutUser({
        //! currentUser: null,
        user: null,
      })
    )
    navigate('/')
  }

  const menuItems = [
    {
      label: (
        <Link to='/' style={{ textDecoration: 'none' }}>
          home
        </Link>
      ),
      key: 'home',
      icon: <HomeOutlined />,
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
              label: 'Option 1',
              key: 'setting:1',
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

  // const loggedOutUserMenuItems = [
  //   {
  //     label: (
  //       <Link to='/' style={{ textDecoration: 'none' }}>
  //         home
  //       </Link>
  //     ),
  //     key: 'home',
  //     icon: <HomeOutlined />,
  //   },
  //   {
  //     label: (
  //       <Link to='/register' style={{ textDecoration: 'none' }}>
  //         register
  //       </Link>
  //     ),
  //     key: 'register',
  //     icon: <UserAddOutlined />,
  //     className: 'float-end',
  //     style: { marginLeft: 'auto' },
  //   },
  //   {
  //     label: (
  //       <Link to='/login' style={{ textDecoration: 'none' }}>
  //         login
  //       </Link>
  //     ),
  //     key: 'login',
  //     icon: <UserOutlined />,
  //     className: 'float-end',
  //   },
  // ]

  // const loggedInUserMenuItems = [
  //   {
  //     label: (
  //       <Link to='/' style={{ textDecoration: 'none' }}>
  //         home
  //       </Link>
  //     ),
  //     key: 'home',
  //     icon: <HomeOutlined />,
  //   },
  //   {
  //     // label: 'user',
  //     label: currentUser ? currentUser.email.split('@')[0] : 'user',
  //     key: 'user',
  //     icon: <SettingOutlined />,
  //     children: [
  //       {
  //         type: 'group',
  //         // label: 'Item 1',
  //         children: [
  //           {
  //             label: 'Option 1',
  //             key: 'setting:1',
  //           },
  //           {
  //             label: 'Option 2',
  //             key: 'setting:2',
  //           },
  //           {
  //             label: 'logout',
  //             key: 'logout',
  //             icon: <LogoutOutlined />,
  //             onClick: () => {
  //               logout()
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]

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
    </>
  )
}
export default Header
