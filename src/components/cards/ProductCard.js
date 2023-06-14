import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import pictureunavailable from '../../../src/images/picture_unavailable.jpg'
import { showAverageRating } from '../../functions/rating'

const { Meta } = Card

const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product

  return (
    <>
      {product.ratings?.length > 0 ? (
        showAverageRating(product)
      ) : (
        <div className='text-center pt-2 pb-3'>No rating yet</div>
      )}

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
            <ShoppingCartOutlined className='text-danger' />
            <br />
            Add to cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description?.substring(0, 40)}...`}
        />
      </Card>
    </>
  )
}

export default ProductCard
