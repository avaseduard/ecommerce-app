import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  LoginOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'

const items = [
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
    icon: <LoginOutlined />,
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

const Header = () => {
  const [current, setCurrent] = useState('home')
  const onClick = e => {
    setCurrent(e.key)
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
    />
  )
}
export default Header
