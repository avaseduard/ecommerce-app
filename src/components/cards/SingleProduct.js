import { Card, Tabs } from 'antd'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import pictureunavailable from '../../../src/images/picture_unavailable.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ProductListItems from './ProductListItems'

const { Meta } = Card
// const { TabPane } = Tabs

const SingleProduct = ({ product }) => {
  const { title, images, description } = product

  return (
    <>
      <div className='col-md-7'>
        {images?.length ? (
          <Carousel
            width='560px'
            showArrows={false}
            showStatus={false}
            autoPlay
            infiniteLoop
          >
            {images.map(image => (
              <img src={image.url} key={image.public_id} />
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={pictureunavailable}
                style={{ height: '560px', objectFit: 'cover' }}
                className='p-1'
              />
            }
          />
        )}

        <Tabs
          defaultActiveKey='1'
          type='card'
          size='small'
          items={[
            {
              label: 'Description',
              key: 1,
              children: `${description}`,
            },
            {
              label: 'More',
              key: 2,
              children:
                'If you would like to learn more, give us a call on 0123 456 789!',
            },
          ]}
        />
      </div>

      <div className='col-md-5'>
        <h1 className='bg-info p-3'>{title}</h1>
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' /> <br /> Add to
              cart
              <Link to='/'>
                <HeartOutlined className='text-info' /> <br /> Add to wishlist
              </Link>
            </>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  )
}

export default SingleProduct
