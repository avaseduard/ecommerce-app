import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import pictureunavailable from '../../../src/images/picture_unavailable.jpg'
import { Link } from 'react-router-dom'

const { Meta } = Card

const ProductCard = ({product}) => {
  const { title, description, images, slug } = product

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
        <>
          <Link relative='path' to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' />
            <br />
            View product
          </Link>
          <ShoppingCartOutlined
            className='text-danger'
          />
          <br />
          Add to cart
        </>,
      ]}
    >
      <Meta title={title} description={`${description?.substring(0, 40)}...`} />
    </Card>
  )
}

export default ProductCard