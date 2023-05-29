import { Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import pictureunavailable from '../../../src/images/picture_unavailable.jpg'

const { Meta } = Card

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product
  console.log(description)

  return (
    <Card
      cover={
        <img
          src={!images[0]?.url ? pictureunavailable : images[0]?.url}
          style={{ height: '150px', objectFit: 'cover' }}
          className='p-1'
        />
      }
      actions={[
        <EditOutlined className='text-warning' />,
        <DeleteOutlined className='text-danger' />,
      ]}
    >
      <Meta 
      title={title}
      description={`${description?.substring(0, 40)}...`} />
    </Card>
  )
}

export default AdminProductCard
